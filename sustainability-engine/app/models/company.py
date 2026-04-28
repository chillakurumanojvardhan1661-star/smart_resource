from sqlalchemy import Column, Integer, Float, String
from ..database import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    carbon_emission = Column(Float, default=0.0)
    energy_usage = Column(Float, default=0.0)
    waste_management_score = Column(Float, default=0.0)
    labor_score = Column(Float, default=0.0)
    diversity_score = Column(Float, default=0.0)
    governance_score = Column(Float, default=0.0)
