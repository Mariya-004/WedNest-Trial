import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VendorProfileSetup = () => {
  const [businessName, setBusinessName] = useState("");
  const [vendorType, setVendorType] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [pricing, setPricing] = useState("");
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!authToken || !userEmail) {
      navigate("/login");
      return;
    }

    const fetchVendorData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/vendor/${userEmail}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const data = await response.json();
        if (data.status === "success") {
          setBusinessName(data.vendor.business_name);
          setVendorType(data.vendor.vendor_type);
          setContactNumber(data.vendor.contact_number);
          setEmail(data.vendor.email);
          setLocation(data.vendor.location);
          setPricing(data.vendor.pricing);
        }
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchVendorData();
  }, [authToken, userEmail, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { businessName, vendorType, contactNumber, email, location, pricing };

    try {
      const response = await fetch(`http://localhost:3000/api/vendor/update/${userEmail}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();
      if (result.status === "success") {
        alert("Profile updated successfully!");
        navigate("/vendor-dashboard");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-black bg-[#B87C66] py-3 rounded-lg">
          Set Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-lg text-black">Name of your Business</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-2 border bg-gray-100 rounded-lg text-black"
              required
            />
          </div>

          <div>
            <label className="block text-lg text-black">Type</label>
            <input
              type="text"
              value={vendorType}
              onChange={(e) => setVendorType(e.target.value)}
              className="w-full px-4 py-2 border bg-gray-100 rounded-lg text-black"
              required
            />
          </div>

          <div>
            <label className="block text-lg text-black">Contact Number</label>
            <input
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-4 py-2 border bg-gray-100 rounded-lg text-black"
              required
            />
          </div>

          <div>
            <label className="block text-lg text-black">Email Address</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full px-4 py-2 border bg-gray-100 rounded-lg text-black cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-lg text-black">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border bg-gray-100 rounded-lg text-black"
              required
            />
          </div>

          <div>
            <label className="block text-lg text-black">Pricing</label>
            <input
              type="text"
              value={pricing}
              onChange={(e) => setPricing(e.target.value)}
              className="w-full px-4 py-2 border bg-gray-100 rounded-lg text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-[#B87C66] text-white py-3 rounded-lg text-lg hover:bg-[#9c6753] transition"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  ); 
};

export default VendorProfileSetup;
