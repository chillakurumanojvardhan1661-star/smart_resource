from pulp import LpMinimize, LpProblem, LpVariable, lpSum, value

def optimize_suppliers(suppliers, demand_val, alpha=0.5, beta=0.3):
    """
    Optimizes supplier allocation to minimize:
    Z = Total Cost + alpha * Risk + beta * (100 - Sustainability)
    """
    model = LpProblem("Supplier_Optimization", LpMinimize)

    # Decision variables: amount to buy from each supplier
    x = {
        s["id"]: LpVariable(f"x_{s['id']}", lowBound=0)
        for s in suppliers
    }

    # Objective function
    # Note: sustainability penalty is (100 - score) because higher score is better
    model += lpSum([
        x[s["id"]] * (
            s["cost_per_unit"] + 
            alpha * s["risk_score"] * 100 + # Scaling risk to be comparable to cost
            beta * (100 - s["sustainability_score"])
        )
        for s in suppliers
    ])

    # Constraint 1: Meet total demand
    model += lpSum([x[s["id"]] for s in suppliers]) >= demand_val

    # Constraint 2: Respect supplier capacities
    for s in suppliers:
        model += x[s["id"]] <= s["capacity"]

    # Solve
    model.solve()

    allocation = {
        s["id"]: float(value(x[s["id"]])) for s in suppliers
    }

    return allocation
