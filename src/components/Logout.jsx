
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Xóa token khỏi sessionStorage
    sessionStorage.setItem("isLogin", "false");
    sessionStorage.removeItem("token");

    // Chuyển hướng người dùng về trang đăng nhập
    navigate("/");
  }, [navigate]);

  return null; // Không cần render gì cả, chỉ cần thực hiện hành động khi component được gọi
};

export default Logout;
