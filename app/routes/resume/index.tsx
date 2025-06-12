import { useState } from "react";
import { Link, Outlet, useLoaderData, useLocation } from "react-router";
import HeaderImage from "~/components/layout/header-image";
import PageNav from "~/components/layout/page-nav";
import SkillsContent from "~/components/resume/skills-content";
import SummaryContent from "~/components/resume/summary-content";
import type { Skill } from "~/entities/resume";
import useImage from "~/hooks/useImage";
import { SolidIcon } from "~/utils/enums";

const Resume = () => {
  const loaderData = useLoaderData();
  const [activeTab, setActiveTab] = useState<string>("1");
  const location = useLocation();
  const headerImage = useImage({ path: location.pathname });

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleTabBlur = () => {
    // console.log("tab blur");
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
      <PageNav></PageNav>
      <Outlet></Outlet>
    </>
  );
};

export default Resume;
