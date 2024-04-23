import { React, useState, useEffect, createContext } from "react";
import TaskSummary from "./pages/TaskSummary";
import TaskMain from "./pages/TaskMain.js";
import TaskForm from "./pages/TaskForm.js";
import Settings from "./pages/Settings.js";
import Navbar from "./pages/Navbar.js";
import Notification from "./pages/Notification.js";
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
    fontSize: 100,
    mode: "light",
  });
  const [allowConfirmDialog, setAllowConfirmDialog] = useState({
    type: null,
    state: false,
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1200) {
        setSettings({ ...settings, style: "list" });
      } else {
        setSettings({ ...settings, style: "grid" });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  const handleNavClick = (page) => {
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

  const TaskSections = () => {
    return (
      <section id="tasklist">
        <Navbar handleNavClick={handleNavClick} />
        <TaskMain />
        {displayMenu()}
      </section>
    );
  };

  return (
    <Router>
      <div className="App">
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
                allowConfirmDialog,
                setAllowConfirmDialog,
                handleNavClick,
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
