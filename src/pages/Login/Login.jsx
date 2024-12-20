import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import InputElement from "../../components/Form/InputElement.jsx";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    // Tạo object chứa dữ liệu gửi đi
    const userData = {
      email: email,
      password: password,
    };

    console.log(userData);

    try {
      // Gửi request đến API để kiểm tra đăng nhập
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        userData
      );
      console.log(response.data);

      if (response.status === 200) {
        alert("Đăng nhập thành công!");
        sessionStorage.setItem("token", response.data.access_token);
        navigate("/admin");
      }
    } catch (error) {
      if (error.response) {
        setError("Sai tên đăng nhập hoặc mật khẩu.");
      } else if (error.request) {
        setError("Không thể kết nối đến máy chủ. Vui lòng thử lại.");
      } else {
        setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <div className="inner">
        <form onSubmit={handleSubmit}>
          <h1>LOGIN</h1>
          <InputElement
            htmlFor="email"
            description="Email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputElement
            htmlFor="password"
            description="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button className="button" type="submit" disabled={loading}>
            Login
          </button>

          <div className="switch">
            <p>Don't have an account?</p>
            <NavLink to="/signup">Sign up</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
