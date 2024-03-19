import React from "react";
import { TaskContext } from "../App";
import "../styling/tags.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
function TagDropDown() {
  const { tasks, setTasks, tagsList, setTagsList } =
    React.useContext(TaskContext);

  const tagColors = [
    "#7bd3ea",
    "#cc86f7",
    "#f9cf73",
    "#a1eebd",
    "#f1a1a1",
    "#f7b786",
  ];
  return (
    <div className="tags-menu">
      <button className="close-btn">X</button>
      <h3>Add Tags</h3>
      <div className="tags-template">
        <div className="tags-template-item">
          <input type="checkbox"></input>
          <div
            className="tags-template-name"
            style={{ backgroundColor: "#fcbfbf" }}
          >
            Chores
          </div>
          <button>
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
        <div className="tags-template-item">
          <input type="checkbox"></input>
          <div
            className="tags-template-name"
            style={{ backgroundColor: "#afdfeb" }}
          >
            Goals
          </div>
          <button>
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
        <div className="tags-template-item">
          <input type="checkbox"></input>
          <div
            className="tags-template-name"
            style={{ backgroundColor: "#ffe5ad" }}
          >
            Chores
          </div>
          <button>
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TagDropDown;
