import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("privacy-policy", "routes/privacy-policy.tsx"),
  route("terms-of-use", "routes/terms-of-use.tsx"),
  route("ui/index", "routes/ui/index.tsx"),
  route("ui/data-table", "routes/ui/dataTableContainer.tsx"),
  route("ui/data-gallery", "routes/ui/dataGalleryContainer.tsx"),
  layout("routes/form-layout.tsx", [route("contact", "routes/contact.tsx")]),
  layout("routes/resume/resume-layout.tsx", [
    route("resume", "routes/resume/summary.tsx"),
    route("resume/skills", "routes/resume/skills.tsx"),
    route("resume/experience", "routes/resume/experience.tsx"),
    route("resume/education", "routes/resume/education.tsx"),
  ]),
] satisfies RouteConfig;
