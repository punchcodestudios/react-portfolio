import { ExperienceResponse, SkillResponse } from "@/entities/Resume";
import React from "react";

interface ResumeContextType {
  isLoading: boolean;
  error: string;
  skills: SkillResponse | undefined;
  experience: ExperienceResponse | undefined;
}

const ResumeContext = React.createContext<ResumeContextType>(
  {} as ResumeContextType
);
export default ResumeContext;
