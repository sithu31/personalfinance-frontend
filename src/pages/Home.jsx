import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/iStock-903735920-scaled.webp"


import { FiPlusCircle, FiList, FiPieChart, FiSettings, FiBarChart2, FiLogOut } from "react-icons/fi";
import axios from "axios";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Test connection to the backend
    axios.get("https://new-backend-8nee.onrender.com/api/test")
      .then((response) => console.log(response.data.message))
      .catch((error) => console.error("Error connecting to backend:", error));
  }, []);

  const handleAddTransaction = () => navigate("/add-transaction");
  const handleViewTransactions = () => navigate("/view-transactions");
  const handleViewSummary = () => navigate("/account-summary");
  const handleAIBudget = () => navigate("/ai-budget");
  const handleGenerateReports = () => navigate("/Report");
  const handleLogout = () => {
    alert("Logging out...");
    navigate("/login");
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover", // Ensures the image covers the entire background
    backgroundPosition: "center", // Centers the image
    backgroundRepeat: "no-repeat", // Prevents tiling
    backgroundBlendMode: "overlay", // Blends with gradient for a stylish look
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for better readability
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    textAlign: "center",
  };
  
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    maxWidth: "900px",
    width: "100%",
  };
  
  const cardStyle = {
    background: "white",
    color: "#333",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };
  
  const cardHoverStyle = {
    transform: "scale(1.05)",
    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.15)",
  };
  
  const iconStyle = {
    fontSize: "36px",
    marginBottom: "10px",
    color: "#6a11cb",
  };
  
  const headerStyle = {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "20px",
  };
  
  const descriptionStyle = {
    fontSize: "18px",
    marginBottom: "30px",
  };
  

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Welcome to Personal Finance Manager</h1>
      <p style={descriptionStyle}>What would you like to do today?</p>
      <div style={gridStyle}>
        <div
          style={cardStyle}
          onClick={handleAddTransaction}
          onMouseEnter={(e) => Object.assign(e.target.style, cardHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, cardStyle)}
        >
          <FiPlusCircle style={iconStyle} />
          <h3>Add New Transaction</h3>
        </div>
        <div
          style={cardStyle}
          onClick={handleViewTransactions}
          onMouseEnter={(e) => Object.assign(e.target.style, cardHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, cardStyle)}
        >
          <FiList style={iconStyle} />
          <h3>View Transactions</h3>
        </div>
        <div
          style={cardStyle}
          onClick={handleViewSummary}
          onMouseEnter={(e) => Object.assign(e.target.style, cardHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, cardStyle)}
        >
          <FiPieChart style={iconStyle} />
          <h3>View Account Summary</h3>
        </div>
        <div
          style={cardStyle}
          onClick={handleAIBudget}
          onMouseEnter={(e) => Object.assign(e.target.style, cardHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, cardStyle)}
        >
          <FiSettings style={iconStyle} />
          <h3>BudgetSuggestion</h3>
        </div>
        <div
          style={cardStyle}
          onClick={handleGenerateReports}
          onMouseEnter={(e) => Object.assign(e.target.style, cardHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, cardStyle)}
        >
          <FiBarChart2 style={iconStyle} />
          <h3>Generate Reports</h3>
        </div>
        <div
          style={cardStyle}
          onClick={handleLogout}
          onMouseEnter={(e) => Object.assign(e.target.style, cardHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, cardStyle)}
        >
          <FiLogOut style={iconStyle} />
          <h3>Logout</h3>
        </div>
      </div>
    </div>
  );
}

export default Home;
