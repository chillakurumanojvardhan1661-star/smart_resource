from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.dashboard import UserPreference
from ..services.dashboard_service import get_dashboard_for_user

router = APIRouter()

@router.get("/{user_id}")
def get_user_dashboard(user_id: int):
    try:
        return get_dashboard_for_user(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/preferences")
def set_preferences(user_id: int, industry: str, preferred_market: str, db: Session = Depends(get_db)):
    pref = db.query(UserPreference).filter(UserPreference.user_id == user_id).first()
    if pref:
        pref.industry = industry
        pref.preferred_market = preferred_market
    else:
        db.add(UserPreference(user_id=user_id, industry=industry, preferred_market=preferred_market))
    db.commit()
    return {"status": "Preferences Updated"}

@router.get("/health")
def health():
    return {"status": "ok", "service": "dashboard-engine"}
