from abc import ABC, abstractmethod
from typing import Dict, Any, Optional

class DataProvider(ABC):
    @abstractmethod
    def get_data(self, **kwargs) -> Any:
        pass

class AbstractCountryDataProvider(DataProvider):
    @abstractmethod
    def get_duty_rate(self, origin: str, destination: str) -> Optional[float]:
        pass
    
    @abstractmethod
    def get_tax_rate(self, country: str) -> Optional[float]:
        pass
