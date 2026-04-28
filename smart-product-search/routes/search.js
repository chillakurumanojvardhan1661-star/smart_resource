const express = require("express");
const router = express.Router();
const { Client } = require("@elastic/elasticsearch");
const { PrismaClient } = require("@prisma/client");
const { sortByBestDeal, scoreSupplier } = require("../utils/searchLogic");
const authMiddleware = require("../middleware/auth");

const prisma = new PrismaClient();
const esClient = new Client({
  node: process.env.ELASTICSEARCH_URL || "http://localhost:9200"
});

/**
 * GET /api/search?q=LED TV&minPrice=100&maxPrice=300&country=India&page=1&limit=10
 */
router.get("/", authMiddleware, async (req, res) => {
  const { q, minPrice, maxPrice, country, page = 1, limit = 10, sort = "best" } = req.query;
  const offset = (page - 1) * limit;

  try {
    // Attempt Elasticsearch first
    try {
      const result = await esClient.search({
        index: "products",
        from: offset,
        size: parseInt(limit),
        body: {
          query: {
            bool: {
              must: [
                q ? {
                  multi_match: {
                    query: q,
                    fields: ["name", "category", "supplierName"]
                  }
                } : { match_all: {} }
              ],
              filter: [
                minPrice && { range: { price: { gte: minPrice } } },
                maxPrice && { range: { price: { lte: maxPrice } } },
                country && { term: { country: country } }
              ].filter(Boolean)
            }
          }
        }
      });

      let hits = result.hits.hits.map(hit => hit._source);
      
      // Apply ranking and sorting logic
      hits = hits.map(hit => ({
        ...hit,
        score: scoreSupplier(hit)
      }));

      if (sort === "best") {
        hits = sortByBestDeal(hits);
      } else if (sort === "score") {
        hits.sort((a, b) => b.score - a.score);
      }

      return res.json({
        success: true,
        source: "elasticsearch",
        count: hits.length,
        page: parseInt(page),
        data: hits
      });
      
    } catch (esError) {
      console.warn("Elasticsearch failed, falling back to DB Search:", esError.message);
      
      // Fallback Database Search
      let whereClause = {};
      if (q) {
        // SQLite doesn't support mode: 'insensitive' as it's case-insensitive by default
        whereClause.OR = [
          { product: { name: { contains: q } } },
          { product: { category: { contains: q } } },
          { supplier: { name: { contains: q } } }
        ];
      }
      if (country) {
        whereClause.supplier = { ...whereClause.supplier, country: country };
      }
      if (minPrice || maxPrice) {
        whereClause.price = {};
        if (minPrice) whereClause.price.gte = parseFloat(minPrice);
        if (maxPrice) whereClause.price.lte = parseFloat(maxPrice);
      }

      const products = await prisma.supplierProduct.findMany({
        where: whereClause,
        include: {
          product: true,
          supplier: true
        },
        skip: offset,
        take: parseInt(limit)
      });

      let hits = products.map(sp => ({
        id: sp.product.id,
        name: sp.product.name,
        category: sp.product.category,
        supplierName: sp.supplier.name,
        country: sp.supplier.country,
        rating: sp.supplier.rating,
        price: sp.price,
        moq: sp.moq,
        currency: sp.currency
      }));
      
      hits = hits.map(hit => ({ ...hit, score: scoreSupplier(hit) }));
      if (sort === "best") hits = sortByBestDeal(hits);
      else if (sort === "score") hits.sort((a, b) => b.score - a.score);

      return res.json({
        success: true,
        source: "database",
        count: hits.length,
        page: parseInt(page),
        data: hits
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
