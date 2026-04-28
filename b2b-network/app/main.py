from fastapi import FastAPI
from contextlib import asynccontextmanager
from .routes import network
from .database import engine, Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="B2B Networking Platform", lifespan=lifespan)

app.include_router(network.router, prefix="/api/v1/network")

@app.get("/")
def root():
    return {"message": "B2B Networking Platform Running"}

@app.get("/health")
def health():
    return {"status": "ok", "service": "b2b-network"}
