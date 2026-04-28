from typing import Dict, Any, Optional
from app.services.plugins.base import RiskPlugin

class PoliticalRiskPlugin(RiskPlugin):
    @property
    def factor_name(self) -> str:
        return "political"

    def calculate(self, data: Dict[str, float], context: Optional[Dict[str, Any]] = None) -> float:
        return data.get("political", 0.0)

class CurrencyRiskPlugin(RiskPlugin):
    @property
    def factor_name(self) -> str:
        return "currency"

    def calculate(self, data: Dict[str, float], context: Optional[Dict[str, Any]] = None) -> float:
        return data.get("currency", 0.0)

class LogisticsRiskPlugin(RiskPlugin):
    @property
    def factor_name(self) -> str:
        return "logistics"

    def calculate(self, data: Dict[str, float], context: Optional[Dict[str, Any]] = None) -> float:
        return data.get("logistics", 0.0)

class MarketRiskPlugin(RiskPlugin):
    @property
    def factor_name(self) -> str:
        return "market"

    def calculate(self, data: Dict[str, float], context: Optional[Dict[str, Any]] = None) -> float:
        return data.get("market", 0.0)
