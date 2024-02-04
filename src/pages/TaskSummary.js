import React from "react";
import "../styling/tasksummary.css";
import { useNavigate } from "react-router-dom";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDate,
  getDay,
  getMonth,
  isSameDay,
  isToday,
  startOfMonth,
} from "date-fns";
import { TaskContext } from "../App";

function TaskSummary() {
  const { tasks, setSelectedTask } = React.useContext(TaskContext);
  const navigate = useNavigate();
  const newTasks = [...tasks];
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currDate = new Date();
  const firstDayOfMonth = startOfMonth(currDate);
  const lastDayOfMonth = endOfMonth(currDate);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });
  const startingDayIndex = getDay(firstDayOfMonth);

  const GetSubtaskAmount = () => {
    var count = 0;
    if (tasks) {
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i] && tasks[i].subTasks) {
          for (var j = 0; j < tasks[i].subTasks.length; j++) {
            count++;
          }
        }
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
        <div className="tasks-stats">
          <div className="tasks-stats-item">
            <p>Number of Tasks: {tasks.length}</p>
          </div>
          <div className="tasks-stats-item">
            <p>
              Number of Subtasks: <GetSubtaskAmount />
            </p>
          </div>
        </div>
        <div className="tasks-list">
          <h1>{format(currDate, "MMMM yyyy")}</h1>
          <div className="grid">
            {weekdays.map((day) => (
              <div className="border weekdays" key={day}>
                {day}
              </div>
            ))}

            {Array.from({ length: startingDayIndex }).map((_, index) => {
              return <div className="border" key={index}></div>;
            })}

            {daysInMonth.map((day, index) => (
              <div
                className={`border ${isToday(day) ? "today" : ""}`}
                key={index + startingDayIndex}
              >
                <p>{format(day, "d")}</p>
                {newTasks
                  .filter((task) => isSameDay(task.dueDate, day))
                  .map((task, taskIndex) => (
                    <div
                      onClick={() => handleTaskClick(task.id)}
                      className="summary-task-item"
                      key={taskIndex}
                    >
                      <h2>{task.title}</h2>
                      <p>{task.dueDate}</p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TaskSummary;
