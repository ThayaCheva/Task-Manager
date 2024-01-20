import React from "react";
import "../styling/tasklist.css";
import { useNavigate } from "react-router-dom";

import { TaskContext, SelectedTaskContext } from "../App";

function TaskSummary() {
  const [tasks, setTasks] = React.useContext(TaskContext);
  const [selectedTask, setSelectedTask] = React.useContext(SelectedTaskContext);

  const navigate = useNavigate();
  const newTasks = [...tasks];
  const GetSubtaskAmount = () => {
    var count = 0;
    for (var i = 0; i < tasks.length; i++) {
      for (var j = 0; j < tasks[i].subTasks.length; j++) {
        count++;
      }
    }
    return count;
  };

  const handleTaskClick = (id) => {
    setSelectedTask(id);
    navigate("/");
  };

  return (
    <section className="task-summary">
      <h1>TaskSummary</h1>
      <div className="task-summary-container">
        <h2>Number of Tasks: {tasks.length}</h2>
        <h2>
          Number of Subtasks:
          <GetSubtaskAmount />
        </h2>
        <h2>Task List: </h2>
        {newTasks
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
          .map((t) => (
            <p
              onClick={() => handleTaskClick(t.id)}
              className="summary-task-item"
            >
              Title: <span>{t.title}</span> | Due Date: {t.dueDate}
            </p>
          ))}
      </div>
    </section>
  );
}

export default TaskSummary;
