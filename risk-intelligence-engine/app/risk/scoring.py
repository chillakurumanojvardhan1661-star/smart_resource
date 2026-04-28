import numpy as np
from .var import calculate_var

def calculate_volatility(prices):
    if len(prices) < 2:
        return 0.0
    returns = np.diff(prices) / prices[:-1]
    return float(np.std(returns))

def calculate_risk_metrics(prices):
    if len(prices) < 2:
        return {
            "volatility": 0.0,
            "VaR": 0.0,
            "risk_score": 0.0
        }
        
    returns = np.diff(prices) / prices[:-1]

    volatility = np.std(returns)
    var = calculate_var(returns)

    # Risk score normalized to 0-1 range (simplified)
    score = (volatility * 0.6) + (var * 0.4)

    return {
        "volatility": float(volatility),
        "VaR": float(var),
        "risk_score": float(score)
    }
