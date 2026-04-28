from sqlalchemy import Column, Integer, Float, String
from ..database import Base

class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    cost_per_unit = Column(Float)
    capacity = Column(Float)
    risk_score = Column(Float) # 0-1 (higher is riskier)
    sustainability_score = Column(Float) # 0-100 (higher is better)

class Demand(Base):
    __tablename__ = "demand"

    id = Column(Integer, primary_key=True, index=True)
    required_units = Column(Float)
