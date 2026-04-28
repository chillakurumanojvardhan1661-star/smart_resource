def calculate_carbon_score(emission, energy_usage):
    # Lower emission and energy usage = better score
    # Scales are placeholders for demonstration
    emission_score = max(0, 100 - emission * 0.5)
    energy_score = max(0, 100 - energy_usage * 0.3)
    return (emission_score * 0.6 + energy_score * 0.4)
