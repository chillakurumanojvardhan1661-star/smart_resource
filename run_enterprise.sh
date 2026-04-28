#!/bin/bash

# Kill any existing processes on the ports
kill_port() {
  PORT=$1
  PID=$(lsof -t -i:$PORT)
  if [ -n "$PID" ]; then
    echo "Killing process on port $PORT (PID: $PID)"
    kill -9 $PID
  fi
}

kill_port 8000
kill_port 8001
kill_port 8002
kill_port 8003
kill_port 8004
kill_port 3000

echo "Starting all microservices..."

# Start each service in the background
# Make sure PYTHONPATH includes the current directory so 'common' is found
export PYTHONPATH=$PYTHONPATH:$(pwd)/backend

# Use python3 -m uvicorn instead of uvicorn command
python3 -m uvicorn backend.cost_engine.main:app --port 8001 &
python3 -m uvicorn backend.demand_prediction_engine.main:app --port 8002 &
python3 -m uvicorn backend.risk_intelligence_engine.main:app --port 8003 &
python3 -m uvicorn backend.advisor.main:app --port 8004 &
python3 -m uvicorn backend.gateway.main:app --port 8000 &

echo "Starting frontend..."
cd trade-intelligence-frontend && npm run dev &

echo "System is booting up. Access the dashboard at http://localhost:3000"
echo "API Gateway: http://localhost:8000"
