"""
routes/portfolio.py
-------------------
Portfolio management and AI trade advice endpoints.
All routes require a valid JWT bearer token.
"""
import asyncio
import logging
import re
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.db_models.portfolio import Portfolio
from app.db_models.trade_history import TradeHistory
from app.schemas.portfolio import (
    PortfolioAddRequest,
    PortfolioItem,
    TradeAdviceResponse,
    TradeHistoryItem,
)
from app.utils.auth import get_current_user_id
from app.services.market import fetch_market_data
from app.ai.advisor import generate_trade_advice

router = APIRouter(tags=["portfolio"])
logger = logging.getLogger(__name__)


# ───────────────────────── Portfolio CRUD ────────────────────────────────────

@router.get("/", response_model=List[PortfolioItem])
def list_portfolio(
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    """Return all holdings for the authenticated user."""
    return db.query(Portfolio).filter(Portfolio.user_id == user_id).all()


@router.post("/", response_model=PortfolioItem, status_code=status.HTTP_201_CREATED)
def add_holding(
    body: PortfolioAddRequest,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    """Add or update a holding in the user's portfolio."""
    existing = (
        db.query(Portfolio)
        .filter(Portfolio.user_id == user_id, Portfolio.symbol == body.symbol.upper())
        .first()
    )
    if existing:
        # Weighted average re-calculation
        total_qty = existing.quantity + body.quantity
        existing.avg_price = (
            (existing.avg_price * existing.quantity) + (body.avg_price * body.quantity)
        ) / total_qty
        existing.quantity = total_qty
        db.commit()
        db.refresh(existing)
        return existing

    holding = Portfolio(
        user_id=user_id,
        symbol=body.symbol.upper(),
        quantity=body.quantity,
        avg_price=body.avg_price,
    )
    db.add(holding)
    db.commit()
    db.refresh(holding)
    return holding


@router.delete("/{symbol}", status_code=status.HTTP_204_NO_CONTENT)
def remove_holding(
    symbol: str,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    """Remove an asset from the portfolio."""
    holding = (
        db.query(Portfolio)
        .filter(Portfolio.user_id == user_id, Portfolio.symbol == symbol.upper())
        .first()
    )
    if not holding:
        raise HTTPException(status_code=404, detail="Holding not found")
    db.delete(holding)
    db.commit()


# ───────────────────────── AI Trade Advice ───────────────────────────────────

@router.get("/advice", response_model=TradeAdviceResponse)
async def get_trade_advice(
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    """
    Fetch live market prices for all holdings and return LLM trade advice.
    Persists a summary row in trade_history for each holding.
    """
    holdings = db.query(Portfolio).filter(Portfolio.user_id == user_id).all()
    if not holdings:
        raise HTTPException(status_code=404, detail="No holdings found. Add assets to your portfolio first.")

    # Parallel market data fetch
    market_tasks = [fetch_market_data(h.symbol) for h in holdings]
    market_results = await asyncio.gather(*market_tasks)
    market_data = {r["symbol"]: r for r in market_results}

    portfolio_snapshot = [
        {"symbol": h.symbol, "quantity": h.quantity, "avg_price": h.avg_price}
        for h in holdings
    ]

    advice = await generate_trade_advice(portfolio_snapshot, market_data)

    # ── Parse and persist one TradeHistory row per holding ──────────────────
    for h in holdings:
        action = _extract_action(advice, h.symbol)
        risk = _extract_risk(advice, h.symbol)
        raw_price = market_data.get(h.symbol, {}).get("price", None)
        try:
            mkt_price = float(raw_price) if raw_price else None
        except (ValueError, TypeError):
            mkt_price = None

        db.add(TradeHistory(
            user_id=user_id,
            symbol=h.symbol,
            action=action,
            risk_level=risk,
            ai_advice=advice[:1000],   # store first 1 k chars
            market_price=mkt_price,
        ))
    db.commit()

    return TradeAdviceResponse(
        user_id=user_id,
        portfolio_snapshot=portfolio_snapshot,
        market_prices={k: v.get("price", "N/A") for k, v in market_data.items()},
        advice=advice,
    )


# ───────────────────────── Trade History ─────────────────────────────────────

@router.get("/history", response_model=List[TradeHistoryItem])
def get_trade_history(
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    """Return the last 50 AI-generated trade recommendations for the user."""
    return (
        db.query(TradeHistory)
        .filter(TradeHistory.user_id == user_id)
        .order_by(TradeHistory.created_at.desc())
        .limit(50)
        .all()
    )


# ───────────────────────── Private Helpers ───────────────────────────────────

def _extract_action(advice: str, symbol: str) -> str:
    """Heuristic extraction of the action (BUY/SELL/HOLD) for a symbol from AI text."""
    pattern = rf"{re.escape(symbol)}.*?(BUY|SELL|HOLD|ACCUMULATE)"
    m = re.search(pattern, advice, re.IGNORECASE | re.DOTALL)
    if m:
        word = m.group(1).upper()
        return "BUY" if "BUY" in word else "SELL" if "SELL" in word else "HOLD"
    return "HOLD"


def _extract_risk(advice: str, symbol: str) -> str:
    """Heuristic extraction of risk level (LOW/MEDIUM/HIGH) for a symbol from AI text."""
    pattern = rf"{re.escape(symbol)}.*?(LOW|MEDIUM|HIGH)"
    m = re.search(pattern, advice, re.IGNORECASE | re.DOTALL)
    return m.group(1).upper() if m else "MEDIUM"
