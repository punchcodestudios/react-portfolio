import { useQuery } from "@tanstack/react-query";
import NodeAPIClient from "../services/node-api-client";
import { FetchResponse } from "../entities/FetchResponse";
// import skills from "../data/skill_data";
// import ms from "ms";
import { Skill } from "../entities/Skill";

const nodeApiClient = new NodeAPIClient<Skill>("skills");

const useSkills = () => {
  return useQuery<FetchResponse<Skill>, Error>({
    queryKey: ["skills"],
    queryFn: () => nodeApiClient.getAll(),
    staleTime: 24 * 60 * 60 * 1000,
    // initialData: { count: skills.length, results: skills },
  });
};

export default useSkills;
