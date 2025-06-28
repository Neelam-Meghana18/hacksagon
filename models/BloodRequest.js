const express = require("express");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key";// ✅ Ensure this matches the one used in auth.js

// ✅ Middleware to check authentication
function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(403).json({ error: "❌ Unauthorized! Please log in first." });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.error("❌ Invalid Token:", err); // ✅ Debugging log
        return res.status(403).json({ error: "❌ Invalid token!" });
        }
        req.user = user; // Attach user details to request object
        next();
    });
}

// ✅ Allow only logged-in users to submit a blood request
router.post("/", authenticate, (req, res) => {
    const { bloodGroup, age, emergency, state, district, city, healthCondition } = req.body;

    if (!bloodGroup || !age || !state || !district || !city || !healthCondition) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const sql = "INSERT INTO blood_requests (bloodGroup, age, emergency, state, district, city, healthCondition) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [bloodGroup, age, emergency, state, district, city, healthCondition], (err, result) => {
        if (err) {
            console.error("❌ Blood Request Error:", err);
            return res.status(500).json({ error: "Failed to submit blood request!" });
        }
        res.status(201).json({ message: "✅ Blood request submitted successfully!" });
    });
});

module.exports = router;
