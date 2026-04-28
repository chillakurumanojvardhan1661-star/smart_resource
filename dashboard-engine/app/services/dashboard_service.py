from ..dashboard.aggregator import build_dashboard_data
from ..database import SessionLocal
from ..models.dashboard import UserPreference, DashboardCache

def get_dashboard_for_user(user_id):
    db = SessionLocal()
    try:
        # 1. Fetch user preferences
        pref = db.query(UserPreference).filter(UserPreference.user_id == user_id).first()
        if not pref:
            # Default preferences if none set
            user_pref = {"industry": "agri", "preferred_market": "india"}
        else:
            user_pref = {"industry": pref.industry, "preferred_market": pref.preferred_market}
            
        # 2. Mock external data (In prod, these are API calls or DB lookups)
        products = [
            {"name": "Premium Wheat", "industry": "agri", "price": 450},
            {"name": "Organic Soy", "industry": "agri", "price": 600},
            {"name": "Structural Steel", "industry": "industrial", "price": 1200},
            {"name": "Solar Panels", "industry": "energy", "price": 3000},
            {"name": "Corn Syrup", "industry": "agri", "price": 150}
        ]
        
        demand_data = [
            {"market": "India", "growth": 0.85},
            {"market": "Vietnam", "growth": 0.72},
            {"market": "Brazil", "growth": 0.65},
            {"market": "USA", "growth": 0.40}
        ]
        
        # 3. Aggregate
        dashboard_data = build_dashboard_data(user_pref, products, demand_data, user_id)
        
        # 4. Cache the result
        cache = db.query(DashboardCache).filter(DashboardCache.user_id == user_id).first()
        if cache:
            cache.data = dashboard_data
        else:
            db.add(DashboardCache(user_id=user_id, data=dashboard_data))
        db.commit()
        
        return dashboard_data
    finally:
        db.close()
