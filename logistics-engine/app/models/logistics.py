from sqlalchemy import Column, Integer, String, Float
from ..database import Base

class Port(Base):
    __tablename__ = "ports"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True)
    latitude = Column(Float)
    longitude = Column(Float)
    congestion_level = Column(Float, default=0.1)  # 0.0 - 1.0

class Route(Base):
    __tablename__ = "routes"
    id = Column(Integer, primary_key=True, index=True)
    source_port = Column(String)
    destination_port = Column(String)
    distance = Column(Float)
    avg_time = Column(Float) # Hours
