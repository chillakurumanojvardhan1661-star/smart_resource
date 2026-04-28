"""
ai/advisor.py
-------------
AI trade recommendation engine.

Priority:
  1. OpenAI GPT-4o-mini  (if OPENAI_API_KEY is set)
  2. Rule-based fallback  (works completely offline)

The fallback engine returns a deterministic, human-readable recommendation
based on simple heuristics so the service is always functional.
"""
import os
import logging
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")


# ─────────────────────────── Rule-Based Fallback ─────────────────────────────

def _rule_based_advice(portfolio: List[Dict], market_data: Dict[str, Any]) -> str:
    """Simple heuristic advisor used when OpenAI is not configured."""
    lines = ["📊 **AI Trade Advisor — Rule-Based Analysis**\n"]

    for holding in portfolio:
        symbol = holding.get("symbol", "UNKNOWN")
        qty = holding.get("quantity", 0)
        avg_price = holding.get("avg_price", 0)

        raw_price = market_data.get(symbol, {}).get("price", "0")
        try:
            current_price = float(raw_price)
        except (ValueError, TypeError):
            current_price = 0.0

        if current_price == 0.0:
            lines.append(f"**{symbol}** — No live price available. Recommend: **HOLD** (low data confidence)")
            continue

        pnl_pct = ((current_price - avg_price) / avg_price * 100) if avg_price > 0 else 0

        if pnl_pct > 15:
            action, risk = "SELL", "MEDIUM"
            reason = f"Asset is up {pnl_pct:.1f}% from avg. Consider taking profits."
        elif pnl_pct < -10:
            action, risk = "HOLD / ACCUMULATE", "HIGH"
            reason = f"Asset is down {pnl_pct:.1f}% from avg. Possible rebound opportunity."
        else:
            action, risk = "HOLD", "LOW"
            reason = f"Asset is {pnl_pct:+.1f}% from avg. Stable — monitor for breakout."

        lines.append(
            f"**{symbol}** (qty: {qty}) | Avg: {avg_price:.2f} | Current: {current_price:.2f} | "
            f"P&L: {pnl_pct:+.1f}%\n"
            f"→ Recommendation: **{action}** | Risk Level: **{risk}**\n"
            f"→ Reasoning: {reason}\n"
        )

    lines.append("\n_Note: Enable OpenAI integration for LLM-powered insights._")
    return "\n".join(lines)


# ─────────────────────────── OpenAI Engine ───────────────────────────────────

async def generate_trade_advice(portfolio: List[Dict], market_data: Dict[str, Any]) -> str:
    """
    Generate AI trade advice. Uses OpenAI when key is present, otherwise falls
    back to the rule-based engine.
    """
    if not OPENAI_API_KEY:
        logger.info("OPENAI_API_KEY not set — using rule-based advisor.")
        return _rule_based_advice(portfolio, market_data)

    try:
        import openai
        openai.api_key = OPENAI_API_KEY

        prompt = f"""You are a professional, concise trading advisor.

Portfolio (holdings):
{portfolio}

Current Market Prices:
{market_data}

For each holding, provide:
1. Action: BUY / SELL / HOLD
2. Risk Level: LOW / MEDIUM / HIGH
3. One-sentence reasoning

Format each holding as a bullet point. Be brief but data-driven."""

        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=600,
            temperature=0.4,
        )
        return response.choices[0].message.content

    except Exception as exc:
        logger.error(f"OpenAI call failed: {exc}. Falling back to rule-based advisor.")
        return _rule_based_advice(portfolio, market_data)
