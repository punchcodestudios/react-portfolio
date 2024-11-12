import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ResumeIndexContentComponent from "./index.content";
import ResumeSkillsComponent from "./skills.content";
import ResumeExperienceComponent from "./experience.content";
import ResumeEducationComponent from "./education.content";

const pageHeaderImage = require("../../../assets/img/about-me.png");
function Resume() {
  return (
    <article className="resume">
      <section className="header mb-3">
        <img src={pageHeaderImage}></img>
      </section>

      <Tabs
        defaultActiveKey="summary"
        id="justify-tab-example"
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
  );
}

export default Resume;
