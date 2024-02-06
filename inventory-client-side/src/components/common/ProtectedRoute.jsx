import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const reduxStore = useSelector((store) => store);
  const user = reduxStore.user.value;
  console.log(user);
  if (user) {
    return <Outlet />;
  }
  return <Navigate to="/login"/>
}