from abc import ABC, abstractmethod
from typing import Dict, Any, Optional

class RiskPlugin(ABC):
    """Base class for all risk factor plugins."""
    
    @property
    @abstractmethod
    def factor_name(self) -> str:
        """Name of the risk factor (e.g., 'political')."""
        pass

    @abstractmethod
    def calculate(self, data: Dict[str, float], context: Optional[Dict[str, Any]] = None) -> float:
        """
        Calculates the risk score for this specific factor.
        Returns a float between 0 and 1.
        """
        pass
