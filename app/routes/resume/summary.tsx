import React, { useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CallToActionLeft } from "~/components/cards/cta";
import GenericErrorBoundary from "~/components/ui/error-boundary";
import Loader from "~/components/ui/loader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const SummaryContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const containers = ["biography"];

  useGSAP(() => {
    // function animate() {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0.25,
        },
        {
          opacity: 1,
          duration: 0.25,
          ease: "power1.inOut",
        }
      );
    }
    containers.forEach((selector) => {
      gsap.to(`.${selector}`, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.in",
      });
    });

    containers.forEach((selector) => {
      gsap.set(`.${selector}`, { scale: 1 });
      gsap.to(`.${selector}`, {
        scale: 1.05,
        y: 0,
        duration: 0.7,
        ease: "power2.inOut",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        scrollTrigger: {
          trigger: `.${selector}`,
          start: "center 70%",
          end: "center 50%",
          markers: false, // set to true for debugging
          scrub: true,
        },
        onComplete: () => {
          gsap.to(`.${selector}`, {
            scale: 1,
            ease: "power2.inOut",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.0)",
            duration: 0.7,
          });
        },
      });
    });
    // }

    // if (document.readyState === "complete") {
    //   animate();
    // } else {
    //   window.addEventListener("load", animate);
    // }
    // return () => {
    //   window.removeEventListener("load", animate);
    // };
  }, []);

  return (
    <div ref={contentRef} className="opacity-25">
      <div className="flex flex-col mx-auto xl:max-w-[90%]">
        <div className="flex flex-col mx-auto overflow:hidden xl:flex-row xl:flex-wrap xl:justify-between">
          <div className="biography py-10 lg:px-10 mb-5 xl:w-full">
            <CallToActionLeft
              title="Patrick Schandler"
              imageUrl="/images/resume_biography.png"
              imageAlt="self portrait"
              tagLine="Creative Technologist providing Innovative Software Solutions"
              text="Results-driven software engineer with 15+ years of experience in Microsoft .NET development across Windows and web platforms. Skilled in VB.NET, C#.NET backend architecture, and modern JavaScript frontend frameworks. Known for optimizing performance, delivering scalable solutions, and rapidly mastering new technologies. Blends technical expertise with creativity through 3D and visual tools like Blender, THREE.js, and Adobe Creative Suite. Proven success in both solo and team-based development."
            />
          </div>
        </div>

        <div id="summaryFooter" className="py-10 m-2 lg:px-10 lg:m-10 xl:my-20">
          <Link to="/resume/skills" className="text-center">
            <Button
              variant="primary"
              size="wide"
              className="mx-auto block"
              onClick={() => {}}
            >
              Whats next
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const SummaryContainer = () => {
  return (
    <ErrorBoundary fallback={<GenericErrorBoundary />}>
      <React.Suspense fallback={<Loader />}>
        <SummaryContent />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default SummaryContainer;

export function meta() {
  return [
    { title: "Punchcode Studios | Biography" },
    {
      name: "Biography",
      content:
        "Biography page showcasing the background and experience of Punchcode Studios design company",
    },
  ];
}

/*Collaborating with the team at Nourish, I intend to leverage my creativity and technical expertise to advocate for what I consider to be a vital element of a happy and successful life. Personally, I am a passionate advocate for proper nutrition, and I would take pride in joining a team equipped with the resources and capability to provide positive guidance to a broad audience in this field. */
