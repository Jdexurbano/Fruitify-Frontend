import { useAuth } from "@/context/AuthContext";
import { Outlet, Navigate } from "react-router";

function PublicRoutes() {
  const { token } = useAuth();
  return token ? <Navigate to={"/"} /> : <Outlet />;
}

export default PublicRoutes;
