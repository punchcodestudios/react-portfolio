import { useQuery } from "@tanstack/react-query";
import NodeAPIClient from "../services/node-api-client";
import { FetchResponse } from "../entities/FetchResponse";
// import ms from "ms";
import { Experience } from "../entities/Experience";

const nodeApiClient = new NodeAPIClient<Experience>("experience");

const useExperience = () => {
  return useQuery<FetchResponse<Experience>, Error>({
    queryKey: ["experience"],
    queryFn: () => nodeApiClient.getAll(),
    staleTime: 24 * 60 * 60 * 1000,
    // initialData: { count: skills.length, results: skills },
  });
};

export default useExperience;
