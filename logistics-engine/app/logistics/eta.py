def estimate_eta(graph, path):
    """
    Estimates total travel time considering congestion delays.
    """
    total_time = 0
    segments = []
    
    for i in range(len(path) - 1):
        u, v = path[i], path[i+1]
        edge = graph[u][v]
        
        # Delay multiplier: 1.0 (no delay) to 2.0 (double time if max congestion)
        congestion_delay = edge["time"] * edge["congestion"]
        segment_time = edge["time"] + congestion_delay
        
        total_time += segment_time
        segments.append({
            "from": u,
            "to": v,
            "base_time": edge["time"],
            "congestion_delay": congestion_delay,
            "total_segment_time": segment_time
        })
        
    return {
        "total_eta_hours": round(total_time, 2),
        "segments": segments
    }
