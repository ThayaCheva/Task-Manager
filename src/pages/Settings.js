import { React, useContext } from "react";
import "../styling/settings.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TaskContext } from "../App.js";
import {
  faBorderAll,
  faList,
  faLightbulb,
  faMoon,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
function Settings(props) {
  const { tasks, setAllowSettings } = useContext(TaskContext);
  const closeSettings = () => {
    setAllowSettings(false);
    props.handleNavClick("Home", false);
  };
  return (
    <div className="settings">
      <div className="settings-container">
        <div className="settings-header">
          <h1>Settings</h1>
          <button onClick={() => closeSettings()}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="settings-styles">
          <h4>Styles</h4>
          <div className="settings-styles-items ">
            <div className="settings-item">
              <FontAwesomeIcon className="icon" icon={faBorderAll} />
              Grid
            </div>
            <div className="settings-item">
              <FontAwesomeIcon className="icon" icon={faList} />
              List
            </div>
          </div>
        </div>
        <div className="settings-font-size">
          <h4>Font Size:</h4>
          <div className="settings-item">100%</div>
        </div>
        <div className="settings-mode">
          <h4>Mode:</h4>
          <div className="settings-item">
            <FontAwesomeIcon className="icon" icon={faLightbulb} /> Light Mode
          </div>
          <div className="settings-item">
            {" "}
            <FontAwesomeIcon className="icon" icon={faMoon} />
            Dark Mode
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
