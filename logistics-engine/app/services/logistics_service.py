from ..logistics.graph_builder import build_graph
from ..logistics.routing import find_best_route
from ..logistics.eta import estimate_eta
from ..logistics.congestion import get_port_status

def analyze_shipping_route(routes, ports, source, destination):
    # Map port names to congestion levels
    ports_map = {p.name: p.congestion_level for p in ports}
    
    # Build network
    route_dicts = [
        {"source": r.source_port, "destination": r.destination_port, "distance": r.distance, "time": r.avg_time}
        for r in routes
    ]
    
    graph = build_graph(route_dicts, ports_map)
    
    # Optimize
    path = find_best_route(graph, source, destination)
    if not path:
        return {"error": f"No valid shipping route found between {source} and {destination}"}
        
    # Estimate
    eta_details = estimate_eta(graph, path)
    
    # Get congestion snapshots for each port in path
    port_snapshots = [get_port_status(p, ports_map.get(p)) for p in path]
    
    return {
        "summary": {
            "origin": source,
            "destination": destination,
            "total_eta_hours": eta_details["total_eta_hours"],
            "stops": len(path) - 2 if len(path) > 2 else 0
        },
        "path": path,
        "eta_breakdown": eta_details["segments"],
        "port_congestion": port_snapshots
    }
