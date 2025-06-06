import { useAuth } from "@/context/AuthContext";
import { Outlet, Navigate } from "react-router";

function PrivateRoutes() {
  const { token } = useAuth();

  return token ? <Outlet /> : <Navigate to={"login"} />;
}

export default PrivateRoutes;
