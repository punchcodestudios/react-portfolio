import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import genres from "../data/genres";
import ms from "ms";
import { Skill } from "../entities/Skill";

const apiClient = new APIClient<Skill>("genre");

// TODO: '/genres' in the call below is only to conform with the games api.
// this will need to be updated to use the punchcode studios api once the code base is working
const useSkill = () =>
  useQuery({
    queryKey: ["skills"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
    initialData: { count: genres.length, results: genres },
  });

export default useSkill;
