import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeddingLandingPage from "./WeddingLandingPage";
import Login from "./Login";
import Signup from "./Signup"; // Single sign-up page for both roles

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeddingLandingPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} /> {/* Single Sign-Up Page */}
      </Routes>
    </Router>
  );
}

export default App;