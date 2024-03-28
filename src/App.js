import { React, useState, useEffect, createContext } from "react";
import TaskSections from "./pages/TaskList";
import TaskSummary from "./pages/TaskSummary";
import "./styling/nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSliders,
  faSignOut,
  faHome,
  faBell,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
export const TaskContext = createContext();
export const NavContext = createContext();

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [editMode, setEditMode] = useState({ state: false, taskID: "" });
  const [selectedTask, setSelectedTask] = useState("");
  const [taskImages, setTaskImages] = useState([]);
  const [allowNotification, setAllowNotification] = useState(false);
  const [currentPage, setCurrentPage] = useState("Home");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleNavClick = (page, isNotification) => {
    setCurrentPage(page);
    if (isNotification) {
      setAllowNotification(true);
    } else {
      setAllowNotification(false);
    }
  };
  return (
    <Router>
      <div className="App">
        <header>
          <div className="navbar">
            <div className="navbar-container">
              <h1>TaskUp</h1>
              <Link className="nav-item" to="/">
                <div
                  onClick={() => handleNavClick("Home", false)}
                  className={currentPage === "Home" ? "nav-item-active" : ""}
                >
                  <FontAwesomeIcon className="icon" icon={faHome} /> My Tasks
                </div>
              </Link>
              <Link className="nav-item" to="/">
                <div
                  onClick={() => handleNavClick("Notification", true)}
                  className={
                    currentPage === "Notification" ? "nav-item-active" : ""
                  }
                >
                  <FontAwesomeIcon className="icon" icon={faBell} />
                  Notification
                </div>
              </Link>
              <Link className="nav-item" to="/summary">
                <div
                  onClick={() => handleNavClick("Summary", false)}
                  className={currentPage === "Summary" ? "nav-item-active" : ""}
                >
                  <FontAwesomeIcon className="icon" icon={faListCheck} />{" "}
                  Summary
                </div>
              </Link>
            </div>
            <div className="navbar-container">
              <Link className="nav-item" to="/">
                <div>
                  <FontAwesomeIcon className="icon" icon={faSliders} /> Settings
                </div>
              </Link>
              <Link className="nav-item sign-out" to="/">
                <div>
                  <FontAwesomeIcon className="icon" icon={faSignOut} /> Sign Out
                </div>
              </Link>
            </div>
          </div>
        </header>

        <main>
          <NavContext.Provider value={{ handleNavClick }}>
            <TaskContext.Provider
              value={{
                tasks,
                setTasks,
                editMode,
                setEditMode,
                selectedTask,
                setSelectedTask,
                taskImages,
                setTaskImages,
                allowNotification,
                setAllowNotification,
              }}
            >
              <Routes>
                <Route path="/" element={<TaskSections />} />
                <Route path="/summary" element={<TaskSummary />} />
              </Routes>
            </TaskContext.Provider>
          </NavContext.Provider>
        </main>
      </div>
    </Router>
  );
}

export default App;
