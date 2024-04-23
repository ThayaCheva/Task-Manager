import { React, useContext, useEffect } from "react";
import { TaskContext } from "../App.js";
import "../styling/taskmain.css";

function ConfirmDialog(props) {
  const { tasks, allowConfirmDialog, setAllowConfirmDialog } =
    useContext(TaskContext);
  return (
    <div className="confirm-menu">
      <div className="confirm-menu-container">
        <h1>{props.title}</h1>
        <p>{props.desc}</p>
        <div className="confirm-menu-buttons">
          <button
            className="btn"
            onClick={() => {
              props.functionToCall();
              setAllowConfirmDialog({ ...allowConfirmDialog, state: false });
            }}
          >
            Confirm
          </button>
          <button
            className="btn"
            onClick={() =>
              setAllowConfirmDialog({ ...allowConfirmDialog, state: false })
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
