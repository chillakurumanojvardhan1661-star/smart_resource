from fastapi import APIRouter, HTTPException, Depends
from app.models.schemas import RecommendationRequest, RecommendationResponse
from app.services.advisor_service import AdvisorService
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

def get_advisor_service() -> AdvisorService:
    return AdvisorService()

@router.post("/recommend", response_model=RecommendationResponse, status_code=200)
async def get_sourcing_recommendation(
    request: RecommendationRequest,
    service: AdvisorService = Depends(get_advisor_service)
):
    """
    Generate the optimal sourcing recommendation by aggregating cost, demand, and risk data.
    """
    try:
        response = await service.get_recommendation(request)
        return response
    except ValueError as ve:
        logger.error(f"Validation error: {ve}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"Unexpected error in advisor: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while generating recommendation.")
