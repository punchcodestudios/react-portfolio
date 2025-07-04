import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";
import {
  isRouteErrorResponse,
  Link,
  redirect,
  useLoaderData,
  useLocation,
  useRouteError,
  type ActionFunctionArgs,
  type ClientActionFunctionArgs,
} from "react-router";
import { CallToActionLeft, CallToActionRight } from "~/components/cards/cta";
import HeaderImage from "~/components/layout/header-image";
import { Button } from "~/components/ui/button";
import GenericErrorBoundary from "~/components/ui/error-boundary";
import type { SkillRequest } from "~/entities/resume";
import useImage from "~/hooks/useImage";
import resumeService from "~/service/resume-service";
import { toastSessionStorage } from "~/utils/toast.server";
import type { Route } from "./+types/about";

gsap.registerPlugin(ScrollTrigger);

export async function loader({ params }: Route.LoaderArgs) {
  const request: SkillRequest = {
    params: { skillsExclude: [], slug: "" },
  };
  console.log('"loader called for about page"');
  setTimeout(() => {
    console.log("timeout in loader");
  }, 3000);

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
  useGSAP(() => {
    const containers = [
      ".planning-container",
      ".requirements-container",
      ".design-container",
      ".coding-container",
      ".testing-container",
      ".deployment-container",
      ".maintenance-container",
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
  } = useLoaderData() ?? {};

  function handleToast() {
    // console.log("handle toast");
  }

  const [skillSetClosed, setSkillSetClosed] = useState<boolean[]>([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
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

  if (
    planningSkills === undefined ||
    requirementsSkills === undefined ||
    designSkills === undefined ||
    codingSkills === undefined ||
    deploymentSkills === undefined ||
    testingSkills === undefined ||
    maintenanceSkills === undefined
  ) {
    return <p>Loading</p>;
  }

  useGSAP(() => {
    const containers = [
      ".planning-container",
      ".requirements-container",
      ".design-container",
      ".coding-container",
      ".testing-container",
      ".deployment-container",
      ".maintenance-container",
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

  return (
    <>
      {headerImage && <HeaderImage headerImage={headerImage}></HeaderImage>}

      <div className="flex flex-col mx-auto max-w-[90%] lg:max-w-[70%]">
        <section className="my-10">
          <p className="text-siteBlack text-center md:text-start">
            Punchcode Studios is a software development company that specializes
            in delivering high-quality, reliable software solutions. With a
            focus on the Systems Development Lifecycle (SDLC), Punchcode Studios
            ensures that every project is executed with precision and attention
            to detail.
          </p>
        </section>
      </div>

      <div className="flex flex-col mx-auto xl:max-w-[90%]">
        <div className="flex flex-col mx-auto overflow:hidden xl:flex-row xl:flex-wrap xl:justify-between">
          {/* Planning */}
          <div className="planning-container py-10 lg:px-10 border-b-2 border-gray-400 mb-5 xl:w-full">
            <CallToActionLeft
              title="Planning"
              imageUrl="/images/callout-planning.png"
              imageAlt="image of two hands working on a planning board with post it notes"
              tagLine="Every success begins with a successful plan"
              text="The first stage in the process is where initial expectations
                  are defined, including overall goals and high-level
                  requirements. A feasiblity analysis is completed to determine
                  the project scope as well as a timeline for deliverables.
                  Punchcode Studios is able to provide valuable input at this
                  stage to ensure a realistic plan for the execution of the
                  following phases in the cycle."
            ></CallToActionLeft>
          </div>

          {/* Requirements */}
          <div className="requirements-container py-10 lg:px-10 border-b-2 border-gray-400 mb-5 xl:w-full">
            <CallToActionRight
              title="Requirements Gathering"
              imageUrl="/images/callout-requirements.png"
              imageAlt="image of a person writing requirements on a whiteboard"
              tagLine="A requirement to a successful project"
              text="During this phase, Punchcode Studios collaborates with
                  stakeholders to determine their needs as well as the needs of
                  any additional users. The deliverable for this phase is a set
                  of functional and non-functional documents that clearly
                  illustrate the expecations of the software."
            ></CallToActionRight>
          </div>

          {/* Design */}
          <div className="design-container py-10 lg:px-10 border-b-2 border-gray-400 mb-5 xl:w-full">
            <CallToActionLeft
              title="Design"
              imageUrl="/images/callout-design.png"
              imageAlt="multi-color image of technology graphics on different sized displays"
              tagLine="Impactful Design makes a lasting impression"
              text="This stage is focused on deciding how the software will be
                  implemented. Consideration is given for architectural and
                  component composition as well as the look and feel of the user
                  interface (UI). Punchcode Studios has extensive experience in
                  creating and adhering to the deliverables from this phase
                  which include comprehensive design documents such as style
                  guides, flowcharts and story boards."
            ></CallToActionLeft>
          </div>

          {/* Coding */}
          <div className="coding-container py-10 lg:px-10 border-b-2 border-gray-400 mb-5 xl:w-full">
            <CallToActionRight
              title="Coding"
              imageUrl="/images/callout-coding.png"
              imageAlt="image of code being displayed on a computer screen"
              tagLine="Good code is driven by a passion for elegant simplicity"
              text="The deliverable for this phase is a fully functional software
                  solution that complies with the previously defined
                  requirements and client expectations. Punchcode Studios
                  dedicates more than 15 years experience and passion for
                  software development towards implementing high quality
                  software solutions. Punchcode Studios has a proven track
                  record of providing tangible solutions that meet or exceed
                  timeline, budget and end-user experience expectations."
            ></CallToActionRight>
          </div>

          {/* Testing */}
          <div className="testing-container py-10 lg:px-10 border-b-2 border-gray-400 mb-5 xl:w-full">
            <CallToActionLeft
              title="Testing"
              imageUrl="/images/callout-testing.png"
              imageAlt="multi-color image of hard shelled insect made of circuitry"
              tagLine="All code is as good as its testing"
              text="During this phase, the software is put through extensive
                  testing to ensure a high quality product is ultimately
                  deployed to the end user. Punchcode Studios has extensive
                  experience with various testing frameworks and methodologies
                  including automated unit and functional testing used to
                  minimize potential risk introduced with future development and
                  promote proper quality assurance (QA) resource managment.
                  Punchcode Studios efficiently provides solutions to issues
                  found during third-party QA testing with minimal amounts of
                  rework."
            ></CallToActionLeft>
          </div>

          {/* Deployment */}
          <div className="deployment-container py-10 lg:px-10 border-b-2 border-gray-400 mb-5 xl:w-full">
            <CallToActionRight
              title="Deployment"
              imageUrl="/images/callout-deployment.png"
              imageAlt="a predominently blue image of a server room"
              tagLine="A perfect deployment is one that goes unnoticed"
              text="During this phase, the software is now delivered to the end
                  user. Either utilizing modern deployment strategies such as
                  Continuous Integration / Continuous Deployment (CI/CD) or
                  incorporating legacy strategies such as manual SFTP
                  deployment, Punchcode Studios has reliably and consistently
                  deployed applications to production environments with little
                  to no downtime."
            ></CallToActionRight>
          </div>

          {/* Maintenance */}
          <div className="maintenance-container py-10 lg:px-10 mb-5 xl:w-full">
            <CallToActionLeft
              title="Maintenance"
              imageUrl="/images/callout-maintenance.png"
              imageAlt="image of a maintenance message on a computer screen in mostly blue hues"
              tagLine="An investment in maintainable code today pays dividends
                  tomorrow"
              text="Any issues that are discovered through end-user experiences
                  are addressed during this phase. This phase also allows
                  consideration for any enhancements or changes to initial
                  requirements not previously addressed during the previous
                  phases. Often under this circumstance, the SDLC begins again
                  at the first step. Punchcode Studios demostrates the ability
                  to efficiently and effectively address any issues discovered
                  post-deployment and will reliably offer a solution that will
                  remediate any adverse side effects, as well as implement
                  preventative measures to ensure a comprehensive solution is
                  achieved."
            ></CallToActionLeft>
          </div>
        </div>

        <div id="aboutFooter" className="py-10 m-2 lg:px-10 lg:m-10 xl:my-20">
          <article>
            <Link to="/contact" className="text-center">
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
        </div>
      </div>
    </>
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
