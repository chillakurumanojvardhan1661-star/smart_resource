from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import pandas as pd
from ..database import get_db
from ..models.market_data import MarketData
from ..services.prediction_service import get_demand_forecast, get_price_prediction
from ..ml.trainer import train_models

router = APIRouter()

@router.get("/demand")
def demand_forecast():
    return {"forecast": get_demand_forecast()}

@router.get("/price")
def price_prediction(db: Session = Depends(get_db)):
    latest = db.query(MarketData).order_by(MarketData.timestamp.desc()).first()
    if not latest:
        return {"error": "No historical data available for prediction"}

    latest_data = {
        "day": latest.timestamp.day,
        "month": latest.timestamp.month,
        "lag1": latest.price
    }

    prediction = get_price_prediction(latest_data)
    return {"predicted_price": prediction, "latest_price": latest.price}

@router.post("/train")
def train(db: Session = Depends(get_db)):
    data = db.query(MarketData).all()
    if len(data) < 5:
        raise HTTPException(status_code=400, detail="Insufficient data for training (min 5 samples)")
    
    df = pd.DataFrame([{
        "product": d.product,
        "price": d.price,
        "demand": d.demand,
        "timestamp": d.timestamp
    } for d in data])
    
    return train_models(df)

from typing import List
from ..schemas.market_data import MarketDataCreate

@router.post("/ingest")
def ingest(payload: List[MarketDataCreate], db: Session = Depends(get_db)):
    for item in payload:
        db.add(MarketData(
            product=item.product,
            price=item.price,
            demand=item.demand,
            timestamp=item.timestamp if item.timestamp else None
        ))
    db.commit()
    return {"status": "Data ingested successfully", "count": len(payload)}
