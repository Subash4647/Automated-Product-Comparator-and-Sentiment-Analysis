import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import authIcon from "../assets/auth.png";

const AuthSection = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000/api/auth";

  // Load user name from localStorage if needed
  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    if (storedUser) {
      console.log("User already logged in:", storedUser);
      // You can auto-redirect here if you want
      // navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await res.json();
      setMessage(data.message || "Signup successful");


      if (data.user.name) {
        localStorage.setItem("userName", data.user.name); // Store username in localStorage
      }

      navigate("/");
    } catch (err) {
      console.error(err);
      setMessage("Signup failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      setMessage(data.message || "Login successful");
  
      console.log(data.user.name);

      if (data.user.name) {
        localStorage.setItem("userName", data.user.name); // Store username in localStorage
      }

      navigate("/");
    } catch (err) {
      console.error(err);
      setMessage("Login failed");
    }
  };

  return (
    <section className="auth">
      <div className="container">
        <div className="backbtn">
          <Link to="/">
            <button className="backBtnSelect">Back</button>
          </Link>
        </div>

        <div className="authicon">
          <img src={authIcon} width="40px" height="40px" alt="auth" />
          <p>Authentication</p>
        </div>

        <div className="auth-wrapper">
          <div className="auth-headings">
            <p>{isLogin ? "Login" : "Create an Account"}</p>
            <p>
              {isLogin ? "Don't have an account?" : "Already Registered?"}
              <span
                className="toggle-auth"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </span>
            </p>
          </div>

          <div className="forms">
            {!isLogin && (
              <form className="signup-form" onSubmit={handleSignup}>
                <label>Username</label>
                <input
                  name="username"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your username"
                  required
                />
                <label>Email Address</label>
                <input
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter your email"
                  required
                />
                <label>Phone Number</label>
                <input
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter your phone number"
                  required
                />
                <label>Password</label>
                <input
                  name="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="Enter your password"
                  required
                />
                <label>Confirm Password</label>
                <input
                  name="confirmPassword"
                  onChange={handleChange}
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
                <button type="submit">Create Account</button>
              </form>
            )}

            {isLogin && (
              <form className="signin-form" onSubmit={handleLogin}>
                <label>Email Address</label>
                <input
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter your email"
                  required
                />
                <label>Password</label>
                <input
                  name="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="Enter your password"
                  required
                />
                <button type="submit">Sign In</button>
              </form>
            )}

            {message && (
              <p style={{ marginTop: "10px", color: "green" }}>{message}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthSection;
