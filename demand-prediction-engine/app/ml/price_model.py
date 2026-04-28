import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib
import os
from ..config import settings

MODEL_FILE = os.path.join(settings.MODEL_PATH, "price_model.pkl")

class PricePredictor:
    def feature_engineering(self, df):
        df = df.copy()
        df["timestamp"] = pd.to_datetime(df["timestamp"])
        df["day"] = df["timestamp"].dt.day
        df["month"] = df["timestamp"].dt.month
        df["lag1"] = df["price"].shift(1)
        df = df.dropna()
        return df

    def train(self, df):
        df = self.feature_engineering(df)

        X = df[["day", "month", "lag1"]]
        y = df["price"]

        # Ensure models directory exists
        os.makedirs(settings.MODEL_PATH, exist_ok=True)

        model = RandomForestRegressor(n_estimators=100)
        model.fit(X, y)

        joblib.dump(model, MODEL_FILE)
        return model

    def load(self):
        if not os.path.exists(MODEL_FILE):
            return None
        return joblib.load(MODEL_FILE)

    def predict(self, latest_row):
        model = self.load()
        if not model:
            return 0.0

        features = [[
            latest_row["day"],
            latest_row["month"],
            latest_row["lag1"]
        ]]

        return float(model.predict(features)[0])
