import React from "react";
import { Link } from "react-router-dom";

const VendorDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100"
      style={{ backgroundImage: "url('/bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
      
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800">Vendor Dashboard</h2>
        <p className="text-gray-600 mt-2">Welcome to your dashboard!</p>

        {/* Sample Dashboard Content */}
        <div className="mt-6 space-y-4">
          <button className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-700 transition">
            View Bookings
          </button>
          <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-700 transition">
            Manage Services
          </button>
        </div>

        {/* Logout Button */}
        <Link to="/login">
          <button className="w-full mt-6 bg-red-500 text-white py-3 rounded-lg hover:bg-red-700 transition">
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VendorDashboard;
