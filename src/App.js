import React from "react";
import TaskList from "./pages/TaskList";
import TaskSummary from "./pages/TaskSummary";
import "./styling/nav.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
export const TaskContext = React.createContext();
export const EditModeContext = React.createContext();
export const SelectedTaskContext = React.createContext();

function App() {
  const [tasks, setTasks] = React.useState([]);
  const [editMode, setEditMode] = React.useState({ state: false, taskID: "" });
  const [selectedTask, setSelectedTask] = React.useState("");

  return (
    <Router>
      <div className="App">
        <div className="navbar">
          <h1>Menu</h1>
          <Link to="/">Home</Link>
          <Link to="/summary">Summary</Link>
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
