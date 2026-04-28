// controllers/tradeController.js

const tradeService = require("../services/tradeService");

exports.getTradeIntel = async (req, res) => {
  try {
    const { product, origin, destination } = req.query;

    if (!product || !origin || !destination) {
        return res.status(400).json({ error: "Missing required parameters: product, origin, destination" });
    }

    const data = await tradeService.getIntel({
      product,
      origin,
      destination
    });

    res.json({
      success: true,
      data
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Trade intelligence generation failed" });
  }
};
