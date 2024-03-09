import { React, useState, useContext } from "react";
import "../styling/notification.css";
import { differenceInDays, isToday, format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { TaskContext } from "../App.js";
function Notification() {
  const { tasks, setAllowNotification } = useContext(TaskContext);
  const [notificationType, setNotificationType] = useState("today");
  const closeNotification = () => {
    setAllowNotification(false);
  };
  return (
    <div className="notification">
      <div className="notification-container">
        <div className="notification-header">
          <h1>Notifications</h1>
          <button onClick={() => closeNotification()}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="notification-nav">
          <div className={notificationType === "today" ? "active" : ""}>
            <button onClick={() => setNotificationType("today")}>Today</button>
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
        {notificationType === "today" &&
          tasks.map(
            (t) =>
              isToday(t.dueDate) && (
                <div className="notification-item">
                  <div className="notification-text">
                    <div className="dot"></div>
                    <span>{t.title}</span>&nbsp; is due TODAY
                  </div>
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
                  <div className="notification-text">
                    <div className="dot"></div>
                    <span>{t.title}</span>&nbsp;is due in{" "}
                    {Math.abs(differenceInDays(new Date(), t.dueDate))} days
                  </div>
                  <p>Due: {t.dueDate}</p>
                </div>
              )
          )}
        {notificationType === "overdue" &&
          tasks.map(
            (t) =>
              differenceInDays(t.dueDate, new Date()) < 0 && (
                <div key={t.id} className="notification-item">
                  <div className="notification-text">
                    <div className="dot"></div>
                    <span>{t.title}</span>&nbsp;is dued{" "}
                    {Math.abs(differenceInDays(new Date(), t.dueDate))} days
                  </div>
                  <p>Due: {t.dueDate}</p>
                </div>
              )
          )}
      </div>
    </div>
  );
}

export default Notification;
