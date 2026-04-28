$env:PYTHONPATH = "$env:PYTHONPATH;$PWD/backend"

# Function to kill process by port
function Kill-Port {
    param ($Port)
    $connection = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    if ($connection) {
        $pidToKill = $connection.OwningProcess
        Write-Host "Killing process on port $Port (PID: $pidToKill)"
        Stop-Process -Id $pidToKill -Force -ErrorAction SilentlyContinue
    }
}

Kill-Port 8000
Kill-Port 8001
Kill-Port 8002
Kill-Port 8003
Kill-Port 8004
Kill-Port 3000

Write-Host "Starting all microservices..."

# Start each service in the background
Start-Process -NoNewWindow python -ArgumentList "-m uvicorn backend.cost_engine.main:app --port 8001"
Start-Process -NoNewWindow python -ArgumentList "-m uvicorn backend.demand_prediction_engine.main:app --port 8002"
Start-Process -NoNewWindow python -ArgumentList "-m uvicorn backend.risk_intelligence_engine.main:app --port 8003"
Start-Process -NoNewWindow python -ArgumentList "-m uvicorn backend.advisor.main:app --port 8004"
Start-Process -NoNewWindow python -ArgumentList "-m uvicorn backend.gateway.main:app --port 8000"

Write-Host "Starting frontend..."
Start-Process -NoNewWindow npm -ArgumentList "run dev"

Write-Host "System is booting up. Access the dashboard at http://localhost:3000"
Write-Host "API Gateway: http://localhost:8000"
