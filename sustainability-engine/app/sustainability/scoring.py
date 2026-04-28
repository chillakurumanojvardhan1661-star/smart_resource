from .esg import environmental_score, social_score, governance_score_val
from .carbon import calculate_carbon_score

def normalize(score):
    return float(max(0, min(100, score)))

def calculate_sustainability_score(company):
    env = environmental_score(company)
    soc = social_score(company)
    gov = governance_score_val(company)
    carbon = calculate_carbon_score(
        company.carbon_emission, 
        company.energy_usage
    )
    
    # Weighted average
    final_score = (
        normalize(env) * 0.4 + 
        normalize(soc) * 0.3 + 
        normalize(gov) * 0.2 + 
        normalize(carbon) * 0.1
    )
    
    return {
        "environmental": normalize(env),
        "social": normalize(soc),
        "governance": normalize(gov),
        "carbon": normalize(carbon),
        "final_score": normalize(final_score)
    }
