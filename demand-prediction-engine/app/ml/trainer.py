from .demand_model import DemandPredictor
from .price_model import PricePredictor
import pandas as pd

def train_models(df: pd.DataFrame):
    demand_model = DemandPredictor()
    price_model = PricePredictor()

    demand_model.train(df.copy())
    price_model.train(df.copy())

    return {"status": "Models trained successfully", "samples": len(df)}
