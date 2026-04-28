from ..config import settings

def generate_benchmarking_insights(ranked_data):
    if settings.OPENAI_API_KEY:
        try:
            from openai import OpenAI
            client = OpenAI(api_key=settings.OPENAI_API_KEY)
            
            prompt = f"""
            Analyze this competitor benchmarking data:
            {ranked_data}
            
            Provide:
            - A summary of the market landscape.
            - Analysis of the leader and why they are winning.
            - Critical weaknesses detected in underperformers.
            - Strategic recommendations for a company looking to enter this space.
            """
            
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}]
            )
            return response.choices[0].message.content
        except Exception as e:
            return _rule_based_insights(ranked_data) + f"\n\n(AI Analysis failed: {e})"
    else:
        return _rule_based_insights(ranked_data)

def _rule_based_insights(ranked_data):
    if not ranked_data:
        return "No data available for analysis."
        
    leader = ranked_data[0]
    laggard = ranked_data[-1]
    
    insights = f"### Market Analysis Report\n\n"
    insights += f"**Market Leader:** {leader['company_name']} (Score: {leader['composite_score']:.2f})\n"
    insights += f"**Market Laggard:** {laggard['company_name']} (Score: {laggard['composite_score']:.2f})\n\n"
    
    insights += f"**Key Insights:**\n"
    insights += f"- The market is currently led by **{leader['company_name']}**, showing strong performance across normalized metrics.\n"
    
    # Check for specific strengths of the leader
    best_metric = max(leader['metrics'].items(), key=lambda x: x[1])
    insights += f"- **{leader['company_name']}** excels particularly in **{best_metric[0]}**.\n"
    
    if len(ranked_data) > 1:
        gap = leader['composite_score'] - laggard['composite_score']
        insights += f"- There is a performance gap of **{gap:.2f} points** between the leader and the bottom performer.\n"
        
    insights += f"\n**Strategic Recommendations:**\n"
    insights += f"- Companies should focus on improving their **sustainability** and **risk management** profiles to stay competitive.\n"
    insights += f"- Targeted investment in market share acquisition is recommended for mid-tier players."
    
    return insights
