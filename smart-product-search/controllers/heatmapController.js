// controllers/heatmapController.js

const heatmapService = require("../services/heatmapService");

exports.getHeatmap = async (req, res) => {
  try {
    const { product } = req.query;
    if (!product) {
        return res.status(400).json({ error: "Product query parameter is required" });
    }

    const data = await heatmapService.generate(product);

    res.json({
      success: true,
      data
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Heatmap generation failed" });
  }
};
