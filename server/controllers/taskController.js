const { default: mongoose } = require("mongoose");
const Task = require("../models/taskModel");

// Get All Tasks
const getTasks = async (req, res) => {
  const tasks = await Task.find({}).sort({ createdAt: -1 });
  res.json(tasks);
};

// Get Single Task

// POST new Task
const createTask = async (req, res) => {
  const { title, desc, dueDate, subTasks, images, tags } = req.body;
  try {
    const task = await Task.create({
      title,
      desc,
      dueDate,
      subTasks,
      images,
      tags,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE Task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({ error: "No task with such ID" });
    }
    const task = await Task.findOneAndDelete({ _id: id });
    if (!task) {
      return res.status(400).json({ error: "No task with such ID" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: "No task with such ID" });
  }
};

// UPDATE Task
const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(404).json({ error: "No task with such ID" });
    }
    const task = await Task.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    if (!task) {
      return res.status(404).json({ error: "No task with such ID" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: "No task with such ID" });
  }
};

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
};
