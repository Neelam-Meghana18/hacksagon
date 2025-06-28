const express = require("express");
const db = require("../config/db");
const bcrypt = require("bcryptjs");  // For hashing passwords
const jwt = require("jsonwebtoken");

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key"; // ✅ Ensure this matches bloodRequest.js
 // ✅ Register User
router.post("/register", async (req, res) => {
    const { name, email, password, age, bloodGroup, state, district, city, userType, lastDonationDate, healthCondition, mobile } = req.body;

    try {
        // ✅ Check if user already exists
        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
            if (results.length > 0) {
                return res.status(400).json({ error: "⚠️ Email already registered!" });
            }

            // ✅ Validate mobile number for donors
            if (userType === "donor" && (!mobile || mobile.length < 10)) {
                return res.status(400).json({ error: "❌ Mobile number is required for donors!" });
            }

            // ✅ Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            // ✅ Set availability for donors
            const availability = userType === "donor" ? 1 : null;

            const sql = `INSERT INTO users (name, email, password, age, bloodGroup, state, district, city, userType, last_donation_date, availability, health_condition, mobile) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            db.query(sql, [name, email, hashedPassword, age, bloodGroup, state, district, city, userType, lastDonationDate || null, availability, healthCondition || null, mobile || null], (err, result) => {
                if (err) {
                    console.error("❌ Registration Error:", err.sqlMessage);
                    return res.status(500).json({ error: "Registration failed!" });
                }
                res.status(201).json({ message: "✅ User registered successfully!" });
            });
        });
    } catch (error) {
        console.error("❌ Error in Registration:", error);
        res.status(500).json({ error: "Internal server error!" });
    }
});


// ✅ Login User
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // 🔹 Step 1: Check if user exists
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, result) => {
        if (err) {
            console.error("❌ Login Error:", err);
            return res.status(500).json({ error: "Server error! Please try again later." });
        }

        if (result.length === 0) {
            return res.status(401).json({ error: "❌ User not found! Please register first." });
        }

        const user = result[0];

        // 🔹 Step 2: Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error("❌ Password Mismatch: Entered password does not match stored hash.");
            return res.status(401).json({ error: "❌ Incorrect password! Please try again." });
        }

        // 🔹 Step 3: Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ message: "✅ Login successful!", token, userName: user.name });  // ✅ Send user name
    });
});

module.exports = router;
