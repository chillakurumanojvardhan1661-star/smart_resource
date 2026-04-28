from .normalization import min_max_scale

def compute_scores(companies):
    if not companies:
        return []
        
    revenue = [c["revenue"] for c in companies]
    profit = [c["profit_margin"] for c in companies]
    market = [c["market_share"] for c in companies]
    risk = [c["risk_score"] for c in companies]
    sustainability = [c["sustainability_score"] for c in companies]
    
    rev_n = min_max_scale(revenue)
    prof_n = min_max_scale(profit)
    market_n = min_max_scale(market)
    risk_n = min_max_scale(risk)
    sust_n = min_max_scale(sustainability)
    
    scores = []
    for i, c in enumerate(companies):
        # High revenue, profit, market, sustainability are good
        # High risk is bad (so we subtract it)
        score = (
            0.25 * rev_n[i] +
            0.20 * prof_n[i] +
            0.20 * market_n[i] -
            0.15 * risk_n[i] +
            0.20 * sust_n[i]
        )
        scores.append({
            "company_name": c["company_name"],
            "composite_score": float(score),
            "metrics": {
                "revenue": float(rev_n[i]),
                "profit": float(prof_n[i]),
                "market": float(market_n[i]),
                "risk": float(risk_n[i]),
                "sustainability": float(sust_n[i])
            }
        })
    return scores
