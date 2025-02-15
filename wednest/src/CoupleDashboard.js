import React from "react";
import { useNavigate } from "react-router-dom";

export default function CoupleDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleEditProfile = () => {
    navigate("/couple-profile"); // Navigate to the Couple Profile page
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-blue-100 overflow-hidden">
      <div className="h-full overflow-y-auto">
        {/* Header */}
        <header className="bg-orange-300 p-4 flex justify-between items-center fixed w-full top-0 left-0 z-10 shadow-lg">
          <img src="WEDNEST_LOGO.png" alt="WedNest Logo" className="h-24 w-auto" />
          <div className="flex gap-6">
            <button className="text-lg">Home</button>
            <span className="text-lg">🛒</span>
            <span className="text-lg">👤</span>
          </div>
        </header>

        {/* Sidebar */}
        <div
          className="fixed left-0 top-[100px] w-1/5 h-[calc(100vh-100px)] flex flex-col items-center justify-center space-y-6 px-4 shadow-lg"
          style={{
            backgroundImage: "url('/sidebar.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backgroundBlendMode: "overlay",
          }}
        >
          <h2 className="text-lg font-semibold text-black">Welcome</h2>
          <div className="w-32 h-32 bg-gray-400 rounded-full"></div>
          <p className="font-semibold text-black text-center">@Username</p>
          <p className="text-black text-center">user@example.com</p>
          <button onClick={handleEditProfile} className="bg-blue-500 text-white px-6 py-2 rounded">
            Edit Profile
          </button>
        </div>

        {/* Main Content */}
        <div className="pl-[22%] pt-[120px] pr-6">
          <div className="grid grid-cols-3 gap-6 p-6">
            {/* Budget and Welcome Back Section */}
            <div className="col-span-2 grid grid-cols-2 gap-6">
              <div
                className="p-6 rounded-lg text-black bg-cover bg-center flex flex-col items-center justify-center shadow-md"
                style={{
                  backgroundImage: "url('/bgcouple.jpg')",
                  height: "300px",
                  width: "100%",
                }}
              >
                <h2 className="text-xl font-semibold">Budget</h2>
                <p className="text-lg">Budget Set: $0</p>
                <p className="text-lg">Remaining: $0</p>
              </div>

              <div
                className="p-6 rounded-lg text-center text-black bg-cover bg-center flex flex-col items-center justify-center shadow-md"
                style={{
                  backgroundImage: "url('/bgcouple.jpg')",
                  height: "300px",
                  width: "100%",
                }}
              >
                <h2 className="text-xl font-semibold">Welcome Back, User!</h2>
                <p className="text-lg">Your big day on: Not Set</p>
              </div>
            </div>

            {/* Vendors Booked Section */}
            <div
              className="p-6 rounded-lg text-black bg-cover bg-center flex flex-col items-center justify-center shadow-md"
              style={{
                backgroundImage: "url('/bgcouple.jpg')",
                height: "300px",
                width: "100%",
              }}
            >
              <h2 className="text-xl text-center font-semibold">Vendors Booked</h2>
              <p className="text-lg text-center">Shows vendor name and service type</p>
            </div>
          </div>

          <div className="text-center mt-6">
            <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded shadow-md">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
