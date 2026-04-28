// controllers/supplierController.js

const supplierService = require("../services/supplierService");

exports.getReliability = async (req, res) => {
  try {
    const { id } = req.params;

    const score = await supplierService.getReliability(id);

    res.json({
      success: true,
      data: score
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to fetch reliability" });
  }
};
