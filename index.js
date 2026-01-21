const express = require("express");
const cors = require("cors");
const countriesRoutes = require("./routes/countriesRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/countries", countriesRoutes);

app.get("/", (req, res) => {
  res.send("Countries API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
