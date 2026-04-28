import random

def get_port_status(port_name, current_congestion=None):
    """
    Returns real-time status of a port.
    In production, this would call a Maritime API (AIS).
    """
    if current_congestion is None:
        current_congestion = round(random.uniform(0.1, 0.9), 2)
        
    return {
        "port": port_name,
        "congestion_index": current_congestion,
        "status": "CRITICAL" if current_congestion > 0.8 else "HIGH" if current_congestion > 0.6 else "NORMAL",
        "live_vessels_waiting": int(current_congestion * 50)
    }
