from fastapi import FastAPI
from contextlib import asynccontextmanager
from .routes import risk
from .database import engine, Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="Risk Intelligence Engine", lifespan=lifespan)

app.include_router(risk.router, prefix="/api/v1/risk")

@app.get("/")
def root():
    return {"message": "Risk Intelligence Engine Running"}

@app.get("/health")
def health():
    return {"status": "ok", "service": "risk-engine"}
