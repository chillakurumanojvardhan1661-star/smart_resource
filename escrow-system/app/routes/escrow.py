from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.transaction import EscrowTransaction
from ..blockchain.escrow_service import release_funds_tx, raise_dispute_tx

router = APIRouter()

@router.post("/create")
def create_escrow(buyer: str, seller: str, amount: float, db: Session = Depends(get_db)):
    tx = EscrowTransaction(
        buyer=buyer,
        seller=seller,
        amount=amount,
        contract_address="0xPending",
        status="CREATED"
    )
    db.add(tx)
    db.commit()
    db.refresh(tx)
    return tx

@router.post("/{tx_id}/release")
def release(tx_id: int, db: Session = Depends(get_db)):
    tx = db.query(EscrowTransaction).filter(EscrowTransaction.id == tx_id).first()
    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")
        
    tx_hash = release_funds_tx()
    tx.status = "RELEASED"
    tx.tx_hash = tx_hash
    db.commit()
    return {"message": "Funds released", "tx_hash": tx_hash}

@router.post("/{tx_id}/dispute")
def dispute(tx_id: int, db: Session = Depends(get_db)):
    tx = db.query(EscrowTransaction).filter(EscrowTransaction.id == tx_id).first()
    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")
        
    tx_hash = raise_dispute_tx()
    tx.status = "DISPUTED"
    tx.tx_hash = tx_hash
    db.commit()
    return {"message": "Dispute raised", "tx_hash": tx_hash}

@router.get("/list")
def list_transactions(db: Session = Depends(get_db)):
    return db.query(EscrowTransaction).all()
