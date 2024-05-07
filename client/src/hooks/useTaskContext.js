import { TaskContextDB } from "../context/TaskContext";
import { useContext } from "react";

export const useTaskContext = () => {
  const context = useContext(TaskContextDB);
  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside an WorkoutContextProvider"
    );
  }
  return context;
};
