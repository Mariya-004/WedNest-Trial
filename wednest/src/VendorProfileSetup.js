import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VendorProfileSetup = () => {
  const navigate = useNavigate();

  const [vendorData, setVendorData] = useState({
    businessName: "",
    vendorType: "",
    contactNumber: "",
    email: "",
    location: "",
    pricing: "",
    user_id: "", // Dynamically set from localStorage
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Load user_id dynamically (from localStorage)
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setVendorData((prev) => ({ ...prev, user_id: storedUserId }));
    }
  }, []);

  // ✅ Fetch Vendor Profile Data
  useEffect(() => {
    if (!vendorData.user_id) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/vendor/profile/${vendorData.user_id}`);
        const result = await response.json();

        if (result.status === "success") {
          setVendorData((prev) => ({
            ...prev,
            businessName: result.data.businessName || "",
            vendorType: result.data.vendorType || "",
            contactNumber: result.data.contactNumber || "",
            email: result.data.email || "",
            location: result.data.location || "",
            pricing: result.data.pricing || "",
          }));

          if (result.data.profile_image) {
            setPreviewImage(result.data.profile_image);
          }
        }
      } catch (error) {
        console.error("Error fetching vendor profile:", error);
      }
    };

    fetchProfile();
  }, [vendorData.user_id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setVendorData({ ...vendorData, [e.target.name]: e.target.value });
  };

  // ✅ Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!vendorData.user_id) {
      setMessage("❌ User ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("user_id", vendorData.user_id);
    formData.append("businessName", vendorData.businessName);
    formData.append("vendorType", vendorData.vendorType);
    formData.append("contactNumber", vendorData.contactNumber);
    formData.append("email", vendorData.email);
    formData.append("location", vendorData.location);
    formData.append("pricing", vendorData.pricing);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await fetch("http://localhost:3000/api/vendor/profile", {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        setMessage("✅ Profile updated successfully!");
        setTimeout(() => navigate("/vendor-dashboard"), 1000);
      } else {
        setMessage(result.message || "❌ Something went wrong!");
      }
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      setMessage("⚠️ Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-200 to-orange-300 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-200">
        <h2 className="text-center text-4xl font-bold text-white mb-6 bg-gradient-to-r from-yellow-500 to-orange-400 py-4 rounded-lg shadow-md">
          🏪 Vendor Profile Setup
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-8">
            {/* Left Section - Inputs */}
            <div className="w-1/2 flex flex-col space-y-4">
              <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                value={vendorData.businessName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-100 shadow-sm focus:ring-2 focus:ring-yellow-500"
                required
              />
              <input
                type="text"
                name="vendorType"
                placeholder="Vendor Type"
                value={vendorData.vendorType}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-100 shadow-sm focus:ring-2 focus:ring-yellow-500"
                required
              />
              <input
                type="tel"
                name="contactNumber"
                placeholder="Contact Number"
                value={vendorData.contactNumber}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-100 shadow-sm focus:ring-2 focus:ring-yellow-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={vendorData.email}
                onChange={handleChange}
                disabled
                className="w-full p-3 border rounded-lg bg-gray-100 shadow-sm opacity-50 cursor-not-allowed"
              />
              <input
                type="text"
                name="location"
                placeholder="Business Location"
                value={vendorData.location}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-100 shadow-sm focus:ring-2 focus:ring-yellow-500"
                required
              />
              <input
                type="text"
                name="pricing"
                placeholder="Pricing Details"
                value={vendorData.pricing}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-100 shadow-sm focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Right Section - Image Upload */}
            <div className="w-1/2 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-yellow-400 shadow-md">
                {previewImage ? (
                  <img src={previewImage} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-500">📷 No Image</span>
                )}
              </div>
              <label className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg cursor-pointer text-sm shadow-lg hover:bg-yellow-600 transition-all">
                Upload Business Logo
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 rounded-lg font-bold shadow-lg hover:opacity-90 transition-all"
            >
              {loading ? "🚀 Saving..." : "💾 Save Profile"}
            </button>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`mt-4 text-center font-semibold ${message.includes("successfully") ? "text-green-600" : "text-red-500"}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default VendorProfileSetup;
