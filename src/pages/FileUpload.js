import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { TaskContext } from "../App";
function FileUpload(props) {
  const [image, setImage] = React.useState();
  const { tasks, setTasks } = React.useContext(TaskContext);
  const fileInputRef = React.useRef();

  const handleImageImport = () => {
    fileInputRef.current.click();
  };

  React.useEffect(() => {
    const storedImage = localStorage.getItem("uploadedImage");
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);

  const handleimageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target.result;
      const maxStorageSize = 5242880;
      const imageDataSize = imageData ? imageData.length : 0;
      if (imageDataSize > maxStorageSize) {
        alert("Error: Image exceeded 5MB");
        return;
      }
      setImage(imageData);
      localStorage.setItem("uploadedImage", imageData);

      const updatedTask = tasks.map((task) => {
        if (task.id === props.taskID) {
          return { ...task, images: image };
        }
        return task;
      });
      setTasks(updatedTask);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <button onClick={handleImageImport}>
        <FontAwesomeIcon title="Add Image" icon={faImage} />
      </button>
      <input
        type="file"
        style={{ display: "none", width: "100px" }}
        accept="image/jpg, image/jpeg, image/png"
        onChange={handleimageChange}
        ref={fileInputRef}
      />
    </div>
  );
}

export default FileUpload;
