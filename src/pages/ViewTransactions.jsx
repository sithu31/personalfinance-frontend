import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ViewTransactions.css";

function ViewTransactions({ refreshAccountSummary }) {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedType, setUpdatedType] = useState(""); // ✅ Added state for type

  // Fetch transactions from the backend
  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to view transactions.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:4000/api/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        alert("Failed to fetch transactions.");
      }
    };

    fetchTransactions();
  }, []);

  // Handle edit click
  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
    setUpdatedDescription(transaction.description);
    setUpdatedAmount(transaction.amount);
    setUpdatedCategory(transaction.category);
    setUpdatedDate(transaction.date.split("T")[0]); // Format date for input field
    setUpdatedType(transaction.type); // ✅ Set the type correctly
  };

  // Fetch report data after updating transaction
  const fetchReportData = async () => {
    try {
      const token = localStorage.getItem("token");
      const reportResponse = await axios.get("http://localhost:4000/api/report", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Report updated:", reportResponse.data);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  // Handle transaction update
  const handleUpdate = async () => {
    if (!updatedDescription || !updatedAmount || !updatedCategory || !updatedDate || !updatedType) {
      alert("All fields are required!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to update transactions.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/api/transactions/${editingTransaction._id}`,
        {
          description: updatedDescription,
          amount: parseFloat(updatedAmount), // ✅ Ensure amount is a number
          category: updatedCategory,
          date: updatedDate,
          type: updatedType, // ✅ Ensure type is included
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ Correctly update transactions state
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction._id === editingTransaction._id ? response.data.transaction : transaction
        )
      );

      setEditingTransaction(null);
      alert("Transaction updated successfully!");

      // ✅ Refresh account summary & reports
      if (refreshAccountSummary) {
        refreshAccountSummary();
      }
      await fetchReportData();

    } catch (error) {
      console.error("Error updating transaction:", error);
      alert("Failed to update transaction.");
    }
  };

  const handleCancel = () => {
    setEditingTransaction(null);
  };

  return (
    <div className="transaction-list-container">
      <h2>View Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className="transaction-list">
          {transactions.map((transaction) => (
            <li key={transaction._id} className="transaction-item">
              <span>
                {transaction.description} - ${transaction.amount} - {transaction.category} - {transaction.date.split("T")[0]}
              </span>
              <button onClick={() => handleEditClick(transaction)}>Edit</button>
            </li>
          ))}
        </ul>
      )}

      {editingTransaction && (
        <div className="edit-transaction-form">
          <h3>Edit Transaction</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <input type="text" value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} required />
            <input type="number" value={updatedAmount} onChange={(e) => setUpdatedAmount(e.target.value)} required />
            <input type="text" value={updatedCategory} onChange={(e) => setUpdatedCategory(e.target.value)} required />
            <input type="date" value={updatedDate} onChange={(e) => setUpdatedDate(e.target.value)} required />

            {/* ✅ Added dropdown for selecting transaction type */}
            <select value={updatedType} onChange={(e) => setUpdatedType(e.target.value)} required>
              <option value="">Select Type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <button type="submit">Update</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ViewTransactions;
