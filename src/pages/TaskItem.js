import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { BiAlarm, BiFilter } from "react-icons/bi";
import "../styling/taskitem.css";
import { format } from "date-fns";
import { TaskContext } from "../App";
import FileUpload from "./FileUpload.js";
import TagDropDown from "./TagDropDown.js";
function TaskItem() {
  const { tasks, setTasks, editMode, setEditMode, selectedTask } =
    React.useContext(TaskContext);
  const selectedTaskRef = React.useRef(null);
  const [menuDropdown, setMenuDropdown] = React.useState({
    state: false,
    id: null,
  });
  const [tagDropdown, setTagDropdown] = React.useState({
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
    if (!menuDropdown.state && menuDropdown.id === null) {
      setMenuDropdown((prevToggle) => ({ state: !prevToggle.state, id: id }));
    } else if (menuDropdown.state && menuDropdown.id !== null) {
      if (menuDropdown.id === id) {
        setMenuDropdown((prevToggle) => ({
          state: !prevToggle.state,
          id: id,
        }));
      } else {
        setMenuDropdown({ state: true, id: id });
      }
    } else {
      setMenuDropdown((prevToggle) => ({ state: !prevToggle.state, id: id }));
    }
  };

  return (
    <div className="tasks-items">
      <h1 className="header">My Tasks</h1>
      <div className="search-bar">
        <input type="text" placeholder="Search..."></input>
        <div className="btn-container">
          <button className="btn">
            <BiFilter size={20} />
            Sort By
          </button>
          <button className="btn" onClick={() => clearAllTasks()}>
            Clear All Tasks
          </button>
        </div>
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
                {t.id === menuDropdown.id && menuDropdown.state && (
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
                  <div className="task-item-title">{t.title}</div>
                  {t.dueDate && (
                    <p className="due-date">
                      <BiAlarm className="icon" />
                      Due {format(t.dueDate, "dd MMMM yyyy ")}
                    </p>
                  )}

                  <div className="task-item-tags">
                    <p>Tags: </p>
                    <button
                      onClick={() => setTagDropdown({ state: true, id: t.id })}
                    >
                      +
                    </button>
                    {tagDropdown && tagDropdown.id == t.id && (
                      <TagDropDown
                        setTagDropdown={setTagDropdown}
                      ></TagDropDown>
                    )}
                  </div>

                  <p>{t.desc}</p>

                  {t.subTasks && t.subTasks.length > 0 && (
                    <div className="task-progress">
                      <div className="task-progress-header">
                        <h5>Task Progress</h5>
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
                            key={index}
                            onChange={() => handleCheckList(t.id, index)}
                            type="checkbox"
                            checked={t.subTasks[index].checked}
                          />
                          <p>{st.task}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="project-image-container">
                <div className="project-image-overlay"></div>
                {t.images && <img src={t.images} />}
              </div>
              <button className="done-btn btn" onClick={() => removeTask(t.id)}>
                Mark as done
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
