import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth";
import "./SignIn.css";
function SignIn() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataResponse = await response.json();

      if (!response.ok || dataResponse.error) {
        alert(dataResponse.message || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ SUCCESS
      setToken(dataResponse.token);
      alert(dataResponse.message || "Login successful");

      // ✅ reload app so navbar updates
      window.location.href = "/";
    } catch (error) {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1 className="title">Hospital Portal</h1>
        <p className="subtitle">Sign in to access your account</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Id</label>
            <input
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="redirect-text">New user?</p>
          <button
            type="button"
            className="secondary-btn"
            onClick={handleSignUp}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
