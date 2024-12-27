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
import AddTaskForm from "../pages/task-list/add-task.form";
import SignUpConfirmationPage from "../pages/auth/sign-up-confirmation-page.component";
import WelcomePage from "../pages/auth/welcome-page.component";
import PublicRoute from "./publicRoute";
import PrivateRoute from "./privateRoute";

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
          element: <Resume />,
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
          path: "tasks",
          element: <PrivateRoute />,
          children: [
            {
              path: "task-list",
              element: <TaskListPage></TaskListPage>,
            },
            {
              path: "add-task",
              element: <AddTaskForm></AddTaskForm>,
            },
          ],
        },
        {
          path: "user",
          element: <PublicRoute />,
          children: [
            {
              path: "login",
              element: <LoginPage></LoginPage>,
            },
            {
              path: "register",
              element: <RegisterPage></RegisterPage>,
            },
            {
              path: "confirm-email",
              element: <SignUpConfirmationPage />,
            },
            {
              path: "welcome",
              element: <WelcomePage />,
            },
          ],
        },
      ],
    },
  ] as RouteObject[];
}
export default routes();
