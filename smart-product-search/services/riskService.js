// services/riskService.js

const countryRiskMap = {
  China: 6,
  India: 5,
  Germany: 2,
  USA: 3,
  Brazil: 7,
  UAE: 2
};

exports.getCountryRisk = (country) => {
  return countryRiskMap[country] || 5;
};
