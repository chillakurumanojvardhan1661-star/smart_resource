// controllers/analysisController.js

const analysisService = require("../services/analysisService");

exports.analyze = async (req, res) => {
  try {
    const { options, strategy } = req.body;
    
    if (!options || !Array.isArray(options) || options.length === 0) {
        return res.status(400).json({ error: "At least one sourcing option is required." });
    }

    const result = await analysisService.analyze({ options, strategy });

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Strategic analysis failed" });
  }
};
