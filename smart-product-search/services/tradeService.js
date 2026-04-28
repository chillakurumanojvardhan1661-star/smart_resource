// services/tradeService.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getIntel = async ({ product, origin, destination }) => {
  // 1. Restrictions
  const restrictions = await prisma.tradeRestriction.findMany({
    where: {
      product: { contains: product },
      originCountry: origin,
      destinationCountry: destination
    }
  });

  // 2. Tariffs
  const tariff = await prisma.tariff.findFirst({
    where: {
      product: { contains: product },
      originCountry: origin,
      destinationCountry: destination
    }
  });

  // 3. Seasonal Trends (for destination country)
  const trends = await prisma.tradeTrend.findMany({
    where: {
      product: { contains: product },
      country: destination
    },
    orderBy: { month: 'asc' }
  });

  return {
    product,
    route: `${origin} -> ${destination}`,
    restrictions: restrictions.map(r => ({
      type: r.restrictionType,
      description: r.description,
      severity: r.severity
    })),
    tariff: tariff ? tariff.dutyPercentage : 0,
    seasonalTrends: analyzeTrends(trends)
  };
};

function analyzeTrends(data) {
  let bestMonthsToSell = [];
  let bestMonthsToBuy = [];

  data.forEach(row => {
    // If demand is much higher than supply, it's a seller's market
    if (row.demandIndex > row.supplyIndex + 20) {
      bestMonthsToSell.push(row.month);
    }
    // If supply is much higher than demand, it's a buyer's market
    if (row.supplyIndex > row.demandIndex + 20) {
      bestMonthsToBuy.push(row.month);
    }
  });

  return {
    bestMonthsToSell,
    bestMonthsToBuy
  };
}
