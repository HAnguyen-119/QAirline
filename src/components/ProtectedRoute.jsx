import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLogin = sessionStorage.getItem("isLogin");
  const token = sessionStorage.getItem("token");

  // Nếu không có token, chuyển hướng về trang login
  if (!isLogin || !token) {
    return <Navigate to="/" />;
  }
  // Nếu có token, hiển thị nội dung của trang
  return children;
};

export default ProtectedRoute;
