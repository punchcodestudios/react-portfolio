import resumeService from "~/service/resume-service";
import type { Route } from "./+types/skills";
import type { Skill, SkillRequest, SkillResponse } from "~/entities/resume";
import { SolidIcon } from "~/utils/enums";
import GenericErrorBoundary from "~/components/ui/error-boundary";
import ApiError from "~/components/errors/api-error";
import { Button } from "~/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconService from "~/service/icon-service";
import { Badge } from "~/components/ui/badge";
import { Suspense, use, useState } from "react";
import { CallToActionLeft, CallToActionRight } from "~/components/cards/cta";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";
gsap.registerPlugin(ScrollTrigger);

export interface SkillContentItem {
  skillList: Skill[];
  iconType: SolidIcon;
}

const cache = new Map();

export async function loader({ params }: Route.LoaderArgs) {
  const request: SkillRequest = {
    params: { skillsExclude: [], slug: "" },
  };
  const skillsData = await resumeService.getAllSkills(request);
  return { ...skillsData };
}

export const clientLoader = async ({
  serverLoader,
}: Route.ClientLoaderArgs): Promise<SkillResponse> => {
  const cachedData = cache.get("key");
  if (cachedData) {
    console.log("returning cached data: ", cachedData);
    return cachedData;
  }

  const serverData = await serverLoader();
  cache.set("key", serverData);
  return { ...serverData };
};

const Skills = ({ loaderData }: Route.ComponentProps) => {
  if (!loaderData.meta.success) {
    return <ApiError error={loaderData.error}></ApiError>;
  }

  if (!loaderData.target) {
    return null;
  }

  useGSAP(() => {
    const containers = [
      ".backend-container",
      ".frontend-container",
      ".database-container",
      ".design-container",
      ".infrastructure-container",
      ".softskills-container",
    ];

    containers.forEach((selector) => {
      gsap.set(selector, { scale: 1 });
      gsap.set(`${selector}-skills-wrapper`, { opacity: 0, scale: 1.25 });
      gsap.to(selector, {
        opacity: 1,
        scale: 1.05,
        y: 0,
        duration: 0.7,
        ease: "power2.inOut",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        scrollTrigger: {
          trigger: selector,
          start: "center 70%",
          end: "center 40%",
          markers: false, // set to true for debugging
          scrub: true,
        },
        onComplete: () => {
          gsap.to(selector, {
            scale: 1,
            ease: "power2.inOut",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.0)",
            duration: 0.7,
          });
          gsap.to(`${selector}-skills-wrapper`, {
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: "power2.inOut",
          });
        },
      });
    });
  }, []);

  function filterSkills() {
    let backendItems: SkillContentItem;
    let frontendItems: SkillContentItem;
    let infrastructureItems: SkillContentItem;
    let databaseItems: SkillContentItem;
    let designItems: SkillContentItem;
    let softSkillsItems: SkillContentItem;

    backendItems = {
      iconType: SolidIcon.BACKEND,
      skillList:
        loaderData.target.filter(
          (d: Skill) =>
            d.skill_types[0].name.toLowerCase() === "back end development"
        ) || ([] as Skill[]),
    };

    frontendItems = {
      iconType: SolidIcon.FRONTEND,
      skillList:
        loaderData.target.filter(
          (d: Skill) =>
            d.skill_types[0].name.toLowerCase() === "front end development"
        ) || ([] as Skill[]),
    };

    databaseItems = {
      iconType: SolidIcon.DATABASE,
      skillList:
        loaderData.target.filter(
          (d: Skill) => d.skill_types[0].name.toLowerCase() === "database"
        ) || ([] as Skill[]),
    };

    infrastructureItems = {
      iconType: SolidIcon.INFRASTRUCTURE,
      skillList:
        loaderData.target.filter(
          (d: Skill) => d.skill_types[0].name.toLowerCase() === "infrastructure"
        ) || ([] as Skill[]),
    };

    designItems = {
      iconType: SolidIcon.DESIGN,
      skillList:
        loaderData.target.filter(
          (d: Skill) => d.skill_types[0].name.toLowerCase() === "design"
        ) || ([] as Skill[]),
    };

    softSkillsItems = {
      iconType: SolidIcon.SOFTSKILLS,
      skillList:
        loaderData.target.filter(
          (d: Skill) => d.skill_types[0].name.toLowerCase() === "soft skills"
        ) || ([] as Skill[]),
    };

    return [
      { ...backendItems },
      { ...frontendItems },
      { ...databaseItems },
      { ...infrastructureItems },
      { ...designItems },
      { ...softSkillsItems },
    ];
  }

  const contentItems = filterSkills();

  const [skillSetOpen, setSkillSetOpen] = useState<boolean[]>([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  const toggleSkillSet = (event: React.MouseEvent<HTMLElement>) => {
    const updated = [...skillSetOpen];
    updated[+event.currentTarget?.id] = !skillSetOpen[+event.currentTarget?.id];
    setSkillSetOpen(updated);
  };

  const getBadgeVariantBySkillType = (skillType: string) => {
    switch (skillType.toLowerCase()) {
      case "back-end":
        return "primary";
      case "front-end":
        return "secondary";
      case "database":
        return "red";
      case "design":
        return "green";
      case "infrastructure":
        return "blue";
      case "soft":
        return "silver";
    }
  };

  const backEndHeader = (
    <div className="px-6 xl:shrink-0 bg-resume-skills flex flex-row">
      <FontAwesomeIcon
        icon={IconService.getSolid(SolidIcon.BACKEND)}
        fontSize={20}
        className="text-siteWhite my-auto"
      ></FontAwesomeIcon>
      <h3 className="mb-0 text-md font-semibold tracking-wide text-siteWhite font-header uppercase p-3">
        Back-end
      </h3>
    </div>
  );

  const backEndSkills = (
    <div className="backend-container-skills-wrapper mt-1 lg:mt-3 px-4 xl:p-0">
      <details
        open
        className="p-2 border border-transparent open:border-black/10 open:bg-gray-100"
      >
        <summary
          id="0"
          className="font-header text-md leading-6 font-semibold text-primary select-none lg:mb-4"
          onClick={(event) => toggleSkillSet(event)}
        >
          {`${skillSetOpen[0] ? "hide" : "show"} relevant skills`}
        </summary>
        <div className="flex flex-wrap">
          {contentItems[0].skillList.length > 0 &&
            contentItems[0].skillList.map((skill: Skill) => {
              return (
                <Badge
                  key={skill.refid}
                  variant={getBadgeVariantBySkillType(
                    skill.skill_types[0].name
                  )}
                  size={"xs"}
                  columns="fit"
                >
                  {skill.name}
                </Badge>
              );
            })}
        </div>
      </details>
    </div>
  );

  const frontEndHeader = (
    <div className="px-6 xl:shrink-0 bg-resume-skills flex flex-row">
      <FontAwesomeIcon
        icon={IconService.getSolid(SolidIcon.FRONTEND)}
        fontSize={30}
        className="text-siteWhite my-auto text-md"
      ></FontAwesomeIcon>
      <h3 className="mb-0 text-md font-semibold tracking-wide text-siteWhite font-header uppercase p-3">
        Front-end
      </h3>
    </div>
  );

  const frontEndSkills = (
    <div className="frontend-container-skills-wrapper mt-2 px-4 xl:p-0">
      <details
        open
        className="p-2 border border-transparent open:border-black/10 open:bg-gray-100"
      >
        <summary
          id="1"
          className="font-header text-md leading-6 font-semibold text-primary select-none mb-4"
          onClick={(event) => toggleSkillSet(event)}
        >
          {`${skillSetOpen[1] ? "hide" : "show"} relevant skills`}
        </summary>
        <div className="flex flex-wrap">
          {contentItems[1].skillList.length > 0 &&
            contentItems[1].skillList.map((skill: Skill) => {
              return (
                <Badge
                  key={skill.refid}
                  variant={getBadgeVariantBySkillType(
                    skill.skill_types[0].name
                  )}
                  size={"xs"}
                  columns="fit"
                >
                  {skill.name}
                </Badge>
              );
            })}
        </div>
      </details>
    </div>
  );

  const databaseHeader = (
    <div className="px-6 xl:shrink-0 bg-resume-skills flex flex-row">
      <FontAwesomeIcon
        icon={IconService.getSolid(SolidIcon.DATABASE)}
        fontSize={30}
        className="text-siteWhite my-auto text-md"
      ></FontAwesomeIcon>
      <h3 className="mb-0 text-md font-semibold tracking-wide text-siteWhite font-header uppercase p-3">
        Database
      </h3>
    </div>
  );

  const databaseSkills = (
    <div className="database-container-skills-wrapper mt-2 px-4 xl:p-0">
      <details
        open
        className="p-2 border border-transparent open:border-black/10 open:bg-gray-100"
      >
        <summary
          id="2"
          className="font-header text-md leading-6 font-semibold text-primary select-none mb-4"
          onClick={(event) => toggleSkillSet(event)}
        >
          {`${skillSetOpen[2] ? "hide" : "show"} relevant skills`}
        </summary>
        <div className="flex flex-wrap">
          {contentItems[2].skillList.length > 0 &&
            contentItems[2].skillList.map((skill: Skill) => {
              return (
                <Badge
                  key={skill.refid}
                  variant={getBadgeVariantBySkillType(
                    skill.skill_types[0].name
                  )}
                  size={"xs"}
                  columns="fit"
                >
                  {skill.name}
                </Badge>
              );
            })}
        </div>
      </details>
    </div>
  );

  const designHeader = (
    <div className="px-6 xl:shrink-0 bg-resume-skills flex flex-row">
      <FontAwesomeIcon
        icon={IconService.getSolid(SolidIcon.DESIGN)}
        fontSize={30}
        className="text-siteWhite my-auto text-md"
      ></FontAwesomeIcon>
      <h3 className="mb-0 text-md font-semibold tracking-wide text-siteWhite font-header uppercase p-3">
        Design
      </h3>
    </div>
  );

  const designSkills = (
    <div className="design-container-skills-wrapper mt-2 px-4 xl:p-0">
      <details
        open
        className="p-2 border border-transparent open:border-black/10 open:bg-gray-100"
      >
        <summary
          id="3"
          className="font-header text-md leading-6 font-semibold text-primary select-none mb-4"
          onClick={(event) => toggleSkillSet(event)}
        >
          {`${skillSetOpen[3] ? "hide" : "show"} relevant skills`}
        </summary>
        <div className="flex flex-wrap">
          {contentItems[3].skillList.length > 0 &&
            contentItems[3].skillList.map((skill: Skill) => {
              return (
                <Badge
                  key={skill.refid}
                  variant={getBadgeVariantBySkillType(
                    skill.skill_types[0].name
                  )}
                  size={"xs"}
                  columns="fit"
                >
                  {skill.name}
                </Badge>
              );
            })}
        </div>
      </details>
    </div>
  );

  const infrastructureHeader = (
    <div className="px-6 xl:shrink-0 bg-resume-skills flex flex-row">
      <FontAwesomeIcon
        icon={IconService.getSolid(SolidIcon.INFRASTRUCTURE)}
        fontSize={30}
        className="text-siteWhite my-auto text-md"
      ></FontAwesomeIcon>
      <h3 className="mb-0 text-md font-semibold tracking-wide text-siteWhite font-header uppercase p-3">
        Infrastructure
      </h3>
    </div>
  );

  const infrastructureSkills = (
    <div className="infrastructure-container-skills-wrapper mt-2 px-4 xl:p-0">
      <details
        open
        className="p-2 border border-transparent open:border-black/10 open:bg-gray-100"
      >
        <summary
          id="4"
          className="font-header text-md leading-6 font-semibold text-primary select-none mb-4"
          onClick={(event) => toggleSkillSet(event)}
        >
          {`${skillSetOpen[4] ? "hide" : "show"} relevant skills`}
        </summary>
        <div className="flex flex-wrap">
          {contentItems[4].skillList.length > 0 &&
            contentItems[4].skillList.map((skill: Skill) => {
              return (
                <Badge
                  key={skill.refid}
                  variant={getBadgeVariantBySkillType(
                    skill.skill_types[0].name
                  )}
                  size={"xs"}
                  columns="fit"
                >
                  {skill.name}
                </Badge>
              );
            })}
        </div>
      </details>
    </div>
  );

  const softSkillsHeader = (
    <div className="px-6 xl:shrink-0 bg-resume-skills flex flex-row">
      <FontAwesomeIcon
        icon={IconService.getSolid(SolidIcon.SOFTSKILLS)}
        fontSize={30}
        className="text-siteWhite my-auto text-md"
      ></FontAwesomeIcon>
      <h3 className="mb-0 text-md font-semibold tracking-wide text-siteWhite font-header uppercase p-3">
        Soft Skills
      </h3>
    </div>
  );

  const softSkills = (
    <div className="softskills-container-skills-wrapper mt-2 px-4 xl:p-0">
      <details
        open
        className="p-2 border border-transparent open:border-black/10 open:bg-gray-100"
      >
        <summary
          id="5"
          className="font-header text-md leading-6 font-semibold text-primary select-none mb-4"
          onClick={(event) => toggleSkillSet(event)}
        >
          {`${skillSetOpen[5] ? "hide" : "show"} relevant skills`}
        </summary>
        <div className="flex flex-wrap">
          {contentItems[5].skillList.length > 0 &&
            contentItems[5].skillList.map((skill: Skill) => {
              return (
                <Badge
                  key={skill.refid}
                  variant={getBadgeVariantBySkillType(
                    skill.skill_types[0].name
                  )}
                  size={"xs"}
                  columns="fit"
                >
                  {skill.name}
                </Badge>
              );
            })}
        </div>
      </details>
    </div>
  );

  return (
    <>
      <div className="flex flex-col mx-auto max-w-[90%] lg:max-w-[70%]">
        <section id="skillsIntro" className="my-10">
          <article>
            <p className="text-siteBlack text-center">
              In the continuously changing world of technology, it is important
              to stay up to date with the skill-set that meets the demands of
              the modern workplace. Punchcode Studios answers this call by
              continuously evolving in its tech stack, while still recognizing
              the need to support the established workflows still in existence.
            </p>
          </article>
        </section>
      </div>

      <div className="flex flex-col mx-auto xl:max-w-[90%]">
        <section id="mainSkillsContent">
          <div className="flex flex-col mx-auto overflow:hidden xl:flex-row xl:flex-wrap xl:justify-between">
            <div className="backend-container py-10 border-b-2 border-gray-400 mb-5 xl:w-full">
              <CallToActionLeft
                title={backEndHeader}
                imageUrl="/images/skills_backend.png"
                imageAlt="an image indicating backend development"
                tagLine="Back-end development is the server-side of an application and everything that communicates between the database and the browser."
                text="Punchcode Studios has a strong foundation in back-end development, with experience in a variety of languages and frameworks. We are committed to building robust, scalable, and secure back-end systems that power modern applications."
              >
                {backEndSkills}
              </CallToActionLeft>
            </div>

            <div className="frontend-container py-10 border-b-2 border-gray-400 mb-5 xl:w-full">
              <CallToActionRight
                title={frontEndHeader}
                imageUrl="/images/skills_frontend.png"
                imageAlt="an image indicating front-end development"
                tagLine="Front-end development is the client-side of an application and everything that communicates between the user and the server."
                text="Punchcode Studios has a strong foundation in front-end development, with experience in a variety of languages and frameworks. We are committed to building responsive, user-friendly interfaces that enhance the user experience."
              >
                {frontEndSkills}
              </CallToActionRight>
            </div>

            <div className="database-container py-10 border-b-2 border-gray-400 mb-5 xl:w-full">
              <CallToActionLeft
                title={databaseHeader}
                imageUrl="/images/skills_database.png"
                imageAlt="an image indicating database development"
                tagLine="Database development is the server-side of an application and everything that communicates between the database and the browser."
                text="Punchcode Studios has a strong foundation in database development, with experience in a variety of languages and frameworks. We are committed to building robust, scalable, and secure database systems that power modern applications."
              >
                {databaseSkills}
              </CallToActionLeft>
            </div>

            <div className="design-container py-10 border-b-2 border-gray-400 mb-5 xl:w-full">
              <CallToActionRight
                title={designHeader}
                imageUrl="/images/skills_design.png"
                imageAlt="an image indicating front-end development"
                tagLine="Design is the client-side of an application and everything that communicates between the user and the server."
                text="Punchcode Studios has a strong foundation in design, with experience in a variety of languages and frameworks. We are committed to building responsive, user-friendly interfaces that enhance the user experience."
              >
                {designSkills}
              </CallToActionRight>
            </div>

            <div className="infrastructure-container py-10 border-b-2 border-gray-400 mb-5 xl:w-full">
              <CallToActionLeft
                title={infrastructureHeader}
                imageUrl="/images/skills_infrastructure.png"
                imageAlt="an image indicating infrastructure development"
                tagLine="Infrastructure development is the backbone of an application and everything that communicates between the servers and the database."
                text="Punchcode Studios has a strong foundation in infrastructure development, with experience in a variety of languages and frameworks. We are committed to building robust, scalable, and secure infrastructure systems that power modern applications."
              >
                {infrastructureSkills}
              </CallToActionLeft>
            </div>

            <div className="softskills-container py-10 mb-5 xl:w-full">
              <CallToActionRight
                title={softSkillsHeader}
                imageUrl="/images/skills_soft.png"
                imageAlt="an image indicating soft skills"
                tagLine="Soft skills are the interpersonal skills that help you communicate and collaborate effectively with others."
                text="Punchcode Studios values soft skills as much as technical skills. We believe that strong communication, teamwork, and problem-solving abilities are essential for success in any project."
              >
                {softSkills}
              </CallToActionRight>
            </div>
          </div>
        </section>
        <section id="skillsFooter" className="my-40">
          <article>
            <Link to="/resume/experience" className="text-center">
              <Button
                variant="primary"
                size="wide"
                className="mx-auto block"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Whats next
              </Button>
            </Link>
          </article>
        </section>
      </div>
    </>
  );
};
export default Skills;

export function ErrorBoundary() {
  return <GenericErrorBoundary></GenericErrorBoundary>;
}
