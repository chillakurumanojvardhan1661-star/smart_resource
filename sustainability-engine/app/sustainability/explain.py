import os
from ..config import settings

def generate_explanation(score_data):
    """
    Generates an explanation for the sustainability score.
    Uses OpenAI if configured, otherwise falls back to a rule-based generator.
    """
    if settings.OPENAI_API_KEY:
        try:
            from openai import OpenAI
            client = OpenAI(api_key=settings.OPENAI_API_KEY)
            
            prompt = f"""
            Analyze this sustainability score data for a company:
            {score_data}
            
            Provide:
            - A summary of their ESG performance.
            - Top 2 strengths.
            - Top 2 areas for improvement.
            - A professional recommendation.
            """
            
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=500
            )
            return response.choices[0].message.content
        except Exception as e:
            return _rule_based_explanation(score_data) + f"\n\n(Note: AI explanation failed: {str(e)})"
    else:
        return _rule_based_explanation(score_data)

def _rule_based_explanation(score_data):
    final = score_data['final_score']
    if final >= 80:
        status = "Excellent"
        summary = "The company is a leader in sustainability with strong ESG practices."
    elif final >= 60:
        status = "Good"
        summary = "The company shows solid commitment to sustainability but has room for improvement."
    elif final >= 40:
        status = "Fair"
        summary = "The company has basic sustainability measures but lags in several key ESG areas."
    else:
        status = "Poor"
        summary = "The company has significant sustainability risks and lacks a robust ESG framework."
        
    explanation = f"### Sustainability Report: {status}\n\n"
    explanation += f"**Overall Score:** {final}/100\n\n"
    explanation += f"{summary}\n\n"
    
    strengths = []
    weaknesses = []
    
    metrics = [
        ('Environmental', score_data['environmental']),
        ('Social', score_data['social']),
        ('Governance', score_data['governance']),
        ('Carbon', score_data['carbon'])
    ]
    
    for name, val in metrics:
        if val >= 70:
            strengths.append(f"{name} ({val})")
        elif val < 40:
            weaknesses.append(f"{name} ({val})")
            
    if strengths:
        explanation += "**Strengths:** " + ", ".join(strengths) + "\n"
    if weaknesses:
        explanation += "**Weaknesses:** " + ", ".join(weaknesses) + "\n"
        
    return explanation
