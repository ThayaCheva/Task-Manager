import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { TaskContext } from "../App";
function FileUpload(props) {
  const [files, setFiles] = React.useState([]);
  const { tasks, setTasks, taskImages, setTaskImages } =
    React.useContext(TaskContext);
  const fileInputRef = React.useRef();

  const handleImageImport = () => {
    fileInputRef.current.click();
  };

  React.useEffect(() => {
    if (!files) {
      return;
    }
    let temp = [];
    for (let i = 0; i < files.length; i++) {
      temp.push(URL.createObjectURL(files[i]));
    }
    const objectURLs = temp;
    setTaskImages(objectURLs);

    const updatedTask = tasks.map((task) => {
      if (task.id === props.taskID) {
        return { ...task, images: objectURLs };
      }
      return task;
    });
    setTasks(updatedTask);
    for (let i = 0; i < objectURLs.length; i++) {
      return () => {
        URL.revokeObjectURL(objectURLs[i]);
      };
    }
  }, [files]);

  return (
    <div>
      <button onClick={handleImageImport}>
        <FontAwesomeIcon title="Add Image" icon={faImage} />
      </button>
      <input
        type="file"
        style={{ display: "none" }}
        accept="image/jpg, image/jpeg, image/png"
        multiple
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFiles(e.target.files);
          }
        }}
        ref={fileInputRef}
      />
    </div>
  );
}

export default FileUpload;
