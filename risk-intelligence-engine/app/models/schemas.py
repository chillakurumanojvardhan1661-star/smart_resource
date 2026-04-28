from pydantic import BaseModel, Field, field_validator
from typing import Optional, Dict

class RiskBreakdown(BaseModel):
    political: float = Field(..., ge=0, le=1)
    currency: float = Field(..., ge=0, le=1)
    logistics: float = Field(..., ge=0, le=1)
    market: float = Field(..., ge=0, le=1)

class RiskEvaluationRequest(BaseModel):
    origin_country: str = Field(..., description="Country of origin")
    destination_country: str = Field(..., description="Country of destination")
    product_name: Optional[str] = Field(None, description="Name of the product")
    weights: Optional[Dict[str, float]] = Field(None, description="Custom weights for risk factors")

    @field_validator('weights')
    @classmethod
    def validate_weights(cls, v: Optional[Dict[str, float]]) -> Optional[Dict[str, float]]:
        if v is not None:
            required_keys = {"political", "currency", "logistics", "market"}
            if not all(key in v for key in required_keys):
                raise ValueError(f"Weights must include all risk factors: {required_keys}")
            # Weights will be normalized in the service layer
        return v

class RiskEvaluationResponse(BaseModel):
    risk_score: float
    risk_level: str
    risk_breakdown: RiskBreakdown
    top_risk_factor: str
    insight: str
