import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("components/content-page-layout.component.tsx", [
    route("resume", "routes/resume.tsx"),
    route("about", "routes/about.tsx"),
    route("products", "routes/products.tsx"),
  ]),
  layout("components/form-layout.component.tsx", [
    route("login", "routes/login.tsx"),
    route("register", "routes/register.tsx"),
    route("confirm-registration", "routes/confirm-registration.tsx"),
    route("recover", "routes/recover.tsx"),
  ]),
] satisfies RouteConfig;
