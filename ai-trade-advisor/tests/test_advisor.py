import pytest
from app.services.scoring_engine import ScoringEngine
from app.services.explanation_engine import ExplanationEngine

def test_normalization_logic():
    data = [
        {"origin_country": "A", "profit_margin": 0.1, "demand": 100, "risk": 0.2},
        {"origin_country": "B", "profit_margin": 0.5, "demand": 500, "risk": 0.8}
    ]
    
    normalized = ScoringEngine.normalize_metrics(data)
    
    # Check Profit (Higher is better)
    assert normalized[0]["profit_margin_norm"] == 0.0
    assert normalized[1]["profit_margin_norm"] == 1.0
    
    # Check Risk (Lower is better, so inverted)
    # Risk A=0.2, B=0.8. Min=0.2, Max=0.8. 
    # A norm = (0.2-0.2)/0.6 = 0. Inverted = 1.0
    # B norm = (0.8-0.2)/0.6 = 1. Inverted = 0.0
    assert normalized[0]["risk_norm"] == 1.0
    assert normalized[1]["risk_norm"] == 0.0

def test_final_scoring():
    normalized_data = [
        {"origin_country": "A", "profit_margin_norm": 1.0, "demand_norm": 1.0, "risk_norm": 0.0},
        {"origin_country": "B", "profit_margin_norm": 0.0, "demand_norm": 0.0, "risk_norm": 1.0}
    ]
    weights = {"profit": 0.5, "demand": 0.5, "risk": 0.0}
    
    scored = ScoringEngine.calculate_final_scores(normalized_data, weights)
    
    assert scored[0]["origin_country"] == "A"
    assert scored[0]["score"] == 1.0
    assert scored[1]["score"] == 0.0

def test_explanation_generation():
    best_option = {
        "origin_country": "Vietnam",
        "profit_margin_norm": 0.9,
        "demand_norm": 0.8,
        "risk_norm": 0.2
    }
    explanation = ExplanationEngine.generate_explanation(best_option)
    assert "Vietnam" in explanation
    assert "high profit margin" in explanation
    assert "strong demand" in explanation
    assert "low operational risk" not in explanation
