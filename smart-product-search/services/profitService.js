// services/profitService.js

exports.calculate = (option) => {
  const { price, sellingPrice } = option;
  if (!sellingPrice || sellingPrice <= 0) return 0;
  
  const margin = (sellingPrice - price) / sellingPrice;
  
  // Normalize to 0–100 (assuming 50% margin is a perfect 100 score for normalization)
  return Math.min(100, Math.max(0, margin * 200));
};
