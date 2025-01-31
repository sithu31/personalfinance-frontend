import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AddTransaction from "./pages/AddTransaction";
import ViewTransactions from "./pages/ViewTransactions";
import AccountSummary from "./pages/AccountSummary";
import AIBudget from "./pages/BudgetSuggestion"; // Import the new AI Budget page
import Report from "../src/pages/Report";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/add-transaction"
          element={
            isLoggedIn ? <AddTransaction /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/view-transactions"
          element={
            isLoggedIn ? <ViewTransactions /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/account-summary"
          element={
            isLoggedIn ? <AccountSummary /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/ai-budget" // Updated path
          element={
            isLoggedIn ? <AIBudget /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/Report"
          element={<Report />}
        />
      </Routes>
    </Router>
  );
}

export default App;
