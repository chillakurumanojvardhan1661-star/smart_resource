#!/bin/bash

export PATH=$PATH:/Users/manojvardhan/Library/Python/3.14/bin

echo "🚀 Starting Global Trade Intelligence Platform..."

# 1. Start Cost Intelligence Engine (Port 8001)
echo "📦 Starting Cost Intelligence Engine on port 8001..."
(cd cost-intelligence-engine && python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8001) &

# 2. Start Demand Prediction Engine (Port 8002)
echo "📊 Starting Demand Prediction Engine on port 8002..."
(cd demand-prediction-engine && python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8002) &

# 3. Start Risk Intelligence Engine (Port 8003)
echo "⚠️ Starting Risk Intelligence Engine on port 8003..."
(cd risk-intelligence-engine && python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8003) &

# Wait a bit for engines to start
sleep 5

# 4. Start AI Trade Advisor (Port 8000)
echo "🧠 Starting AI Trade Advisor on port 8000..."
export COST_SERVICE_URL=http://localhost:8001
export DEMAND_SERVICE_URL=http://localhost:8002
export RISK_SERVICE_URL=http://localhost:8003
(cd ai-trade-advisor && python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000) &

# 5. Start Frontend
echo "🌐 Starting Frontend Dashboard..."
(cd trade-intelligence-frontend && npm run dev) &

echo "✅ All systems are starting."
echo "Frontend: http://localhost:3000"
echo "AI Advisor API: http://localhost:8000"

# Keep script running to maintain background processes
wait
