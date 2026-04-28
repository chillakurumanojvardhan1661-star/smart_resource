import networkx as nx

def route_cost(u, v, d, alpha=0.5, beta=0.3):
    """
    Cost function for Dijkstra:
    Minimize Distance + alpha * Time + beta * Congestion
    """
    return (
        d["distance"] +
        alpha * d["time"] +
        beta * d["congestion"] * 1000 # Scaling congestion for impact
    )

def find_best_route(graph, source, target):
    try:
        path = nx.dijkstra_path(
            graph,
            source,
            target,
            weight=lambda u, v, d: route_cost(u, v, d)
        )
        return path
    except nx.NetworkXNoPath:
        return None
    except nx.NodeNotFound as e:
        raise ValueError(str(e))
