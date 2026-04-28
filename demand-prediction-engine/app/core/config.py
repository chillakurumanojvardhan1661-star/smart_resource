from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Demand Prediction Engine"
    API_V1_STR: str = "/api/v1"
    
    # GCP Configuration
    GCP_PROJECT_ID: Optional[str] = None
    GCP_REGION: str = "us-central1"
    
    # Model Registry Configuration
    # Options: "linear", "vertex_ai"
    DEFAULT_MODEL_TYPE: str = "linear"
    
    # Vertex AI Endpoint ID (Future)
    VERTEX_ENDPOINT_ID: Optional[str] = None
    
    # Data Providers
    BQ_DEMAND_TABLE: str = "historical_trade.demand_series"
    
    # Validation
    MIN_DATA_POINTS: int = 3
    
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

settings = Settings()
