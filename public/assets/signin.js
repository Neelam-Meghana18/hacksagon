document.getElementById("signinForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            // ✅ Store Token and User Name in localStorage
            localStorage.setItem("token", result.token);
            localStorage.setItem("userName", result.userName);  // ✅ Store user name

            window.location.href = "index.html"; // Redirect to homepage
        } else {
            alert("❌ Error: " + result.error);
        }
    } catch (error) {
        alert("❌ Server error. Try again later.");
    }
});

