import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeddingLandingPage from "./WeddingLandingPage";
import CoupleLogin from "./CoupleLogin";
import VendorLogin from "./VendorLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeddingLandingPage />} />
        <Route path="/couple-login" element={<CoupleLogin />} />
        <Route path="/vendor-login" element={<VendorLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
