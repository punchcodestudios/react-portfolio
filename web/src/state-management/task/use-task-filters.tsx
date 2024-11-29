import { useContext } from "react";
import TaskFilterContext from "./task-filter-context";

const useTaskFilters = () => useContext(TaskFilterContext);
export default useTaskFilters;
