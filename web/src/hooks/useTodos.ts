import { useQuery } from "@tanstack/react-query";
import NodeAPIClient from "@/services/node-api-client";
import { Todo } from "@/entities/Todo";
import { FetchResponse } from "@/entities/FetchResponse";

const nodeApiClient = new NodeAPIClient<Todo>("todos");

const useTodos = () => {
  return useQuery<FetchResponse<Todo>, Error>({
    queryKey: ["todos"],
    queryFn: () => nodeApiClient.getAll(),
    staleTime: 10 * 1000,
    // initialData: { count: todo.length, results: todo },
  });
};

export default useTodos;
