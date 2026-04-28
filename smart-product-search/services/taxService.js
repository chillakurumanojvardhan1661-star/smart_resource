// services/taxService.js

const taxRates = {
    India: 0.18,
    USA: 0.07,
    Germany: 0.19,
    UAE: 0.05
  };
  
  exports.calculate = async ({ country, amount }) => {
    // Basic lookup, fallback to 15%
    const rate = taxRates[country] || 0.15;
    return amount * rate;
  };
