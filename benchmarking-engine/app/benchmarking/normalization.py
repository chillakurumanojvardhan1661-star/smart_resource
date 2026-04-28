import numpy as np

def min_max_scale(values):
    if not values:
        return []
    min_v = np.min(values)
    max_v = np.max(values)
    if max_v - min_v == 0:
        return [50.0 for _ in values]
    return [((v - min_v) / (max_v - min_v) * 100.0) for v in values]
