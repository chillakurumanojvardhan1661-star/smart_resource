// services/dutyService.js

const dutyRates = {
    electronics: 0.18,
    food: 0.05,
    textiles: 0.12
  };
  
  exports.calculate = async ({ category, baseCost }) => {
    const rate = dutyRates[category.toLowerCase()] || 0.1;
    return baseCost * rate;
  };
