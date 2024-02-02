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

  const editTask = (id) => {
    setEditMode({ ...editMode, state: true, taskID: id });
  };

  React.useEffect(() => {
    if (selectedTaskRef && selectedTaskRef.current) {
      selectedTaskRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedTaskRef]);

  console.log(tasks);
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

  const clearAllTasks = () => {
    setTasks([]);
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
                  <FontAwesomeIcon icon={faEllipsisVertical} />
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
                  <div>
                    {t.subTasks &&
                      t.subTasks.map((st) => (
                        <div className="subtask-item">
                          <input type="checkbox"></input>
                          <div>{st}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {t.images &&
                t.images.length > 0 &&
                t.images.map((pic) => {
                  return <img className="project-img" src={pic} />;
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
