import { React, useState, useContext } from "react";
import "../styling/notification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { differenceInDays, isToday, format } from "date-fns";
import { TaskContext } from "../App.js";
function Notification() {
  const { tasks } = useContext(TaskContext);
  const [notificationType, setNotificationType] = useState("due");
  return (
    <div className="notification">
      <div className="notification-container">
        <h1>Notification</h1>
        <div className="notification-nav">
          <div className={notificationType === "due" ? "active" : ""}>
            <button onClick={() => setNotificationType("due")}>Due</button>
          </div>
          <div className={notificationType === "upcoming" ? "active" : ""}>
            <button onClick={() => setNotificationType("upcoming")}>
              Upcoming
            </button>
          </div>
          <div className={notificationType === "overdue" ? "active" : ""}>
            <button onClick={() => setNotificationType("overdue")}>
              Overdue
            </button>
          </div>
        </div>
        {notificationType === "due" &&
          tasks.map(
            (t) =>
              isToday(t.dueDate) && (
                <div className="notification-item">
                  <h2>
                    <span className="red">
                      <div>!</div>
                    </span>
                    Task '{t.title}' is due TODAY
                  </h2>
                  <p>Due: {t.dueDate}</p>
                </div>
              )
          )}
        {notificationType === "upcoming" &&
          tasks.map(
            (t) =>
              Math.abs(differenceInDays(new Date(), t.dueDate)) > 0 &&
              Math.abs(differenceInDays(new Date(), t.dueDate)) < 7 && (
                <div key={t.id} className="notification-item">
                  <h2>
                    <span className="yellow">
                      <div>!</div>
                    </span>
                    {t.title} is due in{" "}
                    {Math.abs(differenceInDays(new Date(), t.dueDate))} days
                  </h2>
                  <p>Due: {t.dueDate}</p>
                </div>
              )
          )}
        {notificationType === "overdue" &&
          tasks.map(
            (t) =>
              differenceInDays(t.dueDate, new Date()) < 0 && (
                <div key={t.id} className="notification-item">
                  <h2>
                    <span className="blue">
                      <div>!</div>
                    </span>
                    {t.title} is dued{" "}
                    {Math.abs(differenceInDays(new Date(), t.dueDate))} days
                  </h2>
                  <p>Due: {t.dueDate}</p>
                </div>
              )
          )}
      </div>
    </div>
  );
}

export default Notification;
