const express = require("express");
const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  deleteAllTasks,
} = require("../controllers/taskController");
const router = express.Router();

// Get All Tasks
router.get("/", getTasks);

// POST new Task
router.post("/", createTask);

// DELETE Task
router.delete("/:id", deleteTask);

// UPDATE Task
router.patch("/:id", updateTask);

// DELETE ALL TASK
router.post("/deleteAllTasks", deleteAllTasks);

module.exports = router;
