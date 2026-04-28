// jobs/calculateSupplierScore.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function calculateSupplierScore(supplierId) {
  try {
    // 1. Delivery Score
    const orders = await prisma.order.findMany({
      where: { supplierId }
    });
    
    const totalOrders = orders.length;
    if (totalOrders === 0) return 0;

    const onTimeOrders = orders.filter(o => o.actualDelivery && o.actualDelivery <= o.expectedDelivery).length;
    const deliveryScore = onTimeOrders / totalOrders;

    // 2. Review Score
    const reviews = await prisma.review.findMany({
      where: { supplierId }
    });
    const avgRating = reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
      : 0;
    const reviewScore = avgRating / 5.0;

    // 3. Price Stability
    const prices = await prisma.priceHistory.findMany({
      where: { supplierId },
      select: { price: true }
    });
    
    let priceStability = 1.0;
    if (prices.length > 1) {
      const priceVals = prices.map(p => p.price);
      const mean = priceVals.reduce((a, b) => a + b, 0) / priceVals.length;
      const variance = priceVals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / priceVals.length;
      priceStability = 1 / (1 + Math.sqrt(variance)); // using std dev for normalization
    }

    // 4. Consistency Score
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    const consistencyScore = completedOrders / totalOrders;

    // 5. Final Score Calculation
    const finalScore =
      (0.35 * deliveryScore) +
      (0.25 * reviewScore) +
      (0.20 * priceStability) +
      (0.20 * consistencyScore);

    // Save/Update snapshot
    await prisma.supplierScore.upsert({
      where: { supplierId },
      update: {
        deliveryScore,
        reviewScore,
        priceStability,
        consistencyScore,
        finalScore,
        updatedAt: new Date()
      },
      create: {
        supplierId,
        deliveryScore,
        reviewScore,
        priceStability,
        consistencyScore,
        finalScore
      }
    });

    return finalScore;
  } catch (error) {
    console.error(`Error calculating score for supplier ${supplierId}:`, error);
    throw error;
  }
}

module.exports = { calculateSupplierScore };
