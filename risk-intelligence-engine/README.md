# Risk Intelligence Engine

A production-ready, modular FastAPI microservice for evaluating global trade risk factors using a weighted scoring system and explainable insights.

## Features

- **Plugin Architecture**: Modular risk factor plugins (Political, Currency, Logistics, Market).
- **Explainability**: Identifies the top risk contributor and provides human-readable insights.
- **Dynamic Weighting**: Supports custom risk weights per API request with automatic normalization.
- **GCP Ready**: Optimized for Google Cloud Run with stubs for BigQuery and Cloud Storage.

## Folder Structure
```
app/
├── api/
│   └── routes/
│       └── risk.py          # Risk evaluation endpoints
├── core/
│   └── config.py            # Global settings and defaults
├── data/
│   └── risk_profiles.json   # Country risk mock dataset
├── models/
│   └── schemas.py           # Pydantic validation models
├── services/
│   ├── risk_engine.py       # Core logic and plugin orchestration
│   ├── risk_service.py      # Orchestrator
│   ├── plugins/             # Individual risk factor plugins
│   └── data_providers/      # Data access layer
└── main.py                  # API entrypoint
```

## Running Locally

1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the development server:
   ```bash
   uvicorn app.main:app --reload
   ```

## Example API Request
```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/api/v1/risk/evaluate' \
  -H 'Content-Type: application/json' \
  -d '{
  "origin_country": "China",
  "destination_country": "Brazil",
  "product_name": "electronics"
}'
```

## Running Tests
```bash
pytest
```
