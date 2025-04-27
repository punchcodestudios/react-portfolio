import type { Route } from "./+types/skills";

import resumeService from "~/service/resume-service";
import type {
  ResumeResponse,
  Skill,
  SkillRequest,
  SkillResponse,
} from "~/entities/resume";
// import SkillsContent from "../components/resume/skills-content";
import { SolidIcon } from "~/utils/enums";
import GenericErrorBoundary from "~/components/ui/error-boundary";
import ApiError from "~/components/errors/api-error";
import { Button } from "~/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconService from "~/service/icon-service";
import { TechBadge } from "~/components/ui/tech-badge";

export interface SkillContentItem {
  skillList: Skill[];
  iconType: SolidIcon;
}

export async function loader({ params }: Route.LoaderArgs) {
  // const request: SkillRequest = { params: { skillsExclude: [] } };
  // const skillsData = await resumeService.getAllSkills(request);
  // return { ...skillsData };
}

export async function action({ request }: Route.ActionArgs) {
  // just an example for when i need to submit forms
  // const formData = await request.formData();
  // const a = formData.get("textboxA");
  // if (typeof a !== "string") {
  //   throw new Response("must be a string", { status: 400 });
  // }
}

// const Skills = ({ loaderData }: Route.ComponentProps) => {
const Skills = () => {
  // if (!loaderData.meta.success) {
  //   return <ApiError error={loaderData.error}></ApiError>;
  // }

  // if (!loaderData.target) {
  //   return null;
  // }

  function filterSkills() {
    let backendItems: SkillContentItem;
    let frontendItems: SkillContentItem;
    let infrastructureItems: SkillContentItem;
    let databaseItems: SkillContentItem;
    let designItems: SkillContentItem;
    let softSkillsItems: SkillContentItem;

    backendItems = {
      iconType: SolidIcon.BACKEND,
      skillList: [] as Skill[],
      // loaderData.target.filter(
      //   (d: Skill) =>
      //     d.skill_types[0].name.toLowerCase() === "back end development"
      // ) || ([] as Skill[]),
    };

    frontendItems = {
      iconType: SolidIcon.FRONTEND,
      skillList: [] as Skill[],
      // loaderData.target.filter(
      //   (d: Skill) =>
      //     d.skill_types[0].name.toLowerCase() === "front end development"
      // ) || ([] as Skill[]),
    };

    databaseItems = {
      iconType: SolidIcon.DATABASE,
      skillList: [] as Skill[],
      // loaderData.target.filter(
      //   (d: Skill) => d.skill_types[0].name.toLowerCase() === "database"
      // ) || ([] as Skill[]),
    };

    infrastructureItems = {
      iconType: SolidIcon.INFRASTRUCTURE,
      skillList: [] as Skill[],
      // loaderData.target.filter(
      //   (d: Skill) => d.skill_types[0].name.toLowerCase() === "infrastructure"
      // ) || ([] as Skill[]),
    };

    designItems = {
      iconType: SolidIcon.DESIGN,
      skillList: [] as Skill[],
      // loaderData.target.filter(
      //   (d: Skill) => d.skill_types[0].name.toLowerCase() === "design"
      // ) || ([] as Skill[]),
    };

    softSkillsItems = {
      iconType: SolidIcon.SOFTSKILLS,
      skillList: [] as Skill[],
      // loaderData.target.filter(
      //   (d: Skill) => d.skill_types[0].name.toLowerCase() === "soft skills"
      // ) || ([] as Skill[]),
    };

    return [
      backendItems,
      frontendItems,
      databaseItems,
      infrastructureItems,
      designItems,
      softSkillsItems,
    ];
  }

  const contentItems = filterSkills();

  return (
    <div className="flex-flex-col mx-auto max-w-[90%] lg:max-w-[70%]">
      <div className="flex flex-col mx-auto">
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

        <section id="mainSkillsContent">
          <div className="flex flex-col mx-auto overflow:hidden xl:flex-row xl:flex-wrap xl:justify-between">
            <article id="backendSkills" className="mb-5 xl:w-[45%]">
              <div className="flex flex-col">
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
                <div className="px-6 xl:p-0 xl:px-5">
                  <div className="my-4 flex flex-row flex-wrap justify-between">
                    {contentItems[0].skillList?.map((item) => {
                      return (
                        <div className="min-w-[45%]">
                          <TechBadge
                            text={item.name}
                            key={item.refid}
                          ></TechBadge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>

            <article id="frontendSkills" className="mb-5 xl:w-[45%]">
              <div className="flex flex-col">
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
                <div className="px-6 xl:p-0 xl:px-5">
                  <div className="my-4 flex flex-row flex-wrap justify-between">
                    {contentItems[1].skillList?.map((item) => {
                      return (
                        <div className="min-w-[45%]">
                          <TechBadge
                            text={item.name}
                            key={item.refid}
                          ></TechBadge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>

            <article id="databaseSkills" className="mb-5 xl:w-[45%]">
              <div className="flex flex-col">
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
                <div className="px-6 xl:p-0 xl:px-5">
                  <div className="my-4 flex flex-row flex-wrap justify-between">
                    {contentItems[2].skillList?.map((item) => {
                      return (
                        <div className="min-w-[45%]">
                          <TechBadge
                            text={item.name}
                            key={item.refid}
                          ></TechBadge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>

            <article id="designSkills" className="mb-5 xl:w-[45%]">
              <div className="flex flex-col">
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
                <div className="px-6 xl:p-0 xl:px-5">
                  <div className="my-4 flex flex-row flex-wrap justify-between">
                    {contentItems[4].skillList?.map((item) => {
                      return (
                        <div className="min-w-[45%]">
                          <TechBadge
                            text={item.name}
                            key={item.refid}
                          ></TechBadge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>

            <article id="infrastructureSkills" className="mb-5 xl:w-[45%]">
              <div className="flex flex-col">
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
                <div className="px-6 xl:p-0 xl:px-5">
                  <div className="my-4 flex flex-row flex-wrap justify-between">
                    {contentItems[3].skillList?.map((item) => {
                      return (
                        <div className="min-w-[45%]">
                          <TechBadge
                            text={item.name}
                            key={item.refid}
                          ></TechBadge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>

            <article id="softSkills" className="mb-5 xl:w-[45%]">
              <div className="flex flex-col">
                <div className="px-6 xl:shrink-0 bg-resume-skills flex flex-row">
                  <FontAwesomeIcon
                    icon={IconService.getSolid(SolidIcon.SOFTSKILLS)}
                    fontSize={30}
                    className="text-siteWhite my-auto text-md"
                  ></FontAwesomeIcon>
                  <h3 className="mb-0 text-md font-semibold tracking-wide text-siteWhite font-header uppercase p-3">
                    Soft
                  </h3>
                </div>
                <div className="px-6 xl:p-0 xl:px-5">
                  <div className="my-4 flex flex-row flex-wrap justify-between">
                    {contentItems[5].skillList?.map((item) => {
                      return (
                        <div className="min-w-[45%]">
                          <TechBadge
                            text={item.name}
                            key={item.refid}
                          ></TechBadge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
};

// )
// return (
//   <>
//     {contentItems.map((items, index) => {
//       return (
//         <SkillsContent
//           key={index}
//           items={items.skillList}
//           iconType={items.iconType}
//           textClass={"text-primaryLight"}
//         ></SkillsContent>
//       );
//     })}
//   </>
// );
// };

export default Skills;

export function ErrorBoundary() {
  return <GenericErrorBoundary></GenericErrorBoundary>;
}
