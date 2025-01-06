import { useContext } from "react";
import ResumeContext from "./resume-context";

const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used with an AuthProvider");
  }
  return context;
};

export default useResume;
