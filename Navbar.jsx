import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import favicon1 from "../assets/favicon1.png";

const Navbar = () => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {

    const storedUserName = localStorage.getItem("userName"); 
    console.log("Stored User Name:", storedUserName); 

    if (storedUserName) {
      setUserName(storedUserName); 
    }
    
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem("userName"); 
    setUserName(null); 
  };

  return (
    <header className="nav">
      <div className="nav-container">
        <div className="nav-logo">
          <img src={favicon1} alt="Logo" />
          <span>Clever Cart</span>
        </div>

        <nav className="nav-links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/developer">Developers</Link>
            </li>
            <li>
              <Link to="/chatbot">Chatbot</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/sentiment">Review</Link>
            </li>
            <li>
              <Link to="/product">Product</Link>
            </li>
            <li>
              <Link to="/feedback">Contact Us</Link>
            </li>
          </ul>
        </nav>

        <div className="nav-buttons">
          {userName ? (
            <>
              {/* This part should render the username */}
              <span style={{color:"blue"}}>Welcome, {userName}</span>
              <button className="btn user" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/adminlogin">
                <button className="btn admin">Admin</button>
              </Link>
              <Link to="/userlogin">
                <button className="btn user">User</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
