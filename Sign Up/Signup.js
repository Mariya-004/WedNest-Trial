import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("Couple"); // Default role is "Couple"

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-pink-100"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder={role === "Couple" ? "Full Name" : "Business Name"}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 bg-pink-200 focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email Id"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 bg-pink-200 focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 bg-pink-200 focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />

          {/* Role Selection Dropdown */}
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 bg-pink-200 focus:ring-2 focus:ring-pink-400 focus:outline-none"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Couple">Couple</option>
            <option value="Vendor">Vendor</option>
          </select>
        </div>

        <button className="w-full mt-6 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition">
          Register Now
        </button>

        <p className="mt-4 text-gray-600">
          Already a member?{" "}
          <Link to="/login" className="text-pink-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
