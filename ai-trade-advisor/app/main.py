"""
main.py
-------
FastAPI application entry-point for the AI Trade Advisor service.

New routes added (production-ready):
  POST /auth/register       – create account
  POST /auth/login          – get JWT
  GET  /portfolio/          – list holdings        [JWT required]
  POST /portfolio/          – add holding          [JWT required]
  DELETE /portfolio/{sym}   – remove holding       [JWT required]
  GET  /portfolio/advice    – AI trade advice      [JWT required]
  GET  /portfolio/history   – past recommendations [JWT required]

Existing route (microservice orchestration):
  POST /api/v1/advisor/recommend
"""
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.routes import advisor as trade_advisor_router
from app.routes import auth as auth_router
from app.routes import portfolio as portfolio_router
from app.database import engine, Base, get_db

# Import ORM models so SQLAlchemy creates their tables automatically
from app.db_models import user, portfolio, trade_history  # noqa: F401

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create database tables on startup (no-op if they already exist)."""
    logger.info("Running DB migrations (create_all)…")
    Base.metadata.create_all(bind=engine)
    logger.info("Database ready.")
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    description=(
        "Production-ready AI Trade Advisor — "
        "JWT auth, portfolio management, live market data, "
        "LLM trade recommendations, and trade history logging."
    ),
    version="2.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Existing microservice orchestration route ─────────────────────────────────
app.include_router(
    trade_advisor_router.router,
    prefix=f"{settings.API_V1_STR}/advisor",
    tags=["advisor (microservice)"],
)

# Compatibility route for gateway
@app.post("/recommend", tags=["advisor (microservice)"])
async def gateway_recommend(payload: dict, db = Depends(get_db)):
    # This is a bit of a hack to support the old gateway call style
    # Ideally we'd update the gateway, but this ensures it works immediately.
    from app.models.schemas import RecommendationRequest
    try:
        req = RecommendationRequest(**payload)
        from app.services.advisor_service import AdvisorService
        service = AdvisorService()
        return await service.get_recommendation(req)
    except Exception as e:
        # Fallback to a simple response if schema validation fails
        logger.error(f"Gateway recommendation failed: {e}")
        return {"error": str(e)}

# ── New production routes ─────────────────────────────────────────────────────
app.include_router(auth_router.router, prefix="/auth")
app.include_router(portfolio_router.router, prefix="/portfolio")


@app.get("/", tags=["health"])
def root():
    return {"message": "AI Trade Advisor v2.0 Running", "docs": "/docs"}


@app.get("/health", tags=["health"])
def health():
    return {"status": "ok", "service": settings.PROJECT_NAME}
