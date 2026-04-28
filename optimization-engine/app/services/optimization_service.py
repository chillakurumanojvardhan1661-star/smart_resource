from ..optimization.solver import optimize_suppliers
from ..optimization.constraints import validate_inputs

def run_optimization(suppliers, demand):
    validate_inputs(suppliers, demand)

    allocation = optimize_suppliers(suppliers, demand)

    total_cost = sum(
        allocation[s["id"]] * s["cost_per_unit"]
        for s in suppliers
    )
    
    avg_risk = sum(
        allocation[s["id"]] * s["risk_score"]
        for s in suppliers
    ) / demand if demand > 0 else 0
    
    avg_sustainability = sum(
        allocation[s["id"]] * s["sustainability_score"]
        for s in suppliers
    ) / demand if demand > 0 else 0

    return {
        "allocation": allocation,
        "metrics": {
            "total_cost": float(total_cost),
            "average_risk": float(avg_risk),
            "average_sustainability": float(avg_sustainability)
        },
        "suppliers_used": [s["name"] for s in suppliers if allocation[s["id"]] > 0]
    }
