import numpy as np

def calculate_price_trend(prices):
    if len(prices) < 2:
        return 0
    # Linear fit to get the slope
    return np.polyfit(range(len(prices)), prices, 1)[0]

def calculate_demand_trend(demand):
    if len(demand) < 2:
        return 0
    return np.polyfit(range(len(demand)), demand, 1)[0]
