from fastapi import FastAPI
from contextlib import asynccontextmanager
from .routes import dashboard
from .database import engine, Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="Business Dashboard Engine", lifespan=lifespan)

app.include_router(dashboard.router, prefix="/api/v1/dashboard")

@app.get("/")
def root():
    return {"message": "Dashboard Engine Running"}
