import React from "react";
import TaskList from "./pages/TaskList";
import TaskSummary from "./pages/TaskSummary";
import "./styling/nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBell,
  faListCheck,
  faSliders,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
export const TaskContext = React.createContext();
function App() {
  const [tasks, setTasks] = React.useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [editMode, setEditMode] = React.useState({ state: false, taskID: "" });
  const [selectedTask, setSelectedTask] = React.useState("");
  const [taskImages, setTaskImages] = React.useState([]);

  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <Router>
      <div className="App">
        <div className="navbar">
          <div className="navbar-container">
            <h1>Menu</h1>
            <Link className="nav-item" to="/">
              <FontAwesomeIcon className="icon" icon={faHome} /> Home
            </Link>
            <Link className="nav-item" to="/">
              <FontAwesomeIcon className="icon" icon={faBell} /> Notification
            </Link>
            <Link className="nav-item" to="/summary">
              <FontAwesomeIcon className="icon" icon={faListCheck} /> Summary
            </Link>
          </div>
          <div className="navbar-container">
            <Link className="nav-item" to="/">
              <FontAwesomeIcon className="icon" icon={faSliders} /> Settings
            </Link>
            <Link className="nav-item sign-out" to="/">
              <FontAwesomeIcon className="icon" icon={faSignOut} /> Sign Out
            </Link>
          </div>
        </div>

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
          }}
        >
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/summary" element={<TaskSummary />} />
          </Routes>
        </TaskContext.Provider>
      </div>
    </Router>
  );
}

export default App;
