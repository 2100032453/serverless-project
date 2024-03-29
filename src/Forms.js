// Forms.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import "./Forms.css"; // Import CSS file

export default function Forms() {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const toggleComponent = () => {
    setShowLogin(!showLogin);
  };

  const handleLoginSuccess = (email) => {
    // Save email in localStorage
    localStorage.setItem("userEmail", email);
    console.log(email);
    // Navigate to the Home page
    navigate("/home");
  };

  return (
    <div>
      {/* Marquee tag */}
      <marquee behavior="scroll" direction="left">
        Cloud Storage Web App!!
      </marquee>

      <div className="forms-container">
        <div className="forms-box">
          <h1>Cloud Storage</h1>

          {showLogin ? (
            <Login onLoginSuccess={handleLoginSuccess} />
          ) : (
            <SignUp />
          )}
          <button className="forms-button" onClick={toggleComponent}>
            {showLogin ? "Show SignUp" : "Show Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
