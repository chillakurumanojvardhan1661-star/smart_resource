from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.alert import Alert
from ..services.alert_service import process_decision_check

router = APIRouter()

@router.post("/check")
def check_loss_prevention(data: dict):
    if "prices" not in data or "demand" not in data:
        raise HTTPException(status_code=400, detail="Missing prices or demand data")
        
    return process_decision_check(data)

@router.get("/history")
def get_alert_history(limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Alert).order_by(Alert.timestamp.desc()).limit(limit).all()

@router.get("/health")
def health():
    return {"status": "ok", "service": "loss-prevention-engine"}
