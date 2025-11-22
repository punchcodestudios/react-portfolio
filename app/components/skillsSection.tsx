import { useEffect, useMemo } from "react";
import { useSkillsResource } from "~/hooks/useSkillsResource";
import type { Skill } from "~/service/resume";
import loggerService from "~/service/logging";

const SkillsSection: React.FC = () => {
  const renderStartTime = performance.now();

  loggerService.debug(
    "SkillsSection: Rendering with Suspense pattern",
    undefined,
    {
      component: "SkillsSection",
      renderPhase: "start",
      timestamp: new Date().toISOString(),
      renderStartTime: renderStartTime.toString(),
    }
  );

  // ✅ Measure data fetching performance
  const skillsData = loggerService.measure(
    "SkillsSection.useSkillsResource",
    () => {
      return useSkillsResource();
    },
    {
      component: "SkillsSection",
      operation: "data-fetch",
    }
  );

  // ✅ Enhanced skills processing with telemetry
  const skills = useMemo(() => {
    const processedSkills = skillsData.target || [];

    // ✅ Log skills processing with detailed metadata
    loggerService.info(
      `SkillsSection: Skills processed successfully`,
      undefined,
      {
        component: "SkillsSection",
        skillsCount: processedSkills.length.toString(),
        hasSkills: (processedSkills.length > 0).toString(),
        dataStructure: skillsData.target ? "valid" : "empty",
        processingTime: (performance.now() - renderStartTime).toString(),
      }
    );

    return processedSkills;
  }, [skillsData.target, renderStartTime]);

  // ✅ Track component lifecycle and performance
  useEffect(() => {
    const mountTime = performance.now();
    const renderDuration = mountTime - renderStartTime;

    // ✅ Track successful component mount
    loggerService.success(
      "SkillsSection: Component mounted successfully",
      undefined,
      {
        component: "SkillsSection",
        renderDuration: renderDuration.toString(),
        skillsCount: skills.length.toString(),
        mountTimestamp: new Date().toISOString(),
      }
    );

    // ✅ Track component performance and usage
    loggerService
      .trackComponentPerformance(
        "SkillsSection",
        "mount",
        renderDuration,
        true,
        {
          skillsCount: skills.length.toString(),
          hasSkills: (skills.length > 0).toString(),
          renderPhase: "complete",
        }
      )
      .catch((error) => {
        console.warn("Failed to track SkillsSection performance:", error);
      });

    // ✅ Track skills display as feature usage
    if (skills.length > 0) {
      loggerService
        .trackFeatureUsage("SkillsDisplay", "skills-rendered", {
          skillsCount: skills.length.toString(),
          component: "SkillsSection",
          displayMode: "grid",
        })
        .catch((error) => {
          console.warn("Failed to track skills display:", error);
        });
    }

    // ✅ Cleanup tracking on unmount
    return () => {
      loggerService.debug("SkillsSection: Component unmounting", undefined, {
        component: "SkillsSection",
        unmountTimestamp: new Date().toISOString(),
        totalLifespan: (performance.now() - renderStartTime).toString(),
      });
    };
  }, [skills.length, renderStartTime]);

  // ✅ Enhanced skill card interaction tracking
  const handleSkillCardInteraction = (
    skill: Skill,
    interactionType: "hover" | "focus"
  ) => {
    loggerService.debug(
      `SkillsSection: Skill card ${interactionType}`,
      undefined,
      {
        component: "SkillsSection",
        skillName: skill.name || "unknown",
        skillId: skill.refid || "no-id",
        interactionType,
        hasDescription: (!!skill.description).toString(),
      }
    );

    // ✅ Track skill interactions for UX insights
    loggerService
      .trackFeatureUsage("SkillCard", `card-${interactionType}`, {
        skillName: skill.name || "unknown",
        skillId: skill.refid || "no-id",
        hasDescription: (!!skill.description).toString(),
        component: "SkillsSection",
      })
      .catch((error) => {
        console.warn(`Failed to track skill ${interactionType}:`, error);
      });
  };

  // ✅ Enhanced error handling for empty states
  if (skills.length === 0) {
    loggerService.warn("SkillsSection: No skills data available", undefined, {
      component: "SkillsSection",
      dataState: "empty",
      skillsDataStructure: JSON.stringify(skillsData),
      timestamp: new Date().toISOString(),
    });

    // ✅ Track empty state as potential issue
    loggerService
      .trackFeatureUsage("SkillsDisplay", "empty-state-displayed", {
        component: "SkillsSection",
        dataAvailable: "false",
        possibleIssue: "no-skills-loaded",
      })
      .catch((error) => {
        console.warn("Failed to track empty skills state:", error);
      });
  }

  return (
    <section className="skills-section mt-8" data-testid="skills-section">
      <h2 className="text-2xl font-bold mb-6">
        Technical Skills ({skills.length})
      </h2>

      {skills.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 text-6xl mb-4">⚠️</div>
          <p className="text-gray-500 text-lg">No skills data available.</p>
          <p className="text-gray-400 text-sm mt-2">
            Please check your connection or try refreshing the page.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill: Skill, index: number) => {
            const skillKey = skill.refid || `skill-${index}`;

            return (
              <div
                key={skillKey}
                className="skill-card p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                data-testid={`skill-card-${skillKey}`}
                onMouseEnter={() => handleSkillCardInteraction(skill, "hover")}
                onFocus={() => handleSkillCardInteraction(skill, "focus")}
                tabIndex={0}
                role="button"
                aria-label={`Skill: ${skill.name || "Unnamed Skill"}${
                  skill.description ? ` - ${skill.description}` : ""
                }`}
              >
                <h3 className="font-semibold text-lg">
                  {skill.name || "Unnamed Skill"}
                </h3>
                {skill.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {skill.description}
                  </p>
                )}

                {/* ✅ Enhanced visual feedback */}
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    ID: {skill.refid || "N/A"}
                  </span>
                  {skill.description && (
                    <span className="text-xs text-green-500">📋</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ✅ Development-only debug info */}
      {process.env.NODE_ENV === "development" && (
        <details className="mt-4 p-2 bg-gray-50 rounded text-xs">
          <summary className="cursor-pointer font-medium">
            🔧 Debug Info (Development Only)
          </summary>
          <div className="mt-2 space-y-1">
            <p>
              <strong>Skills Count:</strong> {skills.length}
            </p>
            <p>
              <strong>Data Source:</strong>{" "}
              {skillsData.target ? "Valid" : "Empty"}
            </p>
            <p>
              <strong>Logger Status:</strong>{" "}
              {loggerService.isInitialized() ? "✅ Active" : "⚠️ Initializing"}
            </p>
            <p>
              <strong>Render Time:</strong>{" "}
              {(performance.now() - renderStartTime).toFixed(2)}ms
            </p>
          </div>
        </details>
      )}
    </section>
  );
};

export default SkillsSection;
