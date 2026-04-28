from pyod.models.iforest import IForest
import numpy as np
import joblib
import os
from ..config import settings

MODEL_FILE = os.path.join(settings.MODEL_PATH, "anomaly.pkl")

class AnomalyDetector:
    def train(self, data):
        if not os.path.exists(settings.MODEL_PATH):
            os.makedirs(settings.MODEL_PATH)
            
        model = IForest()
        model.fit(data)
        joblib.dump(model, MODEL_FILE)
        return model

    def load(self):
        if not os.path.exists(MODEL_FILE):
            return None
        return joblib.load(MODEL_FILE)

    def detect(self, data):
        model = self.load()
        if not model:
            # If no model, assume no anomalies
            return [0] * len(data)
        preds = model.predict(data)
        return preds.tolist()  # 1 = anomaly, 0 = normal
