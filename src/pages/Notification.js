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

  const limitWords = (text) => {
    const newtext = text.length > 15 ? text.substring(0, 15) + "..." : text;
    return newtext;
  };
  const todayTasks = tasks.filter((t) => isToday(t.dueDate));
  const upcomingTasks = tasks.filter(
    (t) =>
      Math.abs(differenceInDays(new Date(), t.dueDate)) > 0 &&
      Math.abs(differenceInDays(new Date(), t.dueDate)) < 7
  );
  const overDuedTasks = tasks.filter(
    (t) => differenceInDays(t.dueDate, new Date()) < 0
  );
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
        {notificationType === "today" && (
          <div>
            {todayTasks.length > 0 ? (
              tasks.map(
                (t) =>
                  isToday(t.dueDate) && (
                    <div className="notification-item">
                      <div className="notification-text">
                        <div className="dot"></div>
                        <span>{limitWords(t.title)}</span>&nbsp; is due TODAY
                      </div>
                      <p>Due {format(t.dueDate, "dd MMMM yyyy")}</p>
                    </div>
                  )
              )
            ) : (
              <div className="notification-item">Nothing due today</div>
            )}
          </div>
        )}
        {notificationType === "upcoming" && (
          <div>
            {upcomingTasks.length > 0 ? (
              tasks.map(
                (t) =>
                  Math.abs(differenceInDays(new Date(), t.dueDate)) > 0 &&
                  Math.abs(differenceInDays(new Date(), t.dueDate)) < 7 && (
                    <div key={t.id} className="notification-item">
                      <div className="notification-text">
                        <div className="dot"></div>
                        <span>{limitWords(t.title)}</span>&nbsp;is due in{" "}
                        {Math.abs(differenceInDays(new Date(), t.dueDate))} days
                      </div>
                      <p>Due {format(t.dueDate, "dd MMMM yyyy")}</p>
                    </div>
                  )
              )
            ) : (
              <div className="notification-item">Nothing upcoming</div>
            )}
          </div>
        )}
        {notificationType === "overdue" && (
          <div>
            {overDuedTasks.length > 0 ? (
              tasks.map(
                (t) =>
                  differenceInDays(t.dueDate, new Date()) < 0 && (
                    <div key={t.id} className="notification-item">
                      <div className="notification-text">
                        <div className="dot"></div>
                        <span>{limitWords(t.title)}</span>&nbsp;was due{" "}
                        {Math.abs(differenceInDays(new Date(), t.dueDate))} days
                        ago
                      </div>
                      <p>Dued {format(t.dueDate, "dd MMMM yyyy")}</p>
                    </div>
                  )
              )
            ) : (
              <div className="notification-item">Nothing overdued</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notification;
