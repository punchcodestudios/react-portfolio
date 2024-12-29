// import useAuth from "@/state-management/auth/use-auth";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MainNavComponent from "../navigation/main-nav/main-nav.component";
import SubNavComponent from "../navigation/sub-nav/sub-nav.component";
import useAuth from "@/state-management/auth/use-auth";
import authService from "../../services/auth-service";

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
      <Box>
        <MainNavComponent />
        <SubNavComponent></SubNavComponent>
      </Box>
      <Box>
        <main className="main-content d-flex flex-column">
          <Outlet></Outlet>
        </main>
      </Box>
      <Box>
        <footer>(C) punchcodestudios.com</footer>
      </Box>
    </div>
  );
}
export default LayoutComponent;
