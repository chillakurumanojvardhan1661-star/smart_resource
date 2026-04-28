from sqlalchemy import Column, Integer, Float, String
from ..database import Base

class CompanyMetrics(Base):
    __tablename__ = "company_metrics"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String, index=True)
    revenue = Column(Float)
    profit_margin = Column(Float)
    market_share = Column(Float)
    risk_score = Column(Float)
    sustainability_score = Column(Float)
