const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const searchRoutes = require("./routes/search");
const costRoutes = require("./routes/cost");
const heatmapRoutes = require("./routes/heatmap");
const analysisRoutes = require("./routes/analysis");
const supplierRoutes = require("./routes/supplier");
const optimizationRoutes = require("./routes/optimization");
const tradeRoutes = require("./routes/trade");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

// Main search API
app.use("/api/search", searchRoutes);
app.use("/api/cost", costRoutes);
app.use("/api/heatmap", heatmapRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/optimize", optimizationRoutes);
app.use("/api/trade-intelligence", tradeRoutes);

// Healthcheck
app.get("/health", async (req, res) => {
  try {
    // Basic DB check
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", service: "smart-product-search" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Smart Product Search Engine running on port ${PORT}`);
});
