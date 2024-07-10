const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("susseful!");
});

app.use("/api/compiler", require("./routes/compiler"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
