from app.services.clients.base import BaseServiceClient
from app.core.config import settings

class CostServiceClient(BaseServiceClient):
    def __init__(self):
        super().__init__(settings.COST_SERVICE_URL)

    async def get_cost(self, payload: dict) -> dict:
        return await self._post(f"{settings.API_V1_STR}/costs/calculate", payload)

class DemandServiceClient(BaseServiceClient):
    def __init__(self):
        super().__init__(settings.DEMAND_SERVICE_URL)

    async def get_prediction(self, payload: dict) -> dict:
        return await self._post(f"{settings.API_V1_STR}/demand/predict", payload)

class RiskServiceClient(BaseServiceClient):
    def __init__(self):
        super().__init__(settings.RISK_SERVICE_URL)

    async def get_risk(self, payload: dict) -> dict:
        return await self._post(f"{settings.API_V1_STR}/risk/evaluate", payload)
