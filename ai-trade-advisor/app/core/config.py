from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional, Dict

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Trade Advisor"
    API_V1_STR: str = "/api/v1"
    
    # GCP Configuration
    GCP_PROJECT_ID: Optional[str] = None
    GCP_REGION: str = "us-central1"
    
    # Downstream Service URLs
    # Defaults assume they are running locally or use Cloud Run placeholders
    COST_SERVICE_URL: str = "http://cost-intelligence-engine:8080"
    DEMAND_SERVICE_URL: str = "http://demand-prediction-engine:8080"
    RISK_SERVICE_URL: str = "http://risk-intelligence-engine:8080"
    
    # Default Weights for Recommendation
    DEFAULT_WEIGHTS: Dict[str, float] = {
        "profit": 0.4,
        "demand": 0.3,
        "risk": 0.3
    }
    
    # Request Timeouts (seconds)
    TIMEOUT: float = 10.0
    
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

settings = Settings()
