// components/ProtectedRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const user = useSelector(state => state.auth.currentUser);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
