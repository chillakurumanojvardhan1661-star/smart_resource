"""
schemas/portfolio.py
--------------------
Pydantic schemas for portfolio management endpoints.
"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class PortfolioAddRequest(BaseModel):
    symbol: str = Field(..., description="Asset ticker, e.g. BTCUSDT, ETHUSDT")
    quantity: float = Field(..., gt=0)
    avg_price: float = Field(..., gt=0)


class PortfolioItem(BaseModel):
    id: int
    symbol: str
    quantity: float
    avg_price: float
    added_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class TradeAdviceRequest(BaseModel):
    user_id: int = Field(..., description="ID of the user to advise")


class TradeAdviceResponse(BaseModel):
    user_id: int
    portfolio_snapshot: list
    market_prices: dict
    advice: str


class TradeHistoryItem(BaseModel):
    id: int
    symbol: str
    action: str
    risk_level: str
    market_price: Optional[float] = None
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}
