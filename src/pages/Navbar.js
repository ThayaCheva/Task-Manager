import { React, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { TaskContext } from "../App.js";
import { NavContext } from "../App.js";
import {
  faSliders,
  faSignOut,
  faHome,
  faBell,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const { currentPage, notificationCount } = useContext(TaskContext);
  const { handleNavClick } = useContext(NavContext);

  return (
    <header>
      <div className="navbar">
        <div className="navbar-container">
          <h1>Task Manager</h1>
          <Link className="link" to="/">
            <div
              onClick={() => handleNavClick("Home")}
              className={
                currentPage === "Home" ? "nav-item-active nav-item" : "nav-item"
              }
            >
              <FontAwesomeIcon className="icon" icon={faHome} /> My Tasks
            </div>
          </Link>
          <Link className="link" to="/">
            <div
              onClick={() => handleNavClick("Notification")}
              className={
                currentPage === "Notification"
                  ? "nav-item-active nav-item"
                  : "nav-item"
              }
            >
              <FontAwesomeIcon className="icon" icon={faBell} />
              Notification
              {notificationCount > 0 && (
                <div className="notification-count">{notificationCount}</div>
              )}
            </div>
          </Link>
          <Link className="link" to="/summary">
            <div
              onClick={() => handleNavClick("Summary")}
              className={
                currentPage === "Summary"
                  ? "nav-item-active nav-item"
                  : "nav-item"
              }
            >
              <FontAwesomeIcon className="icon" icon={faListCheck} /> Summary
            </div>
          </Link>
        </div>
        <div className="navbar-container">
          <Link className="link" to="/">
            <div
              className={
                currentPage === "Settings"
                  ? "nav-item-active nav-item"
                  : "nav-item"
              }
              onClick={() => handleNavClick("Settings")}
            >
              <FontAwesomeIcon className="icon" icon={faSliders} /> Settings
            </div>
          </Link>
          <Link className="link sign-out" to="/">
            <div className="nav-item">
              <FontAwesomeIcon className="icon" icon={faSignOut} /> Sign Out
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
