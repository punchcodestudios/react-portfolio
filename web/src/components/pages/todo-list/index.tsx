import useTodos from "../../../hooks/useTodos";
import { Todo } from "../../../services/todoService";
import TodoForm from "./todoForm";

const TodoList = () => {
  const { data: todos, error, isLoading } = useTodos();

  if (isLoading) return <p>...loading....</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <TodoForm></TodoForm>
      <ul className="list-group">
        {todos?.map((todo: Todo) => (
          <li key={todo.id} className="list-group-item">
            {todo.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
