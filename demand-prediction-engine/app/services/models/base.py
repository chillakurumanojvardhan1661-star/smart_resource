from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional

class BasePredictor(ABC):
    @abstractmethod
    def predict(
        self, 
        historical_data: List[float], 
        horizon: int, 
        context: Optional[Dict[str, Any]] = None
    ) -> List[float]:
        """
        Takes a time series of historical demand and predicts future demand.
        Returns a list of predicted values for the given horizon.
        """
        pass
