from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Cost Intelligence Engine"
    API_V1_STR: str = "/api/v1"
    
    # GCP Configuration
    GCP_PROJECT_ID: Optional[str] = None
    GCP_REGION: str = "us-central1"
    
    # BigQuery Tables
    BQ_TARIFF_TABLE: str = "tariffs.current_rates"
    
    # Cloud Storage
    GCS_DATA_BUCKET: str = "global-trade-datasets"
    COUNTRY_PROFILES_BLOB: str = "country_profiles.json"
    
    # Cost Base Rates
    AIR_FREIGHT_RATE_PER_KG: float = 80.0
    SEA_FREIGHT_RATE_PER_KG: float = 25.0
    LAND_FREIGHT_RATE_PER_KG: float = 15.0
    
    # Default Rates
    DEFAULT_TAX_RATE: float = 0.18  # 18%
    DEFAULT_DUTY_RATE: float = 0.10 # 10%
    HANDLING_CHARGE_PERCENTAGE: float = 0.02 # 2%
    
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

settings = Settings()
