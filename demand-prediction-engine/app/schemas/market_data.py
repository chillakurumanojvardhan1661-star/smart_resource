from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class MarketDataCreate(BaseModel):
    product: str
    price: float
    demand: float
    timestamp: Optional[datetime] = None

class MarketDataResponse(BaseModel):
    id: int
    product: str
    price: float
    demand: float
    timestamp: datetime

    class Config:
        from_attributes = True
