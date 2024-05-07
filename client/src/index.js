import React from "react";
import ReactDOM from "react-dom/client";
import "./styling/index.css";
import App from "./App";
import { TasksContextProvider } from "./context/TaskContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TasksContextProvider>
      <App />
    </TasksContextProvider>
  </React.StrictMode>
);
