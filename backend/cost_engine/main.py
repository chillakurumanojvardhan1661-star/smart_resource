from fastapi import FastAPI
import random

app = FastAPI(title="Cost Intelligence Engine")

@app.get("/health")
async def health():
    return {"status": "ok", "service": "cost-engine"}

@app.post("/calculate")
async def calculate(payload: dict):
    # Mock calculation logic
    base_cost = random.uniform(50, 100)
    shipping = random.uniform(10, 30)
    taxes = (base_cost + shipping) * 0.15
    total = base_cost + shipping + taxes
    margin = (payload.get("selling_price", 200) - total) / total * 100
    
    return {
        "origin_country": payload.get("origin_country"),
        "total_cost": round(total, 2),
        "margin": round(margin, 2),
        "currency": "USD"
    }
