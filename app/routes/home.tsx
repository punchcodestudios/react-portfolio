import { Button } from "~/components/ui/button";
import type { Route } from "./+types/home";
import IconService from "~/service/icon-service";
import {
  isRouteErrorResponse,
  Link,
  redirect,
  useRouteError,
  type ActionFunctionArgs,
} from "react-router";
import { toastSessionStorage } from "~/utils/toast.server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SolidIcon } from "~/utils/enums";
import { getDateStampForFilename } from "~/utils/date";
import { getResumeDoc } from "~/utils/fileDownload";
import { CallToActionLeft, CallToActionRight } from "~/components/cards/cta";
import GenericErrorBoundary from "~/components/ui/error-boundary";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export async function action({ request, params }: ActionFunctionArgs) {
  // console.log("action: ");
  const toastCookieSession = await toastSessionStorage.getSession(
    request.headers.get("cookie")
  );
  // console.log("toast cookie session: ", toastCookieSession);
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

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const containers = [
      ".inspiration-container",
      ".innovation-container",
      ".collaboration-container",
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

  const downloadResume = () => {
    return console.log("get resume");
  };

  const inspriationCtaActions = () => {
    return (
      <div className="md:flex md:flex-row md:justify-between">
        <div className="w-full mb-3 md:w-[45%]">
          <Button variant="secondary" size="md" onClick={downloadResume}>
            <FontAwesomeIcon
              icon={IconService.getSolid(SolidIcon.FILE_DOWNLOAD)}
              className="text-lg me-5"
            ></FontAwesomeIcon>
            Download Resume
          </Button>
        </div>
        <div className="w-full mb-3 md:w-[45%]">
          <Link to={"/resume"}>
            <Button variant="secondary" size="md">
              View Online
              <FontAwesomeIcon
                icon={IconService.getSolid(SolidIcon.FORWARD)}
                className="text-lg ms-5"
              ></FontAwesomeIcon>
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  const innovationCtaActions = () => {
    return (
      <div className="md:flex md:flex-row  md:justify-between">
        <div className="w-full mb-3 md:w-[45%]">
          <Button variant="secondary" size="md">
            <FontAwesomeIcon
              icon={IconService.getSolid(SolidIcon.FILE_DOWNLOAD)}
              className="text-lg me-5"
            ></FontAwesomeIcon>
            Download Technical Specs
          </Button>
        </div>
        <div className="w-full mb-3 md:w-[45%]">
          <Link to={"/about"}>
            <Button variant="secondary" size="md">
              Learn More
              <FontAwesomeIcon
                icon={IconService.getSolid(SolidIcon.FORWARD)}
                className="text-lg ms-5"
              ></FontAwesomeIcon>
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  const collaborationCtaActions = () => {
    return (
      <div className="md:flex md:flex-row md:justify-between">
        <div className="w-full mb-3 md:w-[45%]">
          <Link to={"/contact"}>
            <Button variant="secondary" size="md">
              Schedule a Live Demo
              <FontAwesomeIcon
                icon={IconService.getSolid(SolidIcon.FORWARD)}
                className="text-lg ms-5"
              ></FontAwesomeIcon>
            </Button>
          </Link>
        </div>
        <div className="w-full mb-3 md:w-[45%]">
          <Link to={"/contact"}>
            <Button variant="secondary" size="md">
              Send a Note
              <FontAwesomeIcon
                icon={IconService.getSolid(SolidIcon.FORWARD)}
                className="text-lg ms-5"
              ></FontAwesomeIcon>
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      <section
        ref={contentRef}
        className="justify-center mx-auto mb-2 p-2 bg-home-hero bg-no-repeat bg-cover bg-opacity-40 xl:flex-row xl:flex-wrap xl:justify-between xl:p-5 "
      >
        <div className="p-2 xl:p-0 mt-5 xl:px-5 h-[20dvh] xl:mt-0 text-center">
          <div className="xl:w-120">
            <h1 className="font-brand uppercase text-secondary">
              punchcode studios
            </h1>
            <h2 className="text-sm text-white font-light tracking-wide font-header">
              design | develop | test | deploy | maintain
            </h2>
          </div>
        </div>
      </section>

      <section className="flex flex-col mx-auto pb-0">
        <div className="mx-auto mt-10 min-h-[50px] max-w-[90%] lg:max-w-[70%]">
          <div className="xl:flex">
            <p className="text-center md:text-start">
              Punchcode Studios is a full service software development company,
              providing robust solutions tailored to your individual needs with
              development packages that will fit any budget. At Punchcode
              Studios, we believe that clear, concise communication is as
              essential to delivering an exceptional product as the code we
              write. Our attention to detail in every step of the process is
              what sets us apart and makes Punchcode Studios the clear choice
              when deciding on how to best fulfill your software development
              needs.
            </p>
          </div>
        </div>
      </section>

      <section className="inspiration-container flex flex-col mx-auto my-5 border-b border-slate-600 xl:flex-row xl:flex-wrap xl:justify-around xl:p-20 ">
        <CallToActionLeft
          title="Inspiration"
          imageUrl="/images/home_innovation.png"
          imageAlt="image of a lighbulb emitting visible signs of energy signifying ideas and innovative thinking"
          tagLine="Adding value to your team"
          text="As a fully dedicated member of your team, or as an independent
                  contractor solving a specific problem, Punchcode Studios
                  brings more than fifteen years of expertice and passion for
                  web development to your organization or personal project."
          actions={inspriationCtaActions()}
        ></CallToActionLeft>
      </section>

      <section className="innovation-container flex flex-col mx-auto my-5 border-b border-slate-600 xl:flex-row xl:flex-wrap xl:justify-around xl:p-20 ">
        <CallToActionRight
          title="Innovation"
          imageUrl="/images/home_information.png"
          imageAlt="blue and orange geometric image illustrating concept of central processing unit and related circuits"
          tagLine="Keeping up with industry standards"
          text="Continuous growth is a challenge that every business faces in
                  today's marketplace. Punchcode Studios is passionate about
                  adapting to the constantly evoloving landscape of this modern
                  age, and is commited to providing reliable software solutions
                  that will scale with your growing needs."
          actions={innovationCtaActions()}
        ></CallToActionRight>
      </section>

      <section className="collaboration-container flex flex-col mx-auto my-5 xl:flex-row xl:flex-wrap xl:justify-around xl:p-20 ">
        <CallToActionLeft
          title="Collaboration"
          imageUrl="/images/home_communication.png"
          imageAlt="image of people gathered together to interact with each other"
          tagLine="Communication is key to success"
          text="Effective communication is at the heart of uncovering the
                  specific requirements that a well-designed software should
                  meet. Punchcode Studios listens first, then is dedicated to
                  clear and consice communication for collaboration with
                  stakeholders at each phase of the Software Development Life
                  Cycle."
          actions={collaborationCtaActions()}
        ></CallToActionLeft>
      </section>

      <section id="homeFooter" className="py-10 m-2 lg:px-10 lg:m-10 xl:my-20">
        <Link to="/about" className="text-center">
          <Button
            variant="primary"
            size="wide"
            className="mx-auto block"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Whats next
          </Button>
        </Link>
      </section>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          Route Error: {error.status} {error.statusText}
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
