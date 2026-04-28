import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Personalized Business Dashboard Engine"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./dashboard.db")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")

settings = Settings()
