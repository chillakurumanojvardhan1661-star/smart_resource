// routes/supplier.js

const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const suppliers = await prisma.supplier.findMany();
    res.json(suppliers);
});

router.get("/:id/reliability", supplierController.getReliability);

module.exports = router;
