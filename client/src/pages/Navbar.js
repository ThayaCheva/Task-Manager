import { React, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../App.js";
import { NavContext } from "../App.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLogout } from "../hooks/useLogout.js";
import { useAuthContext } from "../hooks/useAuthContext.js";
import {
  faSliders,
  faSignOut,
  faHome,
  faBell,
  faCalendar,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
export default function Navbar() {
  const { currentPage, notificationCount } = useContext(TaskContext);
  const { handleNavClick, isMobile } = useContext(NavContext);
  const [isHidden, setIsHidden] = useState(true);
  const { user } = useAuthContext();
  const logout = useLogout();
  useEffect(() => {
    if (isMobile) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [isMobile]);

  const UserNavbar = () => {
    return (
      <div className="navbar">
        {isMobile && <h1 className="navbar-header">TM</h1>}
        <div className="navbar-container">
          {!isMobile && <h1 className="navbar-header">Task Manager</h1>}
          <Link className="link" to="/">
            <div
              onClick={() => handleNavClick("Home")}
              className={
                currentPage === "Home" ? "nav-item-active nav-item" : "nav-item"
              }
            >
              <FontAwesomeIcon className="icon" icon={faHome} />{" "}
              <div className="nav-item-name">My Tasks</div>
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
              <div className="notification-icon">
                <FontAwesomeIcon className="icon" icon={faBell} />
                {notificationCount > 0 && (
                  <div className="notification-light"></div>
                )}
              </div>
              <div className="nav-item-name">Notification</div>
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
              <FontAwesomeIcon className="icon" icon={faCalendar} />{" "}
              <div className="nav-item-name">Summary</div>
            </div>
          </Link>
          {isMobile && (
            <Link className="link" to="/">
              <div
                className={
                  currentPage === "Settings"
                    ? "nav-item-active nav-item"
                    : "nav-item"
                }
                onClick={() => handleNavClick("Settings")}
              >
                <FontAwesomeIcon className="icon" icon={faSliders} />{" "}
                <div className="nav-item-name">Settings</div>
              </div>
            </Link>
          )}
          {isMobile && (
            <Link className="link sign-out" to="/">
              <div className="nav-item">
                <FontAwesomeIcon className="icon" icon={faSignOut} />
                <div className="nav-item-name">Sign Out</div>
              </div>
            </Link>
          )}
        </div>

        {!isMobile && (
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
              <div
                className="nav-item"
                onClick={() => {
                  logout();
                }}
              >
                <FontAwesomeIcon className="icon" icon={faSignOut} /> Sign Out
              </div>
            </Link>
          </div>
        )}
      </div>
    );
  };

  const NoUserNavbar = () => {
    return (
      <div className="navbar">
        {isMobile && <h1 className="navbar-header">TM</h1>}
        <div className="navbar-container">
          {!isMobile && <h1 className="navbar-header">Task Manager</h1>}
          <Link className="link sign-out" to="/login">
            <div className="nav-item">
              <FontAwesomeIcon className="icon" icon={faRightToBracket} />{" "}
              <div className="nav-item-name">Login</div>
            </div>
          </Link>
          <Link className="link sign-out" to="/signup">
            <div className="nav-item">
              <FontAwesomeIcon className="icon" icon={faUserPlus} />{" "}
              <div className="nav-item-name">Sign Up</div>
            </div>
          </Link>
        </div>
      </div>
    );
  };

  return <header>{user ? <UserNavbar /> : <NoUserNavbar />}</header>;
}
