from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from ..database import Base

class EscrowTransaction(Base):
    __tablename__ = "escrow_transactions"

    id = Column(Integer, primary_key=True, index=True)
    buyer = Column(String)
    seller = Column(String)
    amount = Column(Float)
    contract_address = Column(String)
    status = Column(String)  # CREATED, RELEASED, DISPUTED
    created_at = Column(DateTime, default=datetime.utcnow)
    tx_hash = Column(String, nullable=True)
