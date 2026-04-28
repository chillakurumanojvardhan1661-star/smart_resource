from pydantic import BaseModel, Field
from typing import List, Optional, Dict

class RecommendationRequest(BaseModel):
    product_name: str = Field(..., description="Name of the product")
    origin_options: List[str] = Field(..., description="List of potential origin countries")
    destination_country: str = Field(..., description="Target destination country")
    quantity: int = Field(..., gt=0)
    weight: float = Field(..., gt=0)
    selling_price: float = Field(..., gt=0)
    weights: Optional[Dict[str, float]] = Field(None, description="Custom weights for scoring")

class RankedOption(BaseModel):
    origin_country: str
    score: float
    profit_margin: float
    demand: float
    risk: float
    confidence: float

class RecommendationResponse(BaseModel):
    best_option: RankedOption
    ranked_options: List[RankedOption]
    explanation: str
