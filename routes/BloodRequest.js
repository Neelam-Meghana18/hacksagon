const express = require("express");
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const axios = require("axios");

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key";

// ✅ Authentication Middleware
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ error: "❌ Unauthorized! Please log in first." });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.error("❌ Token Verification Failed:", err);
            return res.status(403).json({ error: "❌ Invalid token!" });
        }
        console.log("✅ Token Verified:", user);
        req.user = user;
        next();
    });
}

// ✅ Submit a Blood Request (Async Email Sending)
router.post("/", authenticate, async (req, res) => {
    const { bloodGroup, age, emergency, state, district, city, healthCondition } = req.body;
    const recipientEmail = req.user.email;

    if (!bloodGroup || !age || !state || !district || !city || !healthCondition) {
        return res.status(400).json({ error: "⚠️ All fields are required!" });
    }

    const sql = "INSERT INTO blood_requests (bloodGroup, age, emergency, state, district, city, healthCondition) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [bloodGroup, age, emergency, state, district, city, healthCondition], (err, result) => {
        if (err) {
            console.error("❌ Blood Request Error:", err);
            return res.status(500).json({ error: "Failed to submit blood request!" });
        }

        console.log("✅ Blood Request Submitted!");

        // ✅ Respond immediately (no waiting for email sending)
        res.json({ message: "✅ Your blood request has been submitted! We will notify donors soon." });
        const Sentiment = require("sentiment");
const sentiment = new Sentiment();

const rarityMap = {
    "O-": 1, "AB-": 2, "B-": 3, "A-": 4,
    "O+": 5, "AB+": 6, "B+": 7, "A+": 8
};

// Run sentiment analysis
const sentimentResult = sentiment.analyze(healthCondition);
const sentimentScore = sentimentResult.score / 5; // normalize score
const rarityScore = rarityMap[bloodGroup];

// Call ML API
let priorityScore = 0;
async function assignPriority() {
    try {
        const mlRes = await axios.post("http://localhost:8000/predict", {
            age: 25,
            emergency: 1,
            sentimentScore: 0.5,
            rarityScore: 3
        });
        console.log("🎯Priority Score:", mlRes.data.priorityScore);
    } catch (err) {
        console.error("❌ Error:", err.message);
    }
}

// ✅ Call the async function from global scope
assignPriority();



        // ✅ Now find compatible donors & send emails (async)
        findCompatibleDonors(bloodGroup, district)
            .then(donors => sendEmails(donors, recipientEmail))
            .catch(err => console.error("❌ Error Notifying Donors:", err));
    });
});


async function findCompatibleDonors(bloodGroup, district) {
    return new Promise((resolve, reject) => {
        // Blood group compatibility mapping
        const compatibilityMap = {
            "O-": ["O-"],
            "O+": ["O-", "O+"],
            "A-": ["O-", "A-"],
            "A+": ["O-", "O+", "A-", "A+"],
            "B-": ["O-", "B-"],
            "B+": ["O-", "O+", "B-", "B+"],
            "AB-": ["O-", "A-", "B-", "AB-"],
            "AB+": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"]
        };

        // Get compatible donors for the recipient's blood type
        const compatibleDonors = compatibilityMap[bloodGroup] || [];

        // Prepare SQL query with multiple blood groups using IN clause
        const sql = `
            SELECT id AS donor_id, name, email, bloodGroup, district
            FROM users 
            WHERE userType = 'donor' 
            AND availability = 1
            AND bloodGroup IN (${compatibleDonors.map(() => '?').join(', ')}) 
            AND district = ?;
        `;

        // Execute query
        db.query(sql, [...compatibleDonors, district], (err, donors) => {
            if (err) {
                console.error("❌ Database Error:", err);
                return reject("Database error!");
            }

            if (donors.length === 0) {
                console.log("⚠️ No compatible donors found.");
            }

            resolve(donors);
        });
    });
}



// ✅ Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ✅ Send Emails to Compatible Donors
async function sendEmails(donors, recipientEmail) {
    if (donors.length === 0) {
        console.log("⚠️ No donors to notify.");
        return;
    }

    for (const donor of donors) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: donor.email,
            subject: "🚑 Urgent Blood Donation Request",
            html: `
            <h3>Dear ${donor.name}, 👋</h3>

        <p>We hope you're doing well. A patient in your district urgently needs blood, and your blood type matches their requirement. 🩸</p>

        <h4>📩 Recipient Contact:</h4>
        <p><b>${recipientEmail}</b></p>

        <p>🕒 If you're healthy and able to donate, kindly consider reaching out to the recipient as soon as possible. Your one act of kindness could help save a life today. ❤️</p>

        <p>🙏 Thank you for being part of our life-saving community.</p>

        <p><b>With gratitude,</b><br><b>Team VEEVA – LifeSaver Network 🚑</b></p>

            `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`📧 Email sent to ${donor.email}`);
        } catch (error) {
            console.error(`❌ Failed to send email to ${donor.email}:`, error);
        }
    }
}

module.exports = router;




