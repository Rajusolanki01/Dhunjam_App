// components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/api";
import "./Login.scss";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import Notification from "../Notification/Notification";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await login(username, password);
      // Assuming that the login is successful, navigate to Admin Dashboard
      navigate(`/admin/${response.data.id}`);
    } catch (error) {
      console.error("Login error", error);
      setNotification({
        message: "Login failed. Please try again.",
        type: "error",
      });

      setTimeout(() => {
        setNotification(null);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-box">
        <h2 className="heading">Venue Admin Login</h2>
        <input
          type="email"
          className="email"
          value={username} // Add value attribute to the input field
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          required
        />

        <input
          type={passwordVisible ? "text" : "Password"}
          className="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        <div className="toggle-btn">
          <button
            className="password-toggle"
            onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button className="sign-in-btn" onClick={handleLogin}>
          sign in
        </button>
        {loading && <LoadingSpinner />}
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}
        <p className="subheading">New Registration?</p>
      </div>
    </div>
  );
};

export default Login;
