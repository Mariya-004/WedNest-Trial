const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const connectDB = require('./db');
const User = require('./models/User');
const Couple = require('./models/Couple');
const Vendor = require('./models/Vendor');
const cors = require("cors");




dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret'; // Secret for JWT

// Connect to MongoDB
connectDB();

app.use(express.json()); // Middleware to parse JSON
// Enable CORS
app.use(cors());
// REGISTER API
app.post('/api/register', async (req, res) => {
    const { username, email, password, user_type } = req.body;

    // Validate input
    if (!username || !email || !password || !user_type) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    // Ensure user_type is valid
    const validUserTypes = ["Couple", "Vendor"];
    if (!validUserTypes.includes(user_type)) {
        return res.status(400).json({ status: "error", message: "Invalid user type" });
    }

    try {
        // Check if user already exists in any collection
        const existingUser = await User.findOne({ email }) || 
                             await Couple.findOne({ email }) || 
                             await Vendor.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ status: "error", message: "Email already exists" });
        }

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store user in the correct collection
        let newUser;
        if (user_type === "Couple") {
            newUser = new Couple({ username, email, password: hashedPassword });
        } else if (user_type === "Vendor") {
            newUser = new Vendor({ username, email, password: hashedPassword });
        }

        await newUser.save();

        res.status(201).json({ status: "success", message: "Account created successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Server error" });
    }
});

// LOGIN API
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ status: "error", message: "Email and password are required" });
    }

    try {
        // Check if user exists in any collection
        let user = await User.findOne({ email }) || 
                   await Couple.findOne({ email }) || 
                   await Vendor.findOne({ email });

        if (!user) {
            return res.status(400).json({ status: "error", message: "Invalid email or password" });
        }

        // Compare provided password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: "error", message: "Invalid email or password" });
        }

        // Determine user type based on which collection the user was found in
        let userType = "User"; // Default
        if (await Couple.findOne({ email })) userType = "Couple";
        else if (await Vendor.findOne({ email })) userType = "Vendor";

        // Generate JWT Token
        const token = jwt.sign({ user_id: user._id, user_type: userType }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: {
                user_id: user._id,
                user_type: userType,
                token
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Server error" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
