from fastapi import FastAPI
from contextlib import asynccontextmanager
from .routes import sustainability
from .database import engine, Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="Sustainability Score Engine", lifespan=lifespan)

app.include_router(sustainability.router, prefix="/api/v1/sustainability")

@app.get("/")
def root():
    return {"message": "Sustainability Score Engine Running"}

@app.get("/health")
def health():
    return {"status": "ok", "service": "sustainability-engine"}
