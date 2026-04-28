import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Auto Documentation Engine"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./autodocs.db")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    DOCS_OUTPUT: str = os.getenv("DOCS_OUTPUT", "./output_docs/")

settings = Settings()
