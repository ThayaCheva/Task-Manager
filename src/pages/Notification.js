import { React, useState, useContext } from "react";
import "../styling/notification.css";
import { differenceInDays, isToday, format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { TaskContext } from "../App.js";

function Notification(props) {
  const { tasks, setAllowNotification } = useContext(TaskContext);
  const [notificationType, setNotificationType] = useState("today");

  const closeNotification = () => {
    setAllowNotification(false);
    props.handleNavClick("Home", false);
  };

  const limitWords = (text) => {
    const newtext = text.length > 15 ? text.substring(0, 15) + "..." : text;
    return newtext;
  };

  const todayTasks = tasks.filter((t) => isToday(t.dueDate));
  const upcomingTasks = tasks.filter(
    (t) =>
      differenceInDays(t.dueDate, new Date()) > 0 &&
      differenceInDays(t.dueDate, new Date()) < 7
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
            <button onClick={() => setNotificationType("today")}>
              Today
              {todayTasks.length > 0 && (
                <div className="notification-count">
                  {todayTasks.length > 10 ? "10+" : todayTasks.length}
                </div>
              )}
            </button>
          </div>
          <div className={notificationType === "upcoming" ? "active" : ""}>
            <button onClick={() => setNotificationType("upcoming")}>
              Upcoming
              {upcomingTasks.length > 0 && (
                <div className="notification-count">
                  {upcomingTasks.length > 10 ? "10+" : upcomingTasks.length}
                </div>
              )}
            </button>
          </div>
          <div className={notificationType === "overdue" ? "active" : ""}>
            <button onClick={() => setNotificationType("overdue")}>
              Overdue
              {overDuedTasks.length > 0 && (
                <div className="notification-count">
                  {overDuedTasks.length > 10 ? "10+" : overDuedTasks.length}
                </div>
              )}
            </button>
          </div>
        </div>
        {notificationType === "today" && (
          <div className="today-tasks">
            {todayTasks.length > 0 ? (
              tasks.map(
                (t) =>
                  isToday(t.dueDate) && (
                    <div className="notification-item">
                      <div className="notification-text">
                        <div
                          className="dot"
                          style={{
                            backgroundColor:
                              t.tags.length > 0
                                ? t.tags[0].tagInfo.tagColor
                                : "#7bd3ea",
                          }}
                        ></div>
                        <span>{limitWords(t.title)}</span>&nbsp;is due TODAY
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
          <div className="upcoming-tasks">
            {upcomingTasks.length > 0 ? (
              tasks.map(
                (t) =>
                  differenceInDays(t.dueDate, new Date()) > 0 &&
                  differenceInDays(t.dueDate, new Date()) < 7 && (
                    <div key={t.id} className="notification-item">
                      <div className="notification-text">
                        <div
                          className="dot"
                          style={{
                            backgroundColor:
                              t.tags.length > 0
                                ? t.tags[0].tagInfo.tagColor
                                : "#7bd3ea",
                          }}
                        ></div>
                        <span>{limitWords(t.title)}</span>&nbsp;is due in{" "}
                        {differenceInDays(t.dueDate, new Date())} days
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
          <div className="overdue-tasks">
            {overDuedTasks.length > 0 ? (
              tasks.map(
                (t) =>
                  differenceInDays(t.dueDate, new Date()) < 0 && (
                    <div key={t.id} className="notification-item">
                      <div className="notification-text">
                        <div
                          className="dot"
                          style={{
                            backgroundColor:
                              t.tags.length > 0
                                ? t.tags[0].tagInfo.tagColor
                                : "#7bd3ea",
                          }}
                        ></div>
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
