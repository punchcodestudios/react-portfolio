import { Button } from "~/components/ui/button";
import type { Route } from "./+types/about";
import planningImage from "/images/callout-planning.png";
import requirementsImage from "/images/callout-requirements.png";
import designImage from "/images/callout-design.png";
import codingImage from "/images/callout-coding.png";
import testingImage from "/images/callout-testing.png";
import deploymentImage from "/images/callout-deployment.png";
import maintenanceImage from "/images/callout-maintenance.png";
import {
  isRouteErrorResponse,
  redirect,
  useLoaderData,
  useLocation,
  useRouteError,
  type ActionFunctionArgs,
  type ClientActionFunctionArgs,
} from "react-router";
import { toastSessionStorage } from "~/utils/toast.server";
import useImage from "~/hooks/useImage";
import HeaderImage from "~/components/layout/header-image";
import { useState } from "react";
import type { Skill, SkillRequest } from "~/entities/resume";
import resumeService from "~/service/resume-service";
import { Badge } from "~/components/ui/badge";
import GenericErrorBoundary from "~/components/ui/error-boundary";

export async function loader({ params }: Route.LoaderArgs) {
  const request: SkillRequest = {
    params: { skillsExclude: [], slug: "" },
  };
  const skillsData = await resumeService.getAllSkills(request);
  if (skillsData.meta.total > 0) {
    const planningSkills = skillsData.target.filter((s) =>
      s.slug.includes("planning")
    );
    const requirementsSkills = skillsData.target.filter((s) =>
      s.slug.includes("requirements")
    );
    const designSkills = skillsData.target.filter((s) =>
      s.slug.includes("design")
    );
    const codingSkills = skillsData.target.filter((s) =>
      s.slug.includes("coding")
    );
    const testingSkills = skillsData.target.filter((s) =>
      s.slug.includes("testing")
    );
    const deploymentSkills = skillsData.target.filter((s) =>
      s.slug.includes("deployment")
    );
    const maintenanceSkills = skillsData.target.filter((s) =>
      s.slug.includes("maintenance")
    );
    return {
      planningSkills: [...planningSkills],
      requirementsSkills: [...requirementsSkills],
      designSkills: [...designSkills],
      codingSkills: [...codingSkills],
      testingSkills: [...testingSkills],
      deploymentSkills: [...deploymentSkills],
      maintenanceSkills: [...maintenanceSkills],
    };
  }
  return {};
}

export async function action({ request, params }: ActionFunctionArgs) {
  const toastCookieSession = await toastSessionStorage.getSession(
    request.headers.get("cookie")
  );
  toastCookieSession.set("toast", {
    type: "success",
    title: "Toast Updated",
    description: "This is the description for the toast",
  });

  return redirect("/", {
    headers: {
      "Set-Cookie": await toastSessionStorage.commitSession(toastCookieSession),
    },
  });
}

export async function clientAction({
  request,
  params,
}: ClientActionFunctionArgs) {}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Punchcode Studios | Portfolio" },
    {
      name: "description",
      content:
        "Porfolio project showcasing React Development for PunchcodeStudios design company",
    },
  ];
}

export default function About() {
  const location = useLocation();
  const headerImage = useImage({ path: location.pathname });
  const {
    planningSkills,
    requirementsSkills,
    designSkills,
    codingSkills,
    deploymentSkills,
    testingSkills,
    maintenanceSkills,
  } = useLoaderData();

  function handleToast() {
    // console.log("handle toast");
  }

  const [skillSetClosed, setSkillSetClosed] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const toggleSkillSet = (event: React.MouseEvent<HTMLElement>) => {
    const updated = [...skillSetClosed];
    updated[+event.currentTarget?.id] =
      !skillSetClosed[+event.currentTarget?.id];
    setSkillSetClosed(updated);
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

  return (
    <div className="">
      {headerImage && <HeaderImage headerImage={headerImage}></HeaderImage>}
      <div>
        <div className="flex flex-col mx-auto p-6 pb-0">
          <div className="mx-auto min-h-[50px] max-w-[90%] lg:max-w-[70%]">
            <div className="xl:flex xl:flex-col">
              <h1 className="font-header text-secondary">mission statement</h1>
              <p className="text-siteBlack text-center md:text-start">
                To deliver reliable software that provides long term solutions
                to business or personal needs, while adhering to budget and time
                constraints.
              </p>
              <p className="text-siteBlack text-center mt-2 md:text-start ">
                Punchcode Studios excels in every stage of the Systems
                Development Lifecycle (SDLC). By following the structured
                approach outlined below, Punchcode Studios has achieved a proven
                track record of delivering high-quality software that meets or
                exceeds initial expectations in a timely and cost-effecitve
                manner.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Planning */}
      <div className="flex flex-col mx-auto my-5 p-6 border-b border-slate-600 xl:flex-row xl:flex-wrap xl:justify-between xl:p-20">
        <div className="mx-auto max-w-full overflow-hidden xl:max-w-[90%] 2xl-max-w-[70%]">
          <div className="xl:flex">
            <div className="px-6 xl:p-0 xl:shrink-0">
              <img
                className="h-32 w-full object-cover xl:w-96 xl:h-full"
                src={planningImage}
                alt=""
              />
            </div>
            <div className="px-6 xl:p-0 mt-2 xl:px-5 xl:mt-0">
              <div className="mb-3 xl:w-120">
                <h2 className="text-md font-semibold tracking-wide text-primary font-header uppercase">
                  Planning
                </h2>
                <p className="mt-1 block text-xl leading-tight font-medium text-black">
                  Every success begins with a successful plan
                </p>
                <p className="my-4 text-gray-500">
                  The first stage in the process is where initial expectations
                  are defined, including overall goals and high-level
                  requirements. A feasiblity analysis is completed to determine
                  the project scope as well as a timeline for deliverables.
                  Punchcode Studios is able to provide valuable input at this
                  stage to ensure a realistic plan for the execution of the
                  following phases in the cycle.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2 px-4 xl:p-0">
            <details className="p-2 border border-transparent open:border-black/10 open:bg-gray-100">
              <summary
                id="0"
                className="font-header text-md leading-6 font-semibold text-primary select-none mb-4"
                onClick={(event) => toggleSkillSet(event)}
              >
                {`${skillSetClosed[0] ? "hide" : "show"} relevant skills`}
              </summary>
              <div className="flex flex-wrap">
                {planningSkills.length > 0 &&
                  planningSkills.length > 0 &&
                  planningSkills.map((skill: Skill) => {
                    return (
                      <Badge
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
        </div>
      </div>

      {/* Requirements */}
      <div className="flex flex-col mx-auto my-5 p-6 border-b border-slate-600 xl:flex-row xl:flex-wrap xl:justify-between xl:p-20 ">
        <div className="mx-auto max-w-full overflow-hidden xl:max-w-[90%] 2xl-max-w-[70%]">
          <div className="flex flex-col-reverse xl:flex-row">
            <div className="px-6 xl:p-0 mt-3 xl:pe-5 xl:mt-0">
              <div className="xl:w-120">
                <h2 className="text-md font-semibold tracking-wide text-primary font-header uppercase">
                  Requirements Gathering
                </h2>
                <p className="mt-1 block text-xl leading-tight font-medium text-black">
                  A requirement to a successful project
                </p>
                <p className="my-4 text-gray-500">
                  During this phase, Punchcode Studios collaborates with
                  stakeholders to determine their needs as well as the needs of
                  any additional users. The deliverable for this phase is a set
                  of functional and non-functional documents that clearly
                  illustrate the expecations of the software.
                </p>
              </div>
            </div>
            <div className="px-6 xl:p-0 xl:shrink-0">
              <img
                className="h-32 w-full object-cover xl:w-96 xl:h-full"
                src={requirementsImage}
                alt="Modern building architecture"
              />
            </div>
          </div>
          <div className="mt-2 px-4 xl:p-0">
            <details className="p-2 border border-transparent open:border-black/10 open:bg-gray-100">
              <summary
                id="1"
                className="font-header text-md leading-6 font-semibold text-primary select-none mb-4"
                onClick={(event) => toggleSkillSet(event)}
              >
                {`${skillSetClosed[1] ? "hide" : "show"} relevant skills`}
              </summary>
              <div className="flex flex-wrap">
                {requirementsSkills.length > 0 &&
                  requirementsSkills.length > 0 &&
                  requirementsSkills.map((skill: Skill) => {
                    return (
                      <Badge
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
        </div>
      </div>

      {/* Design */}
      <div className="flex flex-col mx-auto my-5 p-6 border-b border-slate-600 xl:flex-row xl:flex-wrap xl:justify-between xl:p-20">
        <div className="mx-auto max-w-full overflow-hidden xl:max-w-[90%] 2xl-max-w-[70%]">
          <div className="xl:flex">
            <div className="px-6 xl:p-0 xl:shrink-0">
              <img
                className="h-32 w-full object-cover xl:w-96 xl:h-full"
                src={designImage}
                alt="Modern building architecture"
              />
            </div>
            <div className="p-6 xl:p-0 mt-2 xl:px-5 xl:mt-0">
              <div className="mb-3 xl:w-120">
                <h2 className="text-md font-semibold tracking-wide text-primary font-header uppercase">
                  Design
                </h2>
                <p className="mt-1 block text-xl leading-tight font-medium text-black">
                  Impactful Design makes a lasting impression
                </p>
                <p className="my-4 text-gray-500">
                  This stage is focused on deciding how the software will be
                  implemented. Consideration is given for architectural and
                  component composition as well as the look and feel of the user
                  interface (UI). Punchcode Studios has extensive experience in
                  creating and adhering to the deliverables from this phase
                  which include comprehensive design documents such as style
                  guides, flowcharts and story boards.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2 px-4 xl:p-0">
            <details className="p-2 border border-transparent open:border-black/10 open:bg-gray-100">
              <summary
                id="2"
                className="font-header text-md leading-6 font-semibold text-primary select-none mb-4"
                onClick={(event) => toggleSkillSet(event)}
              >
                {`${skillSetClosed[2] ? "hide" : "show"} relevant skills`}
              </summary>
              <div className="flex flex-wrap">
                {designSkills.length > 0 &&
                  designSkills.length > 0 &&
                  designSkills.map((skill: Skill) => {
                    return (
                      <Badge
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
        </div>
      </div>

      {/* Coding */}
      <div className="flex flex-col mx-auto my-5 p-6 border-b border-slate-600 xl:flex-row xl:flex-wrap xl:justify-between xl:p-20 ">
        <div className="mx-auto max-w-full overflow-hidden xl:max-w-[90%] 2xl-max-w-[70%]">
          <div className="flex flex-col-reverse xl:flex-row">
            <div className="p-6 xl:p-0 mt-3 xl:pe-5 xl:mt-0">
              <div className="mb-3 xl:w-120">
                <h2 className="text-md font-semibold tracking-wide text-primary font-header uppercase">
                  Coding
                </h2>
                <p className="mt-1 block text-xl leading-tight font-medium text-black">
                  Good code is driven by a passion for elegant simplicity
                </p>
                <p className="my-4 text-gray-500">
                  The deliverable for this phase is a fully functional software
                  solution that complies with the previously defined
                  requirements and client expectations. Punchcode Studios
                  dedicates more than 15 years experience and passion for
                  software development towards implementing high quality
                  software solutions. Punchcode Studios has a proven track
                  record of providing tangible solutions that meet or exceed
                  timeline, budget and end-user experience expectations.
                </p>
              </div>
            </div>
            <div className="px-6 xl:p-0 xl:shrink-0">
              <img
                className="h-32 w-full object-cover xl:w-96 xl:h-full"
                src={codingImage}
                alt="Modern building architecture"
              />
            </div>
          </div>
          <div className="mt-2 px-4 xl:p-0">
            <details className="p-2 border border-transparent open:border-black/10 open:bg-gray-100">
              <summary
                id="3"
                className="font-header text-md leading-6 font-semibold text-primary select-none mb-4"
                onClick={(event) => toggleSkillSet(event)}
              >
                {`${skillSetClosed[3] ? "hide" : "show"} relevant skills`}
              </summary>
              <div className="flex flex-wrap">
                {codingSkills.length > 0 &&
                  codingSkills.length > 0 &&
                  codingSkills.map((skill: Skill) => {
                    return (
                      <Badge
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
        </div>
      </div>

      {/* Testing */}
      <div className="flex flex-col mx-auto my-5 p-6 border-b border-slate-600 xl:flex-row xl:flex-wrap xl:justify-between xl:p-20">
        <div className="mx-auto max-w-full overflow-hidden xl:max-w-[90%] 2xl-max-w-[70%]">
          <div className="xl:flex">
            <div className="px-6 xl:p-0 xl:shrink-0">
              <img
                className="h-32 w-full object-cover xl:w-96 xl:h-full"
                src={testingImage}
                alt="Modern building architecture"
              />
            </div>
            <div className="p-6 xl:p-0 mt-2 xl:px-5 xl:mt-0">
              <div className="mb-3 xl:w-120">
                <h2 className="text-md font-semibold tracking-wide text-primary font-header uppercase">
                  Testing
                </h2>
                <p className="mt-1 block text-xl leading-tight font-medium text-black">
                  All code is as good as its testing
                </p>
                <p className="my-4 text-gray-500">
                  During this phase, the software is put through extensive
                  testing to ensure a high quality product is ultimately
                  deployed to the end user. Punchcode Studios has extensive
                  experience with various testing frameworks and methodologies
                  including automated unit and functional testing used to
                  minimize potential risk introduced with future development and
                  promote proper quality assurance (QA) resource managment.
                  Punchcode Studios efficiently provides solutions to issues
                  found during third-party QA testing with minimal amounts of
                  rework.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2 px-4 xl:p-0">
            <details className="p-2 border border-transparent open:border-black/10 open:bg-gray-100">
              <summary
                id="4"
                className="font-header text-md leading-6 font-semibold text-primary select-none mb-4"
                onClick={(event) => toggleSkillSet(event)}
              >
                {`${skillSetClosed[4] ? "hide" : "show"} relevant skills`}
              </summary>
              <div className="flex flex-wrap">
                {testingSkills.length > 0 &&
                  testingSkills.length > 0 &&
                  testingSkills.map((skill: Skill) => {
                    return (
                      <Badge
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
        </div>
      </div>

      {/* Deployment */}
      <div className="flex flex-col mx-auto my-5 p-6 border-b border-slate-600 xl:flex-row xl:flex-wrap xl:justify-between xl:p-20 ">
        <div className="mx-auto max-w-full overflow-hidden xl:max-w-[90%] 2xl-max-w-[70%]">
          <div className="flex flex-col-reverse xl:flex-row">
            <div className="p-6 xl:p-0 mt-3 xl:pe-5 xl:mt-0">
              <div className="mb-3 xl:w-120">
                <h2 className="text-md font-semibold tracking-wide text-primary font-header uppercase">
                  Deployment
                </h2>
                <p className="mt-1 block text-xl leading-tight font-medium text-black">
                  A perfect deployment is one that goes unnoticed
                </p>
                <p className="my-4 text-gray-500">
                  During this phase, the software is now delivered to the end
                  user. Either utilizing modern deployment strategies such as
                  Continuous Integration / Continuous Deployment (CI/CD) or
                  incorporating legacy strategies such as manual SFTP
                  deployment, Punchcode Studios has reliably and consistently
                  deployed applications to production environments with little
                  to no downtime.
                </p>
              </div>
            </div>
            <div className="px-6 xl:p-0 xl:shrink-0">
              <img
                className="h-32 w-full object-cover xl:w-96 xl:h-full"
                src={deploymentImage}
                alt="Modern building architecture"
              />
            </div>
          </div>

          <div className="mt-2 px-4 xl:p-0">
            <details className="p-2 border border-transparent open:border-black/10 open:bg-gray-100">
              <summary
                id="5"
                className="font-header text-md leading-6 font-semibold text-primary select-none mb-4"
                onClick={(event) => toggleSkillSet(event)}
              >
                {`${skillSetClosed[5] ? "hide" : "show"} relevant skills`}
              </summary>
              <div className="flex flex-wrap">
                {deploymentSkills.length > 0 &&
                  deploymentSkills.length > 0 &&
                  deploymentSkills.map((skill: Skill) => {
                    return (
                      <Badge
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
        </div>
      </div>

      {/* Maintenance */}
      <div className="flex flex-col mx-auto my-5 p-6 xl:flex-row xl:flex-wrap xl:justify-between xl:p-20">
        <div className="mx-auto max-w-full overflow-hidden xl:max-w-[90%] 2xl-max-w-[70%]">
          <div className="xl:flex">
            <div className="px-6 xl:p-0 xl:shrink-0">
              <img
                className="h-32 w-full object-cover xl:w-96 xl:h-full"
                src={maintenanceImage}
                alt="Modern building architecture"
              />
            </div>
            <div className="p-6 xl:p-0 mt-2 xl:px-5 xl:mt-0">
              <div className="mb-3 xl:w-120">
                <h2 className="text-md font-semibold tracking-wide text-primary font-header uppercase">
                  Maintenance
                </h2>
                <p className="mt-1 block text-xl leading-tight font-medium text-black">
                  An investment in maintainable code today pays dividends
                  tomorrow
                </p>
                <p className="my-4 text-gray-500">
                  Any issues that are discovered through end-user experiences
                  are addressed during this phase. This phase also allows
                  consideration for any enhancements or changes to initial
                  requirements not previously addressed during the previous
                  phases. Often under this circumstance, the SDLC begins again
                  at the first step. Punchcode Studios demostrates the ability
                  to efficiently and effectively address any issues discovered
                  post-deployment and will reliably offer a solution that will
                  remediate any adverse side effects, as well as implement
                  preventative measures to ensure a comprehensive solution is
                  achieved.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-2 px-4 xl:p-0">
            <details className="p-2 border border-transparent open:border-black/10 open:bg-gray-100">
              <summary
                id="6"
                className="font-header text-md leading-6 font-semibold text-primary select-none mb-4"
                onClick={(event) => toggleSkillSet(event)}
              >
                {`${skillSetClosed[6] ? "hide" : "show"} relevant skills`}
              </summary>
              <div className="flex flex-wrap">
                {maintenanceSkills.length > 0 &&
                  maintenanceSkills.length > 0 &&
                  maintenanceSkills.map((skill: Skill) => {
                    return (
                      <Badge
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
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return <GenericErrorBoundary></GenericErrorBoundary>;
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export function HydrateFallback() {
  return <p>Loading....</p>;
}

export function links() {
  return [{ rel: "preload", href: "/assets/img_fullpng/about-this-site.png" }];
}
