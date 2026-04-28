// routes/analysis.js

const express = require("express");
const router = express.Router();
const analysisController = require("../controllers/analysisController");

router.post("/profit-stability", analysisController.analyze);

module.exports = router;
