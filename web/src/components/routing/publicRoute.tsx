import userService from "@/services/user-service";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

const PublicRoute: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const hasAuthenticatedUser = async () => {
      const response = await userService.isAuthenticated();
      return response.meta.success;
    };

    hasAuthenticatedUser().then((response) => {
      setIsAuthenticated(response);
    });
  }, [isAuthenticated]);

  if (isAuthenticated == null) return <Spinner></Spinner>;
  console.log("isAuthenticated is null");
  if (isAuthenticated) {
    console.log("authenticated");
    navigate("/");
    return null;
  }
  console.log("return outlet");
  return <Outlet></Outlet>;
};

export default PublicRoute;
