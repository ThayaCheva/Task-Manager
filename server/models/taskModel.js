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
  tagChecked: {
    type: Boolean,
    default: false,
  },
  tagInfo: {
    tagName: {
      type: String,
      required: true,
    },
    tagColor: {
      type: String,
      required: true,
    },
  },
});

const taskSchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: {
      type: String,
      required: true,
    },
    desc: String,
    dueDate: String,
    subTasks: [subTaskSchema],
    images: String,
    tags: [tagSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
