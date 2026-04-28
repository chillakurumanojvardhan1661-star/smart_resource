from pydantic import BaseModel
from typing import Optional

class CompanyIngest(BaseModel):
    name: str
    carbon_emission: Optional[float] = 0.0
    energy_usage: Optional[float] = 0.0
    waste_management_score: Optional[float] = 0.0
    labor_score: Optional[float] = 0.0
    diversity_score: Optional[float] = 0.0
    governance_score: Optional[float] = 0.0
