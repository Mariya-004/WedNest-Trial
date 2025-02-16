const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    businessName: { type: String, default: "" },
    vendorType: { type: String, default: "" },
    contactNumber: { type: String, default: "" },
    location: { type: String, default: "" },
    pricing: { type: Number, default: 0 },
    profile_image: { type: String, default: "" },
    service_images: { type: [String], default: [] }, // Store multiple images
    earnings: { type: Number, default: 0 }, // Earnings of the vendor
    upcomingBookings: { type: [String], default: [] }, // List of upcoming bookings
    ratings: { type: Number, default: 0 }, // Vendor ratings

}, { timestamps: true });

module.exports = mongoose.model('Vendor', VendorSchema);
