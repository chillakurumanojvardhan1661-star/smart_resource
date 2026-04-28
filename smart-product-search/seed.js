const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding data...");

  // Suppliers
  const s1 = await prisma.supplier.create({
    data: { name: 'Shenzhen Electronics', country: 'China', rating: 4.8 }
  });
  const s2 = await prisma.supplier.create({
    data: { name: 'Samsung India', country: 'India', rating: 4.5 }
  });

  // Products
  const p1 = await prisma.product.create({
    data: { name: 'LED TV 42 inch', category: 'Electronics', description: 'High def TV' }
  });
  const p2 = await prisma.product.create({
    data: { name: 'LED TV 40 inch', category: 'Electronics', description: 'Smart TV' }
  });
  const p3 = await prisma.product.create({
    data: { name: 'Microchips V2', category: 'Semiconductor', description: 'Fast processing chips' }
  });

  // Links
  await prisma.supplierProduct.create({
    data: { productId: p1.id, supplierId: s1.id, price: 180, moq: 50, currency: 'USD' }
  });
  await prisma.supplierProduct.create({
    data: { productId: p2.id, supplierId: s2.id, price: 210, moq: 20, currency: 'USD' }
  });
  await prisma.supplierProduct.create({
    data: { productId: p3.id, supplierId: s1.id, price: 5, moq: 1000, currency: 'USD' }
  });

  console.log("Database seeded successfully.");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
