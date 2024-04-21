import React, { useContext, useRef, useState, useEffect } from "react";
import FileUpload from "./FileUpload.js";
import TagDropDown from "./TagDropDown.js";
import "../styling/taskitem.css";
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
    setSelectedTask,
    setAllowNotification,
    setAllowSettings,
    settings,
  } = useContext(TaskContext);

  const selectedTaskRef = useRef(null);

  // Update the state to edit mode
  const editTask = (id) => {
    setAllowNotification(false);
    setAllowSettings(false);
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

  // Dropdown menu for task edit, image and delete
  const TaskDropDown = () => {
    return (
      <div className="task-item-buttons">
        <button
          onClick={() => {
            editTask(props.task.id);
            props.handleToggleMenu(props.task.id);
          }}
        >
          <FontAwesomeIcon title="Edit Task" icon={faPenToSquare} />
        </button>

        <FileUpload taskID={props.task.id}></FileUpload>

        <button
          className="delete-btn"
          onClick={() => {
            removeTask(props.task.id);
            props.handleToggleMenu(props.task.id);
          }}
        >
          <FontAwesomeIcon title="Delete Task" icon={faTrash} />
        </button>
      </div>
    );
  };

  const [highlighted, setHighlighted] = useState(false);
  useEffect(() => {
    if (props.task.id === selectedTask) {
      setHighlighted(true);
      const timerScroll = setTimeout(() => {
        scrollToHighlighted();
      }, 100);
      const timer = setTimeout(() => {
        setHighlighted(false);
        setSelectedTask(null);
      }, 1000);
      return () => {
        clearTimeout(timer);
        clearTimeout(timerScroll);
      };
    }
  }, [props.task.id, selectedTask]);

  const scrollToHighlighted = () => {
    const highlightedElement = document.querySelector(".highlighted");
    if (highlightedElement) {
      highlightedElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={props.task.id === selectedTask ? selectedTaskRef : null}
      className={`task-item ${highlighted ? "highlighted" : ""}`}
    >
      <div>
        <div
          className="edit-task"
          onClick={() => props.handleToggleMenu(props.task.id)}
        >
          <button>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
        {props.task.id === props.toggleMenu.id && props.toggleMenu.state && (
          <TaskDropDown />
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
            <div className="task-item-tags-header">
              <p>Tags: </p>
              <button onClick={() => props.handleTagDropdown(props.task.id)}>
                +
              </button>
              {props.tagDropdown.state &&
                props.tagDropdown.id === props.task.id && (
                  <TagDropDown
                    taskID={props.task.id}
                    handleTagDropdown={props.handleTagDropdown}
                  ></TagDropDown>
                )}
            </div>
            {props.task.tags && (
              <div className="task-tags">
                {props.task.tags.map((t, index) => (
                  <div
                    key={index}
                    style={{ backgroundColor: t.tagInfo.tagColor }}
                  >
                    {t.tagInfo.tagName}
                  </div>
                ))}
              </div>
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

          {props.task.subTasks && (
            <div>
              {props.task.subTasks.map((st, index) => (
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
          )}
          {props.task.images && (
            <div className="project-image-container">
              <div className="project-image-overlay"></div>
              <img alt="my task" src={props.task.images} />
            </div>
          )}
          <button
            className="done-btn btn"
            onClick={() => removeTask(props.task.id)}
          >
            Mark as done
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
