from ..ml.demand_model import DemandPredictor
from ..ml.price_model import PricePredictor
import pandas as pd

demand_model = DemandPredictor()
price_model = PricePredictor()

def get_demand_forecast():
    forecast = demand_model.predict(periods=15)
    if forecast.empty:
        return []
    return forecast.to_dict(orient="records")

def get_price_prediction(latest_data):
    return price_model.predict(latest_data)
