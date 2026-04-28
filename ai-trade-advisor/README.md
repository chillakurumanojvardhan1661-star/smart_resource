# AI Trade Advisor

The orchestration layer of the Global Trade Intelligence Platform. It integrates cost, demand, and risk data to provide intelligent sourcing recommendations.

## Core Logic

- **Async Orchestration**: Parallelizes calls to Cost, Demand, and Risk engines using `asyncio`.
- **Scoring Engine**: Implements min-max normalization across origin options and applies weighted scoring (Default: 40% Profit, 30% Demand, 30% Risk).
- **Explanation Engine**: Generates human-readable reasoning based on the strongest normalized metrics of the best option.
- **Resilience**: Handles partial failures of downstream services by logging errors and continuing with available data.

## Running Locally

1. Setup environment:
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
2. Configure downstream service URLs in `.env` or `app/core/config.py`.
3. Start the service:
   ```bash
   uvicorn app.main:app --reload
   ```

## Example API Request
```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/api/v1/advisor/recommend' \
  -H 'Content-Type: application/json' \
  -d '{
  "product_name": "laptop",
  "origin_options": ["China", "India", "Vietnam"],
  "destination_country": "USA",
  "quantity": 1000,
  "weight": 2.5,
  "selling_price": 1200
}'
```

## Deployment to Google Cloud Run

```bash
gcloud builds submit --tag gcr.io/[PROJECT_ID]/ai-trade-advisor
gcloud run deploy ai-trade-advisor \
  --image gcr.io/[PROJECT_ID]/ai-trade-advisor \
  --set-env-vars=COST_SERVICE_URL=[COST_URL],DEMAND_SERVICE_URL=[DEMAND_URL],RISK_SERVICE_URL=[RISK_URL]
```
