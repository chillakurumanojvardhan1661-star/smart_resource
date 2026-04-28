from typing import Dict
from app.services.models.base import BasePredictor
from app.services.models.linear_predictor import LinearRegressionPredictor
from app.services.models.vertex_predictor import VertexAIPredictor

PREDICTOR_REGISTRY: Dict[str, BasePredictor] = {
    "linear": LinearRegressionPredictor(),
    "vertex_ai": VertexAIPredictor()
}
