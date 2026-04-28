from fastapi import FastAPI
import random

app = FastAPI(title="Demand Prediction Engine")

@app.get("/health")
async def health():
    return {"status": "ok", "service": "demand-engine"}

@app.post("/predict")
async def predict(payload: dict):
    # Mock prediction logic
    base_demand = random.randint(100, 500)
    growth = random.uniform(-0.1, 0.2)
    forecast = [int(base_demand * (1 + growth)**i) for i in range(1, 6)]
    
    return {
        "origin_country": payload.get("origin_country"),
        "forecasted_demand": base_demand,
        "trend": "upward" if growth > 0 else "downward",
        "forecast": forecast
    }
