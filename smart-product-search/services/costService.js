// services/costService.js

const shippingService = require("./shippingService");
const dutyService = require("./dutyService");
const taxService = require("./taxService");

async function calculateSingleCountryCost(input, targetCountry) {
  const {
    productPrice,
    quantity,
    originCountry,
    shippingMode,
    productCategory,
    sellingPrice,
    handlingFee
  } = input;

  const baseCost = productPrice * quantity;

  // 1. Shipping Cost
  const shippingCost = await shippingService.calculate({
    weight: quantity * 2, // assume 2kg per unit (mock)
    mode: shippingMode,
    originCountry,
    destinationCountry: targetCountry
  });

  // 2. Import Duty
  const duty = await dutyService.calculate({
    category: productCategory,
    baseCost,
    country: targetCountry
  });

  // 3. Tax (GST / VAT)
  const tax = await taxService.calculate({
    country: targetCountry,
    amount: baseCost + shippingCost + duty
  });

  // 4. Final Landed Cost
  const totalCost = baseCost + shippingCost + duty + tax + (handlingFee || 0);

  // 5. Profit
  const revenue = sellingPrice * quantity;
  const profit = revenue - totalCost;
  const marginRaw = (profit / revenue) * 100;
  
  // 6. Smart Suggestion
  let suggestion = "Healthy profit margin.";
  if (marginRaw < 10) {
      suggestion = "Low profit. Try an alternative supplier, switch shipping mode to sea, or negotiate duties.";
  } else if (marginRaw > 30) {
      suggestion = "Excellent margin! Consider scaling up volume for further discounts.";
  }

  return {
    breakdown: {
      baseCost,
      shippingCost,
      duty,
      tax,
      handlingFee: handlingFee || 0
    },
    totalCost,
    revenue,
    profit,
    margin: marginRaw.toFixed(2) + "%",
    suggestion
  };
}

exports.calculate = async (input) => {
    // Multi-Country Comparison logic as requested for the killer feature
    const primaryCountry = input.destinationCountry;
    const comparisonCountries = input.compareWith || []; // e.g., ["USA", "Germany", "UAE"]
    
    // Always include the primary destination
    const targetCountries = [primaryCountry, ...comparisonCountries];
    
    const results = {};
    
    for (const country of targetCountries) {
        results[country] = await calculateSingleCountryCost(input, country);
    }
    
    // If no comparison countries, just return the flat object to keep API contract consistent,
    // otherwise return the multi-country object.
    if (comparisonCountries.length === 0) {
        return results[primaryCountry];
    }
    
    return results;
};
