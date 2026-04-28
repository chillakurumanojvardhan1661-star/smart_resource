// controllers/optimizationController.js

const optimizationService = require("../services/optimizationService");

exports.optimize = async (req, res) => {
  try {
    const { product, budget, priority } = req.body;
    
    if (!product) {
        return res.status(400).json({ error: "Product name is required for optimization." });
    }

    const result = await optimizationService.optimize({ product, budget, priority });

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Optimization failed" });
  }
};
