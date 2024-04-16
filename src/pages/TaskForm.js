import React from "react";
import "../styling/taskform.css";
import { TaskContext } from "../App";
import { nanoid } from "nanoid";
import { format } from "date-fns";

function TaskForm(props) {
  const { tasks, setTasks, editMode, setEditMode } =
    React.useContext(TaskContext);
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

  const addTask = (event) => {
    event.preventDefault();
    setTasks([
      ...tasks,
      {
        ...formData,
        id: nanoid(),
      },
    ]);
    setFormData({
      id: "",
      title: "",
      desc: "",
      dueDate: "",
      subTasks: [],
      images: null,
      tags: [],
    });
  };

  const editTask = (event, taskID) => {
    event.preventDefault();
    const index = tasks.findIndex((t) => t.id === taskID);
    if (index !== -1) {
      const updatedTask = [...tasks];
      // Subtasks
      const currentSubTasks = Array.isArray(formData.subTasks)
        ? formData.subTasks
        : [];

      const mergedSubTasks = Array.from(
        new Set([...currentSubTasks, ...updatedTask[index].subTasks])
      );
      const updatedForm = {
        ...formData,
        subTasks: mergedSubTasks,
        images: updatedTask[index].images,
        tags: updatedTask[index].tags,
      };
      setFormData(updatedForm);

      // Update whole task
      updatedTask[index] = {
        ...updatedForm,
        id: taskID,
      };

      setTasks(updatedTask);
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
    }
    setEditMode(false);
  };

  const addSubTask = (event) => {
    event.preventDefault();
    const currentSubTasks = Array.isArray(formData.subTasks)
      ? formData.subTasks.map((t) => ({ task: t.task, checked: false }))
      : [];
    const newSubTask = { task: subTask, checked: false };
    const updatedForm = {
      ...formData,
      subTasks: [...currentSubTasks, newSubTask],
    };
    setFormData(updatedForm);
    setSubTask("");
  };

  const removeSubTask = (indexToRemove) => {
    // Checks if removetask in edit mode or normal mod
    if (editMode.state) {
      const currTask = tasks.filter((t) => t.id === editMode.taskID)[0];
      if (currTask.subTasks.length > 0) {
        console.log(currTask);
        const updatedSubTasks = currTask.subTasks.filter(
          (_, index) => index !== indexToRemove
        );
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === editMode.taskID
              ? { ...task, subTasks: updatedSubTasks }
              : task
          )
        );
      } else {
        const updatedSubTasks = formData.subTasks.filter(
          (_, index) => index !== indexToRemove
        );
        setFormData((prevForm) => ({ ...prevForm, subTasks: updatedSubTasks }));
      }
    } else {
      const updatedSubTasks = formData.subTasks.filter(
        (_, index) => index !== indexToRemove
      );
      setFormData((prevForm) => ({ ...prevForm, subTasks: updatedSubTasks }));
    }
  };

  React.useEffect(() => {
    if (editMode.state === true) {
      const currTask = tasks.filter((t) => t.id === editMode.taskID)[0];
      if (currTask) {
        form.current.elements.title.value = currTask.title;
        form.current.elements.desc.value = currTask.desc;
        form.current.elements.dueDate.value = currTask.dueDate;
        setFormData({
          title: currTask.title,
          desc: currTask.desc,
          dueDate: currTask.dueDate,
          subTasks: [],
          images: [],
          tags: [],
        });
      }
    }
  }, [editMode.state, editMode.taskID, tasks]);

  return (
    <div className="forms">
      <form
        ref={form}
        onSubmit={(event) =>
          editMode.state ? editTask(event, editMode.taskID) : addTask(event)
        }
      >
        <h1>{props.formTitle}</h1>
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
                  <p>{st.task}</p>
                </div>
              ))}

            {editMode.state &&
              tasks
                .filter((t) => t.id === editMode.taskID)[0]
                .subTasks.map((st, index) => (
                  <div className="subtask-item">
                    <button
                      onClick={(event) => {
                        removeSubTask(index);
                        event.preventDefault();
                      }}
                    >
                      -
                    </button>
                    <p>{st.task}</p>
                  </div>
                ))}
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
