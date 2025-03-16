import resumeService from "~/service/resume-service";
import type { Route } from "./+types/skills";
import type { Skill, SkillRequest } from "~/entities/resume";
import SkillsContent from "~/components/resume/skills-content.component";
import { SolidIcon } from "~/utils/enums";
import GenericErrorBoundary from "~/components/ui/error-boundary";
import ApiError from "~/components/errors/api-error";

export interface SkillContentItem {
  skillList: Skill[];
  iconType: SolidIcon;
}

export async function loader({ params }: Route.LoaderArgs) {
  const request: SkillRequest = { params: { skillsExclude: [] } };
  const skillsData = await resumeService.getAllSkills(request);
  return { ...skillsData };
}

export async function action({ request }: Route.ActionArgs) {
  // just an example for when i need to submit forms
  const formData = await request.formData();
  const a = formData.get("textboxA");

  if (typeof a !== "string") {
    throw new Response("must be a string", { status: 400 });
  }
}

const Skills = ({ loaderData }: Route.ComponentProps) => {
  if (!loaderData.meta.success) {
    return <ApiError error={loaderData.error}></ApiError>;
  }

  if (!loaderData.target) {
    return null;
  }

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
    <>
      {contentItems.map((items, index) => {
        return (
          <SkillsContent
            key={index}
            items={items.skillList}
            iconType={items.iconType}
            textClass={"text-primaryLight"}
          ></SkillsContent>
        );
      })}
    </>
  );
};

export default Skills;

export function ErrorBoundary() {
  return <GenericErrorBoundary></GenericErrorBoundary>;
}
