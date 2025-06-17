import React from "react";
import { Navigate } from "react-router";
import { getToken } from "../Models/token";

interface RoleProtectedRouteProps {
  allowedRoles: string[];
  children: JSX.Element;
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ allowedRoles, children }) => {
  const user = getToken();

  if (!user || !allowedRoles.includes(user.rol)) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default RoleProtectedRoute;