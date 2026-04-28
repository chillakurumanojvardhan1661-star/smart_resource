from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from ..database import Base

class Documentation(Base):
    __tablename__ = "documentation"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(Text)
    version = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
