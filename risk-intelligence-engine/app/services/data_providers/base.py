from abc import ABC, abstractmethod
from typing import Dict, Optional

class RiskDataProvider(ABC):
    @abstractmethod
    def get_country_risk_data(self, country: str) -> Optional[Dict[str, float]]:
        pass
