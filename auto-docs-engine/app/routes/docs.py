from fastapi import APIRouter, HTTPException
from ..services.doc_service import generate_docs_for_file
import os

router = APIRouter()

@router.post("/generate")
def generate(payload: dict):
    file_path = payload.get("file_path")
    if not file_path:
        raise HTTPException(status_code=400, detail="file_path is required")
        
    try:
        result = generate_docs_for_file(file_path)
        return result
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"Source file not found: {file_path}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
def health():
    return {"status": "ok", "service": "auto-docs-engine"}
