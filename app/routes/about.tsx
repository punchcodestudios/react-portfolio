import {
  isRouteErrorResponse,
  useLocation,
  useRouteError,
  type ActionFunctionArgs,
} from "react-router";

import type { Route } from "./+types/about";
import { useState } from "react";

export async function action({ request, params }: ActionFunctionArgs) {}

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
                src=""
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
                src=""
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
                src=""
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
                src=""
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
                src=""
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
                src=""
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
                src=""
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
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
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
