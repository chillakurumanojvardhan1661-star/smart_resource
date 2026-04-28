// routes/cost.js

const express = require("express");
const router = express.Router();
const costController = require("../controllers/costController");

router.post("/calculate", costController.calculateCost);

module.exports = router;
