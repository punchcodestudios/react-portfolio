import GenericErrorBoundary from "~/components/ui/error-boundary";
import gradImage from "/images/graduation-logo.png";
import { Suspense } from "react";
import Loader from "~/components/ui/loader";
import React, { useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CallToActionLeft } from "~/components/cards/cta";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { clear } from "console";
gsap.registerPlugin(ScrollTrigger);

export const EducationSections = {
  DEGREE: "degree",
  // CERTIFICATION: 'certification',
  // TRAINING: 'training',
};
const EducationContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const containers = Object.values(EducationSections).map((type) => `${type}`);
  console.log("%cFormatted: ", "color: #00f; font-weight: bold;", containers);

  useGSAP(() => {
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
      // gsap.set(`.${selector}-container-skills-wrapper`, {
      //   opacity: 0,
      //   scale: 1.25,
      // });
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
          // gsap.to(`.${selector}-container-skills-wrapper`, {
          //   opacity: 1,
          //   scale: 1,
          //   duration: 0.75,
          //   ease: "power2.inOut",
          // });
        },
      });
    });
  });

  return (
    <div ref={contentRef} className="opacity-25">
      <div className="flex flex-col mx-auto max-w-[90%] lg:max-w-[70%]">
        <section className="my-10">
          <p className="text-center md:text-start">
            Education is the passport to the future, for tomorrow belongs to
            those who prepare for it today.
          </p>
        </section>
      </div>

      <div className="flex flex-col mx-auto xl:max-w-[90%]">
        <div className="flex flex-col mx-auto overflow:hidden xl:flex-row xl:flex-wrap xl:justify-between">
          {/* Backend */}
          <div className="degree py-10 lg:px-10 border-b-2 border-gray-400 mb-5 xl:w-full">
            <CallToActionLeft
              title={<strong>DeVry University - 2009</strong>}
              imageUrl="/images/graduation-logo.png"
              imageAlt="An image indicating education"
              text="1310 E. 104th Street, Kansas City, MO 64131"
              tagLine="Bachelor's of Science"
            ></CallToActionLeft>
          </div>
        </div>
      </div>
    </div>
  );
};

const EducationContainer = () => {
  return (
    <ErrorBoundary fallback={<GenericErrorBoundary />}>
      <React.Suspense fallback={<Loader />}>
        <EducationContent />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default EducationContainer;

export function meta() {
  return [
    { title: "Punchcode Studios | Education" },
    {
      name: "Education",
      content:
        "Education page showcasing the background and experience of Punchcode Studios design company",
    },
  ];
}
