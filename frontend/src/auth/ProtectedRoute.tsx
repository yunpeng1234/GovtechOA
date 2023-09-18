import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { useLocation, Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const location = useLocation();
  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
}
export default ProtectedRoute;
