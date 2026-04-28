def rank_companies(scores):
    ranked = sorted(scores, key=lambda x: x["composite_score"], reverse=True)
    for i, r in enumerate(ranked):
        r["rank"] = i + 1
    return ranked
