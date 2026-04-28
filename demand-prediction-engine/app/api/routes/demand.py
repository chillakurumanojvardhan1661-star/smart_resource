from fastapi import APIRouter, HTTPException, Depends
from app.models.schemas import DemandPredictionRequest, DemandPredictionResponse
from app.services.demand_service import DemandPredictionService
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

def get_demand_service() -> DemandPredictionService:
    return DemandPredictionService()

@router.post("/predict", response_model=DemandPredictionResponse, status_code=200)
async def predict_demand(
    request: DemandPredictionRequest,
    service: DemandPredictionService = Depends(get_demand_service)
):
    """
    Predict future demand for a product in a specific country.
    """
    try:
        response = service.predict_demand(request)
        return response
    except ValueError as ve:
        logger.error(f"Validation error: {ve}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during prediction.")
