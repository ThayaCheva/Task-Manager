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
  };

  const [tagDropdown, setTagDropdown] = useState({
    state: false,
    id: null,
  });

  const [toggleMenu, setToggleMenu] = useState({
    state: false,
    id: null,
  });

  const handleToggleMenu = (taskID) => {
    setTagDropdown({ state: false, id: taskID });
    if (toggleMenu.id === taskID) {
      setToggleMenu({ state: !toggleMenu.state, id: taskID });
    } else {
      setToggleMenu({ state: true, id: taskID });
    }
  };

  const handleTagDropdown = (taskID) => {
    setToggleMenu({ state: false, id: taskID });
    if (tagDropdown.id === taskID) {
      setTagDropdown({ state: !tagDropdown.state, id: taskID });
    } else {
      setTagDropdown({ state: true, id: taskID });
    }
  };

  const [searchWord, setSearchWord] = useState({ word: "", foundTasks: [] });
  const handleSearchTasks = (event) => {
    const updatedTask = tasks.filter((task) =>
      task.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchWord({ word: event.target.value, foundTasks: updatedTask });
  };

  useEffect(() => {
    const updatedTask = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchWord.word.toLowerCase())
    );
    setSearchWord({ word: searchWord.word, foundTasks: updatedTask });
  }, [tasks]);

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
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearchTasks}
        ></input>
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
        {searchWord.word === ""
          ? tasks.map((t, index) => (
              <TaskItem
                key={index}
                task={t}
                subTask={t.subTasks}
                tagDropdown={tagDropdown}
                handleTagDropdown={handleTagDropdown}
                toggleMenu={toggleMenu}
                handleToggleMenu={handleToggleMenu}
              />
            ))
          : searchWord.foundTasks.map((t, index) => (
              <TaskItem
                key={index}
                task={t}
                subTask={t.subTasks}
                tagDropdown={tagDropdown}
                handleTagDropdown={handleTagDropdown}
                toggleMenu={toggleMenu}
                handleToggleMenu={handleToggleMenu}
              />
            ))}
      </div>
    </div>
  );
}

export default TaskMain;
