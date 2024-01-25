import React from "react";
import TaskList from "./pages/TaskList";
import TaskSummary from "./pages/TaskSummary";
import "./styling/nav.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
export const TaskContext = React.createContext();
export const EditModeContext = React.createContext();
export const SelectedTaskContext = React.createContext();

function App() {
  const [tasks, setTasks] = React.useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [editMode, setEditMode] = React.useState({ state: false, taskID: "" });
  const [selectedTask, setSelectedTask] = React.useState("");

  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <Router>
      <div className="App">
        <div className="navbar">
          <h1>Menu</h1>
          <Link className="nav-item" to="/">
            - Home
          </Link>
          <Link className="nav-item" to="/summary">
            - Summary
          </Link>
          <h1>Tasks</h1>
          <p className="nav-item">- Add Tasks</p>
        </div>

        <TaskContext.Provider value={[tasks, setTasks]}>
          <EditModeContext.Provider value={[editMode, setEditMode]}>
            <SelectedTaskContext.Provider
              value={[selectedTask, setSelectedTask]}
            >
              <Routes>
                <Route path="/" element={<TaskList />} />
                <Route path="/summary" element={<TaskSummary />} />
              </Routes>
            </SelectedTaskContext.Provider>
          </EditModeContext.Provider>
        </TaskContext.Provider>
      </div>
    </Router>
  );
}

export default App;
