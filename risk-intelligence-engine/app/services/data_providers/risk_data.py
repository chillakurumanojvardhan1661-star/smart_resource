import json
import os
from typing import Dict, Optional
from app.services.data_providers.base import RiskDataProvider

class JSONRiskDataProvider(RiskDataProvider):
    def __init__(self, file_path: str = "app/data/risk_profiles.json"):
        self.file_path = file_path
        self._data = self._load_data()

    def _load_data(self) -> dict:
        if os.path.exists(self.file_path):
            with open(self.file_path, "r") as f:
                return json.load(f)
        return {}

    def get_country_risk_data(self, country: str) -> Optional[Dict[str, float]]:
        return self._data.get(country)

class BigQueryRiskDataProvider(RiskDataProvider):
    """Stub for BigQuery integration."""
    def get_country_risk_data(self, country: str) -> Optional[Dict[str, float]]:
        # In future: fetch from BigQuery using settings.BQ_RISK_TABLE
        raise NotImplementedError("BigQuery provider not yet implemented")
