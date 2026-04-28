import networkx as nx

def build_graph(routes, ports_map):
    G = nx.DiGraph()
    for r in routes:
        # Get congestion for the destination port
        dest_congestion = ports_map.get(r["destination"], 0.1)
        G.add_edge(
            r["source"],
            r["destination"],
            distance=r["distance"],
            time=r["time"],
            congestion=dest_congestion
        )
    return G
