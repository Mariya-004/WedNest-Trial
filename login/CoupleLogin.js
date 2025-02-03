import React from "react";

import { Link } from "react-router-dom";

const CoupleLogin = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-pink-100"
      style={{
        backgroundImage: "url('/bg.png')", // Update with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-600 mt-2">Sign in to your account</p>

        {/* Form Fields */}
        <div className="mt-6 space-y-4">
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
        </div>

        {/* Login Button */}
        <button className="w-full mt-6 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition">
          Login
        </button>

        {/* Sign Up Link */}
        <p className="mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/couple-signup" className="text-pink-600 font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CoupleLogin;
