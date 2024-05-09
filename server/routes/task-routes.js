const express = require("express");
const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");
const router = express.Router();

// Get All Tasks
router.get("/", getTasks);

// Get Single Task

// POST new Task
router.post("/", createTask);

// DELETE Task
router.delete("/:id", deleteTask);

// UPDATE Task
router.patch("/:id", updateTask);

module.exports = router;
