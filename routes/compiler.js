const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/run", async (req, res) => {
  const { code, language, input } = req.body;

  const options = {
    method: "POST",
    url: "https://online-code-compiler.p.rapidapi.com/v1/",
    headers: {
      "content-type": "application/json",
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "online-code-compiler.p.rapidapi.com",
    },  
    data: {
      language: language,
      version: "latest",
      code: code,
      input: input,
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
