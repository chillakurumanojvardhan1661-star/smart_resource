from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import joblib
import os
import random

app = FastAPI(title="Risk Intelligence Engine")

# Add CORS middleware to allow requests from the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "model.pkl"

# ---------------------------
# CREATE MODEL IF NOT EXISTS
# ---------------------------
if not os.path.exists(MODEL_PATH):
    from sklearn.linear_model import LinearRegression
    import pandas as pd

    data = []
    for i in range(100):
        export = np.random.randint(800, 1500)
        demand = np.random.randint(50, 100)
        shipping = np.random.randint(500, 1200)

        target = (export * demand) / shipping
        data.append([export, demand, shipping, 83, 300, target])

    df = pd.DataFrame(data, columns=[
        "export_value", "demand_index", "shipping_cost",
        "currency_rate", "temperature", "target"
    ])

    X = df.drop("target", axis=1)
    y = df["target"]

    model = LinearRegression()
    model.fit(X, y)

    joblib.dump(model, MODEL_PATH)

model = joblib.load(MODEL_PATH)

# ---------------------------
# INPUT SCHEMA
# ---------------------------
class TradeInput(BaseModel):
    export_value: float
    demand_index: float
    shipping_cost: float
    currency_rate: float
    temperature: float


# ---------------------------
# BUSINESS LOGIC LAYER
# ---------------------------
def generate_insights(prediction, data):
    demand_score = min(100, data.demand_index)
    supply_score = min(100, data.export_value / 15)

    gap = demand_score - supply_score

    # Risk logic
    if prediction > 120:
        risk = "Low"
        recommendation = "High profit opportunity. Proceed with trade."
    elif prediction > 80:
        risk = "Medium"
        recommendation = "Moderate returns. Optimize logistics."
    else:
        risk = "High"
        recommendation = "Risky trade. Consider alternative suppliers."

    return {
        "insight": "Trade opportunity analysis completed",
        "confidence": round(float(min(1.0, prediction / 150)), 2),
        "recommendation": recommendation,
        "risk_level": risk,
        "metrics": {
            "predicted_trade_score": float(prediction),
            "demand_score": round(demand_score, 2),
            "supply_score": round(supply_score, 2),
            "demand_supply_gap": round(gap, 2),
            "estimated_profitability_index": round(prediction / 10, 2)
        }
    }


# ---------------------------
# ROUTES
# ---------------------------
@app.get("/")
def home():
    return {"message": "Smart Trade Intelligence API 🚀"}

@app.post("/predict")
def predict(data: TradeInput):
    features = np.array([[ 
        data.export_value,
        data.demand_index,
        data.shipping_cost,
        data.currency_rate,
        data.temperature
    ]])

    prediction = model.predict(features)[0]

    # Generate structured output
    response = generate_insights(prediction, data)

    return response

@app.get("/health")
def health():
    return {"status": "ok", "service": "risk-engine"}

@app.post("/evaluate")
async def evaluate(payload: dict):
    # Retain the original evaluate endpoint just in case
    risk_score = random.uniform(0.1, 0.6)
    factors = {
        "political": random.uniform(0.1, 0.4),
        "logistics": random.uniform(0.1, 0.5),
        "environmental": random.uniform(0.05, 0.2)
    }
    
    return {
        "origin_country": payload.get("origin_country"),
        "risk_score": round(risk_score, 2),
        "factors": factors,
        "status": "Low" if risk_score < 0.3 else "Medium"
    }
