from fastapi import FastAPI
from contextlib import asynccontextmanager
from .routes import escrow
from .database import engine, Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="Escrow & Smart Contract Layer", lifespan=lifespan)

app.include_router(escrow.router, prefix="/api/v1/escrow")

@app.get("/")
def root():
    return {"message": "Escrow & Smart Contract System Running"}

@app.get("/health")
def health():
    return {"status": "ok", "service": "escrow-system"}
