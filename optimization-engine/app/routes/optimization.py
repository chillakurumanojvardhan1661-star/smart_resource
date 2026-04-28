from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.supplier import Supplier, Demand
from ..services.optimization_service import run_optimization

router = APIRouter()

@router.post("/run")
def optimize(demand_id: int, db: Session = Depends(get_db)):
    demand = db.query(Demand).filter(Demand.id == demand_id).first()
    if not demand:
        raise HTTPException(status_code=404, detail="Demand record not found")
        
    suppliers = db.query(Supplier).all()
    if not suppliers:
        raise HTTPException(status_code=404, detail="No suppliers found in database")
        
    # Convert ORM objects to dicts for the solver
    supplier_data = [
        {
            "id": s.id,
            "name": s.name,
            "cost_per_unit": s.cost_per_unit,
            "capacity": s.capacity,
            "risk_score": s.risk_score,
            "sustainability_score": s.sustainability_score
        } for s in suppliers
    ]
    
    try:
        result = run_optimization(supplier_data, demand.required_units)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

from typing import List
from ..schemas.optimization import SupplierIngest

@router.post("/suppliers")
def add_suppliers(payload: List[SupplierIngest], db: Session = Depends(get_db)):
    for item in payload:
        db.add(Supplier(
            name=item.name,
            cost_per_unit=item.cost_per_unit,
            capacity=item.capacity,
            risk_score=item.risk_score,
            sustainability_score=item.sustainability_score
        ))
    db.commit()
    return {"status": "Suppliers added", "count": len(payload)}

@router.post("/demand")
def set_demand(required_units: float, db: Session = Depends(get_db)):
    d = Demand(required_units=required_units)
    db.add(d)
    db.commit()
    db.refresh(d)
    return d
