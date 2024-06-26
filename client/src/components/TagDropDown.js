import React, { useState, useEffect } from "react";
import { TaskContext } from "../App";
import "../styling/tags.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faX, faCheck } from "@fortawesome/free-solid-svg-icons";
function TagDropDown(props) {
  const { tasks, setTasks, updateTask } = React.useContext(TaskContext);
  const form = React.useRef();

  const [selectedColor, setSelectedColor] = useState(0);
  const tagColors = [
    "#a1eebd",
    "#f1a1a1",
    "#f7b786",
    "#7bd3ea",
    "#cc86f7",
    "#f9cf73",
    "#dfe0e1",
    "#fbf8cc",
    "#fde4cf",
    "#ffcfd2",
    "#f1c0e8",
    "#cfbaf0",
    "#a3c4f3",
    "#90dbf4",
    "#8eecf5",
    "#98f5e1",
    "#b9fbc0",
  ];

  const [tagList, setTagList] = useState(
    JSON.parse(localStorage.getItem("tagList")) || [
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
    ]
  );

  useEffect(() => {
    localStorage.setItem("tagList", JSON.stringify(tagList));
  }, [tagList]);

  const [formData, setFormData] = React.useState({
    color: tagList[0].tagColor,
    name: null,
  });

  const handleTagForm = (event) => {
    setFormData({ ...formData, name: event.target.value });
  };

  const updatedFormTagColor = (index, color) => {
    setSelectedColor(index);
    const newFormData = { ...formData, color: color };
    setFormData(newFormData);
  };

  const createNewTag = (event) => {
    event.preventDefault();
    const exists = tagList.some((tag) => tag.tagName === formData.name);
    if (exists) {
      alert("Tag already exist");
    } else {
      const newTags = [
        ...tagList,
        { tagName: formData.name, tagColor: formData.color },
      ];
      setTagList(newTags);
      form.current.elements.tagName.value = "";
    }
  };

  const removeTag = (tagName) => {
    const updatedTasks = tasks.map((task) => {
      const updatedTags = task.tags.filter(
        (tag) => tag.tagInfo.tagName !== tagName
      );
      return { ...task, tags: updatedTags };
    });
    updateTask(updatedTasks[0], props.taskID);
    const updatedTags = tagList.filter((tag) => tag.tagName !== tagName);
    localStorage.setItem("tagList", JSON.stringify(updatedTags));
    setTagList(updatedTags);
  };

  // Enable and disable tag from task
  const manageTaskTag = async (tag) => {
    const updatedTask = tasks.map((task) => {
      if (task._id === props.taskID) {
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
    await updateTask(updatedTask[0], props.taskID);
  };

  // Return the tag status for each task
  const checkTagStatus = (tagName) => {
    const currTask = tasks.find((t) => t._id === props.taskID);
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
            manageTaskTag({
              tagName: tagName,
              tagColor: tagColor,
            })
          }
          checked={checkTagStatus(tagName)}
        />
        <div className="tags-menu-name" style={{ backgroundColor: tagColor }}>
          {tagName}
        </div>
        <button onClick={() => removeTag(tagName)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    );
  };

  return (
    <div className="tags-menu">
      <div className="tags-menu-header">
        <div className="tags-menu-header-text">Add Tags</div>
        <button
          onClick={() => props.handleTagDropdown(props.taskID)}
          className="close-btn"
        >
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
      <form
        ref={form}
        className="tags-create-form"
        onSubmit={(event) => createNewTag(event)}
      >
        <input
          type="text"
          name="tagName"
          placeholder="Enter tag name"
          onChange={handleTagForm}
          required
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
        <input
          type="submit"
          value="Create New Tag"
          className="create-tag-btn"
        />
      </form>
    </div>
  );
}

export default TagDropDown;
