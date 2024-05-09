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
import { useTaskContext } from "../hooks/useTaskContext.js";

function TaskItem(props) {
  const {
    tasks,
    editMode,
    setEditMode,
    selectedTask,
    setSelectedTask,
    setSidePanel,
    settings,
    updateTask,
  } = useContext(TaskContext);
  const { dispatch } = useTaskContext();
  const selectedTaskRef = useRef(null);

  // Update the state to edit mode
  const editTask = (id) => {
    setSidePanel("Add Task");
    setEditMode({ ...editMode, state: true, taskID: id });
  };

  // Remove selected task
  const removeTask = async (id) => {
    setEditMode(false);
    const response = await fetch("/api/tasks/" + id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_TASKS", payload: json });
    }
  };

  // Get the percentage for the amount of subtask completed
  const getTaskPercent = (taskID) => {
    const currTask = tasks.filter((t) => t._id === taskID)[0];
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
  const handleCheckList = async (taskID, subTaskID) => {
    const updatedTask = [...tasks];
    const index = updatedTask.findIndex((t) => t._id === taskID);
    if (index != -1) {
      updatedTask[index].subTasks[subTaskID].checked =
        !updatedTask[index].subTasks[subTaskID].checked;
      updateTask(updatedTask[index], taskID);
    } else {
      console.log("Task not found", taskID);
    }
  };

  // Dropdown menu for task edit, image and delete
  const TaskDropDown = () => {
    return (
      <div className="task-item-buttons">
        <button
          onClick={() => {
            editTask(props.task._id);
            props.handleToggleMenu(props.task._id);
          }}
        >
          <FontAwesomeIcon title="Edit Task" icon={faPenToSquare} />
        </button>

        <FileUpload taskID={props.task._id}></FileUpload>

        <button
          className="delete-btn"
          onClick={() => {
            removeTask(props.task._id);
            props.handleToggleMenu(props.task._id);
          }}
        >
          <FontAwesomeIcon title="Delete Task" icon={faTrash} />
        </button>
      </div>
    );
  };

  const [highlighted, setHighlighted] = useState(false);
  useEffect(() => {
    if (props.task._id === selectedTask) {
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
  }, [props.task._id, selectedTask]);

  const scrollToHighlighted = () => {
    const highlightedElement = document.querySelector(".highlighted");
    if (highlightedElement) {
      highlightedElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const GridStyle = () => {
    return (
      <div
        ref={props.task._id === selectedTask ? selectedTaskRef : null}
        className={`task-item ${highlighted ? "highlighted" : ""}`}
      >
        <div>
          <div
            className="edit-task"
            onClick={() => props.handleToggleMenu(props.task._id)}
          >
            <button>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
          </div>
          {props.task._id === props.toggleMenu.id && props.toggleMenu.state && (
            <TaskDropDown />
          )}

          <div className="tasks-item-content">
            <div
              className={`task-item-title ${
                settings.style === "list" && "list-tasks"
              }`}
            >
              {props.task.title}
            </div>
            {props.task.dueDate && (
              <p className="due-date">
                <BiAlarm className="icon" />
                {format(props.task.dueDate, "dd MMMM yyyy ")}
              </p>
            )}

            <div className="task-item-tags">
              <div className="task-item-tags-header">
                <p>Tags: </p>
                <button onClick={() => props.handleTagDropdown(props.task._id)}>
                  +
                </button>
                {props.tagDropdown.state &&
                  props.tagDropdown.id === props.task._id && (
                    <TagDropDown
                      taskID={props.task._id}
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
                  <p>{getTaskPercent(props.task._id)}%</p>
                </div>
                <div className="task-progress-bar">
                  <div
                    style={{ width: `${getTaskPercent(props.task._id)}%` }}
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
                      onChange={() => handleCheckList(props.task._id, index)}
                      type="checkbox"
                      checked={props.task.subTasks[index].checked}
                    />
                    <p>{st.subTaskName}</p>
                  </div>
                ))}
              </div>
            )}
            {props.task.images && (
              <div className="project-image-container">
                <img alt="my task" src={props.task.images} />
              </div>
            )}

            <button
              className="done-btn btn"
              onClick={() => removeTask(props.task._id)}
            >
              Mark as done
            </button>
          </div>
        </div>
      </div>
    );
  };
  return <GridStyle />;
}

export default TaskItem;
