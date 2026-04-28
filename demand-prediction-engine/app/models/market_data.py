from sqlalchemy import Column, Integer, Float, String, DateTime
from datetime import datetime
from ..database import Base

class MarketData(Base):
    __tablename__ = "market_data"

    id = Column(Integer, primary_key=True, index=True)
    product = Column(String)
    price = Column(Float)
    demand = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)
