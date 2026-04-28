from pydantic import BaseModel
from typing import Optional

class PortIngest(BaseModel):
    name: str
    latitude: Optional[float] = 0.0
    longitude: Optional[float] = 0.0
    congestion_level: Optional[float] = 0.1

class RouteIngest(BaseModel):
    source: str
    destination: str
    distance: float
    time: float
