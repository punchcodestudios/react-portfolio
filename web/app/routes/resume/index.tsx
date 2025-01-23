import { useState } from "react";
import { Link, Outlet, useLoaderData, useLocation } from "react-router";
import HeaderImage from "~/components/layout/header-image.component";
import PageNav from "~/components/layout/page-nav.component";
import SkillsContent from "~/components/resume/skills-content.component";
import SummaryContent from "~/components/resume/summary-content.component";
import type { Skill, SkillRequest } from "~/entities/resume";
import useImage from "~/hooks/useImage";
import resumeService from "~/service/resume-service";
import { SolidIcon } from "~/utils/enums";

const skillsQuery = () => ({
  queryKey: ["skills"],
  queryFn: async () =>
    resumeService.getAllSkills({ params: { skillsExclude: [] } }),
});

// export async function clientLoader(qc: QueryClient) {
//   const query = skillsQuery();
//   return async () => {
//     const data = qc.getQueryData(skillsQuery().queryKey);
//     if (data) return data;
//     return qc.fetchQuery(skillsQuery());
//   };

// // ⬇️ return data or fetch it
// const response = (
//   return queryClient.getQueryData(query.queryKey) ??
//   (queryClient.fetchQuery(query))
// );
//   const response = resumeService.getAllSkills({
//     params: { skillsExclude: [] },
//   });
//   return response;
// }

export function clientLoader() {
  // const query = skillsQuery();
  // console.log("queryKey: ", query.queryKey);
  // try {
  //console.log("FN: ", queryClient.getQueryData(query.queryKey));
  // const data = queryClient.fetchQuery(query);
  //queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query);
  //   console.log("queryDATA: ", data);
  // } catch (error) {
  //   console.log("Error: ", error);
  // }

  const request: SkillRequest = { params: { skillsExclude: [] } };
  const skills = resumeService.getAllSkills(request);
  console.log(skills);
  return skills;
}

const Resume = () => {
  const loaderData = useLoaderData();
  const [activeTab, setActiveTab] = useState<string>("1");
  const location = useLocation();
  const headerImage = useImage({ path: location.pathname });

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleTabBlur = () => {
    console.log("tab blur");
  };

  const items = [
    <Link
      to="resume"
      key={1}
      className={`w-full p-2 h-14 md:w-1/4 md:p-0 ${
        activeTab == "1" ? "bg-secondary" : ""
      }`}
      onClick={() => handleTabClick("1")}
      onBlur={() => handleTabBlur()}
    >
      Summary
    </Link>,
    <Link
      to="resume/skills"
      key={2}
      onClick={() => handleTabClick("2")}
      onBlur={() => handleTabBlur()}
      className={`w-full p-2 h-14 md:w-1/4 md:p-0 ${
        activeTab == "2" ? "bg-secondary" : ""
      }`}
    >
      Skills
    </Link>,
    <button
      key={3}
      onClick={() => handleTabClick("3")}
      onBlur={() => handleTabBlur()}
      className={`w-full p-2 h-14 md:w-1/4 md:p-0 ${
        activeTab == "3" ? "bg-secondary" : ""
      }`}
    >
      Button 3
    </button>,
    <button
      key={4}
      onClick={() => handleTabClick("4")}
      onBlur={() => handleTabBlur()}
      className={`w-full p-2 h-14 md:w-1/4 md:p-0 ${
        activeTab == "4" ? "bg-secondary" : ""
      }`}
    >
      Button 4
    </button>,
  ];

  if (loaderData.error.status) {
    return null;
  }

  let backendItems: Skill[] = [];
  let frontendItems: Skill[] = [];
  let infrastructureItems: Skill[] = [];
  let databaseItems: Skill[] = [];
  let designItems: Skill[] = [];
  let softSkillsItems: Skill[] = [];
  if (loaderData.target) {
    backendItems =
      loaderData.target.filter(
        (d: Skill) =>
          d.skill_types[0].name.toLowerCase() === "back end development"
      ) || ([] as Skill[]);

    frontendItems =
      loaderData.target.filter(
        (d: Skill) =>
          d.skill_types[0].name.toLowerCase() === "front end development"
      ) || ([] as Skill[]);

    databaseItems =
      loaderData.target.filter(
        (d: Skill) => d.skill_types[0].name.toLowerCase() === "database"
      ) || ([] as Skill[]);

    infrastructureItems =
      loaderData.target.filter(
        (d: Skill) => d.skill_types[0].name.toLowerCase() === "infrastructure"
      ) || ([] as Skill[]);

    designItems =
      loaderData.target.filter(
        (d: Skill) => d.skill_types[0].name.toLowerCase() === "design"
      ) || ([] as Skill[]);

    softSkillsItems =
      loaderData.target.filter(
        (d: Skill) => d.skill_types[0].name.toLowerCase() === "soft skills"
      ) || ([] as Skill[]);
  }

  const tabContent = [
    <SummaryContent></SummaryContent>,
    <div>
      <SkillsContent
        items={backendItems}
        iconType={SolidIcon.BACKEND}
        textClass={"text-primaryLight"}
      ></SkillsContent>
      <SkillsContent
        items={frontendItems}
        iconType={SolidIcon.FRONTEND}
        textClass={"text-primaryLight"}
      ></SkillsContent>
      <SkillsContent
        items={databaseItems}
        iconType={SolidIcon.DATABASE}
        textClass={"text-primaryLight"}
      ></SkillsContent>
      <SkillsContent
        items={infrastructureItems}
        iconType={SolidIcon.INFRASTRUCTURE}
        textClass={"text-primaryLight"}
      ></SkillsContent>
      <SkillsContent
        items={designItems}
        iconType={SolidIcon.DESIGN}
        textClass={"text-primaryLight"}
      ></SkillsContent>
      <SkillsContent
        items={softSkillsItems}
        iconType={SolidIcon.SOFTSKILLS}
        textClass={"text-primaryLight"}
      ></SkillsContent>
    </div>,
    <>
      <p>Tab Three</p>
    </>,
    <>
      <p>Tab Four</p>
    </>,
  ];

  return (
    <>
      {headerImage && <HeaderImage headerImage={headerImage}></HeaderImage>}
      <PageNav navItems={items}></PageNav>
      <Outlet></Outlet>
    </>
  );
};

export default Resume;
