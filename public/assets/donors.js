




// 🔰 Load all states on page load
document.addEventListener("DOMContentLoaded", loadStates);

// 📌 Load States
async function loadStates() {
    try {
        const response = await fetch("http://localhost:5000/api/donors/states");
        if (!response.ok) throw new Error(`Server Error: ${response.status}`);

        const states = await response.json();
        const stateSelect = document.getElementById("state");
        stateSelect.innerHTML = `<option value="">🗺️ Select State</option>`;

        states.forEach(state => {
            const option = document.createElement("option");
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });
    } catch (error) {
        console.error("🚨 Error loading states:", error);
        alert("❌ Unable to load states. Try again later.");
    }
}

// 📌 Load Districts based on selected state
async function loadDistricts() {
    const state = document.getElementById("state").value;
    if (!state) return;

    try {
        const response = await fetch(`http://localhost:5000/api/donors/districts?state=${state}`);
        if (!response.ok) throw new Error(`Server Error: ${response.status}`);

        const districts = await response.json();
        const districtSelect = document.getElementById("district");
        districtSelect.innerHTML = `<option value="">🏙️ Select District</option>`;

        districts.forEach(district => {
            const option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    } catch (error) {
        console.error("🚨 Error loading districts:", error);
        alert("❌ Failed to load districts. Please try again.");
    }
}

// 🔍 Search Donors based on state and district
async function searchDonors() {
    const state = document.getElementById("state").value;
    const district = document.getElementById("district").value;

    if (!state || !district) {
        alert("⚠️ Please select both state and district!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/donors?state=${state}&district=${district}`);
        if (!response.ok) throw new Error(`Server Error: ${response.status}`);

        const donors = await response.json();
        const donorTable = document.getElementById("donorTable").getElementsByTagName("tbody")[0];
        donorTable.innerHTML = "";

        if (donors.length === 0) {
            alert("⚠️ No available donors found for the selected location!");
            return;
        }

        donors.forEach(donor => {
            const row = donorTable.insertRow();
            row.innerHTML = `
                <td>${donor.name}</td>
                <td>${donor.bloodGroup}</td>
                <td>${donor.district}</td>
                <td>${donor.last_donation_date || "N/A"}</td>
                <td>${donor.health_condition || "Healthy"}</td>
                <td>
                    <a href="#" class="whatsapp-link" data-mobile="${donor.mobile}">
                        <img src="../assets/images/whatsapp.png" alt="WhatsApp" width="30" height="30">
                    </a>
                </td>
            `;
        });

        addWhatsAppEventListeners();
    } catch (error) {
        console.error("🚨 Error fetching donors:", error);
        alert("❌ Failed to fetch donor data. Please try again later.");
    }
}






// function addWhatsAppEventListeners() {
//     document.querySelectorAll(".whatsapp-link").forEach(link => {
//         link.addEventListener("click", function (event) {
//             event.preventDefault();

//             let mobileNumber = this.getAttribute("data-mobile")?.trim();
//             if (!mobileNumber || mobileNumber.length < 10 || !/^\d+$/.test(mobileNumber)) {
//                 alert(`❌ Invalid mobile number found for this donor: ${mobileNumber}`);
//                 return;
//             }

//             if (!mobileNumber.startsWith("+") && mobileNumber.length === 10) {
//                 mobileNumber = `+91${mobileNumber}`;
//             }

//             const bloodGroup = prompt("Enter the required blood group:");
//             const healthCondition = prompt("Enter the patient's health condition:");
//             const donorRow = this.closest("tr");
//             const donorDistrict = donorRow ? donorRow.cells[2].textContent.trim() : "Unknown";

//             if (bloodGroup && healthCondition) {
//                 // ✅ Emoji-rich message (for saved contacts)
//                 const emojiMessage =
//                     "🚨 *Urgent Blood Request* 🚨\n\n" +
//                     "💉 Required Blood Group: " + bloodGroup + "\n" +
//                     "🫀 Patient Condition: " + healthCondition + "\n" +
//                     "📍 Location: " + donorDistrict + "\n\n" +
//                     "🙏 If you're available to help, please respond.\n" +
//                     "❤️ Your kindness can save a life today.";

//                 // ✅ Plain message (fallback)
//                 const plainMessage =
//                     "Urgent Blood Request\n\n" +
//                     "Required Blood Group: " + bloodGroup + "\n" +
//                     "Patient Condition: " + healthCondition + "\n" +
//                     "Location: " + donorDistrict + "\n\n" +
//                     "If you're available to help, please respond.\n" +
//                     "Your kindness can save a life today.";

//                 // Try opening WhatsApp Desktop for saved contact
//                 // const whatsappDesktopURL = `https://wa.me/${mobileNumber.replace('+', '')}?text=${encodeURIComponent(plainMessage)}`;
//                 // window.location.href = whatsappDesktopURL;

//                 // Fallback: Open WhatsApp Web if desktop fails (after 3s)
//                 setTimeout(() => {
//                     const confirmFallback = confirm("The number may not be saved in your contacts. Open WhatsApp Web instead?");
//                     if (confirmFallback) {
//                         const whatsappWebURL = `https://wa.me/${mobileNumber.replace('+', '')}?text=${encodeURIComponent(plainMessage)}`;
//                         window.open(whatsappWebURL, "_blank");
//                     }
//                 }, 3000);
//             }
//         });
//     });
// }

function addWhatsAppEventListeners() {
    document.querySelectorAll(".whatsapp-link").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            let mobileNumber = this.getAttribute("data-mobile")?.trim();
            if (!mobileNumber || mobileNumber.length < 10 || !/^\d+$/.test(mobileNumber)) {
                alert(`❌ Invalid mobile number: ${mobileNumber}`);
                return;
            }

            if (!mobileNumber.startsWith("+") && mobileNumber.length === 10) {
                mobileNumber = `+91${mobileNumber}`;
            }

            const bloodGroup = prompt("🩸 Enter the required blood group:");
            const healthCondition = prompt("🫀 Enter the patient's health condition:");
            const donorRow = this.closest("tr");
            const donorDistrict = donorRow ? donorRow.cells[2].textContent.trim() : "Unknown";

            if (!bloodGroup || !healthCondition) {
                alert("⚠️ Blood group and health condition are required.");
                return;
            }

            const message =
                `🚨 *Urgent Blood Request* 🚨\n\n` +
                `💉 Required Blood Group: ${bloodGroup}\n` +
                `🫀 Patient Condition: ${healthCondition}\n` +
                `📍 Location: ${donorDistrict}\n\n` +
                `🙏 If you're available to help, please respond.\n` +
                `❤️ Your kindness can save a life today.`;

            const cleanNumber = mobileNumber.replace("+", "");
            const draftURL = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
            const desktopURL = `whatsapp://send?phone=${cleanNumber}&text=${encodeURIComponent(message)}`;

            // 🧠 Check if this number was already used before
            const alreadyContacted = localStorage.getItem("wa_" + cleanNumber) === "true";

            if (alreadyContacted) {
                // ✅ Already contacted — show desktop-friendly button
                const btn = document.createElement("button");
                btn.innerText = "📨 Send Message in WhatsApp";
                btn.style = "padding: 12px 18px; margin-top: 20px; background-color: #25D366; color: white; border: none; border-radius: 6px; cursor: pointer;";
                btn.onclick = () => {
                    // This action is allowed because it's directly tied to a user click
                    window.location.href = desktopURL;
                };
                document.body.appendChild(btn);
                alert("✅ You've already messaged this donor. Click the button below to draft the message directly in WhatsApp.");
            } else {
                // 🚀 First-time ping: open via browser (safe way)
                window.open(`https://wa.me/${cleanNumber}`, "_blank");

                setTimeout(() => {
                    alert("✅ After sending 'Hi', click the button below to send the full message.");

                    const sendBtn = document.createElement("button");
                    sendBtn.innerText = "📨 Send Full Message";
                    sendBtn.style = "padding: 12px 18px; margin-top: 20px; background-color: #25D366; color: white; border: none; border-radius: 6px; cursor: pointer;";
                    sendBtn.onclick = () => {
                        window.location.href = desktopURL;
                        localStorage.setItem("wa_" + cleanNumber, "true"); // Save this number for future direct opens
                    };
                    document.body.appendChild(sendBtn);
                }, 5000);
            }
        });
    });
}
