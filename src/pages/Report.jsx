import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import axios from "axios"; // Add axios for fetching data
import "../styles/Report.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Report = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch account summary data from the backend
    const fetchAccountSummary = async () => {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      if (!token) {
        setError("You must be logged in to view the report.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("https://new-backend-8nee.onrender.com/api/account-summary", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        });
        setTotalIncome(response.data.totalIncome);
        setTotalExpenses(response.data.totalExpenses);
        setLoading(false);
      } catch (error) {
        setError("Failed to load account summary.");
        console.error("Error fetching account summary:", error);
        setLoading(false);
      }
    };

    fetchAccountSummary();
  }, []);

  const netProfit = totalIncome - totalExpenses;
  const profitMargin = totalIncome ? (netProfit / totalIncome) * 100 : 0;

  const barData = {
    labels: ["Total Income", "COGS", "Gross Profit", "Expenses", "Taxes", "Net Profit"],
    datasets: [
      {
        label: "Amount",
        data: [
          totalIncome,
          -1259, // Placeholder for COGS (Cost of Goods Sold)
          totalIncome - 1259, // Gross Profit (Income - COGS)
          -totalExpenses,
          -1000, // Placeholder for Taxes
          netProfit,
        ],
        backgroundColor: ["#28a745", "#dc3545", "#28a745", "#dc3545", "#dc3545", "#28a745"],
      },
    ],
  };

  const doughnutData = {
    labels: ["Profit Margin", "Remaining"],
    datasets: [
      {
        data: [profitMargin, 100 - profitMargin],
        backgroundColor: ["#28a745", "#e0e0e0"],
      },
    ],
  };

  return (
    <div className="report-container">
      <div className="financial-statement">
        <h2 className="title">Financial Overview</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="chart-container">
            <Bar data={barData} options={{ responsive: true }} />
          </div>
        )}
      </div>

      <div className="net-profit">
        <h2 className="title">Net Profit Margin</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="chart-container">
            <Doughnut data={doughnutData} options={{ responsive: true }} />
            <p className="profit-percentage">{profitMargin.toFixed(2)}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;
