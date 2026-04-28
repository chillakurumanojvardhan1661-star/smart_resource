from ..risk.scoring import calculate_risk_metrics
from ..risk.anomaly import AnomalyDetector
import numpy as np

detector = AnomalyDetector()

def analyze_asset(prices):
    if not prices:
        return {
            "risk": {"volatility": 0, "VaR": 0, "risk_score": 0},
            "anomalies": []
        }
        
    risk = calculate_risk_metrics(prices)

    data = np.array(prices).reshape(-1, 1)
    anomalies = detector.detect(data)

    return {
        "risk": risk,
        "anomalies": anomalies,
        "latest_price": prices[-1] if prices else None
    }
