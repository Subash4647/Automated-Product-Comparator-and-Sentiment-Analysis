import React, { useState } from "react";
import admin from "../assets/admin.png";
import { Link, useNavigate } from "react-router-dom";

const AdminSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Save admin info to localStorage
      localStorage.setItem("admin", JSON.stringify(data));

      alert("Login successful");
      console.log(data);

      navigate('/admin/view'); // Redirect to admin dashboard
    } catch (error) {
      alert(error.message);
      console.error("Login error:", error);
    }
  };

  return (
    <section className="adminauth">
      <div className="container">
        <div className="backbtn">
          <Link to="/">
            <button className="backBtnSelect">Back</button>
          </Link>
        </div>
        <div className="adminauth-wrapper">
          <div>
            <img src={admin} width="40px" height="40px" alt="Admin" />
            <p>Admin</p>
          </div>
          <div>
            <form onSubmit={handleLogin}>
              <label>Email address</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminSection;
