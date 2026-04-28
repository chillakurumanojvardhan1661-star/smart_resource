from .recommender import recommend_products
from .market_selector import suggest_markets
from .alert_aggregator import aggregate_user_alerts

def build_dashboard_data(user_pref, products, demand_data, user_id):
    """
    Main aggregator that assembles the cockpit view.
    """
    recommended = recommend_products(user_pref, products)
    markets = suggest_markets(demand_data, user_pref)
    alerts = aggregate_user_alerts(user_id)
    
    return {
        "user_id": user_id,
        "industry_focus": user_pref.get("industry"),
        "top_recommendations": recommended,
        "market_outlook": markets,
        "critical_alerts": alerts,
        "system_status": {
            "predictive_engine": "online",
            "risk_engine": "online",
            "optimization_engine": "online"
        }
    }
