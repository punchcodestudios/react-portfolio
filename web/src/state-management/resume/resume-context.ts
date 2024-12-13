import { ResumeResponse } from "@/entities/Resume";
import React, { Dispatch } from "react";
import { ResumeAction } from "./resume-reducer";

interface ResumeContextType {
  resumeResponse: ResumeResponse;
  isLoading: boolean;
  error: string;
  dispatch: Dispatch<ResumeAction>;
}

const ResumeContext = React.createContext<ResumeContextType>(
  {} as ResumeContextType
);
export default ResumeContext;
