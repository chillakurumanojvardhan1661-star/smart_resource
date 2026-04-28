// routes/trade.js

const express = require("express");
const router = express.Router();
const tradeController = require("../controllers/tradeController");

router.get("/", tradeController.getTradeIntel);

module.exports = router;
