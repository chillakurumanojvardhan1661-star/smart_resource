from fastapi import FastAPI, HTTPException
from .orchestrator import fetch_metrics
from common.logger import get_logger

logger = get_logger("advisor")
app = FastAPI(title="AI Trade Advisor")

@app.get("/health")
async def health():
    return {"status": "ok", "service": "advisor"}

@app.post("/recommend")
async def recommend(payload: dict):
    origins = payload.get("origin_options", [])
    if not origins:
        raise HTTPException(status_code=400, detail="No origin options provided")

    results = []
    for o in origins:
        data = await fetch_metrics(o, payload)
        if not data:
            continue

        # Simplified scoring logic for the example
        # In a real app, these would come from the specific service responses
        cost_val = data["cost"].get("total_cost", 0)
        demand_val = data["demand"].get("forecasted_demand", 0)
        risk_val = data["risk"].get("risk_score", 1.0)
        
        # Normalize and score (higher is better)
        # Note: This is a placeholder for the actual complex scoring logic
        score = (
            0.4 * (1 - (cost_val / 10000)) + 
            0.3 * (demand_val / 500) + 
            0.3 * (1 - risk_val)
        ) * 100

        results.append({
            "origin_country": o,
            "score": round(max(0, min(100, score)), 2),
            "profit_margin": round(data["cost"].get("margin", 0), 2),
            "demand": demand_val,
            "risk": risk_val,
            "confidence": 0.85, # Placeholder
            "details": data
        })

    if not results:
        raise HTTPException(status_code=500, detail="Failed to get data from sub-services")

    results.sort(key=lambda x: x["score"], reverse=True)
    best = results[0]

    return {
        "best_option": best,
        "ranked_options": results,
        "explanation": f"Based on our analysis, {best['origin_country']} offers the best balance of cost efficiency, market demand, and risk mitigation for {payload.get('product_name')}."
    }
