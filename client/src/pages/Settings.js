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
import ConfirmDialog from "../pages/ConfirmDialog.js";

function Settings(props) {
  const {
    setSidePanel,
    settings,
    setSettings,
    allowConfirmDialog,
    setAllowConfirmDialog,
  } = useContext(TaskContext);
  const setDarkMode = () => {
    setSettings({ ...settings, mode: "dark" });
    document.querySelector("body").setAttribute("data-theme", "dark");
  };
  const setLightMode = () => {
    setSettings({ ...settings, mode: "light" });
    document.querySelector("body").setAttribute("data-theme", "light");
  };
  const setSettingsStyle = (style) => {
    setSettings({ ...settings, style: style });
  };

  const closeSettings = () => {
    setSidePanel(null);
    props.handleNavClick("Home");
  };

  return (
    <div className="settings">
      {allowConfirmDialog.state &&
        allowConfirmDialog.type === "clear-storage" && (
          <ConfirmDialog
            title={"Clear Local Storage?"}
            desc={"Clearing local storage will remove all tasks and tags"}
            functionToCall={() => {
              localStorage.clear();
            }}
          />
        )}
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
            <div
              className={`settings-item ${
                settings.style === "grid" ? "selected-mode" : ""
              }`}
              onClick={() => setSettingsStyle("grid")}
            >
              <FontAwesomeIcon className="icon" icon={faBorderAll} />
              Grid
            </div>
          </div>
        </div>

        <div className="settings-mode">
          <h4>Mode:</h4>
          <div
            className={`settings-item ${
              settings.mode === "light" ? "selected-mode" : ""
            }`}
            onClick={() => setLightMode()}
          >
            <FontAwesomeIcon className="icon" icon={faLightbulb} /> Light Mode
          </div>
          <div
            className={`settings-item ${
              settings.mode === "dark" ? "selected-mode" : ""
            }`}
            onClick={() => setDarkMode()}
          >
            {" "}
            <FontAwesomeIcon className="icon" icon={faMoon} />
            Dark Mode
          </div>
          <div className="settings-clear-cache">
            <h4>Clear Storage:</h4>
            <div
              className="settings-item"
              onClick={() =>
                setAllowConfirmDialog({ type: "clear-storage", state: true })
              }
            >
              Clear Storage
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
