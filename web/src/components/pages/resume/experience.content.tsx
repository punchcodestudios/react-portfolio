import useExperience from "@/hooks/useExperiences";
import { Accordion, ListGroup } from "react-bootstrap";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import Scrollable from "../../common/scrollable/scrollable.component";
import AccordionHeader from "./accordion-header.component";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

function ResumeExperienceComponent() {
  const { data, isLoading, error } = useExperience();
  const [toggle, setToggle] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 991px)` });
  if (error) return <div>an error has occurred</div>;
  if (isLoading) return <div>Loading....</div>;
  return (
    <section className="">
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
                      // style={{ border: "0" }}
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    >
                      {toggle ? "hide skill list" : "show skill list"}
                    </button>
                  </nav>
                  {toggle && isMobile && (
                    <SidebarMenu className="row">
                      <SidebarMenu.Body className="d-flex flex-wrap justify-content-between">
                        {experience.skills?.map((skill) => {
                          return (
                            <div
                              className="p-2"
                              key={skill.refid}
                              style={{
                                fontSize: "small",
                                border: "0",
                              }}
                            >
                              {skill.name}
                            </div>
                          );
                        })}
                      </SidebarMenu.Body>
                    </SidebarMenu>
                  )}
                  <div className="d-flex flex-container">
                    <SidebarMenu expand="xl" hide="lg" className="row ms-2">
                      <SidebarMenu.Body style={{ width: "300px" }}>
                        <ListGroup variant="flush">
                          {experience.skills?.map((skill) => {
                            return (
                              <ListGroup.Item
                                key={skill.refid}
                                style={{ fontSize: "medium", border: "0" }}
                              >
                                {skill.name}
                              </ListGroup.Item>
                            );
                          })}
                        </ListGroup>
                      </SidebarMenu.Body>
                    </SidebarMenu>
                    <ListGroup variant="flush">
                      {experience.experience_line_items?.map((lineitem) => {
                        return (
                          <ListGroup.Item
                            key={lineitem.refid}
                            style={{ fontSize: "large" }}
                            className="mt-3 pb-3"
                          >
                            <p>{lineitem.text}</p>
                          </ListGroup.Item>
                        );
                      })}
                    </ListGroup>
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
