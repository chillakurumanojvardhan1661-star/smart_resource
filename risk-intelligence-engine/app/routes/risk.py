from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.price_history import PriceHistory
from ..services.risk_service import analyze_asset
from ..risk.anomaly import AnomalyDetector
import numpy as np

router = APIRouter()

@router.get("/asset/{symbol}")
def asset_risk(symbol: str, db: Session = Depends(get_db)):
    prices = db.query(PriceHistory.price)\
               .filter(PriceHistory.symbol == symbol.upper())\
               .order_by(PriceHistory.timestamp).all()

    if not prices:
        raise HTTPException(status_code=404, detail=f"No price history found for symbol {symbol}")

    price_list = [p[0] for p in prices]
    return analyze_asset(price_list)

from typing import List
from ..schemas.risk import PriceIngest

@router.post("/ingest")
def ingest_prices(payload: List[PriceIngest], db: Session = Depends(get_db)):
    for item in payload:
        db.add(PriceHistory(
            symbol=item.symbol.upper(),
            price=item.price,
            timestamp=item.timestamp if item.timestamp else None
        ))
    db.commit()
    return {"status": "Prices ingested", "count": len(payload)}

@router.post("/train-anomaly")
def train_anomaly(symbol: str, db: Session = Depends(get_db)):
    prices = db.query(PriceHistory.price)\
               .filter(PriceHistory.symbol == symbol.upper())\
               .all()
    
    if len(prices) < 5:
        raise HTTPException(status_code=400, detail="Insufficient data for training (min 5 samples)")
        
    data = np.array([p[0] for p in prices]).reshape(-1, 1)
    detector = AnomalyDetector()
    detector.train(data)
    
    return {"status": "Anomaly model trained for " + symbol}
