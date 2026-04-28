from fastapi import FastAPI
from contextlib import asynccontextmanager
from .routes import docs
from .database import engine, Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="Auto Documentation Engine", lifespan=lifespan)

app.include_router(docs.router, prefix="/api/v1/docs")

@app.get("/")
def root():
    return {"message": "Auto Documentation Engine Running"}
