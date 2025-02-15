const mongoose = require("mongoose");

const coupleSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Profile Information
    contact_number: { type: String, default: "" },
    //address: { type: String, default: "" },
    profile_image: { type: String, default: "" }, // URL for profile picture

    // Wedding Details
    budget: { type: Number, default: 0 },
    wedding_date: { type: Date, default: null },
    //venue: { type: String, default: "" },
    
    // Vendors Booked
    //booked_vendors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }], 

    // Timestamps
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

module.exports = mongoose.model("Couple", coupleSchema);
