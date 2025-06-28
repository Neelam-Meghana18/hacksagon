const express = require("express");
const db = require("../config/db");
const axios = require("axios");

const router = express.Router();

// ✅ Find Matched Donors for a Blood Request
router.get("/predict-donor/:requestId", async (req, res) => {
    const requestId = req.params.requestId;

    // ✅ 1. Fetch Recipient Data from `blood_requests`
    db.query("SELECT * FROM blood_requests WHERE id = ?", [requestId], (err, requestResults) => {
        if (err || requestResults.length === 0) {
            return res.status(404).json({ error: "Blood request not found!" });
        }

        const recipient = requestResults[0];

        // ✅ 2. Fetch Compatible Donors from `users`
        db.query(
            `SELECT * FROM users WHERE userType = 'donor' 
             AND bloodGroup = ? 
             AND district = ? 
             AND availability = 1`,
            [recipient.bloodGroup, recipient.district],
            async (err, donorResults) => {
                if (err || donorResults.length === 0) {
                    return res.status(404).json({ error: "No compatible donors found!" });
                }

                try {
                    // ✅ 3. Send Donors to ML Model for Ranking
                    const response = await axios.post("http://localhost:5001/predict", {
                        donors: donorResults.map(donor => ({
                            id: donor.id,
                            name: donor.name,
                            bloodGroup: donor.bloodGroup,
                            district: donor.district,
                            days_since_last_donation: donor.last_donation_date
                                ? Math.floor((Date.now() - new Date(donor.last_donation_date)) / (1000 * 60 * 60 * 24))
                                : 999, // If never donated, set high value
                            emergency: recipient.emergency === "Yes" ? 1 : 0,
                            availability: donor.availability
                        }))
                    });

                    // ✅ 4. Return Matched Donors
                    res.status(200).json({ recipient, matchedDonors: response.data.matched_donors });

                } catch (error) {
                    console.error("❌ ML Model Error:", error);
                    res.status(500).json({ error: "ML model error!" });
                }
            }
        );
    });
});

module.exports = router;
