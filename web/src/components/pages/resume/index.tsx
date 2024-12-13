import ResumeProvider from "@/state-management/resume/resume-provider";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ResumeEducationComponent from "./education.content";
import ResumeExperienceComponent from "./experience.content";
import ResumeIndexContentComponent from "./index.content";
import ResumeSkillsComponent from "./skills.content";

const pageHeaderImage = require("../../../assets/img/about-me.png");
function Resume() {
  return (
    <ResumeProvider>
      <article className="resume">
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
            <ResumeSkillsComponent />
          </Tab>
          <Tab eventKey="experience" title="Experience">
            <ResumeExperienceComponent />
          </Tab>
          <Tab eventKey="education" title="Education">
            <ResumeEducationComponent />
          </Tab>
        </Tabs>
      </article>
    </ResumeProvider>
  );
}

export default Resume;
