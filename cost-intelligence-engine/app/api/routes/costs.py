from fastapi import APIRouter, HTTPException, Depends
from app.models.schemas import CostCalculationRequest, CostCalculationResponse
from app.services.cost_service import CostIntelligenceService
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

def get_cost_service() -> CostIntelligenceService:
    return CostIntelligenceService()

@router.post("/calculate", response_model=CostCalculationResponse, status_code=200)
async def calculate_landed_cost(
    request: CostCalculationRequest,
    service: CostIntelligenceService = Depends(get_cost_service)
):
    """
    Calculate the true landed cost for a product.
    Includes shipping, duties, taxes, and handling.
    """
    try:
        response = service.calculate_cost(request)
        return response
    except ValueError as ve:
        logger.error(f"Validation error during calculation: {ve}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"Unexpected error calculating cost: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during cost calculation.")
