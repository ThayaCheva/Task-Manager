import React from "react";
import "../styling/taskitem.css";
import { TaskContext } from "../App";
function TaskItem() {
  const {
    tasks,
    setTasks,
    editMode,
    setEditMode,
    selectedTaskRef,
    selectedTask,
    setSelectedTask,
    taskImages,
  } = React.useContext(TaskContext);

  const removeTask = (id) => {
    setEditMode(false);
    const updatedTask = tasks.filter((task) => task.id !== id);
    setTasks(updatedTask);
  };

  const editTask = (id) => {
    setEditMode({ ...editMode, state: !editMode.state, taskID: id });
  };

  React.useEffect(() => {
    if (selectedTaskRef && selectedTaskRef.current) {
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
            <div>
              {t.images.map((i) => (
                <img src={i}></img>
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
