// Components Barrel Export

// export * from "./cards"; // TODO: create barrel export
export * from "./data"; // ✅ Known to exist
export * from "./error"; // ✅ Known to exist

// export * from "./exam"; // TODO: create barrel export
// export * from ".gallery"; // TODO: create barrel export
// export * from ".image"; // TODO: create barrel export
// export * from ".layout"; // TODO: create barrel export
// export * from "./Slideshow"; // TODO: create barrel export
export * from "./ui"; // ✅ Known to exist

// TODO: needs adjustments to compoent export type - Export types should be standardized and consistent across all components
// Individual Components (safe exports for existing files)
export { CacheControl } from "./cacheControl";
export { default as ErrorFallback } from "./errorFallback";
export { LoadingSpinner } from "./loading-spinner"; //TODO: There is duplicate code in the service layer that could consolidate these two
export { default as SkillsDebugPanel } from "./skillsDebugPanel";
export { default as SkillsSection } from "./skillsSection";
export { Spacer } from "./spacer"; //TODO: not sure to what extent this is being used: Add investigation item to future Sprint - Forms andAccessibility

// Layout Components (safe exports)
// TODO : Add these to ./layout barrel export once created
// BEGIN FUTURE LAYOUT BARREL
export { default as Footer } from "./layout/footer";
export { default as FormLayout } from "./layout/form-layout";
export { HeaderImage } from "./layout/header-image";
export { default as Navbar } from "./layout/navbar";
export { default as PageNav } from "./layout/page-nav";
// END FUTURE LAYOUT BARREL

// TODO: add to future card barrel import once created:
// Card Components (if they exist)
//export { CTA } from "./cards/cta"; // TODO: needs adjustments to compoent export type: Also Add to new Sprint -- Reusable Component Cleanup
export { ExperienceCard } from "./cards/experience-card";
