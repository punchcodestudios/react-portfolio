import todoService, { Todo } from "../services/todoService";
import { CACHE_KEY_TODOS } from "../constants";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

const useTodos = () => {
  return useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: todoService.getAll,
    staleTime: ms("10s"),
  });
};

export default useTodos;
