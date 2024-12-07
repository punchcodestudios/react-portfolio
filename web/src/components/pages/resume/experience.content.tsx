import useExperience from "@/hooks/useExperiences";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import Scrollable from "../../common/scrollable/scrollable.component";
import AccordionHeader from "./accordion-header.component";
import ExperienceLineItems from "./experience-line-items.component";
import ExperienceSkills from "./experience-skills-sidebar.component";
import ExperienceSkillsMobile from "./experience-skills-sidebar.component.mobile";

function ResumeExperienceComponent() {
  const { data, isLoading, error } = useExperience();

  const [toggle, setToggle] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 991px)` });

  if (error) return <div>an error has occurred</div>;
  if (isLoading) return <div>Loading....</div>;

  return (
    <section className="">
      {}
      <Accordion defaultActiveKey="0">
        {data?.results.map((experience, index) => {
          return (
            <Accordion.Item key={experience.refid} eventKey={`${index}`}>
              <Scrollable id={`${index}`} timeout={1000}>
                <Accordion.Header>
                  <AccordionHeader
                    company_name={experience.company_name}
                    start_date={experience.start_date}
                    end_date={experience.end_date}
                    position={experience.position}
                    location={experience.location}
                  ></AccordionHeader>
                </Accordion.Header>
              </Scrollable>
              <div className="d-flex flex-column">
                <Accordion.Body
                  style={{ backgroundColor: "#FFF", padding: "10px" }}
                >
                  <nav className="main-header navbar navbar-expand-lg">
                    <button
                      aria-controls="navbarScroll"
                      type="button"
                      aria-label="Toggle navigation"
                      className="navbar-toggler collapsed col-12"
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    >
                      {toggle ? "hide skill list" : "show skill list"}
                    </button>
                  </nav>
                  {toggle && isMobile && experience?.skills?.length > 0 && (
                    <ExperienceSkillsMobile
                      skills={experience.skills}
                    ></ExperienceSkillsMobile>
                  )}
                  <div className="d-flex flex-container">
                    <ExperienceSkills
                      skills={experience?.skills}
                    ></ExperienceSkills>
                    <ExperienceLineItems
                      items={experience?.experience_line_items}
                    ></ExperienceLineItems>
                  </div>
                </Accordion.Body>
              </div>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </section>
  );
}
export default ResumeExperienceComponent;
