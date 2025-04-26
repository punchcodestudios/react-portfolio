import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppWithProviders from "./root";
import { createBrowserRouter, RouterProvider } from "react-router";

function convert(m: any) {
  let { clientLoader, clientAction, default: Component, ...rest } = m;
  console.log("are we converting");
  return {
    ...rest,
    loader: clientLoader,
    action: clientAction,
    Component,
  };
}

let router = createBrowserRouter([
  {
    path: "about",
    lazy: () => import("./routes/about").then(convert),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
