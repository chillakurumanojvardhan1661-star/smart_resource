import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Escrow Intelligence Layer"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./escrow.db")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    
    # Blockchain Settings
    WEB3_PROVIDER: str = os.getenv("WEB3_PROVIDER", "http://localhost:8545")
    PRIVATE_KEY: str = os.getenv("PRIVATE_KEY", "0x0000000000000000000000000000000000000000000000000000000000000000")
    CONTRACT_ADDRESS: str = os.getenv("CONTRACT_ADDRESS", "0x0000000000000000000000000000000000000000")
    
    # Enable simulator mode for local testing without a node
    SIMULATOR_MODE: bool = os.getenv("SIMULATOR_MODE", "True").lower() == "true"

settings = Settings()
