from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.logistics import Port, Route
from ..services.logistics_service import analyze_shipping_route

router = APIRouter()

@router.post("/analyze")
def calculate_route(source: str, destination: str, db: Session = Depends(get_db)):
    routes = db.query(Route).all()
    ports = db.query(Port).all()
    
    if not routes:
        raise HTTPException(status_code=404, detail="No shipping routes configured")
        
    try:
        result = analyze_shipping_route(routes, ports, source, destination)
        if "error" in result:
            raise HTTPException(status_code=400, detail=result["error"])
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

from typing import List
from ..schemas.logistics import PortIngest, RouteIngest

@router.post("/ports")
def add_ports(payload: List[PortIngest], db: Session = Depends(get_db)):
    for item in payload:
        db.add(Port(
            name=item.name,
            latitude=item.latitude,
            longitude=item.longitude,
            congestion_level=item.congestion_level
        ))
    db.commit()
    return {"status": "Ports added", "count": len(payload)}

@router.post("/routes")
def add_routes(payload: List[RouteIngest], db: Session = Depends(get_db)):
    for item in payload:
        db.add(Route(
            source_port=item.source,
            destination_port=item.destination,
            distance=item.distance,
            avg_time=item.time
        ))
    db.commit()
    return {"status": "Routes added", "count": len(payload)}
