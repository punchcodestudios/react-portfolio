import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import MainNavComponent from "../navigation/main-nav/main-nav.component";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const handleClick = () => {
    return navigate("/");
  };
  return (
    <>
      <MainNavComponent></MainNavComponent>
      <Box
        w={800}
        className="d-flex flex-column ms-auto me-auto"
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Heading>Oops! an error has occurred.</Heading>
        <Text className="mt-3 mb-3">
          {isRouteErrorResponse(error) ? "Invalid page" : "Unknown error"}
        </Text>
        <button className="btn btn-danger" onClick={handleClick}>
          return to homepage
        </button>
      </Box>
    </>
  );
};

export default ErrorPage;
