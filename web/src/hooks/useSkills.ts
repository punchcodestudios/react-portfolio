import { useQuery } from "@tanstack/react-query";
import NodeAPIClient from "../services/node-api-client";
import { FetchResponse } from "../entities/FetchResponse";
// import ms from "ms";
import { Skills } from "../entities/Skill";

const nodeApiClient = new NodeAPIClient<Skills>("skills");

const useSkills = () => {
  return useQuery<FetchResponse<Skills>, Error>({
    queryKey: ["skills"],
    queryFn: () => nodeApiClient.getAll(),
    staleTime: 24 * 60 * 60 * 1000,
    // initialData: { count: skills.length, results: skills },
  });
};

export default useSkills;
