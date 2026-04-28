from fastapi import FastAPI
from contextlib import asynccontextmanager
from .routes import alerts
from .database import engine, Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="Loss Prevention Alerts Engine", lifespan=lifespan)

app.include_router(alerts.router, prefix="/api/v1/alerts")

@app.get("/")
def root():
    return {"message": "Loss Prevention Engine Running"}
