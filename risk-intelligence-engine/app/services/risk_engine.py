from typing import List, Dict, Any, Optional
from app.services.plugins.base import RiskPlugin
from app.core.config import settings

class RiskIntelligenceEngine:
    def __init__(self):
        self.plugins: List[RiskPlugin] = []

    def register_plugin(self, plugin: RiskPlugin):
        self.plugins.append(plugin)

    def evaluate(
        self, 
        data: Dict[str, float], 
        weights: Dict[str, float],
        context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Runs all registered risk plugins and computes a weighted risk score.
        """
        # 1. Normalize weights so sum = 1
        total_weight = sum(weights.values())
        normalized_weights = {k: v / total_weight for k, v in weights.items()}
        
        # 2. Calculate individual factor scores and the total weighted score
        breakdown = {}
        total_score = 0.0
        
        for plugin in self.plugins:
            name = plugin.factor_name
            factor_score = plugin.calculate(data, context)
            weight = normalized_weights.get(name, 0.0)
            
            breakdown[name] = factor_score
            total_score += factor_score * weight

        # 3. Classify Risk Level
        risk_level = self._classify_risk(total_score)
        
        # 4. Generate Insight Layer
        insight_data = self._generate_insights(breakdown, normalized_weights)
        
        return {
            "risk_score": round(total_score, 2),
            "risk_level": risk_level,
            "risk_breakdown": breakdown,
            **insight_data
        }

    def _classify_risk(self, score: float) -> str:
        if score < settings.LOW_RISK_THRESHOLD:
            return "low"
        elif score < settings.MEDIUM_RISK_THRESHOLD:
            return "medium"
        else:
            return "high"

    def _generate_insights(self, breakdown: Dict[str, float], weights: Dict[str, float]) -> Dict[str, str]:
        """Identifies the top contributing risk factor and generates a human-readable insight."""
        # Find factor with highest contribution (score * weight)
        contributions = {k: breakdown[k] * weights.get(k, 0.0) for k in breakdown}
        top_factor = max(contributions, key=contributions.get)
        
        insights_map = {
            "political": "Political instability or trade policy changes are the dominant risks.",
            "currency": "Currency volatility is the dominant risk factor.",
            "logistics": "Supply chain and logistical constraints are the primary concerns.",
            "market": "Market demand fluctuations and competitive pressures are the main risks."
        }
        
        return {
            "top_risk_factor": top_factor,
            "insight": insights_map.get(top_factor, "General risk factors are within monitored ranges.")
        }
