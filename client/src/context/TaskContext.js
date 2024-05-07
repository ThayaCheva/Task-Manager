import { createContext, useReducer } from "react";
export const TaskContextDB = createContext();

export const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        tasks: action.payload,
      };
    case "CREATE_TASKS":
      return {
        tasks: [action.payload, ...state.tasks],
      };
    case "DELETE_TASKS":
      return {
        tasks: state.tasks.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: null,
  });
  return (
    <TaskContextDB.Provider value={{ ...state, dispatch }}>
      {children}
    </TaskContextDB.Provider>
  );
};
