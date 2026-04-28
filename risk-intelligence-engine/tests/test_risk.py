import pytest
from app.services.risk_service import RiskIntelligenceService
from app.models.schemas import RiskEvaluationRequest

@pytest.fixture
def service():
    return RiskIntelligenceService()

def test_risk_evaluation_low(service):
    request = RiskEvaluationRequest(
        origin_country="China",
        destination_country="Germany"
    )
    response = service.evaluate_risk(request)
    
    assert response.risk_score < 0.3
    assert response.risk_level == "low"
    assert "political" in response.risk_breakdown.model_dump()

def test_risk_evaluation_high(service):
    request = RiskEvaluationRequest(
        origin_country="Germany",
        destination_country="Brazil"
    )
    response = service.evaluate_risk(request)
    
    assert response.risk_score > 0.4 # Brazil is higher in mock data
    assert response.risk_level in ["medium", "high"]

def test_custom_weights(service):
    # Heavily weight political risk
    request = RiskEvaluationRequest(
        origin_country="China",
        destination_country="India",
        weights={
            "political": 1.0,
            "currency": 0.0,
            "logistics": 0.0,
            "market": 0.0
        }
    )
    response = service.evaluate_risk(request)
    
    # In mock data, India political risk is 0.3
    assert response.risk_score == 0.3
    assert response.top_risk_factor == "political"

def test_weight_normalization(service):
    # Weights sum to 2.0, should be normalized
    request = RiskEvaluationRequest(
        origin_country="China",
        destination_country="USA",
        weights={
            "political": 0.5,
            "currency": 0.5,
            "logistics": 0.5,
            "market": 0.5
        }
    )
    response = service.evaluate_risk(request)
    
    # Score should be the average of the 4 factors
    # USA: pol 0.1, cur 0.1, log 0.1, mkt 0.2 -> avg 0.125 -> round 0.13
    assert response.risk_score == 0.13

def test_unknown_country(service):
    request = RiskEvaluationRequest(
        origin_country="China",
        destination_country="Atlantis"
    )
    with pytest.raises(ValueError):
        service.evaluate_risk(request)
