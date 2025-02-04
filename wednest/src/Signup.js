import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("Couple");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username, email, password, user_type: role };

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.status === "success") {
        alert("Account created successfully! Redirecting to login...");
        navigate("/login"); // ✅ Redirect to Login Page
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage("Server error, please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100"
      style={{ backgroundImage: "url('/bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
      
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>

        {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mt-6 space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={role === "Couple" ? "Full Name" : "Business Name"}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 bg-pink-200 focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Id"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 bg-pink-200 focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />

            {/* Password Input with Toggle Visibility */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 bg-pink-200 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-700"
              >
                {showPassword ? "👁️" : "🙈"} {/* Toggle icon */}
              </button>
            </div>

            {/* Role Selection Dropdown */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 bg-pink-200 focus:ring-2 focus:ring-pink-400 focus:outline-none"
            >
              <option value="Couple">Couple</option>
              <option value="Vendor">Vendor</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
          >
            Register Now
          </button>
        </form>

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
