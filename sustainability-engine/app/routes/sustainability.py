from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.company import Company
from ..services.sustainability_service import analyze_company

router = APIRouter()

@router.get("/{company_id}")
def get_sustainability(company_id: int, db: Session = Depends(get_db)):
    company = db.query(Company).filter(Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return analyze_company(company)

from typing import List
from ..schemas.sustainability import CompanyIngest

@router.post("/ingest")
def ingest_companies(payload: List[CompanyIngest], db: Session = Depends(get_db)):
    for item in payload:
        db.add(Company(
            name=item.name,
            carbon_emission=item.carbon_emission,
            energy_usage=item.energy_usage,
            waste_management_score=item.waste_management_score,
            labor_score=item.labor_score,
            diversity_score=item.diversity_score,
            governance_score=item.governance_score
        ))
    db.commit()
    return {"status": "Companies ingested", "count": len(payload)}

@router.get("/search/{name}")
def search_company(name: str, db: Session = Depends(get_db)):
    company = db.query(Company).filter(Company.name.ilike(f"%{name}%")).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return analyze_company(company)
