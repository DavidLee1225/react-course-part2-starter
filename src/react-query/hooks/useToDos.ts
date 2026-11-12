import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { CACHE_KEY_TODOS } from "../constances";
import todoService, { Todo } from "../services/todoService";

const useToDOs = () => {
  return useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: todoService.getAll,
    staleTime: 10 * 1000,
  });
};

export default useToDOs;
