from fastapi import FastAPI
from contextlib import asynccontextmanager
from .routes import logistics
from .database import engine, Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="Logistics Intelligence Engine", lifespan=lifespan)

app.include_router(logistics.router, prefix="/api/v1/logistics")

@app.get("/")
def root():
    return {"message": "Logistics Intelligence Engine Running"}

@app.get("/health")
def health():
    return {"status": "ok", "service": "logistics-engine"}
