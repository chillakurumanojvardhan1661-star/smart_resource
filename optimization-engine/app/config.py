import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Multi-Supplier Optimization Engine"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./optimization.db")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")

settings = Settings()
