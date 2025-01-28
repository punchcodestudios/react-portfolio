// // app/routes.ts
import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("contact", "routes/contact.tsx"),
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
