from abc import ABC, abstractmethod
from typing import List, Optional

class DemandDataProvider(ABC):
    @abstractmethod
    def get_historical_demand(self, product_name: str, country: str) -> Optional[List[float]]:
        pass
