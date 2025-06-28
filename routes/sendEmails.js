const express = require("express");
const nodemailer = require("nodemailer");
const db = require("../config/db");
require("dotenv").config();

const router = express.Router();

// ✅ Nodemailer Setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ✅ Find Donors & Send Emails
router.post("/send-emails", async (req, res) => {
    const { bloodGroup, district } = req.body;

    // 🔹 Step 1: Fetch compatible donors
    db.query(
        `SELECT name, email FROM users WHERE bloodGroup IN 
         (SELECT compatibleGroup FROM blood_compatibility WHERE bloodGroup = ?) 
         AND district = ? AND availability = 1`, 
        [bloodGroup, district], 
        async (err, donors) => {
            if (err) {
                console.error("❌ Database Error:", err);
                return res.status(500).json({ error: "Failed to fetch donors!" });
            }

            if (donors.length === 0) {
                return res.json({ message: "No compatible donors found!" });
            }

            // 🔹 Step 2: Send Emails to Matched Donors
            let emailPromises = donors.map(donor => {
                const mailOptions = {
                    from: `"Blood Matcher" <${process.env.EMAIL_USER}>`,
                    to: donor.email,
                    subject: "Urgent Blood Donation Request",
                    text: `Dear ${donor.name},\n\nA recipient in your district urgently needs ${bloodGroup} blood. 
                    If you're available, please respond.\n\nThank you!\n\nBlood Matcher Team`
                };

                return transporter.sendMail(mailOptions)
                    .then(info => console.log(`📧 Email sent to ${donor.email}:`, info.messageId))
                    .catch(error => console.error(`❌ Failed to send email to ${donor.email}:`, error));
            });

            // ✅ Wait for all emails to be sent
            Promise.all(emailPromises)
                .then(() => res.json({ message: "✅ Emails sent to matched donors!" }))
                .catch(err => res.status(500).json({ error: "Failed to send emails!" }));
        }
    );
});

module.exports = router;
