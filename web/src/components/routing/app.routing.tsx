import { RouteObject } from "react-router-dom";
import ErrorPage from "../error/error-page";
import Layout from "../pages/_layout.component";
import AboutPage from "../pages/about/about-page";
import LoginPage from "../pages/auth/login-page.component";
import RegisterPage from "../pages/auth/register-page.component";
import GalleryDetails from "../pages/gallery/gallery-details.component";
import GalleryGridLayout from "../pages/gallery/galllery-grid-layout.component";
import HomePage from "../pages/home-page.component";
import Resume from "../pages/resume/index";
import TaskListPage from "../pages/task-list/task-list.page";

function routes() {
  return [
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          index: true,
          element: <HomePage></HomePage>,
        },
        { path: "home", element: <HomePage></HomePage> },
        {
          path: "resume",
          element: (
            // <ResumeProvider>
            <Resume />
            // </ResumeProvider>
          ),
        },
        { path: "about", element: <AboutPage></AboutPage> },
        {
          path: "galleries",
          element: <GalleryGridLayout></GalleryGridLayout>,
        },
        {
          path: "galleries/:slug",
          element: <GalleryDetails></GalleryDetails>,
        },
        {
          path: "login/",
          element: <LoginPage></LoginPage>,
        },
        {
          path: "register/",
          element: <RegisterPage></RegisterPage>,
        },
        {
          path: "task-list",
          element: <TaskListPage></TaskListPage>,
        },
      ],
    },
  ] as RouteObject[];
}
export default routes();
