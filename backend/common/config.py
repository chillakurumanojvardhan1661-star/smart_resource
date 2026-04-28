import os

class Settings:
    COST_URL = os.getenv("COST_URL", "http://localhost:8001")
    DEMAND_URL = os.getenv("DEMAND_URL", "http://localhost:8002")
    RISK_URL = os.getenv("RISK_URL", "http://localhost:8003")
    ADVISOR_URL = os.getenv("ADVISOR_URL", "http://localhost:8004")

settings = Settings()
