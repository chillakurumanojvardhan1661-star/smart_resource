def find_business_matches(profiles):
    """
    Simple industry-based matching engine.
    Matches buyers and sellers in the same industry.
    """
    buyers = [p for p in profiles if p.get("role") == "buyer"]
    sellers = [p for p in profiles if p.get("role") == "seller"]
    
    matches = []
    for b in buyers:
        for s in sellers:
            if b.get("industry") == s.get("industry"):
                matches.append({
                    "buyer_id": b["user_id"],
                    "seller_id": s["user_id"],
                    "industry": b["industry"],
                    "company_names": {
                        "buyer": b["company_name"],
                        "seller": s["company_name"]
                    }
                })
    return matches
