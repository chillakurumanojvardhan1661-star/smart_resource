def suggest_markets(demand_data, user_pref):
    """
    Market selection based on growth and preference.
    """
    pref_market = user_pref.get("preferred_market")
    
    # Sort by growth
    sorted_markets = sorted(
        demand_data,
        key=lambda x: x.get("growth", 0),
        reverse=True
    )
    
    # Promote preferred market if it exists in data
    results = []
    if pref_market:
        results = [m for m in sorted_markets if m["market"].lower() == pref_market.lower()]
        sorted_markets = [m for m in sorted_markets if m["market"].lower() != pref_market.lower()]
    
    results.extend(sorted_markets)
    return results[:3]
