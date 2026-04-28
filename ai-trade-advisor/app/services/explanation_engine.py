from typing import Dict, Any

class ExplanationEngine:
    @staticmethod
    def generate_explanation(best_option: Dict[str, Any]) -> str:
        """
        Generates a human-readable explanation based on normalized metric strengths.
        """
        origin = best_option["origin_country"]
        
        reasons = []
        if best_option["profit_margin_norm"] >= 0.7:
            reasons.append("high profit margin")
        if best_option["demand_norm"] >= 0.7:
            reasons.append("strong demand")
        if best_option["risk_norm"] >= 0.7:
            reasons.append("low operational risk")
            
        if not reasons:
            reasons = ["a balanced profile across all trade metrics"]
            
        explanation = f"{origin} is recommended due to {', '.join(reasons[:-1])}"
        if len(reasons) > 1:
            explanation += f" and {reasons[-1]}."
        else:
            explanation += f"{reasons[0]}."
            
        return explanation
