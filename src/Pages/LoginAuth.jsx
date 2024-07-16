import TokenHelper from "../Pages/TokenHelper";
import { Navigate, useLocation } from "react-router-dom";
import React from "react";

export const LoginAuth = ({ children }) => {
  const token = TokenHelper.getToken();
  const location = useLocation();
  console.log(token,'token')
  if (!token) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return children;
};

