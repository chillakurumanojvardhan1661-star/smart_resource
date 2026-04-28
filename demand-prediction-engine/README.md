# Demand Prediction Engine

A scalable, modular FastAPI microservice for time-series demand forecasting in global trade.

## Architecture

- **API Layer**: `POST /api/v1/demand/predict`
- **Service Layer**: Orchestrates forecasting, trend detection, and confidence scoring.
- **Model Registry**: Supports dynamic switching between local predictors and Vertex AI endpoints.
- **Predictors**: 
    - `LinearRegressionPredictor` (Phase 1 MVP)
    - `VertexAIPredictor` (Phase 2 integration stub)

## Key Features

- **Trend Detection**: Uses slope-based analysis to categorize demand as "increasing", "decreasing", or "stable".
- **Confidence Scoring**: Uses statistical coefficient of variation to estimate prediction reliability.
- **Data Validation**: Ensures minimum data requirements are met before forecasting.

## Running Locally

1. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
2. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```
3. Test the endpoint:
   ```bash
   curl -X 'POST' \
     'http://127.0.0.1:8000/api/v1/demand/predict' \
     -H 'Content-Type: application/json' \
     -d '{
     "product_name": "laptop",
     "country": "India",
     "time_horizon": 3
   }'
   ```

## Deploying to Google Cloud Run

```bash
gcloud builds submit --tag gcr.io/[PROJECT_ID]/demand-prediction-engine
gcloud run deploy demand-prediction-engine \
  --image gcr.io/[PROJECT_ID]/demand-prediction-engine \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```
