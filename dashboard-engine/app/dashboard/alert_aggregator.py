import random

def aggregate_user_alerts(user_id):
    """
    Simulates aggregation from the Loss Prevention and Risk engines.
    """
    # In production, these would be API calls to ports 8003 and 8012
    all_potential_alerts = [
        {"msg": "Prices dropping in Agri sector — hold procurement", "severity": "HIGH", "module": "Loss Prevention"},
        {"msg": "Port congestion at Shanghai rising (0.85)", "severity": "MEDIUM", "module": "Logistics"},
        {"msg": "Sustainability score for Supplier X below threshold", "severity": "LOW", "module": "Sustainability"},
        {"msg": "New market opportunity detected in India", "severity": "INFO", "module": "Predictive"}
    ]
    
    # Return 2-3 random alerts for simulation
    return random.sample(all_potential_alerts, 2)
