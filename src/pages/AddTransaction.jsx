import React, { useState } from 'react';
import "../styles/AddTransaction.css";
import axios from "axios";


function AddTransaction() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState("income"); // Default type


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Retrieve the JWT token from localStorage or wherever you store it
    const token = localStorage.getItem("token");  // Assuming the token is stored here after login
  
    if (!token) {
      alert("You must be logged in to add a transaction.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:4000/api/transactions",
        {
          amount,
          description,
          category,
          date,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Add the token here
          },
        }
      );
      alert(response.data.message); // Show success message
      setAmount("");
      setDescription(""); // Clear the form
      setCategory("");
      setDate("");
      setType("income");
    } catch (error) {
      console.error("❌ Error adding transaction:", error);
      alert("Failed to add transaction. Please try again.");
    }
  };
  


  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #4facfe, #00f2fe)',
    fontFamily: 'Arial, sans-serif',
  };

  const cardStyle = {
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
  };

  const buttonStyle = {
    background: 'linear-gradient(to right, #36d1dc, #5b86e5)',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    transition: '0.3s',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    background: 'linear-gradient(to right, #5b86e5, #36d1dc)',
  };

  const [hover, setHover] = useState(false);

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Add New Transaction</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="text"
            placeholder="Enter Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
            required
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={inputStyle} // ✅ Applying the same styling as input fields
            required
          >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          </select>

          <button
            type="submit"
            style={hover ? buttonHoverStyle : buttonStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTransaction;
