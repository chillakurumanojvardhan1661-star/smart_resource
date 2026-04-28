"""
db_models/user.py
-----------------
SQLAlchemy ORM model for the users table.
"""
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    portfolios = relationship("Portfolio", back_populates="owner", cascade="all, delete-orphan")
    trade_history = relationship("TradeHistory", back_populates="user", cascade="all, delete-orphan")
