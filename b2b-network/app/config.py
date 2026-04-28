import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "B2B Networking Platform"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./b2b_network.db")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "b2b_super_secret_key_change_me_in_prod")
    ALGORITHM: str = "HS256"

settings = Settings()
