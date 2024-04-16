import { React, useContext } from "react";
import "../styling/taskform.css";
import TaskMain from "./TaskMain.js";
import TaskForm from "./TaskForm.js";
import Notification from "./Notification.js";
import { TaskContext, NavContext } from "../App.js";

function TaskList() {
  const { editMode, allowNotification } = useContext(TaskContext);
  const { handleNavClick } = useContext(NavContext);
  return (
    <section id="tasklist">
      <TaskMain />
      {allowNotification ? (
        <Notification handleNavClick={handleNavClick} />
      ) : editMode.state ? (
        <TaskForm formTitle={"Edit Task"} />
      ) : (
        <TaskForm formTitle={"Add Task"} />
      )}
    </section>
  );
}

export default TaskList;
