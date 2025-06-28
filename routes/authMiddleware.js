const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key"; // ✅ Use the same secret key as in `auth.js`

// ✅ Middleware to Authenticate Requests
const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // ✅ Extract token from "Bearer <token>"

    if (!token) {
        return res.status(403).json({ error: "❌ Access Denied! No token provided." });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY); // ✅ Verify token
        req.user = decoded; // ✅ Attach user data to request
        next();
    } catch (error) {
        return res.status(403).json({ error: "❌ Invalid token!" });
    }
};

module.exports = authenticateToken;
