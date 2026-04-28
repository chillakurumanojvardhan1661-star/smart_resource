from .signals import calculate_price_trend, calculate_demand_trend
from .rules import evaluate_rules
from .ml_model import RiskModel

risk_model = RiskModel()

def evaluate_decision(data):
    prices = data["prices"]
    demand = data["demand"]
    
    p_trend = calculate_price_trend(prices)
    d_trend = calculate_demand_trend(demand)
    
    # Get rule-based alerts
    alerts = evaluate_rules(p_trend, d_trend)
    
    # Get ML prediction
    # We normalize/standardize trends slightly for the model
    risk_flag = risk_model.predict([p_trend, d_trend])
    
    if risk_flag == 1:
        # Avoid duplicate messages if rules already caught it
        if not any("High risk" in a["message"] for a in alerts):
            alerts.append({
                "message": "AI System detects high structural risk — reconsider transaction",
                "severity": "CRITICAL",
                "category": "RISK"
            })
            
    return {
        "p_trend": float(p_trend),
        "d_trend": float(d_trend),
        "alerts": alerts
    }
