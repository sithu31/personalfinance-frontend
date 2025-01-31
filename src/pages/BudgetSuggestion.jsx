import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/BudgetSuggestion.css";

function BudgetSuggestion() {
  const [budgetData, setBudgetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBudgetSuggestion = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view budget suggestions.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:4000/api/budget-suggestion", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Budget Suggestion Response:", response.data);
        setBudgetData(response.data);
      } catch (error) {
        console.error("Error fetching budget suggestion:", error);
        setError("Failed to load budget suggestion.");
      } finally {
        setLoading(false);
      }
    };

    fetchBudgetSuggestion();
  }, []);

  return (
    <div className="budget-suggestion-container">
      <h2>Budget Suggestion</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : budgetData ? (
        <div className="budget-details">
          <p><strong>Total Income:</strong> ${budgetData.totalIncome}</p>
          <p><strong>Total Expenses:</strong> ${budgetData.totalExpenses}</p>
          <p><strong>Suggested Savings:</strong> ${budgetData.suggestedSavings}</p>
          <p><strong>Investment Advice:</strong> {budgetData.investmentAdvice}</p>
        </div>
      ) : (
        <p>No budget data available.</p>
      )}
    </div>
  );
}

export default BudgetSuggestion;
