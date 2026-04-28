// routes/optimization.js

const express = require("express");
const router = express.Router();
const optimizationController = require("../controllers/optimizationController");

router.post("/", optimizationController.optimize);

module.exports = router;
