import json
import os
from typing import List, Optional
from app.services.data_providers.base import DemandDataProvider

class JSONDemandDataProvider(DemandDataProvider):
    def __init__(self, file_path: str = "app/data/historical_demand.json"):
        self.file_path = file_path
        self._data = self._load_data()

    def _load_data(self) -> list:
        if os.path.exists(self.file_path):
            with open(self.file_path, "r") as f:
                return json.load(f)
        return []

    def get_historical_demand(self, product_name: str, country: str) -> Optional[List[float]]:
        for entry in self._data:
            if entry["product"].lower() == product_name.lower() and entry["country"].lower() == country.lower():
                return entry["monthly_demand"]
        return None

class BigQueryDemandDataProvider(DemandDataProvider):
    """Stub for BigQuery integration."""
    def get_historical_demand(self, product_name: str, country: str) -> Optional[List[float]]:
        # In future: fetch from BigQuery using settings.BQ_DEMAND_TABLE
        raise NotImplementedError("BigQuery provider not yet implemented")
