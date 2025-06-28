const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");
const nodemailer = require("nodemailer");
const path=require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
// ✅ Middleware
app.use(cors());  
app.use(express.json()); 
app.use(express.static("public"));  // Assuming your frontend is inside a "public" folder
 // ✅ This allows Express to parse JSON request bodies

// Import Routes
const authRoutes = require("./routes/auth");
const bloodRequestRoutes = require("./routes/BloodRequest");
const donorRoutes = require("./routes/donors");

app.use("/api/auth", authRoutes);
app.use("/api/request", bloodRequestRoutes);
app.use("/api/donors", donorRoutes);

// ✅ Nodemailer Transporter Setup

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // ✅ Use 465 for SSL (or 587 for TLS)
    secure: true, // ✅ Use true for port 465, false for port 587
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS  // Your App Password
    }
});

// ✅ Email Sending Function
const sendEmail = async (to, subject, text) => {
    try {
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: text,
        };

        let info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent: ${info.response}`);
    } catch (error) {
        console.error("❌ Email sending error:", error);
    }
};

// ✅ Example Route: Send Email When Blood Request is Created
app.post("/api/send-email", async (req, res) => {
    const { email, subject, message } = req.body;
    
    if (!email || !subject || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        await sendEmail(email, subject, message);
        res.status(200).json({ success: "Email sent successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send email" });
    }
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// ✅ Start Server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
