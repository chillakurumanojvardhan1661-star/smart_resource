from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class PriceIngest(BaseModel):
    symbol: str
    price: float
    timestamp: Optional[datetime] = None
