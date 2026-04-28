from fastapi import FastAPI
from contextlib import asynccontextmanager
from .routes import prediction
from .database import engine, Base
from .models.market_data import MarketData

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="Predictive Demand Engine", lifespan=lifespan)

app.include_router(prediction.router, prefix="/api/v1/predict")

@app.get("/")
def root():
    return {"message": "Predictive Demand & Price Trends Engine Running"}

@app.get("/health")
def health():
    return {"status": "ok", "service": "predictive-engine"}
