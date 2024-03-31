import React, { useState, useContext, useRef } from "react";
import FileUpload from "./FileUpload.js";
import TagDropDown from "./TagDropDown.js";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { BiAlarm } from "react-icons/bi";
import { TaskContext } from "../App.js";

function TaskItem(props) {
  const {
    tasks,
    setTasks,
    editMode,
    setEditMode,
    selectedTask,
    setAllowNotification,
  } = useContext(TaskContext);
  const selectedTaskRef = useRef(null);
  const [tagDropdown, setTagDropdown] = useState({
    state: false,
    id: null,
  });

  const [menuDropdown, setMenuDropdown] = useState({
    state: false,
    id: null,
  });

  // Update the state to edit mode
  const editTask = (id) => {
    setAllowNotification(false);
    setEditMode({ ...editMode, state: true, taskID: id });
  };

  // Remove selected task
  const removeTask = (id) => {
    setEditMode(false);
    const updatedTask = tasks.filter((task) => task.id !== id);
    setTasks(updatedTask);
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

  return (
    <div
      ref={props.task.id === selectedTask ? selectedTaskRef : null}
      className="task-item"
    >
      <div>
        <div
          className="edit-task"
          onClick={() => handleDropdown(props.task.id)}
        >
          <button>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
        {props.task.id === menuDropdown.id && menuDropdown.state && (
          <div className="task-item-buttons">
            <button
              onClick={() => {
                editTask(props.task.id);
                setMenuDropdown(false);
              }}
            >
              <FontAwesomeIcon title="Edit Task" icon={faPenToSquare} />
            </button>

            <FileUpload taskID={props.task.id}></FileUpload>

            <button
              className="delete-btn"
              onClick={() => {
                removeTask(props.task.id);
                setMenuDropdown(false);
              }}
            >
              <FontAwesomeIcon title="Delete Task" icon={faTrash} />
            </button>
          </div>
        )}

        <div className="tasks-item-content">
          <div className="task-item-title">{props.task.title}</div>
          {props.task.dueDate && (
            <p className="due-date">
              <BiAlarm className="icon" />
              Due {format(props.task.dueDate, "dd MMMM yyyy ")}
            </p>
          )}

          <div className="task-item-tags">
            <p>Tags: </p>
            <button
              onClick={() => setTagDropdown({ state: true, id: props.task.id })}
            >
              +
            </button>
            {tagDropdown && tagDropdown.id === props.task.id && (
              <TagDropDown setTagDropdown={setTagDropdown}></TagDropDown>
            )}
          </div>

          <p>{props.task.desc}</p>

          {props.task.subTasks && props.task.subTasks.length > 0 && (
            <div className="task-progress">
              <div className="task-progress-header">
                <h5>Task Progress</h5>
                <p>{getTaskPercent(props.task.id)}%</p>
              </div>
              <div className="task-progress-bar">
                <div
                  style={{ width: `${getTaskPercent(props.task.id)}%` }}
                ></div>
              </div>
            </div>
          )}

          <div>
            {props.task.subTasks &&
              props.task.subTasks.map((st, index) => (
                <div className="subtask-item">
                  <input
                    key={index}
                    onChange={() => handleCheckList(props.task.id, index)}
                    type="checkbox"
                    checked={props.task.subTasks[index].checked}
                  />
                  <p>{st.task}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="project-image-container">
        <div className="project-image-overlay"></div>
        {props.task.images && <img src={props.task.images} />}
      </div>
      <button
        className="done-btn btn"
        onClick={() => removeTask(props.task.id)}
      >
        Mark as done
      </button>
    </div>
  );
}

export default TaskItem;
