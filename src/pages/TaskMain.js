import { React, useState, useContext, useRef, useEffect } from "react";

import { BiFilter } from "react-icons/bi";
import "../styling/taskmain.css";
import { TaskContext } from "../App.js";
import TaskItem from "../pages/TaskItem.js";

function TaskMain() {
  const { tasks, setTasks } = useContext(TaskContext);
  const selectedTaskRef = useRef(null);
  const [openClearMenu, setOpenClearMenu] = useState(false);

  // Remove all tasks
  const clearAllTasks = () => {
    setTasks([]);
    localStorage.clear();
  };

  // Clicking a task in summary will scroll to the selected task in home
  useEffect(() => {
    if (selectedTaskRef && selectedTaskRef.current) {
      selectedTaskRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedTaskRef]);

  return (
    <div className="tasks-items">
      {openClearMenu && (
        <div className="confirm-menu">
          <div className="confirm-menu-container">
            <h1>Clear all tasks?</h1>
            <p>Are you sure you want to clear all tasks?</p>
            <div className="confirm-menu-buttons">
              <button
                className="btn"
                onClick={() => {
                  clearAllTasks();
                  setOpenClearMenu(false);
                }}
              >
                Confirm
              </button>
              <button className="btn" onClick={() => setOpenClearMenu(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="header">My Tasks</h1>

      <div className="search-bar">
        <input type="text" placeholder="Search..."></input>
        <div className="btn-container">
          <button className="btn">
            <BiFilter size={20} />
            Sort By
          </button>
          <button className="btn" onClick={() => setOpenClearMenu(true)}>
            Clear All Tasks
          </button>
        </div>
      </div>

      <div className="tasks-items-container">
        {tasks.map((t, index) => (
          <TaskItem key={index} task={t} subTask={t.subTasks} />
        ))}
      </div>
    </div>
  );
}

export default TaskMain;
