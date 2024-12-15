import resumeService from "@/services/resume-service";
import { useQuery } from "@tanstack/react-query";
import { SkillRequest, SkillResponse } from "../entities/Resume";

const svc = resumeService;
let isLoading = true;
const useSkills = (params: SkillRequest) => {
  return useQuery<SkillResponse>({
    queryKey: ["skills", params],
    queryFn: () =>
      svc.getAllSkills(params).then((response) => {
        isLoading = false;
        return response;
      }),
    staleTime: 24 * 60 * 60 * 1000,
    // initialData: { count: skills.length, results: skills },
  });
};

export { isLoading };
export default useSkills;
