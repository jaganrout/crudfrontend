import TokenHelper from "../Pages/TokenHelper";
import { Navigate, useLocation } from "react-router-dom";
import React from "react";

export const LogoutAuth = ({ children }) => {
  const token = TokenHelper.getToken();
  const location = useLocation();
  if (token) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }

  return children;
};

