import asyncio
import httpx
from common.config import settings
from common.logger import get_logger

logger = get_logger("advisor-orchestrator")

async def fetch_metrics(origin, payload):
    # Construct individual payloads for sub-services if needed
    sub_payload = {
        "product_name": payload.get("product_name"),
        "origin_country": origin,
        "destination_country": payload.get("destination_country"),
        "quantity": payload.get("quantity"),
        "weight": payload.get("weight"),
        "selling_price": payload.get("selling_price")
    }
    
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            # Concurrent calls to sub-services
            cost_task = client.post(f"{settings.COST_URL}/calculate", json=sub_payload)
            demand_task = client.post(f"{settings.DEMAND_URL}/predict", json=sub_payload)
            risk_task = client.post(f"{settings.RISK_URL}/evaluate", json=sub_payload)

            cost_res, demand_res, risk_res = await asyncio.gather(
                cost_task, demand_task, risk_task,
                return_exceptions=True
            )

            # Check for exceptions
            for res in [cost_res, demand_res, risk_res]:
                if isinstance(res, Exception):
                    logger.error(f"Service call failed: {str(res)}")
                    raise res

            return {
                "cost": cost_res.json(),
                "demand": demand_res.json(),
                "risk": risk_res.json()
            }
        except Exception as e:
            logger.error(f"Orchestration error for {origin}: {str(e)}")
            return None
