import React from "react";
import "../styling/tasklist.css";
import TaskItem from "./TaskItem.js";
import TaskForm from "./TaskForm.js";
import { TaskContext } from "../App";

function TaskList(props) {
  const { editMode, setEditMode } = React.useContext(TaskContext);
  return (
    <section id="tasklist">
      <TaskItem />
      {editMode.state ? (
        <TaskForm formTitle={"Edit Task:"} />
      ) : (
        <TaskForm formTitle={"Add Task:"} />
      )}
    </section>
  );
}

export default TaskList;
