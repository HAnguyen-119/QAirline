import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");

  // Nếu không có token, chuyển hướng về trang login
  if (!token) {
    return <Navigate to="/" />;
  }
  // Nếu có token, hiển thị nội dung của trang
  return children;
};

export default ProtectedRoute;
