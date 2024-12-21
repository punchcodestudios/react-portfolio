import useExperience from "@/hooks/useExperience";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ResumeEducationComponent from "./education.content";
// import ResumeExperienceComponent from "./experience.content";
import ResumeIndexContentComponent from "./index.content";
// import ResumeSkillsComponent from "./skills.content";
import toast, { Toaster } from "react-hot-toast";
import { Suspense, useEffect } from "react";
import useSkills from "@/hooks/useSkills";
import React from "react";
const ResumeSkillsComponent = React.lazy(() => import("./skills.content"));
const ResumeExperienceComponent = React.lazy(
  () => import("./experience.content")
);

const pageHeaderImage = require("../../../assets/img/about-me.png");

function Resume() {
  // console.log("Resume component loaded");
  const { data: experienceData } = useExperience({
    params: { experienceExclude: [] },
  });
  const { data: skillData } = useSkills({
    params: { skillsExclude: [] },
  });

  useEffect(() => {
    const success = experienceData?.meta.success || true;
    if (!success) {
      toast.error(`Error: ${experienceData?.error.message}`);
    }
  }, [experienceData]);

  useEffect(() => {
    const success = skillData?.meta.success || true;
    if (!success) {
      toast.error(`Error: ${skillData?.error.message}`);
    }
  }, [skillData]);

  return (
    <article className="resume">
      <Toaster></Toaster>
      <section className="header">
        <img src={pageHeaderImage}></img>
      </section>

      <Tabs
        defaultActiveKey="summary"
        id="resume-page-nav-tabs"
        className="mb-3"
        justify
      >
        <Tab eventKey="summary" title="Summary">
          <ResumeIndexContentComponent />
        </Tab>
        <Tab eventKey="skills" title="Skills">
          <Suspense fallback={<div>Skills are loading please wait...</div>}>
            <ResumeSkillsComponent data={skillData} />
          </Suspense>
        </Tab>
        <Tab eventKey="experience" title="Experience">
          <Suspense fallback={<div>Experience are loading please wait...</div>}>
            <ResumeExperienceComponent data={experienceData} />
          </Suspense>
        </Tab>
        <Tab eventKey="education" title="Education">
          <ResumeEducationComponent />
        </Tab>
      </Tabs>
    </article>
  );
}

export default Resume;
