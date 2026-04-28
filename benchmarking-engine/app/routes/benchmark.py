from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.company_metrics import CompanyMetrics
from ..services.benchmark_service import run_benchmarking

router = APIRouter()

@router.post("/run")
def benchmark(db: Session = Depends(get_db)):
    companies = db.query(CompanyMetrics).all()
    if not companies:
        raise HTTPException(status_code=404, detail="No competitor data found in database")
        
    company_data = [
        {
            "company_name": c.company_name,
            "revenue": c.revenue,
            "profit_margin": c.profit_margin,
            "market_share": c.market_share,
            "risk_score": c.risk_score,
            "sustainability_score": c.sustainability_score
        } for c in companies
    ]
    
    return run_benchmarking(company_data)

from typing import List
from ..schemas.benchmarking import CompanyMetricIngest

@router.post("/ingest")
def ingest_metrics(payload: List[CompanyMetricIngest], db: Session = Depends(get_db)):
    for item in payload:
        db.add(CompanyMetrics(
            company_name=item.company_name,
            revenue=item.revenue,
            profit_margin=item.profit_margin,
            market_share=item.market_share,
            risk_score=item.risk_score,
            sustainability_score=item.sustainability_score
        ))
    db.commit()
    return {"status": "Metrics ingested", "count": len(payload)}

@router.get("/company/{name}")
def get_company_rank(name: str, db: Session = Depends(get_db)):
    all_companies = db.query(CompanyMetrics).all()
    company_data = [
        {
            "company_name": c.company_name,
            "revenue": c.revenue,
            "profit_margin": c.profit_margin,
            "market_share": c.market_share,
            "risk_score": c.risk_score,
            "sustainability_score": c.sustainability_score
        } for c in all_companies
    ]
    
    result = run_benchmarking(company_data)
    for c in result["ranked_competitors"]:
        if c["company_name"].lower() == name.lower():
            return c
            
    raise HTTPException(status_code=404, detail="Company not found in benchmark")
