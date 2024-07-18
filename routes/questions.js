// const express = require("express");
// const router = express.Router();
// const Question = require("../models/Question");

// // Create a new question
// router.post("/", async (req, res) => {
//   const {
//     title,
//     description,
//     inputFormat,
//     outputFormat,
//     testCases,
//     difficulty,
//     tags,
//   } = req.body;
//   try {
//     const newQuestion = new Question({
//       title,
//       description,
//       inputFormat,
//       outputFormat,
//       testCases,
//       difficulty,
//       tags,
//     });

//     const question = await newQuestion.save();
//     res.json(question);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // Get all questions
// router.get("/", async (req, res) => {
//   try {
//     const questions = await Question.find();
//     res.json(questions);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // Get a question by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const question = await Question.findById(req.params.id);
//     if (!question) {
//       return res.status(404).json({ msg: "Question not found" });
//     }
//     res.json(question);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Question not found" });
//     }
//     res.status(500).send("Server Error");
//   }
// });

// module.exports = router;


import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

// Create a new question
router.post("/", async (req, res) => {
  const {
    title,
    description,
    inputFormat,
    outputFormat,
    testCases,
    difficulty,
    tags,
  } = req.body;
  try {
    const newQuestion = new Question({
      title,
      description,
      inputFormat,
      outputFormat,
      testCases,
      difficulty,
      tags,
    });

    const question = await newQuestion.save();
    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a question by ID
router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ msg: "Question not found" });
    }
    res.json(question);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Question not found" });
    }
    res.status(500).send("Server Error");
  }
});

export default router;
