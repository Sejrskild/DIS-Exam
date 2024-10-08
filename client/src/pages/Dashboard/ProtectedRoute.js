import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

function ProtectedRoute({ children }) {
  const { user } = useAppContext();

  if (!user) {
    return <Navigate to="/velkommen" />;
  }

  return children;
}

export default ProtectedRoute;
