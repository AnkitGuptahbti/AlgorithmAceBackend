// const express = require("express");
// const router = express.Router();
// const TestCase = require("../models/TestCase");
// // Add a new test case
// router.post("/", async (req, res) => {
//   try {
//     const testCase = new TestCase(req.body);
//     await testCase.save();
//     res.status(201).json(testCase);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Get test cases by question ID
// router.get("/:questionId", async (req, res) => {
//   try {
//     const testCases = await TestCase.find({
//       questionId: req.params.questionId,
//     });
//     res.json(testCases);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;


import express from "express";
import TestCase from "../models/TestCase.js";

const router = express.Router();

// Add a new test case
router.post("/", async (req, res) => {
  try {
    const testCase = new TestCase(req.body);
    await testCase.save();
    res.status(201).json(testCase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get test cases by question ID
router.get("/:questionId", async (req, res) => {
  try {
    const testCases = await TestCase.find({
      questionId: req.params.questionId,
    });
    res.json(testCases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
