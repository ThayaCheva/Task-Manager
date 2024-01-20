import React from 'react'
import TaskList from './pages/TaskList'
import TaskSummary from './pages/TaskSummary'
export const TaskContext = React.createContext();
export const EditModeContext = React.createContext();

function App() {
  const [tasks, setTasks] = React.useState([]);
  const [editMode, setEditMode] = React.useState({state:false, taskID:""});

  return (
    <div className="App">
      <TaskContext.Provider value={[tasks, setTasks]}>
        <EditModeContext.Provider value={[editMode, setEditMode]}>
          <TaskList/>
          {/* <TaskSummary/> */}
        </EditModeContext.Provider>
      </TaskContext.Provider>
    </div>
  );
}

export default App;
