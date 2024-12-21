import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import InputElement from "../../components/Form/InputElement.jsx";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import loginBackground from "../../assets/images/authenticationbackground.jpg";

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

    sessionStorage.setItem("userData", JSON.stringify(userData));

    console.log(userData);

    try {
      // Gửi request đến API để kiểm tra đăng nhập
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        userData
      );
      console.log(response.data);

      if (response.status === 200) {
        alert("Login succesfully!");
        sessionStorage.setItem("isLogin", "true");
        sessionStorage.setItem("token", response.data.access_token);
        navigate("/admin");
      }
    } catch (error) {
      if (error.response) {
        setError("Wrong username or password, please try again!");
      } else if (error.request) {
        setError("Can't send request to server, please retry!");
      } else {
        setError("Some errors occurred, please try again later!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <div className="inner">
        <form className="login" onSubmit={handleSubmit}>
          <h1 className="login-title">LOGIN FOR ADMINISTRATORS</h1>
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
        </form>
      </div>
    </div>
  );
}
