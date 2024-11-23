import { useAuth } from "@/contexts/auth-context";
import NodeAPIClient from "@/services/node-api-client";
import { Box } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import MainNavComponent from "../navigation/main-nav/main-nav.component";
import SubNavComponent from "../navigation/sub-nav/sub-nav.component";

function LayoutComponent() {
  const { login, logout, isAuthenticated, expiresAt } = useAuth();
  const apiClient = new NodeAPIClient("/auth/refresh");

  const refreshAccessToken = useCallback(async () => {
    // if (!isAuthenticated) {
    //   return;
    // }
    try {
      const response = await apiClient.post({});
      const { user, accessToken, expiresAt, status } = response;
      console.log("response.status: ", status);
      if (response.status === 204) {
        console.log("resposne status === 204: ", response);
        logout();
      } else {
        console.log("all is well, carry on: ", response);
        login(user, accessToken, expiresAt);
      }
    } catch (error) {
      console.log("error caught: ", error);
      logout();
    }
  }, [login, logout]);

  useEffect(() => {
    console.log("in layout use effect");
    refreshAccessToken();
  }, [refreshAccessToken]);

  useEffect(() => {
    let refreshAccessTokenTimerId: NodeJS.Timeout;
    if (isAuthenticated) {
      console.log("heartbeat");
      refreshAccessTokenTimerId = setTimeout(() => {
        refreshAccessToken();
      }, 10000);
    }

    return () => {
      if (isAuthenticated && refreshAccessTokenTimerId) {
        clearTimeout(refreshAccessTokenTimerId);
      }
    };
  }, [expiresAt, isAuthenticated, refreshAccessToken]);

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
