import { useQuery } from "@tanstack/react-query";
import resumeService from "@/services/resume-service";
import { ExperienceRequest, ExperienceResponse } from "../entities/Resume";

const svc = resumeService;

const useExperience = (params: ExperienceRequest) => {
  return useQuery<ExperienceResponse>({
    queryKey: ["experience", params],
    queryFn: () =>
      svc.getAllExperience(params).then((response) => {
        return response;
      }),
    staleTime: 24 * 60 * 60 * 1000,
    // initialData: { count: skills.length, results: skills },
  });
};

export default useExperience;
