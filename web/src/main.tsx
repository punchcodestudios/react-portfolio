import "bootstrap-icons/font/bootstrap-icons.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./app.css";

import { ChakraProvider, theme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./components/routing/app.routing";
import AuthProvider from "./state-management/auth/auth-provider";
import TaskProvider from "./state-management/task/task-provider";
import "./index.css";

//http://localhost:5173/

const queryClient = new QueryClient();

const element = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(element!);

const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

root.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TaskProvider>
        <ChakraProvider theme={theme}>
          <RouterProvider
            router={router}
            future={{
              v7_startTransition: true,
            }}
          />
          <ReactQueryDevtools></ReactQueryDevtools>
        </ChakraProvider>
      </TaskProvider>
    </AuthProvider>
  </QueryClientProvider>
);
