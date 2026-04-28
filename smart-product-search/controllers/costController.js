// controllers/costController.js

const costService = require("../services/costService");

exports.calculateCost = async (req, res) => {
  try {
    const result = await costService.calculate(req.body);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cost calculation failed" });
  }
};
