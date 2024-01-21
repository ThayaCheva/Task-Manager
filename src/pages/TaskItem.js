import React from "react";
import "../styling/tasklist.css";
import { TaskContext, EditModeContext, SelectedTaskContext } from "../App";
function TaskItem() {
  const [tasks, setTasks] = React.useContext(TaskContext);
  const [editMode, setEditMode] = React.useContext(EditModeContext);
  const selectedTaskRef = React.useRef(null);
  const [selectedTask, setSelectedTask] = React.useContext(SelectedTaskContext);

  const removeTask = (id) => {
    setEditMode(false);
    const updatedTask = tasks.filter((task) => task.id !== id);
    setTasks(updatedTask);
  };

  const editTask = (id) => {
    setEditMode({ ...editMode, state: !editMode.state, taskID: id });
  };

  React.useEffect(() => {
    if (selectedTaskRef.current) {
      selectedTaskRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="tasks-items">
      <h1 className="header">My Tasks</h1>
      <div className="tasks-items-container">
        {tasks.map((t) => (
          <div
            ref={t.id === selectedTask ? selectedTaskRef : null}
            className="task-item"
          >
            <button className="delete-btn" onClick={() => removeTask(t.id)}>
              X
            </button>
            <div className="tasks-item-title">
              <h1>{t.title}</h1>
              <p>| 📆 {t.dueDate}</p>
            </div>
            <p>{t.desc}</p>
            <div>
              {t.subTasks &&
                t.subTasks.map((st) => (
                  <div className="subtask-item">
                    <input type="checkbox"></input>
                    <div>{st}</div>
                  </div>
                ))}
            </div>
            <div className="task-item-buttons">
              <button onClick={() => editTask(t.id)}>EDIT</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskItem;
