import { React, useState, useContext, useRef, useEffect } from "react";

import { BiFilter } from "react-icons/bi";
import "../styling/taskmain.css";
import { TaskContext } from "../App.js";
import TaskItem from "../pages/TaskItem.js";
import ConfirmDialog from "../pages/ConfirmDialog.js";

function TaskMain() {
  const {
    tasks,
    setTasks,
    settings,
    allowConfirmDialog,
    setAllowConfirmDialog,
  } = useContext(TaskContext);
  const selectedTaskRef = useRef(null);

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
  console.log(allowConfirmDialog);
  return (
    <div className="tasks-items">
      {allowConfirmDialog.state && allowConfirmDialog.type === "clear-task" && (
        <ConfirmDialog
          title={"Clear all tasks?"}
          desc={"Are you sure you want to clear all tasks?"}
          functionToCall={() =>
            setAllowConfirmDialog({ type: "clear-task", state: false })
          }
        />
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
          <button
            className="btn"
            onClick={() =>
              setAllowConfirmDialog({ type: "clear-task", state: true })
            }
          >
            Clear All Tasks
          </button>
        </div>
      </div>

      <div className={`tasks-items-container ${settings.style}`}>
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
