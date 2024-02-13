import React from "react";
import "../styling/tasklist.css";
import TaskItem from "./TaskItem.js";
import TaskForm from "./TaskForm.js";
import Notification from "./Notification.js";
import { TaskContext } from "../App";

function TaskList() {
  const { editMode, allowNotification } = React.useContext(TaskContext);
  console.log(allowNotification);
  return (
    <section id="tasklist">
      <TaskItem />
      {allowNotification ? (
        <Notification />
      ) : editMode.state ? (
        <TaskForm formTitle={"Edit Task:"} />
      ) : (
        <TaskForm formTitle={"Add Task:"} />
      )}
    </section>
  );
}

export default TaskList;
