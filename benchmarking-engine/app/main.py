from fastapi import FastAPI
from contextlib import asynccontextmanager
from .routes import benchmark
from .database import engine, Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="Competitor Benchmarking Engine", lifespan=lifespan)

app.include_router(benchmark.router, prefix="/api/v1/benchmark")

@app.get("/")
def root():
    return {"message": "Competitor Benchmarking Engine Running"}

@app.get("/health")
def health():
    return {"status": "ok", "service": "benchmarking-engine"}
