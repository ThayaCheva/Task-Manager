import React, { useState } from "react";
import { TaskContext } from "../App";
import "../styling/tags.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faX, faCheck } from "@fortawesome/free-solid-svg-icons";
function TagDropDown(props) {
  const { tasks, setTasks } = React.useContext(TaskContext);
  const [formData, setFormData] = React.useState({
    id: null,
    color: null,
    name: null,
  });

  const [selectedColor, setSelectedColor] = useState(0);
  const tagColors = [
    "#a1eebd",
    "#f1a1a1",
    "#f7b786",
    "#7bd3ea",
    "#cc86f7",
    "#f9cf73",
    "#dfe0e1",
  ];

  const [tagList, setTagList] = React.useState([
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
  ]);

  const handleTagForm = (event) => {
    setFormData(event.target.value);
  };

  // const createNewTag = (tagName, tagColor) => {
  //   const newTags = [...tagList, { tagName, tagColor }];
  //   setTagsList(newTags);
  // };

  const addTagToTask = (taskID, tag) => {
    const updatedTask = tasks.map((task) => {
      if (task.id === taskID) {
        const tagsArray = Array.isArray(task.tags) ? task.tags : [];
        if (
          // check if tag already in array
          !tagsArray.some(
            (item) =>
              item.tagInfo.tagName === tag.tagName &&
              item.tagInfo.tagColor === tag.tagColor
          )
        ) {
          return {
            ...task,
            tags: [...tagsArray, { tagInfo: tag, tagChecked: true }],
          };
        } else {
          for (var i = 0; i < tagsArray.length; i++) {
            var currTask = null;
            if (tagsArray[i].tagInfo.tagName === tag.tagName) {
              currTask = tagsArray[i];
            }
            if (currTask) {
              const tagIndex = task.tags.indexOf(currTask);
              task.tags.splice(tagIndex, 1);
            }
          }
        }
      }
      return task;
    });
    setTasks(updatedTask);
  };

  const updatedFormTagColor = (index, color) => {
    setSelectedColor(index);
    const newFormData = { ...formData, color: color };
    setFormData(newFormData);
  };

  // Return the tag status for each task
  const checkTagStatus = (tagName) => {
    const currTask = tasks.find((t) => t.id === props.taskID);
    if (currTask) {
      for (var i = 0; i < currTask.tags.length; i++) {
        if (currTask.tags[i].tagInfo.tagName === tagName) {
          return currTask.tags[i].tagChecked; // Accessing tagChecked property
        }
      }
    }
    return false;
  };

  const TagsItem = ({ tagName, tagColor }) => {
    return (
      <div className="tags-menu-item">
        <input
          className="tags-menu-checkbox"
          type="checkbox"
          onChange={() =>
            addTagToTask(props.taskID, {
              tagName: tagName,
              tagColor: tagColor,
            })
          }
          checked={checkTagStatus(tagName)}
        />
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
        <button onClick={() => props.setTagDropdown()} className="close-btn">
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
      <div className="tags-menu-template">
        {tagList.map((tag, index) => (
          <TagsItem
            key={index}
            tags={tag}
            tagName={tag.tagName}
            tagColor={tag.tagColor}
          />
        ))}
      </div>
      <form className="tags-create-form">
        <input
          type="text"
          name="tagName"
          placeholder="Enter tag name"
          onChange={handleTagForm}
        ></input>
        <div className="tags-create-color">
          <p>Select a color</p>
          <div className="tags-color-container">
            {tagColors.map((color, index) => (
              <div
                key={index}
                className="color-item"
                style={{ backgroundColor: color }}
                onClick={() => updatedFormTagColor(index, color)}
              >
                {selectedColor === index && <FontAwesomeIcon icon={faCheck} />}
              </div>
            ))}
          </div>
        </div>
        <button>Create new tag</button>
      </form>
    </div>
  );
}

export default TagDropDown;
