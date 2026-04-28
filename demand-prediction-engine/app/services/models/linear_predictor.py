import numpy as np
from sklearn.linear_model import LinearRegression
from typing import List, Dict, Any, Optional
from app.services.models.base import BasePredictor

class LinearRegressionPredictor(BasePredictor):
    def predict(
        self, 
        historical_data: List[float], 
        horizon: int, 
        context: Optional[Dict[str, Any]] = None
    ) -> List[float]:
        if len(historical_data) < 2:
            # Fallback if insufficient data for regression
            return [historical_data[-1]] * horizon if historical_data else [0.0] * horizon
        
        # X is time steps [0, 1, 2, ...], y is demand
        X = np.array(range(len(historical_data))).reshape(-1, 1)
        y = np.array(historical_data)
        
        model = LinearRegression()
        model.fit(X, y)
        
        # Predict for future steps
        future_X = np.array(range(len(historical_data), len(historical_data) + horizon)).reshape(-1, 1)
        predictions = model.predict(future_X)
        
        # Ensure non-negative predictions
        return [max(0.0, float(p)) for p in predictions]
