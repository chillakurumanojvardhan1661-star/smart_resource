import os
import joblib
from sklearn.ensemble import RandomForestClassifier
import numpy as np

MODEL_PATH = "models/risk_alert.pkl"

class RiskModel:
    def __init__(self):
        self.model = None
        self._ensure_model()
        
    def _ensure_model(self):
        if not os.path.exists(MODEL_PATH):
            # Pre-train a simple mock model if it doesn't exist
            X = np.random.rand(100, 2) # [price_trend, demand_trend]
            # y=1 if both trends are very negative
            y = [1 if x[0] < 0.2 and x[1] < 0.2 else 0 for x in X]
            self.train(X, y)
        else:
            self.load()

    def train(self, X, y):
        model = RandomForestClassifier(n_estimators=10)
        model.fit(X, y)
        os.makedirs("models", exist_ok=True)
        joblib.dump(model, MODEL_PATH)
        self.model = model

    def load(self):
        self.model = joblib.load(MODEL_PATH)

    def predict(self, features):
        if self.model is None:
            self.load()
        # Features: [p_trend, d_trend]
        return int(self.model.predict([features])[0])
