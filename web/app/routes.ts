// // app/routes.ts
import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";
// import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";
// import { flatRoutes } from "remix-flat-routes";

// export default remixRoutesOptionAdapter((defineRoutes) => {
//   return flatRoutes("routes", defineRoutes, {
//     ignoredRouteFiles: [
//       ".*",
//       "**/*.css",
//       "**/*.test.{js,jsx,ts,tsx}",
//       "**/__*.*",
//       // This is for server-side utilities you want to colocate
//       // next to your routes without making an additional
//       // directory. If you need a route that includes "server" or
//       // "client" in the filename, use the escape brackets like:
//       // my-route.[server].tsx
//       "**/*.server.*",
//       "**/*.client.*",
//     ],
//   });
// }) satisfies RouteConfig;

// import { type RouteConfig } from "@react-router/dev/routes";
// import { flatRoutes } from "@react-router/fs-routes";

// export default flatRoutes({
//   ignoredRouteFiles: ["home.tsx"],
// }) satisfies RouteConfig;

export default [
  index("routes/home.tsx"),
  route("products", "routes/products.tsx"),
  route("terms-of-use", "routes/terms-of-use.tsx"),
  route("privacy-policy", "routes/privacy-policy.tsx"),
  // layout("routes/about/index.tsx", [
  //   route("/about", "routes/about.tsx"),
  //   route("about-two", "routes/about-two.tsx"),
  // ]),
  layout("routes/resume/resume-layout.tsx", [
    route("resume", "routes/resume/summary.tsx"),
    route("resume/skills", "routes/resume/skills.tsx"),
    route("resume/experience", "routes/resume/experience.tsx"),
    route("resume/education", "routes/resume/education.tsx"),
  ]),
] satisfies RouteConfig;
