import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // ✅ Main routes with absolute paths for consistency
  index("routes/home.tsx"),
  route("/about", "routes/about.tsx"),
  route("/privacy-policy", "routes/privacy-policy.tsx"),
  route("/terms-of-use", "routes/terms-of-use.tsx"),

  // ✅ UI demonstration routes
  route("/ui/index", "routes/ui/index.tsx"),
  route("/ui/data-table", "routes/ui/dataTableContainer.tsx"),
  route("/ui/data-gallery", "routes/ui/dataGalleryContainer.tsx"),

  // ✅ Testing and health check routes
  route("/test/health", "routes/health-checks.tsx"),
  route("/exam-prep", "routes/exam-prep/examContainer.tsx"),

  // ✅ Form layout with contact page
  layout("routes/form-layout.tsx", [route("/contact", "routes/contact.tsx")]),

  // ✅ Resume section with nested routes
  layout("routes/resume/resume-layout.tsx", [
    route("/resume", "routes/resume/summary.tsx"),
    route("/resume/skills", "routes/resume/skills.tsx"),
    route("/resume/experience", "routes/resume/experience.tsx"),
    route("/resume/education", "routes/resume/education.tsx"),
  ]),

  // ✅ Well-known routes for standards compliance
  route("/.well-known/*", "routes/well-known.tsx"),

  // ✅ Catch-all route for better 404 handling (optional)
  // route("*", "routes/404.tsx"),
] satisfies RouteConfig;
