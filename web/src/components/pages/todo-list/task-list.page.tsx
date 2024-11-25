import { Todo } from "@/entities/Todo";
import useTodos from "../../../hooks/useTodos";
import TaskForm from "./add-task.form";

const TaskList = () => {
  const { data: todos, error, isLoading } = useTodos();

  if (isLoading) return <p>...loading....</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <TaskForm></TaskForm>
      <ul className="list-group">
        {todos?.results.map((todo: Todo) => (
          <li key={todo.id} className="list-group-item">
            {todo.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
