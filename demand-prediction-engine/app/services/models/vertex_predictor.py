from typing import List, Dict, Any, Optional
from app.services.models.base import BasePredictor

class VertexAIPredictor(BasePredictor):
    """
    Stub for future Vertex AI integration.
    This will eventually use the google-cloud-aiplatform library to call a hosted endpoint.
    """
    def predict(
        self, 
        historical_data: List[float], 
        horizon: int, 
        context: Optional[Dict[str, Any]] = None
    ) -> List[float]:
        # In future: call aiplatform.Endpoint(settings.VERTEX_ENDPOINT_ID).predict()
        raise NotImplementedError("Vertex AI predictor not yet implemented. Use 'linear' for Phase 1.")
