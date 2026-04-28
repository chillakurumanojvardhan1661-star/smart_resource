from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional, Dict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Risk Intelligence Engine"
    API_V1_STR: str = "/api/v1"
    
    # GCP Configuration
    GCP_PROJECT_ID: Optional[str] = None
    GCP_REGION: str = "us-central1"
    
    # Cloud Storage
    GCS_DATA_BUCKET: str = "global-trade-risk-data"
    RISK_PROFILES_BLOB: str = "risk_profiles.json"
    
    # Default Risk Weights
    DEFAULT_WEIGHTS: Dict[str, float] = {
        "political": 0.3,
        "currency": 0.3,
        "logistics": 0.2,
        "market": 0.2
    }
    
    # Risk Level Thresholds
    LOW_RISK_THRESHOLD: float = 0.3
    MEDIUM_RISK_THRESHOLD: float = 0.6
    
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

settings = Settings()
