def evaluate_rules(p_trend, d_trend):
    alerts = []
    
    # Negative price trend (prices falling)
    if p_trend < -0.5:
        alerts.append({
            "message": "Sharp price decline detected — avoid immediate procurement",
            "severity": "HIGH",
            "category": "PRICE"
        })
    elif p_trend < -0.2:
        alerts.append({
            "message": "Steady price drop — monitor market before buying",
            "severity": "MEDIUM",
            "category": "PRICE"
        })
        
    # Negative demand trend (demand falling)
    if d_trend < -0.3:
        alerts.append({
            "message": "Target market demand is contracting significantly",
            "severity": "HIGH",
            "category": "DEMAND"
        })
    elif d_trend < -0.1:
        alerts.append({
            "message": "Slight demand softening detected",
            "severity": "LOW",
            "category": "DEMAND"
        })
        
    return alerts
