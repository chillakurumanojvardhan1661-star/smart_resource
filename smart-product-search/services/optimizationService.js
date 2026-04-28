// services/optimizationService.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.optimize = async ({ product, budget, priority }) => {
  // 1. Fetch suppliers with their products and reliability scores
  const suppliers = await prisma.supplierProduct.findMany({
    where: { product: { name: { contains: product } } },
    include: {
      supplier: {
        include: {
          scores: true
        }
      }
    }
  });

  if (suppliers.length === 0) {
      throw new Error(`No suppliers found for product matching "${product}"`);
  }

  // 2. Get demand forecast
  // We'll use a loose match for the product name in the forecast table too
  const forecast = await prisma.demandForecast.findFirst({
    where: { product: { contains: product } }
  });
  
  let remainingDemand = forecast ? forecast.forecastQuantity : 100; // Default to 100 if no forecast

  // 3. Scoring logic
  const scoredSuppliers = suppliers.map(sp => {
    const reliability = sp.supplier.scores ? sp.supplier.scores.finalScore : 0.5; // Default 0.5 if no score
    let score;
    
    if (priority === "cost") {
      score = 1 / sp.price;
    } else if (priority === "reliability") {
      score = reliability;
    } else {
      // balanced (60% cost, 40% reliability)
      score = (0.6 * (1 / sp.price)) + (0.4 * reliability);
    }
    
    return { 
      supplierId: sp.supplierId,
      supplierName: sp.supplier.name,
      price: sp.price,
      moq: sp.moq,
      reliability,
      score 
    };
  });

  // 4. Sort suppliers by score (highest first)
  scoredSuppliers.sort((a, b) => b.score - a.score);

  const plan = [];
  let totalCost = 0;

  // 5. Allocate quantities using greedy approach
  for (const s of scoredSuppliers) {
    if (remainingDemand <= 0) break;

    // How much can we buy? At least MOQ, at most remainingDemand
    let qty = Math.max(s.moq, remainingDemand);
    let cost = qty * s.price;

    // Budget constraint check
    if (budget && totalCost + cost > budget) {
      // Calculate how much we can afford
      qty = Math.floor((budget - totalCost) / s.price);
      if (qty < s.moq) continue; // Skip if we can't even meet the MOQ with remaining budget
      cost = qty * s.price;
    }

    plan.push({
      supplierId: s.supplierId,
      supplierName: s.supplierName,
      quantity: qty,
      unitPrice: s.price,
      cost,
      reliability: s.reliability
    });

    remainingDemand -= qty;
    totalCost += cost;
  }

  return {
    product: forecast ? forecast.product : product,
    targetDemand: forecast ? forecast.forecastQuantity : 100,
    totalCost,
    remainingDemand: Math.max(0, remainingDemand),
    plan,
    insight: generateInsight(remainingDemand)
  };
};

function generateInsight(remainingDemand) {
  if (remainingDemand > 0) {
    return "⚠️ Demand not fully met – increase budget or add more reliable suppliers.";
  }
  return "✅ Optimized procurement plan generated successfully.";
}
