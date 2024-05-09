import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { TaskContext } from "../App";
function FileUpload(props) {
  const [image, setImage] = React.useState();
  const { tasks, updateTask } = React.useContext(TaskContext);
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

  const onInputChange = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      var updatedTask = [...tasks];
      updatedTask = updatedTask.filter((t) => t._id === props.taskID)[0];
      updatedTask.images = reader.result;
      updateTask(updatedTask, props.taskID);
    };
    reader.onerror = (error) => {
      console.log("Error:", error);
    };
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
        onChange={onInputChange}
        ref={fileInputRef}
      />
    </div>
  );
}

export default FileUpload;
