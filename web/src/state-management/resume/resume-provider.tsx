import {
  ExperienceRequest,
  ResumeResponse,
  SkillRequest,
} from "@/entities/Resume";
import resumeService from "@/services/resume-service";
import React, { useEffect, useReducer, useState } from "react";
import ResumeContext from "./resume-context";
import resumeReducer from "./resume-reducer";

interface Props {
  children: React.ReactNode;
}

const ResumeProvider = ({ children }: Props) => {
  const [resumeResponse, dispatch] = useReducer(
    resumeReducer,
    {} as ResumeResponse
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getAllSkills = React.useCallback((request: SkillRequest): void => {
    console.log("getAllSkills");
    setIsLoading(true);
    setError("");
    resumeService
      .getAllSkills(request)
      .then((response) => {
        console.log("skill response: ", response);
        if (response.target) {
          dispatch({ type: "GET_ALL_SKILLS", payload: response });
        }
        if (response.error) {
          setError(response.error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getAllExperience = React.useCallback(
    (request: ExperienceRequest): void => {
      console.log("getAllExperience");
      setIsLoading(true);
      setError("");
      resumeService
        .getAllExperience(request)
        .then((response) => {
          console.log("experience response: ", response);
          if (response.target) {
            dispatch({ type: "GET_ALL_EXPERIENCE", payload: response });
          }
          if (response.error) {
            setError(response.error.message);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    []
  );

  useEffect(() => {
    getAllSkills({ params: { skillsExclude: [] } });
    getAllExperience({ params: {} });
  }, []);

  const value = React.useMemo(
    () => ({
      resumeResponse,
      isLoading,
      error,
      dispatch,
    }),
    [resumeResponse, isLoading, error]
  );

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};

export default ResumeProvider;
