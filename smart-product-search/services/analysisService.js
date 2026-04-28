// services/analysisService.js

const profitService = require("./profitService");
const stabilityService = require("./stabilityService");

exports.analyze = async ({ options, strategy = "balanced" }) => {
  const results = options.map(option => {
    const profitScore = profitService.calculate(option);
    const stabilityScore = stabilityService.calculate(option);
    
    return {
      ...option,
      profitScore: Math.round(profitScore),
      stabilityScore: Math.round(stabilityScore),
      category: categorize(profitScore, stabilityScore)
    };
  });

  return {
    recommendations: rankResults(results, strategy),
    insights: generateInsights(results)
  };
};

// Categorization logic
function categorize(profit, stability) {
  if (profit > 70 && stability < 60) return "🚀 High Profit - High Risk";
  if (profit < 60 && stability > 70) return "🛡️ Stable - Low Profit";
  if (profit > 70 && stability > 70) return "🔥 Ideal Option";
  return "⚖️ Balanced";
}

// Ranking logic with strategy weights
function rankResults(results, strategy) {
  let profitWeight = 0.5;
  let stabilityWeight = 0.5;

  if (strategy === "aggressive") {
      profitWeight = 0.8;
      stabilityWeight = 0.2;
  } else if (strategy === "safe") {
      profitWeight = 0.2;
      stabilityWeight = 0.8;
  }

  return results.sort((a, b) =>
    (b.profitScore * profitWeight + b.stabilityScore * stabilityWeight) -
    (a.profitScore * profitWeight + a.stabilityScore * stabilityWeight)
  );
}

// Insight generator
function generateInsights(results) {
  if (results.length === 0) return { suggestion: "No options provided for analysis." };

  const bestProfit = [...results].sort((a, b) => b.profitScore - a.profitScore)[0];
  const mostStable = [...results].sort((a, b) => b.stabilityScore - a.stabilityScore)[0];
  
  const scoreGap = Math.abs(bestProfit.profitScore - mostStable.stabilityScore);

  return {
    bestProfitOption: bestProfit.country,
    mostStableOption: mostStable.country,
    suggestion:
      bestProfit.profitScore > mostStable.stabilityScore + 10
        ? "Go for aggressive profit strategy - the gains outweigh the risk."
        : "Choose stability for long-term growth - the risk profile is currently better."
  };
}
