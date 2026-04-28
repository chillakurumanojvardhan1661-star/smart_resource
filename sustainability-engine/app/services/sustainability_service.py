from ..sustainability.scoring import calculate_sustainability_score
from ..sustainability.explain import generate_explanation

def analyze_company(company):
    if not company:
        return {"error": "Company not found"}
        
    score = calculate_sustainability_score(company)
    insights = generate_explanation(score)
    
    return {
        "company_name": company.name,
        "score_details": score,
        "insights": insights
    }
