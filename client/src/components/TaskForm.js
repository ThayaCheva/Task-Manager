import React from "react";
import "../styling/taskform.css";
import { TaskContext } from "../App.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { useTaskContext } from "../hooks/useTaskContext.js";

function TaskForm(props) {
  const { tasks, editMode, setEditMode, setSidePanel, updateTask } =
    React.useContext(TaskContext);
  const { dispatch, update } = useTaskContext();
  const form = React.useRef();
  const [subTask, setSubTask] = React.useState("");

  const [formData, setFormData] = React.useState({
    id: "",
    title: "",
    desc: "",
    dueDate: "",
    subTasks: [],
    images: null,
    tags: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubTaskChange = (event) => {
    setSubTask(event.target.value);
  };

  // Create a new task
  const addTask = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        dispatch({ type: "CREATE_TASKS", payload: json });
        setFormData({
          id: "",
          title: "",
          desc: "",
          dueDate: "",
          subTasks: [],
          images: null,
          tags: [],
        });
      }
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };

  // Edit the selected task
  const editTask = async (event, taskID) => {
    event.preventDefault();
    const index = tasks.findIndex((t) => t._id === taskID);
    if (index !== -1) {
      const updatedTask = [...tasks];

      // Subtasks
      const currentSubTasks = Array.isArray(formData.subTasks)
        ? formData.subTasks
        : [];

      const updatedForm = {
        ...formData,
        subTasks: currentSubTasks,
        images: updatedTask[index].images,
        tags: updatedTask[index].tags,
      };
      setFormData(updatedForm);

      // Update whole task
      updatedTask[index] = {
        ...updatedForm,
        id: taskID,
      };
      try {
        await updateTask(updatedTask[0], taskID);

        // Clear Form
        setFormData({
          id: "",
          title: "",
          desc: "",
          dueDate: "",
          subTasks: [],
          images: null,
          tags: [],
        });
        setSubTask("");
      } catch (error) {
        console.log("Theres been an error", error);
      }
    }
    setEditMode(false);
  };

  // Add a new subtask to the selected task
  const addSubTask = (event) => {
    event.preventDefault();
    const newSubTask = { subTaskName: subTask, checked: false };
    const updatedForm = {
      ...formData,
      subTasks: [...formData.subTasks, newSubTask],
    };
    setFormData(updatedForm);
    setSubTask("");
  };

  // Remove a subtask from the selected task
  const removeSubTask = (indexToRemove) => {
    // Checks if removetask in edit mode or normal mod
    const updatedSubTasks = formData.subTasks.filter(
      (_, index) => index !== indexToRemove
    );
    setFormData((prevForm) => ({ ...prevForm, subTasks: updatedSubTasks }));
  };

  // Sets the form data to the tasks info
  React.useEffect(() => {
    if (editMode.state === true) {
      const currTask = tasks.filter((t) => t._id === editMode.taskID)[0];
      if (currTask) {
        form.current.elements.title.value = currTask.title;
        form.current.elements.desc.value = currTask.desc;
        form.current.elements.dueDate.value = currTask.dueDate;
        setFormData({
          title: currTask.title,
          desc: currTask.desc,
          dueDate: currTask.dueDate,
          subTasks: currTask.subTasks,
          images: [],
          tags: [],
        });
      }
    }
  }, [editMode.state, editMode.taskID, tasks]);

  const closeForm = () => {};
  return (
    <div className="forms">
      <form
        ref={form}
        onSubmit={(event) =>
          editMode.state ? editTask(event, editMode.taskID) : addTask(event)
        }
      >
        <div className="form-header">
          <h1>{props.formTitle}</h1>
          <button onClick={() => closeForm()}>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={(event) => {
                setSidePanel(null);
                event.preventDefault();
              }}
            />
          </button>
        </div>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Insert task title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          id="desc"
          name="desc"
          placeholder="Insert task description"
          value={formData.desc}
          onChange={handleInputChange}
        />
        <div className="due-date">
          <p>Due Date:</p>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate.toString()}
            onChange={handleInputChange}
            min={format(new Date(), "yyyy-MM-dd")}
          />
        </div>
        <div className="btn-container">
          {editMode.state ? (
            <input
              className={`${editMode.state ? "edit-mode" : ""} btn`}
              type="submit"
              value="Edit Task"
            />
          ) : (
            <input
              className={`${editMode.state ? "edit-mode" : ""} btn`}
              type="submit"
              value="Create New Task"
            />
          )}
          {editMode.state && (
            <button
              className={`${editMode.state ? "edit-mode" : ""} btn cancel`}
              onClick={() => {
                setEditMode(false);
                setFormData({
                  id: "",
                  title: "",
                  desc: "",
                  dueDate: "",
                  subTasks: [],
                  images: [],
                  tags: [],
                });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Subtasks */}
      <div className="sub-task">
        <h1>Subtasks</h1>
        <form onSubmit={addSubTask}>
          <input
            type="text"
            id="subTask"
            name="subTask"
            value={subTask}
            onChange={handleSubTaskChange}
            placeholder="Insert new subtask"
            required
          />
          <input
            className={`${editMode.state ? "edit-mode" : ""} btn subtask-btn`}
            type="submit"
            value="+ Add Subtask"
          />

          {/* Display subtasks */}
          <div className="subtask-item-container">
            {formData.subTasks &&
              formData.subTasks.map((st, index) => (
                <div className="subtask-item" key={index}>
                  <button
                    onClick={(event) => {
                      removeSubTask(index);
                      event.preventDefault();
                    }}
                  >
                    -
                  </button>
                  <p>{st.subTaskName}</p>
                </div>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
