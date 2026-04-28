from sqlalchemy import Column, Integer, String, JSON
from ..database import Base

class UserPreference(Base):
    __tablename__ = "user_preferences"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, unique=True)
    industry = Column(String)
    preferred_market = Column(String)

class DashboardCache(Base):
    __tablename__ = "dashboard_cache"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, unique=True)
    data = Column(JSON)
