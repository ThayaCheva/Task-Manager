import { React, useState, useEffect, createContext } from "react";
import TaskSummary from "./pages/TaskSummary";
import TaskMain from "./pages/TaskMain.js";
import TaskForm from "./pages/TaskForm.js";
import Settings from "./pages/Settings.js";
import Navbar from "./pages/Navbar.js";
import Notification from "./pages/Notification.js";
import { differenceInDays, isToday } from "date-fns";
import "./styling/nav.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTaskContext } from "./hooks/useTaskContext.js";
export const TaskContext = createContext();
export const NavContext = createContext();

function App() {
  const { tasks, dispatch } = useTaskContext();
  const [editMode, setEditMode] = useState({ state: false, taskID: "" });
  const [selectedTask, setSelectedTask] = useState("");
  const [taskImages, setTaskImages] = useState([]);
  const [sidePanel, setSidePanel] = useState(null);
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

  // Retrieve tasks data from db
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks");
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_TASKS", payload: json });
      }
    };
    fetchTasks();
  }, []);

  // Make website respond to different screen size
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1200) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  // Get the notification count
  useEffect(() => {
    if (tasks) {
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
    }
  }, [tasks]);

  // Manage navigation bar clicks
  const handleNavClick = (page) => {
    setCurrentPage(page);
    if (page === "Notification") {
      setSidePanel("Notification");
    } else if (page === "Settings") {
      setSidePanel("Settings");
    } else {
      setSidePanel(null);
    }
  };

  // Manage which side menu to display (Notification, Settings or Task Form)
  const displayMenu = () => {
    if (sidePanel === "Notification") {
      return <Notification handleNavClick={handleNavClick} />;
    } else if (sidePanel === "Settings") {
      return <Settings handleNavClick={handleNavClick} />;
    } else if (sidePanel === "Add Task") {
      if (editMode.state) {
        return <TaskForm formTitle={"Edit Task"} />;
      } else {
        return <TaskForm formTitle={"Add Task"} />;
      }
    }
  };

  // Manage the order of the display
  const TaskSections = () => {
    return !isMobile ? (
      <section id="tasklist">
        <Navbar handleNavClick={handleNavClick} />
        <TaskMain />
        {displayMenu()}
      </section>
    ) : (
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
          <NavContext.Provider value={{ handleNavClick, isMobile }}>
            {tasks && (
              <TaskContext.Provider
                t
                value={{
                  tasks,
                  editMode,
                  setEditMode,
                  selectedTask,
                  setSelectedTask,
                  taskImages,
                  setTaskImages,
                  notificationCount,
                  setNotificationCount,
                  currentPage,
                  setCurrentPage,
                  settings,
                  setSettings,
                  allowConfirmDialog,
                  setAllowConfirmDialog,
                  sidePanel,
                  setSidePanel,
                }}
              >
                <Routes>
                  <Route path="/" element={<TaskSections />} />
                  <Route path="/summary" element={<TaskSummary />} />
                </Routes>
              </TaskContext.Provider>
            )}
          </NavContext.Provider>
        </main>
      </div>
    </Router>
  );
}

export default App;
