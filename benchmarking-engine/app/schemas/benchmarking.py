from pydantic import BaseModel
from typing import Optional

class CompanyMetricIngest(BaseModel):
    company_name: str
    revenue: float
    profit_margin: float
    market_share: float
    risk_score: Optional[float] = 0.5
    sustainability_score: Optional[float] = 50.0
