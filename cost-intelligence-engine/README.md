# Cost Intelligence Engine

A production-ready, scalable FastAPI microservice that calculates the true landed cost of a product in global trade. Designed for integration into the Global Trade Intelligence Platform.

## Features

- **Modular Architecture**: Separate API, Service, and Calculation engine layers.
- **Plugin System**: Calculation engine easily extensible to support new factors (e.g., Sustainability, AI optimization).
- **GCP Ready**: Pre-configured for deployment on Google Cloud Run with stubs for BigQuery and Cloud Storage integrations.

## Folder Structure
```
app/
├── api/
│   └── routes/
│       └── costs.py         # Cost calculation endpoints
├── core/
│   └── config.py            # Pydantic BaseSettings for environment variables
├── data/
│   └── country_profiles.json # Local fallback dataset
├── models/
│   └── schemas.py           # Pydantic models (Input/Output definitions)
├── services/
│   ├── calculation_engine.py # Core logic with Plugin architecture
│   ├── cost_service.py      # Orchestrator
│   └── data_providers/      # Abstracted clients for external data
└── main.py                  # FastAPI Application entrypoint
```

## Running Locally

1. Create a virtual environment:
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
4. Access the API Docs at `http://127.0.0.1:8000/docs`

## Running Tests

```bash
pytest
```

## Deploying to Google Cloud Run

1. Build the container image using Cloud Build:
   ```bash
   gcloud builds submit --tag gcr.io/[PROJECT_ID]/cost-intelligence-engine
   ```
   *(Replace `[PROJECT_ID]` with your actual Google Cloud Project ID)*

2. Deploy the container to Cloud Run:
   ```bash
   gcloud run deploy cost-intelligence-engine \
     --image gcr.io/[PROJECT_ID]/cost-intelligence-engine \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars=GCP_PROJECT_ID=[PROJECT_ID]
   ```

## Example API Request
```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/api/v1/costs/calculate' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "product_price": 100,
  "quantity": 50,
  "origin_country": "China",
  "destination_country": "India",
  "weight": 20,
  "shipping_mode": "air",
  "selling_price": 150
}'
```
