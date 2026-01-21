const express = require("express");
const router = express.Router();
const { getAllCountries, getCountryById, searchCountries } = require("../controllers/countriesController");

// ✅ 1. Search route first
router.get("/search", searchCountries);

// ✅ 2. Get all countries
router.get("/", getAllCountries);

// ✅ 3. Get country by ID (dynamic route last!)
router.get("/:id", getCountryById);

module.exports = router;
