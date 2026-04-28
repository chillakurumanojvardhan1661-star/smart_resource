def validate_inputs(suppliers, demand):
    if demand <= 0:
        raise ValueError("Demand must be positive")

    if not suppliers:
        raise ValueError("No suppliers provided")

    total_capacity = sum(s["capacity"] for s in suppliers)

    if total_capacity < demand:
        raise ValueError(f"Insufficient supply capacity. Total: {total_capacity}, Required: {demand}")
