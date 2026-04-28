from ..benchmarking.scoring import compute_scores
from ..benchmarking.ranking import rank_companies
from ..benchmarking.insights import generate_benchmarking_insights

def run_benchmarking(companies):
    if not companies:
        return {"error": "No company data provided"}
        
    scores = compute_scores(companies)
    ranked = rank_companies(scores)
    insights = generate_benchmarking_insights(ranked)
    
    return {
        "ranked_competitors": ranked,
        "market_insights": insights
    }
