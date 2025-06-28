// const express = require("express");
// const db = require("../config/db");

// const router = express.Router();

// router.get("/states", (req, res) => {
//     const sql = "SELECT DISTINCT state FROM users";
//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error("❌ Error fetching states:", err);
//             return res.status(500).json({ error: "Failed to fetch states!" });
//         }
//         const states = results.map(row => row.state);
//         res.json(states);
//     });
// });

// router.get("/districts", (req, res) => {
//     const { state } = req.query;
//     if (!state) return res.status(400).json({ error: "State is required!" });

//     const sql = "SELECT DISTINCT district FROM users WHERE state = ?";
//     db.query(sql, [state], (err, results) => {
//         if (err) {
//             console.error("❌ Error fetching districts:", err);
//             return res.status(500).json({ error: "Failed to fetch districts!" });
//         }
//         const districts = results.map(row => row.district);
//         res.json(districts);
//     });
// });

// router.get("/", (req, res) => {
//     const { state, district } = req.query;

//     if (!state || !district) {
//         return res.status(400).json({ error: "⚠️ State and District are required!" });
//     }

//     const sql = `
//     SELECT name, bloodGroup, district, last_donation_date, health_condition, mobile 
//     FROM users 
//     WHERE userType = 'donor' 
//     AND availability = 1 
//     AND state = ? 
//     AND district = ?;
// `;


//     db.query(sql, [state, district], (err, results) => {
//         if (err) {
//             console.error("❌ Error fetching donors:", err);
//             return res.status(500).json({ error: "Internal server error!" });
//         }

//         if (results.length === 0) {
//             return res.json([]); // ✅ Return an empty array if no donors found
//         }

//         res.json(results); // ✅ Send donor data as an array
//     });
// });

// // document.addEventListener("DOMContentLoaded", function () {
// //     loadStates();
// // });


    




// module.exports = router;


const express = require("express");
const router = express.Router();

// ✅ Predefined States and Districts (Static)
const stateDistrictMap = {
    "Andhra Pradesh": ["Anantapur", "Chittoor", "Guntur", "Kadapa", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "East Godavari"],
    "Arunachal Pradesh": ["Anjaw", "Changlang", "East Kameng", "Itanagar", "Lohit", "Papum Pare", "Tawang", "Upper Siang", "West Kameng"],
    "Assam": ["Baksa", "Barpeta", "Cachar", "Darrang", "Dhemaji", "Dibrugarh", "Goalpara", "Golaghat", "Jorhat", "Kamrup", "Lakhimpur", "Nagaon", "Tinsukia"],
    "Bihar": ["Araria", "Bhagalpur", "Darbhanga", "Gaya", "Madhubani", "Muzaffarpur", "Patna", "Purnia", "Rohtas", "Samastipur", "Siwan", "Vaishali"],
    "Chhattisgarh": ["Balod", "Bilaspur", "Dhamtari", "Durg", "Janjgir-Champa", "Korba", "Raigarh", "Raipur"],
    "Goa": ["North Goa", "South Goa"],
    "Gujarat": ["Ahmedabad", "Anand", "Banaskantha", "Bharuch", "Bhavnagar", "Gandhinagar", "Jamnagar", "Kutch", "Mehsana", "Rajkot", "Surat", "Vadodara"],
    "Haryana": ["Ambala", "Faridabad", "Gurgaon", "Hisar", "Karnal", "Kurukshetra", "Panipat", "Rewari", "Rohtak", "Yamunanagar"],
    "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kullu", "Mandi", "Shimla", "Solan", "Una"],
    "Jharkhand": ["Bokaro", "Deoghar", "Dhanbad", "East Singhbhum", "Giridih", "Hazaribagh", "Ranchi", "West Singhbhum"],
    "Karnataka": ["Bagalkot", "Bangalore", "Belgaum", "Bellary", "Bidar", "Chikmagalur", "Davanagere", "Dharwad", "Hubli", "Mangalore", "Mysore", "Tumkur", "Udupi"],
    "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Thiruvananthapuram", "Thrissur"],
    "Madhya Pradesh": ["Bhopal", "Chhindwara", "Dewas", "Guna", "Gwalior", "Indore", "Jabalpur", "Mandsaur", "Ratlam", "Rewa", "Sagar", "Satna", "Ujjain", "Vidisha"],
    "Maharashtra": ["Ahmednagar", "Aurangabad", "Mumbai", "Nagpur", "Nashik", "Pune", "Ratnagiri", "Solapur", "Thane", "Wardha"],
    "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Thoubal", "Ukhrul"],
    "Meghalaya": ["East Garo Hills", "East Khasi Hills", "Jaintia Hills", "West Garo Hills", "West Khasi Hills"],
    "Mizoram": ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"],
    "Nagaland": ["Dimapur", "Kohima", "Mokokchung", "Phek", "Tuensang", "Wokha", "Zunheboto"],
    "Odisha": ["Balangir", "Bargarh", "Bhadrak", "Cuttack", "Ganjam", "Jajpur", "Kandhamal", "Koraput", "Mayurbhanj", "Puri", "Rayagada", "Sambalpur"],
    "Punjab": ["Amritsar", "Bathinda", "Faridkot", "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Ludhiana", "Moga", "Patiala", "Rupnagar", "Sangrur"],
    "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Bikaner", "Chittorgarh", "Jaipur", "Jaisalmer", "Jodhpur", "Kota", "Sikar", "Udaipur"],
    "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Erode", "Kanchipuram", "Madurai", "Salem", "Tiruchirappalli", "Tirunelveli", "Vellore"],
    "Telangana": ["Adilabad", "Hyderabad", "Karimnagar", "Khammam", "Mahbubnagar", "Medak", "Nalgonda", "Nizamabad", "Rangareddy", "Warangal"],
    "Tripura": ["Dhalai", "North Tripura", "South Tripura", "West Tripura"],
    "Uttar Pradesh": ["Agra", "Aligarh", "Allahabad", "Bareilly", "Ghaziabad", "Gorakhpur", "Kanpur", "Lucknow", "Meerut", "Moradabad", "Varanasi"],
    "Uttarakhand": ["Almora", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
    "West Bengal": ["Alipurduar", "Bankura", "Bardhaman", "Darjeeling", "Howrah", "Kolkata", "Malda", "Murshidabad", "North 24 Parganas", "South 24 Parganas", "Siliguri"]
    // Add more states and districts as needed
};

// ✅ Get all states
router.get("/states", (req, res) => {
    const states = Object.keys(stateDistrictMap);
    res.json(states);
});

// ✅ Get districts of a selected state
router.get("/districts", (req, res) => {
    const { state } = req.query;
    if (!state) return res.status(400).json({ error: "State is required!" });

    const districts = stateDistrictMap[state];
    if (!districts) return res.status(404).json({ error: "State not found!" });

    res.json(districts);
});

// ✅ Your existing donor search route (no change)
const db = require("../config/db");

router.get("/", (req, res) => {
    const { state, district } = req.query;

    if (!state || !district) {
        return res.status(400).json({ error: "⚠️ State and District are required!" });
    }

    const sql = `
        SELECT name, bloodGroup, district, last_donation_date, health_condition, mobile 
        FROM users 
        WHERE userType = 'donor' 
        AND availability = 1 
        AND state = ? 
        AND district = ?;
    `;

    db.query(sql, [state, district], (err, results) => {
        if (err) {
            console.error("❌ Error fetching donors:", err);
            return res.status(500).json({ error: "Internal server error!" });
        }

        res.json(results);
    });
});

module.exports = router;
