import numpy as np
from typing import List, Optional
from app.models.schemas import DemandPredictionRequest, DemandPredictionResponse
from app.services.data_providers.demand_data import JSONDemandDataProvider
from app.services.models.registry import PREDICTOR_REGISTRY
from app.core.config import settings

class DemandPredictionService:
    def __init__(self):
        self.data_provider = JSONDemandDataProvider()
        self.model_type = settings.DEFAULT_MODEL_TYPE

    def predict_demand(self, request: DemandPredictionRequest) -> DemandPredictionResponse:
        # 1. Fetch historical data
        historical_data = self.data_provider.get_historical_demand(
            request.product_name, request.country
        )
        
        if not historical_data:
            raise ValueError(f"No historical data found for {request.product_name} in {request.country}")

        # 2. Validation: Ensure minimum data points
        if len(historical_data) < settings.MIN_DATA_POINTS:
            raise ValueError(f"Insufficient data points (found {len(historical_data)}, need {settings.MIN_DATA_POINTS})")

        # 3. Model Selection via Registry
        predictor = PREDICTOR_REGISTRY.get(self.model_type)
        if not predictor:
            raise ValueError(f"Predictor type '{self.model_type}' not found in registry")

        # 4. Execute Prediction
        predicted_values = predictor.predict(
            historical_data, 
            request.time_horizon, 
            request.context
        )

        # 5. Trend Detection Logic (Slope-based)
        trend = self._detect_trend(historical_data)

        # 6. Confidence Score (Statistical Stability)
        confidence = self._calculate_confidence(historical_data)

        return DemandPredictionResponse(
            predicted_demand=[round(v, 2) for v in predicted_values],
            trend=trend,
            confidence_score=round(confidence, 2),
            model_used=self.model_type
        )

    def _detect_trend(self, data: List[float]) -> str:
        """Calculate slope using linear regression on historical data."""
        x = np.arange(len(data))
        y = np.array(data)
        slope = np.polyfit(x, y, 1)[0]
        
        if slope > 0.5:
            return "increasing"
        elif slope < -0.5:
            return "decreasing"
        else:
            return "stable"

    def _calculate_confidence(self, data: List[float]) -> float:
        """Compute confidence as 1 - (std_dev / mean), clamped 0-1."""
        if not data:
            return 0.0
        
        mean = np.mean(data)
        if mean == 0:
            return 0.0
            
        std_dev = np.std(data)
        # Higher variation leads to lower confidence
        confidence = 1 - (std_dev / mean)
        return max(0.0, min(1.0, float(confidence)))
