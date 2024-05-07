const express = require("express");
const {
  getTasks,
  createTask,
  deleteTask,
} = require("../controllers/taskController");
const router = express.Router();

// Get All Tasks
router.get("/", getTasks);

// Get Single Task

// POST new Task
router.post("/", createTask);

// DELETE Task
router.delete("/", deleteTask);

// UPDATE Task

module.exports = router;
