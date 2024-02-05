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
  addMonths,
  setDay,
  subMonths,
} from "date-fns";
import { TaskContext } from "../App";

function TaskSummary() {
  const { tasks, setSelectedTask } = React.useContext(TaskContext);
  const navigate = useNavigate();
  const newTasks = [...tasks];
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

  const currDate = new Date();
  const [selectedMonth, setSelectedMonth] = React.useState({
    selectedMonth: currDate,
    firstDayOfMonth: startOfMonth(currDate),
    lastDayOfMonth: endOfMonth(currDate),
    daysInMonth: eachDayOfInterval({
      start: startOfMonth(currDate),
      end: endOfMonth(currDate),
    }),
    startingDayIndex: getDay(startOfMonth(currDate)),
  });

  const increaseMonth = () => {
    setSelectedMonth((prevSelectedMonth) => ({
      ...prevSelectedMonth,
      selectedMonth: addMonths(prevSelectedMonth.selectedMonth, 1),
      firstDayOfMonth: startOfMonth(
        addMonths(prevSelectedMonth.selectedMonth, 1)
      ),
      lastDayOfMonth: endOfMonth(addMonths(prevSelectedMonth.selectedMonth, 1)),
      daysInMonth: eachDayOfInterval({
        start: startOfMonth(addMonths(prevSelectedMonth.selectedMonth, 1)),
        end: endOfMonth(addMonths(prevSelectedMonth.selectedMonth, 1)),
      }),
      startingDayIndex: getDay(
        startOfMonth(addMonths(prevSelectedMonth.selectedMonth, 1))
      ),
    }));
  };
  const decreaseMonth = () => {
    setSelectedMonth((prevSelectedMonth) => ({
      ...prevSelectedMonth,
      selectedMonth: subMonths(prevSelectedMonth.selectedMonth, 1),
      firstDayOfMonth: startOfMonth(
        subMonths(prevSelectedMonth.selectedMonth, 1)
      ),
      lastDayOfMonth: endOfMonth(subMonths(prevSelectedMonth.selectedMonth, 1)),
      daysInMonth: eachDayOfInterval({
        start: startOfMonth(subMonths(prevSelectedMonth.selectedMonth, 1)),
        end: endOfMonth(subMonths(prevSelectedMonth.selectedMonth, 1)),
      }),
      startingDayIndex: getDay(
        startOfMonth(subMonths(prevSelectedMonth.selectedMonth, 1))
      ),
    }));
  };

  return (
    <section className="task-summary">
      <div className="task-summary-container">
        <div className="tasks-list">
          <div className="calendar-header">
            <div className="calendar-nav">
              <button onClick={() => decreaseMonth()}>{`<`}</button>
              <h1>{format(selectedMonth.selectedMonth, "MMMM yyyy")}</h1>
              <button onClick={() => increaseMonth()}>{`>`}</button>
            </div>
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
          </div>
          <div className="grid">
            {weekdays.map((day) => (
              <div className="border weekdays" key={day}>
                {day}
              </div>
            ))}

            {/* Empty Div */}
            {Array.from({ length: selectedMonth.startingDayIndex }).map(
              (_, index) => {
                return <div className="border" key={index}></div>;
              }
            )}

            {/* Actual Days */}
            {selectedMonth.daysInMonth.map((day, index) => (
              <div
                className={`border ${isToday(day) ? "today" : ""}`}
                key={index + selectedMonth.startingDayIndex}
              >
                <p>{format(day, "d")}</p>
                {/* Map tasks to date */}
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
