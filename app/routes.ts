import {
  type RouteConfig,
  index,
  layout,
  route,
} from "../node_modules/@react-router/dev/dist/routes";

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
  route("/ui/style-guide", "routes/ui/styleGuideContainer.tsx"),

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

  // Form component test routes
  route("_test/form-components", "routes/_test/form-components/index.tsx"),
  route(
    "_test/form-components/input",
    "routes/_test/form-components/input.tsx"
  ),
  route(
    "_test/form-components/textarea",
    "routes/_test/form-components/textarea.tsx"
  ),
  route(
    "_test/form-components/select",
    "routes/_test/form-components/select.tsx"
  ),
  route(
    "_test/form-components/checkbox",
    "routes/_test/form-components/checkbox.tsx"
  ),
  route(
    "_test/form-components/radio",
    "routes/_test/form-components/radio.tsx"
  ),

  // ✅ Well-known routes for standards compliance
  route("/.well-known/*", "routes/well-known.tsx"),
  // ✅ Catch-all route for better 404 handling (optional)
  // route("*", "routes/404.tsx"),
] satisfies RouteConfig;
