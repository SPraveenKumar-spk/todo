import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../store/Auth";

function ProtectedRoutes() {
  const { isLoggedIn } = useAuth();
  console.log("from protected", isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
