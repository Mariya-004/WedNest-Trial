import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    fetchBudget();
  }, []);

  const fetchBudget = async () => {
    try {
      const response = await fetch("/api/couple/budget");
      const data = await response.json();
      setBudget(data.budget || 0);
    } catch (error) {
      console.error("Failed to fetch budget:", error);
    }
  };

  const handleRemove = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6" style={{ backgroundImage: "url('/bg.png')", backgroundSize: "cover" }}>
      {/* Header */}
      <header className="bg-orange-300 h-20 p-4 flex justify-between items-center fixed w-full top-0 left-0 z-10 shadow-md">
        <img src="/WEDNEST_LOGO.png" alt="WedNest Logo" className="h-16 w-auto" />
        <div className="flex gap-8 text-lg">
          <button onClick={() => navigate("/couple-home")} className="text-lg">Home</button>
          <button onClick={() => navigate("/settings")} className="text-lg">Settings</button>
          <button className="text-lg">🛒</button>
          <button onClick={() => navigate("/couple-dashboard")} className="text-lg">👤</button>
        </div>
      </header>

      {/* Budget Display */}
      <div className="pt-24 flex justify-end pr-10">
        <span className="bg-purple-500 text-white px-4 py-2 rounded-lg text-lg font-bold">Budget: {budget.toLocaleString()} Rs</span>
      </div>

      {/* Cart Items */}
      <div className="max-w-5xl mx-auto mt-6">
        <h1 className="text-3xl font-bold text-center mb-6">Wedding Cart</h1>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="bg-white shadow-lg p-6 rounded-xl flex items-center gap-6 mb-6">
              <img src={item.image || "/placeholder.jpg"} alt={item.businessName} className="w-36 h-36 object-cover rounded-lg" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{item.businessName}</h2>
                <p className="text-gray-600">Location: {item.location}</p>
                <p className="text-gray-600">Price: {item.pricing.toLocaleString()} Rs</p>
                <p className="text-gray-600">{item.details}</p>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <span
                  className={`px-4 py-2 rounded-lg text-white font-bold ${item.status === "Confirmed" ? "bg-green-500" : "bg-yellow-500"}`}
                >
                  {item.status === "Confirmed" ? "Confirmed by Vendor" : "Waiting for Confirmation"}
                </span>
                <button
                  onClick={() => handleRemove(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
                >
                  {item.status === "Confirmed" ? "Remove" : "Remove Request"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
