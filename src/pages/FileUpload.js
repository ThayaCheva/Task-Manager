import React from "react";
import { TaskContext } from "../App";
function FileUpload() {
  const [files, setFiles] = React.useState();
  const { taskImages, setTaskImages } = React.useContext(TaskContext);

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
    for (let i = 0; i < objectURLs.length; i++) {
      return () => {
        URL.revokeObjectURL(objectURLs[i]);
      };
    }
  }, [files]);

  return (
    <div>
      <input
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        multiple
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFiles(e.target.files);
          }
        }}
      />
    </div>
  );
}

export default FileUpload;
