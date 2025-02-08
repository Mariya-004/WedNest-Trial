// models/Vendor.js
const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    business_name: { type: String },
    pricing: { type: String },
    description: { type: String },
    profile_info: { type: Object },
    profile_image: { type: String },
    vendor_image: { type: String },
});

// Check if the model already exists to prevent overwriting
module.exports = mongoose.models.Vendor || mongoose.model('Vendor', vendorSchema);
