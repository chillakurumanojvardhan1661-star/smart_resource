from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.network import User, BusinessProfile, Deal, Message
from ..utils.auth import hash_password, verify_password, create_token
from ..services.matching_service import find_business_matches
from ..chat.manager import manager
import json

router = APIRouter()

@router.post("/register")
def register(email: str, password: str, role: str, db: Session = Depends(get_db)):
    user = User(email=email, password=hash_password(password), role=role)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"id": user.id, "email": user.email}

@router.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"token": create_token(user.id)}

@router.post("/profile")
def create_profile(user_id: int, company_name: str, industry: str, db: Session = Depends(get_db)):
    profile = BusinessProfile(user_id=user_id, company_name=company_name, industry=industry)
    db.add(profile)
    db.commit()
    return {"status": "Profile Created"}

@router.get("/matches")
def get_matches(db: Session = Depends(get_db)):
    # Join profile with user to get the role
    profiles = db.query(BusinessProfile, User.role).join(User, BusinessProfile.user_id == User.id).all()
    profile_list = [
        {
            "user_id": p[0].user_id,
            "company_name": p[0].company_name,
            "industry": p[0].industry,
            "role": p[1]
        } for p in profiles
    ]
    return find_business_matches(profile_list)

@router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int):
    await manager.connect(user_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Simple broadcast for demo, in prod we would target receiver_id
            await manager.broadcast(f"User {user_id} says: {data}")
    except WebSocketDisconnect:
        manager.disconnect(user_id)
