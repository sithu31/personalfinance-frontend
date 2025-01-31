import React, { useState, useEffect } from "react";
import axios from "axios";

function AccountSummary({ refreshTrigger }) {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAccountSummary = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to view account summary.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:4000/api/account-summary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSummary(response.data);
    } catch (error) {
      setError("Failed to load account summary.");
      console.error("Error fetching account summary:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountSummary();
  }, [refreshTrigger]);

  // Inline styles
  const containerStyle = {
    
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    borderRadius: "15px",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    color: "#fff",
    fontFamily: "'Poppins', sans-serif",
    transition: "transform 0.3s ease-in-out",
    marginTop:"250px",
  };

  const summaryItemStyle = {
    fontSize: "20px",
    margin: "12px 0",
    fontWeight: "500",
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
  };

  const summaryLabelStyle = {
    fontWeight: "600",
  };

  const summaryValueStyle = {
    fontWeight: "700",
    color: "#ffdf40",
  };

  const errorStyle = {
    color: "#d9534f",
    fontWeight: "bold",
    fontSize: "16px",
    background: "#fdecea",
    padding: "12px",
    borderRadius: "5px",
    borderLeft: "5px solid #d9534f",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      <h2>Account Summary</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={errorStyle}>{error}</p>
      ) : (
        <>
          <p style={summaryItemStyle}>
            <span style={summaryLabelStyle}>Total Income:</span> 
            <span style={summaryValueStyle}>${summary.totalIncome.toFixed(2)}</span>
          </p>
          <p style={summaryItemStyle}>
            <span style={summaryLabelStyle}>Total Expenses:</span> 
            <span style={summaryValueStyle}>${summary.totalExpenses.toFixed(2)}</span>
          </p>
          <p style={summaryItemStyle}>
            <span style={summaryLabelStyle}>Balance:</span> 
            <span style={summaryValueStyle}>${summary.balance.toFixed(2)}</span>
          </p>
        </>
      )}
    </div>
  );
}

export default AccountSummary;
