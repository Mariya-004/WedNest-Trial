const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const multer = require('multer');
const connectDB = require('./db');
const Couple = require('./models/Couple');
const Vendor = require('./models/Vendor');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret';

// Connect to database
connectDB();
app.use(express.json());
app.use(cors());

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// ✅ REGISTER API
app.post('/api/register', async (req, res) => {
    const { username, email, password, user_type } = req.body;

    if (!username || !email || !password || !user_type) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    const validUserTypes = ["Couple", "Vendor"];
    if (!validUserTypes.includes(user_type)) {
        return res.status(400).json({ status: "error", message: "Invalid user type" });
    }

    try {
        // Check if email exists in either collection
        const existingUser = await Couple.findOne({ email }) || await Vendor.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: "error", message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser;
        if (user_type === "Couple") {
            newUser = new Couple({ username, email, password: hashedPassword });
        } else {
            newUser = new Vendor({ username, email, password: hashedPassword });
        }

        await newUser.save();
        res.status(201).json({ status: "success", message: "Account created successfully" });

    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error" });
    }
});

// ✅ LOGIN API
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: "error", message: "Email and password are required" });
    }

    try {
        let user = await Couple.findOne({ email });
        let userType = "Couple";

        if (!user) {
            user = await Vendor.findOne({ email });
            userType = "Vendor";
        }

        if (!user) {
            return res.status(400).json({ status: "error", message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: "error", message: "Invalid email or password" });
        }

        const token = jwt.sign({ user_id: user._id, user_type: userType }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: { user_id: user._id, user_type: userType, token },
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error" });
    }
});


// ✅ LOGOUT API
app.post('/api/logout', (req, res) => {
    res.status(200).json({ status: "success", message: "Logout successful" });
});

// ✅ USER PROFILE SETUP
app.post('/api/user/profile', upload.single('profile_image'), async (req, res) => {
    const { user_id, profile_info } = req.body;
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        await Couple.findByIdAndUpdate(user_id, { profile_info, profile_image: profileImage }) ||
        await Vendor.findByIdAndUpdate(user_id, { profile_info, profile_image: profileImage });

        res.json({ status: "success", message: "Profile created successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Failed to create profile" });
    }
});

// ✅ UPDATE PROFILE
app.put('/api/user/profile', upload.single('profile_image'), async (req, res) => {
    const { user_id, updated_info } = req.body;
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        await Couple.findByIdAndUpdate(user_id, { profile_info: updated_info, profile_image: profileImage }) ||
        await Vendor.findByIdAndUpdate(user_id, { profile_info: updated_info, profile_image: profileImage });

        res.json({ status: "success", message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Failed to update profile" });
    }
});

// ✅ COUPLE-SPECIFIC DETAILS API
app.post('/api/user/couple', async (req, res) => {
    const { user_id, budget, wedding_date } = req.body;

    try {
        await Couple.findByIdAndUpdate(user_id, { budget, wedding_date });

        res.json({ status: "success", message: "Couple details updated successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Failed to update couple details" });
    }
});

// ✅ VENDOR-SPECIFIC DETAILS API
app.post('/api/user/vendor', async (req, res) => {
    const { user_id, business_name, pricing, description } = req.body;

    try {
        await Vendor.findByIdAndUpdate(user_id, { business_name, pricing, description });

        res.json({ status: "success", message: "Vendor details updated successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Failed to update vendor details" });
    }
});

// ✅ DASHBOARD APIS
app.get('/api/dashboard/couple', async (req, res) => {
    res.json({ status: "success", data: { budget_set: "50000", budget_remaining: "20000", spending_breakdown: {}, vendors_booked: [] } });
});

app.get('/api/dashboard/vendor', async (req, res) => {
    res.json({ status: "success", data: { total_earnings: "20000", ratings: 4.5, ratings_summary: { total_reviews: 10, positive_reviews: 8, negative_reviews: 2 } } });
});

// ✅ SERVER START
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
