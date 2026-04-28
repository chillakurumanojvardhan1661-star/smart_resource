// services/heatmapService.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.generate = async (product) => {
  // Query regions along with their matching demand and supply data for the given product
  const regions = await prisma.region.findMany({
    include: {
      demands: {
        where: { product: { equals: product } },
        orderBy: { timestamp: 'desc' },
        take: 1
      },
      supplies: {
        where: { product: { equals: product } },
        orderBy: { timestamp: 'desc' },
        take: 1
      }
    }
  });

  return regions.map(row => {
    const demand = row.demands[0]?.demandIndex || 0;
    const supply = row.supplies[0]?.supplyIndex || 0;
    const imbalance = demand - supply;

    return {
      region: row.name,
      country: row.country,
      coordinates: {
        lat: row.latitude,
        lng: row.longitude
      },
      demand,
      supply,
      imbalance,
      insight: generateInsight(imbalance)
    };
  });
};

// Insight generator
function generateInsight(imbalance) {
  if (imbalance > 50) {
    return "🔥 High demand – Best place to SELL";
  } else if (imbalance < -50) {
    return "📦 Oversupply – Best place to BUY";
  } else {
    return "⚖️ Balanced market";
  }
}
