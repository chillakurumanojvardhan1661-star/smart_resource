import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Logistics Intelligence Engine"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./logistics.db")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    SHIPPING_API: str = os.getenv("SHIPPING_API", "")

settings = Settings()
