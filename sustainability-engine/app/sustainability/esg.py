def environmental_score(company):
    # Higher waste_management_score is better, higher emission/usage is worse
    score = (
        company.waste_management_score * 0.4 + 
        max(0, 100 - company.carbon_emission) * 0.3 + 
        max(0, 100 - company.energy_usage) * 0.3
    )
    return score

def social_score(company):
    return (
        company.labor_score * 0.6 + 
        company.diversity_score * 0.4
    )

def governance_score_val(company):
    return company.governance_score
