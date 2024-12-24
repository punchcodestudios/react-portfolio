import { ApiErrorResponse } from "@/api/apiResponses";
import { TaskStatus } from "@/utils/enums";

export interface TaskItem {
  _id: string;
  title: string;
  description: string;
  addDate: Date;
  dueDate: Date;
  completedDate?: Date;
  taskGroup: string[];
  status: TaskStatus;
}

export interface AddTaskItem {
  title: string;
  description: string;
  dueDate: string;
  taskGroup: string;
}

export interface TaskQueryOptions {
  showActive: boolean;
  showCompleted: boolean;
  searchText: string;
  addDate: "asc" | "desc" | "none";
  dueDate: "asc" | "desc" | "none";
  groupType: string;
}

export interface TaskFilter {
  showActive: boolean;
  showCompleted: boolean;
  pageSize: number;
  currentPage: number;
}

export interface TaskContent {
  totalCount: number;
  activeCount: number;
  tasks: TaskItem[];
}

export interface TaskMeta {
  success: boolean;
  total: number;
}
export interface TaskResponse {
  target: TaskItem[];
  meta: TaskMeta;
  error: ApiErrorResponse;
}
