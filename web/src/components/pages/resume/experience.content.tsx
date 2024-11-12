import { Accordion, Badge, Col, Row } from "react-bootstrap";
import Scrollable from "../../common/scrollable/scrollable.component";
import BadgeBar from "../../common/badge-bar/badge-bar.component";

function ResumeExperienceComponent() {
  const eImagineBadgeItems = [
    { id: 1, name: "C#.NET", slug: "", icon: "" },
    { id: 2, name: ".NET Core / 6+", slug: "", icon: "" },
    { id: 3, name: "MVC", slug: "", icon: "" },
    { id: 4, name: "ReactJS", slug: "", icon: "" },
    { id: 5, name: "Javascript | jQuery", slug: "", icon: "" },
    { id: 6, name: "Typescript", slug: "", icon: "" },
    { id: 7, name: "SQL", slug: "", icon: "" },
    { id: 8, name: "EntityFramework", slug: "", icon: "" },
    { id: 9, name: "HTML5", slug: "", icon: "" },
    { id: 10, name: "CSS | SCSS", slug: "", icon: "" },
    { id: 11, name: "Azure DevOps", slug: "", icon: "" },
  ];
  const intouchBadgeItems = [
    { id: 12, name: "C#.NET", slug: "", icon: "" },
    { id: 13, name: "MVC", slug: "", icon: "" },
    { id: 14, name: "ReactJS", slug: "", icon: "" },
    { id: 15, name: "Javascript | jQuery", slug: "", icon: "" },
    { id: 16, name: "Typescript", slug: "", icon: "" },
    { id: 17, name: "SQL", slug: "", icon: "" },
    { id: 18, name: "nHibernate", slug: "", icon: "" },
    { id: 19, name: "EntityFramework", slug: "", icon: "" },
    { id: 20, name: "HTML5", slug: "", icon: "" },
    { id: 21, name: "CSS | SCSS", slug: "", icon: "" },
    { id: 22, name: "Azure DevOps", slug: "", icon: "" },
  ];
  const questBadgeItems = [
    { id: 23, name: "C#.NET", slug: "", icon: "" },
    { id: 24, name: "HTML5", slug: "", icon: "" },
    { id: 25, name: "CSS", slug: "", icon: "" },
    { id: 26, name: "WebForms", slug: "", icon: "" },
    { id: 27, name: "Javascript | jQuery", slug: "", icon: "" },
    { id: 28, name: "SQL", slug: "", icon: "" },
  ];
  const unifiedBadgeItems = [
    { id: 29, name: "VB.NET", slug: "", icon: "" },
    { id: 30, name: "Windows Forms", slug: "", icon: "" },
    { id: 31, name: "SQL", slug: "", icon: "" },
  ];
  const personalBadgeItems = [
    { id: 32, name: ".NET Blazor", slug: "", icon: "" },
    { id: 33, name: "SQL Express", slug: "", icon: "" },
    { id: 34, name: "NodeJS / Express", slug: "", icon: "" },
    { id: 35, name: "MongoDB", slug: "", icon: "" },
    { id: 36, name: "Blender 3.0", slug: "", icon: "" },
    { id: 37, name: "ThreeJS", slug: "", icon: "" },
    { id: 38, name: "Adobe Creative Suite", slug: "", icon: "" },
  ];

  return (
    <section className="">
      <Accordion defaultActiveKey="0">
        {/* eImagine */}
        <Accordion.Item eventKey="0">
          <Scrollable id="0" timeout={1000}>
            <Accordion.Header>
              <div className="row">
                <h4>
                  <strong>eImagine Technology Group Inc</strong>
                </h4>
                <span className="employment-date">02/2023 - present</span>
                <span className="tagline">
                  Software Engineer | Indianapolis, IN
                </span>
              </div>
            </Accordion.Header>
          </Scrollable>
          <Accordion.Body>
            <BadgeBar
              badgeItems={eImagineBadgeItems}
              fontSize="pcs-font-sm"
            ></BadgeBar>
            <div className="d-flex flex-column align-items-center mt-5">
              <div className="col-md-9 ">
                <p>
                  Maintain and enhance features of the administrative system for
                  the State of Indiana Bureau of Disability Services. The
                  primary system utilizes .NET 4 Framework with C#.NET backend
                  and leverages JavaScript/jQuery with HTML5, MVC Razor and CSS
                  for the front end.
                </p>
              </div>
              <div className="col-md-9">
                <p>
                  Analyze and solve issues for primary system as reported by
                  stakeholders through JIRA ticketing based on company standards
                  of prioritization in compliance with two-week development
                  sprints.
                </p>
              </div>
              <div className="col-md-9">
                <p>
                  Act as primary developer in maintenance of current Application
                  Management system with a target audience of users who are
                  applying for services managed by the primary administration
                  system. The current application system utilizes .NET4
                  Framework with C#.NET backend and leverages JavaScript/jQuery
                  with HTML5, MVC Razor and CSS for the front-end.
                </p>
              </div>
              <div className="col-md-9">
                <p>
                  Work exclusively with Lead Architect in refactoring current
                  application management system to a multi-tiered .NET6 WebAPI
                  with EntityFramework7 consumed by a ReactJS with Typescript
                  front-end. Front end application leverages MobX library for
                  state management and Axios library for communication with API
                  and is intended to define the standard architecture for future
                  development of other applications within the organization,
                  currently in the planning phases.
                </p>
              </div>
              <div className="col-md-9">
                <p>
                  Demonstrate independent motivation by leading the initiative
                  to streamline branching policies resulting in consistency
                  across team check-ins and source control. Additionally,
                  provide a proof-of-concept that led the initiative to
                  incorporate Continuous Integration / Deployment via Azure
                  DevOps services ensuring integrity and consistency throughout
                  deployment lifecycle.
                </p>
              </div>
              <div className="col-md-9">
                <p>
                  Research and analyze relevant third-party tools to provide
                  proof-of-concept for .pdf generation utility to be used across
                  multiple applications within the organization. Utility will be
                  integrated into current and future systems to aid in
                  streamlining the processes relevant to .pdf generation. Proof
                  of concept was accepted by stakeholders and development of
                  full-featured utility led to increased revenue for the
                  organization.
                </p>
              </div>
              <div className="col-md-9">
                <p>
                  Actively participate in daily standups in accordance with
                  SCRUM methodologies. Attend regular sprint planning meetings
                  to determine development scope and provide level of effort
                  estimates for upcoming sprint tasks. Interactively demonstrate
                  application features to client and gain confirmation of user
                  acceptance for completed sprint items.
                </p>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Intouch Solutions */}
        <Accordion.Item eventKey="1">
          <Scrollable id="1" timeout={1000}>
            <Accordion.Header>
              <div className="row">
                <h4>
                  <strong>Eversana / Intouch </strong>
                </h4>
                <span className="employment-date">10/2012 - 02/2023</span>
                <span className="tagline">
                  Senior Software Engineer | Overland Park, KS
                </span>
              </div>
            </Accordion.Header>
          </Scrollable>
          <Accordion.Body>
            <BadgeBar
              badgeItems={intouchBadgeItems}
              fontSize="pcs-font-sm"
            ></BadgeBar>
            <div className="d-flex flex-column align-items-center mt-5">
              <div className="col-md-9 ">
                <p>
                  Assumed principal role for new development of high-profile
                  applications utilizing multiple technologies, including
                  C#.NET, MVC/Razor, Javascript, ReactJs and ORMs nHibernate and
                  EntityFramework, adhering to the strict regulatory standards
                  of the pharmaceutical industry. As a subject matter expert for
                  these applications, I contributed to the overall efficiencies
                  within the Software Development Lifecycle, including project
                  planning, design, implementation, testing and deployment.
                </p>
              </div>
              <div className="col-md-9">
                <p>
                  Utilized time-management skills to facilitate maintenance and
                  enhancements for legacy applications while consistently
                  meeting client-first deadlines set by Account and Project
                  Management teams for multiple C#.NET and ReactJS projects
                  simultaneously.
                </p>
              </div>
              <div className="col-md-9">
                <p>
                  Demonstrated leadership by mentoring Junior Developers and
                  encouraging their professional growth while training them on
                  the specifics of each system. Delegated tasks appropriately
                  based on individual strengths and knowledge levels, which
                  directly contributed to their ability to serve as a backup for
                  the project. Additionally, this contributed to the successful
                  delivery of a high-quality final product.
                </p>
              </div>
              <div className="col-md-9">
                <p>
                  Demonstrated teamwork abilities by coordinating and
                  implementing JavaScript and HTML code as required by
                  Analytics, Search Engine Optimization and User Experience
                  teams to ultimately deliver a powerful marketing and
                  analytical tool to the client.
                </p>
              </div>
              <div className="col-md-9">
                <p>
                  With a client-first methodology, analyzed and implemented
                  practical solutions efficiently and effectively, providing
                  deliverables that consistently met or exceeded budgetary
                  expectations.
                </p>
              </div>
              <div className="col-md-9">
                <p>
                  Used effective verbal and written communication with Business
                  Analyst to ensure application conformed to a proper balance
                  between client needs and developmental efforts. Participated
                  in the later stages of the requirements gathering process to
                  proactively identify and remedy potential technical pitfalls
                  that could negatively affect the project timeline or overall
                  budget.
                </p>
              </div>

              <div className="col-md-9">
                <p>
                  Managed code migrations throughout project development
                  lifecycle utilizing various third-party tools including Azure
                  DevOps and FileZilla and other proprietary (s)ftp clients.
                  Worked closely with Project Management and Quality Assurance
                  teams to ensure deployments met or exceeded client expectation
                  for both timing and quality.
                </p>
              </div>

              <div className="col-md-9">
                <p>
                  Demonstrated flexibility by quickly adapting to unfamiliar
                  technologies falling outside my standard role to bring added
                  revenue generation to my immediate team. Examples would
                  include using various CMS tools such as Drupal and Gatsby as
                  well as other proprietary solutions as required.
                </p>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Quest Diagnostics */}
        <Accordion.Item eventKey="2">
          <Scrollable id="2" timeout={1000}>
            <Accordion.Header>
              <Row className="row">
                <h4>
                  <strong>Quest Diagnostics</strong>
                </h4>
                <span className="employment-date">10/2011 - 10/2012</span>
                <span className="tagline">
                  Senior Developer / Level V Support | Lenexa, KS
                </span>
              </Row>
            </Accordion.Header>
          </Scrollable>
          <Accordion.Body>
            <BadgeBar
              badgeItems={questBadgeItems}
              fontSize="pcs-font-sm"
            ></BadgeBar>
            <div className="d-flex flex-column align-items-center mt-5">
              <div className="col-md-9 ">
                <p>
                  Used creative problem-solving skills to act as the highest
                  level of support for a multi-faceted C#.NET system used by
                  medical professionals. Web based applications leveraged .NET
                  Web Forms technologies, adhering to relevant HTML/CSS,
                  Javascript and SQL development standards to ensure data
                  security and HIPPA compliance.
                </p>
              </div>
              <div className="col-md-9">
                <p>
                  Implemented solutions to inefficiencies and errors found,
                  enhanced user experience through optimizations to existing
                  C#.NET code and SQL Queries.
                </p>
              </div>
              <div className="col-md-9">
                <p>
                  Through effective verbal and written communication, provided
                  analytical support to other team members responsible for
                  maintaining external applications with dependencies.
                </p>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Unified Life Insurance */}
        <Accordion.Item eventKey="3">
          <Scrollable id="3" timeout={1000}>
            <Accordion.Header>
              <div className="row">
                <h4>
                  <strong>Unified Life Insurance</strong>
                </h4>
                <span className="employment-date">05/2010 - 10/2011</span>
                <span className="tagline">
                  Junior Developer | Overland Park, KS
                </span>
              </div>
            </Accordion.Header>
          </Scrollable>
          <Accordion.Body>
            <BadgeBar
              badgeItems={unifiedBadgeItems}
              fontSize="pcs-font-sm"
            ></BadgeBar>
            <div className="d-flex flex-column align-items-center mt-5">
              <div className="col-md-9 ">
                <p>
                  With teamwork and cooperation, accomplished the parallel
                  conversion of a legacy COBOL application to a highly
                  specialized and continuously evolving VB.NET Windows
                  application.
                </p>
              </div>
              <div className="col-md-9">
                <p>
                  Organically incorporated actuarial algorithms, billing cycles,
                  claims management processes and notification standards into a
                  single system using SQL and Windows Forms in compliance with
                  each newly acquired company’s original agreements.
                </p>
              </div>
              <div className="col-md-9">
                <p>
                  Utilized verbal and written communication skills to develop
                  close relationships with end users resulting in an efficient
                  implementation of solutions accommodating very specific
                  individual workflows and processes.
                </p>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Personal */}
        <Accordion.Item eventKey="4">
          <Scrollable id="4" timeout={1000}>
            <Accordion.Header>
              <div className="row">
                <h4>
                  <strong>Personal Growth and Development</strong>
                </h4>
              </div>
            </Accordion.Header>
          </Scrollable>
          <Accordion.Body>
            <BadgeBar
              badgeItems={personalBadgeItems}
              fontSize="pcs-font-sm"
            ></BadgeBar>

            <div className="d-flex flex-column align-items-center mt-5">
              <div className="col-md-9 ">
                <p>
                  Upon request, I will demonstrate competencies with .NET
                  Blazor, SQL Express, MERN stack, Adobe Suite and 3D
                  modeling/animation software such as Blender and ThreeJs /
                  ReactFiber.
                </p>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </section>
  );
}
export default ResumeExperienceComponent;
