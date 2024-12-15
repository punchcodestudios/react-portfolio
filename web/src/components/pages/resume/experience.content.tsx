import NoContent from "@/components/common/no-content/no-content.component";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import Scrollable from "../../common/scrollable/scrollable.component";
import AccordionHeader from "./accordion-header.component";
import ExperienceLineItems from "./experience-line-items.component";
import ExperienceSkills from "./experience-skills-sidebar.component";
import ExperienceSkillsMobile from "./experience-skills-sidebar.component.mobile";
import { ExperienceResponse } from "@/entities/Resume";

interface Props {
  data: ExperienceResponse | undefined;
}

function ResumeExperienceComponent({ data }: Props) {
  // console.log("resume.experience component rendered: ", data);
  const [toggle, setToggle] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 991px)` });

  if (!data?.meta.success) {
    return <NoContent />;
  } else {
    return (
      <section className="">
        <Accordion defaultActiveKey="0">
          {data.target.map((item, index) => {
            return (
              <Accordion.Item key={item.refid} eventKey={`${index}`}>
                <Scrollable id={`${index}`} timeout={1000}>
                  <Accordion.Header>
                    <AccordionHeader
                      company_name={item.company_name}
                      start_date={item.start_date}
                      end_date={item.end_date}
                      position={item.position}
                      location={item.location}
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
                    {toggle && isMobile && item?.skills?.length > 0 && (
                      <ExperienceSkillsMobile
                        skills={item?.skills}
                      ></ExperienceSkillsMobile>
                    )}
                    <div className="d-flex flex-container">
                      <ExperienceSkills
                        skills={item?.skills}
                      ></ExperienceSkills>
                      <ExperienceLineItems
                        items={item?.experience_line_items}
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
}
export default ResumeExperienceComponent;
