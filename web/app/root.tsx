import {
  data,
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "react-router";
import stylesheet from "./app.css?url";
import Footer from "./components/layout/footer.component";
import Navbar from "./components/layout/navbar.component";
import fontStylestylesheetUrl from "./styles/font.css?url";
import tailwindStylesheetUrl from "./styles/tailwind.css?url";
import type { Route } from "./+types/root";
import GenericErrorBoundary from "./components/ui/error-boundary";
import { HoneypotProvider } from "remix-utils/honeypot/react";
import { honeypot } from "./utils/honeypot.server";
import { csrf } from "./utils/csrf.server";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";

export const links: LinksFunction = () =>
  [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    // { rel: "stylesheet", href: fontStylestylesheetUrl },
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: stylesheet },
  ].filter(Boolean);

const mainNavItems = [
  <Link to="/resume" className="me-3">
    Resume
  </Link>,
  <Link to="/about" className="me-3">
    About
  </Link>,
  <Link to="/contact" className="me-3">
    Contact
  </Link>,
];

export async function loader({ request }: LoaderFunctionArgs) {
  const [csrfToken, csrfCookieHeader] = await csrf.commitToken(request);
  const honeyProps = await honeypot.getInputProps();
  return data(
    {
      honeyProps,
      csrfToken,
    },
    {
      headers: csrfCookieHeader ? { "set-cookie": csrfCookieHeader } : {},
    }
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Links />
      </head>
      <body suppressHydrationWarning={true}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function App() {
  return (
    <Layout>
      <Navbar navItems={mainNavItems}></Navbar>
      <div
        id="siteContainer"
        className="max-w-[100%] md:max-w-[90%] mx-auto bg-siteWhite"
      >
        <Outlet />
      </div>
      <Footer></Footer>
    </Layout>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <AuthenticityTokenProvider token={data.csrfToken}>
      <HoneypotProvider {...data.honeyProps}>
        <App />
      </HoneypotProvider>
    </AuthenticityTokenProvider>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Layout>
      <GenericErrorBoundary></GenericErrorBoundary>
    </Layout>
  );
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Punchcode Studios | Portfolio" },
    {
      name: "description",
      content:
        "Porfolio project showcasing React Development for PunchcodeStudios design company",
    },
  ];
}
