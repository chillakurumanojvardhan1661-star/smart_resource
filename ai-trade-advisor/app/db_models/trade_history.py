"""
db_models/trade_history.py
--------------------------
Immutable log of every AI-generated recommendation returned to a user.
"""
from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.database import Base


class TradeHistory(Base):
    __tablename__ = "trade_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    symbol = Column(String(20), nullable=False)
    action = Column(String(10), nullable=False)        # BUY | SELL | HOLD
    risk_level = Column(String(10), nullable=False)    # LOW | MEDIUM | HIGH
    ai_advice = Column(Text, nullable=False)
    market_price = Column(Float, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="trade_history")
