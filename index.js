// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// require("dotenv").config();
// const connectDB = require("./config/conn");

// // Connect Database
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("susseful!");
// });

// app.use("/api/compiler", require("./routes/compiler"));
// app.use("/api/questions", require("./routes/questions"));
// app.use("/api/testcases", require("./routes/testcases"));
// app.use("/api/v1/auth", require("./routes/authRoute.js"));

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



// **Using import statements (preferred method for modern JavaScript):**

import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

import connectDB from "./config/conn.js"; // Assuming connectDB is an exported function

// Connect Database
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("susseful!");
});

// Import and use routes (assuming routes are exported modules)
import compilerRoutes from "./routes/compiler.js";
import questionsRoutes from "./routes/questions.js";
import testcasesRoutes from "./routes/testcases.js";
// import authRoutes from "./routes/authRoute.js";
import authRoutes from "./routes/authRoute.js"

app.use("/api/compiler", compilerRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/testcases", testcasesRoutes);
app.use("/api/auth", authRoutes); // Assuming authRoute is a default export

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
