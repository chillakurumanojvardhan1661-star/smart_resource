import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Risk Intelligence Engine"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./risk.db")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    MODEL_PATH: str = "models/"

settings = Settings()
