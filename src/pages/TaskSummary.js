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
      <h1>Task Summary</h1>
      <div className="task-summary-container">
        <div className="tasks-list">
          <h2>List of tasks: </h2>
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
        <div className="tasks-stats">
          <div className="tasks-stats-item">
            <h1>Number of Tasks:</h1>
            <h2>{tasks.length}</h2>
          </div>
          <div className="tasks-stats-item">
            <h1>Number of Subtasks:</h1>
            <h2>
              <GetSubtaskAmount />
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TaskSummary;
