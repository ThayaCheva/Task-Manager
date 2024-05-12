import { useAuthContext } from "./useAuthContext";
import { useTaskContext } from "./useTaskContext";
export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: tasksDispatch } = useTaskContext();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    tasksDispatch({ type: "SET_TASKS", payload: null });
  };
  return logout;
};
