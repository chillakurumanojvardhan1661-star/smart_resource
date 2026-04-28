// services/stabilityService.js

const riskService = require("./riskService");

exports.calculate = (option) => {
  const {
    supplierRating,
    deliveryDays,
    priceVolatility,
    country
  } = option;

  // Supplier component (0-40 points)
  const supplierScore = (supplierRating / 5) * 40;
  
  // Delivery component (0-30 points) - faster is more stable
  const deliveryScore = Math.max(0, 30 - (deliveryDays / 2));
  
  // Volatility component (0-20 points) - lower volatility is better
  const volatilityScore = (1 - (priceVolatility || 0)) * 20;
  
  // Risk component (negative penalty)
  const countryRisk = riskService.getCountryRisk(country); // 0–10
  const riskPenalty = countryRisk * 2;
  
  let stability = supplierScore + deliveryScore + volatilityScore - riskPenalty;
  
  return Math.max(0, Math.min(100, stability));
};
