import numpy as np

def calculate_var(returns, confidence=0.95):
    if len(returns) == 0:
        return 0.0
    sorted_returns = np.sort(returns)
    index = int((1 - confidence) * len(sorted_returns))
    return abs(float(sorted_returns[index]))
