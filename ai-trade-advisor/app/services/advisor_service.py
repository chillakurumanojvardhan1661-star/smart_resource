import asyncio
import logging
from typing import List, Dict, Any
from app.models.schemas import RecommendationRequest, RecommendationResponse, RankedOption
from app.services.clients.engine_clients import CostServiceClient, DemandServiceClient, RiskServiceClient
from app.services.scoring_engine import ScoringEngine
from app.services.explanation_engine import ExplanationEngine
from app.core.config import settings

logger = logging.getLogger(__name__)

class AdvisorService:
    def __init__(self):
        self.cost_client = CostServiceClient()
        self.demand_client = DemandServiceClient()
        self.risk_client = RiskServiceClient()

    async def get_recommendation(self, request: RecommendationRequest) -> RecommendationResponse:
        tasks = []
        for origin in request.origin_options:
            tasks.append(self._fetch_all_metrics(origin, request))

        # Parallel execution for all origin countries
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        valid_options_data = []
        for res in results:
            if isinstance(res, dict):
                valid_options_data.append(res)
            else:
                logger.error(f"Origin processing failed: {res}")

        if not valid_options_data:
            raise ValueError("Failed to retrieve metrics for any of the origin options.")

        # Scoring and Ranking
        weights = request.weights if request.weights else settings.DEFAULT_WEIGHTS
        normalized_data = ScoringEngine.normalize_metrics(valid_options_data)
        ranked_data = ScoringEngine.calculate_final_scores(normalized_data, weights)

        # Build Response
        ranked_options = [RankedOption(**d) for d in ranked_data]
        best_option_data = ranked_data[0]
        explanation = ExplanationEngine.generate_explanation(best_option_data)

        return RecommendationResponse(
            best_option=RankedOption(**best_option_data),
            ranked_options=ranked_options,
            explanation=explanation
        )

    async def _fetch_all_metrics(self, origin: str, request: RecommendationRequest) -> Dict[str, Any]:
        """Fetch metrics from all 3 downstream engines for a single origin."""
        # Prepare payloads
        cost_payload = {
            "product_price": request.selling_price * 0.6, # Mocking unit price for engine
            "quantity": request.quantity,
            "origin_country": origin,
            "destination_country": request.destination_country,
            "weight": request.weight,
            "shipping_mode": "sea",
            "selling_price": request.selling_price
        }
        demand_payload = {
            "product_name": request.product_name,
            "country": request.destination_country, # Prediction for destination
            "time_horizon": 3
        }
        risk_payload = {
            "origin_country": origin,
            "destination_country": request.destination_country,
            "product_name": request.product_name
        }

        # Parallel calls for one origin
        try:
            cost_task = self.cost_client.get_cost(cost_payload)
            demand_task = self.demand_client.get_prediction(demand_payload)
            risk_task = self.risk_client.get_risk(risk_payload)

            cost_res, demand_res, risk_res = await asyncio.gather(cost_task, demand_task, risk_task)

            # Process metrics
            cost_per_unit = cost_res["cost_per_unit"]
            profit_margin = (request.selling_price - cost_per_unit) / request.selling_price
            demand_value = demand_res["predicted_demand"][-1]
            risk_score = risk_res["risk_score"]
            
            # Confidence Calculation
            confidence = (
                demand_res["confidence_score"] * 0.5 + 
                (1 - risk_score) * 0.3 + 
                max(0.0, profit_margin) * 0.2
            )

            return {
                "origin_country": origin,
                "profit_margin": round(profit_margin, 2),
                "demand": demand_value,
                "risk": risk_score,
                "confidence": round(confidence, 2)
            }
        except Exception as e:
            logger.error(f"Failed to fetch metrics for {origin}: {e}")
            raise e
