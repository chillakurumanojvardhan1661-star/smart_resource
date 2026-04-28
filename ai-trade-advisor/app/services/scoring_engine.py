import numpy as np
from typing import List, Dict

class ScoringEngine:
    @staticmethod
    def normalize_metrics(options_data: List[Dict[str, float]]) -> List[Dict[str, float]]:
        """
        Applies min-max normalization across all origin options for profit, demand, and risk.
        Inverts risk so that higher normalized_risk is better (lower actual risk).
        """
        if not options_data:
            return []

        keys = ["profit_margin", "demand", "risk"]
        normalized_data = [d.copy() for d in options_data]

        for key in keys:
            values = [d[key] for d in options_data]
            v_min = min(values)
            v_max = max(values)
            
            for d in normalized_data:
                if v_max == v_min:
                    d[f"{key}_norm"] = 0.5 # Neutral if all values are same
                else:
                    norm = (d[key] - v_min) / (v_max - v_min)
                    # For risk, lower is better, so we invert
                    d[f"{key}_norm"] = 1.0 - norm if key == "risk" else norm

        return normalized_data

    @staticmethod
    def calculate_final_scores(
        normalized_data: List[Dict[str, float]], 
        weights: Dict[str, float]
    ) -> List[Dict[str, float]]:
        # Ensure weights sum to 1
        total_w = sum(weights.values())
        norm_weights = {k: v / total_w for k, v in weights.items()}

        for d in normalized_data:
            score = (
                norm_weights["profit"] * d["profit_margin_norm"] +
                norm_weights["demand"] * d["demand_norm"] +
                norm_weights["risk"] * d["risk_norm"]
            )
            d["score"] = round(score, 2)

        return sorted(normalized_data, key=lambda x: x["score"], reverse=True)
