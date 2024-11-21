import { RouteObject } from "react-router-dom";
import TaskList from "../../state-management/task/task-list.component";
import ErrorPage from "../error/error-page";
import GalleryDetails from "../pages/gallery/gallery-details.component";
import GalleryGridLayout from "../pages/gallery/galllery-grid-layout.component";
import HomePage from "../pages/home-page.component";
import PostList from "../pages/post-list/index";
import Resume from "../pages/resume/index";
import TodoList from "../pages/todo-list/index";
import Layout from "../pages/_layout.component";
import RegisterPage from "../pages/auth/register-page.component";
import LoginPage from "../pages/auth/login-page.component";

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
        { path: "resume", element: <Resume></Resume> },
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
          path: "todo-list",
          element: <TodoList></TodoList>,
        },
        {
          path: "post-list",
          element: <PostList></PostList>,
        },
        {
          path: "task-list",
          element: <TaskList></TaskList>,
        },
      ],
    },
  ] as RouteObject[];
}
export default routes();
