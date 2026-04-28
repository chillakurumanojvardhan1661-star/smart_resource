from pydantic import BaseModel
from typing import Optional

class SupplierIngest(BaseModel):
    name: str
    cost_per_unit: float
    capacity: float
    risk_score: Optional[float] = 0.5
    sustainability_score: Optional[float] = 50.0
