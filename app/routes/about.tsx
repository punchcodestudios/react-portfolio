import React, {
  Suspense,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link, useLocation } from "react-router";
import { CallToActionLeft, CallToActionRight } from "~/components/cards/cta";
import HeaderImage from "~/components/layout/header-image";
import { Button } from "~/components/ui/button";
import { GenericErrorBoundary } from "~/components/error/generic-error-boundary";
import useImage from "~/hooks/image";
import { ErrorBoundary } from "react-error-boundary";

import { CacheControl } from "~/components/cacheControl";

import type { Route } from "./+types/about";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillsSection from "~/components/skillsSection";
import ErrorFallback from "~/components/errorFallback";
import { LoadingSpinner } from "~/components/loading-spinner";

import { createErrorDetails, createGlobalError } from "~/utils/error";
import { loggerService, resumeService } from "~/service";

gsap.registerPlugin(ScrollTrigger);

export enum SkillGroups {
  PLANNING = "planning",
  REQUIREMENTS = "requirements",
  DESIGN = "design",
  CODING = "coding",
  TESTING = "testing",
  DEPLOYMENT = "deployment",
  MAINTENANCE = "maintenance",
}

const AboutContent: React.FC = () => {
  const pageLoadStartTime = useMemo(() => performance.now(), []);
  const correlationId = useMemo(
    () => `about-page-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  const location = useLocation();
  const headerImage = useImage({ path: location.pathname });
  const [isClient, setIsClient] = useState(false);
  const [skillSetClosed, setSkillSetClosed] = useState<boolean[]>(
    Object.keys(SkillGroups).map(() => true)
  );

  // ✅ Enhanced logging for page initialization with correlation tracking
  useEffect(() => {
    loggerService.info("About page: Initializing", undefined, {
      page: "about",
      route: location.pathname,
      correlationId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      referrer: document.referrer || "direct",
      component: "AboutContent",
      operation: "page-init",
    });

    // ✅ Track page view with business metrics and correlation
    loggerService
      .trackFeatureUsage("AboutPage", "page-view", {
        route: location.pathname,
        correlationId,
        hasHeaderImage: (!!headerImage).toString(),
        timestamp: new Date().toISOString(),
        pageLoadContext: "about-page-view",
      })
      .catch((error) => {
        loggerService.warn("Failed to track About page view", error, {
          correlationId,
          component: "AboutContent",
          operation: "track-page-view-failed",
        });
      });

    // ✅ Pre-warm the resume service cache for better performance
    const preWarmCache = async () => {
      try {
        loggerService.debug(
          "About page: Pre-warming resume service cache",
          undefined,
          {
            correlationId,
            component: "AboutContent",
            operation: "cache-pre-warm",
            cacheStrategy: "proactive-loading",
          }
        );

        // This will populate the cache without blocking the UI
        resumeService
          .getSkills({
            params: { id: "", slug: [], skillsExclude: [] },
          })
          .catch(() => {
            // Silently fail - this is just cache pre-warming
            loggerService.debug(
              "Cache pre-warm failed (expected in some cases)",
              undefined,
              {
                correlationId,
                operation: "cache-pre-warm-failed",
              }
            );
          });
      } catch (error) {
        // Non-blocking cache pre-warming
        loggerService.debug("Cache pre-warm error (non-critical)", error, {
          correlationId,
          operation: "cache-pre-warm-error",
        });
      }
    };

    preWarmCache();
  }, [location.pathname, headerImage, correlationId]);

  // ✅ Enhanced client-side initialization with performance tracking
  useEffect(() => {
    const clientInitStartTime = performance.now();

    setIsClient(true);

    const clientInitDuration = performance.now() - clientInitStartTime;

    loggerService.success(
      "About page: Client-side initialization complete",
      undefined,
      {
        page: "about",
        correlationId,
        clientInitDuration: clientInitDuration.toString(),
        isClient: "true",
        timestamp: new Date().toISOString(),
        component: "AboutContent",
        operation: "client-init-complete",
      }
    );

    // ✅ Track client initialization performance with correlation tracking
    loggerService
      .trackComponentPerformance(
        "AboutPage",
        "client-init",
        clientInitDuration,
        true,
        {
          page: "about",
          route: location.pathname,
          correlationId,
          initializationType: "client-side",
        }
      )
      .catch((error) => {
        loggerService.warn(
          "Failed to track client initialization performance",
          error,
          {
            correlationId,
            operation: "track-client-init-failed",
          }
        );
      });

    // ✅ Log resume service status
    const cacheStats = resumeService.getAllCacheStats();
    loggerService.debug("Resume service cache status", undefined, {
      correlationId,
      component: "AboutContent",
      operation: "resume-service-status",
      cacheStats: {
        totalServices: Object.keys(cacheStats).length - 1, // -1 for total object
        skillsCacheSize: cacheStats.skills?.size || 0,
        experienceCacheSize: cacheStats.experience?.size || 0,
        educationCacheSize: cacheStats.education?.size || 0,
      },
    });
  }, [location.pathname, correlationId]);

  // ✅ Enhanced skill set toggle with interaction tracking and correlation
  const toggleSkillSet = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const interactionId = `${correlationId}-skillset-${Date.now()}`;
      const skillSetId = +event.currentTarget?.id;
      const skillGroupName =
        Object.values(SkillGroups)[skillSetId] || "unknown";
      const wasOpen = !skillSetClosed[skillSetId];

      loggerService.debug(
        "About page: Skill set toggle interaction",
        undefined,
        {
          page: "about",
          correlationId,
          interactionId,
          skillGroup: skillGroupName,
          skillSetId: skillSetId.toString(),
          action: wasOpen ? "close" : "open",
          timestamp: new Date().toISOString(),
          component: "AboutContent",
          operation: "skillset-toggle",
        }
      );

      // ✅ Track skill set interactions for UX insights with correlation
      loggerService
        .trackFeatureUsage(
          "SkillSetToggle",
          wasOpen ? "skill-set-closed" : "skill-set-opened",
          {
            skillGroup: skillGroupName,
            skillSetId: skillSetId.toString(),
            page: "about",
            correlationId,
            interactionId,
            userInteraction: "toggle-skillset",
          }
        )
        .catch((error) => {
          loggerService.warn("Failed to track skill set toggle", error, {
            correlationId,
            interactionId,
            operation: "track-skillset-toggle-failed",
          });
        });

      const updated = [...skillSetClosed];
      updated[skillSetId] = !skillSetClosed[skillSetId];
      setSkillSetClosed(updated);
    },
    [skillSetClosed, correlationId]
  );

  // ✅ Enhanced GSAP animations with comprehensive telemetry and correlation tracking
  useGSAP(() => {
    if (!isClient) return;

    const animationStartTime = performance.now();
    const animationCorrelationId = `${correlationId}-gsap-${Date.now()}`;

    loggerService.debug(
      "🎬 About page: Initializing GSAP animations",
      undefined,
      {
        page: "about",
        correlationId,
        animationCorrelationId,
        animationType: "scroll-trigger",
        skillGroupsCount: Object.keys(SkillGroups).length.toString(),
        timestamp: new Date().toISOString(),
        component: "AboutContent",
        operation: "gsap-init",
      }
    );

    const containers = Object.values(SkillGroups).map((value) => {
      return `.${value.toLowerCase()}-container`;
    });

    let successfulAnimations = 0;
    let failedAnimations = 0;

    containers.forEach((selector, index) => {
      const element = document.querySelector(selector);
      const skillGroupName = Object.values(SkillGroups)[index];
      const elementCorrelationId = `${animationCorrelationId}-${skillGroupName}`;

      if (!element) {
        failedAnimations++;
        loggerService.warn(
          `About page: GSAP animation skipped, element not found for selector: ${selector}`,
          undefined,
          {
            page: "about",
            correlationId,
            animationCorrelationId,
            elementCorrelationId,
            selector,
            skillGroup: skillGroupName,
            animationStatus: "failed",
            reason: "element-not-found",
            component: "AboutContent",
            operation: "gsap-element-not-found",
          }
        );
        return;
      }

      successfulAnimations++;

      const skillsWrapper = document.querySelector(
        `${selector}-skills-wrapper`
      );

      gsap.set(selector, { scale: 1 });

      if (skillsWrapper) {
        gsap.set(`${selector}-skills-wrapper`, { opacity: 0, scale: 1.25 });
      }

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
          markers: false,
          scrub: true,
          onEnter: () => {
            // ✅ Track when animations come into view with correlation
            loggerService
              .trackFeatureUsage("GSAPAnimation", "section-entered-viewport", {
                skillGroup: skillGroupName,
                selector,
                page: "about",
                correlationId,
                animationCorrelationId,
                elementCorrelationId,
                scrollTriggerEvent: "onEnter",
              })
              .catch((error) => {
                loggerService.warn(
                  "Failed to track GSAP section enter",
                  error,
                  {
                    correlationId,
                    elementCorrelationId,
                    operation: "track-gsap-enter-failed",
                  }
                );
              });
          },
        },
        onComplete: () => {
          gsap.to(selector, {
            scale: 1,
            ease: "power2.inOut",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.0)",
            duration: 0.7,
          });

          if (skillsWrapper && skillsWrapper.children.length > 0) {
            gsap.to(`${selector}-skills-wrapper`, {
              opacity: 1,
              scale: 1,
              duration: 0.75,
              ease: "power2.inOut",
            });
          }

          // ✅ Track animation completion with correlation
          loggerService.debug(
            "About page: GSAP animation completed",
            undefined,
            {
              page: "about",
              correlationId,
              animationCorrelationId,
              elementCorrelationId,
              skillGroup: skillGroupName,
              selector,
              animationStatus: "completed",
              component: "AboutContent",
              operation: "gsap-animation-complete",
            }
          );
        },
      });
    });

    const animationDuration = performance.now() - animationStartTime;

    // ✅ Comprehensive animation performance tracking with correlation
    loggerService.performance(
      "AboutPage.GSAPAnimations",
      animationDuration,
      successfulAnimations > 0,
      undefined,
      {
        page: "about",
        correlationId,
        animationCorrelationId,
        totalContainers: containers.length.toString(),
        successfulAnimations: successfulAnimations.toString(),
        failedAnimations: failedAnimations.toString(),
        successRate: ((successfulAnimations / containers.length) * 100).toFixed(
          2
        ),
        component: "AboutContent",
        operation: "gsap-performance-summary",
      }
    );

    // ✅ Track animation performance as component performance with correlation
    loggerService
      .trackComponentPerformance(
        "AboutPage",
        "gsap-animations-init",
        animationDuration,
        successfulAnimations > 0,
        {
          successfulAnimations: successfulAnimations.toString(),
          failedAnimations: failedAnimations.toString(),
          totalContainers: containers.length.toString(),
          correlationId,
          animationCorrelationId,
          performanceCategory: "animation-initialization",
        }
      )
      .catch((error) => {
        loggerService.warn(
          "Failed to track GSAP animation performance",
          error,
          {
            correlationId,
            animationCorrelationId,
            operation: "track-gsap-performance-failed",
          }
        );
      });
  }, [isClient, correlationId]);

  // ✅ Enhanced loading fallback with telemetry and correlation tracking
  const SkillsLoadingFallback = useCallback(() => {
    const loadingCorrelationId = `${correlationId}-loading-${Date.now()}`;

    loggerService.debug(
      "About page: Skills loading fallback displayed",
      undefined,
      {
        page: "about",
        correlationId,
        loadingCorrelationId,
        component: "SkillsLoadingFallback",
        timestamp: new Date().toISOString(),
        operation: "skills-loading-fallback-display",
      }
    );

    // ✅ Track loading state display with correlation
    loggerService
      .trackFeatureUsage("SkillsLoading", "fallback-displayed", {
        page: "about",
        component: "SkillsLoadingFallback",
        correlationId,
        loadingCorrelationId,
        suspenseState: "loading",
      })
      .catch((error) => {
        loggerService.warn("Failed to track skills loading fallback", error, {
          correlationId,
          loadingCorrelationId,
          operation: "track-loading-fallback-failed",
        });
      });

    return (
      <div className="flex justify-center items-center p-6">
        <LoadingSpinner />
        <span className="ml-3 text-gray-600">Loading technical skills...</span>
      </div>
    );
  }, [correlationId]);

  // ✅ Enhanced error fallback with comprehensive error tracking and correlation
  const SkillsErrorFallback = useCallback(
    ({
      error,
      resetErrorBoundary,
    }: {
      error: Error;
      resetErrorBoundary: () => void;
    }) => {
      const errorCorrelationId = `${correlationId}-error-${Date.now()}`;

      loggerService.error(
        "About page: Skills error fallback triggered",
        error,
        {
          page: "about",
          correlationId,
          errorCorrelationId,
          component: "SkillsErrorFallback",
          errorMessage: error.message,
          errorName: error.name,
          timestamp: new Date().toISOString(),
          operation: "skills-error-fallback-trigger",
        }
      );

      // ✅ Track error fallback display with correlation
      loggerService
        .trackFeatureUsage("SkillsError", "fallback-displayed", {
          page: "about",
          component: "SkillsErrorFallback",
          errorType: error.name,
          errorMessage: error.message,
          correlationId,
          errorCorrelationId,
          suspenseState: "error",
        })
        .catch((trackingError) => {
          loggerService.warn(
            "Failed to track skills error fallback",
            trackingError,
            {
              correlationId,
              errorCorrelationId,
              operation: "track-error-fallback-failed",
            }
          );
        });

      return (
        <ErrorFallback
          error={error}
          resetErrorBoundary={resetErrorBoundary}
          cacheKey="skills-data-v1"
        />
      );
    },
    [correlationId]
  );

  // ✅ Enhanced Suspense Skills Section with comprehensive error tracking and correlation
  const SuspenseSkillsSection = useCallback(
    () => (
      <ErrorBoundary
        FallbackComponent={SkillsErrorFallback}
        onError={(error, errorInfo) => {
          const boundaryCorrelationId = `${correlationId}-boundary-${Date.now()}`;

          const errorDetails = createErrorDetails({
            component: "About.SkillsErrorBoundary",
            route: "/about",
            section: "skills-suspense",
            errorInfo,
            originalError: error,
            cacheKey: "skills-data-v1",
            correlationId: boundaryCorrelationId,
          });

          const globalError = createGlobalError(
            `Skills Error Boundary caught error: ${error.message}`,
            "BOUNDARY_ERROR",
            errorDetails,
            error.stack
          );

          // ✅ Use the updated loggerService error method with correlation
          loggerService.error(
            `About page: Skills Error Boundary triggered - ${error.message}`,
            error,
            {
              page: "about",
              correlationId,
              boundaryCorrelationId,
              component: "SkillsErrorBoundary",
              errorId: globalError.id,
              componentStack: errorInfo.componentStack || "",
              timestamp: new Date().toISOString(),
              operation: "skills-error-boundary-triggered",
            }
          );

          // ✅ Track the global error with correlation
          loggerService.trackGlobalError(globalError).catch((trackingError) => {
            loggerService.warn("Failed to track global error", trackingError, {
              correlationId,
              boundaryCorrelationId,
              errorId: globalError.id,
              operation: "track-global-error-failed",
            });
          });
        }}
      >
        <Suspense fallback={<SkillsLoadingFallback />}>
          <SkillsSection />
        </Suspense>
      </ErrorBoundary>
    ),
    [SkillsLoadingFallback, SkillsErrorFallback, correlationId]
  );

  // ✅ Enhanced footer interaction tracking with correlation
  const handleFooterNavigation = useCallback(() => {
    const navigationCorrelationId = `${correlationId}-footer-nav-${Date.now()}`;

    loggerService.info("About page: Footer navigation clicked", undefined, {
      page: "about",
      correlationId,
      navigationCorrelationId,
      destination: "/contact",
      action: "footer-cta-click",
      timestamp: new Date().toISOString(),
      component: "AboutContent",
      operation: "footer-navigation-clicked",
    });

    // ✅ Track footer CTA usage with correlation
    loggerService
      .trackFeatureUsage("AboutPageNavigation", "footer-cta-clicked", {
        page: "about",
        destination: "/contact",
        ctaText: "Whats next",
        correlationId,
        navigationCorrelationId,
        navigationFlow: "about-to-contact",
      })
      .catch((error) => {
        loggerService.warn("Failed to track footer navigation", error, {
          correlationId,
          navigationCorrelationId,
          operation: "track-footer-navigation-failed",
        });
      });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [correlationId]);

  // ✅ Track page completion when component unmounts with correlation
  useEffect(() => {
    return () => {
      const totalPageTime = performance.now() - pageLoadStartTime;
      const sessionCorrelationId = `${correlationId}-session-complete`;

      loggerService.info("About page: User session completed", undefined, {
        page: "about",
        correlationId,
        sessionCorrelationId,
        totalPageTime: totalPageTime.toString(),
        completedSession: "true",
        timestamp: new Date().toISOString(),
        component: "AboutContent",
        operation: "session-complete",
      });

      // ✅ Track page session metrics with correlation
      loggerService
        .trackComponentPerformance(
          "AboutPage",
          "session-complete",
          totalPageTime,
          true,
          {
            page: "about",
            sessionType: "complete",
            correlationId,
            sessionCorrelationId,
            sessionDuration: totalPageTime.toString(),
          }
        )
        .catch((error) => {
          loggerService.warn("Failed to track page session completion", error, {
            correlationId,
            sessionCorrelationId,
            operation: "track-session-complete-failed",
          });
        });

      // ✅ Log final resume service cache statistics
      try {
        const finalCacheStats = resumeService.getAllCacheStats();
        loggerService.debug(
          "Final resume service cache statistics",
          undefined,
          {
            correlationId,
            sessionCorrelationId,
            component: "AboutContent",
            operation: "final-cache-stats",
            cacheStats: finalCacheStats,
          }
        );
      } catch (error) {
        loggerService.warn("Failed to get final cache stats", error, {
          correlationId,
          sessionCorrelationId,
          operation: "final-cache-stats-failed",
        });
      }
    };
  }, [pageLoadStartTime, correlationId]);

  return (
    <>
      {headerImage && <HeaderImage headerImage={headerImage} />}

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
            >
              {isClient && (
                <div className="planning-container-skills-wrapper">
                  <SuspenseSkillsSection />
                </div>
              )}
            </CallToActionLeft>
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
            />
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
            />
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
            />
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
            />
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
            />
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
            />
          </div>
        </div>

        <div id="aboutFooter" className="py-10 m-2 lg:px-10 lg:m-10 xl:my-20">
          <article>
            <Link to="/contact" className="text-center">
              <Button
                variant="primary"
                size="wide"
                className="mx-auto block"
                onClick={handleFooterNavigation}
              >
                Whats next
              </Button>
            </Link>
          </article>
        </div>
      </div>

      {/* ✅ Enhanced development-only performance summary with correlation tracking */}
      {process.env.NODE_ENV === "development" && (
        <details className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-2 text-xs max-w-xs z-50">
          <summary className="cursor-pointer font-medium">
            📊 About Page Performance
          </summary>
          <div className="mt-2 space-y-1">
            <p>
              <strong>Page Load Time:</strong>{" "}
              {(performance.now() - pageLoadStartTime).toFixed(2)}ms
            </p>
            <p>
              <strong>Client Status:</strong>{" "}
              {isClient ? "✅ Ready" : "⏳ Loading"}
            </p>
            <p>
              <strong>Logger Status:</strong>{" "}
              {loggerService.isInitialized() ? "✅ Active" : "⚠️ Initializing"}
            </p>
            <p>
              <strong>GSAP Containers:</strong>{" "}
              {Object.keys(SkillGroups).length}
            </p>
            <p>
              <strong>Header Image:</strong>{" "}
              {headerImage ? "✅ Loaded" : "❌ None"}
            </p>
            <p>
              <strong>Correlation ID:</strong>{" "}
              <code className="text-xs bg-gray-100 px-1 rounded">
                {correlationId.split("-").slice(-1)[0]}
              </code>
            </p>
            <p>
              <strong>Resume Service:</strong>{" "}
              {resumeService ? "✅ Active" : "❌ Not Available"}
            </p>
            <p>
              <strong>Cache Stats:</strong>{" "}
              <span className="text-xs">
                Skills: {resumeService?.getAllCacheStats()?.skills?.size || 0}
              </span>
            </p>
          </div>
        </details>
      )}
    </>
  );
};

const AboutContainer = () => {
  return (
    <ErrorBoundary fallback={<GenericErrorBoundary />}>
      <AboutContent />
    </ErrorBoundary>
  );
};

export default AboutContainer;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Punchcode Studios | About this site" },
    {
      name: "description",
      content:
        "Portfolio project showcasing React Development for PunchcodeStudios design company",
    },
  ];
}
