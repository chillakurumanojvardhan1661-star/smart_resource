from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class DemandPredictionRequest(BaseModel):
    product_name: str = Field(..., description="Name of the product")
    country: str = Field(..., description="Target country")
    time_horizon: int = Field(..., gt=0, description="Number of months to predict")
    context: Optional[Dict[str, Any]] = Field(None, description="Optional metadata for prediction")

class DemandPredictionResponse(BaseModel):
    predicted_demand: List[float]
    trend: str
    confidence_score: float
    model_used: str
