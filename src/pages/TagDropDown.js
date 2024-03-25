import React from "react";
import { TaskContext } from "../App";
import "../styling/tags.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faX } from "@fortawesome/free-solid-svg-icons";
function TagDropDown(props) {
  const { tasks, setTasks, tagsList, setTagsList } =
    React.useContext(TaskContext);

  const tagColors = [
    "#a1eebd",
    "#f1a1a1",
    "#f7b786",
    "#7bd3ea",
    "#cc86f7",
    "#f9cf73",
  ];

  const tagList = [
    {
      tagName: "Chores",
      tagColor: tagColors[0],
    },
    {
      tagName: "Food",
      tagColor: tagColors[1],
    },
    {
      tagName: "Work",
      tagColor: tagColors[2],
    },
    {
      tagName: "Subscriptions",
      tagColor: tagColors[3],
    },
  ];

  const TagsItem = ({ tagName, tagColor }) => {
    return (
      <div className="tags-menu-item">
        <input className="tags-menu-checkbox" type="checkbox"></input>
        <div className="tags-menu-name" style={{ backgroundColor: tagColor }}>
          {tagName}
        </div>
        <button>
          <FontAwesomeIcon icon={faPen} />
        </button>
      </div>
    );
  };

  return (
    <div className="tags-menu">
      <div className="tags-menu-header">
        <div className="tags-menu-header-text">Add Tags</div>
        <div></div>
        <button onClick={() => props.setTagDropdown()} className="close-btn">
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
      <div className="tags-menu-template">
        {tagList.map((tag) => (
          <TagsItem tagName={tag.tagName} tagColor={tag.tagColor} />
        ))}
      </div>
      <div className="tags-menu-create">
        <input placeholder="Enter tag name"></input>
        <button>Create new tag</button>
      </div>
    </div>
  );
}

export default TagDropDown;
