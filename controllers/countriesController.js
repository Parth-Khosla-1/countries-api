const countries = require("../data.json");

/* ===========================
   GET ALL COUNTRIES
   =========================== */
const getAllCountries = (req, res) => {
  let result = [...countries];

  const { region, page = 1, limit = 10, sort } = req.query;

  // FILTER
  if (region) {
    result = result.filter(
      c => c.region && c.region.toLowerCase() === region.toLowerCase()
    );
  }

  // SORT
  if (sort) {
    const [field, order = "desc"] = sort.split(":");

    if (field === "name") {
      result.sort((a, b) =>
        order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }

    if (field === "population") {
      result.sort((a, b) =>
        order === "asc"
          ? (a.population || 0) - (b.population || 0)
          : (b.population || 0) - (a.population || 0)
      );
    }
  }

  // PAGINATION
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const start = (pageNum - 1) * limitNum;

  res.json({
    total: result.length,
    page: pageNum,
    limit: limitNum,
    data: result.slice(start, start + limitNum)
  });
};

/* ===========================
   GET COUNTRY BY ID
   =========================== */
const getCountryById = (req, res) => {
  const id = Number(req.params.id);
  const country = countries.find(c => c.id === id);

  if (!country) {
    return res.status(404).json({ message: "Country not found" });
  }

  res.json(country);
};

/* ===========================
   GET BY NAME (REST STYLE)
   /api/countries/name/india
   =========================== */
const getCountriesByName = (req, res) => {
  const name = req.params.name.toLowerCase();

  const result = countries.filter(c =>
    c.name.toLowerCase().includes(name)
  );

  if (!result.length) {
    return res.status(404).json({ message: "Country not found" });
  }

  res.json({
    count: result.length,
    data: result
  });
};

/* ===========================
   GET BY REGION
   /api/countries/region/asia
   =========================== */
const getCountriesByRegion = (req, res) => {
  const region = req.params.region.toLowerCase();

  const result = countries.filter(
    c => c.region && c.region.toLowerCase() === region
  );

  if (!result.length) {
    return res.status(404).json({ message: "No countries found in this region" });
  }

  res.json({
    count: result.length,
    data: result
  });
};

/* ===========================
   GET BY CODE
   /api/countries/code/IN
   =========================== */
const getCountryByCode = (req, res) => {
  const code = req.params.code.toLowerCase();

  const country = countries.find(
    c =>
      c.alpha2Code.toLowerCase() === code ||
      c.alpha3Code.toLowerCase() === code
  );

  if (!country) {
    return res.status(404).json({ message: "Country not found" });
  }

  res.json(country);
};

module.exports = {
  getAllCountries,
  getCountryById,
  getCountriesByName,
  getCountriesByRegion,
  getCountryByCode
};
