const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true } // Ensure this exists
});

module.exports = mongoose.model("Vendor", VendorSchema);

