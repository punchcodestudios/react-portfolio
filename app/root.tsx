import React, { useEffect } from "react";
import {
  data,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useFetchers,
  useLoaderData,
  type ActionFunctionArgs,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "react-router";
import type { Route } from "./+types/root";
// @ts-ignore
import appStylesheetUrl from "./app.css?url";
// @ts-ignore
//@ts-ignore
import tailwindStylesheetUrl from "./styles/tailwind.css?url";
import { useForm } from "@conform-to/react";
import { parse } from "@conform-to/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";
import { HoneypotProvider } from "remix-utils/honeypot/react";
import { toast as showToast, Toaster } from "sonner";
import { z } from "zod";

import IconService from "./service/icon-service";
// import UserService from "./service/user-service";

import { SolidIcon } from "./utils/enums";
import { sessionStorage } from "./utils/session.server";
import { csrf } from "./utils/csrf.server";
import { getEnv } from "./utils/env.server";
import { honeypot } from "./utils/honeypot.server";
import { combineHeaders, invariantResponse } from "./utils/site";
import { getTheme, setTheme, type Theme } from "./utils/theme.server";
import { getToast, type Toast } from "./utils/toast.server";

import { ErrorList } from "./components/forms";
import GenericErrorBoundary from "./components/ui/error-boundary";
import Footer from "./components/layout/footer";
import Navbar from "./components/layout/navbar";

export const links: LinksFunction = () =>
  [
    { rel: "stylesheet", href: "https://use.typekit.net/utp7gyp.css" },
    // { rel: "stylesheet", href: fontStylestylesheetUrl },
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    // { rel: "stylesheet", href: appStylesheetUrl },
  ].filter(Boolean);

const ThemeFormSchema = z.object({
  theme: z.enum(["light", "dark"]),
});

export async function loader({ request }: LoaderFunctionArgs) {
  const [csrfToken, csrfCookieHeader] = await csrf.commitToken(request);
  const honeyProps = await honeypot.getInputProps();
  const { toast, headers: toastHeaders } = await getToast(request);

  // console.log("toast: ", toast);
  const cookieSession = await sessionStorage.getSession(
    request.headers.get("cookie")
  );

  const userId = cookieSession?.get("userId");
  // const response = userId ? await UserService.getById(userId) : null;
  let user = null;
  // if (response !== null) {
  //   user = response?.meta.success ? response?.target[0] : null;
  // }
  return data(
    {
      userId,
      user,
      honeyProps,
      csrfToken,
      theme: getTheme(request),
      toast: toast,
      ENV: getEnv(),
    },
    {
      headers: combineHeaders(
        csrfCookieHeader ? { "set-cookie": csrfCookieHeader } : null,
        toastHeaders
      ),
    }
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  // console.log("action: ", formData);
  invariantResponse(
    formData.get("intent") === "update-theme",
    "Invalid intent",
    { status: 400 }
  );

  // parse comes from conform/to-zod
  const submission = parse(formData, {
    schema: ThemeFormSchema,
  });
  // console.log("submission.error: ", submission.error);
  // console.log("submission.intent: ", submission.intent);
  // console.log("submission.value: ", submission.value);
  if (submission.intent !== "submit") {
    return { status: "success", submission: submission };
  }
  if (!submission.value) {
    return { status: "error", submission } as const;
  }

  const { theme } = submission.value;
  // console.log("theme: ", theme);

  const response = new Response(formData, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": setTheme(theme),
    },
  });

  // console.log("response: ", response);
  return data({ submission }, response);
}

function Layout({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme?: Theme;
}) {
  return (
    <html lang="en" className={`${theme}`}>
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Links />
      </head>
      <body
        suppressHydrationWarning={true}
        className="flex justify-center w-full"
      >
        <div className="flex flex-col align-center flex-grow-1 min-h-[100vh] w-[95%] max-w-[2100px]">
          {children}
        </div>
        <Toaster closeButton position="top-center" />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function App() {
  const data = useLoaderData<typeof loader>();
  const theme = useTheme();

  return (
    <Layout>
      {/* <ThemeSwitch userPreference={theme} /> */}
      <div
        id="siteContainer"
        className="flex grow flex-col w-full mx-auto bg-background"
      >
        <Navbar></Navbar>
        <main>
          <Outlet />
        </main>
        <Footer></Footer>
      </div>
      {data.toast ? <ShowToast toast={data.toast} /> : null}
    </Layout>
  );
}

export default function Root() {
  const data = useLoaderData<typeof loader>();
  return (
    <AuthenticityTokenProvider token={data.csrfToken}>
      <HoneypotProvider {...data.honeyProps}>
        <App></App>
      </HoneypotProvider>
    </AuthenticityTokenProvider>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  // console.log("error boundary in root: ");
  return (
    <Layout>
      <Navbar></Navbar>
      <main>
        <GenericErrorBoundary
        // statusHandlers={{
        //   401: ({ params }) => (
        //     <>
        //       <h1>401</h1>
        //       <p>Unauthorized</p>
        //     </>
        //   ),
        //   403: ({ params }) => (
        //     <>
        //       <h1>403</h1>
        //       <p>Invalid Request</p>
        //     </>
        //   ),
        //   404: ({ params }) => (
        //     <>
        //       <h1>404</h1>
        //       <p>Not Found</p>
        //     </>
        //   ),
        //   418: ({ params }) => <>{`${params.key} ${params.value}`}</>,
        // }}
        ></GenericErrorBoundary>
      </main>
      <Footer></Footer>
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

function ShowToast({ toast }: { toast: Toast }) {
  const { id, type, title, description } = toast;

  useEffect(() => {
    setTimeout(() => {
      showToast[type](title, { id, description });
    }, 0);
  }, [description, id, title, type]);
  return null;
}

function useTheme() {
  // console.log("inside useTheme");
  const data = useLoaderData<typeof loader>();
  const fetchers = useFetchers();
  const fetcher = fetchers.find(
    (f) => f.formData?.get("intent") === "update-theme"
  );
  const optimisticTheme = fetcher?.formData?.get("theme");
  if (optimisticTheme === "light" || optimisticTheme === "dark") {
    return optimisticTheme;
  }

  return data.theme;
}

function ThemeSwitch({ userPreference }: { userPreference?: Theme }) {
  const fetcher = useFetcher<typeof action>();

  const [form] = useForm({
    id: "theme-switch",
    lastSubmission: fetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: ThemeFormSchema });
    },
  });

  const mode = userPreference ?? "light";
  const nextMode = mode === "light" ? "dark" : "light";

  const modeLabel = {
    light: (
      <FontAwesomeIcon
        icon={IconService.getSolid(SolidIcon.LIGHT_THEME)}
        fontSize={12}
        className="text-siteWhite"
      ></FontAwesomeIcon>
    ),
    dark: (
      <FontAwesomeIcon
        icon={IconService.getSolid(SolidIcon.DARK_THEME)}
        fontSize={12}
        className="text-siteWhite"
      ></FontAwesomeIcon>
    ),
  };

  return (
    <fetcher.Form method="POST" {...form.props}>
      <input type="hidden" name="theme" value={nextMode}></input>
      <div className="flex gap-2 h-[50px]">
        <button
          name="intent"
          value="update-theme"
          type="submit"
          className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center"
        >
          {modeLabel[mode]}
        </button>
      </div>
      <ErrorList errors={form.errors} id={form.errorId}></ErrorList>
    </fetcher.Form>
  );
}
