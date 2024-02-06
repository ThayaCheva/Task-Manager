import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import "../styling/taskitem.css";
import { TaskContext } from "../App";
import FileUpload from "./FileUpload.js";
function TaskItem() {
  const { tasks, setTasks, editMode, setEditMode, selectedTask } =
    React.useContext(TaskContext);
  const selectedTaskRef = React.useRef(null);
  const [toggleDropdown, setToggleDropdown] = React.useState({
    state: false,
    id: null,
  });

  const removeTask = (id) => {
    setEditMode(false);
    const updatedTask = tasks.filter((task) => task.id !== id);
    setTasks(updatedTask);
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  const editTask = (id) => {
    setEditMode({ ...editMode, state: true, taskID: id });
  };

  React.useEffect(() => {
    if (selectedTaskRef && selectedTaskRef.current) {
      selectedTaskRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedTaskRef]);

  const handleCheckList = (taskID, subTaskID) => {
    var currSubTask = tasks[taskID].subTasks[subTaskID];
    if (!currSubTask.checked) {
      setTasks((prevTasks) =>
        prevTasks.map((taskItem) =>
          taskItem.id === taskID
            ? {
                ...taskItem,
                subTasks: taskItem.subTasks.map((subTask, index) =>
                  index === subTaskID ? { ...subTask, checked: true } : subTask
                ),
              }
            : taskItem
        )
      );
    } else {
      setTasks((prevTasks) =>
        prevTasks.map((taskItem) =>
          taskItem.id === taskID
            ? {
                ...taskItem,
                subTasks: taskItem.subTasks.map((subTask, index) =>
                  index === subTaskID ? { ...subTask, checked: false } : subTask
                ),
              }
            : taskItem
        )
      );
    }
  };

  const getTaskPercent = (id) => {
    var count = 0;
    if (tasks[id] && tasks[id].subTasks) {
      for (var i = 0; i < tasks[id].subTasks.length; i++) {
        if (tasks[id].subTasks[i].checked) {
          count++;
        }
      }
    }
    if (tasks[id] && tasks[id].subTasks) {
      return Math.floor((count / tasks[id].subTasks.length) * 100);
    } else {
      return 0;
    }
  };

  const handleDropdown = (id) => {
    if (!toggleDropdown.state && toggleDropdown.id === null) {
      setToggleDropdown((prevToggle) => ({ state: !prevToggle.state, id: id }));
    } else if (toggleDropdown.state && toggleDropdown.id !== null) {
      if (toggleDropdown.id === id) {
        setToggleDropdown((prevToggle) => ({
          state: !prevToggle.state,
          id: id,
        }));
      } else {
        setToggleDropdown({ state: true, id: id });
      }
    } else {
      setToggleDropdown((prevToggle) => ({ state: !prevToggle.state, id: id }));
    }
  };

  return (
    <div className="tasks-items">
      <h1 className="header">My Tasks</h1>
      <div className="search-bar">
        <input type="text" placeholder="Search..."></input>
        <button onClick={() => clearAllTasks()}>Clear All Tasks</button>
      </div>

      <div className="tasks-scroll">
        <div className="tasks-items-container">
          {tasks.map((t) => (
            <div
              ref={t.id === selectedTask ? selectedTaskRef : null}
              className="task-item"
            >
              <div>
                <div className="edit-task" onClick={() => handleDropdown(t.id)}>
                  <button>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </button>
                </div>
                {t.id === toggleDropdown.id && toggleDropdown.state && (
                  <div className="task-item-buttons">
                    <button onClick={() => editTask(t.id)}>
                      <FontAwesomeIcon title="Edit Task" icon={faPenToSquare} />
                    </button>

                    <FileUpload taskID={t.id}></FileUpload>

                    <button
                      className="delete-btn"
                      onClick={() => removeTask(t.id)}
                    >
                      <FontAwesomeIcon title="Delete Task" icon={faTrash} />
                    </button>
                  </div>
                )}
                <div className="tasks-item-content">
                  <h1>{t.title}</h1>
                  {t.dueDate && <p className="due-date">Due: {t.dueDate}</p>}
                  <p>{t.desc}</p>
                  {t.subTasks && t.subTasks.length > 0 && (
                    <div className="task-progress">
                      <div className="task-progress-header">
                        <h3>Task Progress</h3>
                        <p>{getTaskPercent(t.id)}%</p>
                      </div>
                      <div className="task-progress-bar">
                        <div
                          style={{ width: `${getTaskPercent(t.id)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <div>
                    {t.subTasks &&
                      t.subTasks.map((st, index) => (
                        <div className="subtask-item">
                          <input
                            onChange={() => handleCheckList(t.id, index)}
                            type="checkbox"
                            checked={t.subTasks[index].checked}
                          />
                          <div>{st.task}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {t.images && <img className="project-img" src={t.images} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
