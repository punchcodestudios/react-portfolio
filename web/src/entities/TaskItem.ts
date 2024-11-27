export interface TaskItem {
  _id: string;
  title: string;
  description: string;
  addDate: Date;
  dueDate: Date;
  completedDate?: Date;
  taskGroupRefid: string;
}

export interface TaskGroup {
  refid: string;
  title: string;
  description: string;
}

export interface AddTaskItem {
  title: string;
  description: string;
  dueDate: string;
  taskGroupRefid: string;
}

// export interface CompleteTaskItem {
//   refid: number;
// }
