// const mongoose = require("mongoose");


// const TestCaseSchema = new mongoose.Schema({
//   input: {
//     type: String,
//     required: true,
//   },
//   expectedOutput: {
//     type: String,
//     required: true,
//   },
// });

// const testCaseSchema = new mongoose.Schema({
//   questionId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Question",
//     required: true,
//   },
//   testCases: {
//     type: [TestCaseSchema],
//     required: true,
//   },
// });

// const TestCase = mongoose.model("TestCase", testCaseSchema);

// module.exports = TestCase;


import mongoose from "mongoose";

const TestCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  expectedOutput: {
    type: String,
    required: true,
  },
});

const testCaseSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  testCases: {
    type: [TestCaseSchema],
    required: true,
  },
});

const TestCase = mongoose.model("TestCase", testCaseSchema);

export default TestCase;
