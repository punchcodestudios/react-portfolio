import useAuth from "@/state-management/auth/use-auth";
import { UserStatus } from "@/utils/enums";
import { Navigate, Outlet } from "react-router-dom";

const RestrictAuthenticated = () => {
  const { user } = useAuth();

  return user && user.status !== UserStatus.CONFIRMED ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/"></Navigate>
  );
};

export default RestrictAuthenticated;
