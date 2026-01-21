const express = require("express");
const router = express.Router();

const {
  getAllCountries,
  getCountryById,
  getCountriesByName,
  getCountriesByRegion,
  getCountryByCode
} = require("../controllers/countriesController");

/*
 ROUTE ORDER IS CRITICAL
 More specific routes FIRST
*/

// 🔍 /api/countries/name/india
router.get("/name/:name", getCountriesByName);

// 🌍 /api/countries/region/asia
router.get("/region/:region", getCountriesByRegion);

// 🏳️ /api/countries/code/IN or /IND
router.get("/code/:code", getCountryByCode);

// 📄 /api/countries?page=1&limit=10
router.get("/", getAllCountries);

// 🆔 /api/countries/123
router.get("/:id", getCountryById);

module.exports = router;
