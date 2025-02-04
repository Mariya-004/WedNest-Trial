import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeddingLandingPage from "./WeddingLandingPage";
import Login from "./Login";
import Signup from "./Signup";
import VendorDashboard from "./VendorDashboard"; // Import the new dashboard

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeddingLandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} /> {/* Vendor Dashboard Route */}
      </Routes>
    </Router>
  );
}

export default App;
