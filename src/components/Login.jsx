import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
  
    const endpoint = isSigningUp ? "/api/signup" : "/api/login";
    const requestBody = JSON.stringify({ email, password });
  
    try {
      const response = await fetch(`http://localhost:4000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });
  
      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (!response.ok || !contentType?.includes("application/json")) {
        throw new Error("Server returned an invalid response.");
      }
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong!");
      }
  
      if (isSigningUp) {
        alert("Account created successfully! Please log in.");
        setIsSigningUp(false);
      } else {
        localStorage.setItem("token", data.token); // Store JWT
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h1 style={titleStyle}>
          {isSigningUp ? "Create an Account" : "Welcome Back"}
        </h1>
        {error && <p style={errorStyle}>{error}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>
          {isSigningUp ? "Sign Up" : "Login"}
        </button>
        <p style={toggleTextStyle} onClick={() => setIsSigningUp(!isSigningUp)}>
          {isSigningUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </p>
      </form>
    </div>
  );
}

const containerStyle = { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "linear-gradient(to right, #6a11cb, #2575fc)", fontFamily: "Arial, sans-serif", margin: "0" };
const formStyle = { background: "#fff", borderRadius: "10px", padding: "20px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", textAlign: "center", width: "100%", maxWidth: "400px" };
const inputStyle = { display: "block", width: "100%", padding: "10px", margin: "15px 0", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px" };
const buttonStyle = { display: "block", width: "100%", padding: "10px", background: "#2575fc", color: "#fff", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer", marginTop: "20px" };
const toggleTextStyle = { marginTop: "10px", color: "#333", fontSize: "14px", cursor: "pointer", textDecoration: "underline" };
const titleStyle = { marginBottom: "20px", fontSize: "24px", fontWeight: "bold", color: "#333" };
const errorStyle = { color: "red", fontSize: "14px", marginBottom: "10px" };

export default Login;