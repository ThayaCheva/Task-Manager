const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subTaskSchema = new Schema({
  subTaskName: String,
  checked: {
    type: Boolean,
    default: false,
  },
});

const tagSchema = new Schema({
  name: String,
  color: String,
});

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: String,
    dueDate: String,
    subTasks: [subTaskSchema],
    images: [String],
    tags: [tagSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
