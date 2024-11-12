import { useContext } from "react";
import TasksContext from "./task-context";

const useTasks = () => useContext(TasksContext);
export default useTasks;
