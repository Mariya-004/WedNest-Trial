import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VendorDashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const email = localStorage.getItem("userEmail");
  const authToken = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    if (!authToken || !email || userRole !== "Vendor") {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/vendor/dashboard/${user_id}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        const data = await response.json();

        if (response.ok && data.status === "success") {
          setUserData(data.data);
        } else {
          console.error("Failed to fetch vendor data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user_id, authToken, userRole, email, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-orange-300 p-4 flex justify-between items-center shadow-md">
        <img src="/WEDNEST_LOGO.png" alt="WedNest Logo" className="h-20 w-auto" />
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
          Logout
        </button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="p-6 w-1/4 text-center bg-cover bg-center shadow-lg flex flex-col justify-between min-h-screen" style={{ backgroundImage: "url('/bgdash.jpeg')" }}>
          <div className="w-32 h-32 mb-4 rounded-full mx-auto overflow-hidden">
            <img src={userData?.profile_image || "/profile.png"} alt="Profile" className="w-full h-full object-cover" />
          </div>

          <p className="font-semibold text-lg text-black">@{userData?.username || "Loading..."}</p>
          <p className="text-black">{userData?.email || "No email found"}</p>
          <p className="text-lg font-semibold mt-4 text-black">Business Name</p>
          <p className="text-black">{userData?.business_name || "Not Set"}</p>
          <p className="text-lg font-semibold mt-4 text-black">Vendor Type</p>
          <p className="text-black">{userData?.vendor_type || "Not Set"}</p>

          <button onClick={() => navigate("/vendor-profile")} className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
            Edit Profile
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col w-3/4 p-6 bg-gradient-to-b from-white to-blue-50 min-h-screen">
          <div className="grid grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl text-black shadow-xl flex flex-col items-center justify-center transition-transform hover:scale-105" style={{ background: "linear-gradient(135deg, #ffffff, #ffe8d9)", height: "250px" }}>
              <h2 className="text-2xl font-bold mb-2">Coming Up</h2>
              <ul className="mt-2 text-md text-center space-y-1">
                {userData?.upcoming_bookings?.length > 0 ? (
                  userData.upcoming_bookings.map((booking, index) => (
                    <li key={index}>{booking}</li>
                  ))
                ) : (
                  <p>No upcoming bookings</p>
                )}
              </ul>
            </div>

            {/* Navigate to VendorRequests */}
            <div className="p-6 rounded-3xl text-black shadow-xl flex flex-col items-center justify-center transition-transform hover:scale-105" style={{ background: "linear-gradient(135deg, #fdf0f4, #faf1ff)", height: "250px" }}>
              <h2 className="text-2xl font-bold mb-3">Bookings & Requests</h2>
              <button onClick={() => navigate("/vendor-requests")} className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
                Manage Requests
              </button>
            </div>

            <div className="p-6 rounded-3xl text-black shadow-xl flex flex-col items-center justify-center transition-transform hover:scale-105" style={{ background: "linear-gradient(135deg, #ecfdf5, #e0f7fa)", height: "250px" }}>
              <h2 className="text-2xl font-bold mb-3">Earnings</h2>
              <p className="text-4xl font-extrabold text-green-600">${userData?.earnings || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}