"""
services/market.py
------------------
Fetches live price data from Binance's public ticker endpoint.
No API key required for spot price queries.
Falls back to a mock price when the request fails (offline-safe).
"""
import logging
import httpx

logger = logging.getLogger(__name__)

BINANCE_TICKER_URL = "https://api.binance.com/api/v3/ticker/price"


async def fetch_market_data(symbol: str) -> dict:
    """
    Returns  {"symbol": "BTCUSDT", "price": "67234.10"}
    or a mock on failure so the advisor never errors out.
    """
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            res = await client.get(BINANCE_TICKER_URL, params={"symbol": symbol.upper()})
            res.raise_for_status()
            return res.json()   # {"symbol": ..., "price": "..."}
    except Exception as exc:
        logger.warning(f"Binance fetch failed for {symbol}: {exc}. Using mock price.")
        return {"symbol": symbol.upper(), "price": "0.00", "source": "mock"}
