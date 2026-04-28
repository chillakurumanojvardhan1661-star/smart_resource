def recommend_products(user_pref, products):
    """
    Industry-aligned product recommendation.
    """
    industry = user_pref.get("industry", "").lower()
    
    recommended = [
        p for p in products
        if p.get("industry", "").lower() == industry
    ]
    
    # Fill remaining slots with high-scoring items if list is short
    if len(recommended) < 5:
        others = [p for p in products if p not in recommended]
        recommended.extend(others[:5 - len(recommended)])
        
    return recommended[:5]
