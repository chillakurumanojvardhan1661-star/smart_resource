import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Predictive Demand Engine"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./predictive.db")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    MODEL_PATH: str = os.getenv("MODEL_PATH", "./models/")

settings = Settings()
