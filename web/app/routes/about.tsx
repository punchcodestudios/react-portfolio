import { Button } from "~/components/ui/button";
import type { Route } from "./+types/home";
import planningImage from "/static/img_fullpng/callout-planning.png";
import requirementsImage from "/static/img_fullpng/callout-requirements.png";
import designImage from "/static/img_fullpng/callout-design.png";
import codingImage from "/static/img_fullpng/callout-coding.png";
import testingImage from "/static/img_fullpng/callout-testing.png";
import deploymentImage from "/static/img_fullpng/callout-deployment.png";
import maintenanceImage from "/static/img_fullpng/callout-maintenance.png";
import {
  redirect,
  useLocation,
  type ActionFunctionArgs,
  type ClientActionFunctionArgs,
} from "react-router";
import { toastSessionStorage } from "~/utils/toast.server";
import useImage from "~/hooks/useImage";
import HeaderImage from "~/components/layout/header-image.component";
import { useState } from "react";

export async function loader() {
  // throw new Response("Error Message from API", { status: 405 });
}
export async function clientLoader() {
  return { title: About };
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

  function handleToast() {
    console.log("handle toast");
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

  return (
    <div className="flex-flex-col">
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
          {/* <div className="px-6 md:flex md:flex-row xl:p-0">
            <Button
              variant={"secondary"}
              className="my-2 w-full md:mb-0 md:me-2"
            >
              Download project scope
            </Button>
            <Button
              variant={"secondary"}
              className="my-2 w-full md:mb-0 md:ms-2"
            >
              Learn More {">>"}
            </Button>
          </div> */}
          <div className="mt-2 px-4 xl:p-0">
            <details className="p-2 border border-transparent open:border-black/10 open:bg-gray-100">
              <summary
                id="0"
                className="font-header text-md leading-6 font-semibold text-primary select-none"
                onClick={(event) => toggleSkillSet(event)}
              >
                {`${skillSetClosed[0] ? "hide" : "show"} relevant skills`}
              </summary>
              <div className="mt-3 leading-6 text-gray-600">
                <p>
                  The mug is round. The jar is round. They should call it
                  Roundtine.
                </p>
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
                <a
                  href="#"
                  className="mt-1 block text-xl leading-tight font-medium text-black hover:underline"
                >
                  A requirement to a successful project
                </a>
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
          {/* <div className="px-6 md:flex md:flex-row xl:p-0">
            <Button
              variant={"secondary"}
              className="my-2 w-full md:mb-0 md:me-2"
            >
              Download Technical specs
            </Button>
            <Button
              variant={"secondary"}
              className="my-2 w-full md:mb-0 md:ms-2"
            >
              Download Requirements Document
            </Button>
          </div> */}
          <div className="mt-2 px-4 xl:p-0">
            <details className="p-2 border border-transparent open:border-black/10 open:bg-gray-100">
              <summary
                id="1"
                className="font-header text-md leading-6 font-semibold text-primary select-none"
                onClick={(event) => toggleSkillSet(event)}
              >
                {`${skillSetClosed[1] ? "hide" : "show"} relevant skills`}
              </summary>
              <div className="mt-3 leading-6 text-gray-600">
                <p>
                  The mug is round. The jar is round. They should call it
                  Roundtine.
                </p>
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
          {/* <div className="px-6 md:flex md:flex-row xl:p-0">
            <Button
              variant={"secondary"}
              className="my-2 w-full md:mb-0 md:me-2"
            >
              Download Technical Specs
            </Button>
            <Button
              variant={"secondary"}
              className="my-2 w-full md:mb-0 md:ms-2"
            >
              Learn More {">>"}
            </Button>
          </div> */}
          <div className="mt-2 px-4 xl:p-0">
            <details className="p-2 border border-transparent open:border-black/10 open:bg-gray-100">
              <summary
                id="2"
                className="font-header text-md leading-6 font-semibold text-primary select-none"
                onClick={(event) => toggleSkillSet(event)}
              >
                {`${skillSetClosed[2] ? "hide" : "show"} relevant skills`}
              </summary>
              <div className="mt-3 leading-6 text-gray-600">
                <p>
                  The mug is round. The jar is round. They should call it
                  Roundtine.
                </p>
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
                <a
                  href="#"
                  className="mt-1 block text-xl leading-tight font-medium text-black hover:underline"
                >
                  Good code is driven by a passion for elegant simplicity
                </a>
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
          {/* <div className="px-6 md:flex md:flex-row xl:p-0">
            <Button
              variant={"secondary"}
              className="my-2 w-full md:mb-0 md:me-2"
            >
              Download Technical Specs
            </Button>
            <Button
              variant={"secondary"}
              className="my-2 w-full md:mb-0 md:ms-2"
            >
              Learn More {">>"}
            </Button>
          </div> */}
          <div className="mt-2 px-4 xl:p-0">
            <details className="p-2 border border-transparent open:border-black/10 open:bg-gray-100">
              <summary
                id="3"
                className="font-header text-md leading-6 font-semibold text-primary select-none"
                onClick={(event) => toggleSkillSet(event)}
              >
                {`${skillSetClosed[3] ? "hide" : "show"} relevant skills`}
              </summary>
              <div className="mt-3 leading-6 text-gray-600">
                <p>
                  The mug is round. The jar is round. They should call it
                  Roundtine.
                </p>
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
          {/* <div className="px-6 md:flex md:flex-row xl:p-0">
            <Button
              variant={"secondary"}
              className="my-2 w-full md:mb-0 md:me-2"
            >
              Download Technical Specs
            </Button>
            <Button
              variant={"secondary"}
              className="my-2 w-full md:mb-0 md:ms-2"
            >
              Learn More {">>"}
            </Button>
          </div> */}
          <div className="mt-2 px-4 xl:p-0">
            <details className="p-2 border border-transparent open:border-black/10 open:bg-gray-100">
              <summary
                id="4"
                className="font-header text-md leading-6 font-semibold text-primary select-none"
                onClick={(event) => toggleSkillSet(event)}
              >
                {`${skillSetClosed[4] ? "hide" : "show"} relevant skills`}
              </summary>
              <div className="mt-3 leading-6 text-gray-600">
                <p>
                  The mug is round. The jar is round. They should call it
                  Roundtine.
                </p>
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
                <a
                  href="#"
                  className="mt-1 block text-xl leading-tight font-medium text-black hover:underline"
                >
                  A perfect deployment is one that goes unnoticed
                </a>
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
          {/* <div className="px-6 md:flex md:flex-row xl:p-0">
            <Button
              variant={"secondary"}
              className="my-2 w-full md:mb-0 md:me-2"
            >
              Download Technical Specs
            </Button>
            <Button
              variant={"secondary"}
              className="my-2 w-full md:mb-0 md:ms-2"
            >
              Learn More {">>"}
            </Button>
          </div> */}
          <div className="mt-2 px-4 xl:p-0">
            <details className="p-2 border border-transparent open:border-black/10 open:bg-gray-100">
              <summary
                id="5"
                className="font-header text-md leading-6 font-semibold text-primary select-none"
                onClick={(event) => toggleSkillSet(event)}
              >
                {`${skillSetClosed[5] ? "hide" : "show"} relevant skills`}
              </summary>
              <div className="mt-3 leading-6 text-gray-600">
                <p>
                  The mug is round. The jar is round. They should call it
                  Roundtine.
                </p>
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
          {/* <div className="px-6 md:flex md:flex-row xl:p-0">
            <Button
              variant={"secondary"}
              className="my-2 w-full md:mb-0 md:me-2"
            >
              Download Technical Specs
            </Button>
            <Button
              variant={"secondary"}
              className="my-2 w-full md:mb-0 md:ms-2"
            >
              Learn More {">>"}
            </Button>
          </div> */}
          <div className="mt-2 px-4 xl:p-0">
            <details className="p-2 border border-transparent open:border-black/10 open:bg-gray-100">
              <summary
                id="6"
                className="font-header text-md leading-6 font-semibold text-primary select-none"
                onClick={(event) => toggleSkillSet(event)}
              >
                {`${skillSetClosed[6] ? "hide" : "show"} relevant skills`}
              </summary>
              <div className="mt-3 leading-6 text-gray-600">
                <p>
                  The mug is round. The jar is round. They should call it
                  Roundtine.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
