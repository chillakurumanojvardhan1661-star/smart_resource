from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional, List, Union
import json
import os
import random
import numpy as np
import joblib

app = FastAPI(title="Risk Intelligence Engine")

# Add CORS middleware to allow requests from the Next.js frontend
# Using wildcard for testing to eliminate CORS as a factor, but will restrict later
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

USER_DB_PATH = "users.json"
MODEL_PATH = "model.pkl"

# ---------------------------
# MODELS
# ---------------------------
class UserSignup(BaseModel):
    role: str
    company_name: str
    email: str # Using str instead of EmailStr to avoid email-validator dependency issues during testing
    password: str
    country: str
    industry: Optional[str] = None
    expected_volume: Optional[str] = None
    product_category: Optional[str] = None
    moq: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class TradeInput(BaseModel):
    export_value: float
    demand_index: float
    shipping_cost: float
    currency_rate: float
    temperature: float

# ---------------------------
# HELPERS
# ---------------------------
def load_users():
    if not os.path.exists(USER_DB_PATH):
        return {}
    with open(USER_DB_PATH, "r") as f:
        try:
            data = json.load(f)
            if isinstance(data, list):
                # Convert old list format to dict format
                return {u["email"]: u for u in data if "email" in u}
            return data
        except:
            return {}

def save_users(users):
    with open(USER_DB_PATH, "w") as f:
        json.dump(users, f, indent=4)

# ---------------------------
# AUTH ROUTES
# ---------------------------
@app.post("/signup")
async def signup(user: UserSignup):
    users = load_users()
    
    if user.email in users:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_data = user.dict()
    users[user.email] = user_data
    save_users(users)
    
    return {"message": "User registered successfully", "user": {"name": user.company_name, "email": user.email, "role": user.role}}

@app.post("/login")
async def login(credentials: UserLogin):
    users = load_users()
    user = users.get(credentials.email)
    
    if not user or user["password"] != credentials.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    return {
        "message": "Login successful", 
        "user": {
            "name": user.get("company_name", user.get("name")), 
            "email": user["email"], 
            "role": user.get("role", "Sourcing Company") # Default for legacy users
        }
    }

# ---------------------------
# ML ENGINE (Legacy)
# ---------------------------
if not os.path.exists(MODEL_PATH):
    joblib.dump("dummy_model", MODEL_PATH)

@app.post("/predict")
def predict(data: TradeInput):
    prediction = random.uniform(50, 150)
    return {
        "insight": "Trade opportunity analysis completed",
        "risk_level": "Low" if prediction > 100 else "Medium",
        "metrics": {"predicted_trade_score": prediction}
    }

@app.get("/")
def home():
    return {"message": "Smart Trade Intelligence API 🚀"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
