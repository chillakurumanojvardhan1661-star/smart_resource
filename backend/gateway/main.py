from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
from common.config import settings
from common.logger import get_logger

logger = get_logger("gateway")
app = FastAPI(title="GTI API Gateway")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"status": "ok", "service": "gateway"}

@app.post("/api/v1/advisor/recommend")
async def recommend(payload: dict):
    logger.info(f"Routing request to advisor: {payload.get('product_name')}")
    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            res = await client.post(f"{settings.ADVISOR_URL}/recommend", json=payload)
            res.raise_for_status()
            return res.json()
        except Exception as e:
            logger.error(f"Error calling advisor service: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))
