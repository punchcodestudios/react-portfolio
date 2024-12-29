import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import userService from "../../services/user-service";
import { Spinner } from "react-bootstrap";

const PrivateRoute: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const hasAuthenticatedUser = async () => {
      const response = await userService.isAuthenticated();
      console.log("auth response: ", response);
      return response.meta.success;
    };

    hasAuthenticatedUser().then((response) => {
      setIsAuthenticated(response);
    });
  }, [isAuthenticated]);

  if (isAuthenticated == null) return <Spinner></Spinner>;
  // console.log("isAuthenticated is null");
  if (!isAuthenticated) {
    // console.log("not authenticated");
    navigate("/");
    return null;
  }
  // console.log("return outlet");
  return <Outlet></Outlet>;
};

export default PrivateRoute;
