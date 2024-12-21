import useAuth from "@/state-management/auth/use-auth";
import { UserStatus } from "@/utils/enums";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuthenticated = () => {
  const { user } = useAuth();

  return user && user.status === UserStatus.CONFIRMED ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/login"></Navigate>
  );
};

export default RequireAuthenticated;
