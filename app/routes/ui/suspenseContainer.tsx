import React, { use, useState } from "react";
import DataFallback from "~/components/data/data-fallback";
import GenericErrorBoundary from "~/components/ui/error-boundary";
import type { SkillRequest, SkillResponse } from "~/entities/resume";
import resumeService from "~/service/resume-service";
import { ErrorBoundary } from "react-error-boundary";

// type UsePromise<Value> = Promise<Value> & {
//   status: "pending" | "fulfilled" | "rejected";
//   value: Value;
//   error: unknown;
// };

// function use<Value>(promise: Promise<Value>): Value {
//   console.log("use promise: ", promise);
//   const usePromise = promise as UsePromise<Value>;
//   if (usePromise.status === "fulfilled") {
//     return usePromise.value;
//   } else if (usePromise.status === "rejected") {
//     throw usePromise.error;
//   } else if (usePromise.status === "pending") {
//     throw usePromise;
//   } else {
//     usePromise.status = "pending";
//     usePromise.then(
//       (result) => {
//         usePromise.status = "fulfilled";
//         usePromise.value = result;
//       },
//       (error) => {
//         usePromise.status = "rejected";
//         usePromise.error = error;
//       }
//     );
//     throw usePromise;
//   }
// }

const SuspenseContainer = () => {
  return (
    <ErrorBoundary fallback={<GenericErrorBoundary />}>
      <React.Suspense fallback={<DataFallback />}>
        <SuspenseContent />
      </React.Suspense>
    </ErrorBoundary>
  );
};

const contentPromise: Promise<SkillResponse> = resumeService.getAllSkills({
  params: { skillsExclude: [], slug: "all" },
});

const SuspenseContent = () => {
  const skillData: SkillResponse = use(contentPromise);

  return (
    <div>
      <h1>Skills</h1>
      <ul>
        {skillData &&
          skillData.target.map((skill) => (
            <li key={skill.refid}>{skill.name}</li>
          ))}
      </ul>
    </div>
  );
};

export default SuspenseContainer;
