import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CoupleDashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Get user details from localStorage
  const email = localStorage.getItem("userEmail");
  const authToken = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    // ✅ Redirect to login if user is not authenticated or has the wrong role
    if (!authToken || !email || userRole !== "Couple") {
      navigate("/login");
      return;
    }

    // ✅ Fetch couple details from backend
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/couple/dashboard/${email}`, {
          headers: { Authorization: `Bearer ${authToken}` }, // Send token
        });
        const data = await response.json();

        console.log("API Response:", data); // Debug API response

        if (data.status === "success") {
          setUserData(data.data);
        } else {
          console.error("Failed to fetch couple data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching couple data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email, authToken, userRole, navigate]);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole"); // Clear role
    navigate("/login");
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-blue-100">
      {/* Header Section */}
      <header className="bg-orange-300 p-4 flex justify-between items-center">
        <img src="WEDNEST_LOGO.png" alt="WedNest Logo" className="h-24 w-auto" />
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Log Out
        </button>
      </header>


      <div className="grid grid-cols-4 gap-6 p-6">
        {/* Sidebar */}
        <div
          className="p-6 rounded-lg min-h-[700px] text-center bg-cover bg-center"
          style={{ backgroundImage: "url('/bgcouple.jpg')" }}
        >
          <div className="w-32 h-32 bg-gray-400 mb-4 rounded-full"></div>
          <p className="font-semibold">@{userData?.username || "Loading..."}</p>
          <p>{userData?.email || "No email found"}</p>
          <p className="text-lg font-semibold">Wedding Countdown</p>
          <p>{userData?.wedding_date || "Not Set"}</p>
        </div>

        {/* Main Content */}
        <div className="col-span-3 grid grid-cols-3 gap-6">
          {/* Budget Section */}
          <div
            className="p-4 rounded-lg text-white bg-cover bg-center"
            style={{ backgroundImage: "url('/bgcouple.jpg')" }}
          >
            <h2 className="text-lg font-semibold">Budget</h2>
            <p>Budget Set: ${userData?.budget || 0}</p>
          </div>

          {/* Welcome Section */}
          <div
            className="p-4 rounded-lg text-center text-white bg-cover bg-center"
            style={{ backgroundImage: "url('/bgcouple.jpg')" }}
          >
            <h2 className="text-lg font-semibold">Welcome Back, {userData?.username || "User"}!</h2>
            <p>Your big day on: {userData?.wedding_date || "Not Set"}</p>
          </div>

          {/* Vendors Section */}
          <div
            className="p-4 rounded-lg text-white bg-cover bg-center"
            style={{ backgroundImage: "url('/bgcouple.jpg')" }}
          >
            <h2 className="text-lg font-semibold">Vendors Booked</h2>
            <p>Shows vendor name and service type</p>
          </div>
        </div>
      </div>
    </div>
  );
}
