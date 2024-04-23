import { React, useContext } from "react";
import "../styling/taskform.css";
import TaskMain from "./TaskMain.js";
import TaskForm from "./TaskForm.js";
import Settings from "./Settings.js";
import Notification from "./Notification.js";
import { TaskContext, NavContext } from "../App.js";

function TaskList() {
  const { editMode, allowNotification, allowSettings } =
    useContext(TaskContext);
  const { handleNavClick } = useContext(NavContext);

  const displayMenu = () => {
    if (allowNotification) {
      return <Notification handleNavClick={handleNavClick} />;
    } else if (allowSettings) {
      return <Settings handleNavClick={handleNavClick} />;
    } else {
      if (editMode.state) {
        return <TaskForm formTitle={"Edit Task"} />;
      } else {
        return <TaskForm formTitle={"Add Task"} />;
      }
    }
  };
  return (
    <section id="tasklist">
      <TaskMain />
      {displayMenu()}
    </section>
  );
}

export default TaskList;
