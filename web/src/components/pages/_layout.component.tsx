// import useAuth from "@/state-management/auth/use-auth";
import useAuth from "@/state-management/auth/use-auth";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import authService from "../../services/auth-service";
import MainNavComponent from "../navigation/main-nav/main-nav.component";
import SubNavComponent from "../navigation/sub-nav/sub-nav.component";
import PageFooter from "../footer/page-footer.component";

function LayoutComponent() {
  const { user, dispatch } = useAuth();

  useEffect(() => {
    authService.refreshAccessToken().then((response) => {
      // console.log("in layout use effect: ", response);
      if (!response.meta.success) {
        dispatch({ type: "INIT" });
        return;
      } else {
        const user = response.target[0];
        dispatch({
          type: "SET_USER",
          payload: {
            ...user,
          },
        });
      }
    });
  }, []);

  useEffect(() => {
    // let refreshAccessTokenTimerId: NodeJS.Timeout;
    // if (user?.isAuthenticated) {
    // console.log("heartbeat");
    // refreshAccessTokenTimerId = setTimeout(() => {
    // console.log("heartbeat");
    //   refreshAccessToken();
    // }, 10000);
    // // }
    // return () => {
    //   if (user?.isAuthenticated && refreshAccessTokenTimerId) {
    //     clearTimeout(refreshAccessTokenTimerId);
    //   }
    // };
  }, [user]);
  // reminder : [user, refreshAccessToken]

  return (
    <div className="container site-container">
      {/* <div> */}
      <MainNavComponent />
      <SubNavComponent></SubNavComponent>
      {/* </div>
      <div> */}
      <main className="main-content d-flex flex-column">
        <Outlet></Outlet>
      </main>
      {/* </div>
      <div> */}
      <PageFooter></PageFooter>
      {/* </div> */}
    </div>
  );
}
export default LayoutComponent;
