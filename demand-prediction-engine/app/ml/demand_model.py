import pandas as pd
from prophet import Prophet
import joblib
from ..config import settings
import os

MODEL_FILE = os.path.join(settings.MODEL_PATH, "demand_model.pkl")

class DemandPredictor:
    def train(self, df: pd.DataFrame):
        # Prophet expects 'ds' (date) and 'y' (value)
        df = df.rename(columns={"timestamp": "ds", "demand": "y"})
        
        # Ensure models directory exists
        os.makedirs(settings.MODEL_PATH, exist_ok=True)

        model = Prophet()
        model.fit(df)

        joblib.dump(model, MODEL_FILE)
        return model

    def load(self):
        if not os.path.exists(MODEL_FILE):
            return None
        return joblib.load(MODEL_FILE)

    def predict(self, periods=30):
        model = self.load()
        if not model:
            return pd.DataFrame()
            
        future = model.make_future_dataframe(periods=periods)
        forecast = model.predict(future)

        return forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]].tail(periods)
