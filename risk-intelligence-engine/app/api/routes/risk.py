from fastapi import APIRouter, HTTPException, Depends
from app.models.schemas import RiskEvaluationRequest, RiskEvaluationResponse
from app.services.risk_service import RiskIntelligenceService
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

def get_risk_service() -> RiskIntelligenceService:
    return RiskIntelligenceService()

@router.post("/evaluate", response_model=RiskEvaluationResponse, status_code=200)
async def evaluate_risk(
    request: RiskEvaluationRequest,
    service: RiskIntelligenceService = Depends(get_risk_service)
):
    """
    Evaluate global trade risk for a specific country pair and product.
    """
    try:
        response = service.evaluate_risk(request)
        return response
    except ValueError as ve:
        logger.error(f"Validation error: {ve}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during risk evaluation.")
