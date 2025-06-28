




let map;
let userMarker;

async function initMap() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    // Initialize Leaflet map
    map = L.map('map').setView([lat, lng], 13);

    // Set OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data © OpenStreetMap contributors'
    }).addTo(map);

    // Add marker for user's location
    userMarker = L.marker([lat, lng]).addTo(map)
      .bindPopup("You are here").openPopup();

    // Display formatted address
    const locRes = await fetch('/get-location', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lng })
    });
    const locData = await locRes.json();
    document.getElementById("locationResult").innerHTML = `📌 Location: <b>${locData.address}</b>`;

    // Fetch and display blood banks
    const res = await fetch('/api/blood-banks');
    const bloodBanks = await res.json();

    console.log("📍 Blood banks received:", bloodBanks);

    bloodBanks.forEach(bank => {
      const marker = L.marker([bank.lat, bank.lng]).addTo(map);
      marker.bindPopup(
        `<b>${bank.name}</b><br>
         📍 ${bank.address}<br>
         📞 ${bank.phone}<br>
         🧨 Available: ${bank.bloodGroups.join(', ')}`
      );
    });

  }, () => {
    alert("Unable to retrieve your location.");
  });
}

// Call on load
window.onload = initMap;









// let map;
// let userMarker;

// async function initMap() {
//   if (!navigator.geolocation) {
//     alert("Geolocation is not supported by your browser");
//     return;
//   }

//   navigator.geolocation.getCurrentPosition(async (position) => {
//     const lat = position.coords.latitude;
//     const lng = position.coords.longitude;

//     // Create map centered on user
//     map = L.map('map').setView([lat, lng], 12);

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 18,
//       attribution: 'Map data © OpenStreetMap contributors'
//     }).addTo(map);

//     // Mark user location
//     userMarker = L.marker([lat, lng]).addTo(map)
//       .bindPopup("You are here").openPopup();

//     // Get address for display
//     const locRes = await fetch('/get-location', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ lat, lng })
//     });

//     const locData = await locRes.json();
//     document.getElementById("locationResult").innerHTML =
//       `📌 Location: <b>${locData.address}</b>`;

//     // Fetch blood banks from backend
//     const res = await fetch('/api/blood-banks');
//     const bloodBanks = await res.json();

//     console.log("📍 Blood banks received:", bloodBanks.length);

//     bloodBanks.forEach(bank => {
//       if (bank.lat && bank.lng) {
//         const marker = L.marker([bank.lat, bank.lng]).addTo(map);
//         marker.bindPopup(`
//           <b>${bank.name}</b><br>
//           📍 ${bank.address}<br>
//           📞 ${bank.phone}<br>
//           🧪 Available: ${bank.bloodGroups.join(', ')}
//         `);
//       }
//     });

//   }, () => {
//     alert("Unable to retrieve your location.");
//   });
// }

// window.onload = initMap;
