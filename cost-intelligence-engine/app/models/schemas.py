from pydantic import BaseModel, Field
from typing import Optional

class CostBreakdown(BaseModel):
    shipping: float
    duty: float
    tax: float
    handling: float

class CostCalculationRequest(BaseModel):
    product_price: float = Field(..., gt=0, description="Price of a single unit of the product")
    quantity: int = Field(..., gt=0, description="Number of units")
    origin_country: str = Field(..., description="Country of origin")
    destination_country: str = Field(..., description="Country of destination")
    weight: float = Field(..., gt=0, description="Total weight of the shipment in kg")
    shipping_mode: str = Field(..., pattern="^(air|sea|land)$", description="Mode of transportation")
    selling_price: Optional[float] = Field(None, gt=0, description="Expected selling price per unit")

class CostCalculationResponse(BaseModel):
    total_landed_cost: float
    cost_per_unit: float
    profit_margin: Optional[float] = None
    cost_breakdown: CostBreakdown
