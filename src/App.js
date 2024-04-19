import { React, useState, useEffect, createContext } from "react";
import TaskSections from "./pages/TaskList";
import TaskSummary from "./pages/TaskSummary";
import { differenceInDays, isToday } from "date-fns";
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
  const [allowSettings, setAllowSettings] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [currentPage, setCurrentPage] = useState("Home");
  const [settings, setSettings] = useState({
    style: "grid",
    fontSize: 1,
    mode: "light",
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleNavClick = (page, isNotification) => {
    setCurrentPage(page);
    if (page == "Notification") {
      setAllowNotification(true);
      setAllowSettings(false);
    } else if (page == "Settings") {
      setAllowSettings(true);
      setAllowNotification(false);
    } else {
      setAllowSettings(false);
      setAllowNotification(false);
    }
  };

  useEffect(() => {
    const todayTasks = tasks.filter((t) => isToday(t.dueDate));
    const upcomingTasks = tasks.filter(
      (t) =>
        differenceInDays(t.dueDate, new Date()) > 0 &&
        differenceInDays(t.dueDate, new Date()) < 7
    );
    const overDuedTasks = tasks.filter(
      (t) => differenceInDays(t.dueDate, new Date()) < 0
    );

    setNotificationCount(
      todayTasks.length + upcomingTasks.length + overDuedTasks.length
    );
  }, [tasks]);

  return (
    <Router>
      <div className="App">
        <header>
          <div className="navbar">
            <div className="navbar-container">
              <h1>Task Manager</h1>
              <Link className="link" to="/">
                <div
                  onClick={() => handleNavClick("Home", false)}
                  className={
                    currentPage === "Home"
                      ? "nav-item-active nav-item"
                      : "nav-item"
                  }
                >
                  <FontAwesomeIcon className="icon" icon={faHome} /> My Tasks
                </div>
              </Link>
              <Link className="link" to="/">
                <div
                  onClick={() => handleNavClick("Notification", true)}
                  className={
                    currentPage === "Notification"
                      ? "nav-item-active nav-item"
                      : "nav-item"
                  }
                >
                  <FontAwesomeIcon className="icon" icon={faBell} />
                  Notification
                  {notificationCount > 0 && (
                    <div className="notification-count">
                      {notificationCount}
                    </div>
                  )}
                </div>
              </Link>
              <Link className="link" to="/summary">
                <div
                  onClick={() => handleNavClick("Summary", false)}
                  className={
                    currentPage === "Summary"
                      ? "nav-item-active nav-item"
                      : "nav-item"
                  }
                >
                  <FontAwesomeIcon className="icon" icon={faListCheck} />{" "}
                  Summary
                </div>
              </Link>
            </div>
            <div className="navbar-container">
              <Link className="link" to="/">
                <div
                  className={
                    currentPage === "Settings"
                      ? "nav-item-active nav-item"
                      : "nav-item"
                  }
                  onClick={() => handleNavClick("Settings", false)}
                >
                  <FontAwesomeIcon className="icon" icon={faSliders} /> Settings
                </div>
              </Link>
              <Link className="link sign-out" to="/">
                <div className="nav-item">
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
                allowSettings,
                setAllowSettings,
                notificationCount,
                setNotificationCount,
                currentPage,
                setCurrentPage,
                settings,
                setSettings,
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
