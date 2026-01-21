const countries = require("../data.json");

// GET ALL COUNTRIES
const getAllCountries = (req, res) => {
  let result = countries;

  const { region, page = 1, limit = 10, sort } = req.query;

  // 1️⃣ FILTER
  if (region) {
    result = result.filter(
      country => country.region && country.region.toLowerCase() === region.toLowerCase()
    );
  }

  // 2️⃣ SORT
  if (sort) {
    const [field, order = "desc"] = sort.split(":");
    const sortField = field.toLowerCase();

    if (sortField === "name") {
      result.sort((a, b) =>
        order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
    } else if (sortField === "population") {
      result.sort((a, b) =>
        order === "asc" ? (a.population || 0) - (b.population || 0) : (b.population || 0) - (a.population || 0)
      );
    }
  }

  // 3️⃣ PAGINATION
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = startIndex + limitNumber;

  const paginatedData = result.slice(startIndex, endIndex);

  // 4️⃣ RESPONSE
  res.status(200).json({
    total: result.length,
    page: pageNumber,
    limit: limitNumber,
    data: paginatedData
  });
};

// GET COUNTRY BY ID
const getCountryById = (req, res) => {
  const id = Number(req.params.id);
  const country = countries.find(c => c.id === id);

  if (!country) {
    return res.status(404).json({ message: "Country not found" });
  }

  res.status(200).json(country);
};

// SEARCH COUNTRIES
const searchCountries = (req, res) => {
  const { name, code } = req.query;

  if (!name && !code) {
    return res.status(400).json({ message: "Please provide a name or code to search" });
  }

  let result = countries;

  if (name) {
    const lowerName = name.toLowerCase().trim();
    result = result.filter(country =>
      country.name.toLowerCase().includes(lowerName)
    );
  }

  if (code) {
    const lowerCode = code.toLowerCase().trim();
    result = result.filter(country =>
      country.alpha2Code.toLowerCase() === lowerCode ||
      country.alpha3Code.toLowerCase() === lowerCode
    );
  }

  if (!result.length) {
    return res.status(404).json({ message: "Country not found" });
  }

  res.status(200).json({
    count: result.length,
    data: result
  });
};


// ✅ EXPORT ALL CONTROLLERS AT THE END
module.exports = {
  getAllCountries,
  getCountryById,
  searchCountries
};
