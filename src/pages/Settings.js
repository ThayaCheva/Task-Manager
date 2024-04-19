import { React, useContext, useState } from "react";
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
  const { tasks, setAllowSettings, settings, setSettings } =
    useContext(TaskContext);
  const setDarkMode = () => {
    setSettings({ ...settings, mode: "dark" });
    document.querySelector("body").setAttribute("data-theme", "dark");
  };
  const setLightMode = () => {
    setSettings({ ...settings, mode: "light" });
    document.querySelector("body").setAttribute("data-theme", "light");
  };
  const setFontSize = (fontSize) => {
    setSettings({ ...settings, fontSize: fontSize });
  };
  const setSettingsStyle = (style) => {
    setSettings({ ...settings, style: style });
  };

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
            <div
              className={`settings-item ${
                settings.style === "grid" ? "selected-mode" : ""
              }`}
              onClick={() => setSettingsStyle("grid")}
            >
              <FontAwesomeIcon className="icon" icon={faBorderAll} />
              Grid
            </div>
            <div
              className={`settings-item ${
                settings.style === "list" ? "selected-mode" : ""
              }`}
              onClick={() => setSettingsStyle("list")}
            >
              <FontAwesomeIcon className="icon" icon={faList} />
              List
            </div>
          </div>
        </div>
        <div className="settings-font-size">
          <h4>Font Size:</h4>
          <div className="settings-font-size-items">
            <div
              className={`settings-item ${
                settings.fontSize === 50 ? "selected-mode" : ""
              }`}
              onClick={() => setFontSize(50)}
            >
              50%
            </div>
            <div
              className={`settings-item ${
                settings.fontSize === 75 ? "selected-mode" : ""
              }`}
              onClick={() => setFontSize(75)}
            >
              75%
            </div>
            <div
              className={`settings-item ${
                settings.fontSize === 100 ? "selected-mode" : ""
              }`}
              onClick={() => setFontSize(100)}
            >
              100%
            </div>
            <div
              className={`settings-item ${
                settings.fontSize === 125 ? "selected-mode" : ""
              }`}
              onClick={() => setFontSize(125)}
            >
              125%
            </div>
            <div
              className={`settings-item ${
                settings.fontSize === 150 ? "selected-mode" : ""
              }`}
              onClick={() => setFontSize(150)}
            >
              150%
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
        </div>
      </div>
    </div>
  );
}

export default Settings;
