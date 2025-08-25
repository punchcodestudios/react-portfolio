// import { use, useEffect, useRef, useState } from "react";
// import { ErrorBoundary } from "react-error-boundary";
// import Scrollable from "~/components/ui/scrollable";
// import { Badge } from "~/components/ui/badge";
// import ApiError from "~/components/errors/api-error";
// import type {
//   Experience,
//   ExperienceRequest,
//   ExperienceResponse,
// } from "~/entities/resume";
// import resumeService from "~/service/resume-service";
// import { formatDate } from "~/utils/site";
// import type { Route } from "./+types/experience";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import IconService from "~/service/icon-service";
// import { SolidIcon } from "~/utils/enums";
// import GenericErrorBoundary from "~/components/ui/error-boundary";
// import React from "react";
// import Loader from "~/components/ui/loader";
// import {
//   ExperienceOrganizations,
//   getExperienceByOrganization,
//   getSkillsByOrganization,
//   getSkillsByType,
//   SkillTypes,
//   type ExperienceList,
//   type SkillList,
// } from "~/utils/resume";
// import { CallToActionLeft } from "~/components/cards/cta";
// import { SkillsAccordion } from "./skills";

// export async function loader({ params }: Route.LoaderArgs) {
//   const request: ExperienceRequest = { params: {} };
//   const experienceData: ExperienceResponse =
//     await resumeService.getAllExperience(request);
//   return { ...experienceData };
// }

// const Accordion = ({
//   id,
//   header,
//   content,
//   isExpanded,
//   onToggle,
// }: {
//   id: string;
//   header: React.ReactNode;
//   content: React.ReactNode;
//   isExpanded: boolean;
//   onToggle: () => void;
// }) => {
//   return (
//     <div
//       id={id}
//       className={`bg-primary mb-5 transition-all duration-100 ${
//         isExpanded ? "" : "min-h-20"
//       }`}
//     >
//       <div
//         className="flex justify-between items-start cursor-pointer"
//         onClick={onToggle}
//       >
//         <div>{header}</div>
//         <div className="p-8 text-siteWhite">
//           <FontAwesomeIcon
//             icon={
//               isExpanded
//                 ? IconService.getSolid(SolidIcon.SUBTRACT)
//                 : IconService.getSolid(SolidIcon.ADD)
//             }
//             className={`bx bx-chevron-right text-4xl transition-all duration-300`}
//           ></FontAwesomeIcon>
//         </div>
//       </div>
//       {isExpanded && (
//         <div
//           className={`px-5 pb-5 transiton-all duration-100 ${
//             isExpanded ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <div>{content}</div>
//         </div>
//       )}
//     </div>
//   );
// };

// const Experience = ({ loaderData }: Route.ComponentProps) => {
//   const [expandedId, setExpandedId] = useState<string>("");
//   const toggleExpand = (id: string) => {
//     setExpandedId(expandedId === id ? "" : id);
//     if (id == "") {
//       // console.log("ExpandedID: ", expandedId);
//       window.scrollTo(0, 0);
//     }
//     if (expandedId === id) {
//       // console.log("ExpandedID: ", expandedId);
//       window.scrollTo(100, 0);
//     }
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   });
//   if (!loaderData.meta.success) {
//     return <ApiError error={loaderData.error}></ApiError>;
//   }

//   if (!loaderData.target) {
//     return null;
//   }

//   const data = loaderData.target;

//   const accordionData = [
//     {
//       id: data[0].refid,
//       header: <ResumeHeader data={data[0]} />,
//       content: <ResumeContent data={data[0]}></ResumeContent>,
//     },
//     {
//       id: data[1].refid,
//       header: <ResumeHeader data={data[1]} />,
//       content: <ResumeContent data={data[1]}></ResumeContent>,
//     },
//     {
//       id: data[2].refid,
//       header: <ResumeHeader data={data[2]} />,
//       content: <ResumeContent data={data[2]}></ResumeContent>,
//     },
//     {
//       id: data[3].refid,
//       header: <ResumeHeader data={data[3]} />,
//       content: <ResumeContent data={data[3]}></ResumeContent>,
//     },
//   ];

//   return accordionData.map((item) => {
//     return (
//       <Scrollable id={item.id} timeout={1000} key={`${item.id}_scrollableKey`}>
//         <Accordion
//           {...item}
//           key={item.id}
//           isExpanded={expandedId === item.id}
//           onToggle={() => toggleExpand(item.id)}
//         ></Accordion>
//       </Scrollable>
//     );
//   });
// };

// const ResumeContent = ({ data }: { data: Experience }) => {
//   const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1280);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 1280);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return !isMobile ? (
//     <ExperienceContent />
//   ) : (
//     <ExperienceContentMobile data={data} />
//   );
// };

// const ResumeHeader = ({ data }: { data: Experience }) => {
//   return (
//     <div className="p-6 flex flex-col">
//       <h2 className="text-siteWhite text-md font-header font-bold">
//         {data.company_name}
//       </h2>
//       <p className="text-siteWhite font-header">{data.position}</p>
//       <p className="text-siteWhite font-text">
//         {formatDate(data.start_date)} -{" "}
//         {data.end_date == "" ? "present" : formatDate(data.end_date)}
//       </p>
//       <p className="text-siteWhite">{data.location.replaceAll("|", " ")}</p>
//     </div>
//   );
// };

// const ExperienceContent = () => {
//   const contentRef = useRef(null);
//   const orgResponse = use(
//     getExperienceByOrganization() as Promise<ExperienceList>
//   );
//   console.log("orgResponse: ", orgResponse);
//   // const orgSkillsResponse = use(
//   //   getSkillsByOrganization() as Promise<SkillList>
//   // );
//   const orgData: ExperienceList = orgResponse;
//   // const skillData: SkillList = orgSkillsResponse;

//   return (
//     <div ref={contentRef} className="flex flex-col">
//       <div className="flex flex-col mx-auto xl:max-w-[90%]">
//         <div className="flex flex-col mx-auto overflow:hidden xl:flex-row xl:flex-wrap xl:justify-between">
//           <div className="backend py-10 lg:px-10 border-b-2 border-gray-400 mb-5 xl:w-full">
//             <CallToActionLeft
//               title={
//                 { ...orgData[ExperienceOrganizations.EIMAGINE] }.target[0]
//                   .company_name
//               }
//               imageUrl="/images/skills_backend.png"
//               imageAlt="an image indicating backend development"
//               tagLine="Back-end development is the server-side of an application and everything that communicates between the database and the browser."
//               text="Punchcode Studios has a strong foundation in back-end development, with experience in a variety of languages and frameworks. We are committed to building robust, scalable, and secure back-end systems that power modern applications."
//             >
//               {/* {
//                 <SkillsAccordion
//                   skills={skillData[ExperienceOrganizations.EIMAGINE]}
//                   wrapperName={ExperienceOrganizations.EIMAGINE}
//                 />
//               } */}
//             </CallToActionLeft>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-row bg-siteWhite flex-wrap p-5">
//         <div className="lg:w-[30%] flex flex-wrap lg:flex-col">
//           {/* {orgData.skills.map((skill) => {
//           return <Badge key={skill.refid}>{skill.name}</Badge>;
//         })} */}
//         </div>
//         <div className="lg:w-[70%] flex flex-col ps-3">
//           {/* {data.company_name.includes("eImagine") ? (
//           <EImagineLineItems></EImagineLineItems>
//         ) : (
//           data.experience_line_items.map((item, index) => {
//             return (
//               <div
//                 className={`mb-3 p-6 ${
//                   index < data.experience_line_items.length - 1
//                     ? "border-b-2 border-primary"
//                     : ""
//                 }`}
//                 key={item.refid}
//               >
//                 <p>{item.text}</p>
//               </div>
//             );
//           })
//         )} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// const ExperienceContentMobile = ({ data }: { data: Experience }) => {
//   const [expandedId, setExpandedId] = useState<string>("");
//   const toggleExpand = (id: string) => {
//     setExpandedId(expandedId === id ? "" : id);
//   };
//   return (
//     <div className="" onClick={() => toggleExpand(data.refid)}>
//       <div id={data.refid} className="flex flex-row flex-wrap bg-siteWhite">
//         <div className="flex flex-row bg-primary p-2 w-[100%] m-3 justify-center">
//           <p className="text-siteWhite">{`${
//             expandedId == data.refid ? "Hide" : "Show"
//           } Relevant Skills`}</p>
//         </div>
//         {expandedId == data.refid && (
//           <div className="flex flex-wrap m-5">
//             {data.skills.map((skill) => {
//               return <Badge key={skill.refid}>{skill.name}</Badge>;
//             })}
//           </div>
//         )}
//         <div className="flex flex-col p-3">
//           {data.company_name.includes("eImagine") ? (
//             <EImagineLineItems></EImagineLineItems>
//           ) : (
//             data.experience_line_items.map((item, index) => {
//               return (
//                 <div
//                   key={item.refid}
//                   className={`mb-3 p-6 ${
//                     index < data.experience_line_items.length - 1
//                       ? "border-b-2 border-primary"
//                       : ""
//                   }`}
//                 >
//                   <p>{item.text}</p>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const EImagineLineItems = () => {
//   return (
//     <div className="flex flex-col items-center">
//       <div className="w-[95%] xl:w-[80%]">
//         <p className="font-semibold my-3 md:my-5">
//           As the primary developer, refactor legacy Application Management
//           System into a modern tech-stack. Application serves as the entry point
//           for individuals applying for services eventually managed by the
//           primary Case Management System.
//         </p>
//         <div className="ms-10 mb-10 lg:w-[90%]">
//           <ul className="list-disc list-outside">
//             <li className="mb-3 me-8 md:me-0">
//               Legacy Application Management System utilizes .NET4 Framework with
//               C#.NET backend and leverages JavaScript/jQuery with HTML5, MVC
//               Razor and CSS for the front-end.
//             </li>
//             <li className="mb-3 me-8 md:me-0">
//               Refactored Application Management System is a React/Typescript
//               front end consuming a .NET8 WebAPI with EntityFramework. Front end
//               utilizes JSX/HTML, React-Bootstrap, Mobx for state management and
//               Axios for communication with the back end. This defines the
//               standard architecture for future development of similar
//               applications within the organization, currently in the planning
//               phases.
//             </li>
//             <li className="mb-3 me-8 md:me-0">
//               As the primary developer, collaborate with Business Analysts,
//               Project Managers and Lead Architect while analyzing, translating
//               and communicating specific details of the legacy system to
//               identify potential areas of improvement.
//             </li>
//             <li className="mb-3 me-8 md:me-0">
//               Provide proof of concepts for suggested enhancements focusing on
//               performance, accessibility and user experience.
//             </li>
//             <li className="mb-3 me-8 md:me-0">
//               Work with external vendors to facilitate data transfers between
//               systems and incorporate global authentication and authorization
//               (OIDC) workflow into refactored application.
//             </li>
//             <li className="mb-3 me-8 md:me-0">
//               Collaborate with both internal and external Quality Assurance
//               teams to troubleshoot and remediate issues and enhancements found
//               during development sprints.
//             </li>
//             <li className="mb-3 me-8 md:me-0">
//               Present a demonstration of functionality for each development
//               sprint to both internal and external stakeholders, providing
//               transparency during the development lifecycle and establishing
//               relationships focused on the core value of a client-first
//               methodology.
//             </li>
//             <li className="mb-3 me-8 md:me-0">
//               This milestone project was delivered two months ahead of schedule,
//               carrying zero defects across all development and testing sprints,
//               with only one defect found during the post-release stabilization
//               period.
//             </li>
//             <li className="mb-3 me-8 md:me-0">
//               The application was unique in receiving a 100% scorecard from an
//               internal team of stakeholders evaluating compliance with internal
//               processes and procedures.
//             </li>
//             <li className="mb-3 me-8 md:me-0">
//               Additionally, the application was unique in achieving a 100%
//               rating by an external organization representing the end user for
//               accomplishments in delivering a final product that met or exceeded
//               standards for usability, performance, timeliness and overall
//               client satisfaction.
//             </li>
//           </ul>
//         </div>

//         <p className="font-semibold my-3 md:my-5">
//           As a member of a development team working in an Agile environment,
//           analyze and solve issues for the primary Case Management System as
//           reported by stakeholders and end users through JIRA ticketing
//         </p>
//         <div className="ms-10 mb-10">
//           <ul className="list-disc list-outside w-[95%]">
//             <li className="mb-3 me-8 md:me-0">
//               The primary system utilizes .NET 4 Framework with C#.NET backend
//               and leverages JavaScript/jQuery with HTML5, Kendo UI Controls, MVC
//               Razor and CSS for the front end.{" "}
//             </li>
//             <li className="mb-3 me-8 md:me-0">
//               Interact with managers and peers by participating in code reviews,
//               discussions on best practices as well as periodic meetings to
//               evaluate opportunities for process improvements.
//             </li>
//             <li className="mb-3 me-8 md:me-0">
//               Actively participate in daily standups in accordance with SCRUM
//               methodologies and attend regular sprint planning meetings to
//               determine development scope and provide level of effort estimates
//               for upcoming sprint tasks.{" "}
//             </li>
//             <li className="mb-3 me-8 md:me-0">
//               Lead the initiative to streamline naming conventions, branching
//               policies and check-in procedures using Git repositories, managed
//               by Microsoft Azure, resulting in consistency between code bases,
//               and transparency during code reviews prompted by pull requests.
//             </li>
//             <li className="mb-3 me-8 md:me-0">
//               Provide a proof-of-concept that led the initiative to incorporate
//               Continuous Integration / Deployment via Azure DevOps services
//               ensuring integrity and consistency throughout deployment
//               lifecycle.
//             </li>
//           </ul>
//         </div>
//         <p className="font-semibold my-3 md:my-5">
//           As a member of the eImagine organization, promote the core value of
//           continuous improvement by leading initiatives that facilitate personal
//           growth and provide opportunities for awareness to individuals outside
//           of my immediate team.
//         </p>
//         <div className="ms-10 mb-10">
//           <ul className="list-disc list-outside w-[95%]">
//             <li className="mb-3 me-8 md:me-0">
//               Research and analyze relevant third-party tools to provide
//               proof-of-concept for .pdf generation utility to be used across
//               multiple applications within the organization. Utility is being
//               integrated into current and future systems to aid in streamlining
//               the processes relevant to .pdf generation. Proof of concept was
//               accepted by stakeholders and development of full-featured utility
//               led to increased revenue for the organization.
//             </li>
//             <li className="mb-3 me-8 md:me-0">
//               Create “lunch-and-learn” content demonstrating the details of the
//               React ecosystem and present to all company team members via
//               Microsoft Teams. This created awareness of my specific role and
//               allowed others to gain an understanding of how this role
//               contributes to the overall benefit of the organization.
//             </li>
//             <li className="mb-3 me-8 md:me-0">
//               Promote personal improvement by setting and accomplishing
//               quarterly and annual goals, including obtaining certifications
//               relevant to my professional development, transferring knowledge to
//               other team members and adopting best practices as defined by
//               company standards.
//             </li>
//             <li className="mb-3 me-8 md:me-0">
//               Maintain 100% regulatory compliance with training modules as
//               required by eImagine as well as the state of Indiana.
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ExperienceContainer = () => {
//   return (
//     <ErrorBoundary fallback={<GenericErrorBoundary />}>
//       <React.Suspense fallback={<Loader />}>
//         <ExperienceContent />
//       </React.Suspense>
//     </ErrorBoundary>
//   );
// };

// export default Experience;
