import React from "react";
import "../styling/tasklist.css";
import { TaskContext } from "../App";

function TaskForm(props) {
  const { tasks, setTasks, editMode, setEditMode, taskImages } =
    React.useContext(TaskContext);
  const form = React.useRef();
  const [subTask, setSubTask] = React.useState("");

  const [formData, setFormData] = React.useState({
    id: "",
    title: "",
    desc: "",
    dueDate: "",
    subTasks: [],
    images: [],
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
        id: tasks.length + 1,
      },
    ]);
    setFormData({
      id: "",
      title: "",
      desc: "",
      dueDate: "",
      subTasks: [],
      images: [],
    });
    console.log(tasks);
  };
  console.log(tasks);

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
      console.log(mergedSubTasks);
      const updatedForm = {
        ...formData,
        subTasks: mergedSubTasks,
        images: updatedTask[index].images,
      };
      console.log(updatedForm);
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
        images: [],
      });
      setSubTask("");
    }
    setEditMode(false);
  };

  const removeSubTask = (indexToRemove) => {
    if (editMode.state) {
      const updatedSubTasks = tasks[editMode.taskID - 1].subTasks.filter(
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
  };

  React.useEffect(() => {
    if (editMode.state === true) {
      form.current.elements.title.value = tasks[editMode.taskID - 1].title;
      form.current.elements.desc.value = tasks[editMode.taskID - 1].desc;
      form.current.elements.dueDate.value = tasks[editMode.taskID - 1].dueDate;
      setFormData({
        title: tasks[editMode.taskID - 1].title,
        desc: tasks[editMode.taskID - 1].desc,
        dueDate: tasks[editMode.taskID - 1].dueDate,
      });
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
          <label>Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
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
                  <button onClick={() => removeSubTask(index)}>-</button>
                  <p>{st.task}</p>
                </div>
              ))}

            {editMode.state &&
              tasks[editMode.taskID - 1].subTasks.map((st, index) => (
                <div className="subtask-item">
                  <button onClick={() => removeSubTask(index)}>-</button>
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
