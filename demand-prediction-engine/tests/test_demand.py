import pytest
from app.services.demand_service import DemandPredictionService
from app.models.schemas import DemandPredictionRequest

@pytest.fixture
def service():
    return DemandPredictionService()

def test_trend_detection_increasing(service):
    data = [100, 110, 120, 130, 140]
    assert service._detect_trend(data) == "increasing"

def test_trend_detection_decreasing(service):
    data = [200, 180, 160, 140, 120]
    assert service._detect_trend(data) == "decreasing"

def test_trend_detection_stable(service):
    data = [100, 101, 99, 100, 101]
    assert service._detect_trend(data) == "stable"

def test_confidence_score(service):
    stable_data = [100, 101, 99, 100]
    volatile_data = [100, 50, 150, 10]
    
    stable_conf = service._calculate_confidence(stable_data)
    volatile_conf = service._calculate_confidence(volatile_data)
    
    assert stable_conf > volatile_conf
    assert 0 <= stable_conf <= 1.0

def test_predict_laptop_india(service):
    request = DemandPredictionRequest(
        product_name="laptop",
        country="India",
        time_horizon=3
    )
    response = service.predict_demand(request)
    
    assert len(response.predicted_demand) == 3
    assert response.trend == "increasing"
    assert response.confidence_score > 0.5
