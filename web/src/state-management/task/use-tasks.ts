import { useContext } from "react";
import TaskContext from "./task-context";

const useTasks = () => useContext(TaskContext);
export default useTasks;
