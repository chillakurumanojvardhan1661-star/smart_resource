// services/supplierService.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { calculateSupplierScore } = require("../jobs/calculateSupplierScore");

exports.getReliability = async (supplierId) => {
  // Check if score exists
  let score = await prisma.supplierScore.findUnique({
    where: { supplierId }
  });

  // If not found or older than 1 hour, trigger a recalculation (simplified background job)
  if (!score || (new Date() - new Date(score.updatedAt) > 3600000)) {
    console.log(`Recalculating score for supplier ${supplierId}...`);
    await calculateSupplierScore(supplierId);
    score = await prisma.supplierScore.findUnique({
      where: { supplierId }
    });
  }

  if (!score) {
    throw new Error("Supplier data insufficient to generate reliability score");
  }

  return {
    ...score,
    riskLabel: getRiskLabel(score.finalScore)
  };
};

function getRiskLabel(score) {
  if (score > 0.85) return "🟢 Highly Reliable";
  if (score > 0.65) return "🟡 Moderate";
  return "🔴 Risky Supplier";
}
