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

  // Remove selected task
  const removeTask = (id) => {
    setEditMode(false);
    const updatedTask = tasks.filter((task) => task.id !== id);
    setTasks(updatedTask);
  };

  // Remove all tasks
  const clearAllTasks = () => {
    setTasks([]);
    localStorage.clear();
  };

  // Update the state to edit mode
  const editTask = (id) => {
    setEditMode({ ...editMode, state: true, taskID: id });
  };

  // Clicking a task in summary will scroll to the selected task in home
  React.useEffect(() => {
    if (selectedTaskRef && selectedTaskRef.current) {
      selectedTaskRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedTaskRef]);

  // Manage CheckList for subtasks and when clicked update task progress bar
  const handleCheckList = (taskID, subTaskID) => {
    var currSubTask = tasks.filter((t) => t.id === taskID)[0].subTasks[
      subTaskID
    ];
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

  // Get the percentage for the amount of subtask completed
  const getTaskPercent = (taskID) => {
    const currTask = tasks.filter((t) => t.id === taskID)[0];
    console.log(currTask);
    var count = 0;
    if (currTask && currTask.subTasks) {
      for (var i = 0; i < currTask.subTasks.length; i++) {
        if (currTask.subTasks[i].checked) {
          count++;
        }
      }
    }
    if (currTask && currTask.subTasks) {
      return Math.floor((count / currTask.subTasks.length) * 100);
    } else {
      return 0;
    }
  };

  // Toggle dropdown list (settings menu dropdown)
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
