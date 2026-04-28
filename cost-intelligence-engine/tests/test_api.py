from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_calculate_cost_endpoint():
    payload = {
        "product_price": 100,
        "quantity": 50,
        "origin_country": "China",
        "destination_country": "India",
        "weight": 20,
        "shipping_mode": "air",
        "selling_price": 150
    }
    
    response = client.post("/api/v1/costs/calculate", json=payload)
    
    assert response.status_code == 200
    data = response.json()
    
    assert "total_landed_cost" in data
    assert "cost_per_unit" in data
    assert "profit_margin" in data
    assert "cost_breakdown" in data
    
    # 20 * 80
    assert data["cost_breakdown"]["shipping"] == 1600.0

def test_calculate_cost_invalid_input():
    payload = {
        "product_price": -100, # Invalid
        "quantity": 50,
        "origin_country": "China",
        "destination_country": "India",
        "weight": 20,
        "shipping_mode": "air"
    }
    
    response = client.post("/api/v1/costs/calculate", json=payload)
    assert response.status_code == 422 # FastAPI validation error
