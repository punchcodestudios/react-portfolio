import { useQuery } from "@tanstack/react-query";
// import platforms from "../data/platforms";
import APIClient from "../services/api-client";
// import ms from "ms";
import { Discipline } from "../entities/Discipline";

const apiClient = new APIClient<Discipline>("/platforms/lists/parents");

const useDisciplines = () =>
  useQuery({
    queryKey: ["disciplines"],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000,
    // initialData: { count: platforms.length, results: platforms },
  });

export default useDisciplines;
