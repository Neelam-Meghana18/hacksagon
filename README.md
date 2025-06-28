Blood Matcher Backend - VEEVA Project 
A smart blood request handling system that prioritizes urgent requests using ML, notifies donors via filters, and triggers social media for rapid help.

📁 Project Structure
blood-matcher-backend/
├── server.js → Node.js backend (main entry)
├── priority_api.py → Python ML priority scoring API
├── requirements.txt → Python dependencies
├── geo-location/
│ └── app.js → Geo-location microservice
└── public/, routes/, ... → Other necessary folders

⚙️ How to Run the Project Locally
1. Clone the Repository
Navigate into the blood-matcher-backend folder directly (no need to go into any nested folders).

2. Run the Node.js Backend
Make sure Node.js and npm are installed.
Install dependencies and start the main backend:

Open terminal in blood-matcher-backend

Run: npm install

Start server: node server.js

3. Install Python Dependencies
Make sure Python 3 is installed.
Install required packages using:

pip install -r requirements.txt

4. Run the ML Priority API
From the root (blood-matcher-backend), run:

python priority_api.py

This will start the ML API responsible for assigning a priority score to each incoming blood request using features like:

Age

Emergency flag

Health condition severity

Blood group rarity

Sentiment of the request

5. Run the Geo-location Microservice
This service handles smart matching of donors based on location.

Navigate to the geo-location folder

Run npm install

Start with: pm2 start app.js --name geo-location
