const express = require("express");
const cors = require("cors"); // ✅ ADD HERE
const countriesRoutes = require("./routes/countriesRoutes");

const app = express();
const PORT = process.env.PORT || 3000; // ✅ FIXED

// ✅ MIDDLEWARES (TOP)
app.use(cors());          // 👈 HERE
app.use(express.json());

// ✅ ROUTES
app.use("/api/countries", countriesRoutes);

app.get("/", (req, res) => {
  res.send("Countries API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
