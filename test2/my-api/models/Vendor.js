const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
    password: { type: String, required: true },
    businessName: { type: String, required: true },
    vendorType: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    pricing: { type: String, required: true },
    profileImage: { type: String } // URL of the uploaded image
});

module.exports = mongoose.model('Vendor', VendorSchema);
