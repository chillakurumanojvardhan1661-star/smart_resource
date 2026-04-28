import httpx
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)

class BaseServiceClient:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.timeout = settings.TIMEOUT

    async def _post(self, endpoint: str, payload: dict) -> dict:
        url = f"{self.base_url}{endpoint}"
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            try:
                response = await client.post(url, json=payload)
                response.raise_for_status()
                return response.json()
            except httpx.HTTPStatusError as e:
                logger.error(f"HTTP error calling {url}: {e.response.text}")
                raise e
            except Exception as e:
                logger.error(f"Error calling {url}: {e}")
                raise e
