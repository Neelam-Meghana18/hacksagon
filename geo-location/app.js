
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve map.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'map.html'));
});

// OpenCage reverse geocoding
app.post('/get-location', async (req, res) => {
  const { lat, lng } = req.body;
  try {
    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        key: OPENCAGE_API_KEY,
        q: `${lat},${lng}`,
        pretty: 1
      }
    });

    const result = response.data.results[0];
    const address = result.formatted || "Unknown location";
    res.json({ address });

  } catch (error) {
    console.error("OpenCage error:", error.message);
    res.status(500).json({ error: "Geocoding failed." });
  }
});

// Static mock blood bank data
app.get('/api/blood-banks', (req, res) => {
  const bloodBanks = [
  {
    "name": "G.B. Pant Hospital Blood bank",
    "lat": 11.675442,
    "lng": 92.747338,
    "address": "Atlanta Point\r\nNear Cellular Jail\r\nP.O. Aberdeen Bazaar\r\n",
    "phone": "03192 230628",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "I.N.H.S. Dhanvantri",
    "lat": 11.649693,
    "lng": 92.717418,
    "address": "Ashvini Nagar, Port Blair, Andaman and Nicobar Islands.",
    "phone": "03192 248759",
    "bloodGroups": [
      "B-",
      "AB+",
      "O+",
      "A-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Pillar Health Centre Blood Bank",
    "lat": 11.653229,
    "lng": 92.730714,
    "address": "Lamba Line,\r\nP.B. 526,\r\nP.O. Junglighat, \r\nOpposite Airport",
    "phone": "03192 233193, 03192 233993",
    "bloodGroups": [
      "A+",
      "O+",
      "O-",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank, District Branch",
    "lat": 14.654936,
    "lng": 77.609915,
    "address": "Near JNTU Engeneering College, Sarada Nagar, Ananthapur.",
    "phone": "08554 246344",
    "bloodGroups": [
      "A-",
      "A+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Government General Hospital Blood Bank",
    "lat": 14.671459,
    "lng": 77.596684,
    "address": "Government General Hospital, Ananthapur",
    "phone": "08554 275024",
    "bloodGroups": [
      "B+",
      "A-",
      "A+",
      "AB+",
      "AB-",
      "B-",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Indian Red Cross Society",
    "lat": 14.681888,
    "lng": 77.600591,
    "address": "Blood Bank Medical Officer,Blood Bank, Indian Red Cross Society, Anantpur",
    "phone": "8554246344",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Rural Development Trust Hospital Blood Bank",
    "lat": 14.652907,
    "lng": 77.618826,
    "address": "Kadiri Road, Bathalapalli, Ananthapur",
    "phone": "08559 244259",
    "bloodGroups": [
      "O+",
      "A-"
    ]
  },
  {
    "name": "South Central Railway Hospital Blood Bank",
    "lat": 15.172889,
    "lng": 77.366103,
    "address": "S.C. Railway Hospital, Guntakal, Ananthapuramu",
    "phone": "08552 227166",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 13.832533,
    "lng": 77.492214,
    "address": "Government General Hospital Blood Bank, Hindupur, Ananthapur\r\n",
    "phone": "08556 225900",
    "bloodGroups": [
      "O-",
      "A-",
      "AB+",
      "AB-",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood bank RCH -II KADIRI",
    "lat": 14.113089,
    "lng": 78.157366,
    "address": "Ground Floor, APVVP (Government General Hospital) Area Hospital, Kadiri, Ananthapur\r\n",
    "phone": "08494 221544",
    "bloodGroups": [
      "O+",
      "AB+",
      "B-",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "S.S.S.I.H.M.S. Blood Bank",
    "lat": 14.151889,
    "lng": 77.77685,
    "address": "Prasanthigram, Puttaparthy, Ananthapuramu",
    "phone": "08555 287900",
    "bloodGroups": [
      "A-",
      "B+",
      "B-",
      "A+",
      "AB-",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "District Head Quarters Hospital Blood Bank. ",
    "lat": 13.217176,
    "lng": 79.100329,
    "address": "Head Quarters  Hospital Compound, Chittoor",
    "phone": "9849229482",
    "bloodGroups": [
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Indian Red Cross Society",
    "lat": 13.217176,
    "lng": 79.100329,
    "address": "The Secretary, Indian Red Cross Society, D:No:20-119, PH Road, Redcross Building, Chittoor 517 001, Andhra Pradesh Dr.M.V.Narayana Reddy (MO), Ph:08572 220287",
    "phone": "8572220287",
    "bloodGroups": [
      "AB+",
      "O+",
      "A+"
    ]
  },
  {
    "name": "M/s IRCS Blood Bank.",
    "lat": 13.21698,
    "lng": 79.100764,
    "address": "D.No. 20 - 119, Prakasam High Road, Chittor",
    "phone": "08572 220287 ",
    "bloodGroups": [
      "A-",
      "AB+",
      "O-",
      "B+",
      "B-",
      "O+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "M/s PESIMSR Blood Bank.",
    "lat": 12.791223,
    "lng": 78.363897,
    "address": "PES Institute of medical sciences premises, Kuppam\r\n",
    "phone": "08570 256737",
    "bloodGroups": [
      "O+",
      "B-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Blood Bank AH Madanapalli",
    "lat": 13.217176,
    "lng": 79.100329,
    "address": " The Blood Bank Medical Officer, Area Hospital, Patel Road, Madanapalli 517 325, Chittoor Dist. , Andhra pradesh Dr.Laxmiprasadreddy9(M.O)",
    "phone": "8571222087",
    "bloodGroups": [
      "O-",
      "A-"
    ]
  },
  {
    "name": "Indian Red Cross Society, Madanapalli RCH 2",
    "lat": 13.556927,
    "lng": 78.50085,
    "address": "Area Hospital, Patel Road, Madanapalli.\r\n",
    "phone": "08571 222087",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Aswini Hospital Blood Bank, TTD",
    "lat": 13.677292,
    "lng": 79.3487,
    "address": "Tirumala Tirupati Devastanam (TTD), Tirumala, Chittoor ",
    "phone": "9490651605",
    "bloodGroups": [
      "B-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "SVRRGGH - Model Blood Bank",
    "lat": 13.644382,
    "lng": 79.407003,
    "address": "S.V.R.R. Government General Hospital, Tirupati\r\n",
    "phone": "0877 2286290",
    "bloodGroups": [
      "B-",
      "B+"
    ]
  },
  {
    "name": "Sri Venkateswara Institute of Medical sciences Blood Bank",
    "lat": 13.637934,
    "lng": 79.403917,
    "address": "Sri Venkateswara Institute of Medical Sciences (SVIMS) Campus, Tirupati",
    "phone": "0877 2287777",
    "bloodGroups": [
      "O+",
      "AB+",
      "A-",
      "AB-",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Govt Maternity Hospital Blood Bank",
    "lat": 13.639418,
    "lng": 79.409372,
    "address": "Ruia Hospital Road, Tirupati",
    "phone": "9949190197",
    "bloodGroups": [
      "AB+",
      "A-",
      "B+",
      "A+",
      "B-"
    ]
  },
  {
    "name": " TTD Central Hospital Blood Bank",
    "lat": 13.642148,
    "lng": 79.421067,
    "address": "Tirumala Tirupati Devastanam (TTD), Kapil Teertham Road, Tirupati\r\n",
    "phone": "0877 2264622",
    "bloodGroups": [
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Government Hospital",
    "lat": 16.587432,
    "lng": 82.008431,
    "address": "Blood Bank Medical Officer,  Blood Bank, Government Hospital, Amalapuram",
    "phone": "9989106236",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "M/S. Kims & Research Foundation, Hospital Blood Bank",
    "lat": 16.592169,
    "lng": 82.024025,
    "address": "Kims & Research Foundation, Hospital Blood Bank, Sy.No:813 & 817, Kamanagaruvu, Near Red Bridge, Amalapuram.",
    "phone": "08856 237996, 08856 237997, 08856 237998",
    "bloodGroups": [
      "B+",
      "A+",
      "AB-",
      "AB+",
      "O+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "M/s. A.P.V.V.P Area Hospital Blood Bank  ",
    "lat": 16.575367,
    "lng": 81.998101,
    "address": "Ground Floor Area Hospital, Amalapuram",
    "phone": "09505152234, 09491219991",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "M/s. Government General Hospital, Blood Bank.",
    "lat": 16.955537,
    "lng": 82.22748,
    "address": "Government General Premises, Ground Floor, Kakinada",
    "phone": "0884 2302008",
    "bloodGroups": [
      "O+",
      "A-",
      "B-",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "M/s. Indian Red Cross Society Blood Bank",
    "lat": 16.989065,
    "lng": 82.247465,
    "address": "D.No: 8-14-39, Ground & 1st  Floor, Red Cross Street, Gandhi Nagar, Kakinada",
    "phone": "0884 2385800",
    "bloodGroups": [
      "AB+",
      "O-",
      "AB-",
      "A-",
      "A+"
    ]
  },
  {
    "name": "District Headquarters Hospital",
    "lat": 17.019708,
    "lng": 81.791631,
    "address": "Blood Bank Medical Officer, Blood Bank, District Headquarters . Hospital, Rajahmundry",
    "phone": "9849520969",
    "bloodGroups": [
      "AB+",
      "A-"
    ]
  },
  {
    "name": "M/S. Dhanwantari Voluntary Blood Bank.",
    "lat": 17.00787,
    "lng": 81.785213,
    "address": "D.No:46-21-1,2nd Floor, Danavaiepeta, Rajahmundry",
    "phone": "0833-2473050",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "M/s. Government Area General Hospital Blood Bank.",
    "lat": 17.354937,
    "lng": 82.541241,
    "address": "M/s.Government Area Hospital Blood Bank, Area hospital, Tuni\r\n",
    "phone": "08854 252333",
    "bloodGroups": [
      "AB+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Government General Hospital Blood Bank",
    "lat": 16.299747,
    "lng": 80.443689,
    "address": "Opposite to Railway Station, 1st Floor, C/o Government General Hospital, Guntur.\r\n",
    "phone": "0863 2220035 (Ext No: 280)",
    "bloodGroups": [
      "O-",
      "AB+",
      "A-",
      "A+",
      "B+",
      "O+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Indian Red Cross Society",
    "lat": 16.306653,
    "lng": 80.43654,
    "address": "Blood Bank Medical Officer, Blood Bank, Indian Red Cross Society, Guntur, District Guntur",
    "phone": "9985322589",
    "bloodGroups": [
      "O-",
      "AB+",
      "AB-",
      "B+",
      "B-",
      "O+",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank ",
    "lat": 16.306653,
    "lng": 80.43654,
    "address": "Zilla Parishad Compound, Nagarampalem, GUNTUR\r\n",
    "phone": "0863 2215656",
    "bloodGroups": [
      "O-",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "M/s. Needs Blood Bank ",
    "lat": 16.29882,
    "lng": 80.448888,
    "address": "1st Floor, Honda Show Room Building, Opposite Doctor Plaza, Kothapeta\r\n",
    "phone": "0863 6638222, 0863 6639222",
    "bloodGroups": [
      "O+",
      "A+",
      "A-",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Saint Joseph General Hospital Blood Bank",
    "lat": 16.297514,
    "lng": 80.440648,
    "address": "Opposite to Andhra Christian College, Near Flyover, Main Road, Guntur\r\n",
    "phone": "0863 2322700, 0863 2320386 ",
    "bloodGroups": [
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Katuri Medical College and Hospital Blood Bank ",
    "lat": 16.227872,
    "lng": 80.30947,
    "address": "Katuri Nagar, Chinakondrupadu, Guntur\r\n",
    "phone": "0863 2288555, 0863 2288556 (Ext No. 234) ",
    "bloodGroups": [
      "O+",
      "AB+",
      "B-",
      "A+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "NRI Medical College and General Hospital Blood Bank",
    "lat": 16.413675,
    "lng": 80.555675,
    "address": "Mangalagiri Mandalam, Chinakakani, Guntur\r\n",
    "phone": "08645 236777, 08645 237401, 08645 230101",
    "bloodGroups": [
      "B+",
      "AB+",
      "AB-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Manipal Hospital Bloodbank",
    "lat": 16.484433,
    "lng": 80.617219,
    "address": "Soumyanagar, Tadepalli, Guntur",
    "phone": "0866 2489700 (Ext No.102)",
    "bloodGroups": [
      "O-",
      "B+",
      "A-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank. Narassraopet",
    "lat": 16.235919,
    "lng": 80.048412,
    "address": "Area Hospital, Narasaraopeta ",
    "phone": "8647224455",
    "bloodGroups": [
      "AB+",
      "O+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "NRT Blood Bank",
    "lat": 16.193331,
    "lng": 80.019956,
    "address": "GBR Super Speciality Hospital, 10-1-10/1, Palnadu Road, Narasaraopeta\r\n",
    "phone": "9542628888",
    "bloodGroups": [
      "B+",
      "O+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Anjireddy Multi Specality Blood Bank ",
    "lat": 16.478789,
    "lng": 79.893642,
    "address": "Gaganamma Temple, Piduguralla\r\n",
    "phone": "08649 254567",
    "bloodGroups": [
      "AB-",
      "B-",
      "O+",
      "B+",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Red Cross Blood Bank",
    "lat": 16.017425,
    "lng": 80.829475,
    "address": " Government Hospital Premises\r\n Repalle-522265\r\n Guntur Dist,A.P\r\n",
    "phone": "08648 223939",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Area Hospital (Repeated)",
    "lat": 16.239531,
    "lng": 80.64934,
    "address": "Blood Bank Medical Officer,  Blood Bank, Area Hospital, Tenali, Guntur District",
    "phone": "9866686760",
    "bloodGroups": [
      "B-",
      "O-",
      "A-",
      "A+",
      "B+",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Rudhira Voluntary Blood Bank",
    "lat": 16.243428,
    "lng": 80.646397,
    "address": "D.No. 7-5-56, KRR Complex, 1st Floor, Opposite ASN college, Prakasam Road, Ganganammapeta, Tenali",
    "phone": "08644 231222, 08644 654123",
    "bloodGroups": [
      "O-",
      "A-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Best Rotary Blood Bank",
    "lat": 16.251179,
    "lng": 80.64934,
    "address": "Mahila Mandali Building, Sarojini Naidu Street, Kothapeta, Tenali \r\n",
    "phone": "09849833321\t",
    "bloodGroups": [
      "AB+",
      "A-",
      "A+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Area Hospital Blood Bank",
    "lat": 16.349045,
    "lng": 81.049715,
    "address": "Gudivada",
    "phone": "08674 245040",
    "bloodGroups": [
      "O-",
      "B-",
      "AB-",
      "A+",
      "AB+",
      "A-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Dr. Pattabhi Red Cross Blood Bank ",
    "lat": 16.190546,
    "lng": 81.136154,
    "address": "DM & HO Campus, Machilipatnam",
    "phone": "08672 230605",
    "bloodGroups": [
      "B-",
      "AB+",
      "B+",
      "A-",
      "AB-",
      "A+",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Government General Hospital (Repeated)",
    "lat": 16.513339,
    "lng": 80.618989,
    "address": "Government General Hospital, Ramavarapadu, Vijayawada - 520007",
    "phone": "9866686760",
    "bloodGroups": [
      "O-",
      "AB+",
      "O+",
      "A-",
      "B-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Government District Headquarters Hospital machilipatnam blood bank",
    "lat": 16.176867,
    "lng": 81.138647,
    "address": "Machilipatnam",
    "phone": " 08672 245040",
    "bloodGroups": [
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Rotary Red Cross Blood Bank",
    "lat": 16.506174,
    "lng": 80.648015,
    "address": "H.No: 26-5-5, G.S Raju Street, Gandhinagar, Vijayawada - 520003. Krishna District\r\n\r\n",
    "phone": "0866 2570082, 0866 6464002",
    "bloodGroups": [
      "O+",
      "AB-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Vijaya Sri Blood Bank",
    "lat": 16.51304,
    "lng": 80.635644,
    "address": "VijayaSri Palace,D. No. 29-19-27/4, Ground Floor, First Floor and Second Floor, Dornakal Road, Suryaraopet, Vijayawada",
    "phone": "0866 2433199",
    "bloodGroups": [
      "O-",
      "A+",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Lions Blood Bank",
    "lat": 16.506174,
    "lng": 80.648015,
    "address": "D. No. 29-19-85, 1st & 2nd Floor,Old Janatha Hospital Building, Dornakal Road, Suryaraopet, Vijayawada\r\n",
    "phone": "0866 2434417",
    "bloodGroups": [
      "B-",
      "AB-",
      "A+",
      "O+",
      "B+",
      "A-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "University General Hospital Blood Bank",
    "lat": 16.516111,
    "lng": 80.670085,
    "address": "Ring Road, Gunadala, Vijayawada",
    "phone": "0866 2452244, 0866 2453488",
    "bloodGroups": [
      "AB+",
      "O+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "M/s. Chaitanya Blood Bank",
    "lat": 16.498839,
    "lng": 80.655488,
    "address": "40-9/1-26, Vasavya Complex, Benz Circle, Vijayawada\r\n",
    "phone": "0866 2497977, 0866 645977",
    "bloodGroups": [
      "AB+",
      "A+",
      "B+",
      "A-",
      "B-",
      "AB-",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Dr. Pinnamaneni Siddhartha Insitiute of Medical Sciences & Research Foundation (Dr.P.SIMS & RF) Blood Bank  ",
    "lat": 16.551655,
    "lng": 80.832047,
    "address": "Chinnaoutapalli. ",
    "phone": "08676 257311",
    "bloodGroups": [
      "AB+",
      "A-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Bethesda Blood Bank",
    "lat": 16.512971,
    "lng": 80.632664,
    "address": "29-10-2, Ground Floor, Narsimharao Street, Suryaraopet, Vijayawada ",
    "phone": "0866 2435888",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Smt CH. Manju Vani Vara Prasad, Lions District 316D Blood Bank ",
    "lat": 16.510309,
    "lng": 80.63251,
    "address": "H.No.29-4-54K, Conan Dhanvoda Anantham Complex, Prakasam Road, Suryaraopet, Vijayawada",
    "phone": "0866 2573636",
    "bloodGroups": [
      "A-",
      "B-",
      "B+",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Suraksha Voluntary Blood Bank",
    "lat": 16.51343,
    "lng": 80.632861,
    "address": "29-10-8, Govinda Rajulu Naidu Street, Suryaraopet, Vijayawada \r\n",
    "phone": "0866 2434499",
    "bloodGroups": [
      "A-",
      "B+",
      "O-",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "RCH -II Blood Bank, Area Hospital, Adoni",
    "lat": 15.632223,
    "lng": 77.272837,
    "address": "Dr. H. Siva Reddy, Civil Surgeon RMO (Rtd),Medical Officer  IRCS, RCH-II, Blood Bank, Area Hospital, Adoni-518301",
    "phone": "9440503302",
    "bloodGroups": [
      "AB+",
      "O-",
      "A+",
      "A-",
      "O+",
      "B+",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "M/s. Indian Red Cross Society Blood Bank RCH 2",
    "lat": 15.632223,
    "lng": 77.272837,
    "address": "First Floor, Government Area Hospital, Adoni, Kurnool\r\n",
    "phone": "9440503302",
    "bloodGroups": [
      "O-",
      "AB-",
      "A-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "M/s. Government General Hospital Blood Bank",
    "lat": 15.820654,
    "lng": 78.038088,
    "address": "kurnool",
    "phone": "9985676311",
    "bloodGroups": [
      "B+",
      "B-",
      "O+"
    ]
  },
  {
    "name": "M/s. Indian Red Cross Society Blood Bank",
    "lat": 15.816357,
    "lng": 78.040317,
    "address": "Opposite Ravi Theatre, D.M & H.O Compound, Beside Control Room, Kurnool\r\n",
    "phone": "08518 255347",
    "bloodGroups": [
      "B+",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "M/s. R.R. Hospital Blood Bank",
    "lat": 15.82872,
    "lng": 78.035743,
    "address": "D.No.40-304-10, 2nd Floor, Bhagya Nagar, Kurnool",
    "phone": "08518 223131",
    "bloodGroups": [
      "O+",
      "O-"
    ]
  },
  {
    "name": "District Hospital Blood Bank ",
    "lat": 15.469336,
    "lng": 78.482935,
    "address": "District Hospital, Noonepalli, Nandyal, Kurnool\r\n",
    "phone": "8514221033",
    "bloodGroups": [
      "AB+",
      "O-",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 16.0833,
    "lng": 78.8667,
    "address": "Blood Bank Medical Officer,  Blood Bank, Government Hospital, Srisailam Project, Kurnool District",
    "phone": "",
    "bloodGroups": [
      "B+",
      "AB-",
      "A+",
      "B-",
      "O-",
      "A-"
    ]
  },
  {
    "name": "M/s. Area Hospital Blood Bank",
    "lat": 15.825971,
    "lng": 80.36127,
    "address": "Ground Floor, Room No.10, Area Hospital, Chirala, Prakasam ",
    "phone": "8520026320",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood bank",
    "lat": 15.736154,
    "lng": 79.269125,
    "address": "A.P.V.P. Area Hospital, Cumbum Road, Markapur",
    "phone": "08596 223485",
    "bloodGroups": [
      "A-",
      "O+",
      "AB+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "M/s. RIMS General Hospital Blood Bank",
    "lat": 15.487882,
    "lng": 80.047144,
    "address": "C/o. RIMS General Hospital , D.No. 8-5-2/A, Opposite Bapuji Kalamandir, Bhagya Nagar, 5th Lane, Ongole\r\n",
    "phone": "8592233310",
    "bloodGroups": [
      "AB-",
      "B+",
      "B-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 15.505723,
    "lng": 80.049922,
    "address": "IRCS Blood Bank, Railway Station Road, SanthaPeta, Ongole, Prakasam\r\n",
    "phone": "08592 236093",
    "bloodGroups": [
      "O+",
      "AB+",
      "A+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "M/s. Life Line Volunytary Blood Bank",
    "lat": 15.481367,
    "lng": 80.05908,
    "address": "D. No.37-1-169/54, 2nd Floor, Sundharaiah Bhavan Raod, Ongole.\r\n",
    "phone": "9247023117",
    "bloodGroups": [
      "A-",
      "B+",
      "O-"
    ]
  },
  {
    "name": "M/s. Belief Blood Bank",
    "lat": 15.481367,
    "lng": 80.05908,
    "address": "3rd Floor, Sai Complex, Addanki Bus Stop, Ongole\r\n",
    "phone": "08592 222345",
    "bloodGroups": [
      "O-",
      "A-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 14.146545,
    "lng": 79.848756,
    "address": "Area Hospital Compound, Gudur\r\n",
    "phone": "8008553616",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "M/s. Kanamarlapudi Koteswara Rao Indian Red Cross Society Blood Bank",
    "lat": 14.913181,
    "lng": 79.99298,
    "address": "Survey No.1083/3, R.D. Office Compound, Kavali\r\n",
    "phone": "08626 244766",
    "bloodGroups": [
      "A+",
      "B-",
      "O-",
      "A-",
      "O+",
      "B+",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 14.426777,
    "lng": 79.959008,
    "address": "Indian Red Cross Society (IRCS) Road, Madras Bus stand, Nellore \r\n\r\n",
    "phone": "0861 2320470",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "District Headquarters Hospital (Repeated)",
    "lat": 14.435424,
    "lng": 79.966831,
    "address": "District Headquarters Hospital, Dargamitta, Nellore",
    "phone": "92477088602",
    "bloodGroups": [
      "O+",
      "AB+",
      "B-",
      "AB-",
      "B+",
      "A-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Narayana Medical College & Hospital Blood Bank",
    "lat": 14.442599,
    "lng": 79.986456,
    "address": "Narayana Hospital compound, Nellore",
    "phone": "0861 2317963",
    "bloodGroups": [
      "B+",
      "B-",
      "O+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Gems Hospital Blood Bank",
    "lat": 18.289087,
    "lng": 83.9056,
    "address": "Gems Hospital Premises, Ragolu, Srikakulam",
    "phone": "9391489207",
    "bloodGroups": [
      "O+",
      "O-",
      "AB+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "GMR Varalakshmi Care Hospital Blood Bank",
    "lat": 18.461272,
    "lng": 83.658352,
    "address": "GMR Varalakshmi Care Hospital Premises, GMR Nagar, Rajam\r\n",
    "phone": "08941 253183, 08941 253184",
    "bloodGroups": [
      "O-",
      "B-",
      "O+",
      "AB-",
      "A-",
      "AB+",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Rajiv Gandhi Institute of Medical Sciences (RIMS) General Hospital Blood Bank",
    "lat": 18.312884,
    "lng": 83.887717,
    "address": "RIMS Government Hospital Premises, Balaga, Srikakulam\r\n",
    "phone": "08942 279679",
    "bloodGroups": [
      "B+",
      "AB-",
      "O-",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Indian Red Cross Society (IRCS) Blood Bank",
    "lat": 18.296359,
    "lng": 83.894549,
    "address": "D.No. 8-5-2/A, Opposite to Bapuji Kalamandir, Srikakulam\r\n\r\n\r\n",
    "phone": "08942 226555, 08942 226111",
    "bloodGroups": [
      "O-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "District Hospital",
    "lat": 17.689592,
    "lng": 82.997733,
    "address": "AH- ANAKAPALLI",
    "phone": "9848325561",
    "bloodGroups": [
      "AB+",
      "O+",
      "B-",
      "B+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "M/s. NTR Area Hospital Blood Bank",
    "lat": 17.686427,
    "lng": 83.218576,
    "address": "APVVP Hospital Premises, Anakapalli, Visakhapatnam \r\n",
    "phone": "08924 223340",
    "bloodGroups": [
      "B-",
      "A-",
      "AB-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "M/s. Visakha Steel General Hospital Blood Bank",
    "lat": 17.662908,
    "lng": 83.144127,
    "address": "Ukkunagaram, Steel Plant, Visakhapatnam",
    "phone": "0891 2887722",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "M/s. Anil Neerukonda Hospital  Blood Bank",
    "lat": 17.97256,
    "lng": 83.432338,
    "address": "Sangivalasa, Bheemunipatnam (M), Visakhapatnam District\r\n",
    "phone": "8912821111 (Exte. No. 126)",
    "bloodGroups": [
      "B+",
      "B-",
      "O-",
      "O+",
      "A+",
      "A-",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "M/s. King George Hospital (KGH) Blood Bank ",
    "lat": 17.70667,
    "lng": 83.303737,
    "address": "King George Hospital, Maharanipeta, Visakhapatnam",
    "phone": "0891 2564891",
    "bloodGroups": [
      "O-",
      "B-",
      "AB-",
      "B+",
      "O+",
      "A+",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "M/s. Government Victoria Hospital Blood Bank",
    "lat": 17.686816,
    "lng": 83.218482,
    "address": "Women & Children Hospital Blood Bank, Visakhapatnam",
    "phone": "0891 2562637 ",
    "bloodGroups": [
      "O+",
      "B+",
      "AB-",
      "O-",
      "A-",
      "A+",
      "B-"
    ]
  },
  {
    "name": "M/s. Indian Red Cross Society Blood Bank ",
    "lat": 17.686816,
    "lng": 83.218482,
    "address": "D.No:14-35-4, Behind Collecorate, Z..P. Junction, Maharanipeta, Visakhapatnam\r\n",
    "phone": "0891 2703953",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "M/s. Rotary Blood Bank (Vishaka Port City Rotary Charitable Trust)",
    "lat": 17.686816,
    "lng": 83.218482,
    "address": "D.No: 13-26-2/54, 3rd Floor, Apuroopa Arcade, Near Jagadamba Junction, Maharanipeta, Vishakapatnam\r\n",
    "phone": "0891 6534635, 0891 2506678",
    "bloodGroups": [
      "A+",
      "AB+",
      "O+",
      "AB-",
      "B-",
      "B+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "M/s. Apollo Hospital Heart & Kidney Centre Blood Bank",
    "lat": 17.717084,
    "lng": 83.309208,
    "address": "D.No.10-50-80, 1st Floor, Apollo Hospital, Waltair Main Road, Visakhapatnam. \r\n",
    "phone": "0891 2727272 ",
    "bloodGroups": [
      "B+",
      "O+",
      "AB+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "M/s. Seven Hills Hospital Blood Bank",
    "lat": 17.71737,
    "lng": 83.309268,
    "address": "D.No.11-4-4/A, 5th Floor, Rock Dale Layout, Waltair MainRoad, Visakhapatnam\r\n",
    "phone": "0891 6677777",
    "bloodGroups": [
      "B-",
      "AB-",
      "B+",
      "O-",
      "O+",
      "AB+",
      "A+",
      "A-"
    ]
  },
  {
    "name": " A. S. Raja Voluntary Blood Bank",
    "lat": 17.720274,
    "lng": 83.313048,
    "address": "D.No. 10-50-11/5, Ground Floor, 1st, 2nd and 3rd Floor, Beside CARE Hospital, Waltair Main Road, Ramnagar, Visakhapatnam\r\n",
    "phone": "0891 2543436,0891 6663436,0891 6644936.",
    "bloodGroups": [
      "O+",
      "B+",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "M/s. Lions Club of Visakhapatnam Blod Bank Trust  ",
    "lat": 17.719063,
    "lng": 83.311286,
    "address": "D. No.10-54-7, Lions Community Hall, Ram Nagar, Visakhapatnam\r\n",
    "phone": "0891 6692587, 0891 6692580, 0891 6692590",
    "bloodGroups": [
      "B+",
      "A+",
      "AB+",
      "O+",
      "AB-",
      "O-",
      "B-"
    ]
  },
  {
    "name": "M/s. N.T.R. Memorial Trust Blood Bank ",
    "lat": 17.691575,
    "lng": 83.238891,
    "address": "P. No. 15B-3-1, Block No. 56, Waltair Main Road, Ramnagar, Visakhapatnam\r\n",
    "phone": "0891 2565858, 0891 2555858",
    "bloodGroups": [
      "A-",
      "O-",
      "AB-",
      "B+",
      "O+",
      "AB+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "M/s. Gitam Institute of Medical Sciences and Research Blood Bank ",
    "lat": 17.784938,
    "lng": 83.374975,
    "address": "D.No.5-168, Ward No.6, Gitam University, Rushikonda, Visakhapatnam\r\n",
    "phone": "0891 2524777",
    "bloodGroups": [
      "AB-",
      "AB+",
      "B+",
      "A-",
      "A+",
      "O+",
      "B-",
      "O-"
    ]
  },
  {
    "name": "M/s. Gayatri Vidya Parishad Institute of Health Care and Medical Technology",
    "lat": 17.689433,
    "lng": 83.211615,
    "address": "D. No.6-25, Maridi Valley, Marikavalasa, Madhurawada, Vishakapatnam\r\n",
    "phone": "0891 2793741, 0891 2590131",
    "bloodGroups": [
      "O-",
      "O+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank, RCH-II",
    "lat": 18.781716,
    "lng": 83.426752,
    "address": "Area Hospital Premises, First Floor, Belagam, Parvathipuram\r\n",
    "phone": "08963 222088",
    "bloodGroups": [
      "A-",
      "B+"
    ]
  },
  {
    "name": "District Headquarters Hospital Blood Bank",
    "lat": 18.110022,
    "lng": 83.388433,
    "address": "District Headquarters Hospital, Cantonment, Vizianagaram ",
    "phone": "9440070099",
    "bloodGroups": [
      "O-",
      "AB-",
      "A+",
      "B-",
      "O+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 18.106658,
    "lng": 83.395551,
    "address": "D.No. 71/82, Near Ganesh Temple, Cantonment,  Vizianagaram",
    "phone": "08922 272700",
    "bloodGroups": [
      "O+",
      "AB-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "ASN Raju Charitable Trust Blood Bank",
    "lat": 16.54391,
    "lng": 81.516237,
    "address": "D.No. 24-1-1, R.K. Plaza (Sarovar complex), J. P. Raod, Bhimavaram\r\n",
    "phone": "08816 225556",
    "bloodGroups": [
      "O-",
      "B-"
    ]
  },
  {
    "name": "Uddaraju Anandaraju Foundation Blood Bank",
    "lat": 16.543064,
    "lng": 81.515731,
    "address": "D.No. 27-8-21/2, Sivaraopet, Bhimavaram",
    "phone": "08816 230888, 08816 230878",
    "bloodGroups": [
      "A+",
      "O+",
      "A-",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "M/s. Government Headquarters Hospital Blood Bank",
    "lat": 17.006153,
    "lng": 81.782132,
    "address": "Government Headquarters Hospital, Ground Floor, R.R. Peta, Eluru, West Godavari",
    "phone": "08812 220333",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "M/s. Indian Red Cross Society Component Blood Bank",
    "lat": 16.711919,
    "lng": 81.094839,
    "address": " General Hospital Premises, Eluru, West Godavai\r\n",
    "phone": "08812 224722",
    "bloodGroups": [
      "O+",
      "B+",
      "A+",
      "AB-",
      "B-",
      "O-",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "M/s. Alluri Sitrarama Raju Academy of Medical Sciences Blood Bank",
    "lat": 16.737395,
    "lng": 81.146494,
    "address": "Ground Floor, Hospital Block, NH 5 Eluru, West Godavari \r\n",
    "phone": "08812 288288, 08812 288299",
    "bloodGroups": [
      "A-",
      "O-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "M/s. Good Samaritan Blood Bank",
    "lat": 18.179738,
    "lng": 83.39551,
    "address": "D.No.13-1, Good Samaritan Cancer and General Hospital, Vangayagudem, Eluru, West Godavari\r\n",
    "phone": "08812 246430, 08812 246947",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "M/s. Indian Red Cross Society Blood Bank jangareddi gudem",
    "lat": 17.125307,
    "lng": 81.273907,
    "address": "Government Hospital Premises, Jangareddygudem",
    "phone": "08821 225305",
    "bloodGroups": [
      "O-",
      "A-",
      "AB+",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank narasapuram",
    "lat": 16.45196,
    "lng": 81.680205,
    "address": "C/o. Community Healthcare Center, Narsapuram",
    "phone": "08814 276656 ",
    "bloodGroups": [
      "B-",
      "O+",
      "B+",
      "A+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Palakol Voluntary Blood Bank",
    "lat": 16.517455,
    "lng": 81.725342,
    "address": "D.No. 47-1-12/2C, 1st floor, Beside Chamber of Commerce Building, Srinivasa Deluxe, Palakol\r\n",
    "phone": "08814 222678",
    "bloodGroups": [
      "AB-",
      "O-",
      "B+",
      "AB+",
      "O+",
      "B-",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank Tanuku  (Repeated)",
    "lat": 16.757173,
    "lng": 81.679963,
    "address": "IRCS Sub Branch Doorno 27-14-9, Dodipatlavari Street, \r\nTanuku, West Godavari District ",
    "phone": "8819221184",
    "bloodGroups": [
      "B+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Dr. Mulla Pudi Harischandra Prasad Red Cross Blood Bank",
    "lat": 16.757173,
    "lng": 81.679963,
    "address": "D.No.27-14-9, Doddipatla Vari Street, Tanuku.",
    "phone": "08819 221184",
    "bloodGroups": [
      "B-",
      "AB-",
      "A-",
      "O+",
      "B+",
      "AB+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Sri Buddala Narasimhamurty Voluntary Blood Bank",
    "lat": 16.414033,
    "lng": 80.647085,
    "address": "D.No.34-4/5, Ground Floor, Supriya Towers, Tanuku\r\n",
    "phone": "08819 225269",
    "bloodGroups": [
      "B+",
      "B-",
      "O-",
      "AB-",
      "O+",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Rajiv Gandhi Institute of Medical Sciences Blood Bank",
    "lat": 15.133392,
    "lng": 78.514102,
    "address": "Blood Bank Medical Officer, O.P. Block Ground Floor, Blood Bank, RIMS General Hospital,Puttlampalli, Kadapa ( RIMS, Kadapa).",
    "phone": "08562 225665",
    "bloodGroups": [
      "AB-",
      "B-",
      "A-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Indian Red Cross Society, Blood Bank",
    "lat": 14.467354,
    "lng": 78.824134,
    "address": "D.No. 10-971, Opposite to Mattipedda Puli, Trunk Road, Kadapa\r\n",
    "phone": "08562 272829",
    "bloodGroups": [
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Boga Parvathamma Blood Bank ",
    "lat": 14.467354,
    "lng": 78.824134,
    "address": "A unit of boga parvathamma memorial blood donation service organization,\r\nd.no:7-137, second floor, jayanagar colony , Kadapa\r\n  ",
    "phone": "9440269795",
    "bloodGroups": [
      "A-",
      "B-"
    ]
  },
  {
    "name": "District Hospital Blood Bank ",
    "lat": 14.741621,
    "lng": 78.550959,
    "address": "APVVP, Gavini Circle, Yerraguntla Bypass Road, Proddatur",
    "phone": "8106104334",
    "bloodGroups": [
      "A-",
      "AB-",
      "A+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "A.P. Vaidyavidhanaparishad Area Hospital - IRCS Blood Bank ",
    "lat": 14.422232,
    "lng": 78.226339,
    "address": "Ground Floor, Muddanuru Road, Pulivendula",
    "phone": "9440978262",
    "bloodGroups": [
      "O+",
      "O-",
      "A+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Changlang District Hospital Blood Bank",
    "lat": 27.139258,
    "lng": 95.738757,
    "address": "District Hospital, Changlang District, Arunachal Pradesh",
    "phone": "9436068812",
    "bloodGroups": [
      "B+",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Pasighat General Hospital Blood Bank",
    "lat": 28.071544,
    "lng": 95.325113,
    "address": "General Hospital, Pasighat,  Jt. DHS (T&R), High Region, Near NH 52. ",
    "phone": "9436225890",
    "bloodGroups": [
      "A+",
      "O+",
      "B+",
      "B-",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Lohit District Hospital Blood Bank",
    "lat": 27.559574,
    "lng": 96.101627,
    "address": "District Hospital Tezu, Lohit District, Arunachal Pradesh",
    "phone": "9436633161",
    "bloodGroups": [
      "B+",
      "B-",
      "A+"
    ]
  },
  {
    "name": "General Hospital Ziro  Blood Bank",
    "lat": 27.53875,
    "lng": 93.822176,
    "address": "General Hospital Ziro, Lower Subansiri\r\n \r\n",
    "phone": "08415000448, 09402290012",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Ramakrishna Mission Hospital Blood bank",
    "lat": 27.086178,
    "lng": 93.609065,
    "address": "Ramakrishna Mission Hospital \r\nP.O. Ramakrishna Mission\r\nItanagar,\r\n",
    "phone": " 0360-221 2263, 221 8780",
    "bloodGroups": [
      "AB-",
      "B-",
      "A+",
      "A-",
      "O+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Arunachal State Hospital Blood Bank",
    "lat": 27.103121,
    "lng": 93.691936,
    "address": "Arunachal State Hospital / General Hospital, NH 52A, Lumer Dai Road",
    "phone": "08731981187, 09436896857",
    "bloodGroups": [
      "A+",
      "A-",
      "AB+",
      "B-",
      "B+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Tawang District Hospital Blood Bank",
    "lat": 27.588943,
    "lng": 91.864896,
    "address": "District Hospital, Tawang District , Arunachal Pradesh",
    "phone": "9402222155",
    "bloodGroups": [
      "AB-",
      "B-",
      "B+",
      "A+",
      "O+",
      "AB+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Upper Siang District Hospital Blood Bank",
    "lat": 28.641662,
    "lng": 95.025348,
    "address": "District Hospital, Yingkiong, Upper Siang District, \r\nArunachal Pradesh.",
    "phone": "03777 222545",
    "bloodGroups": [
      "A-",
      "B+",
      "O-",
      "AB+",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Upper Subansiri District Hospital Blood Bank",
    "lat": 27.981329,
    "lng": 94.217428,
    "address": "District Hospital Daporijo, Upper Subansiri District, \r\nArunachal Pradesh",
    "phone": "08794050827, 09436089691",
    "bloodGroups": [
      "A-",
      "B-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "West Siang District Hospital Blood Bank",
    "lat": 28.169282,
    "lng": 94.801031,
    "address": "District Hospital, Medical Complex, Aalo",
    "phone": "9436056268",
    "bloodGroups": [
      "AB-",
      "AB+",
      "B+",
      "O-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Fakhruddin Ali Ahmed (FAA) Medical College Hospital Blood Bank",
    "lat": 26.323792,
    "lng": 90.986661,
    "address": "Ground Floor  Fakhruddin Ali Ahmed Medical College, Jotigaon, Jania Road.\r\nOpposite to Chaulkhowa River ",
    "phone": "03665 252088",
    "bloodGroups": [
      "AB+",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Bongaigaon Civil Hospital Blood Bank",
    "lat": 26.456671,
    "lng": 90.560234,
    "address": "Main Road, Mayapuri,Bongaigaon",
    "phone": "03664 228103",
    "bloodGroups": [
      "O-",
      "A-",
      "B-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Lower Assam Hospital Blood Bank",
    "lat": 26.492861,
    "lng": 90.551479,
    "address": "Chapaguri Road, North Bongaigaon",
    "phone": "3664230465",
    "bloodGroups": [
      "O-",
      "B-",
      "O+",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Silchar Medical College and Hospital Blood Bank",
    "lat": 24.775578,
    "lng": 92.794251,
    "address": "Krishnapur Medical Road, Ghungoor, Silchar\r\n",
    "phone": "03842 229103",
    "bloodGroups": [
      "A-",
      "B+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Indian Red Cross Children Hospital Blood Bank",
    "lat": 24.826127,
    "lng": 92.796159,
    "address": "Indian Red Cross Children Hospital, Tarapur, Silchar",
    "phone": "9401854401",
    "bloodGroups": [
      "O+",
      "B-",
      "O-",
      "A+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Barak Blood Bank and Clinical Research Centre",
    "lat": 24.808015,
    "lng": 92.795242,
    "address": "Central Rd, Tarapur, Kanakpur Part-II",
    "phone": " 03842 222 185",
    "bloodGroups": [
      "O-",
      "O+",
      "A-",
      "AB-",
      "A+",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Bongaigaon Refinery (BRPL) Hospital Blood Bank ",
    "lat": 26.510577,
    "lng": 90.522683,
    "address": "BRPL Refinery, iocl/bgr township",
    "phone": "03664254669, 03664253253",
    "bloodGroups": [
      "B-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Mangaldoi Civil Hospital Blood Bank",
    "lat": 26.437551,
    "lng": 92.036395,
    "address": "Mangaldoi Civil Hospital, NH 52, Mangaldoi, Darrang",
    "phone": "03713 222024",
    "bloodGroups": [
      "B+",
      "O-",
      "AB+",
      "A-",
      "AB-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Dhemaji Civil Hospital Blood Bank",
    "lat": 27.458026,
    "lng": 94.574533,
    "address": "Ward No:9, Lachit Nagar, Natun Nagar Rd",
    "phone": "9678100660",
    "bloodGroups": [
      "O+",
      "B-",
      "AB-",
      "B+",
      "A-",
      "AB+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Dhubri Civil Hospital Blood Bank",
    "lat": 26.034365,
    "lng": 89.963554,
    "address": "Jhagrarpar, Dhubri",
    "phone": "0366 223 2558, 03662 230959",
    "bloodGroups": [
      "A+",
      "B-",
      "O+",
      "AB+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Assam Medical College and Hospital Blood Bank",
    "lat": 27.486985,
    "lng": 94.944179,
    "address": "Barbari, Dibrugarh",
    "phone": "3732303731",
    "bloodGroups": [
      "O+",
      "B+",
      "B-",
      "A+",
      "AB+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Dr. Damani&#39;s Nursing Home Blood Bank",
    "lat": 27.4898858,
    "lng": 94.9229632,
    "address": "L.G.B. Avenue, Near Circuit House",
    "phone": "0373 2300928",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Aditya Diagnostic Hospital Blood Bank",
    "lat": 27.491383,
    "lng": 94.931116,
    "address": "Bordoloi Avenue, Dibrugarh",
    "phone": "0373 2302219, 0373 2302220",
    "bloodGroups": [
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Oil India Limited Hospital Blood Bank",
    "lat": 27.359192,
    "lng": 95.323648,
    "address": "Oil Hospital, Duliajan",
    "phone": "0374 2806356",
    "bloodGroups": [
      "A+",
      "O+"
    ]
  },
  {
    "name": "Haflong Civil Hospital Blood Bank ",
    "lat": 25.165653,
    "lng": 93.024831,
    "address": "NH 54, Songpijaang, Haflong",
    "phone": "03673 236 555",
    "bloodGroups": [
      "AB+",
      "B+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Goalpara Civil Hospital Blood Bank",
    "lat": 26.142267,
    "lng": 90.610584,
    "address": "Agia Road, Goalpara",
    "phone": "03663240337, 03663 243800",
    "bloodGroups": [
      "A+",
      "B+",
      "AB-",
      "O-",
      "AB+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Solace Hospital and Research centre Pvt.Ltd Blood bank",
    "lat": 26.164643,
    "lng": 90.624877,
    "address": "BOC Agia Road Road, P.O. Baladmari\r\nOpposite to Assam Oil Petrol Pump",
    "phone": "03663 240021, 03663 243031",
    "bloodGroups": [
      "B-",
      "A+",
      "A-",
      "AB-",
      "AB+",
      "O+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Kushal Konwar (KK) Civil Hospital Blood Bank",
    "lat": 26.510171,
    "lng": 93.964569,
    "address": "Abita Building, 1st floor,  Golaghat Near stataion Rd\r\n",
    "phone": "00377 428 0042, 03774 280265",
    "bloodGroups": [
      "B+",
      "B-"
    ]
  },
  {
    "name": "Vivekananda Kendra NRL Hospital Blood Bank",
    "lat": 26.591371,
    "lng": 93.749516,
    "address": "NRL Township, Numaligarh Refinery Complex",
    "phone": "03776-266-566,03776-266-700",
    "bloodGroups": [
      "A-",
      "AB-",
      "B-",
      "AB+",
      "B+",
      "O-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "S. K. Roy Civil Hospital Blood Bank ",
    "lat": 24.671769,
    "lng": 92.563355,
    "address": "Hailakandi Civil Hospital, NH 154, Bashdahar, Hailakandi",
    "phone": "03744 281443, 03744 222423",
    "bloodGroups": [
      "A+",
      "A-",
      "B+",
      "B-",
      "O-",
      "AB-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Jorhat Medical College and Hospital Blood Bank ",
    "lat": 26.742573,
    "lng": 94.195109,
    "address": "Telemedicine Department, KB Road, Kushal Nagar, Tarajan",
    "phone": "0376 2370155",
    "bloodGroups": [
      "O-",
      "B-",
      "AB-",
      "AB+",
      "A+",
      "O+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Greater Jorhat Lions Blood Bank",
    "lat": 26.753059,
    "lng": 94.185964,
    "address": "Lions Multiple Service Centre, Sonali Jayanti Nagar",
    "phone": "09854665019, 09854050900",
    "bloodGroups": [
      "A+",
      "A-",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Mahendra Mohan Choudhury (MMC) Hospital  Blood Bank",
    "lat": 26.185505,
    "lng": 91.740485,
    "address": "Panbazar, Guwahati",
    "phone": "0361 2733004",
    "bloodGroups": [
      "B-",
      "B+"
    ]
  },
  {
    "name": "Dispur Blood Bank",
    "lat": 26.149823,
    "lng": 91.786638,
    "address": "Ganeshguri, Dispur",
    "phone": "0825 399124 ext 222",
    "bloodGroups": [
      "A+",
      "B+"
    ]
  },
  {
    "name": "Saharia&#39;s Path Lab & Blood Bank",
    "lat": 26.16274,
    "lng": 91.770664,
    "address": "Guwahati - Shillong Rd, Near Petrol Pump, ABC, Bhangagarh\r\nOpposite Anil Plaza",
    "phone": "0361-2458595, 0361 245 8594",
    "bloodGroups": [
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "International Hospital Blood Bank",
    "lat": 26.154059,
    "lng": 91.781267,
    "address": "Lotus Tower, G.S. Road, Christian Basti",
    "phone": "3617135005",
    "bloodGroups": [
      "B-",
      "B+",
      "A+",
      "AB-",
      "A-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Hayat Hospital Blood Bank",
    "lat": 26.139171,
    "lng": 91.746199,
    "address": "Odalbakra, Lalganesh",
    "phone": "0361-2475550/51/52/53/54",
    "bloodGroups": [
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Rahman Hospital Private Limited Blood Bank",
    "lat": 26.135133,
    "lng": 91.809429,
    "address": "VIP Road, Sixmile, Khanapara, ",
    "phone": "0361 233444",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "GNRC Institute of Medical Sciences Blood bank",
    "lat": 26.202192,
    "lng": 91.693312,
    "address": "Sila Grant Town, North Guwahati , Near IIT Guwahati",
    "phone": "03612227700, 03612227701",
    "bloodGroups": [
      "A-",
      "O+",
      "AB-",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Central Hospital N. F. Railway Blood Bank",
    "lat": 26.151872,
    "lng": 91.694899,
    "address": "PNGB Road, Near Kamakhya Railway Station, Maligaon, Guwahati",
    "phone": "03612723762, 03612570492",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "G.N.R.C. Hospital Blood Bank",
    "lat": 26.1391,
    "lng": 91.794024,
    "address": "Dispur, Guwahati",
    "phone": "0361 2227700",
    "bloodGroups": [
      "O+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Guwahati Medical College and Hospital (GMCH) State of The Art Model Blood Bank",
    "lat": 26.159914,
    "lng": 91.768498,
    "address": "GMCH Complex, GMCH Rd, Bhangagarh, Guwahati",
    "phone": "0361 252 9457",
    "bloodGroups": [
      "A-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Dr. B. Borooah Cancer Institute Blood Bank",
    "lat": 26.165087,
    "lng": 91.747674,
    "address": "Gopinath Nagar, Birubari, Guwahati",
    "phone": "0361 2472366, 0361 2472636",
    "bloodGroups": [
      "A+",
      "B+",
      "A-",
      "O-",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Assam Gujarat Voluntary Blood Bank and Research Centre",
    "lat": 26.176689,
    "lng": 91.753784,
    "address": "33, Anil Mazamill Road, Lane opposite to Apsara Cinema, \r\nManipuri Basti",
    "phone": "9864096134",
    "bloodGroups": [
      "AB-",
      "AB+",
      "B-",
      "O+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Down Town Hospital Blood Bank ",
    "lat": 26.136151,
    "lng": 91.796833,
    "address": "4th Floor, Buiding No:1, G.S. Road, Dispur",
    "phone": "00361 2332741, 0361 2334168",
    "bloodGroups": [
      "A-",
      "B-",
      "O+",
      "A+",
      "AB+",
      "B+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Ganga Hospital Blood Bank",
    "lat": 26.172081,
    "lng": 91.759992,
    "address": "G. S. Road, Lachit Nagar, Ulubari, \r\nNear KFC; Neubari",
    "phone": "0361 2454742",
    "bloodGroups": [
      "B+",
      "A+"
    ]
  },
  {
    "name": " Surakhya  Blood Bank ",
    "lat": 26.175065,
    "lng": 91.75257,
    "address": "Arya Hospital complex, A.M. Road, Rehabri\r\nOpposite Apsara Cinema Hall",
    "phone": "03612606665, 0361 2606888",
    "bloodGroups": [
      "O+",
      "B-",
      "B+",
      "O-",
      "AB-",
      "A+",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Marwari Hospital and Research Centre Blood Bank",
    "lat": 26.172012,
    "lng": 91.740106,
    "address": "Sati Jaymati Road, Athgaon",
    "phone": "0361 2733737",
    "bloodGroups": [
      "O-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "151 Base Hospital Blood Bank",
    "lat": 26.104222,
    "lng": 91.796169,
    "address": "Basistha, Guwahati",
    "phone": "9959857437",
    "bloodGroups": [
      "O-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Sanjevani Hospital Blood Bank",
    "lat": 26.161206,
    "lng": 91.70941,
    "address": "Maligaon,  Guwahati",
    "phone": "0361 2674892",
    "bloodGroups": [
      "A-",
      "AB-",
      "B+",
      "O+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Narayana Hrudayalaya Limited Blood Bank",
    "lat": 26.20775,
    "lng": 91.678242,
    "address": "Tularam Bafana Civil Hospital Campus, North Guwahati, Amingaon.",
    "phone": "3612680321",
    "bloodGroups": [
      "O-",
      "A-",
      "AB+",
      "A+",
      "AB-",
      "B+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Diphu Civil Hospital Blood Bank",
    "lat": 25.844281,
    "lng": 93.433805,
    "address": "Diphu, Karbi Anglong",
    "phone": "9435066080",
    "bloodGroups": [
      "A-",
      "B-",
      "O-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Karimganj Civil Hospital Blood Bank",
    "lat": 24.867595,
    "lng": 92.361806,
    "address": "Karimganj",
    "phone": "03843260490, 03844 263200",
    "bloodGroups": [
      "B+",
      "O-",
      "AB-",
      "O+",
      "A+",
      "A-"
    ]
  },
  {
    "name": "R.N.B. Civil Hospital Blood Bank",
    "lat": 26.452881,
    "lng": 89.976397,
    "address": "Habrubil, Gossaigaon, Kokrajhar",
    "phone": "03661 276436",
    "bloodGroups": [
      "B+",
      "B-"
    ]
  },
  {
    "name": "North Lakhimpur Civil Hospital Blood Bank",
    "lat": 27.242685,
    "lng": 94.106483,
    "address": "North Lakhimpur",
    "phone": "03752 242240, 03752 243182",
    "bloodGroups": [
      "AB-",
      "O+",
      "A-",
      "O-",
      "B+",
      "AB+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Morigaon Civil Hospital Blood Bank",
    "lat": 26.251646,
    "lng": 92.354523,
    "address": "KK Handique Path, Ward Number 7, Rajagaon, ",
    "phone": "08011352918, 099574 59887",
    "bloodGroups": [
      "O-",
      "B+",
      "O+",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Haji Abdul Majid Memorial Hospital and Research Centre Blood Bank",
    "lat": 26.015994,
    "lng": 92.868186,
    "address": "Hojai, Nagaon",
    "phone": "03674-252514",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "B.P. Civil Hospital Blood Bank",
    "lat": 26.344942,
    "lng": 92.689464,
    "address": "Civil Road, Nagaon",
    "phone": "03672-251105",
    "bloodGroups": [
      "A+",
      "AB+"
    ]
  },
  {
    "name": "North East Blood Bank and Research Centre",
    "lat": 26.344263,
    "lng": 92.680991,
    "address": "N.H. 37, Haibargaon, ",
    "phone": "03672 223351",
    "bloodGroups": [
      "O-",
      "O+",
      "B-",
      "AB+",
      "A+",
      "A-",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "S. M. K. Civil Hospital Blood Bank ",
    "lat": 26.448222,
    "lng": 91.435618,
    "address": "Maszid Road ",
    "phone": "03624-223555",
    "bloodGroups": [
      "AB+",
      "AB-",
      "B-",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Nalbari Maternity Hospital Blood Bank",
    "lat": 26.440614,
    "lng": 91.43584,
    "address": "Alternative Road",
    "phone": "3624220840",
    "bloodGroups": [
      "B+",
      "O+",
      "B-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "O.N.G.C. Limited Hospital Blood Bank",
    "lat": 26.981201,
    "lng": 94.651794,
    "address": "Sivasagar ",
    "phone": "9435717271",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Pragati Hospital and Research Centre Blood Bank",
    "lat": 26.997865,
    "lng": 94.61976,
    "address": "A.T. Road, Sivsagar",
    "phone": "9854041744",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Sivasagar Civil Hospital Blood Bank",
    "lat": 26.955222,
    "lng": 94.611106,
    "address": "Joysagar",
    "phone": "9435057007",
    "bloodGroups": [
      "AB+",
      "B-",
      "O-",
      "A+",
      "A-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Catholic Hospital Blood Bank",
    "lat": 26.815339,
    "lng": 93.320185,
    "address": "Borgang",
    "phone": "3715291162",
    "bloodGroups": [
      "A-",
      "O+",
      "A+",
      "AB+",
      "B-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Kanaklata Civil Hospital Blood Bank",
    "lat": 26.628524,
    "lng": 92.796499,
    "address": "Main Road, Tezpur",
    "phone": "003712-252999, 03712 220033",
    "bloodGroups": [
      "O-",
      "B-",
      "AB+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "155 Base Hospital Blood Bank",
    "lat": 26.655397,
    "lng": 92.787317,
    "address": "Tezpur  ",
    "phone": "9435710555",
    "bloodGroups": [
      "AB-",
      "AB+",
      "O-",
      "A+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Tezpur Medical College Hospital Blood Bank ",
    "lat": 26.680968,
    "lng": 92.653349,
    "address": "Bihaguri",
    "phone": "03712 241344",
    "bloodGroups": [
      "B+",
      "O+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Indian Oil Corp Ltd (AOD) Hospital blood bank",
    "lat": 27.39287,
    "lng": 95.62943,
    "address": "IOCL, Assam Division, Digboi",
    "phone": "03751-263515",
    "bloodGroups": [
      "O+",
      "A+",
      "A-",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Central Hospital  Coal India Limited",
    "lat": 27.289292,
    "lng": 95.674768,
    "address": "Coal India Limited, Margerita",
    "phone": "9435138053",
    "bloodGroups": [
      "A-",
      "B-"
    ]
  },
  {
    "name": "Tinsukia Civil Hospital Blood Bank",
    "lat": 27.498632,
    "lng": 95.358861,
    "address": "Bordoloi Nagar, Tinsukia",
    "phone": "0374 2308343",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Tinsukia Blood Bank",
    "lat": 27.490438,
    "lng": 95.363017,
    "address": "S.R. Lohia Road, Chiravapathy, IMA House, Tinsukia",
    "phone": "0374 2332080",
    "bloodGroups": [
      "A-",
      "O+",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Rastra Kavi Dinkar Blood Bank",
    "lat": 25.4138,
    "lng": 86.13596,
    "address": "Sadar Hospital, Begusarai\r\n\r\n",
    "phone": "06243 220072",
    "bloodGroups": [
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Jawaharlal Nehru Medical College Hospital (JNMCH) Blood Bank",
    "lat": 25.264217,
    "lng": 87.002126,
    "address": "Mayaganj, Tilkamanjhi, ",
    "phone": "0641 2409555  ",
    "bloodGroups": [
      "O+",
      "A+",
      "AB-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Sadar Hospital Ara (Bhojpur) Blood bank",
    "lat": 25.559755,
    "lng": 84.667554,
    "address": "Sapna Cinema Road, Nawada,",
    "phone": "7870307773",
    "bloodGroups": [
      "A+",
      "B-",
      "B+",
      "AB-",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Sadar Hospital Ara Blood Bank",
    "lat": 25.558506,
    "lng": 84.670631,
    "address": "Sadar Hospital Ara Blood Bank, Shivganj\r\n",
    "phone": "09507840742, 09334466166",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Maa Vindhyawasini Blood Bank ",
    "lat": 25.539954,
    "lng": 87.56747,
    "address": "Pakari Chauk, Near Malti Hospital",
    "phone": "09835642642, 09430929650",
    "bloodGroups": [
      "A+",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Indian Red Cross Blood Bank (IRCS) Blood Bank",
    "lat": 25.559303,
    "lng": 84.661958,
    "address": "South Ramna Road, Bhojpur",
    "phone": "9386399967",
    "bloodGroups": [
      "O-",
      "AB-",
      "A-",
      "B-",
      "B+",
      "AB+",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Sadar Hospital Buxar Blood Bank",
    "lat": 25.56471,
    "lng": 83.977748,
    "address": "Old Campus of Sadar Hospital, Civil Line",
    "phone": "09431235353, 09431083400",
    "bloodGroups": [
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Darbhanga Medical College and Hospital (DMCH) Regional Blood Bank",
    "lat": 26.133426,
    "lng": 85.898943,
    "address": "Darbhanga Surgery Building, Ground Floor, DMCH Campus, DMCH Road",
    "phone": "06272 233 092",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank, Motihari",
    "lat": 26.647477,
    "lng": 84.910299,
    "address": "Red Cross Society Sadar Hospital road, Motihari, Red Cross Bhawan, Hospital Road",
    "phone": "06252 22202, 06252 232202",
    "bloodGroups": [
      "O-",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Anugrah Narayan Memorial Magadh Medical College Hospital (ANMMCH) Blood Bank",
    "lat": 24.771176,
    "lng": 84.960302,
    "address": "Sher Ghati Road",
    "phone": "0631 2410339",
    "bloodGroups": [
      "A+",
      "O-",
      "AB-",
      "B+",
      "A-"
    ]
  },
  {
    "name": " Sadar Hospital, Gopalganj Blood Bank",
    "lat": 26.460762,
    "lng": 84.441119,
    "address": "Ward No. 15, Gopalganj",
    "phone": "06156-224754",
    "bloodGroups": [
      "B+",
      "AB-",
      "A+",
      "AB+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Sadar Hospital Jamui Blood Bank",
    "lat": 25.20523,
    "lng": 85.514552,
    "address": "185, Khan Hospital Road ",
    "phone": "6345222820",
    "bloodGroups": [
      "AB-",
      "B-",
      "O+",
      "O-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Amar Saheed Jagdeo Prasad, Sadar Hospital Jehanabad Blood Bank ",
    "lat": 40.267194,
    "lng": 86.134902,
    "address": "P G Road, Arwal More",
    "phone": "06114 225857",
    "bloodGroups": [
      "O-",
      "A+",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Sadar Hospital Kaimur (Bhabua) Blood Bank ",
    "lat": 25.039579,
    "lng": 83.607736,
    "address": "Kachahari Road, Kaimur",
    "phone": "06189 223254",
    "bloodGroups": [
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Sadar Hospital, Katihar Blood bank",
    "lat": 25.539923,
    "lng": 87.567583,
    "address": "Blood Bank, Sadar Hospital\r\n\r\n",
    "phone": "9431634656",
    "bloodGroups": [
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Sadar Hospital Khagaria Blood Bank ",
    "lat": 25.50788,
    "lng": 86.474581,
    "address": "Ward Number 14, Khagaria",
    "phone": "06244 222 134",
    "bloodGroups": [
      "A-",
      "B+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Sadar Hospital Kishanganj Blood Bank ",
    "lat": 26.101776,
    "lng": 87.948834,
    "address": "Hospital Road",
    "phone": "06456 223502, 06456 226464",
    "bloodGroups": [
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Sadar Hospital Madhepura Blood Bank ",
    "lat": 25.922909,
    "lng": 86.792226,
    "address": "Near pani tanki chowk, Ward No:10",
    "phone": "9430039619",
    "bloodGroups": [
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Sri Krishna Medical College Hospital (SKMCH) Blood Bank ",
    "lat": 26.167644,
    "lng": 85.392082,
    "address": "National Highway 77, Uma Nagar, Rasulpur Saidpur Bazid\r\n",
    "phone": "0621 2233033",
    "bloodGroups": [
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Sadar Hospital Muzaffarpur Blood Bank",
    "lat": 26.122253,
    "lng": 85.382562,
    "address": "Sadar Hospital Blood Bank Muzaffarpur, Near Muzaffarpur Railway Station, Hospital Road, \r\n",
    "phone": "9431013092",
    "bloodGroups": [
      "B-",
      "AB+",
      "O+",
      "AB-",
      "A+",
      "O-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Red Cross Blood Bank, Sadar Hospital, Bihar Sharif",
    "lat": 25.20523,
    "lng": 85.514552,
    "address": "Indian Red Cross Society, opposite Sadar Hospital, near IMA hall",
    "phone": "9709456019",
    "bloodGroups": [
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Nalanda Medical College and Hospital Blood Bank",
    "lat": 25.594095,
    "lng": 85.137565,
    "address": "Agamkuan, Near Shitla Mandir",
    "phone": "0612-2918523/2631159",
    "bloodGroups": [
      "O+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Bihar State Patna Medical College and Hospital (PMCH) Blood Bank",
    "lat": 25.619794,
    "lng": 85.158851,
    "address": "Ashok Raj Path, Bankipore\r\n\r\n",
    "phone": "0612 2300334",
    "bloodGroups": [
      "AB+",
      "B-",
      "A+",
      "O-",
      "O+",
      "AB-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Indian Red Cross Society (IRCS) Patna Blood Bank",
    "lat": 25.619909,
    "lng": 85.145263,
    "address": "Indian Red Cross Bhawan, North Gandhi Maidan",
    "phone": "0612 2201035",
    "bloodGroups": [
      "A-",
      "O-",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Jaiprabha Hospital Model Blood Bank (MBB)",
    "lat": 25.60017,
    "lng": 85.152281,
    "address": "State of art Model Blood Bank,\r\nJai Prabha Hospital Campus, P.C.Colony, Kankarbagh, Near Ganga Devi Mahila Maha Vidyalaya",
    "phone": "0612 2355805",
    "bloodGroups": [
      "O-",
      "AB+",
      "A+",
      "B-",
      "B+",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Indira Gandhi Institute of Medical Sciences (IGIMS) Blood Bank ",
    "lat": 25.611687,
    "lng": 85.089567,
    "address": "Baily Road, Sheikpura, Raja Bazar, Near Sanjay Gandhi Botanical Garden",
    "phone": "0612 2297631, 0612 2297099 (Ext - 125) ",
    "bloodGroups": [
      "AB+",
      "B+",
      "A+",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Indian Red Cross Society (IRCS) Blood Bank",
    "lat": 25.785486,
    "lng": 87.488251,
    "address": "Red Cross Blood Bank, Purnea, Red Cross Bhawan Line Bazar\r\n",
    "phone": "0654 244211",
    "bloodGroups": [
      "A-",
      "O+",
      "O-",
      "AB-",
      "AB+",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Sadar Hospital Purnia  Blood Bank ",
    "lat": 25.778234,
    "lng": 87.472456,
    "address": "Sudin Chowk Road, Rajnikant Colony, Line Bazar, Purnea,",
    "phone": " 09939213483, 09431268348, 09334510634, 0943127662",
    "bloodGroups": [
      "O+",
      "O-",
      "B+",
      "A+",
      "B-",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Sadar Hospital Sasaram Blood Bank",
    "lat": 24.952782,
    "lng": 84.013897,
    "address": "Rauza Road, Laxkariganj, Near Head Post Office, Sasaram\r\n",
    "phone": "6184227105",
    "bloodGroups": [
      "B-",
      "A+"
    ]
  },
  {
    "name": "Sadar Hospital Saharsa Blood Bank ",
    "lat": 25.88715,
    "lng": 86.590953,
    "address": "Zila School Road, Police Line, Saharsa",
    "phone": "9934712522",
    "bloodGroups": [
      "B+",
      "A-",
      "B-",
      "A+",
      "O+",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Sadar Hospital Samastipur Blood Bank ",
    "lat": 25.857206,
    "lng": 85.778507,
    "address": "14, State Highway 50, Azad Nagar, Samastipur, ",
    "phone": "06274 222 331",
    "bloodGroups": [
      "B-",
      "O-"
    ]
  },
  {
    "name": "Sadar Hospital Chhapra Blood Bank ",
    "lat": 25.781723,
    "lng": 84.73066,
    "address": "Daroga Rai Chowk, Sadhapur, Chhapra,",
    "phone": "078709 44325",
    "bloodGroups": [
      "A-",
      "B-",
      "AB-",
      "B+",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Sadar Hospital Sheikhpura Blood Bank",
    "lat": 25.133195,
    "lng": 85.841424,
    "address": "Near Dallu Chowk, Sheikhpura,",
    "phone": "06341 225172,  06341 225013",
    "bloodGroups": [
      "B+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Sadar Hospital Sitamarhi Blood Bank",
    "lat": 26.596243,
    "lng": 85.494747,
    "address": "NH 104, KVJ Nagar, Sitamarhi, ",
    "phone": "9473264433",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": " Sadar Hospital Siwan Blood Bank",
    "lat": 26.226162,
    "lng": 84.361845,
    "address": "SH 45, Babhnauli, Siwan",
    "phone": "082940 84226, 09431284168",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Sadar Hospital Hajipur Blood Bank ",
    "lat": 25.690268,
    "lng": 85.208265,
    "address": "hospital road, hajipur, Near Civil Court\r\n",
    "phone": "09473191934, 09279220893",
    "bloodGroups": [
      "B-",
      "A-",
      "A+",
      "B+",
      "O+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Maharani Janki Kunwar (MJK) Hospital Blood Bank",
    "lat": 26.796929,
    "lng": 84.500903,
    "address": "Bettiah, West Champaran",
    "phone": "",
    "bloodGroups": [
      "AB-",
      "A-",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Department of  Transfusion Medicine, PGIMER Blood Bank",
    "lat": 30.765913,
    "lng": 76.775488,
    "address": "Blood Bank, Department of Transfusion Medicine, Nehru Hospital, PGIMER, Sec-12, Chandigarh. ",
    "phone": "0172 2756481 ",
    "bloodGroups": [
      "B+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Rotary and Blood Bank Society Resource Centre",
    "lat": 30.74211,
    "lng": 76.755138,
    "address": "Plot No:4, Dakshin Marg, Sector 37A, Chandigarh",
    "phone": "0172 2696057 ",
    "bloodGroups": [
      "AB+",
      "A-",
      "AB-",
      "B+",
      "B-",
      "O+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Government Medical College and Hospital Blood Bank ",
    "lat": 30.709289,
    "lng": 76.780536,
    "address": "Department of Transfusion Medicine ,Government Medical College and Hospital, Sector-32, Chandigarh",
    "phone": "0172 2665253, 0172 2601023 (Extn. 1166)",
    "bloodGroups": [
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Government Multispeciality Hospital Blood Bank",
    "lat": 30.751021,
    "lng": 76.780967,
    "address": "Blood Bank, Government Multispeciality Hospital, Room No. 164 Sector 16 Chandigarh.",
    "phone": "0172 2701288",
    "bloodGroups": [
      "O+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Maharani Hospital Blood Bank ",
    "lat": 19.085071,
    "lng": 82.023963,
    "address": "Lt. brkm .govtmedical college jagdalpur\r\nchandni chouk jagdalpur",
    "phone": "07782-225958",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Chhattisgarh Insititute of Medical Sciences (CIMS) Blood Bank ",
    "lat": 22.087621,
    "lng": 82.152265,
    "address": "Gond Para, Gole Bazar",
    "phone": "07752221425, 077522 30030",
    "bloodGroups": [
      "A-",
      "O+"
    ]
  },
  {
    "name": "Bilaspur District Hospital Blood Bank ",
    "lat": 22.074225,
    "lng": 82.158399,
    "address": "Sardar Vallabhbhai Patel District Govt Hospital, old bus stand road\r\nOpposite to Rajeev plaza",
    "phone": "07752 421898",
    "bloodGroups": [
      "A-",
      "O+",
      "B+",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Apollo Hospital Blood Bank ",
    "lat": 22.087007,
    "lng": 82.177637,
    "address": "Village - Lingyadih, Seepat Road",
    "phone": "07752 248300 - 1030/31",
    "bloodGroups": [
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Shri Rawatpura Sarkar Lok Kalyan Trust, Bilasa Blood Bank ",
    "lat": 22.086695,
    "lng": 82.152539,
    "address": "2nd Floor, Bhawe Razab Ali Chamber, \r\nOpposite to CIMS Hospital, Sadar Bazaar, Bilaspur",
    "phone": "7752656422",
    "bloodGroups": [
      "B+",
      "AB-",
      "A+",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Ekta Blood Bank",
    "lat": 22.078658,
    "lng": 82.145069,
    "address": "C/O Thalassemia Society,Near Abhiyanta Bhawan,Magarpara",
    "phone": "9644108882",
    "bloodGroups": [
      "AB-",
      "B-",
      "AB+",
      "O+",
      "A-",
      "B+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "NMDC Apollo Hospital Blood Bank",
    "lat": 18.703695,
    "lng": 81.248612,
    "address": "Bailadila Iron Ore Mines, Bacheli, Dantewada",
    "phone": "07857 230050",
    "bloodGroups": [
      "O+",
      "A-",
      "B-",
      "B+"
    ]
  },
  {
    "name": "District Hospital Blood Bank Dantewada",
    "lat": 18.89362167,
    "lng": 81.3504983,
    "address": "Civil Surgeon, District Hospital, Dantewada",
    "phone": "07856 252830 ",
    "bloodGroups": [
      "AB-",
      "O-",
      "AB+",
      "O+",
      "B+"
    ]
  },
  {
    "name": "NMDC Project Hospital Blood Bank",
    "lat": 18.634249,
    "lng": 81.252895,
    "address": "Bailadila Iron Ore Mine, Kirandul Complex",
    "phone": "7857255229",
    "bloodGroups": [
      "AB+",
      "B-",
      "O-",
      "A+",
      "AB-",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Dhamtari District Hospital Blood Bank ",
    "lat": 20.707653,
    "lng": 81.53949,
    "address": "Civil Surgeon, District Hospital, Dhamtari",
    "phone": "9406015822",
    "bloodGroups": [
      "O-",
      "O+",
      "AB+",
      "A-",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Dhamtari Christian Hospital",
    "lat": 20.718748,
    "lng": 81.55154,
    "address": "Industrial Area, Raipur Road, Dhamtari",
    "phone": " 077222 40362",
    "bloodGroups": [
      "O-",
      "O+",
      "B-",
      "AB-",
      "AB+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "B.S.R. Cancer Hospital",
    "lat": 21.216312,
    "lng": 81.322622,
    "address": "B.S.R. Cancer Hospital (P.A.) Limited, Junwani Road, Smriti Nagar, Bhilai, Near T.I. Mall",
    "phone": "7884085100",
    "bloodGroups": [
      "B+",
      "A-",
      "A+",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Chandulal Chandraker Memorial (C.C.M.) Medical College Blood Bank",
    "lat": 21.251525,
    "lng": 81.337451,
    "address": "Kachandur, Kurud-Road",
    "phone": "0788 6006061",
    "bloodGroups": [
      "A+",
      "AB+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Durg District Hospital  Blood Bank",
    "lat": 21.187096,
    "lng": 81.279227,
    "address": "Civil Surgeon, District Hospital, Durg",
    "phone": "7882219888",
    "bloodGroups": [
      "B-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "J.L.N Hospital & Research Center  Blood Bank",
    "lat": 21.189732,
    "lng": 81.316117,
    "address": "Sector-9 Bhilai",
    "phone": "0788 2856020",
    "bloodGroups": [
      "O+",
      "A-",
      "B-",
      "B+",
      "A+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Chandulal Chandrakar Memorial Hopsital Blood Bank",
    "lat": 21.200246,
    "lng": 81.322665,
    "address": "Chandulal Chandraker Memorial Hospital, GE Road, Bhilai, Durg.",
    "phone": "9993095031",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Kawardha District Hospital Blood Bank  ",
    "lat": 22.036,
    "lng": 81.221,
    "address": "Civil Surgeon, District Hospital, Kawardha",
    "phone": "07741 235553, 07741 233413",
    "bloodGroups": [
      "O+",
      "B-",
      "A+",
      "B+",
      "A-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Kanker District Hospital Blood Bank  ",
    "lat": 20.264724,
    "lng": 81.495155,
    "address": "Civil Surgeon, District Hospital, Kanker",
    "phone": "7868241063",
    "bloodGroups": [
      "A-",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Indira Gandhi District Hospital Blood bank, Kobra",
    "lat": 22.364,
    "lng": 82.744,
    "address": "Rajgamar Road, Kosabadi Korba\r\n",
    "phone": "09589028750, 09406008183",
    "bloodGroups": [
      "O+",
      "AB-",
      "AB+",
      "A-",
      "B+",
      "B-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Bilash Blood Bank,KORBA",
    "lat": 22.358763,
    "lng": 82.7203479,
    "address": "HIG-21, Ext. M. P. Nagar, Ghantaghar Chowk",
    "phone": "7759644655",
    "bloodGroups": [
      "O+",
      "A+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Distrcit Hospital Baikunthpur Blood bank, Korea",
    "lat": 23.26,
    "lng": 82.562,
    "address": "Jampara, Baikunthpur",
    "phone": "9425256793",
    "bloodGroups": [
      "O+",
      "AB+",
      "B+",
      "AB-",
      "B-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Christian Hospital Blood Bank",
    "lat": 22.070986,
    "lng": 81.687633,
    "address": "Tilak Ward Lormi Road,  Mungeli",
    "phone": "775564003",
    "bloodGroups": [
      "B-",
      "A+",
      "AB+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Ramakrishna Mission Ashram Blood Bank",
    "lat": 19.716626,
    "lng": 81.229284,
    "address": "Ramakrishna Mission Ashram, Narayanpur",
    "phone": "07781 252370",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "District Hospital Blood Bank Mahasamund",
    "lat": 21.1193227,
    "lng": 82.0743057,
    "address": "Mahasamund Raipur Road, Kharora Village",
    "phone": "7723222203",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "O.P. Jindal Hospital & Research Centre Blood Bank ",
    "lat": 21.927279,
    "lng": 83.359147,
    "address": "Jindal Education and Welfare Society, INN Plaza, Kharsia Road, Patrapali",
    "phone": "07762 - 227034 (EXT: 43659)",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Sewa Blood Bank",
    "lat": 21.890931,
    "lng": 83.3966244,
    "address": "Opposite to Kirodimal district hospital, Gopi Talkies Road",
    "phone": "07762 225400",
    "bloodGroups": [
      "A+",
      "A-",
      "AB+",
      "O-",
      "AB-",
      "B+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Dr B R Ambedkar Memorial Hospital, Model Blood Bank",
    "lat": 21.25076,
    "lng": 81.639,
    "address": "Room No:120, 1st Floor, Attached with PT.J.N.M Medical College, Jail Road\r\n",
    "phone": "0771 2890090",
    "bloodGroups": [
      "AB-",
      "A-",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 21.15,
    "lng": 81.38,
    "address": "Pt. J. N. M. Medical College premises, Jail Road, Raipur",
    "phone": "0771 2880111",
    "bloodGroups": [
      "AB-",
      "B+",
      "B-",
      "O+",
      "O-"
    ]
  },
  {
    "name": "City Blood Bank",
    "lat": 21.240907,
    "lng": 81.620688,
    "address": "Adarsh Bazar, G.E Road, Near Vivekanand Ashram",
    "phone": "07714032241, 07716460810",
    "bloodGroups": [
      "AB+",
      "B+",
      "O-",
      "B-",
      "O+",
      "AB-",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Sai Sahara Blood Bank",
    "lat": 21.251385,
    "lng": 81.629642,
    "address": "Garcha Complex, Jail Road ",
    "phone": "0771 2551050",
    "bloodGroups": [
      "A+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Narayana Hrudayalaya MMI Blood Bank",
    "lat": 21.21327,
    "lng": 81.65767,
    "address": "NHMMI Hospital Campus, Lalpur, Dhamtari Road",
    "phone": "0771 4210902 (Ext-928)",
    "bloodGroups": [
      "O-",
      "B-",
      "O+",
      "A-",
      "AB-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "SSD Blood Bank",
    "lat": 21.235832,
    "lng": 81.652249,
    "address": "Katora Talab Chowk, Near Netaji Hotel, Opposite to Swapnil Nursing Home",
    "phone": "0771 2432511, 07712422980",
    "bloodGroups": [
      "AB+",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Chhattisgarh Blood Bank",
    "lat": 21.246825,
    "lng": 81.61188,
    "address": "Agarainal Ramkrishna Care Hospital Premises, Opp. RKC Complex, Great Eastern Rd, Ramkund,  \r\nNear Dhuppad Petrol Pump",
    "phone": "0771 4088109,  077130 60518",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Bilasa Blood Bank",
    "lat": 21.25435,
    "lng": 81.66339,
    "address": "Sr. HIG -10,Sector-03, Shanker Nagar",
    "phone": "0771-4009304",
    "bloodGroups": [
      "AB+",
      "A-",
      "B+",
      "B-",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Srishti Blood Bank",
    "lat": 21.247,
    "lng": 81.656,
    "address": "2nd Floor, Dhillon Complex, Near Sindhi School, Jawahar Nagar,",
    "phone": "7354111119",
    "bloodGroups": [
      "A+",
      "B-",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Shree Narayana Hospital Blood Bank",
    "lat": 21.263533,
    "lng": 81.649825,
    "address": "Near Ganj Mandi, Behind Sector - 5, Devendra Nagar, Pandri",
    "phone": "0771 3001234",
    "bloodGroups": [
      "B+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Rajdhani Blood Bank",
    "lat": 21.244963,
    "lng": 81.630129,
    "address": "Main Road, Badhaipara\r\n",
    "phone": "0771 2292120, 0771 2292130",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Evangelical Mission Hospital Blood Bank",
    "lat": 21.553982,
    "lng": 81.79053,
    "address": "Tilda, P.O. Neora",
    "phone": "07721 - 233599",
    "bloodGroups": [
      "O-",
      "B-"
    ]
  },
  {
    "name": "Raipur Institute of Medical Science",
    "lat": 21.263176,
    "lng": 81.637035,
    "address": "RIMS Knowledge Park, Bhansoj Road, Off NH-6,\r\n",
    "phone": "0771-3053060-88 (29 Lines)",
    "bloodGroups": [
      "AB+",
      "A+",
      "O-",
      "B-",
      "O+",
      "AB-",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Aashirwad Blood Bank",
    "lat": 21.258245,
    "lng": 81.66018,
    "address": "H. No. S-5, Rajiv Nagar, Shankar Nagar, Behind Cristal Arcade Complex",
    "phone": "0771 4043768",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Medical college& Hospital Blood Bank Rajnandgaon",
    "lat": 21.086463,
    "lng": 81.030281,
    "address": "Superitendant medical college& Hospital Rajnandgaon",
    "phone": "9425557320",
    "bloodGroups": [
      "O-",
      "AB-",
      "B-",
      "A-",
      "O+",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Surguja District Hospital Blood Bank ",
    "lat": 23.1099901,
    "lng": 83.1945,
    "address": "Bilaspur Road, Ambikapur",
    "phone": "9424257335",
    "bloodGroups": [
      "A-",
      "AB-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Holy Cross Hospital Blood Bank",
    "lat": 23.134176,
    "lng": 83.193534,
    "address": "Ambikapur, Surguja District ",
    "phone": "077742 23733",
    "bloodGroups": [
      "A-",
      "B-",
      "A+",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Tej Blood Bank",
    "lat": 23.117556,
    "lng": 83.191169,
    "address": "Plot No. 3528/47, Jail Road, Babupara\r\nOpposite to Joda Talab",
    "phone": "07774 222666",
    "bloodGroups": [
      "B+",
      "A-",
      "O-",
      "B-",
      "O+",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Indian Red Cross Society (IRCS) Blood Bank",
    "lat": 20.276266,
    "lng": 73.008306,
    "address": "IRCS Red Cross House, Opposite to Bus Stand",
    "phone": "0260 2640911, 0260 2640577",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Daman Raktadan Kendra",
    "lat": 20.433246,
    "lng": 72.831276,
    "address": "Government Hospital Marwad Campus,  Nani Daman.",
    "phone": "0260 2255110",
    "bloodGroups": [
      "AB+",
      "B-",
      "O+",
      "A-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Diu District Blood Bank",
    "lat": 20.712855,
    "lng": 70.988929,
    "address": "Govt Hospital\r\nNear Sports Complex, Main Road, DIU",
    "phone": "02875 252480",
    "bloodGroups": [
      "O-",
      "B-",
      "O+",
      "AB+",
      "A-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Indian Red Cross Society (IRCS) Blood Bank",
    "lat": 28.618675,
    "lng": 77.21089,
    "address": "1, Red Cross Road, Near Parliament House",
    "phone": "011-23711551",
    "bloodGroups": [
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Dr. Ram Manohar Lohia Hospital Blood Bank",
    "lat": 28.3734,
    "lng": 77.125,
    "address": "161, Kali Bari Ln, Havelock Square, Type III, President&#39;s Estate, ",
    "phone": "01123404291, 01123404298",
    "bloodGroups": [
      "O+",
      "AB-",
      "A+",
      "A-",
      "O-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Sucheta Kriplani Hospital Blood Bank",
    "lat": 28.63566,
    "lng": 77.213327,
    "address": "C-604, Shaheed Bhagat Singh Marg, Connaught Place, Opposite to Shivaji Stadium Bus Terminal",
    "phone": "011 23408271",
    "bloodGroups": [
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Govind Ballabh (G.B.) Pant Hospital Blood Bank",
    "lat": 28.639542,
    "lng": 77.235159,
    "address": "1, Jawahar Lal Nehru Marg, Delhi Gate \r\n",
    "phone": "011-23232011, 011 23234242",
    "bloodGroups": [
      "AB+",
      "A+",
      "B-",
      "O-",
      "A-",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Regional Blood Tranfusion Center Blood bank, Central Zone",
    "lat": 28.638986,
    "lng": 77.23836,
    "address": "2 Jawarlal Nehru Marg, Delhi Gate, Near UBPH",
    "phone": "011 23233809, 011 23231023",
    "bloodGroups": [
      "A-",
      "AB-",
      "B+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Kasturba Hospital Blood Bank",
    "lat": 28.648838,
    "lng": 77.238017,
    "address": "Near Jama Masjid, Daryaganj",
    "phone": "0112 3282915 ext 202",
    "bloodGroups": [
      "B+",
      "O-"
    ]
  },
  {
    "name": "Sir Ganga Ram Hospital Blood Bank",
    "lat": 28.638675,
    "lng": 77.189489,
    "address": "Old Rajindra Nagar, Near Janki Devi College",
    "phone": "011 42251800, 011 42251868, 011 42251869, 011 42251872, 011 25750000, 011 25751111, 011 25735205, 011 25861463",
    "bloodGroups": [
      "O-",
      "B+",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Lal Bahadur Shastri Hospital Blood Bank",
    "lat": 28.617839,
    "lng": 77.311452,
    "address": "Near Kalyanvas Colony / Mayur Vihar Phase -II, GNCTD Kichdipur ",
    "phone": "011 22783633",
    "bloodGroups": [
      "O-",
      "AB+",
      "O+",
      "A-",
      "A+",
      "B+",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Max Super Specialty Hospital Blood Bank",
    "lat": 28.633501,
    "lng": 77.308836,
    "address": "Max Balaji Hospital (A unit of Balaji Medical and Diagnostic Research Centre), 108-A, Indraprastha Extension, Opposite Sanchar Apartment, Patparganj",
    "phone": "011 66242515, 011 43033333",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Dr. Hedgewar Arogaya Sansthan Blood bank",
    "lat": 28.655875,
    "lng": 77.293489,
    "address": "F-18, Karkardooma",
    "phone": "011 22301148, 011 22301149, 011 22309407",
    "bloodGroups": [
      "AB+",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Lions Blood Bank East Delhi",
    "lat": 28.641094,
    "lng": 77.309423,
    "address": "369, II Floor, FIE, Near M.C.D. Office, Patparganj Industrial Area\r\nNear Punjab National Bank\r\n",
    "phone": "011 43009747, 011-42828091",
    "bloodGroups": [
      "AB+",
      "A-",
      "B+",
      "B-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Dharamshila Cancer Foundation and Research Centre Blood Bank",
    "lat": 28.602512,
    "lng": 77.314182,
    "address": "4th floor, Vasundhara Enclave, Near New Ashok Nagar Metro Station",
    "phone": "1143066436",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Northern Railway Central Hospital Blood Bank",
    "lat": 28.636518,
    "lng": 77.217459,
    "address": "Basant Lane, Connaught Place",
    "phone": "011 23747989, 011 23744150, 011 23744170",
    "bloodGroups": [
      "A-",
      "AB-",
      "A+",
      "B-",
      "B+",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Pushpawati Singhania Research Institute Blood bank",
    "lat": 28.533218,
    "lng": 77.225185,
    "address": "Press Enclave Marg, Sheikh Sarai, Phase-II",
    "phone": "1130611780",
    "bloodGroups": [
      "B+",
      "AB-",
      "A-",
      "B-",
      "O+",
      "O-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Cardio Neuro Centre Blood Bank, AIIMS ",
    "lat": 28.566539,
    "lng": 77.20984,
    "address": "AIIMS, Ansari Nagar",
    "phone": "011 26593625, 011 26593749",
    "bloodGroups": [
      "O+",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Hindu Rao Hospital Blood Bank",
    "lat": 28.67538,
    "lng": 77.212312,
    "address": "G Block 4th floor, Near Civil Lines Malkaganj",
    "phone": "011 23905713",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "St. Stephen&#39;s Hospital Blood Bank",
    "lat": 28.665135,
    "lng": 77.214542,
    "address": "Tis Hazari, Opposite to Tis Hazari Metro Station",
    "phone": "011 23966021, 011 23966022, 011 23966023, 011 23966024 ",
    "bloodGroups": [
      "A-",
      "B+"
    ]
  },
  {
    "name": "Sant Pramanand Hospital Blood Bank",
    "lat": 28.677715,
    "lng": 77.224099,
    "address": "18, Sham Nath Marg, Civil lines,",
    "phone": "011-23981260, 011 23994401, 011 23994402",
    "bloodGroups": [
      "A+",
      "B-",
      "AB-",
      "O+",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Swami Dayanand Hospital Blood Bank",
    "lat": 28.678471,
    "lng": 77.304087,
    "address": "Dilshad Garden ",
    "phone": "011 22581031, 011 22583809 ",
    "bloodGroups": [
      "AB+",
      "B+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Mission Jan Jagriti Blood Bank",
    "lat": 28.606008,
    "lng": 77.295437,
    "address": "MGS Hospital, 35/37 Rohtak road, West Punjabi Bagh\r\nAdjacent to Maharaja Aggarsen Hospital, Near Shivali park metro station ",
    "phone": "011 47053443",
    "bloodGroups": [
      "O-",
      "A+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Central Poly Clinic Blood Bank",
    "lat": 28.645742,
    "lng": 77.292552,
    "address": "3, Gangan Vihar, Shahdara Road",
    "phone": "9811157559",
    "bloodGroups": [
      "A-",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Sushruta Trauma Centre Blood Bank",
    "lat": 28.680339,
    "lng": 77.227674,
    "address": "Civil Lines, 9, Metcalf Road",
    "phone": "011 23906014, 011 23906028",
    "bloodGroups": [
      "B-",
      "O+",
      "A-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Sanjay Gandhi Memorial Hospital Blood Bank",
    "lat": 28.692792,
    "lng": 77.081656,
    "address": "S-Block, Mangolpuri",
    "phone": "011 27922843, 011 27916137",
    "bloodGroups": [
      "AB-",
      "B+",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Sunder Lal Jain Charitable Hospital Blood Bank",
    "lat": 28.691886,
    "lng": 77.181583,
    "address": "Ashok Vihar, Phase-III",
    "phone": "011 47030900",
    "bloodGroups": [
      "A-",
      "B+"
    ]
  },
  {
    "name": "Max Super Specialty Hospital Blood Bank",
    "lat": 28.727954,
    "lng": 77.152927,
    "address": "Max Super Specialty Hospital (A Unit of Max Health Care Institute Ltd), FC-50, Block C and D, Shalimar Bagh",
    "phone": "011 66422222",
    "bloodGroups": [
      "A-",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Lions Blood Bank",
    "lat": 28.704148,
    "lng": 77.162213,
    "address": "A.K.-100, Shalimar Bagh",
    "phone": "011 42258080, 011 47122000 ",
    "bloodGroups": [
      "AB+",
      "B+",
      "A-",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Mission Jan Jagriti Blood Bank",
    "lat": 28.501683,
    "lng": 77.246745,
    "address": "1, Altius Sonia Hospital, Basement, 1, Gulshan Park, Rohtak Road, Nangloi Metro Station, Metro Piller Number 444",
    "phone": "011 30580345, 011 30777777",
    "bloodGroups": [
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Saroj Super Speciality Hospital  Blood Bank",
    "lat": 28.70612,
    "lng": 77.129045,
    "address": "Saroj Super Speciality Hospital (Run by Ganesh Das Chowla Charitable Trust-Regd.), Sector-14, Rohini, Madhuban Chowk\r\n",
    "phone": "011 47903333, 011 27903276",
    "bloodGroups": [
      "O+",
      "B-"
    ]
  },
  {
    "name": "Rajiv Gandhi Cancer Institute and Research Center Blood Bank",
    "lat": 28.716471,
    "lng": 77.11093,
    "address": "Rajiv Gandhi Cancer Institute, Sector-V Rohini ",
    "phone": "011 47022222, 011 27051011  ",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Dr. Baba Sahab Ambedkar Hospital Blood Bank",
    "lat": 28.715052,
    "lng": 77.113639,
    "address": "Sector-6, Rohini",
    "phone": "011 27049950, 011 27055585",
    "bloodGroups": [
      "O-",
      "B-",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Delhi Heart and Lung Institute Blood Bank",
    "lat": 28.641636,
    "lng": 77.205219,
    "address": "3 MM-11, Panchkuian Road",
    "phone": "011 42999999, 011 42988899, 011 23538351",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Park Hospital Blood Bank",
    "lat": 28.651772,
    "lng": 77.093105,
    "address": "Keshopur Sabzi Mandi, New Chaukhandi, Vishnu Garden",
    "phone": "011 45323232 ",
    "bloodGroups": [
      "O+",
      "A-",
      "A+",
      "AB-",
      "B+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Fortis Hospital Blood Bank",
    "lat": 28.709162,
    "lng": 77.170214,
    "address": "A-Block, Shalimar Bagh",
    "phone": "011 45302282",
    "bloodGroups": [
      "B+",
      "O-",
      "AB+",
      "A+",
      "A-",
      "B-",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Pitampura Blood Bank",
    "lat": 28.700002,
    "lng": 77.125443,
    "address": "B-294, Saraswati Vihar, Outer Ring Road, Pitampura",
    "phone": "08130999395, 09810681450",
    "bloodGroups": [
      "AB+",
      "A-",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Brahm Shakti Hospital and Research Centre Blood Bank",
    "lat": 28.712343,
    "lng": 77.081205,
    "address": "Brahma Shakti Hospital, U-1/78, Budh Vihar ",
    "phone": "011 27537894, 011 27532428, 011 27531683, 011 27537967",
    "bloodGroups": [
      "B-",
      "A-",
      "AB-",
      "O+",
      "AB+",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Guru Tegh Bahadur Hospital Blood Bank",
    "lat": 28.683856,
    "lng": 77.309903,
    "address": "G. T. B. Hospital, Shahdara",
    "phone": "011 22590148",
    "bloodGroups": [
      "B-",
      "AB-",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Holy Family Hospital Blood Bank",
    "lat": 28.563012,
    "lng": 77.275829,
    "address": "Holy Family Hospital, Okhla Road",
    "phone": "011 26332800",
    "bloodGroups": [
      "O+",
      "A+",
      "AB+",
      "B+",
      "O-",
      "AB-",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Batra Hospital and Medical Research Centre Blood Bank",
    "lat": 28.513468,
    "lng": 77.245773,
    "address": "1, Tuglakabad Institutional Area, Mehrauli Badarpur Road, Tughlakabad",
    "phone": "011 29958747, 011 29957487",
    "bloodGroups": [
      "B+",
      "A+",
      "A-",
      "O-",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "All India Institute of Medical Sciences (AIIMS) Blood Bank",
    "lat": 28.567152,
    "lng": 77.20902,
    "address": "AIIMS, Main Blood Bank, Ansari Nagar, Ring Road",
    "phone": "011 26594438, 011 26594400",
    "bloodGroups": [
      "A-",
      "AB+",
      "AB-",
      "O+",
      "A+",
      "O-",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Safdarjung Hospital Blood Bank",
    "lat": 28.568016,
    "lng": 77.205765,
    "address": "Safdarjung Hospital, Ansari Nagar, Ring Road\r\n",
    "phone": "011 26707254, 011 26707124",
    "bloodGroups": [
      "O-",
      "B-",
      "A+",
      "O+",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Shri Moolchand Khariti-Ram Hospital and Ayurvedic Research Institute ",
    "lat": 28.566225,
    "lng": 77.235575,
    "address": "Mool Chand Hospital, Lajpat Nagar-III",
    "phone": "011 42000476",
    "bloodGroups": [
      "O+",
      "A+",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "National Heart Institute Blood Bank",
    "lat": 28.5574087,
    "lng": 77.2457177,
    "address": "49, Community Center, East of Kailash",
    "phone": "011 26414156, 011 26414157",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Max Super Specialty Hospital Blood Bank",
    "lat": 28.527512,
    "lng": 77.213547,
    "address": "Max Super Specialty Hospital, Heart and Vascular Institute (A Unit of Devki Devi Foundation Institute), 2, Press Enclave Road, Saket",
    "phone": "011 26515050, 011 26505252",
    "bloodGroups": [
      "B-",
      "AB+",
      "A-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Saket City Hospital Blood Bank",
    "lat": 28.527686,
    "lng": 77.214348,
    "address": "Mandir Marg, Press Enclave Road, Saket",
    "phone": "011 40699999, 011 71211062",
    "bloodGroups": [
      "B+",
      "A-",
      "O-",
      "B-",
      "AB+",
      "O+",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Rockland Hospital Qutab Blood Bank",
    "lat": 28.53736,
    "lng": 77.181113,
    "address": "B, 33-34, Qutab Institutional Area",
    "phone": "011 47667357",
    "bloodGroups": [
      "O+",
      "O-",
      "A+",
      "B+",
      "B-",
      "AB+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Primus Ortho and Spine Hospital Blood Bank",
    "lat": 28.5929,
    "lng": 77.181273,
    "address": "Primus Super Speciality Hospital,02, Chandragupta Marg, Lower Ground Floor, Chanakyapuri",
    "phone": "011 66206630, 011 66206640",
    "bloodGroups": [
      "O+",
      "O-",
      "B+",
      "AB+",
      "AB-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "White Cross Blood Bank",
    "lat": 28.560675,
    "lng": 77.253601,
    "address": "A-60, East of Kailash",
    "phone": "011 26831063, 011 26844140",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Rotary Blood Bank",
    "lat": 28.513434,
    "lng": 77.24269,
    "address": "56-57, Institutional Area, Tughlakabad , Next to Batra Hospital\r\n",
    "phone": "011 29054068, 011 29054066, 011 29962078",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Jai Prakash Narayan Apex Trauma Centre Blood Bank",
    "lat": 28.568128,
    "lng": 77.200338,
    "address": "Jai Prakash Narayen Apex Trauma Centre, AIIMS, Raj Nagar,\r\nRing Road",
    "phone": "011 26731166, 011 26731179, 011 26731169, 011 26108000, 011 26109000",
    "bloodGroups": [
      "A-",
      "B-",
      "AB+",
      "A+",
      "B+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Fortis Escort Heart Institute Blood Bank",
    "lat": 28.560455,
    "lng": 77.273777,
    "address": "Fortis Escort Heart Institute, Okhla Road\r\n\r\n",
    "phone": "011 26825053",
    "bloodGroups": [
      "O-",
      "O+",
      "A-",
      "AB+",
      "B+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Hakeem Abdul Hameed Centenary Hospital Blood Bank",
    "lat": 28.513711,
    "lng": 77.251861,
    "address": "Jamia Hamdard, Hamdard Nagar",
    "phone": "011 26059668",
    "bloodGroups": [
      "AB+",
      "O+",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Apollo Hospital Blood Bank",
    "lat": 28.540647,
    "lng": 77.283445,
    "address": "Indraprastha Medical Corporation, Sarita Vihar",
    "phone": "011 26925801, 011 26925858, 011 26825707",
    "bloodGroups": [
      "O-",
      "A+",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Armed Forces Transfusion Centre Blood Bank",
    "lat": 28.596425,
    "lng": 77.117561,
    "address": "Delhi Cantonment, Area Sadar Bazar, Army Public School",
    "phone": "011 23336685",
    "bloodGroups": [
      "AB+",
      "B+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Fortis Flt. Lt. Rajan Dhall Hospital Blood Bank",
    "lat": 28.519397,
    "lng": 77.160438,
    "address": "Fortis Flt. Lt. Rajan Dhall Hospital (A unit of Flt. Lt. Ranjan Dhall Charitable Trust Regd.), Sector-B, Pocket-1, Aruna Asaf Ali Marg, Vasant Kunj",
    "phone": "011 42776222",
    "bloodGroups": [
      "A-",
      "B+"
    ]
  },
  {
    "name": "Institute of Liver and Biliary Sciences Blood Bank",
    "lat": 28.506259,
    "lng": 77.165051,
    "address": "Institute of Liver and Biliary Sciences, D-1, Vasant Kunj",
    "phone": "011 46300000 ",
    "bloodGroups": [
      "AB+",
      "O-",
      "A-",
      "AB-",
      "O+",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Mata Chanan Devi Hospital Blood Bank",
    "lat": 28.618861,
    "lng": 77.078382,
    "address": "Mata Chanan Devi Hospital, C-1 Janakpuri New Delhi ",
    "phone": "011 45582193, 011 45582194",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Bhagat Chandra Hospital Blood Bank",
    "lat": 28.593451,
    "lng": 77.081221,
    "address": "RZF-1/1, Mahavir  Enclave, Palam",
    "phone": "011 45254525",
    "bloodGroups": [
      "O+",
      "B-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Indian Spinal Injuries Centre Blood Bank",
    "lat": 28.532663,
    "lng": 77.141765,
    "address": "Indian Spinal Injuries Centre, C-8, Vasant Kunj",
    "phone": "011 42255387",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Bensups Hospital Blood Bank",
    "lat": 28.592838,
    "lng": 77.044191,
    "address": "Bansups Avenue, Sector 12, Dwarka",
    "phone": "011 45017615",
    "bloodGroups": [
      "B-",
      "O+"
    ]
  },
  {
    "name": "Blood Bank Organisation",
    "lat": 28.642777,
    "lng": 77.18156,
    "address": "11/6-B, Shanti Chamber, Opposite Telephone Exchange, Pusa Road",
    "phone": "011 25721870",
    "bloodGroups": [
      "AB+",
      "O+",
      "A-",
      "B-",
      "B+",
      "A+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "E. S. I. Hospital Blood Bank",
    "lat": 28.657697,
    "lng": 77.13012,
    "address": "E S I Hospital, Basai  Darapur, Ring Road",
    "phone": "011 25970808, 011 25100664",
    "bloodGroups": [
      "AB+",
      "B-",
      "O-",
      "O+",
      "B+",
      "A-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Maharaja Agrasen Hospital Blood Bank",
    "lat": 28.67408,
    "lng": 77.134063,
    "address": "Maharaja Agrasen Hospital, West Punjabi Bagh",
    "phone": "011 40777777 (Exte. 6700)",
    "bloodGroups": [
      "AB+",
      "B-",
      "B+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Sri Balaji Action Medical Institute Blood Bank",
    "lat": 28.673738,
    "lng": 77.110226,
    "address": "Sri Balaji Action Medical Institute, FC-34, A-4, Paschim Vihar",
    "phone": "011 42888888, 011 45666666",
    "bloodGroups": [
      "B+",
      "B-",
      "AB-",
      "O+",
      "AB+",
      "O-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Dr. B. L. Kapoor Memorial Hospital Blood Bank",
    "lat": 28.643642,
    "lng": 77.179979,
    "address": "B. L. K. Memorial Hospital,  Pusa Road",
    "phone": "011 30653095, 011 30653926",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Kalra Hospital and Shri Ram Cardiothoracic and Neurosciences Center (SRCNC) Blood Bank",
    "lat": 28.657823,
    "lng": 77.142691,
    "address": "Kalra Hospital SRNCNC, A-4, Kirti Nagar",
    "phone": "011 45005700",
    "bloodGroups": [
      "B-",
      "AB+"
    ]
  },
  {
    "name": "R.B.T.C (wz), Deen Dayal Upadhyay Hospital",
    "lat": 28.583437,
    "lng": 77.117583,
    "address": "Deen Dayal Upadhyay Hospital, Hari Nagar, Near Clock Tower",
    "phone": "011 25129345, 011 25494403, 011 25494405",
    "bloodGroups": [
      "A+",
      "O-"
    ]
  },
  {
    "name": "Jaipur Golden Hospital Blood Bank",
    "lat": 28.697734,
    "lng": 77.109478,
    "address": "Jaipur Golden Hospital, 2, Industrial Area,  Rohini, Sector-III ",
    "phone": "011 27907248, 011 27907238, 011 27907000",
    "bloodGroups": [
      "AB-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Jan Jagriti Blood Bank",
    "lat": 28.605975,
    "lng": 77.295427,
    "address": "Mission Jan Jagriti, Blood Bank, C/o. Jeevan Anmol Hospital Mayur Vihar Phase I ",
    "phone": "09811210662, 08510888929",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank ",
    "lat": 15.597585,
    "lng": 73.820198,
    "address": "District Hospital, Pedem, Mapusa, Goa ",
    "phone": "0832 2253387",
    "bloodGroups": [
      "A+",
      "AB+",
      "AB-",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Goa Medical College Blood Bank",
    "lat": 15.463768,
    "lng": 73.858813,
    "address": "Goa Medical College, Bambolim, Tiswadi, Goa ",
    "phone": "0832 2458724",
    "bloodGroups": [
      "B-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Hospicio Hospital Blood Bank",
    "lat": 15.27947,
    "lng": 73.960567,
    "address": "Hospicio Hospital, Margao, Salcete, Goa ",
    "phone": "0832 2703801, 0832 2705664",
    "bloodGroups": [
      "AB+",
      "B-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Apollo Victor Hospital Blood Bank",
    "lat": 15.268835,
    "lng": 73.965605,
    "address": "Apollo Victor Hospital, Malbhat, Margao",
    "phone": "0832 2728888",
    "bloodGroups": [
      "B+",
      "AB-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "SMRC&#39;s V. M. Salgaocar Hospital Blood Bank",
    "lat": 15.395075,
    "lng": 73.837127,
    "address": "SMRC&#39;s V.M.Salgaocar Hospital, Chicalim, off Airport Road, Vasco-da-Gama\r\n\r\n",
    "phone": "0832 6691919, 0832 2540218",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "V. S. Hospital Blood Bank",
    "lat": 23.020595,
    "lng": 72.571659,
    "address": "C/o. Sheth, Vadilal Sarabhai (V.S.) Hospital, Ellisbridge, Ahmedabad",
    "phone": "079 26577621  (Extn.341)",
    "bloodGroups": [
      "A-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Smt. Shardaben Hospital Blood Bank",
    "lat": 23.035285,
    "lng": 72.617719,
    "address": "Smt. Laxmiben Chimanlal Lalbhai Blood Bank, C/o. The Superintendent, Smt. Shardaben Chimanlal Municipal General Hospital, Saraspur, Ahmedabad.",
    "phone": "079 22164261, 079 22924264",
    "bloodGroups": [
      "AB-",
      "AB+",
      "O-",
      "A-",
      "O+",
      "A+",
      "B+"
    ]
  },
  {
    "name": "L. G. Hospital Blood Bank",
    "lat": 22.999464,
    "lng": 72.60458,
    "address": "Sheth L.G. General Hospital and Blood Bank, Maninagar, \r\nAhmedabad",
    "phone": "079 25461380 / 81 / 82 / 83 / 84 (Extn. 219) ",
    "bloodGroups": [
      "B+",
      "A-",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Civil Hospital Blood Bank",
    "lat": 23.051227,
    "lng": 72.6055,
    "address": "Blood Bank, Department of IHBT, C/o.The Civil Hospital, Asarwa, Ahmedabad",
    "phone": "079 22683949/50/51/52/53/54/55, 07922683721-31 (Extn.1419)",
    "bloodGroups": [
      "O+",
      "A+",
      "A-",
      "AB+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "General Hospital Blood Bank Sola",
    "lat": 23.082702,
    "lng": 72.525858,
    "address": "Blood Bank, Civil Hospital, Sarkhej Highway, Near Gujarat High Court,  Sola, Ahmedabad",
    "phone": "079 27664349, 079 27432584, 079 27474359 (Exte.210)         ",
    "bloodGroups": [
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 23.012718,
    "lng": 72.55774,
    "address": "Indian Red Cross Society, J. L. Thakore Red Cross Bhavan, \r\n18-Gujarat Brahmkshatriya Society, Behind Suvidha Market,\r\nPaldi, Ahmedabad",
    "phone": "079 26651833, 079 26650855",
    "bloodGroups": [
      "O+",
      "B-",
      "B+",
      "AB+",
      "A+",
      "O-",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "The Gujarat Cancer & Research Institute Blood Bank",
    "lat": 23.039061,
    "lng": 72.610263,
    "address": "The Gujarat Cancer & Research Institute, M.P. Shah Cancer Hospital, Civil Hospital Campus, Asarwa, Ahmedabad",
    "phone": "079 22681451, 079 22688061, 079 22688062, 079 2268 8000 ",
    "bloodGroups": [
      "B+",
      "AB+",
      "A-",
      "O-",
      "O+",
      "B-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Institute of Kidney Disease and Research Centre ",
    "lat": 23.051439,
    "lng": 72.605577,
    "address": "Blood Bank, The Institute of Kidney Disease and Research Centre, Civil Hospital Compound, Asarwa, Ahmedabad",
    "phone": "079 22687164, 079 22687165, 079 22687000, 079 22685609",
    "bloodGroups": [
      "O-",
      "B+",
      "AB+",
      "A+",
      "AB-",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Help Voluntary Blood Bank  ",
    "lat": 23.000103,
    "lng": 72.604863,
    "address": "Help Voluntary Blood Bank (Green Cross Voluntary Blood Bank Pathology and RIA Laboratory) 6 and 7, Kotyark Complex, Opposite to L.G. Hospital, Maninagar, Ahmedabad ",
    "phone": "079 65136744",
    "bloodGroups": [
      "AB-",
      "A-",
      "B+",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "GUJARAT CANCER MEDICAL COLLEGE",
    "lat": 23.038706,
    "lng": 72.610334,
    "address": "Blood Bank, Gujarat Cancer Society Medical College Hospital and Research Centre, \r\nOpp. D.R.M. office, Swadesi Mill compound,\r\nNear Chamunda Bridge, \r\nAhmedabad",
    "phone": "079 6648138,079 66048000",
    "bloodGroups": [
      "B+",
      "AB-",
      "O-",
      "B-",
      "A-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "General Hospital Blood Bank ",
    "lat": 23.028114,
    "lng": 72.623869,
    "address": "Model Hospital Blood Bank, (ESIS), Blood Bank, Bapunagar, Ahmedabad",
    "phone": "079 22745770, 079 22743935",
    "bloodGroups": [
      "A+",
      "A-",
      "B-",
      "AB+",
      "AB-",
      "O-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Dr. Jivraj Mehta  Smarak Health Foundation Blood Bank",
    "lat": 23.008319,
    "lng": 72.543367,
    "address": "Blood Bank, Dr. Jivraj Mehta  Smarak Health Foundation, Bakeri Medical Research Centre, Arogya Dham, Dr. Jivraj Mehta Marg, Ahmedabad.",
    "phone": "079 22687164, 079 22687143",
    "bloodGroups": [
      "AB-",
      "B+",
      "A+",
      "A-",
      "O+",
      "AB+",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Prathama Blood Centre",
    "lat": 23.006225,
    "lng": 72.541921,
    "address": "Prathama Blood Centre, B/H Jivraj Mehta Hospital, Near Lavanya Society, Dr. C.V. Raman Marg, Vasna, Ahmedabad",
    "phone": "079 26600101",
    "bloodGroups": [
      "O+",
      "A+",
      "A-",
      "O-",
      "B-",
      "AB+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "White Cross Blood Bank ",
    "lat": 23.06573,
    "lng": 72.636791,
    "address": "White Cross Blood Bank (Vol.), 2nd Floor, Kandhari Building, \r\nOpposite to S.T. Workshop, Naroda Road Patia, Naroda , Ahmedabad",
    "phone": "079 22815227",
    "bloodGroups": [
      "B+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Adarsh Pathology Laboratory and Blood Bank",
    "lat": 23.033177,
    "lng": 72.628422,
    "address": "Adarsh Pathology Laboratory and Blood Bank, 1st Floor, Samjuba Hospital, Bapunagar, Ahmedabad",
    "phone": "079 22749146, 079 22746672",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Gujarat Blood Bank Paldi",
    "lat": 23.016405,
    "lng": 72.566328,
    "address": "Gujarat Blood Bank (Voluntary), Pathology Laboratory, 101, Span Trade Centre, Opp. Kochrab Ashram, Near Paldi Char Rasta, Paldi, Ahmedabad",
    "phone": "079 27413719",
    "bloodGroups": [
      "AB-",
      "B+",
      "AB+",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Karnavati Blood Bank and Pathology Lab",
    "lat": 23.057858,
    "lng": 72.552974,
    "address": "Karnavati Blood Bank and Pathology Lab, 36, Subhlaxmi Complex, Naranpura, Ahmedabad",
    "phone": " 079 27415150",
    "bloodGroups": [
      "B-",
      "AB+",
      "A-",
      "B+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Cross World Voluntary Blood Bank ",
    "lat": 23.056322,
    "lng": 72.570237,
    "address": "Cross World Voluntary Blood Bank, Chandraprabhu Complex,\r\nSardar Patel Cross Road, Ahmedabad",
    "phone": "079 26568004, 079 26401959",
    "bloodGroups": [
      "A+",
      "O+",
      "B+",
      "O-",
      "AB-",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Maha Gujarat Blood Bank",
    "lat": 22.997578,
    "lng": 72.603054,
    "address": "Maha Gujarat Blood Bank (Voluntary) and Pathology Lab, 21, Parth  Comp., Near Maninagar Fire Station, Maninagar, Ahmedabad",
    "phone": "079 25451331, 079 25461641",
    "bloodGroups": [
      "A-",
      "O-",
      "B+",
      "AB-",
      "O+",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Supratech Voluntary Blood Bank",
    "lat": 23.067721,
    "lng": 72.512046,
    "address": "Supratech Voluntary Blood Bank, Mild Stone Building, 1st Floor, Near Drive-in Cinema, Thaltej, Ahmedabad",
    "phone": "079 40058958, 079 40054400, 079 40057317",
    "bloodGroups": [
      "O+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Sterling Hospital",
    "lat": 23.048798,
    "lng": 72.531309,
    "address": "Blood Bank, Sterling Hospitals, Drive in Road, Near Gurukul, Memnagar Road, Ahmedabad",
    "phone": "7940011620",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Ami Pathology Laboratory and Blood Bank",
    "lat": 23.08705,
    "lng": 72.592226,
    "address": "Ami Pathology Laboratory and Blood Bank, 14-15 Baronet Tower (Complex), Tollnaka, Highway , Ramnagar, Sabarmati, Ahmedabad",
    "phone": "079 27501202",
    "bloodGroups": [
      "A-",
      "B+",
      "O-",
      "A+",
      "B-",
      "AB-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Gujarat Blood Bank Naranpura",
    "lat": 23.055467,
    "lng": 72.560224,
    "address": "Gujarat Blood Bank (Voluntary) and Pathology Laboratory,  \r\n1-2, Subhlaxmi Complex, Naranpura, Ahmedabad",
    "phone": "079 27413719",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 21.606994,
    "lng": 71.22186,
    "address": "Mahatma Muldas Red Cross Bhavan, Civil Hospital Campus",
    "phone": "02792 223034, 02792 232854",
    "bloodGroups": [
      "O+",
      "AB+",
      "B-",
      "A+",
      "O-",
      "A-",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 22.554608,
    "lng": 72.960402,
    "address": "Blood Bank, Indian Red Cross Society, Sardar Bhavan, Opposite to Municipal Building, Sardar Ganj Road, Anand",
    "phone": "02692 243406, 02692 268822",
    "bloodGroups": [
      "AB+",
      "B+",
      "A+",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Indu Voluntary Blood Bank",
    "lat": 22.596385,
    "lng": 72.80717,
    "address": "Indu Voluntary Blood Bank Managed by Charotar Health Research Foundation Trust, Jashganga Complex, Station Road, Anand",
    "phone": "02692 259596",
    "bloodGroups": [
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Ghanshyam Pathlology Laboratory and Blood Bank",
    "lat": 22.556549,
    "lng": 72.963992,
    "address": "Ghanshyam Pathlology Laboratory and Blood Bank, Krishna Road,  B/h . Mayfair Hotel, Anand ",
    "phone": "02692 252744,   02692 252667",
    "bloodGroups": [
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Lions Club Khambat Blood Bank",
    "lat": 21.520533,
    "lng": 70.454461,
    "address": "Blood Bank, The Secretary, Lions Club (Society), Lions Medical Centre, Pith Bazar, Khambhat, Anand District",
    "phone": "02698 220516",
    "bloodGroups": [
      "AB-",
      "O+",
      "B-",
      "B+",
      "A-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "A.D. Gorwala Karamsad Blood Bank  ",
    "lat": 22.539473,
    "lng": 72.890433,
    "address": "A.D.Gorwala Blood Bank, Pramukhswami Medical College and Shree krishna Hospital, Gokulnagar, Karamsad, Anand",
    "phone": "02692 228323, 02692 228324",
    "bloodGroups": [
      "O-",
      "B+",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank Petlad",
    "lat": 22.564674,
    "lng": 72.96086,
    "address": "Blood Bank, Indian Red Cross Society, Opposite to Ranchodji Temple, Petlad, Anand",
    "phone": "02697 222251",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Gandhi Lincon Hospital Blood Bank",
    "lat": 24.256318,
    "lng": 72.184372,
    "address": "Bhansali Trust sanchalit Voluntary Blood Bank, Gandhi Lincon Hospital, Nr.Municipal Complex, Nr. Sardar-Baug, Deesa, \r\nBanaskantha",
    "phone": "02744 220172",
    "bloodGroups": [
      "A-",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "M. U. Pethani Voluntary Blood Bank, Palanpur",
    "lat": 24.170367,
    "lng": 72.435186,
    "address": "Bhagwan Mahavir Seva Samiti Sanchalit Mafatben Uttamlal Pethani Voluntary Blood Bank, Baradpura, Near Delhi Gate,                           Palanpur, Banaskantha",
    "phone": "02742 246914, 02742 245899",
    "bloodGroups": [
      "A+",
      "B-",
      "B+",
      "O+",
      "O-"
    ]
  },
  {
    "name": "General Hospital Blood Bank Palanpur ",
    "lat": 24.175017,
    "lng": 72.434692,
    "address": "Blood Bank, General Hospital, Palanpur, Banaskantha",
    "phone": "02742 253083",
    "bloodGroups": [
      "O-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Gayatri Pathology Laboratory and Voluntary Blood Bank",
    "lat": 24.266228,
    "lng": 72.183973,
    "address": "Gayatri Pathology Laboratory and Voluntary Blood Bank, Kirti Chamber, Kirti Stambh Road, Palanpur, Banaskantha",
    "phone": "02742 253475",
    "bloodGroups": [
      "AB+",
      "B-",
      "O-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Bhoomi Voluntary Blood Bank Palanpur",
    "lat": 24.162436,
    "lng": 72.414225,
    "address": "Bhoomi Voluntary Blood Bank, Paulamo House, Near Bridge, \r\nPalanpur, Banaskantha",
    "phone": "02742 260632, 02742 260633, 02742 256475",
    "bloodGroups": [
      "A+",
      "B-",
      "O-",
      "O+",
      "AB-",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Vikas Voluntary Blood Bank",
    "lat": 24.264792,
    "lng": 72.183378,
    "address": "Vikas Voluntary Blood Bank, Computerized Pathology Laboratory, Kirti Harsh Complex, Nr. Gayatri Mandir, Highway Road, Deesa, Banaskantha",
    "phone": "02744 230342",
    "bloodGroups": [
      "AB+",
      "B+",
      "O-",
      "A+",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Dharti Voluntary Blood Bank",
    "lat": 24.499781,
    "lng": 72.020131,
    "address": "Dharti Voluntary Blood Bank, 1st Floor, Super Market S.T. Road, Dhanera, Banaskantha",
    "phone": "02748 222443",
    "bloodGroups": [
      "O+",
      "B+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Saraswati Voluntary Blood Bank",
    "lat": 24.499588,
    "lng": 72.032557,
    "address": "Saraswati Voluntary Blood Bank. Saraswati Hospital, Opposite to Petrol pump, Dhanera, Banaskantha",
    "phone": "02748 222011",
    "bloodGroups": [
      "A-",
      "B+",
      "O-",
      "O+",
      "AB-",
      "A+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Gayatri Voluntary Blood Bank",
    "lat": 24.263756,
    "lng": 72.162408,
    "address": "Gayatri Voluntary Blood Bank, Kiran Complex,Highway Road, \r\nDeesa, Banaskantha",
    "phone": "02744 230342",
    "bloodGroups": [
      "O+",
      "AB-",
      "A+",
      "A-",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Adarsh Voluntary Blood Bank ",
    "lat": 24.396283,
    "lng": 71.638042,
    "address": "Adrash Blood Bank (Shree Sharswati Trust - Tharad), Adarsh Complex,  2nd Floor, Ambika Nagar Society-1, Highway Road, \r\nTharad, Banaskantha",
    "phone": "9879013952",
    "bloodGroups": [
      "A+",
      "B+",
      "AB-",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 21.725118,
    "lng": 21.725118,
    "address": "Blood Bank, Indian Red Cross Society, Sevashram Hospital Compound, Bharuch",
    "phone": "02642 244281, 02642 243603",
    "bloodGroups": [
      "A-",
      "O-"
    ]
  },
  {
    "name": "Kumarpal Gandhi Blood Bank",
    "lat": 21.628147,
    "lng": 72.995778,
    "address": "&#34;B&#34; Block,1st Floor, Near Palika Shopping Centre, Near Gujarat Gas Circle, Ankleshvar",
    "phone": "02646 244530",
    "bloodGroups": [
      "AB-",
      "O-",
      "B+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Sir T. General Hospital Blood Bank",
    "lat": 21.767673,
    "lng": 72.141981,
    "address": "Blood Bank, Sir T. General Hospital, Dr. H. L. Vaidhya Marg, \r\nKalanala, Bhavnagar",
    "phone": "0278 2520091, 0278 2423250",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Bhavnagar Blood Bank",
    "lat": 21.76982,
    "lng": 72.160378,
    "address": "Bhavnagar Blood Bank, Ofice No. 1,2,3 - Plot No. 1686, B-Wing, 1st Floor, Municipal Commercial Complex, Sardar Nagar Circle, Sardarnagar, Bhavnagar",
    "phone": "0278 2561526",
    "bloodGroups": [
      "A-",
      "AB-",
      "B+",
      "B-",
      "O+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Bambhaniya Voluntary Blood Bank",
    "lat": 21.774103,
    "lng": 72.143714,
    "address": "Bambhaniya Voluntary Blood Bank Trade Centre, Kalanain Circle, Bhavnagar",
    "phone": "0278 2224744, 0278 3004744",
    "bloodGroups": [
      "O+",
      "AB+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Navkar Charitable Trust Mahuva Blood Bank",
    "lat": 21.088961,
    "lng": 71.769089,
    "address": "Blood Bank Navkar Charitable Trust, Opposite to Nagrik Bank, Vasi Talav, Mahuva, Bhavnagar",
    "phone": "02844 224464",
    "bloodGroups": [
      "B+",
      "O+",
      "B-",
      "AB-",
      "A-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Smt. Sonalien A. Shah Blood Bank",
    "lat": 22.178967,
    "lng": 71.651792,
    "address": "Blood Bank, Omkar Paramedical Charitable Trust Organization, Smt. Sonaliben A. Shah Blood Bank, 2nd Floor, Patel Chamber,Paliad Road, Botad, Bhavnagar",
    "phone": "0278 255361, 0278 256099",
    "bloodGroups": [
      "O+",
      "B+",
      "B-",
      "A-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Tulsi Pathology Laboratory and Blood Bank",
    "lat": 21.529208,
    "lng": 71.824705,
    "address": "Tulsi Pathology Laboratory and Blood Bank, Bhairav Para, \r\nPalitana, Bhavnagar",
    "phone": "02848 252707",
    "bloodGroups": [
      "AB-",
      "B-"
    ]
  },
  {
    "name": " Indian Red Cross Society Blood Bank ",
    "lat": 22.838831,
    "lng": 74.254139,
    "address": "Sanchalit Dr. Mohsinbai S. Lenwala Voluntary Blood Bank, Dr.Harilal C.Seth, Red Cross Bhavan, Police Line road, Dahod",
    "phone": "02673 224422/23",
    "bloodGroups": [
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Samarth Raktdan Kendra                                                             ",
    "lat": 22.949278,
    "lng": 73.630239,
    "address": "Samarth Raktdan Kendra, Gausala chowk, Daulatgunj Bazar, Dahod",
    "phone": "02673 223139, 02673 242514",
    "bloodGroups": [
      "A+",
      "B-",
      "AB+",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Kiran Voluntary Blood Bank                                                                       ",
    "lat": 22.839956,
    "lng": 74.254361,
    "address": "Kiran Voluntary Blood Bank, Near Hotel Vrundavan,\r\nStation Road, Dahod",
    "phone": "02673 246212",
    "bloodGroups": [
      "AB-",
      "B+",
      "O-"
    ]
  },
  {
    "name": "General Hospital Blood Bank Ahwa",
    "lat": 20.761612,
    "lng": 73.689241,
    "address": "Blood Bank, General Hospital, Ahwa, Dang",
    "phone": "02631 220205",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Indian Red Cross Society (IRCS), Kalol, Gandhinagar",
    "lat": 22.608583,
    "lng": 73.459578,
    "address": "Blood Bank, Indian Red Cross Society, Sheth C.S. Municipal Hospital, Kalol, Gandhinagar",
    "phone": "02764 227836  ",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "GMERS MEDICL COLLEGE ATTACHED GENERAL HOSPITAL, GANDHINAGAR",
    "lat": 23.218597,
    "lng": 72.641585,
    "address": "Blood Bank, H-1 Block, First Floor, Civil Hospital Campus, Opposite to Pathik Ashram, Sector-12, Gandhinagar ",
    "phone": "079 23221931, 079 23221932 Ext. 138",
    "bloodGroups": [
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Shraddhadeep Pathology Lab and Blood Bank",
    "lat": 23.226929,
    "lng": 72.646557,
    "address": "Shraddhadeep Pathology Lab and Blood Bank, \r\nShiv Complex , Plot no. 329, 1st Floor, Sector-16, Gandhinagar",
    "phone": "079 23222474",
    "bloodGroups": [
      "AB-",
      "O-",
      "B-",
      "A-",
      "B+",
      "AB+",
      "O+",
      "A+"
    ]
  },
  {
    "name": " Apollo Hospital International Limited Blood Bank",
    "lat": 23.109635,
    "lng": 72.625835,
    "address": "Blood Bank, Apollo Hospital International Limited, Block No. 1/A, GIDC estate, BHAT, Gandhinagar",
    "phone": "079 66701825",
    "bloodGroups": [
      "O+",
      "A-",
      "A+",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Indian Medical Association (IMA) Blood Bank",
    "lat": 23.420056,
    "lng": 72.653181,
    "address": "Blood Bank, Indian Medical Association (IMA), Manasa Charitable Trust sanchalit C.M.K. and P.N.N. Voluntary Blood Bank, 1st floor, Vijay Complex,  Mansa-Gandhinagar Highway, Manasa-382845, Gandhinagar",
    "phone": "02763 270085",
    "bloodGroups": [
      "A-",
      "B-",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "G.G.Hospital Blood Bank",
    "lat": 22.48531,
    "lng": 70.058561,
    "address": "Blood Bank, The  M.P.Shah  Medical College and Guru Govindsinh Hospital, Jamnagar",
    "phone": "0288 2661052",
    "bloodGroups": [
      "O+",
      "A-",
      "B+",
      "A+",
      "AB-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Jamnagar Voluntary Blood Bank",
    "lat": 22.461884,
    "lng": 70.072017,
    "address": "Jamnagar Voluntary Blood Bank, 1st Floor, Shakuntla Apart.\r\nHawai Chowk, Jamnagar",
    "phone": "0288 2673339, 0288 2541070",
    "bloodGroups": [
      "A-",
      "B+",
      "AB-",
      "A+",
      "AB+",
      "O+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "General Hospital Blood Bank",
    "lat": 22.208586,
    "lng": 69.651914,
    "address": "Blood Bank, General Hospital, Jamkhambhalia, Jamnagar",
    "phone": "02833 234704",
    "bloodGroups": [
      "A+",
      "B+",
      "AB+",
      "O-",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Tata Chemical Limited Blood Bank Mithapur",
    "lat": 22.205519,
    "lng": 69.102536,
    "address": "Blood Bank, Tata Chemical Limited, Okhamandal, Mithapur, \r\nJamnagar",
    "phone": "9227887029",
    "bloodGroups": [
      "AB+",
      "A-",
      "A+",
      "B+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "General Hospital Blood Bank Junagadh",
    "lat": 21.520666,
    "lng": 70.459367,
    "address": "Blood Bank, General Hospital, Azad Chowk, Mahatma Gandhi Road, Junagadh",
    "phone": "0285 2651436, 0285 2620652",
    "bloodGroups": [
      "A-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Divyajyoti Charitable Voulantary Blood Bank",
    "lat": 20.827644,
    "lng": 70.041767,
    "address": "Divyajyoti Charitable Voulantary Blood Bank, Varsing Pur Road, B/H Jalaramvadi, Una, Junagadh",
    "phone": "02875 252410, 02875 224236",
    "bloodGroups": [
      "B-",
      "AB+",
      "O-",
      "O+",
      "A-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Shri Jivanprakash Foundation Voluntary Blood Bank",
    "lat": 21.520902,
    "lng": 70.453799,
    "address": "Shri Jivanprakash Foundation Voluntary Blood Bank, Vikram Commercial Complex, Sardar Baug Road, Junagadh",
    "phone": "0285 2630672, 0285 2631672",
    "bloodGroups": [
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Navjeevan Blood Bank and Clinical Laboratory,  Veraval",
    "lat": 20.919489,
    "lng": 70.352739,
    "address": "Navjeevan Blood Bank and Clinical Laboratory, Lilashah Shopping Centre, First Floor, Nr. Bus Station, Veraval, \r\nJunagadh",
    "phone": "02876 221415 ",
    "bloodGroups": [
      "A-",
      "A+",
      "O+",
      "AB-",
      "B-",
      "O-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Navdeep Blood Bank  ",
    "lat": 21.520745,
    "lng": 70.454426,
    "address": "Navdeep Blood Bank, Sankalp Complex, First Floor, \r\nS.T. Road,opp Dr. Chikkhalia Hospital, Junagadh",
    "phone": "0285 2631127",
    "bloodGroups": [
      "AB+",
      "B-",
      "A+",
      "B+",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Sardar Patel voulantary Blood Bank, Keshod",
    "lat": 21.297078,
    "lng": 70.246131,
    "address": "Sardar patel voulantary Blood Bank, 1st Floor Sheetal Building, Ramnagar station road, Keshod, Junagadh ",
    "phone": "02871 233353",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "G.K. General Hospital Blood Bank, Bhuj",
    "lat": 23.240587,
    "lng": 23.240587,
    "address": "Blood Bank, G.K. General Hospital, Bhuj, Kutch",
    "phone": "02832 250150",
    "bloodGroups": [
      "O+",
      "B+",
      "AB-",
      "B-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Rajabhai Patel Blood Bank (IMA)",
    "lat": 23.073501,
    "lng": 23.073501,
    "address": "Indian Medical Association Gandhidham Trust (Reg.), \r\nRajabhai Patel Blood Bank, Gandhidham Trust, Near Gurukul Road, Gandhidham, Kutch",
    "phone": "02836 257366,  02836 257323, 02836 257333",
    "bloodGroups": [
      "AB-",
      "O+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Mayur Voluntary Blood Bank   Mandvi",
    "lat": 22.833302,
    "lng": 69.354198,
    "address": "Mayur Voluntary Blood Bank & Pathology Laboratory, \r\nAzad Chowk, Mandvi, Kutch",
    "phone": "02832 231324",
    "bloodGroups": [
      "O-",
      "AB-",
      "O+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Jivan Jyot Blood Bank  ",
    "lat": 23.241748,
    "lng": 69.67181,
    "address": "Jivanjyot Blood Bank, 63, A/B, Vijyanagar, New Hospital Road, Bhuj, Kutch\r\n",
    "phone": "02832 222812",
    "bloodGroups": [
      "B+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Matrushri Meghbai Pramji Jetha Hospital and Research Centre, Bhuj ",
    "lat": 23.242291,
    "lng": 69.666889,
    "address": "Blood Bank, Matrushri Meghbhai Premaji Jetha Hospital and Research Centre, Sardar Patel Vidhya Sankul, Bhuj - Mundra Road, Kutch.",
    "phone": "02832 231133, 02832 231144",
    "bloodGroups": [
      "A+",
      "A-"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank ",
    "lat": 22.021536,
    "lng": 73.0772,
    "address": "Indian Red Cross Society managed, C.R. Parikh Blood Bank, Indian Red Cross Society Building, Railway Station Road, \r\nKapadwanj, Kheda",
    "phone": "02691 263255 ",
    "bloodGroups": [
      "O-",
      "AB+",
      "B+",
      "B-",
      "AB-",
      "O+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank Nadiad",
    "lat": 22.691088,
    "lng": 22.691088,
    "address": "Blood Bank, Indian Red Cross Society, Shri H.V.Desai Blood Bank, Red Cross Building, Santram Road, Nadiad, Kheda",
    "phone": "0268 2566944",
    "bloodGroups": [
      "A+",
      "O-",
      "AB-",
      "B+",
      "A-",
      "AB+",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Muljibhai Patel Urological Hospital Blood Bank",
    "lat": 22.683058,
    "lng": 72.872039,
    "address": "Blood Bank, Muljibhai Patel Urological Hospital, Dr. V.V. Desai Marg, Nadiad, Kheda",
    "phone": "0268 2520323, 0268 2520325",
    "bloodGroups": [
      "B+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Gujarat Methodist Church Cardiac Care and Research Society Blood Bank",
    "lat": 22.701204,
    "lng": 72.844443,
    "address": "Blood Bank, Gujarat Methodist Church Centre Care and Research Society, Mission Road, Nadiad, Kheda",
    "phone": "0268 2555711, 0268 2555723",
    "bloodGroups": [
      "B-",
      "O+"
    ]
  },
  {
    "name": "General Hospital Blood Bank Mehsana",
    "lat": 23.608546,
    "lng": 72.391231,
    "address": "Blood Bank, General Hospital, Near Bus Stand, Rajmahal Road, Mehsana",
    "phone": "02762 297301, 02762 221475 ",
    "bloodGroups": [
      "O+",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Mehsana Jaycees Charitable Trust Blood Bank",
    "lat": 23.607589,
    "lng": 72.384975,
    "address": "Mehsana Jaycees Charitable Trust Sanchalit Sarvodaya Commercial Co.op Voluntary Blood Bank, Pinky Super Bazar, Dairy Road, Mehsana",
    "phone": "02762 251252, 02762 243634 ",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Sardar Seva Trust, Unjha Nagrik Sahkari Voluntary Blood Bank",
    "lat": 23.804024,
    "lng": 72.389713,
    "address": "Sardar Seva Trust Sanchalit Unjha Nagrik Sahkari Bank Ltd., Voluntary Blood Bank, 1st Floor Poonam Complex, Unjha\r\nMehsana",
    "phone": "02767 248755",
    "bloodGroups": [
      "A-",
      "B+"
    ]
  },
  {
    "name": "Visnagar Voluntary Blood Bank",
    "lat": 23.701586,
    "lng": 72.541897,
    "address": "Jivan Jyot Charitable Trust, Sanchalit Visnagar Voluntary Blood Bank, Station Road, Visnagar, Mehsana",
    "phone": "02765 220903",
    "bloodGroups": [
      "B-",
      "O-",
      "B+",
      "AB-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank Navsari",
    "lat": 20.949882,
    "lng": 72.918373,
    "address": "Blood Bank, Indian Red Cross Society, B.K.Shah Red Cross Bhavan, Station Road, Navsari",
    "phone": "02637 257452, 02673 253172",
    "bloodGroups": [
      "AB+",
      "A-",
      "B-",
      "A+",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Lions Medical Trust Blood Bank Chikhali",
    "lat": 20.947927,
    "lng": 73.028072,
    "address": "Blood Bank, Lions Medical Research and Educational Charitable Trust Blood Bank, Opposite to Referral Hospital, \r\nChikhali, Navsari",
    "phone": "02634 234311",
    "bloodGroups": [
      "A-",
      "B-",
      "B+",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Indian red Cross Society Blood Bank Godhara",
    "lat": 22.770106,
    "lng": 22.770106,
    "address": "Blood Bank, Indian red Cross Society, Civil Lines, Godhra, \r\nPanchmahal",
    "phone": "02672 252830",
    "bloodGroups": [
      "B+",
      "A-",
      "B-",
      "AB+",
      "O+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "General Hospital Blood Bank Godhra, ",
    "lat": 22.771958,
    "lng": 73.620689,
    "address": "Blood Bank, General Hospital, Godhra, Panchmahal",
    "phone": "02672 243192",
    "bloodGroups": [
      "AB+",
      "A-",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Raktdan Kendra Voluntary Blood Bank Godhra ",
    "lat": 22.762228,
    "lng": 73.608892,
    "address": "Raktdan Kendra Voluntary Blood Bank, Modi Ni Wadi No. 3, Near Nehru Garden, Godhra, Panchmahal",
    "phone": "02672 650004, 02672 242153",
    "bloodGroups": [
      "O+",
      "AB+",
      "B+",
      "A+",
      "A-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Seventilal Kantilal Blood Bank",
    "lat": 23.848226,
    "lng": 72.112104,
    "address": "The Rotary Club of Patan Charitable Trust Sanchlit Seventilal Kantilal Blood Bank, &#39;Rotary Bhavan&#39;, Khetarvari, Patan",
    "phone": "02766 231477, 02766 233496",
    "bloodGroups": [
      "AB+",
      "O-",
      "B-",
      "A+",
      "AB-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "GMERS Medical College and Hospital Blood Bank Dharpur ",
    "lat": 23.84643,
    "lng": 72.191676,
    "address": "Blood Bank, GMERS Medical College, Dharpur, Patan ",
    "phone": "02766 233311                                     ",
    "bloodGroups": [
      "O+",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Bahansali Trust Raktdan Kendra, Radhanpur ",
    "lat": 23.823539,
    "lng": 71.616139,
    "address": "Bahansali Trust Raktdan Kendra, Bahansali Trust Hospital, \r\nHighway, Radhanpur, Patan",
    "phone": "02746 277343, 02746 277249",
    "bloodGroups": [
      "AB+",
      "B-"
    ]
  },
  {
    "name": "General Hospital Blood Bank Siddhpur",
    "lat": 23.916169,
    "lng": 72.372983,
    "address": "Blood Bank, General Hospital, Siddhapur, Patan",
    "phone": "02767 223086",
    "bloodGroups": [
      "O-",
      "B+",
      "O+",
      "AB-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "General Hospital Blood Bank Porbandar",
    "lat": 21.636578,
    "lng": 69.628472,
    "address": "Blood Bank, General Hospital, Porbandar",
    "phone": "0286 2242910",
    "bloodGroups": [
      "AB+",
      "O-",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Asha Children Hospital and Blood Bank",
    "lat": 21.633396,
    "lng": 21.633396,
    "address": "Asha Children Hospital and Blood Bank, Near Vasi Talav,\r\nPorbandar",
    "phone": "0286 2210522",
    "bloodGroups": [
      "A-",
      "AB-",
      "O-",
      "O+",
      "B+",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Shri Ram Blood Bank Porbandar",
    "lat": 21.640642,
    "lng": 69.604689,
    "address": "Shri Ram Blood Bank, Star Compound, M.G. Road, \r\nPorbandar",
    "phone": "0286 2240092",
    "bloodGroups": [
      "A+",
      "B-",
      "B+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Astha Voluntary Blood Bank Gondal",
    "lat": 21.959147,
    "lng": 70.803122,
    "address": "Astha Voluntary Blood Bank, Jetpur Road, Opposite to\r\nHava Mahel, Near G.F.D.C. Gate, Gondal, Rajkot",
    "phone": "02825 220828",
    "bloodGroups": [
      "B+",
      "B-",
      "O+",
      "A-"
    ]
  },
  {
    "name": "P.D.U. Medical College Blood Bank",
    "lat": 22.304595,
    "lng": 70.799732,
    "address": "Blood Bank, P.D.U. Medical College and General Hospital,\r\nR.Nc.102, Jamnagar Road, Rajkot",
    "phone": "0281 2450385, 0281 2458337, 0281 2458338, 0281 2458339",
    "bloodGroups": [
      "A+",
      "B+"
    ]
  },
  {
    "name": "Rajkot Voluntary Blood Bank and Research Centre",
    "lat": 22.287302,
    "lng": 70.8003,
    "address": "Rajkot Voluntary Blood Bank and Research Centre, \r\nPitroda House, Malaviya Road, Rajkot",
    "phone": "0281 2234242 ",
    "bloodGroups": [
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Red Cross Blood Bank Rajkot",
    "lat": 22.295381,
    "lng": 70.796956,
    "address": "Red Cross Building, 1st Floor, Suchak Road, Near Kundaliya College, Rajkot",
    "phone": "0281 2466260, 08866871717",
    "bloodGroups": [
      "A-",
      "AB-"
    ]
  },
  {
    "name": " Saurastra Voluntary Blood Bank Rajkot",
    "lat": 22.30301,
    "lng": 70.787022,
    "address": "Kathiyawad Medical Education Trust sanchalit Saurastra Voluntary Blood Bank and Research Centre, Shashikunj commercial complex, 621, Mangal Park, Nirmalaconvent Road, Near Madhi Chowk, Rajkot",
    "phone": "0281 2450301",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "General Hospital Blood Bank Morbi",
    "lat": 22.815814,
    "lng": 70.831473,
    "address": "Blood Bank, General Hospital, Morbi, Rajkot",
    "phone": "02822 230538, 02822 230203",
    "bloodGroups": [
      "A+",
      "O-"
    ]
  },
  {
    "name": "Nationality Development Foundation Blood Bank Rajkot",
    "lat": 22.283334,
    "lng": 70.799999,
    "address": "Blood Bank, Nationality Development Foundation,\r\nSmt. S.C.Patel (Field Marshal Blood Banks), Medicare, 3rd Floor, Vidyanagar Main Road, Rajkot",
    "phone": "0281 2480043, 0281 2481717",
    "bloodGroups": [
      "O+",
      "AB+",
      "AB-",
      "B+",
      "A+",
      "B-",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Nathani Voluntary Blood Bank,  Rajkot ",
    "lat": 22.2943,
    "lng": 70.788614,
    "address": "Nathani Voluntary Blood Bank and Blood Tranfusion. \r\n11, Tejash Building,20/22, New Janpath Plot, Rajkot ",
    "phone": "0281 2480659, 0281 6522111",
    "bloodGroups": [
      "B+",
      "O+",
      "B-",
      "A+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Shiv Voluntary Blood Bank Morbi",
    "lat": 22.811453,
    "lng": 70.828261,
    "address": "Shiv Voluntary Blood Bank, 2nd Floor, Pawan Complex, Sanala Road, Near Sagar Hospital, Morbi, Rajkot",
    "phone": "02822 292577                                                    ",
    "bloodGroups": [
      "A-",
      "AB-",
      "B+",
      "AB+",
      "B-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Jetpur Medical Foundation Trust Blood Bank Jetpur",
    "lat": 21.757189,
    "lng": 70.622644,
    "address": "Blood Bank, Jetpur Medical Foundation Trust, 2nd Floor, opp. Union Bank of India, Kanakiya Plot, Jetpur, Rajkot",
    "phone": "02827 226123",
    "bloodGroups": [
      "AB-",
      "O+",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Jagruti Charitable Trust Blood Bank Dhoraji",
    "lat": 21.731878,
    "lng": 70.450128,
    "address": "Jagruti Charitable Trust Blood Bank, Azad Chowk, Three Gate, Dhoraji, Rajkot",
    "phone": "02824 222485",
    "bloodGroups": [
      "B-",
      "O+"
    ]
  },
  {
    "name": "GMERS Medical College Attach Sir Pratap General Hospital Blood Bank",
    "lat": 23.595692,
    "lng": 72.960688,
    "address": "Blood Bank, GMERS Medical College Attach Sir Pratap General Hospital, Himmatnagar, Sabarkantha",
    "phone": "02772 246618, 02772 241551",
    "bloodGroups": [
      "A+",
      "O-",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank Himmatnagar",
    "lat": 23.056733,
    "lng": 72.573372,
    "address": "Blood Bank., Indian Red Cross Society Sabarkantha District Branch, Sheth Shri Jamanadas Madhavji Tanna , Red Cross Bhavan, Nr. G.P.O., State Highway, \r\nHimmatnagar, Sabarkantha",
    "phone": "02772 240789, 02772 245110",
    "bloodGroups": [
      "AB+",
      "B-",
      "AB-",
      "B+",
      "A-",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Patel Voluntary Blood Bank Modasa",
    "lat": 23.467375,
    "lng": 73.297689,
    "address": "Patel Voluntary Blood Bank, Dr. Yogesh Upadhyay&#39;s Hospital, Siddhi Vinayak Comlpex, Shamlaji Road, Modasa, \r\nSabarkantha",
    "phone": "9898651107",
    "bloodGroups": [
      "AB-",
      "A+",
      "AB+",
      "A-",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Trimurti Blood Bank",
    "lat": 23.838678,
    "lng": 23.838678,
    "address": "Trimurti Blood Bank, B/H Trimurti Hospital, B/H Bus stop, Srinagar, Idar - 383430, Sabarkantha",
    "phone": "02778 251763",
    "bloodGroups": [
      "A-",
      "B-"
    ]
  },
  {
    "name": "Late N.H. Ramani Memorial Voluntary Blood Bank and Navchetan Pathology Lab Modasa",
    "lat": 23.459892,
    "lng": 73.297569,
    "address": "Late N.H. Ramani Memorial Voluntary Blood Bank and Navchetan Pathology Lab, 2nd floor, Upasana Complex, Nr. S.T. Stand, Modasa, Sabarkantha.",
    "phone": "02774 247890, 02774 243690",
    "bloodGroups": [
      "A-",
      "AB+",
      "B-",
      "A+",
      "O-",
      "B+",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "New Civil Hospital Blood Bank",
    "lat": 21.180272,
    "lng": 72.821117,
    "address": "Blood Bank, The New Civil Hospital, Outside Majura Gate, \r\nSurat",
    "phone": "0261 2230909, 0261 2244456 (ext 312), 0261 2244457, 0261 2244458, 0261 2244459, 0261 2208312",
    "bloodGroups": [
      "B+",
      "AB-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Surat Raktdan Kendra",
    "lat": 21.172667,
    "lng": 72.829951,
    "address": "Surat Raktdan Kendra, Udhna Khatodara Health Centre, \r\nNear Chosath Joganiyo Mataji Mandir, Udhna, Magdalla Road, Surat.",
    "phone": "0261 2630114, 0261 2635533",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Lok Samarpan Raktadan Kendra, Surat",
    "lat": 21.219718,
    "lng": 72.910619,
    "address": "Lok Samarpan Raktadan Kendra Blood Bank, \r\n15, Miranagar, Opp.Saurastra Bhavan,\r\nMini Bazar, Varachha Road, \r\nSurat",
    "phone": "0261 2553020, 0261 2547575",
    "bloodGroups": [
      "AB+",
      "AB-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Shree Mahavir Health And Medical Relief Society Blood Bank",
    "lat": 21.184104,
    "lng": 72.813897,
    "address": "Blood Bank, Shree Mahavir Health And Medical Relief Society, Shri B.D.Mehta  Mahavir Heart Institute, Shree Mahavir Health Campus,  Athwagate, Ring road, Surat",
    "phone": "0261 2471770, 0261 2462116",
    "bloodGroups": [
      "B-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Shree Sardar Smarak Hospital Blood Bank",
    "lat": 21.130451,
    "lng": 73.108096,
    "address": "Blood Bank, Shree Sardar Smarak Hospital Blood Bank, \r\nStation Road, Sardar Baug, Bardoli, Surat",
    "phone": "02622 220089, 02622 220507 ",
    "bloodGroups": [
      "B+",
      "A+",
      "B-",
      "AB-",
      "O-",
      "A-"
    ]
  },
  {
    "name": "SMIMER Hospital Blood Bank",
    "lat": 21.196246,
    "lng": 72.845477,
    "address": "Blood Bank, Surat Municipal Institute for Medical Education and Research, (SMIMER), Umarwada, Surat",
    "phone": "0261 2368040, 0261 2368041, 0261 2368042, 0261 2368043, 0261 2368044 (Extn.1728,1729)",
    "bloodGroups": [
      "AB+",
      "O-",
      "A-",
      "B-",
      "A+"
    ]
  },
  {
    "name": " Surat Health Care Foundation Blood Bank",
    "lat": 21.195,
    "lng": 72.819444,
    "address": "Blood Bank, Aminaben Gangat and Ayeshaben Patel Blood Bank, Surat Health Care Foundation, C/o. Lokhat Hospital, Nr. Rampura Petrol Pump, Rampura, Surat",
    "phone": "0261 2401362, 0261 2400094",
    "bloodGroups": [
      "O+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "General Hospital Surendranagar Blood Bank",
    "lat": 22.7226,
    "lng": 71.649165,
    "address": "Blood Bank, General Hospital, Surendranagar",
    "phone": "02752 222052 ",
    "bloodGroups": [
      "A+",
      "AB-",
      "A-",
      "O+",
      "B+",
      "B-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "C. U. Shah Medical College and Hospital Blood Bank",
    "lat": 22.741751,
    "lng": 71.622137,
    "address": "Blood Bank, C. U. Shah Medical College and General Hospital, Dudhrej Road, Surerndranagar",
    "phone": "02752 287041, 02752 287000, 02752 287001, 02752 287002",
    "bloodGroups": [
      "O+",
      "O-",
      "A+",
      "B+",
      "B-",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Sharddha Voluntary Blood Bank and Pathology Laboratory Dhangadhra",
    "lat": 22.990836,
    "lng": 71.47162,
    "address": "Shraddha Vol. Blood Bank and Pathology Laboratory, Halani Chamber, 1st floor, Zala Road, Dhangadhra, Surendranagar",
    "phone": "02754 280301",
    "bloodGroups": [
      "B+",
      "A+"
    ]
  },
  {
    "name": "Laxmiben Kushalbhai Patel Blood Bank ",
    "lat": 21.113314,
    "lng": 21.113314,
    "address": "Laxmiben Kushalbhai Patel Blood Bank, 1st Floor, Janak Smarak  Hospital, Kanpura, Vyara, Tapi",
    "phone": "02626 220251",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Maliba Raktdan Kendra (IRCS)",
    "lat": 21.118758,
    "lng": 73.404128,
    "address": "Blood Bank, Indian Red Cross Society, Maliba Raktadan Kendra, Bhikhiba Redcross Bhavan, Vilasini K. Desai aarogya Sankul, Near Vanchetana, Near Kakrapar, Vyara, Tapi",
    "phone": "02626 290181",
    "bloodGroups": [
      "AB+",
      "B-",
      "AB-",
      "O+",
      "A-"
    ]
  },
  {
    "name": "S. S. G. Hospital Vadodara",
    "lat": 22.307133,
    "lng": 73.189731,
    "address": "Blood Bank, The Government Medical College and S.S.G. Hospital, Vadodara",
    "phone": "0265 2424848 ",
    "bloodGroups": [
      "A+",
      "B+",
      "AB-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Jamnabai Blood Bank",
    "lat": 22.300308,
    "lng": 22.300308,
    "address": "Blood Bank, Jamnabai General Hospital, Vadodara",
    "phone": "0265 2517400",
    "bloodGroups": [
      "B+",
      "A-",
      "O-",
      "O+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Medical Care Centre Trust, Shri Jalaram Blood Bank, Vadodara  ",
    "lat": 22.314965,
    "lng": 73.195356,
    "address": "Medical Care Centre Trust, Shri Jalaram Blood Bank, Kashiben Gordhandas Patel Children Hospital,Surajben Gordhanbhai Patel Women&#39;s Hospital, Jalaram Marg, \r\nKarelibaug, Vadodara",
    "phone": "0265 2464130",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Suraktam Blood Bank Vadodara",
    "lat": 22.307765,
    "lng": 73.18633,
    "address": "Suraktam Blood Bank, G-7, Blue Chip Building, Near Stock Exchange, Sayajiganj, Vadodara",
    "phone": "0265 2363660, 0265 2225903",
    "bloodGroups": [
      "O+",
      "A+",
      "O-",
      "A-",
      "B-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Kailash Cancer Hospital & Research Centre Blood Bank.",
    "lat": 22.334629,
    "lng": 73.464162,
    "address": "At: Muni seva ashram, po: Goraj, Tal : Waghodiya, Dist : vadodara, State : Gujarat.",
    "phone": "0265 3961300, 0265 3961357",
    "bloodGroups": [
      "AB-",
      "B-",
      "A-",
      "B+",
      "A+",
      "O-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "GMERS Medical College and General Hospital Blood Bank",
    "lat": 22.313751,
    "lng": 73.148086,
    "address": "Blood Bank, GMERS General Hospital and Medical College, \r\nGotri",
    "phone": "0265 2398008, 0265 6541395",
    "bloodGroups": [
      "AB+",
      "A+",
      "B-",
      "AB-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Indu Blood Bank Vadodara",
    "lat": 22.304204,
    "lng": 73.1935,
    "address": "Indu Blood Bank, III Floor, Vinraj Plaza, Opposite to Government Press, Khoti, Vadodara",
    "phone": "0265 2437676, 0265 2411477",
    "bloodGroups": [
      "A-",
      "AB-",
      "O-",
      "AB+",
      "B-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Dhiraj General Blood Bank Vadodara",
    "lat": 22.30732,
    "lng": 73.181079,
    "address": "Dhiraj General Blood Bank, Mu. Post:-Waghodiya, Pipariya, Vadodara",
    "phone": "02668 225264, 02668 245265, 02668 245266",
    "bloodGroups": [
      "B-",
      "B+",
      "A-",
      "A+",
      "O+",
      "AB-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Bhailal Amin General Hospital Blood Bank",
    "lat": 22.325426,
    "lng": 73.163239,
    "address": "Blood Bank, Bhailal Amin General Hospital Blood Bank, \r\nAlembic Road, Vadodara",
    "phone": "0265 2307038, 0265 2307039, 0265 2286666",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "SBPP Cooperative Bank Foundation Blood Bank",
    "lat": 20.516862,
    "lng": 72.951211,
    "address": "Blood Bank, SBPP Cooperative Bank Foundation Blood Bank of Manav Arogya Seva Kendra,  Jesal Cooperative and Housing Society, Near Pardi Hospital, National Highway-No.-8, Killa Pardi, Valsad",
    "phone": "0260 2374422",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "General Hospital and GMERS Medical College Blood Bank",
    "lat": 20.59404,
    "lng": 72.922063,
    "address": "Blood Bank, GMERS Medical College and General Hospital, \r\nHalar Road, Valsad",
    "phone": "02632 251744, 02632 251911",
    "bloodGroups": [
      "A+",
      "B+",
      "AB-",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Valsad Raktdan Kendra",
    "lat": 20.609737,
    "lng": 72.929097,
    "address": "Shirin and Jamshed Gulzar Regional Blood Centre,\r\nValsad Raktdan Kendra (A Voluntary Blood Bank and Research Centre), RNC Free Eye Hospital Compound,\r\nOpp. Mamlatdar Office, Valsad",
    "phone": "02632 242944, 02632 253650                 ",
    "bloodGroups": [
      "O+",
      "B-",
      "A+",
      "A-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Nukem Blood Bank, Vapi",
    "lat": 20.381255,
    "lng": 72.920819,
    "address": "Nukem Blood Bank and Haria Rotary Hospital, \r\nPlot No. 363 A- 364, G.I.D.C., Vapi, Valsad",
    "phone": "0260 2430654, 0260 2400053, 0260 6638888",
    "bloodGroups": [
      "AB+",
      "B-",
      "O-",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Smt. Puriben Popat Lakha Blood Bank",
    "lat": 20.373994,
    "lng": 72.904781,
    "address": "Blood Bank, Smt. Puriben  Popat  Lakha Lions Blood Bank sanchalak Lions Club of Vapi Udyognagar Charitable Trust,\r\nPlot No : 366/A, Prashant Park, Near Jain Tample, G.I.D.C, \r\nVapi, Valsad",
    "phone": "0260 2434600, 0260 2434601",
    "bloodGroups": [
      "AB-",
      "A+",
      "O+",
      "B-",
      "O-",
      "AB+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Military Hospital Blood Bank Ambala",
    "lat": 30.353047,
    "lng": 76.833532,
    "address": "Blood Bank, Military Hosptial, Ambala Cantt.",
    "phone": "0171 2626557 ",
    "bloodGroups": [
      "O-",
      "AB-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "MM Institute of Medical Sciences and Research Blood Bank",
    "lat": 30.252282,
    "lng": 77.049488,
    "address": "Mulana",
    "phone": "01731 304581",
    "bloodGroups": [
      "A+",
      "A-",
      "B-",
      "B+",
      "AB+",
      "O-",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Sanjeevani Blood Bank",
    "lat": 30.339065,
    "lng": 76.836686,
    "address": "111, Near Railway Road, Sadar Bazar, Ambala Cantt.",
    "phone": "0171 4002002",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "General Hospital Blood Bank Ambala City ",
    "lat": 30.378711,
    "lng": 76.779636,
    "address": "Civil Hospital, Ground Floor, Near Polytechnic Chowk ",
    "phone": "01712554455, 0171 2552908,",
    "bloodGroups": [
      "B+",
      "A+",
      "AB-",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Philadelphia Mission Hospital Blood Bank",
    "lat": 30.383042,
    "lng": 76.785947,
    "address": "Post box 40, Near RA Chowk, Ambala",
    "phone": "0171 2553295",
    "bloodGroups": [
      "O-",
      "A+",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "General Hospital Bhiwani Blood Bank ",
    "lat": 28.797229,
    "lng": 76.13081,
    "address": "Bhiwani, Park Colony, Vijay Nagar, Bhiwani,",
    "phone": "01664 253014",
    "bloodGroups": [
      "B+",
      "A+",
      "B-",
      "O-",
      "A-",
      "AB-",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Gold Field Hospital and Research Centre",
    "lat": 28.277083,
    "lng": 77.454948,
    "address": "Village and post office Chhainsa, Ballabgarh, Faridabad.",
    "phone": "0129 2209395, 0129 2209390 ",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Badshah Khan General Hospital Blood Bank",
    "lat": 28.392623,
    "lng": 77.299274,
    "address": "New Industrial Township, Faridabad",
    "phone": "0129 2411881",
    "bloodGroups": [
      "B-",
      "AB+",
      "O-",
      "A+",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Escorts Hospital and Research Center Limited Blood Bank",
    "lat": 28.391378,
    "lng": 77.306856,
    "address": "Neelam Bata Road, NIT Faridabad.",
    "phone": "0129 2466022, 0129 2466020",
    "bloodGroups": [
      "B-",
      "A+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "M/s Sunflag Hospital and Research Centre Blood Bank",
    "lat": 28.40274,
    "lng": 77.31823,
    "address": "M/s Sunflag Hospital and Research Centre, Sector-16A,  Faridabad",
    "phone": "0129 4199156, 0129 4199159",
    "bloodGroups": [
      "O-",
      "A+",
      "A-",
      "O+",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Sarvodaya Hospital and Research Centre",
    "lat": 28.422451,
    "lng": 77.316923,
    "address": "YMCA Road, Sector-8, Near ESI Hospital, Faridabad",
    "phone": "0129-4184444",
    "bloodGroups": [
      "B+",
      "AB+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "QRG Central Hospital and Research Centre Blood Bank",
    "lat": 28.393014,
    "lng": 77.310047,
    "address": "69, Delhi Mathura Road, Near Neelam Flyover, Ajronda Chowk, Sector 20 A,",
    "phone": "0129 4090300 (Extn. 1956, 1958, 1962)",
    "bloodGroups": [
      "A-",
      "A+",
      "B+",
      "AB-",
      "B-",
      "O+",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Sant Bhagat Singh Maharaj Ji Charitable Hospital Blood Bank",
    "lat": 28.383115,
    "lng": 77.302218,
    "address": "No - 1697, K Block, NIT, Faridabad,\r\n",
    "phone": "0129 402 9070",
    "bloodGroups": [
      "O+",
      "B+",
      "O-",
      "AB+",
      "AB-",
      "A+",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Asian Institute of Medical Sciences Blood Bank",
    "lat": 28.425756,
    "lng": 77.299823,
    "address": "Badkhal Flyover Road, Sector 21-A, Faridabad",
    "phone": "0129 4253196, 01294253197",
    "bloodGroups": [
      "A-",
      "AB-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Metro Heart Institute with Multispecialty",
    "lat": 28.406835,
    "lng": 77.318049,
    "address": "(A Unit of Metro Speciality Hospitals Private Limited) Sector 16A, Near Sunflag Hospital, Faridabad",
    "phone": "0129 4277777",
    "bloodGroups": [
      "O-",
      "AB+",
      "AB-",
      "A+",
      "B-",
      "B+",
      "O+",
      "A-"
    ]
  },
  {
    "name": "General Hospital Blood Bank Fatehabad",
    "lat": 29.517629,
    "lng": 75.448988,
    "address": "District Blood Tranfusion Center, General Hospital \r\nFatehabad",
    "phone": "01667-222443",
    "bloodGroups": [
      "B-",
      "AB-",
      "O-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Jagdambe Blood Bank",
    "lat": 29.715587,
    "lng": 75.900961,
    "address": "Aggarwal Hospital, Kali Mandir Road, Bhatia Nagar, Tohana, Near Ram Bhawan",
    "phone": "01692 230692",
    "bloodGroups": [
      "AB-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Paras Health Care Private Limited Blood Bank",
    "lat": 28.451204,
    "lng": 77.087719,
    "address": "C-1, Sushant Lok City, Phase I, Sector 43, Gurgaon",
    "phone": "0124 4585555",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Artemis Medicare Services Limited Blood Bank",
    "lat": 28.43132,
    "lng": 77.072134,
    "address": "Artemis Hospital, Sector-51, Gurugram",
    "phone": "0124-6767999,  0124 676 7000",
    "bloodGroups": [
      "A-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Medanta The Medicity Hospital Blood Bank",
    "lat": 28.439105,
    "lng": 77.040909,
    "address": "CH Baktawar Singh Road, Sector 38, Gurugram,",
    "phone": "0124 4141414  Extn 2701",
    "bloodGroups": [
      "B-",
      "AB+",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Alchemist Institute of Medical Sciences Blood Bank",
    "lat": 28.439328,
    "lng": 77.10227,
    "address": "Alchemist Institute of Medical Sciences (A Unit of Alchemist Hospitals Limited) DLF Golf Course Road, Sector-53, Saraswati Kunj",
    "phone": "0124 4511111",
    "bloodGroups": [
      "O+",
      "A+",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "SGT Medical College Hospital and Research Institute Blood Bank ",
    "lat": 28.478407,
    "lng": 76.902714,
    "address": "Near Sultanpur Bird Sanctuary, Village Budhera, Gurugram, ",
    "phone": "0124-2278186,  0124 227 8256",
    "bloodGroups": [
      "A-",
      "O+",
      "AB+",
      "B-",
      "A+",
      "B+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Park Hospital Blood Bank",
    "lat": 28.420003,
    "lng": 77.048378,
    "address": "Q Block, South City 2, Sohna Road, Main Sec-47, ",
    "phone": "01244900037, 0124490038",
    "bloodGroups": [
      "AB-",
      "O-",
      "B-",
      "AB+",
      "O+",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Fortis Memorial Research Institute Blood Bank",
    "lat": 28.456975,
    "lng": 77.07299,
    "address": "A unit of Fortis Hospitals Limited, Sector - 44, Opposite HUDA City Centre, Gurugram",
    "phone": "0124 4962244, 0124 716 2200",
    "bloodGroups": [
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Fortis Memorial Research Institute Blood Bank",
    "lat": 28.456965,
    "lng": 77.07297,
    "address": "Fortis Memorial Research Institute, Sector-44, Opposite HUDA City Centre, Gurgaon",
    "phone": "0124 4962251, 01247162200",
    "bloodGroups": [
      "B+",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "General Hospital Blood Bank, Gurugram",
    "lat": 28.511841,
    "lng": 76.986694,
    "address": "Near Bus Stand, Opposite MCG, Gurugram",
    "phone": "0124 2310102",
    "bloodGroups": [
      "O+",
      "AB-",
      "AB+",
      "B+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Nalwa Pathology and Microbiology Laboratory Blood Bank",
    "lat": 29.157025,
    "lng": 75.722428,
    "address": "SCF-83, Commercial UE-1, Red Square market",
    "phone": "01662-236218, 01662 230699",
    "bloodGroups": [
      "B-",
      "A+",
      "AB-",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Central Medical Centre (CMC) Hospital Blood Bank",
    "lat": 29.140858,
    "lng": 75.734103,
    "address": "Near Dabra Chowk Over Bridge, Hisar",
    "phone": "01662 237476, 01662 232360",
    "bloodGroups": [
      "AB-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Haryana Blood Bank",
    "lat": 29.130234,
    "lng": 75.74437,
    "address": "16, Model Town, NearJjindal Hospital ",
    "phone": "0166 2221740",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Manglam Blood Bank",
    "lat": 29.131899,
    "lng": 75.744839,
    "address": "No 139, NH10-Tosham Road Connection Road, New Model Town, Jindal Hospital Road, ",
    "phone": "01662 248767, 01662223367",
    "bloodGroups": [
      "AB+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Dr. Anant Ram Janta Hospital Blood Bank",
    "lat": 29.363162,
    "lng": 75.901772,
    "address": "Hospital Road, Hisar, Barwala",
    "phone": "0169 324 2096",
    "bloodGroups": [
      "AB-",
      "B-",
      "O+",
      "A-",
      "AB+",
      "B+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "National Blood Bank, Kharab Hospital Blood Bank",
    "lat": 29.310977,
    "lng": 76.344908,
    "address": "47, Near Budhla Sant Mandir, Rishi nagar, ",
    "phone": "01662 225900",
    "bloodGroups": [
      "AB-",
      "B-",
      "A-",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Sarvodaya Blood Bank services",
    "lat": 29.1409,
    "lng": 75.733801,
    "address": "Sravodaya Multi Speciality Hospital \r\nOpp. Red Cross Bhawan, Delhi Road, Hisar",
    "phone": "0166 223 1031",
    "bloodGroups": [
      "AB-",
      "O+",
      "B-",
      "AB+",
      "A+",
      "A-",
      "O-",
      "B+"
    ]
  },
  {
    "name": "General Hospital Blood Bank Hisar",
    "lat": 29.17,
    "lng": 75.718602,
    "address": "Civil Hospital Blood Bank, Near Bus Stand ",
    "phone": "01662 275566",
    "bloodGroups": [
      "A+",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Maharaja Agrasen Medical College, Agroha, Blood Bank",
    "lat": 29.336707,
    "lng": 75.622627,
    "address": "Opp. Agroha Dham",
    "phone": "01669-281193/94 (Ext. 225)",
    "bloodGroups": [
      "O-",
      "B+"
    ]
  },
  {
    "name": "General Hospital Blood Bank Jhajjar",
    "lat": 28.607735,
    "lng": 76.642891,
    "address": "Model Town",
    "phone": "01251 252410",
    "bloodGroups": [
      "AB+",
      "B+",
      "AB-",
      "O+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "General Hospital Blood Bank Jind",
    "lat": 29.311866,
    "lng": 76.330022,
    "address": "Civil Hospital, DC Colony",
    "phone": "01681 245454",
    "bloodGroups": [
      "A-",
      "O-"
    ]
  },
  {
    "name": "Gangaputra Hospital and Research Centre Blood Bank",
    "lat": 29.378281,
    "lng": 76.337165,
    "address": "Kaithal Road, Kandela",
    "phone": "01681 237238",
    "bloodGroups": [
      "O-",
      "B+",
      "B-",
      "AB-",
      "O+",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Smt. Indira Gandhi Government Multispeciality Blood Bank",
    "lat": 29.793446,
    "lng": 76.421959,
    "address": "G. H. Sector-18, Bypass Road, Near bus stand, Kaithal By pass",
    "phone": "09416121227, 09991717988, 09466484634",
    "bloodGroups": [
      "A+",
      "AB+",
      "O+",
      "A-",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Haryana Institute of Medical Sciences (HIMS) Hospital Blood Bank",
    "lat": 29.844728,
    "lng": 76.441361,
    "address": "NH-152, Village-Ujhana, Ambala Road, Kaithal",
    "phone": "",
    "bloodGroups": [
      "A-",
      "O+",
      "A+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "General Hospital Blood Bank Karnal",
    "lat": 29.696067,
    "lng": 76.994185,
    "address": "Old Court Road, Karnal",
    "phone": "0184 2268899",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Nirmal Institute of Medical Sciences and Technology Blood Bank",
    "lat": 28.4734936,
    "lng": 77.2906064,
    "address": "69, Jarnally Colony, Opposite Kalpana Chawla Medical College, Karnal.",
    "phone": "0184 2201999, 0184 2202999",
    "bloodGroups": [
      "AB-",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Save Life Blood Bank",
    "lat": 28.701048,
    "lng": 77.103863,
    "address": "16, Jarnally Colony, 1st floor, Opposite to General Hospital, Karnal",
    "phone": "0184 2207557, 0184 2207558",
    "bloodGroups": [
      "A-",
      "O-",
      "B-"
    ]
  },
  {
    "name": "LNJP District Government Hospital Blood Bank ",
    "lat": 29.964985,
    "lng": 76.820558,
    "address": " Thanesar, Kurukshetra, SH-6, Kaithal Kurukshetra Road, ",
    "phone": "0174 429 2716, 01744 293580, 01744 290344",
    "bloodGroups": [
      "O-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Kurukshetra Blood Bank",
    "lat": 29.970016,
    "lng": 76.838528,
    "address": "SCO.07-08 BASMENT,  Near LIC Building",
    "phone": "01744 291914, 01744232010",
    "bloodGroups": [
      "AB+",
      "O+",
      "A-",
      "B+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Shaheed Hasan Khan Mewati Government Medical College Blood Bank  ",
    "lat": 28.091167,
    "lng": 76.971562,
    "address": "Nalhar, Tehsil Nuh, Mewat",
    "phone": "01267 282007",
    "bloodGroups": [
      "AB+",
      "O+"
    ]
  },
  {
    "name": "General Hospital Blood Bank Palwal",
    "lat": 28.136087,
    "lng": 77.327024,
    "address": "New Sohna Road",
    "phone": "01275 240099",
    "bloodGroups": [
      "O+",
      "AB+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Command Hospital Blood Bank",
    "lat": 30.712615,
    "lng": 76.854089,
    "address": "Chandimandir Cantonment, Panchkula",
    "phone": "080908 00659",
    "bloodGroups": [
      "A+",
      "A-",
      "O+",
      "B+",
      "O-",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Alchemist Hospital Panchkula Blood Bank",
    "lat": 28.439332,
    "lng": 77.10227,
    "address": "Sector 21, Panchkula",
    "phone": "0172-7122960, 0172-7122967, 0172 7122966, 0172 7122967",
    "bloodGroups": [
      "AB+",
      "A+"
    ]
  },
  {
    "name": "District Hospital Panchkula Blood Bank",
    "lat": 30.710793,
    "lng": 76.845878,
    "address": "Civil Hospital Blood Bank, Sector 6",
    "phone": "0172 256 7228",
    "bloodGroups": [
      "O+",
      "B-",
      "O-",
      "A-",
      "A+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "N.C. Medical College and Hospital Blood Bank",
    "lat": 29.286568,
    "lng": 76.878961,
    "address": "N.C. Medical College and Hospital, Panipat-Rohtak Road, Israna, Panipat",
    "phone": "",
    "bloodGroups": [
      "A+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Red Cross Blood Bank",
    "lat": 29.39369,
    "lng": 76.969115,
    "address": "Indian Red Cross Society, Red Cross Bhawan, G.T. Road",
    "phone": "0180 4002049",
    "bloodGroups": [
      "B-",
      "AB-",
      "A-",
      "O+",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Prem Blood Bank",
    "lat": 29.398644,
    "lng": 76.966314,
    "address": "A unit of Lala Harbhagwan Dass Memorial & Dr. Prem Hospital Pvt. Ltd., Bishan Sarop Colony, Opp Bus Stand, ",
    "phone": "0180 2697191, 0180 2635900, 01804008431",
    "bloodGroups": [
      "AB-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Panipat Blood Bank",
    "lat": 29.391662,
    "lng": 76.957172,
    "address": "332-R Model Town, Near Ramlal Chowk",
    "phone": "0180 4011150, 01802697887",
    "bloodGroups": [
      "O+",
      "AB+",
      "A-",
      "A+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Rewari Blood Bank",
    "lat": 28.187832,
    "lng": 76.616935,
    "address": "Shree Krishna Medical And Social Welfare Society, 53-RL, Model Town",
    "phone": "01274 222607, 01274 222955",
    "bloodGroups": [
      "AB-",
      "A-"
    ]
  },
  {
    "name": "General Hospital Rewari Blood Bank",
    "lat": 28.202218,
    "lng": 76.619789,
    "address": "Room No. 16, Government / Civil Hospital Blood Bank,  \r\nKayasthwara Mohalla, ",
    "phone": "01274 253101,  01274 254 743",
    "bloodGroups": [
      "A+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Pandit Bhagwat Dayal Sharma Post Graduate Institute of Medical Sciences (PGIMS) Blood Bank",
    "lat": 28.879942,
    "lng": 76.608052,
    "address": "Medical Road, Maharishi Dayanand University,\r\nRohtak",
    "phone": "01262 211306, 01262 212306,  01262 281 304",
    "bloodGroups": [
      "O+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "General Hospital Blood Bank Sirsa",
    "lat": 29.538977,
    "lng": 75.014269,
    "address": "Room No 25, G.H Sirsa, Near Jhunthra Dharmsala Sirsa",
    "phone": "01666241155, 01666 240122",
    "bloodGroups": [
      "O+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Shiv Shakti Blood Bank",
    "lat": 29.536432,
    "lng": 75.022062,
    "address": "Guru Gobind Singh Marg, B Block,Opposite to Valmiki Chowk",
    "phone": "01666 234735, 01666 234117 ",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Bapu Maghar Singh Ji International Blood Bank",
    "lat": 29.467914,
    "lng": 75.068864,
    "address": "Shah Satnam Singh Ji Speciality Hospital, \r\nNohar Bhadra Road,Shahpur Begu, Near Shah Satnam Ji Dham, Dera Sacha Sauda",
    "phone": "0166 6238687, 01666238659",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "General Hospital Blood Bank Sonipat",
    "lat": 28.990486,
    "lng": 77.036475,
    "address": "Delhi Road, Near Maharana Pratap Chowk",
    "phone": "0130 2231931",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Sonipat Blood Bank",
    "lat": 28.991527,
    "lng": 77.034557,
    "address": "Near Saxsena Hospital, Sector-14\r\nTO Scheme No. -15",
    "phone": "0130 2218999",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Bhagat Phool Singh Government Medical College for Women Blood Bank",
    "lat": 29.149774,
    "lng": 76.808336,
    "address": "Kanpur Kalan, Sonipat",
    "phone": "01263 283041, 01263 283063",
    "bloodGroups": [
      "AB-",
      "B-",
      "A-",
      "O+",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Shree MAA Blood Bank",
    "lat": 30.147696,
    "lng": 77.304339,
    "address": "1st Floor, Goel Hospital, Jagadhri, Yamunanagar.\r\nOpp Sapphire hotel, railway road, Near Krishna Bajaj auto agency",
    "phone": "01732 646206",
    "bloodGroups": [
      "AB-",
      "A-",
      "O+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "MLGH Trauma Centre Yamuna Nagar Blood Bank ",
    "lat": 30.1442,
    "lng": 77.303543,
    "address": "Civil Hospital Blood Bank, Jagadhari, Above Trauma Center, \r\nYamunanagar",
    "phone": "0173 220 0106",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Bilaspur Regional Hospital Blood bank",
    "lat": 31.335735,
    "lng": 76.765248,
    "address": "Changer Sector Bilaspur, Near D.C.Office Bilaspur",
    "phone": "1978221080",
    "bloodGroups": [
      "A-",
      "O+",
      "AB+",
      "AB-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Chamba Regional Hospital Blood Bank ",
    "lat": 32.558834,
    "lng": 76.12246,
    "address": "Regional Hospital, Chamba",
    "phone": "01899 222210",
    "bloodGroups": [
      "A-",
      "AB+",
      "O+",
      "O-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Bhota Charitable Hospital Blood Bank",
    "lat": 31.609374,
    "lng": 76.569182,
    "address": "Hamirpur",
    "phone": "01972 255096",
    "bloodGroups": [
      "A+",
      "AB+",
      "B-",
      "O-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Hamirpur Regional Hospital Blood bank",
    "lat": 31.679905,
    "lng": 76.527416,
    "address": " Agriculture Colony, Hamirpur,",
    "phone": "01972 222223",
    "bloodGroups": [
      "AB+",
      "O+",
      "AB-",
      "O-",
      "A-",
      "A+"
    ]
  },
  {
    "name": " Dharamshala Zonal Hospital Blood Bank",
    "lat": 32.2129086,
    "lng": 76.3194044,
    "address": "Zonal Hospital, Dharamshala",
    "phone": "01892 227595",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Dr Rajendra Prasad Government Medical College (RPGMC) Blood Bank Tanda",
    "lat": 32.0982738,
    "lng": 76.3007658,
    "address": "Dr. Rajendra Prasad Government Medical College, Kangra at Tanda",
    "phone": "1892267114",
    "bloodGroups": [
      "O+",
      "A-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Civil Hospital Blood Bank Palampur",
    "lat": 32.107726,
    "lng": 76.534876,
    "address": "Civil Hospital, Palampur, Kangra",
    "phone": "01894 234101",
    "bloodGroups": [
      "B+",
      "A+",
      "B-",
      "O-",
      "A-",
      "O+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Reckong Peo Regional Hospital Blood Bank ",
    "lat": 31.539316,
    "lng": 78.267034,
    "address": "Reckong Peo, Kinnaur, Himachal Pradesh\r\n",
    "phone": "01786 222922",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A+",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Kullu Regional Hospital Blood Bank ",
    "lat": 31.956462,
    "lng": 77.111661,
    "address": "R.No. 320, Kullu Regional Hospital ",
    "phone": "01902 224778",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A+",
      "B-",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Netaji Subhash Chander Bose Zonal Hospital Blood Bank",
    "lat": 31.711561,
    "lng": 76.927209,
    "address": "Netaji Subhash Chander Bose Zonal Hospital, Mandi",
    "phone": "01905 222213",
    "bloodGroups": [
      "AB+",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Rohru Civil Hospital Blood Bank ",
    "lat": 31.201285,
    "lng": 77.752272,
    "address": "Rohru, Shimla",
    "phone": "01781 240011",
    "bloodGroups": [
      "O-",
      "AB+",
      "AB-",
      "A+",
      "B+",
      "B-",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Indira Gandhi Medical College Blood Bank Shimla",
    "lat": 31.1071605,
    "lng": 77.1831203,
    "address": "Department of BT and IH, Indira Gandhi Medical College, \r\nNear Lakkar Bazar",
    "phone": "0177 2883440",
    "bloodGroups": [
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Deen Dayal Updhayay Hospital Blood Bank",
    "lat": 31.103536,
    "lng": 77.17218,
    "address": "DDU Complex, Shimla",
    "phone": "0177 2658940",
    "bloodGroups": [
      "O-",
      "O+",
      "B-",
      "A+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Kamla Nehru Hospital Blood Bank",
    "lat": 31.096648,
    "lng": 77.175267,
    "address": "Kamla Nehru Hospital, NH-22, Near Mall Road",
    "phone": "0177 2624081",
    "bloodGroups": [
      "B+",
      "O+",
      "A-",
      "B-",
      "O-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Mahatma Gandhi Medical Services Blood Bank Rampur",
    "lat": 31.4470213,
    "lng": 77.6294213,
    "address": "Mahatma Gandhi Medical Services Blood Bank Rampur,\r\nNear Jakh Institute of Nursing",
    "phone": "01782 233969",
    "bloodGroups": [
      "B+",
      "O+",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Nahan Regional Hospital Blood Bank ",
    "lat": 30.559933,
    "lng": 77.295483,
    "address": "Regional Hospital, Nahan ",
    "phone": "01702 223344",
    "bloodGroups": [
      "O+",
      "AB-",
      "AB+",
      "B-",
      "O-",
      "A+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Malhotra Super Speciality Hospital Blood Bank ",
    "lat": 30.9491629,
    "lng": 76.8319738,
    "address": "(A Unit of Malhotra Clinics Private Limited), SCO No. 8, Himuda Bhatoli Kalan, Opp.- Mahavir Spinning Mills, Baddi",
    "phone": "01795 275009",
    "bloodGroups": [
      "B-",
      "O+"
    ]
  },
  {
    "name": "Maharishi Markendeshwar Medical College and Hospital Blood Bank",
    "lat": 30.8713445,
    "lng": 77.0863049,
    "address": "LADO, Sultanpur Road, Kumarhatti, Solan\r\n",
    "phone": "01792 395175",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": " Solan Regional Hospital Blood Bank",
    "lat": 30.90738,
    "lng": 77.107075,
    "address": "Regional Hospital, Near Lakkar Bazar, Tank Road",
    "phone": "01792 220159",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Una Regional Hospital Blood Bank ",
    "lat": 31.4785791,
    "lng": 76.2741605,
    "address": "Regional Hospital, Una",
    "phone": "01975 226064",
    "bloodGroups": [
      "AB+",
      "B+",
      "A-",
      "B-",
      "AB-",
      "O-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "MMAB memorial District Hospital  Blood Bank Anantnag",
    "lat": 33.7253569,
    "lng": 75.153155,
    "address": "MMAB memorial Blood Bank, Janglat Mandi, District Hospital, Anantnag",
    "phone": "01923 222170",
    "bloodGroups": [
      "A-",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Baramulla District Hospital Blood Bank",
    "lat": 34.2031312,
    "lng": 74.3654033,
    "address": "District Hospital, Kanthbagh, Baramulla",
    "phone": "01952 234203",
    "bloodGroups": [
      "O+",
      "O-",
      "AB+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Chodana Sub-District Hospital Blood Bank",
    "lat": 33.9429341,
    "lng": 74.7993502,
    "address": "Sub-District Hospital, Chadoora, Budgam",
    "phone": "01951 257236",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Budgam District Hospital Blood Bank ",
    "lat": 34.020827,
    "lng": 74.719824,
    "address": "ASYM District Hospital Campus, Near District Court Complex",
    "phone": "1951255238",
    "bloodGroups": [
      "A+",
      "A-"
    ]
  },
  {
    "name": "Doda District Hospital Blood Bank ",
    "lat": 33.144377,
    "lng": 75.543698,
    "address": "District Hospital, Doda",
    "phone": "01996 233689",
    "bloodGroups": [
      "B-",
      "A+",
      "O-",
      "A-",
      "O+"
    ]
  },
  {
    "name": "District Hospital Blood Bank Ganderbal ",
    "lat": 34.1944531,
    "lng": 74.652155,
    "address": "Ganderbal",
    "phone": "0194 2416158",
    "bloodGroups": [
      "B-",
      "O-",
      "A-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Government Hospital Blood Bank Gandhi Nagar",
    "lat": 32.705277,
    "lng": 74.859974,
    "address": "Government Hospital, Gandhi Nagar, Jammu",
    "phone": "0191 2430041 ",
    "bloodGroups": [
      "A-",
      "O-",
      "AB-",
      "O+",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Government Medical College and Hospital Blood Bank",
    "lat": 32.736061,
    "lng": 74.853998,
    "address": "Government Medical College and Hospital, Mahesh Pura Chowk, Bakshi Nagar",
    "phone": "0191 2584290, 0191 2584291, 0191 2584292",
    "bloodGroups": [
      "O-",
      "B-",
      "A+",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Sri Maharaja Gulab Singh (SMGS) Hospital Blood Bank",
    "lat": 32.733578,
    "lng": 74.862023,
    "address": "Shalamar Road, Indra Chowk, Jammu",
    "phone": "0191 2547635, 0191 2547639",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A+",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Bee Enn General Hospital Blood Bank",
    "lat": 32.7297174,
    "lng": 74.8411347,
    "address": "Garden Avenue, Bhagwati Nagar, Talab Tillo, Jammu",
    "phone": "1912555631",
    "bloodGroups": [
      "A-",
      "B+",
      "A+",
      "B-",
      "AB+",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Acharya Shri Chander College of Medical Sciences and Hospital Blood Bank",
    "lat": 32.760493,
    "lng": 74.898955,
    "address": "Acharya Shri Chander College of Medical Sciences and Hospital, N.H ByPass P.O Majeen",
    "phone": "0191 2662324",
    "bloodGroups": [
      "A-",
      "AB+",
      "B+",
      "AB-",
      "O-",
      "B-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Kargil District Hospital (Kargil Ladakh Kashmir Division) Blood Bank ",
    "lat": 34.559251,
    "lng": 76.124874,
    "address": "District Hospital, Kargil Ladakh Kashmir Division, Jammu and Kashmir",
    "phone": "001985-232213",
    "bloodGroups": [
      "O-",
      "AB-",
      "B+",
      "B-",
      "AB+",
      "A-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Kathua District Hospital Blood Bank ",
    "lat": 32.390815,
    "lng": 75.5252,
    "address": "District Hospital, Kathua ",
    "phone": "01922 234323",
    "bloodGroups": [
      "B-",
      "A-",
      "AB-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Kishtwar District Hospital Blood Bank  ",
    "lat": 33.3139274,
    "lng": 75.7681239,
    "address": "District Hospital, Near Bus stand Kishtwar.",
    "phone": "01995 261410",
    "bloodGroups": [
      "AB-",
      "B-",
      "O-",
      "O+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Kulgam District Hospital Blood Bank ",
    "lat": 33.645305,
    "lng": 75.026719,
    "address": "Kulgam Quzigund Road, opposite to Fruit mandi Kulgam",
    "phone": "01931 260398",
    "bloodGroups": [
      "A+",
      "B-",
      "A-",
      "AB-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Handwara District Hospital Blood Bank",
    "lat": 34.396437,
    "lng": 74.284765,
    "address": "Handwara Hwy, Shaheen Colony, Durashpora, Handwara",
    "phone": "01955 262054  ",
    "bloodGroups": [
      "A-",
      "A+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "SNM Hospital Blood Bank",
    "lat": 34.153795,
    "lng": 77.580209,
    "address": "SNM Hospital, Main Bazar, Leh",
    "phone": "01982 252014",
    "bloodGroups": [
      "A-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Raja Sukhdev Singh District Hospital Poonch",
    "lat": 33.772293,
    "lng": 74.098062,
    "address": "District Hospital, Poonch",
    "phone": "01965 220152, 01965 220656",
    "bloodGroups": [
      "O+",
      "A-",
      "AB+",
      "A+",
      "O-",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Pulwama District Hospital Blood Bank ",
    "lat": 33.878861,
    "lng": 74.900779,
    "address": "District Hospital, Pulwama",
    "phone": "01933 241530",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Rajouri District Hospital Blood Bank ",
    "lat": 33.3880811,
    "lng": 74.316008,
    "address": "District Hospital,  kheora, Rajouri\r\n",
    "phone": "01962 263209",
    "bloodGroups": [
      "AB-",
      "B-",
      "O-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Ramban District Hospital Blood Bank ",
    "lat": 33.2420569,
    "lng": 75.2392611,
    "address": "NH1A, Upper Bazaar, Ramban,",
    "phone": "01988 266908",
    "bloodGroups": [
      "O-",
      "O+",
      "A+",
      "B-",
      "B+",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank Sambha ",
    "lat": 32.560515,
    "lng": 75.120911,
    "address": "District Hospital, Near Sabzi Mandi, Samba",
    "phone": "9419118345",
    "bloodGroups": [
      "O+",
      "B+",
      "O-",
      "B-",
      "A-",
      "AB-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "District Hospital Blood Bank Shopian ",
    "lat": 33.7200624,
    "lng": 74.8338034,
    "address": "Shopian",
    "phone": "01933 261845",
    "bloodGroups": [
      "O-",
      "A-",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Shri Maharaja Hari Singh (SMHS) Hospital Blood Bank",
    "lat": 34.0862001,
    "lng": 74.7977402,
    "address": "SMHS Road, Near Gold Market, Karan Nagar, Srinagar, ",
    "phone": "0194 2504801, 0194 2504802 (Extn. 512) ",
    "bloodGroups": [
      "O+",
      "AB+",
      "B+",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "92 Base Hospital Blood Bank",
    "lat": 34.06591,
    "lng": 74.856181,
    "address": "92 Base Hospital, C/o. 56 APO,  Badami Bagh, Srinagar",
    "phone": "0194 24660009 (Extn. 6528)",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Sher-I-Kashmir Institute of Medical Sciences (SKIMS) Blood bank",
    "lat": 34.136677,
    "lng": 74.800264,
    "address": "Sher-I-Kashmir Institute of Medical Sciences (SKIMS), \r\nAnchar, Soura, Srinagar",
    "phone": "0194 2401013",
    "bloodGroups": [
      "AB-",
      "B+",
      "O+",
      "O-",
      "A+",
      "AB+",
      "B-",
      "A-"
    ]
  },
  {
    "name": " Government Lal Ded Hospital Blood Bank",
    "lat": 34.0667492,
    "lng": 74.8081809,
    "address": "Wazirbagh, Srinagar GPO, Srinagar",
    "phone": "0194 2313714, 0194 2313716",
    "bloodGroups": [
      "AB-",
      "B-",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Government Bone and Joint Surgery Hospital Blood Bank",
    "lat": 34.0481,
    "lng": 74.80522,
    "address": "Government Bone and Joint Surgery Hospital, Near Barzulla bridge, Srinagar",
    "phone": "1942432135",
    "bloodGroups": [
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Jawahar Lal Nehru Memorial Hospital Blood Bank",
    "lat": 34.097759,
    "lng": 74.821651,
    "address": "Jawahar Lal Nehru Memorial Hospital Blood Bank, Rainwari, Srinagar",
    "phone": "0194 2507099",
    "bloodGroups": [
      "A-",
      "O+"
    ]
  },
  {
    "name": "Command Hospital Blood Bank ",
    "lat": 32.930786,
    "lng": 75.135348,
    "address": "Command Hospital, Uttari Kaman, C/o Uttari Kaman, Udhampur",
    "phone": "",
    "bloodGroups": [
      "O-",
      "B+"
    ]
  },
  {
    "name": "Udhampur District Hospital Blood Bank ",
    "lat": 32.919922,
    "lng": 75.132831,
    "address": "Udhampur  District Hospital, Near ITI collage",
    "phone": "01992-270402",
    "bloodGroups": [
      "AB+",
      "A-",
      "O+",
      "B+",
      "B-",
      "O-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank Bokaro",
    "lat": 23.644138,
    "lng": 86.151112,
    "address": "IRCS, Blood bank, Pandit Jawahar lal Nehru Marg, Near Airport, Sector 1 B.S. City",
    "phone": "06542 224555, 06542 288137",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Bokaro General Hospital Blood Bank",
    "lat": 23.675112,
    "lng": 86.145632,
    "address": "Blood Bank, Bokaro General Hospital, Sector - 4, Bokaro Steel City",
    "phone": "6542289076",
    "bloodGroups": [
      "O-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "K.M. Memorial Hospital & Research Center Blood Bank",
    "lat": 23.633257,
    "lng": 86.173506,
    "address": "Blood Bank, K.M. Memorial Hospital & Research Center, By Pass Road Chas Bokaro",
    "phone": "0651 236188189",
    "bloodGroups": [
      "O+",
      "A-"
    ]
  },
  {
    "name": "Deoghar Sadar Hospital Campus Blood Bank ",
    "lat": 24.491027,
    "lng": 86.693996,
    "address": "Blood Bank, Sadar Hospital, Deoghar ",
    "phone": "9431950386",
    "bloodGroups": [
      "B+",
      "AB-",
      "O+",
      "A+",
      "B-",
      "A-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Patliputra Medical college and Hospital (PMCH) Blood Bank Dhanbad",
    "lat": 23.7976877,
    "lng": 86.4356088,
    "address": "PMCH, Saraidhela, Dhanbad, PO. BCCL Township",
    "phone": "0326 2230301",
    "bloodGroups": [
      "O+",
      "A+",
      "AB+",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Central Hospital Blood Bank BCCL Dhanbad",
    "lat": 23.8057146,
    "lng": 86.4509654,
    "address": "Blood Bank, Central Hospital, BCCL, Dhanbad",
    "phone": "9470595563",
    "bloodGroups": [
      "B-",
      "AB-",
      "O+",
      "A+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Dwarka Das Jalan Memorial Hospital Bartand Blood Bank ",
    "lat": 23.806393,
    "lng": 86.43059,
    "address": "Blood Bank Dwarka Das Jalan Memorial Hospital Bartand, Dhanbad",
    "phone": "3262313525",
    "bloodGroups": [
      "O-",
      "B+",
      "AB+",
      "A-",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Dumka Sadar Hospital Blood Bank ",
    "lat": 24.267264,
    "lng": 87.251613,
    "address": "Near Town Hall, Dumka",
    "phone": "6434236298",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "MGM Medical College Hospital Campus Blood Bank Jamshedpur",
    "lat": 22.811699,
    "lng": 86.210334,
    "address": "Sakchi, Jamshedpur",
    "phone": "0657 2230092 ",
    "bloodGroups": [
      "A+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Jamshedpur Blood Bank ",
    "lat": 22.804227,
    "lng": 86.181256,
    "address": "Stocking Road, Northern Town. Bistupur",
    "phone": "0657 2431957",
    "bloodGroups": [
      "B-",
      "A+",
      "AB+",
      "A-",
      "B+",
      "O+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Garhwa Sadar Hospital Campus Blood Bank ",
    "lat": 24.158163,
    "lng": 83.802052,
    "address": "Blood Bank, Sadar Hospital Garhwa",
    "phone": "06561 222005",
    "bloodGroups": [
      "B-",
      "A+",
      "AB+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Giridih Sadar Hospital Blood Bank ",
    "lat": 24.1879903,
    "lng": 86.3064543,
    "address": "Blood Bank, Sadar Hospital Giridih",
    "phone": "06532 250357",
    "bloodGroups": [
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Gumla Sadar Hospital Blood Bank ",
    "lat": 23.0346771,
    "lng": 84.5383358,
    "address": "Blood Bank, Sadar Hospital Gumla, Jharkhand",
    "phone": "9534032306",
    "bloodGroups": [
      "AB+",
      "AB-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Hazaribag Sadar Hospital Blood Bank ",
    "lat": 23.997502,
    "lng": 85.3564179,
    "address": "Blood Bank, Sadar Hospital Campus Hazaribag",
    "phone": "06546 265289",
    "bloodGroups": [
      "AB+",
      "O-",
      "AB-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Koderma Sadar Hospital Blood Bank ",
    "lat": 24.188289,
    "lng": 86.306465,
    "address": "Blood Bank, Sadar Hospital Koderma",
    "phone": "9334516895",
    "bloodGroups": [
      "O-",
      "B-",
      "AB+",
      "AB-",
      "A-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Latehar Sadhar Hospital Blood Bank",
    "lat": 23.7432844,
    "lng": 84.5059776,
    "address": "Sub-Divisional Hospital Blood Bank, Latehar",
    "phone": "9835589186",
    "bloodGroups": [
      "AB+",
      "AB-",
      "B+",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Lohardaga Sadar Hospital Blood Bank ",
    "lat": 23.441722,
    "lng": 84.685316,
    "address": "Blood Bank, Sadar Hospital Lohardagga",
    "phone": "6526222235",
    "bloodGroups": [
      "A-",
      "O-",
      "B+",
      "AB+",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Pakur Sadar Hospital Blood Bank ",
    "lat": 24.6476852,
    "lng": 87.7862334,
    "address": "",
    "phone": "9934347811",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Palamu Sadar Hospital Blood Bank ",
    "lat": 24.047051,
    "lng": 84.060447,
    "address": "Daltonganj, palamau",
    "phone": "06562 222677",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "CCL Hospital Blood Bank Ramgarh",
    "lat": 23.6484192,
    "lng": 85.5093472,
    "address": "Blood Bank, CCL Hospital, Nai Sarai Ramgarh Cantt, Argada Road",
    "phone": "06553 231755",
    "bloodGroups": [
      "B-",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Heavy Engineering Corporation, Plant Hospital Blood Bank",
    "lat": 23.313367,
    "lng": 85.277743,
    "address": "Sector III, HEC Campus, Opposite JSCA Stadium, Ranchi",
    "phone": "0651 2444336",
    "bloodGroups": [
      "B+",
      "O+",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Rajendra Institute of Medical Science (RIMS) Blood Bank, Bariyatu",
    "lat": 23.388964,
    "lng": 85.349138,
    "address": "Bariatu, Ranchi, Jharkhand",
    "phone": "6512540656",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "CCL Hospital Blood Bank Ranchi",
    "lat": 23.408788,
    "lng": 85.321355,
    "address": "Central Hospital,CCL, Gandhi Nagar, Kanka Rd, Ranchi ",
    "phone": "0651 2230355,ext 7059",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Indian Red Cross Society (IRCS) Blood Bank Morabadi",
    "lat": 23.3882502,
    "lng": 85.3281205,
    "address": "Morabadi, Near Hockey Stadium, Ranchi",
    "phone": "07091494670-75",
    "bloodGroups": [
      "O+",
      "AB+",
      "AB-",
      "B+",
      "A+",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Abdur Razzaque Memorial Weavers Hospital (ARAM) Blood Bank ",
    "lat": 23.4507571,
    "lng": 85.4370738,
    "address": "Blood Bank, ARAM Apollo Hospital, IRBA, Ranchi",
    "phone": "0651 7123123",
    "bloodGroups": [
      "O+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Nagarmal Modi Seva Sadan Hospital Blood Bank",
    "lat": 23.371161,
    "lng": 85.317141,
    "address": "Blood Bank, Nagarmal Modi Seva Sadan Hospital, Upper Bazar, Ranchi",
    "phone": "9234460464",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Rinchi Trust Hospital Blood Bank",
    "lat": 23.3451234,
    "lng": 85.1106008,
    "address": "Rinchi Trust Hospital Blood Bank, Kathal More, Itki Road, Ranchi.",
    "phone": "0651 6456780",
    "bloodGroups": [
      "O-",
      "AB-",
      "B-",
      "B+",
      "A-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Devkamal Hospital and Research Centre Blood Bank",
    "lat": 23.3691335,
    "lng": 85.2204851,
    "address": "Bajra Bazar, Bajra, Near IIT Bus Stand, Itki Road",
    "phone": "7549000645",
    "bloodGroups": [
      "A-",
      "B-",
      "AB+",
      "B+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Gurunanak Hospital and Research Centre Blood Bank ",
    "lat": 23.349938,
    "lng": 85.330008,
    "address": "Gurunanak Hospital and Research Centre Blood Bank Unit, Station Road, Ranchi.",
    "phone": "0651 2460506",
    "bloodGroups": [
      "B+",
      "O+"
    ]
  },
  {
    "name": "Sainik Hospital Blood Bank Namkum",
    "lat": 23.3496021,
    "lng": 85.3796172,
    "address": "Blood Bank, Sainik Hospital, Namkum, Ranchi",
    "phone": "0651 2260245",
    "bloodGroups": [
      "AB-",
      "AB+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Jharkhand Blood Bank Bariatu ",
    "lat": 23.395757,
    "lng": 85.351652,
    "address": "Jharkhand Blood Bank, S. R. Complex,  Near Bariatu Masjid, Bariatu",
    "phone": "09334439995, 09973161687",
    "bloodGroups": [
      "B+",
      "B-",
      "AB+",
      "AB-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Archi Blood Bank Jharkhand ",
    "lat": 23.38949,
    "lng": 85.346526,
    "address": "Baxi Avenew, Dr. J. Sharan Lane Bariatu Ranchi",
    "phone": "0651 6455072",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Sahebganj Sadar Hospital Blood Bank ",
    "lat": 25.235841,
    "lng": 87.634215,
    "address": "Blood Bank, Sadar Hospital, Sahebganj",
    "phone": "06436 222050",
    "bloodGroups": [
      "B-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Simdega Sadar Hospital Blood Bank ",
    "lat": 22.6149779,
    "lng": 84.5028825,
    "address": "Blood Bank, Sadar Hospital Simdega ",
    "phone": "9905101190",
    "bloodGroups": [
      "A+",
      "AB+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Chaibasa Sadar Hospital Blood Bank ",
    "lat": 22.5505168,
    "lng": 85.8054811,
    "address": "Blood Bank, Sadar Hospital Chaibasa, West Singhbhum ",
    "phone": "9279221139",
    "bloodGroups": [
      "A-",
      "O+",
      "AB-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Kiriburu Meghahatuburu General Hospital Blood Bank",
    "lat": 22.104554,
    "lng": 85.291571,
    "address": "Kiriburu Iron Ore Mines",
    "phone": "06596 245025",
    "bloodGroups": [
      "A+",
      "AB-",
      "O-",
      "A-",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "TATA (TISCO) Hospital Blood bank",
    "lat": 22.145873,
    "lng": 85.494402,
    "address": "Blood Transfusion Unit, TISCO Hospital, Noamundi, Chaibasa",
    "phone": "9234612775",
    "bloodGroups": [
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Bagalkot Blood Bank",
    "lat": 16.186132,
    "lng": 75.70653,
    "address": "Hanagal Shree Kumareshwar Hospital and Research Centre, Ilkal Road",
    "phone": "0835 220420",
    "bloodGroups": [
      "O-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "B. V. V. Sanghas HSK Hospital Blood Bank",
    "lat": 16.165075,
    "lng": 75.675072,
    "address": "Navanagar, Bagalkot",
    "phone": "08352 235410 ",
    "bloodGroups": [
      "AB+",
      "A-",
      "A+",
      "AB-",
      "B+",
      "B-"
    ]
  },
  {
    "name": "District Hospital Blood Bank Bagalkot",
    "lat": 16.165011,
    "lng": 75.660812,
    "address": "Navanagar",
    "phone": "0835 4236030",
    "bloodGroups": [
      "AB+",
      "A-",
      "O-",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Ramanagoudar Hospital Blood Bank",
    "lat": 15.364709,
    "lng": 75.123955,
    "address": " 2nd floor, CTS, No.4042/B17, Near Kathi Kalyan Mantap ",
    "phone": "08350 281999",
    "bloodGroups": [
      "B+",
      "O+"
    ]
  },
  {
    "name": "M/s. Sai Aadhar Hospital Blood Bank",
    "lat": 16.325218,
    "lng": 75.289397,
    "address": "Sai Aadhar Hospital, Yadwad Road",
    "phone": "08350 282100",
    "bloodGroups": [
      "AB-",
      "B+",
      "O-",
      "A-",
      "O+",
      "AB+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "K.L.E.Society & Medical Research Centre Blood Bank",
    "lat": 15.887919,
    "lng": 74.519593,
    "address": "Nehru Nagar",
    "phone": "0832 2473777",
    "bloodGroups": [
      "AB-",
      "O-",
      "A+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Belgaum Blood Bank and Diagnostic Laboratory",
    "lat": 15.860356,
    "lng": 74.512478,
    "address": "3137, Huns Talkies Road, (opposite to Central High School)",
    "phone": "0831 2425835",
    "bloodGroups": [
      "AB-",
      "O+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 15.86908,
    "lng": 74.510438,
    "address": "Dr. B. R. Ambedkar Road",
    "phone": "0831 2425073",
    "bloodGroups": [
      "AB+",
      "B+",
      "A-",
      "O+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Shree Mahaveer Blood Bank",
    "lat": 15.854367,
    "lng": 74.511233,
    "address": " 4th Floor, Radio Complex, CTS No. 116/1A, Shivaji Road",
    "phone": "0831 2430759",
    "bloodGroups": [
      "B-",
      "A-",
      "B+",
      "O-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "M/s. Sri Sai Blood Bank",
    "lat": 15.833587,
    "lng": 74.526571,
    "address": "Shri Sai Hospital, No:40/2, Laxmi Nagar Main Road,\r\nVadagaon",
    "phone": "0831 2496444",
    "bloodGroups": [
      "O+",
      "A-",
      "AB-",
      "B+",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Rotary Charitable Trust Blood Bank",
    "lat": 16.160173,
    "lng": 74.812128,
    "address": "New Extension Area, Nippani",
    "phone": "08338 221377",
    "bloodGroups": [
      "O+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Rotary Seva Sangh Blood Bank",
    "lat": 16.160405,
    "lng": 74.81216,
    "address": " R. S. No. 211/B, Plot No. 14C, Yogikolla Road",
    "phone": "0831 225300",
    "bloodGroups": [
      "O+",
      "B-",
      "AB+",
      "AB-",
      "A-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Medical College Hospital Blood Bank",
    "lat": 15.154334,
    "lng": 76.896594,
    "address": "Vijayanagara Institute of Medical Science (VIMS), Bellary",
    "phone": "08392 235356",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "M/s. Sri Siddartha Medical College Hospital Blood Bank",
    "lat": 13.160791,
    "lng": 77.323405,
    "address": "Sri Siddhartha Medical College & Hospital, T.Begur, Nelamangala Tq",
    "phone": "9901669103",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "MVJ Medical College and Research Hospital Blood Bank",
    "lat": 13.077457,
    "lng": 77.811502,
    "address": "Dandupalya, Kolathur Post, NH-4",
    "phone": "080 27931473",
    "bloodGroups": [
      "A+",
      "AB+",
      "B+",
      "B-",
      "O+",
      "A-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "BGS Global Hospitals Blood Bank",
    "lat": 12.911276,
    "lng": 77.486216,
    "address": "No. 67, Uttarahalli Road",
    "phone": "080 26255555",
    "bloodGroups": [
      "A-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Harsha Hospital Blood Bank",
    "lat": 13.097983,
    "lng": 77.38581,
    "address": "No. 193/4, Byraveshwaranagar, Sondekoppa Circle, N.H.4, Bengaluru.",
    "phone": "080 27723695 (Not in use)",
    "bloodGroups": [
      "A-",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Narayana Hrudayalaya Blood Bank",
    "lat": 12.80927,
    "lng": 77.695173,
    "address": "University Medical Centre, (KMC) Hospital",
    "phone": "080 27835000 ",
    "bloodGroups": [
      "O-",
      "A-",
      "AB+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Government Haji Sir Ismail Sait Gosha Hospital Blood Bank",
    "lat": 12.987532,
    "lng": 77.604913,
    "address": "Near KSPCB Limited, Tasker Town, Shivaji Nagar",
    "phone": "080 2286 6529",
    "bloodGroups": [
      "O-",
      "A-",
      "AB-",
      "B-",
      "O+",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Swamy Vivekananda Voluntary Blood Bank",
    "lat": 12.9649846,
    "lng": 77.589012,
    "address": "No.20,3rd Floor, SGRR Complex, 1st Cross, Raja Ram Mohan Roy Road, S. R. Nagar",
    "phone": "080 22224044",
    "bloodGroups": [
      "O+",
      "A+",
      "B-",
      "AB+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "M/s. Aster CMI Hospital Blood Bank",
    "lat": 13.054677,
    "lng": 77.592504,
    "address": "43/2, Bellary Rd,NH-4,Sahakar Nagar, Hebbal",
    "phone": "080 43420213",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "M/s. East Point Hospital Blood Bank Virgonagar",
    "lat": 13.053662,
    "lng": 77.717912,
    "address": "East Point college of Medical Sciences&Hospital, Janana Prabha Campus, Bidarahalli",
    "phone": "080 25136246",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Unique Blood Bank & Diagnostic Centre",
    "lat": 12.965837,
    "lng": 77.576262,
    "address": "1st floor,S.L.N.Complex, City Market Square",
    "phone": "080 2600685",
    "bloodGroups": [
      "B+",
      "A+",
      "O+",
      "O-",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "SHUSHRUTHA VOLUNTARY BLOOD BANK",
    "lat": 12.9978842,
    "lng": 77.5411603,
    "address": "The Blood Bank Medical officer\r\nSushrutha Voluntary Blood Bank,\r\nNo:875,Modi Hospital Road,  Near Pristine Hospital",
    "phone": "080 23230777",
    "bloodGroups": [
      "O-",
      "O+",
      "A-",
      "AB-",
      "AB+",
      "A+",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Bengaluru Blood Bank and Diagnostic Laboratory",
    "lat": 12.998074,
    "lng": 77.571614,
    "address": "Between 6th and 7th Cross, Opposite R.R.Gold Palace, Sampige Road,Malleshwaram",
    "phone": "080 23347714",
    "bloodGroups": [
      "AB-",
      "O-",
      "AB+",
      "O+",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Bengaluru Rotary TTK Medical Service Trust Blood Bank",
    "lat": 12.99807,
    "lng": 77.580434,
    "address": "New Thippasandra Main Road, HAL III Stage",
    "phone": "080 25293486/ 9900153000/ 9900163000",
    "bloodGroups": [
      "B+",
      "A-"
    ]
  },
  {
    "name": "KIMS Hospital Blood Bank",
    "lat": 12.956353,
    "lng": 77.574114,
    "address": "K. R. Road, Visveswarapuram,Near Makkala Koota Bus Stop",
    "phone": "080 26613225",
    "bloodGroups": [
      "B-",
      "AB-",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Bangalore Baptist Hospital Blood Bank",
    "lat": 13.035289,
    "lng": 77.589935,
    "address": "Bellary Road, Hebbal",
    "phone": "080 22024700",
    "bloodGroups": [
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Sanjaya Gandhi Accident Hospital and Research Institute Blood Bank",
    "lat": 12.935769,
    "lng": 77.593859,
    "address": "Jayanagar East, Byrasandra",
    "phone": "080 26564516",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Victoria Hospital Blood Bank",
    "lat": 12.963399,
    "lng": 77.573818,
    "address": "Fort Road, Bengaluru",
    "phone": "080 26700001",
    "bloodGroups": [
      "O+",
      "AB-",
      "B+",
      "AB+",
      "A-",
      "O-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "M. S. Ramaiah Medical Teaching Hospital Blood Bank",
    "lat": 13.030487,
    "lng": 77.566648,
    "address": "Gokul Extension",
    "phone": "080 22183100",
    "bloodGroups": [
      "A-",
      "AB-",
      "A+",
      "O+",
      "O-",
      "AB+",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Saint Martha&#39;s Hospital Blood Bank",
    "lat": 12.970679,
    "lng": 77.586085,
    "address": "Nrupatunga Road",
    "phone": "080 40128243",
    "bloodGroups": [
      "A+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Kidwai Memorial Institute of Oncology Blood Bank",
    "lat": 12.93759,
    "lng": 77.598537,
    "address": "Dr. M.H.Marigowda  Road",
    "phone": "080 26094082",
    "bloodGroups": [
      "O+",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Transfusion Medicine Centre Blood Bank",
    "lat": 12.94039,
    "lng": 77.59883,
    "address": "NIMHANS Hosur Road",
    "phone": "080 26995435, 080 26995436, 080 26995437",
    "bloodGroups": [
      "B-",
      "A-"
    ]
  },
  {
    "name": "St. John&#39;s Medical College Blood Bank",
    "lat": 12.929482,
    "lng": 77.620182,
    "address": "Sarjapur Road, Bengaluru",
    "phone": "080 22065045",
    "bloodGroups": [
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Mallya Hospital Blood Bank",
    "lat": 12.968063,
    "lng": 77.595068,
    "address": "No.2, Vittal Mallya Road",
    "phone": "080 22277979\t",
    "bloodGroups": [
      "AB-",
      "A-",
      "O-",
      "A+",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Hindustan Aeronautics Limited - HAL Hospital Blood Bank ",
    "lat": 12.962447,
    "lng": 77.665284,
    "address": "Suranjandas Road, Near HAL Airport, Vimanapura",
    "phone": "080 22314632   ",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Saint Philomena Blood Bank",
    "lat": 12.965428,
    "lng": 77.610476,
    "address": "No.1, Nilsandra Road",
    "phone": "080 40164348 ",
    "bloodGroups": [
      "O-",
      "B+",
      "AB-",
      "A-",
      "B-"
    ]
  },
  {
    "name": "K. C. General Hospital Blood Bank",
    "lat": 12.996389,
    "lng": 77.56931,
    "address": "Malleshwaram",
    "phone": "080 23343791",
    "bloodGroups": [
      "B-",
      "O+",
      "AB+",
      "A+",
      "AB-",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Command Hospital Blood Bank Air Force",
    "lat": 12.963321,
    "lng": 77.62882,
    "address": "Old Airport Road, Near Cambridge Layout, Domlur Village, Post Agram",
    "phone": "080 25234632",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "E.S.I.Hospital Blood Bank",
    "lat": 12.990775,
    "lng": 77.553498,
    "address": "Rajajinagar",
    "phone": "080 23013808",
    "bloodGroups": [
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Rashtrotthana Blood Bank",
    "lat": 12.954814,
    "lng": 77.565362,
    "address": "93/2 Keshava Shilpa 1st Mn Road, Kempegowda Nagar ",
    "phone": "080 26610916",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Dr. B. R.Ambedkar Medical College Hospital Blood Bank",
    "lat": 13.025275,
    "lng": 77.614217,
    "address": "K.G.Halli, Bengaluru",
    "phone": "080 25463442",
    "bloodGroups": [
      "B-",
      "A-",
      "AB-",
      "A+",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Hosmat Hospital Unit of Phisicare Services Private Limited Blood Bank",
    "lat": 12.969035,
    "lng": 77.61346,
    "address": "No.45, Magrath Road, Off. Richmond Road",
    "phone": "080 25593796",
    "bloodGroups": [
      "B-",
      "O-",
      "AB+",
      "A+",
      "B+",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Grace Blood Bank and Laboratory",
    "lat": 13.026155,
    "lng": 77.588859,
    "address": "2, 10th Cross, Ganganagar, Bengaluru",
    "phone": "080 23431233 ",
    "bloodGroups": [
      "B-",
      "O+",
      "O-",
      "A-",
      "A+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Sri Sathya Sai Institute of Higher Medical Sciences Blood Bank",
    "lat": 12.981135,
    "lng": 77.729224,
    "address": "EPIP Area, Whitefield",
    "phone": "080 28411500, 080 28004600 ",
    "bloodGroups": [
      "O+",
      "AB-",
      "AB+",
      "O-",
      "A+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Navarang Blood Bank",
    "lat": 12.9982,
    "lng": 77.551623,
    "address": "No.2953, Ist Floor, Near Navarang Circle, M.K.K.Road, \r\nRajaji Nagar, ",
    "phone": "080 23521233 ",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Bangalore Lions Service Trust - Lions Blood Bank",
    "lat": 12.989645,
    "lng": 77.592754,
    "address": "Bhagwan Mahaveer Jain Hospital, Millers Road, Vasantha Nagar",
    "phone": "080 22266807",
    "bloodGroups": [
      "O-",
      "A+",
      "O+",
      "B-",
      "AB-",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Sri Jayadeva Institute of Cardiology Blood Bank",
    "lat": 12.917957,
    "lng": 77.599329,
    "address": "Gurappanapaly Post, Banneraghatta Road",
    "phone": "080 22977213",
    "bloodGroups": [
      "B-",
      "AB-",
      "O+",
      "A-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Vydehi Institute of Medical Science Hospital Blood Bank",
    "lat": 12.975378,
    "lng": 77.72927,
    "address": "EPIP AREA, 06 WHITE FIELD",
    "phone": "080 28410874 ",
    "bloodGroups": [
      "AB-",
      "O-",
      "B+",
      "A+",
      "B-",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Akshay Voluntary Blood Bank",
    "lat": 12.989853,
    "lng": 77.552805,
    "address": "No. 968, 2nd Floor, 41st Cross, 3rd Block. Opposite E.S.I. Hospital, Rajajinagar",
    "phone": "080 23147303",
    "bloodGroups": [
      "O-",
      "O+",
      "B+",
      "AB+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Bowring and Lady Curzon Hospitals Blood Bank",
    "lat": 12.982165,
    "lng": 77.604276,
    "address": "Shivaji Nagar, Bengaluru",
    "phone": "080 25591362",
    "bloodGroups": [
      "B+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Kempegowda Medical Service Trust - Millennium Blood Bank",
    "lat": 13.019584,
    "lng": 77.557981,
    "address": "No.1082/9, Sreenivasa Prasanna Complex, Triveni Road, Yeshwanthpur, Bengaluru",
    "phone": "080 23571001",
    "bloodGroups": [
      "O-",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "S. K. Voluntary Blood Bank",
    "lat": 12.974445,
    "lng": 77.549288,
    "address": "14/1,I Floor, MESA Complex, Old Tolgate Bus Stop, \r\nMagadi Main Road",
    "phone": "080 23103524 ",
    "bloodGroups": [
      "O+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Indira Gandhi Child Institute of Health Blood Bank",
    "lat": 12.937319,
    "lng": 77.592016,
    "address": "South Hospital Complex, Dharamaram College Post",
    "phone": "080 22443143",
    "bloodGroups": [
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Rajarajeshwari Medical College Hospital Blood Bank",
    "lat": 12.896508,
    "lng": 77.46166,
    "address": "5th Cross, Mysore Road, New Guddadahalli",
    "phone": "080 65666768 ",
    "bloodGroups": [
      "AB+",
      "A+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Sanjeevini Trust Jayanagar Voluntary Blood Bank",
    "lat": 12.9157415,
    "lng": 77.5909561,
    "address": "1897/A, Cellar Floor, Gulora, 26th Main Road, Sount End Cross Road, 9th Block, Jayanagar",
    "phone": "080 26494748 ",
    "bloodGroups": [
      "AB+",
      "A-",
      "AB-",
      "B+",
      "O+",
      "O-",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Sri Vinayaka Charitable Trust  Jeeva Voluntary Blood Bank",
    "lat": 12.961633,
    "lng": 77.571067,
    "address": "No. 23 and 84, Sharoff Basappa Commercial Complex, 2nd Main, Ist Cross, New Tharugpet",
    "phone": "080 25990583",
    "bloodGroups": [
      "A+",
      "B+",
      "O-",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Indian Red Cross Society - Karnataka Red Cross Blood Bank",
    "lat": 12.984218,
    "lng": 77.578831,
    "address": "Red Cross Bhavan, 326, Ist Floor, Race Course Road, Bengaluru",
    "phone": "080 22268435",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Apollo Hospitals (Imperial Cancer Hospital and Research Centre) Blood Bank",
    "lat": 12.89643,
    "lng": 77.598015,
    "address": "Apollo Hospitals a unit of Imperial Cancer Hospital and Research Centre Limited, 154/11, Opp.I.I.M Bannerghatta Road",
    "phone": "080 26304050 / 51",
    "bloodGroups": [
      "O+",
      "B-",
      "O-",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Vijayanagar Hospital Blood Bank",
    "lat": 12.969227,
    "lng": 77.536519,
    "address": "No. 27, 17th Cross, M.C. Layout, Vijayanagar",
    "phone": "080 23358800",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Bangalore Institute of Oncology Blood Bank",
    "lat": 12.964273,
    "lng": 77.589629,
    "address": "No. 8, P. Kalinga Rao Road, Sampangiram Nagar",
    "phone": "080 40206121",
    "bloodGroups": [
      "B+",
      "A-",
      "A+",
      "AB-",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Ocean Blood Bank",
    "lat": 12.982018,
    "lng": 77.604484,
    "address": "No. 133-134, K. P. Broadway Road, Shivajinagar",
    "phone": "080 25552199",
    "bloodGroups": [
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Rotary K. R. Hospital Blood Bank",
    "lat": 12.941937,
    "lng": 77.553588,
    "address": " No. 75, Hanumanthanagar, 50 Feet Road, Bengaluru ",
    "phone": "080 28437393",
    "bloodGroups": [
      "A-",
      "AB-",
      "B+",
      "A+",
      "O-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Veerayoga Institute of Medical Sciences Speciality Hospitals Blood Bank",
    "lat": 12.948331,
    "lng": 77.699554,
    "address": "VIMS, No. 88, Marathhalli, Outer Ring Road",
    "phone": "080 4269800",
    "bloodGroups": [
      "A-",
      "B-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Columbia Asia Referral Hospital Blood Bank",
    "lat": 13.014167,
    "lng": 77.556035,
    "address": "26/4, Brigade Gateway, Beside Metro Cash and Carry West West, Malleshwaram,",
    "phone": "080 39898968",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Sagar Hospital Blood Bank",
    "lat": 12.907709,
    "lng": 77.565114,
    "address": "Sy. No.53, Shavige Malleshwara Hills, Kumar Swamy Layout, Banashankari",
    "phone": "080 42999177  ",
    "bloodGroups": [
      "A-",
      "A+",
      "B-",
      "AB-",
      "O-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Fortis Hospital Private Limited Blood Bank",
    "lat": 12.89453,
    "lng": 77.598902,
    "address": "Bannerghatta Road",
    "phone": "080 66214055 ",
    "bloodGroups": [
      "AB+",
      "B-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Fortis Hospital Private Limited Blood Bank",
    "lat": 12.988216,
    "lng": 77.594232,
    "address": "14, Sheriffs Centre,Cunningham Road",
    "phone": "080 41994515, 080 22261037",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Sagar Hospital Blood Bank",
    "lat": 12.928003,
    "lng": 77.599598,
    "address": " 44/54, 30th Cross, Tilak Nagar, Jayangar Extension",
    "phone": "080 26536712 ",
    "bloodGroups": [
      "AB+",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Manipal Hospital Transfusion Services Blood Bank",
    "lat": 12.958758,
    "lng": 77.6491,
    "address": "No.98, Rustombagh, HAL Airport Road",
    "phone": "080 25024357",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Yashomathi Medicare and Research Centre Private Limited Blood Bank",
    "lat": 12.955719,
    "lng": 77.711256,
    "address": "2371/3, HAL Airport, Varthur Main Road, Munne Kolala, Marathahalli Post",
    "phone": "080 43221019",
    "bloodGroups": [
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Life Care Voluntary Blood Bank",
    "lat": 12.92837,
    "lng": 77.581654,
    "address": " No.126, 7th Block, Jayanagar, Opposite to Jayanagar Police Station",
    "phone": "080 22446923",
    "bloodGroups": [
      "A+",
      "AB-",
      "O-",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "The Oxford Medical College Hospital Blood Bank and Research Centre",
    "lat": 12.787186,
    "lng": 77.756942,
    "address": " Yadavanahalli, Attibele (Hobli), Anekal Taluk",
    "phone": "8030847115",
    "bloodGroups": [
      "B-",
      "AB+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Sakra World Hospital Blood Bank",
    "lat": 12.932125,
    "lng": 77.685263,
    "address": "Sakra world Hospital (A Unit of Takshasila Hospitals Operating Private Limited), S.No. 52/2 and 52/3, Devarabeesanahalli, Varthur Hobli, Bellandur Post",
    "phone": "080 49694916 ",
    "bloodGroups": [
      "B+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Dr.Rajkumar (Appaji) Blood Bank",
    "lat": 12.967558,
    "lng": 77.589363,
    "address": " No.18, Krishi Bhavan, 2nd Floor, Hudson Circle",
    "phone": "080 22108108",
    "bloodGroups": [
      "O+",
      "B+",
      "AB+",
      "B-",
      "AB-",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Sri Shankara Cancer Hospital and Research Centre Blood Bank",
    "lat": 12.954575,
    "lng": 77.571128,
    "address": "Shankara Math premises, 1st cross, shankarapuram, Basavanagudi",
    "phone": "080 26981101",
    "bloodGroups": [
      "A-",
      "AB+",
      "AB-",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Mediscope Blood Bank",
    "lat": 12.999478,
    "lng": 77.616872,
    "address": "Mediscope Hospital, No.11, Pillanna Garden, 3rd stage",
    "phone": "080 25466554  ",
    "bloodGroups": [
      "O-",
      "O+",
      "AB-",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Sapthagiri Hospital Blood Bank",
    "lat": 13.070573,
    "lng": 77.50228,
    "address": "No.15, Chikkasandra, Hesaraghatta Main Road",
    "phone": "080 22791638",
    "bloodGroups": [
      "B+",
      "B-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "The District Surgeon District Hospital Blood Bank",
    "lat": 17.918098,
    "lng": 77.515003,
    "address": "",
    "phone": "08482 220744",
    "bloodGroups": [
      "AB-",
      "B-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "District Hospital Blood Bank Bijapur",
    "lat": 16.828098,
    "lng": 75.691713,
    "address": "Athani Road",
    "phone": "08352 270108",
    "bloodGroups": [
      "O+",
      "A+",
      "A-"
    ]
  },
  {
    "name": "B.L.D.E. Association&#39;s Medical College & Reserch Centre Blood Bank",
    "lat": 16.845101,
    "lng": 75.710641,
    "address": "Mahal Bagayat,Ashram Road",
    "phone": "0835 2262770",
    "bloodGroups": [
      "A+",
      "O-",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Lions Blood Bank",
    "lat": 16.827207,
    "lng": 75.725839,
    "address": "Bandikaman Road, Ward No.6, CTS No.168, Basement Ground and First Floor",
    "phone": "08352 22200050  ",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Dr. B. N. M. Rural Ayurvedic Medical College and Hospital Blood Bank",
    "lat": 16.8301759,
    "lng": 75.7078424,
    "address": "Smt. Sushiladevi Nagur Colony, College Road",
    "phone": "0835 2655760",
    "bloodGroups": [
      "O+",
      "AB-",
      "B+",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Al-Ameen Medical College Hospital Blood Bank",
    "lat": 16.825058,
    "lng": 75.669209,
    "address": "Athani Road, Bihapurkar",
    "phone": "08352 270113",
    "bloodGroups": [
      "AB-",
      "AB+",
      "B-",
      "B+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "GMETS Dr. Goudars Blood Bank",
    "lat": 16.828072,
    "lng": 75.709979,
    "address": "852, A1 and A2 Ward IX, 1st Floor, Dr. Karigoudar&#39;s Complex Godbolemala",
    "phone": "08352 253604",
    "bloodGroups": [
      "AB-",
      "O-",
      "A+",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank Chamarajanagar",
    "lat": 11.926773,
    "lng": 76.941473,
    "address": "District Hospital",
    "phone": "08226 222067",
    "bloodGroups": [
      "B+",
      "O+",
      "A+",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Holy Cross Hospital Blood Bank",
    "lat": 12.12938,
    "lng": 77.233586,
    "address": "Kamagere , Kolegala Taluk, Chamaraja Nagar",
    "phone": "08226 263116  ",
    "bloodGroups": [
      "AB-",
      "B+",
      "A-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank Chikkaballapur",
    "lat": 13.438043,
    "lng": 77.72929,
    "address": "District Family Welfare Office, 2nd Floor, B. B. Road",
    "phone": "08156 272118",
    "bloodGroups": [
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Mallegowda District Hospital Blood Bank",
    "lat": 13.218016,
    "lng": 75.251826,
    "address": "Chikkamagaluru",
    "phone": "08262 238083",
    "bloodGroups": [
      "B-",
      "O-",
      "AB-",
      "A+",
      "AB+",
      "B+",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Holy Cross Hospital Blood Bank",
    "lat": 13.338634,
    "lng": 75.80355,
    "address": "Housing Board Colony, K. M. Road, Jyothi Nagar",
    "phone": "08262 220077 ",
    "bloodGroups": [
      "AB+",
      "O-",
      "AB-",
      "A-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Sharada Dhanvantari Charitable Hospital Blood Bank",
    "lat": 13.428948,
    "lng": 75.254286,
    "address": "S. D. C. Hospital, P.B. No. 13, Vidyaranyapura Village,",
    "phone": "0826 220175",
    "bloodGroups": [
      "A-",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "District Hospital Blood Bank Chitradurga",
    "lat": 14.220818,
    "lng": 76.4065,
    "address": "B. D. Road Chitradurga",
    "phone": "08194 234710",
    "bloodGroups": [
      "AB-",
      "A-",
      "AB+",
      "B-",
      "O+"
    ]
  },
  {
    "name": "SJM Blood Bank Basaveshwara Medical College Hospital and Research Centre",
    "lat": 14.239807,
    "lng": 76.388943,
    "address": "NH-4, By Pass, Near KHB Colony",
    "phone": "08194 222054 ",
    "bloodGroups": [
      "A-",
      "B-"
    ]
  },
  {
    "name": "Vasavi Blood Bank",
    "lat": 14.229572,
    "lng": 76.409483,
    "address": "Khata No. 4895/4720, Assessment No. 11479/13, \r\nB. L. Gowda Layout, Thurunur Road",
    "phone": "08194 222666",
    "bloodGroups": [
      "AB-",
      "A+",
      "O+",
      "AB+",
      "B+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Jyothi Hospital Blood Bank",
    "lat": 12.991208,
    "lng": 75.288255,
    "address": "Jyothi Hospital, Laila-574 214, Belthangady",
    "phone": "0825 6233939",
    "bloodGroups": [
      "AB+",
      "A-",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "M/s. Indian Red Cross Society Blood Bank",
    "lat": 13.628482,
    "lng": 74.690683,
    "address": "1st floor, Govt Hospital Building, Muncipal Road",
    "phone": "08254 233111",
    "bloodGroups": [
      "O-",
      "AB+",
      "A+",
      "B+",
      "A-",
      "B-",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Fr. Mullers Charitable Instituitions Blood Bank",
    "lat": 12.866805,
    "lng": 74.85933,
    "address": "Post Box No.501, Kankanady",
    "phone": "0824 2238126",
    "bloodGroups": [
      "A-",
      "A+",
      "B-",
      "AB+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "City Hospital Research and Diagnostic Centre Blood Bank",
    "lat": 12.87963,
    "lng": 74.853044,
    "address": "Pound Garden, Kadri",
    "phone": "0824 221790 ",
    "bloodGroups": [
      "A+",
      "A-",
      "B+",
      "B-",
      "O+",
      "AB-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "The District Surgeon - Wenlock District Hospital Blood Bank",
    "lat": 12.867384,
    "lng": 74.843132,
    "address": "Hampanakata",
    "phone": "0824 2413205",
    "bloodGroups": [
      "O-",
      "AB-",
      "AB+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Yenepoya Medical College Blood Bank",
    "lat": 12.81194,
    "lng": 74.881231,
    "address": "Nithyananda Nagar, Deralakatte",
    "phone": "0824 2204668 ",
    "bloodGroups": [
      "A-",
      "O-",
      "B-",
      "AB-",
      "B+",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "A. J. Hospital and Research Centre Blood Bank",
    "lat": 12.899478,
    "lng": 74.845975,
    "address": "Kuntikana, NH- 66",
    "phone": "0824 2225535 ",
    "bloodGroups": [
      "O-",
      "AB-",
      "A-",
      "B-",
      "B+"
    ]
  },
  {
    "name": "KMC University Medical Centre Blood Bank",
    "lat": 12.870434,
    "lng": 74.844505,
    "address": "Dr. B. R. Ambedkar Circle, Jyothi",
    "phone": "0824 2444590 (Extn. 5059)",
    "bloodGroups": [
      "B+",
      "B-"
    ]
  },
  {
    "name": "Srinivasa Institute of Medical Sciences and Research Centre Blood Bank",
    "lat": 13.021405,
    "lng": 74.792037,
    "address": "Mukka,Srinivas Nagar,Surathkal",
    "phone": "0824 2474883",
    "bloodGroups": [
      "B+",
      "AB+",
      "AB-",
      "A-",
      "B-"
    ]
  },
  {
    "name": " M/s. Tejasvini Hospital Lions Blood Bank",
    "lat": 12.880334,
    "lng": 74.853689,
    "address": "Kadri Temple Road",
    "phone": "0824 2225994",
    "bloodGroups": [
      "AB+",
      "A-",
      "B+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank Mangalore",
    "lat": 12.864857,
    "lng": 74.83818,
    "address": "Lady Goshen Hospital, Behind Central Market",
    "phone": "0824 2423755 ",
    "bloodGroups": [
      "O+",
      "AB-",
      "O-",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Nitte University Blood Bank",
    "lat": 12.807444,
    "lng": 74.888332,
    "address": "Justice K. S. Hegde Charitable Hospital, Deralakatte",
    "phone": "0824 220447  ",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "M/s. Kanachur Hospital & Research Centre Blood Bank",
    "lat": 12.803421,
    "lng": 74.898097,
    "address": "Ground Floor, C Block, University Road, Deralakatte",
    "phone": "08242 202982",
    "bloodGroups": [
      "O-",
      "B+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Rotary Campco Blood Bank",
    "lat": 12.760706,
    "lng": 75.198947,
    "address": "Radhakrishna Building, Shree Radhadrishna Mandir Road",
    "phone": "0824 234242 ",
    "bloodGroups": [
      "O+",
      "A+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "General Hospital Blood Bank Puttur",
    "lat": 12.758344,
    "lng": 75.200313,
    "address": "",
    "phone": "08251 238258",
    "bloodGroups": [
      "B+",
      "O-",
      "A-",
      "O+",
      "A+",
      "AB+",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "K. V. G Medical College Hospital Blood Bank",
    "lat": 12.55332,
    "lng": 75.384249,
    "address": "Kurinji Bag",
    "phone": "0824 230326 ",
    "bloodGroups": [
      "A+",
      "B-",
      "O-",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Chigateri District Hospital Blood Bank",
    "lat": 14.456165,
    "lng": 75.916182,
    "address": "Chigateri District Hospital, Chigateri",
    "phone": "08192 272085",
    "bloodGroups": [
      "O-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Bapuji Hospital Blood Bank",
    "lat": 14.4588202,
    "lng": 75.9167473,
    "address": "C.G. Hospital Road",
    "phone": "08192 253850  ",
    "bloodGroups": [
      "AB-",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Davangere Blood Bank",
    "lat": 14.459198,
    "lng": 75.915238,
    "address": "358, Mahaveera Complex, II Floor, 8th Main, 8th Cross, P.J. Extension",
    "phone": "08192 236655 ",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Bapuji Educational Association S. S. Institute of Medical Sciences and Research Hospital Blood Bank",
    "lat": 14.430349,
    "lng": 75.942694,
    "address": "Jnanashankara, NH-4 Bypass Road, Post Box-1",
    "phone": "08192 266016 ",
    "bloodGroups": [
      "O+",
      "O-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Karnataka Hemophillia Society Life Line Blood Bank",
    "lat": 14.457405,
    "lng": 75.902533,
    "address": "No.1138, Ring Road, S. Nijalingappa Layout, Behind KSFC Building",
    "phone": "08192 231948",
    "bloodGroups": [
      "B-",
      "O-",
      "O+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "INDIAN RED CROSS SOCIETY",
    "lat": 14.475314,
    "lng": 75.909787,
    "address": "Devraj Urs Layout",
    "phone": "08192 252550",
    "bloodGroups": [
      "O+",
      "B-",
      "B+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Rotary Club Dharwad Mid Town Charitable Trust - Rotary Blood Bank",
    "lat": 15.46373,
    "lng": 74.969829,
    "address": "Lourde&#39;s Hospital, Kalageri Road",
    "phone": "0836 2746123",
    "bloodGroups": [
      "O+",
      "A+",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "District Hospital Blood Bank Dharwad",
    "lat": 15.46473,
    "lng": 75.010366,
    "address": "Fort Road",
    "phone": "0836 2747747",
    "bloodGroups": [
      "A+",
      "B+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "SDM College of Medical Sciences and Hospital Blood Bank",
    "lat": 15.417904,
    "lng": 75.050162,
    "address": "First Floor B Wing Building, Sattur",
    "phone": "0836 2477262",
    "bloodGroups": [
      "AB+",
      "B-",
      "AB-",
      "O-",
      "A-",
      "B+",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Karnataka Medical College Hospital Blood Bank",
    "lat": 15.3669,
    "lng": 75.128266,
    "address": "III Floor, # 306 ",
    "phone": "080 2272908",
    "bloodGroups": [
      "A+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "M. R. Diagnostic Research Centre and Blood Bank",
    "lat": 15.364705,
    "lng": 75.123954,
    "address": "Ground Floor, Eureka Towers, Traffic Island",
    "phone": "0836 2253450  ",
    "bloodGroups": [
      "O-",
      "A-",
      "A+",
      "B+",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "The Karnataka Cancer Therapy and Research Institute Smt. Valbai N. Dharamsey Blood Bank",
    "lat": 15.36472,
    "lng": 75.123954,
    "address": "Navanagar ",
    "phone": "0836 2228217 ",
    "bloodGroups": [
      "AB+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Jeevanavar Blood Bank",
    "lat": 15.353643,
    "lng": 75.130587,
    "address": "CTS No.104,11/15-B, Municipal No.20922/17-A, \r\nK.H.Jituri Hospital, Complex, II Floor, Gokul Road",
    "phone": "0836 2278320 ",
    "bloodGroups": [
      "A-",
      "B+",
      "AB+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Hubli Lions Blood Bank",
    "lat": 15.354562,
    "lng": 75.135566,
    "address": "CTS No. 440, Ward No.1, Groud Floor, Vivekananda General Hospital Compound, Deshpande Nagar, Hubli",
    "phone": "0836 2258080 ",
    "bloodGroups": [
      "O-",
      "O+",
      "A+",
      "B-",
      "B+",
      "AB+",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Sha Damji Jadavji Chheda Memorial Rashtrotthana Blood Bank",
    "lat": 15.3534025,
    "lng": 75.1348707,
    "address": "2nd Floor Dee Jay building, Neeligin Road",
    "phone": "0836 2358838",
    "bloodGroups": [
      "A+",
      "AB+",
      "AB-",
      "B+",
      "B-",
      "O-",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Life Line 24x7 Blood Bank",
    "lat": 15.35144,
    "lng": 75.117758,
    "address": "Opposite to New Bus Stand Airport Road",
    "phone": "0836 2330000",
    "bloodGroups": [
      "AB+",
      "A+",
      "O-",
      "A-",
      "B-",
      "B+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "M/s. Suchirayu Healthcare Limited Blood Bank",
    "lat": 15.3526453,
    "lng": 75.1155103,
    "address": "Sy.No:28/8-11,M.Timmasagara, Jalavi Garden, Off Gokul Road",
    "phone": "0836 2239000",
    "bloodGroups": [
      "B+",
      "AB+",
      "AB-",
      "B-",
      "A+",
      "O+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "IMA Blood Bank",
    "lat": 15.436162,
    "lng": 75.637616,
    "address": "Zendha Circle, Station Road",
    "phone": "08372 253955 ",
    "bloodGroups": [
      "B-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Gadag Institute of Medical Sciences & District Hospital Blood Bank",
    "lat": 15.380961,
    "lng": 75.600802,
    "address": "Gadag Institute of Medical Sciences, Mallasamudra",
    "phone": "08372 297214",
    "bloodGroups": [
      "A+",
      "B+",
      "O+",
      "AB-",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Sri. Chamarajendra District Hospital Blood Bank",
    "lat": 13.004537,
    "lng": 76.103797,
    "address": "Hospital Road",
    "phone": "08172 252330",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Jeeva Raksha Blood Bank",
    "lat": 13.0032624,
    "lng": 76.0975902,
    "address": "Vokkaligara Hostel Building, Ist Floor, B.M.Road",
    "phone": "08172 26204 ",
    "bloodGroups": [
      "B-",
      "AB+",
      "A+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Manjunath Orthopaedic and Trauma Centre Hospital Blood Bank",
    "lat": 13.0080708,
    "lng": 76.1016262,
    "address": "K. R. Puram",
    "phone": "08172 266124",
    "bloodGroups": [
      "O+",
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank Haveri",
    "lat": 14.785408,
    "lng": 75.403059,
    "address": "",
    "phone": "0837 5232222",
    "bloodGroups": [
      "B+",
      "AB-"
    ]
  },
  {
    "name": "HKES Blood Bank Organisation",
    "lat": 17.328385,
    "lng": 76.844483,
    "address": "M.R. Medical College, Basave shwara Teaching and General Hospital, No.7-52 Sadam Road",
    "phone": "08472 220307, 08472  225085",
    "bloodGroups": [
      "AB-",
      "B-",
      "AB+",
      "A+",
      "B+",
      "O+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 17.328685,
    "lng": 76.840743,
    "address": "Sedam Road",
    "phone": "08472 2240630",
    "bloodGroups": [
      "B-",
      "B+",
      "AB+",
      "A-",
      "O-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Health Care Blood Bank",
    "lat": 17.3353831,
    "lng": 76.8361997,
    "address": "3-400/401 A, Ist Floor, Taj Complex, Gazipura",
    "phone": "08472 261886 ",
    "bloodGroups": [
      "O+",
      "A+"
    ]
  },
  {
    "name": "Khaja Banda Nawaz Teaching and General Hospital Blood Bank",
    "lat": 17.352728,
    "lng": 76.853237,
    "address": "Khaja Nagri, Station Main Road",
    "phone": "0847 2223458",
    "bloodGroups": [
      "AB-",
      "O+",
      "B+",
      "B-",
      "A+",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "M/s. Vaatsalya Life Hospitals Navajeeva Blood Bank",
    "lat": 17.328477,
    "lng": 76.847911,
    "address": "Vaatsalya Life Hospital, 1st Floor, Near RTO Office, SH-10",
    "phone": "08472 240066",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "M/s. Medicare Multispeciality Hospital Blood Bank",
    "lat": 17.337775,
    "lng": 76.844343,
    "address": "Badagu Health Services Private Limited, 1st Floor, Darga Road, Santraswadi",
    "phone": "08472 262524",
    "bloodGroups": [
      "O-",
      "AB-",
      "AB+",
      "O+",
      "B+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 12.418764,
    "lng": 75.742555,
    "address": "General Thimayya Road",
    "phone": "08272 223445",
    "bloodGroups": [
      "B-",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Sambrama Institute of Medical Sciences & Research Hospital Blood Bank",
    "lat": 12.996519,
    "lng": 78.240449,
    "address": "No:3029/1, D. K. Plantation BEML Nagar",
    "phone": "08153 263230",
    "bloodGroups": [
      "B+",
      "A+",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "General Hospital Robertson Peth Blood Bank",
    "lat": 12.953386,
    "lng": 78.271285,
    "address": "Kolar Gold Field (K. G. F)",
    "phone": "08253 271041",
    "bloodGroups": [
      "A+",
      "B-",
      "A-",
      "O+",
      "O-"
    ]
  },
  {
    "name": "S.N.R. District Hospital Blood Bank",
    "lat": 13.129255,
    "lng": 78.13435,
    "address": "Gowripete, Kolar",
    "phone": "08152 222035",
    "bloodGroups": [
      "AB-",
      "A-",
      "O+",
      "A+",
      "B+"
    ]
  },
  {
    "name": "BEML Medical Centre Bharat Earth Movers Limited Blood Bank",
    "lat": 12.983949,
    "lng": 78.237201,
    "address": "Kolar Gold Fields ",
    "phone": "08153 263208 ",
    "bloodGroups": [
      "AB-",
      "O-",
      "B-",
      "A+",
      "A-",
      "AB+",
      "B+",
      "O+"
    ]
  },
  {
    "name": "R. L. Jalappa Hospital and Research Centre Blood Bank",
    "lat": 13.131674,
    "lng": 78.173061,
    "address": "NH-4,Tamaka",
    "phone": "9480849818",
    "bloodGroups": [
      "AB-",
      "O-",
      "B-",
      "AB+",
      "B+",
      "A-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Gopi Blood Bank",
    "lat": 15.4345687,
    "lng": 76.5018267,
    "address": "Gunj Area, C.B.S. Circle, Gangavthi ",
    "phone": "08533 272191 ",
    "bloodGroups": [
      "AB-",
      "B+",
      "O+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Indian Red Cross Koppal District Branch Blood Bank",
    "lat": 15.419164,
    "lng": 76.138152,
    "address": "1st Floor, New District Hospital, Hospital Road, Koppal ",
    "phone": "0853 9225088",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Adichunchanagiri Hospital and Research Centre Blood Bank",
    "lat": 12.966319,
    "lng": 76.721027,
    "address": "Balagangadharnath Nagar, Bellur",
    "phone": "08232 287433  ",
    "bloodGroups": [
      "B+",
      "B-"
    ]
  },
  {
    "name": "District Hospital Blood Bank Mandya",
    "lat": 12.4279555,
    "lng": 76.7010341,
    "address": " District Hospital Premises",
    "phone": "0832 224040",
    "bloodGroups": [
      "O+",
      "A+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "MDC Voluntary Blood Bank",
    "lat": 12.52027,
    "lng": 76.899169,
    "address": "Khatha No. D5/1045/187, Alahalli Extension, General Hospital Road, Nehrunagar",
    "phone": "08232 231665 ",
    "bloodGroups": [
      "AB+",
      "O-",
      "O+",
      "AB-",
      "A-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Vikarm Hospital Blood Bank",
    "lat": 12.525089,
    "lng": 76.8982,
    "address": "Vikarm Hospital, No.D5/271/219B and D5/272/1220, 3rd Cross, Ashoka Nagar",
    "phone": "08232 402121",
    "bloodGroups": [
      "AB-",
      "O-",
      "O+",
      "A-",
      "B-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Holdsworth Memorial Mission Hospital Blood Bank",
    "lat": 12.316416,
    "lng": 76.650574,
    "address": "Mandimohalla",
    "phone": "0821 2521650  ",
    "bloodGroups": [
      "B-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Bassappa Memorial Hospital Blood Bank",
    "lat": 12.320811,
    "lng": 76.62005,
    "address": "22/B, Vinoba Road, Jayalakshmipuram",
    "phone": "0821 2511671",
    "bloodGroups": [
      "AB+",
      "O+",
      "B+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "B. G. S. Apollo Hospital Blood Bank",
    "lat": 12.29573,
    "lng": 76.632061,
    "address": "Kantharaj Urs Road, Kuvempunagar",
    "phone": "0821 2566666 ",
    "bloodGroups": [
      "AB-",
      "A+",
      "O+",
      "AB+",
      "B+",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Vikram Hospital and Heart Centre Blood Bank",
    "lat": 12.32354,
    "lng": 76.638119,
    "address": "346, Vivekananda Road, Yadavagiri",
    "phone": "0821 2412121",
    "bloodGroups": [
      "AB+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Rotary Mysore Chandrakala Hospital Blood Bank",
    "lat": 12.325868,
    "lng": 76.619519,
    "address": "Chandrakala Hospital and Institute of Medical Research, Plot &#39;A&#39;, Kalidasa Road, Jayalakshmipuram",
    "phone": "0821 4288638",
    "bloodGroups": [
      "O-",
      "A+"
    ]
  },
  {
    "name": "Jeevadhara Voluntary Blood Bank ",
    "lat": 12.315731,
    "lng": 76.65103,
    "address": "Aunit of Cauvery Social Services Trust, No.1475, 2nd Floor and 3rd floor, New Sayaji RaoRoad, Mandi Mohalla",
    "phone": "0821 2444936",
    "bloodGroups": [
      "B-",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Nuveen Medical Relief and research Foundation Blood Bank",
    "lat": 12.3410708,
    "lng": 76.6531589,
    "address": "St.Joseph SH-17, 331/1, L176/2, Bannimantap",
    "phone": "0821 2496688",
    "bloodGroups": [
      "O-",
      "B+",
      "B-",
      "A-",
      "AB+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Cauvery Hospital Blood Bank",
    "lat": 12.30509,
    "lng": 76.695813,
    "address": "No.42/2B, 2C, Teresian College Circle, Siddarth Nagar",
    "phone": "0821 2425000",
    "bloodGroups": [
      "B-",
      "O-",
      "AB+",
      "B+",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Kamakshi Hospital Blood Bank",
    "lat": 12.299739,
    "lng": 76.623762,
    "address": "1st Floor, New Building of Kamakshi Hospital Premises, Kuvempnagar Mysore",
    "phone": "0821 2545981  ",
    "bloodGroups": [
      "B-",
      "A-",
      "A+",
      "B+",
      "AB+",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Narayana Hrudayalaya - Surgical Hospital Private Limited Blood Bank",
    "lat": 12.345086,
    "lng": 76.673031,
    "address": " CAH-1, 3rd Phase, Devanur",
    "phone": "0821 7122222 (Extn. 2260)",
    "bloodGroups": [
      "AB+",
      "O+",
      "B+"
    ]
  },
  {
    "name": "J. S. S. Hospital Blood Bank",
    "lat": 12.29521,
    "lng": 76.65607,
    "address": "J S S Hospital, Ramanuja Road",
    "phone": "0821 2335009",
    "bloodGroups": [
      "AB+",
      "O-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "K. R. Hospital Blood Bank",
    "lat": 12.313101,
    "lng": 76.649573,
    "address": "Sayyaji Rao Road",
    "phone": "0821 2429800",
    "bloodGroups": [
      "O+",
      "AB+",
      "B+",
      "A-",
      "AB-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Railway Hospital Blood Bank",
    "lat": 12.325712,
    "lng": 76.635623,
    "address": "Yadavagiri",
    "phone": "0821 2517238",
    "bloodGroups": [
      "AB+",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Hutti Gold Hospital Blood Bank",
    "lat": 16.196412,
    "lng": 76.653027,
    "address": "Hutti Gold Mines Limited, Raichur",
    "phone": "08532 275049",
    "bloodGroups": [
      "O+",
      "O-",
      "B-",
      "A+",
      "AB-",
      "AB+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Indian Medical Association Blood Bank",
    "lat": 12.960041,
    "lng": 77.57296,
    "address": "3.9.58, Old Government  Hospital Compound, Beron Quilla",
    "phone": "08532 226608",
    "bloodGroups": [
      "O-",
      "AB+",
      "A+",
      "A-",
      "B-",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Navodaya Medical College Hospital and Research Centre Blood Bank",
    "lat": 16.184331,
    "lng": 77.368042,
    "address": "Mantralaya Road",
    "phone": "08532 223361 (Extn. 444)",
    "bloodGroups": [
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Raichur Institute of Medical Sciences Teaching Hospital (RIMS) Blood Bank",
    "lat": 16.229892,
    "lng": 77.35936,
    "address": "Rajendra Gunj",
    "phone": "9972777381",
    "bloodGroups": [
      "O+",
      "A-",
      "B-",
      "B+",
      "O-",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Sri Shakti Blood Bank",
    "lat": 15.7687772,
    "lng": 76.7638445,
    "address": "Badarli Venkat Rao Gouda Health Care Association, Venkateshwara Tourist Home, Sukalapeta Road",
    "phone": "0853 5220299",
    "bloodGroups": [
      "A+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "M/S Indian Red Cross Society",
    "lat": 12.5418511,
    "lng": 77.3404064,
    "address": "Ramanagar District Branch,\r\nDistrict Hospital Premises,1st Floor",
    "phone": "080 2727200",
    "bloodGroups": [
      "A+",
      "A-",
      "AB-",
      "AB+",
      "O+",
      "B-",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Jeevadhara Blood Bank",
    "lat": 13.844738,
    "lng": 75.710033,
    "address": "17, Meena Nursing Home, Madhava Nagar",
    "phone": "08182 263770",
    "bloodGroups": [
      "B+",
      "AB-",
      "O+",
      "A-",
      "A+",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "VISL Hospital Blood Bank",
    "lat": 13.83034,
    "lng": 75.690275,
    "address": " SH 65, Hutta Colony",
    "phone": "08182 271620",
    "bloodGroups": [
      "B+",
      "AB+",
      "A-",
      "O+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "McGann Hospital Blood Bank",
    "lat": 13.935689,
    "lng": 75.562968,
    "address": "Sagar Road",
    "phone": "08182 222412",
    "bloodGroups": [
      "B+",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Shimoga Mid Town Rotary Charity Foundation Blood Bank",
    "lat": 13.94626,
    "lng": 75.57832,
    "address": "Opposite Usha Nursing Home, 100 Feet Road",
    "phone": "08182 274333",
    "bloodGroups": [
      "A+",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Subbaiah Medical College Blood Bank",
    "lat": 13.932932,
    "lng": 75.617172,
    "address": "NH-13, Purle, Hjolehonnur, Road",
    "phone": "08182 277505",
    "bloodGroups": [
      "O+",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "M/s. Sahyadri Narayana Multispeciality Hospital Blood Bank",
    "lat": 13.908068,
    "lng": 75.560375,
    "address": "New Thirthahalli Road, Harakere",
    "phone": "08182 221577",
    "bloodGroups": [
      "A+",
      "A-",
      "B-",
      "AB-",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Red Cross Sanjeevini Blood Bank",
    "lat": 13.933868,
    "lng": 75.57183,
    "address": "Ist Floor, Kshiti Complex, JPN Road",
    "phone": "08182 228855",
    "bloodGroups": [
      "O+",
      "AB+",
      "A-",
      "A+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Sri Sidhartha Medical College Blood Bank",
    "lat": 13.346024,
    "lng": 77.057009,
    "address": "Agalakote, B.H.Road",
    "phone": "08162 278867",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank Tumkur",
    "lat": 13.339661,
    "lng": 77.098414,
    "address": "Near Town Hall, B.H. Road, Tumkur",
    "phone": "08162 257404",
    "bloodGroups": [
      "A-",
      "O-",
      "O+",
      "AB+",
      "B+",
      "A+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "J.C. Voluntary Blood Bank",
    "lat": 13.337779,
    "lng": 77.11681,
    "address": "Plot No. 5421, II Floor, Narasimha Building, Nisarga Layout, B.H. Road",
    "phone": "08162 272980 ",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Vijaya Hospital Blood Bank",
    "lat": 13.332531,
    "lng": 77.096051,
    "address": "10054/A, 4511/A, 3rd Main Road",
    "phone": "0816 2257762",
    "bloodGroups": [
      "B-",
      "O+",
      "O-",
      "B+",
      "AB-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Rotary Tumkur Central Belli Blood Bank",
    "lat": 13.3415593,
    "lng": 77.1031786,
    "address": "Khata No. 308/A, 321/A and 303/A/321, Ward No. 13, Opposite Government Hospital, Gandhinagar",
    "phone": "0816 225277",
    "bloodGroups": [
      "A+",
      "B-",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Sri Shridevi Charitable Trust - Sreedevi Institute of Medical Sciences & Research Hospital Blood Bank",
    "lat": 13.376281,
    "lng": 77.096987,
    "address": "NH-4, Sira Road,Tumkur",
    "phone": "7259033424",
    "bloodGroups": [
      "B-",
      "B+",
      "A-",
      "O-",
      "AB+",
      "A+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Kasturba Hospital Blood Bank",
    "lat": 13.353846,
    "lng": 74.789057,
    "address": "Site.No.55/2, Shivalli Village, Manipal Udupi",
    "phone": "0820 2922331  ",
    "bloodGroups": [
      "AB+",
      "B+",
      "B-",
      "O-"
    ]
  },
  {
    "name": "District Hospital Blood Bank Udupi",
    "lat": 13.334045,
    "lng": 74.742105,
    "address": "District Hospital",
    "phone": "0820 2520555",
    "bloodGroups": [
      "B+",
      "AB+"
    ]
  },
  {
    "name": "K. L. E. Society Blood Bank",
    "lat": 14.661796,
    "lng": 74.309805,
    "address": "Dr. Kamal hospital & Medical Research Centre",
    "phone": "08388 230257",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "District Hospital Blood Bank Karwar",
    "lat": 14.817283,
    "lng": 74.12968,
    "address": "District Hospital Premises",
    "phone": "0838 2226318",
    "bloodGroups": [
      "AB+",
      "O+",
      "B-",
      "A-",
      "AB-",
      "B+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Pandit General Hospital Blood Bank",
    "lat": 14.32773,
    "lng": 74.491531,
    "address": "Sirsi",
    "phone": "0838 2223066",
    "bloodGroups": [
      "B-",
      "AB+",
      "O+",
      "AB-",
      "B+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "The Uttara Kannada Blood Bank and Health Services Society",
    "lat": 14.4292776,
    "lng": 74.4024452,
    "address": "London Mahal, Gujjar Galli",
    "phone": "08382 221851 ",
    "bloodGroups": [
      "A+",
      "O-",
      "A-",
      "AB-",
      "O+",
      "B-",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Shripad Hegde Kadave Institute of Medical Sciences Blood Bank",
    "lat": 14.632385,
    "lng": 74.848338,
    "address": "T.S.S. Hospital",
    "phone": "0838 6221851",
    "bloodGroups": [
      "AB+",
      "B+",
      "O-",
      "A+",
      "B-",
      "O+"
    ]
  },
  {
    "name": "M/s. Indian Red Cross Society Blood Bank Yadgir",
    "lat": 16.752789,
    "lng": 77.138698,
    "address": "Gate no:-3,Government District Hospital Premises",
    "phone": "08473 250355",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "K. V. M. Hospital Blood Bank",
    "lat": 9.667112,
    "lng": 76.339569,
    "address": "P.B. No. 30, Chertala",
    "phone": "0477 2812228",
    "bloodGroups": [
      "O-",
      "O+",
      "B+",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Woman and Child Hospital Blood Bank",
    "lat": 9.4637103,
    "lng": 76.3702515,
    "address": "Beach bazar",
    "phone": "0477 2251151",
    "bloodGroups": [
      "AB+",
      "O+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "M/s. Sanjivani Multispeciality Hospital Blood Bank",
    "lat": 9.259447,
    "lng": 76.596252,
    "address": "A unit of GIDS Enterprises Private Limited, Alacode, Kollakadavu Post, Cheriyanad, Chengannur, Alappuzha",
    "phone": "0479 2350030",
    "bloodGroups": [
      "A+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Century Hospital Blood Bank",
    "lat": 9.304895,
    "lng": 76.63545,
    "address": "Mulakuzha",
    "phone": "0479 2468710",
    "bloodGroups": [
      "AB-",
      "A-",
      "O-",
      "O+",
      "B-",
      "B+",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Sacred Heart Hospital Blood Bank",
    "lat": 9.662125,
    "lng": 76.338902,
    "address": "Green Garden",
    "phone": "0478 2822337",
    "bloodGroups": [
      "AB+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "V. S. M. Hospital Blood Bank",
    "lat": 9.247819,
    "lng": 76.521093,
    "address": "Building No. XIV/368, Thattarambalam",
    "phone": "0479 2304222",
    "bloodGroups": [
      "A+",
      "AB+",
      "B+",
      "O-",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "T. D. Medical College Hospital Blood Bank Alappuzha ",
    "lat": 9.416254,
    "lng": 76.347601,
    "address": "Vandanam",
    "phone": "0477 2282709",
    "bloodGroups": [
      "O-",
      "A+",
      "B-",
      "A-",
      "O+"
    ]
  },
  {
    "name": "M/s. Rajagiri Healthcare and Education Trust Blood Bank",
    "lat": 10.087575,
    "lng": 76.388062,
    "address": "Changamveli, Aluva, Ernakulam",
    "phone": "0484 6655618",
    "bloodGroups": [
      "O-",
      "B+",
      "B-",
      "AB+",
      "A-",
      "O+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Regional Blood Transfusion Centre - District Hospital",
    "lat": 10.105151,
    "lng": 76.355191,
    "address": "Railway Station Road, Periyar Nagar",
    "phone": "0484 2625101",
    "bloodGroups": [
      "O+",
      "O-",
      "A-",
      "B-",
      "AB+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Carmel Hospital Blood Bank",
    "lat": 10.090627,
    "lng": 76.362146,
    "address": "Ashokapuram",
    "phone": "0484 2625346",
    "bloodGroups": [
      "A+",
      "B+",
      "A-",
      "B-",
      "AB+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Little Flower Hospital Blood Bank",
    "lat": 10.190395,
    "lng": 76.39029,
    "address": "M. G. Road",
    "phone": "0484 3096666",
    "bloodGroups": [
      "A-",
      "B-"
    ]
  },
  {
    "name": "Aster Medicity - Aster DM Healthcare Private Limited Blood Bank",
    "lat": 10.043946,
    "lng": 76.277515,
    "address": "IX/475 L, Kuttysahib Road, Near Kothad Bridge, South Chittoor ",
    "phone": "0484 2373434",
    "bloodGroups": [
      "AB+",
      "A-",
      "O-",
      "B-",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "General Hospital Blood Bank ",
    "lat": 9.971979,
    "lng": 76.281693,
    "address": "Hospital Road",
    "phone": "0484 2366426, 0484 2625101, 0484 2386000",
    "bloodGroups": [
      "O+",
      "B+",
      "A-",
      "A+",
      "B-",
      "O-",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "INHS Sanjeevini Naval Base Blood Bank",
    "lat": 9.946756,
    "lng": 76.282561,
    "address": "Willingdon Island",
    "phone": "0484 2662366",
    "bloodGroups": [
      "A+",
      "B-",
      "O+",
      "O-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "IMA Voluntary Donor Blood Bank",
    "lat": 10.01486,
    "lng": 76.303466,
    "address": "T. D. Road",
    "phone": "0484 2361549, 0484 2350522",
    "bloodGroups": [
      "AB+",
      "AB-",
      "O+",
      "A+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Lisie Hospital Blood Bank",
    "lat": 9.988224,
    "lng": 76.288097,
    "address": "Lisie Medical Institution",
    "phone": "0484 2400812, 0484 2401817",
    "bloodGroups": [
      "A+",
      "O-"
    ]
  },
  {
    "name": "Malankara Orthodox Syrian Church Medical Mission Hospital Blood Bank",
    "lat": 9.983305,
    "lng": 76.474382,
    "address": "Kolencherry",
    "phone": "0484 3055555",
    "bloodGroups": [
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Amritha Institute of Medical Sciences Research Centre Blood Bank",
    "lat": 10.033082,
    "lng": 76.293881,
    "address": "",
    "phone": "0484 4001234",
    "bloodGroups": [
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Medical Trust Hospital Blood Bank",
    "lat": 9.964196,
    "lng": 76.287884,
    "address": "M.G.Road, Pallimukku",
    "phone": "0484 2358001",
    "bloodGroups": [
      "AB+",
      "A+",
      "A-",
      "O+",
      "AB-",
      "O-",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Government Medical College Ernakulam Blood Bank",
    "lat": 10.05335,
    "lng": 76.354918,
    "address": "HMT Colony Post",
    "phone": "0484 2754813",
    "bloodGroups": [
      "AB-",
      "A-",
      "B-"
    ]
  },
  {
    "name": "P. V. S. Memorial Hospital Limited Blood Bank",
    "lat": 9.993389,
    "lng": 76.291263,
    "address": "NH Road, Next to Gokulam Park",
    "phone": "0484 4182888",
    "bloodGroups": [
      "O-",
      "AB-",
      "O+",
      "A-",
      "A+",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Samaritan Hospital Blood Bank",
    "lat": 10.043927,
    "lng": 76.397584,
    "address": "Pazhanganad",
    "phone": "0484 2680511, 0484 2680516",
    "bloodGroups": [
      "A-",
      "B+",
      "B-",
      "O-",
      "O+",
      "AB+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Lourdes Hospital Blood Bank",
    "lat": 10.006644,
    "lng": 76.277863,
    "address": "Pachalam",
    "phone": "0484 4123456",
    "bloodGroups": [
      "B+",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Sunrise Institute of Medical Sciences Private Limited Blood Bank",
    "lat": 10.025327,
    "lng": 76.338945,
    "address": "Sea Port Air Port Road",
    "phone": "0484 4160000",
    "bloodGroups": [
      "AB-",
      "B-",
      "O+",
      "O-",
      "B+",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Devamatha Hospital Blood Bank",
    "lat": 9.866189,
    "lng": 76.594952,
    "address": "",
    "phone": "0485 2252271",
    "bloodGroups": [
      "A+",
      "AB+",
      "AB-",
      "A-",
      "B-",
      "O+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Mar Baselius Medical Mission Hospital Blood Bank",
    "lat": 10.064487,
    "lng": 76.622272,
    "address": "NH49, Near Post Office",
    "phone": "0485 2822203",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Saint Joseph Hospital Blood Bank",
    "lat": 10.012211,
    "lng": 76.323922,
    "address": "Dharmagiri",
    "phone": "0485 2862391",
    "bloodGroups": [
      "B+",
      "O-",
      "B-",
      "A+",
      "AB-",
      "O+",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Lakeshore HospitalandResearch Centre Limited Blood Bank",
    "lat": 9.918926,
    "lng": 76.318973,
    "address": "Nettoor",
    "phone": "0484 2701033",
    "bloodGroups": [
      "B+",
      "O+",
      "A-",
      "AB+",
      "O-",
      "A+",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Nirmala Medical Center Blood Bank",
    "lat": 9.982197,
    "lng": 76.585123,
    "address": "Kizhakkekara",
    "phone": "0485 2835343",
    "bloodGroups": [
      "AB-",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Sree Narayana Institute of Medical Sciences Blood Bank",
    "lat": 10.156697,
    "lng": 76.282305,
    "address": "Chalakka",
    "phone": "0484 2479199, 0484 2573023",
    "bloodGroups": [
      "B-",
      "O+",
      "A-",
      "O-",
      "AB+",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Sanjoe Hospital Blood Bank",
    "lat": 10.114174,
    "lng": 76.472666,
    "address": "A. M. Road",
    "phone": "0484 2522251",
    "bloodGroups": [
      "AB-",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Morning Star Medical Centre Blood Bank",
    "lat": 10.011876,
    "lng": 76.958497,
    "address": "Nazareth Hill",
    "phone": "04864 222114",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Saint Johns Hospital Blood Bank",
    "lat": 9.746856,
    "lng": 76.110248,
    "address": "",
    "phone": "04868 272239",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Mundakkayam Medical Trust (M.M.T.) Hospital Blood Bank ",
    "lat": 9.535157,
    "lng": 76.908953,
    "address": "",
    "phone": "04869 280356",
    "bloodGroups": [
      "B+",
      "A+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Tata Tea Limited General Hospital Blood Bank",
    "lat": 10.088585,
    "lng": 76.05619,
    "address": "",
    "phone": "",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Alphonsa Hospital Blood Bank",
    "lat": 9.665029,
    "lng": 77.158547,
    "address": "Annakara, SH 19",
    "phone": "04868 263873",
    "bloodGroups": [
      "O-",
      "O+",
      "AB-",
      "B+",
      "AB+",
      "A-",
      "A+",
      "B-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 9.848086,
    "lng": 76.960597,
    "address": "",
    "phone": "0486 2232474",
    "bloodGroups": [
      "B-",
      "O+",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Holy Family Hospital Blood Bank",
    "lat": 9.912319,
    "lng": 76.733924,
    "address": "Muthalakodam",
    "phone": "04862 222231",
    "bloodGroups": [
      "A+",
      "B+",
      "O+",
      "O-",
      "AB-",
      "B-",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "I. M. A. Blood Bank Society",
    "lat": 9.894113,
    "lng": 76.708945,
    "address": "Thodupuzha Town Road",
    "phone": "0486 2329400, 0486 2221237",
    "bloodGroups": [
      "A+",
      "B+",
      "O-",
      "AB+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "M/s. Al-Azhar Medical College & Super Speciality Hospital Blood Bank",
    "lat": 9.940275,
    "lng": 76.721012,
    "address": "Building No. IV/305/A, Ezhalloor Post, Thodupuzha, Idukki",
    "phone": "04862 223000",
    "bloodGroups": [
      "B+",
      "A+"
    ]
  },
  {
    "name": "Sara Memorial Medical laboratory and Blood Bank",
    "lat": 11.7494919,
    "lng": 75.5229777,
    "address": " Brigade Centre Fort Road",
    "phone": "0497 2767368",
    "bloodGroups": [
      "O-",
      "AB+",
      "B+",
      "AB-",
      "A-",
      "B-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Kannur Medical college and Hospital (Prestige educational Trust) Blood Bank",
    "lat": 11.875772,
    "lng": 75.499253,
    "address": "Chovva Mathanur Road",
    "phone": "0497 2855001",
    "bloodGroups": [
      "A+",
      "B+",
      "AB+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Saint Martin De Porres Hospital Blood Bank",
    "lat": 11.994674,
    "lng": 75.31285,
    "address": "",
    "phone": "0497 2860223, 0497 2860420",
    "bloodGroups": [
      "AB+",
      "AB-",
      "O-",
      "B-",
      "A-",
      "O+",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Cannannore Co-operative Hospital Society Blood Bank",
    "lat": 11.764148,
    "lng": 75.479831,
    "address": "Talap",
    "phone": "0490 2341604, 0490 2341035, 0490 2341036",
    "bloodGroups": [
      "B+",
      "B-",
      "O+",
      "A-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 11.861216,
    "lng": 75.370639,
    "address": "Railway Road",
    "phone": "0497 2733500",
    "bloodGroups": [
      "O+",
      "A-",
      "B-",
      "AB-",
      "B+",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Kerala State Co-operative Hospital Complex and Centre for Advanced Medical Services Limited",
    "lat": 12.072392,
    "lng": 75.294333,
    "address": "Pariyaram MC Campus Road",
    "phone": "0497 2808080, 0497 2808111",
    "bloodGroups": [
      "B+",
      "A-"
    ]
  },
  {
    "name": "The Payyannur Co-operative Hospital Society Limited",
    "lat": 12.106236,
    "lng": 75.209538,
    "address": "No.C.1487, South Bazar",
    "phone": "04985 207372, 04985 207373, 04985 204051",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Josgiri Hospital Blood Bank",
    "lat": 11.759133,
    "lng": 75.478803,
    "address": "Thalasherry, Kannur",
    "phone": "0490 2341130",
    "bloodGroups": [
      "AB+",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Tellichery Co-operative Hospital Blood Bank",
    "lat": 11.748758,
    "lng": 75.486599,
    "address": "Palissery",
    "phone": "0490 2325306",
    "bloodGroups": [
      "O-",
      "AB-",
      "B+",
      "O+",
      "A-",
      "A+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "General Hospital Blood Bank",
    "lat": 11.747531,
    "lng": 75.487227,
    "address": "",
    "phone": "0490 5326050",
    "bloodGroups": [
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Malabar Cancer Centre Society Blood Bank",
    "lat": 11.749387,
    "lng": 75.523483,
    "address": "Moozhikkara Post,",
    "phone": "0490 2355881, 0490 2355981",
    "bloodGroups": [
      "O-",
      "O+",
      "A-",
      "AB+",
      "B+",
      "A+"
    ]
  },
  {
    "name": "District Hospital Blood Bank,Kanhangad",
    "lat": 12.314687,
    "lng": 75.105095,
    "address": "Chammattam Vayal, Bella (PO)",
    "phone": "0467 2204333",
    "bloodGroups": [
      "AB+",
      "O-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Medical diagnostic Centre Blood Bank",
    "lat": 12.312192,
    "lng": 75.093469,
    "address": "",
    "phone": "0467 2209712",
    "bloodGroups": [
      "B+",
      "AB+",
      "A-",
      "A+",
      "O+",
      "B-",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Community Health Centre (T.H.Q) - General Hospital Blood Bank",
    "lat": 12.503397,
    "lng": 74.991726,
    "address": "",
    "phone": "0499 4225580",
    "bloodGroups": [
      "A+",
      "O-",
      "A-",
      "AB-",
      "B+",
      "O+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Saint Joseph Hospital Blood Bank",
    "lat": 8.929263,
    "lng": 76.91794,
    "address": "Anchal Post",
    "phone": "0475 2271341, 0475 2271342",
    "bloodGroups": [
      "B-",
      "O-",
      "AB+",
      "B+",
      "O+",
      "A+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 8.885954,
    "lng": 76.585798,
    "address": "Chinnakada",
    "phone": "0474 2768667, 0474 2798999",
    "bloodGroups": [
      "A+",
      "B+",
      "B-",
      "A-",
      "O-",
      "O+",
      "AB+"
    ]
  },
  {
  
  "name": "Bishop Benziger Hospital Blood Bank",
    "lat": 8.929265,
    "lng": 76.91794,
    "address": "Beach Road",
    "phone": "0474 2768204",
    "bloodGroups": [
      "O-",
      "O+"
    ]
  },
  {
    "name": "I.M.A.Blood Bank",
    "lat": 8.895879,
    "lng": 76.593227,
    "address": "Ist Floor, IMA Centre, Ashramam",
    "phone": "0474 2766551",
    "bloodGroups": [
      "B+",
      "A+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "S.N.Trust Medical Mission Sankar Memorial Hospital Blood Bank",
    "lat": 8.889845,
    "lng": 76.598524,
    "address": "Kollam",
    "phone": "0474 3918424",
    "bloodGroups": [
      "A+",
      "O-",
      "A-",
      "B+",
      "AB-",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Upasana Hospital Blood Bank",
    "lat": 8.891151,
    "lng": 76.600269,
    "address": "Cantonment, North Ward",
    "phone": "04742 762888",
    "bloodGroups": [
      "AB+",
      "A+",
      "A-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Taluk Head Quarters Hospital Blood Bank",
    "lat": 9.004354,
    "lng": 76.775632,
    "address": "",
    "phone": "0474 2452610",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Holy Cross Hospital Blood Bank",
    "lat": 8.861805,
    "lng": 76.673304,
    "address": "",
    "phone": "0474 2530121",
    "bloodGroups": [
      "AB-",
      "O+",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Padmavathy Medical Foundation Blood Bank",
    "lat": 9.053305,
    "lng": 76.633027,
    "address": "Sasthamkotta Road",
    "phone": "0476 2831408",
    "bloodGroups": [
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Azeezia Medical College Blood Bank",
    "lat": 8.889894,
    "lng": 76.739784,
    "address": "Meeyanoor Road",
    "phone": "0474 3069200",
    "bloodGroups": [
      "A-",
      "B+",
      "AB+",
      "O+",
      "B-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Quilon Medical Trust Blood Bank Kollam",
    "lat": 8.875477,
    "lng": 76.64364,
    "address": "N.H. Bypass Road, Umayanalloor",
    "phone": "0474 3069999, 0474 2729393",
    "bloodGroups": [
      "O-",
      "AB+",
      "B-",
      "A-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "M/s. Employee&#39;s State Insurance Corporation (ESIC) Blood Bank",
    "lat": 8.81078,
    "lng": 76.749075,
    "address": "Medical College Hospital, Diagnostic Block, Building No. KP / VI/ 952 - H, Paripally, Kollam",
    "phone": "9447266839",
    "bloodGroups": [
      "B+",
      "O-"
    ]
  },
  {
    "name": "Saint Joseph Hospital Blood Bank",
    "lat": 8.950688,
    "lng": 76.917924,
    "address": "Pathanapuram",
    "phone": "0475 2352333",
    "bloodGroups": [
      "B+",
      "A-",
      "O+",
      "A+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 9.019172,
    "lng": 76.924716,
    "address": "Govt. Blood Bank \r\nThaluk hospital \r\nPunalur\r\n\r\n\r\n",
    "phone": "0475 2222702, 0475 2228702",
    "bloodGroups": [
      "B-",
      "A-",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Rotary Blood Bank",
    "lat": 9.593201,
    "lng": 76.521811,
    "address": "Mangad Building",
    "phone": "0481 2567403",
    "bloodGroups": [
      "A-",
      "B-",
      "A+",
      "AB+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Immaculate Heart of Mary Hospital Blood Bank",
    "lat": 9.70387,
    "lng": 76.720484,
    "address": "Bharanganam, Palai",
    "phone": "0472 2236158",
    "bloodGroups": [
      "A+",
      "A-",
      "B-",
      "AB+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Mary Queens Mission Hospital Blood Bank",
    "lat": 9.558106,
    "lng": 76.813888,
    "address": "Erumely Road",
    "phone": "0482 8202460",
    "bloodGroups": [
      "AB-",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Little Lourde Mission Hospital Blood Bank",
    "lat": 9.683538,
    "lng": 76.612118,
    "address": "",
    "phone": "0482 2254156",
    "bloodGroups": [
      "B+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 9.590064,
    "lng": 76.526019,
    "address": "",
    "phone": "0481 2563611",
    "bloodGroups": [
      "AB-",
      "B-",
      "B+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Medical College Hospital Blood Bank",
    "lat": 9.631991,
    "lng": 76.5188,
    "address": "Gandhi Nagar S.O",
    "phone": "0481 2592220",
    "bloodGroups": [
      "B+",
      "A-",
      "AB+",
      "O+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "M/s. Bharath Charitable Hospital Society Blood Bank",
    "lat": 9.589306,
    "lng": 76.519311,
    "address": "Azad Lane, Kottayam",
    "phone": "0481 2582947",
    "bloodGroups": [
      "B-",
      "B+",
      "AB-",
      "A+",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Saint Thomas Hospital Blood Bank",
    "lat": 7.475639,
    "lng": 76.547201,
    "address": "Chettipuzha",
    "phone": "0481 2721797",
    "bloodGroups": [
      "A-",
      "B-",
      "AB+",
      "AB-",
      "A+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "MUM Hospital Blood Bank",
    "lat": 9.810623,
    "lng": 76.576836,
    "address": "",
    "phone": "0482 2242222",
    "bloodGroups": [
      "AB+",
      "B-",
      "AB-",
      "B+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Holy Ghost Mission Hospital Blood Bank",
    "lat": 9.757246,
    "lng": 76.499785,
    "address": "Muttuchira",
    "phone": "0482 9283202",
    "bloodGroups": [
      "O-",
      "A+",
      "AB-",
      "B-",
      "AB+",
      "O+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "S. H. Medical Centre Blood Bank",
    "lat": 9.594305,
    "lng": 76.529494,
    "address": "Nagampadam",
    "phone": "0481 2562240",
    "bloodGroups": [
      "A+",
      "A-",
      "AB+",
      "B+",
      "O+",
      "B-",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Carmel Medical Centre Blood Bank",
    "lat": 10.091904,
    "lng": 76.265596,
    "address": "Arattu Kadavu Road, Thirumuppam",
    "phone": "0482 2212785",
    "bloodGroups": [
      "B-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Marian Medical Centre Blood Bank",
    "lat": 9.706013,
    "lng": 76.662387,
    "address": "Arunapuram",
    "phone": "0482 2215519",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Believers Church Medical College Hospital Blood Bank",
    "lat": 9.416683,
    "lng": 76.575292,
    "address": "M/s. Believers Quarters Theological Seminary Building Number, XXXII/402(7), Kuttapuzha Post, Pathanamthitta\r\n",
    "phone": "0469 3023100",
    "bloodGroups": [
      "O-",
      "AB+",
      "O+",
      "A-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Velankanni Matha Hospital Private Limited Blood Bank",
    "lat": 9.64845,
    "lng": 76.549562,
    "address": "Building No X/387 N",
    "phone": "0481 2790920",
    "bloodGroups": [
      "B+",
      "B-"
    ]
  },
  {
    "name": "Caritas Hospital Blood Bank",
    "lat": 9.645257,
    "lng": 76.549907,
    "address": "M. C. Road",
    "phone": "0481 2790025, 0481 2790029",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Indo American Hospital - Brainand Spine Centre Blood Bank",
    "lat": 9.791175,
    "lng": 76.377084,
    "address": "Chemmanakari",
    "phone": "",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "P. V. S. Hospital Private Limited Blood Bank",
    "lat": 11.242707,
    "lng": 75.782934,
    "address": "",
    "phone": "0495 2705045",
    "bloodGroups": [
      "AB-",
      "O+"
    ]
  },
  {
    "name": "MMC Hospital Blood Bank",
    "lat": 11.433739,
    "lng": 75.775293,
    "address": "Modakkallur",
    "phone": "0496 2701666",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Metro International Cardiac Centre Blood Bank",
    "lat": 11.245438,
    "lng": 75.836104,
    "address": "Building No. 03/1020 A-M, Basement Floor (B1), Thondayad Bypass Road, Guruvayoor Appan College ",
    "phone": "0495 6615555",
    "bloodGroups": [
      "A-",
      "AB+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Mar Gregorious Diocese Memorial Muthoot Hospital Blood Bank",
    "lat": 9.3258,
    "lng": 76.539421,
    "address": "",
    "phone": "",
    "bloodGroups": [
      "A-",
      "O-",
      "B-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Kozhikode District Co-operative Hospital Blood Bank",
    "lat": 11.276572,
    "lng": 75.784673,
    "address": "Eranhipalam",
    "phone": "0495 2766820",
    "bloodGroups": [
      "AB-",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Government Woman and Child Hospital Blood Bank",
    "lat": 11.250764,
    "lng": 75.78275,
    "address": "",
    "phone": "04952 721998",
    "bloodGroups": [
      "A-",
      "O-",
      "A+",
      "AB-",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Government General Hospital Blood Bank",
    "lat": 11.256595,
    "lng": 75.770942,
    "address": "Calicut Beach S.O",
    "phone": "0495 2365367, 0495 2365917",
    "bloodGroups": [
      "B-",
      "O-",
      "O+",
      "B+",
      "A-",
      "AB-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Medical College Hospital Blood Bank",
    "lat": 11.271763,
    "lng": 75.836468,
    "address": "",
    "phone": "04952 351134",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Baby Memorial Hospital Blood Bank",
    "lat": 11.259595,
    "lng": 75.792216,
    "address": "Indira Gandhi Road",
    "phone": "0495 2777777",
    "bloodGroups": [
      "B-",
      "AB-",
      "O+",
      "A-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Fathima Hospital Blood Bank",
    "lat": 11.261961,
    "lng": 75.780087,
    "address": "Bank Road",
    "phone": "0495 2766630, 0495 2766640",
    "bloodGroups": [
      "B-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "K M C T Hospital Blood Bank",
    "lat": 11.325893,
    "lng": 75.971356,
    "address": "",
    "phone": "0495 2293500, 0495 2720466",
    "bloodGroups": [
      "AB+",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Malabar Institute of Medical Sciences Blood Bank",
    "lat": 11.245745,
    "lng": 75.797985,
    "address": "",
    "phone": "0483 2807000",
    "bloodGroups": [
      "O+",
      "AB-",
      "O-",
      "A-",
      "A+"
    ]
  },
  {
    "name": "National Hospital Blood Bank",
    "lat": 11.259485,
    "lng": 75.781234,
    "address": "",
    "phone": "0495 2723061",
    "bloodGroups": [
      "O+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "IQRAA Hospital Blood Bank",
    "lat": 11.286398,
    "lng": 75.797483,
    "address": "",
    "phone": "0495 2379100",
    "bloodGroups": [
      "AB+",
      "O+",
      "A-",
      "A+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Nirmala Hospital Blood Bank",
    "lat": 11.291596,
    "lng": 75.823253,
    "address": "",
    "phone": "0495 2730211",
    "bloodGroups": [
      "O-",
      "AB-",
      "B-",
      "A-",
      "AB+",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Saint Joseph Hospital Blood Bank",
    "lat": 11.3311361,
    "lng": 75.9836769,
    "address": "Agastianmoozhi",
    "phone": "0495 2298536, 0495 2297492, 0495 2295024",
    "bloodGroups": [
      "A-",
      "B+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Santhi Hospital Blood Bank",
    "lat": 11.362673,
    "lng": 75.964611,
    "address": "Omaserry",
    "phone": "0495 2282550",
    "bloodGroups": [
      "O-",
      "B-",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Badagara sahakarana Asupathri Limited Blood Bank",
    "lat": 11.589708,
    "lng": 75.595256,
    "address": "Edapally-Panvel Highway, Narayana Nagar",
    "phone": "0496 2520600",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Edappal Hospital Private Limited Blood Bank",
    "lat": 10.782696,
    "lng": 76.011078,
    "address": "",
    "phone": "0494 2660200, 0494 2680788",
    "bloodGroups": [
      "A-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Sree Valsam Institute of Medical Sciences Blood Bank",
    "lat": 10.765337,
    "lng": 76.007335,
    "address": "Naduvattam, Kololamba",
    "phone": "0494 2661000, 0494 2690696",
    "bloodGroups": [
      "AB-",
      "A-",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Malabar Institute of Medical Sciences Blood Bank - Malappuram",
    "lat": 10.995804,
    "lng": 75.994034,
    "address": "",
    "phone": "0483 2807000, 0483 2807888",
    "bloodGroups": [
      "O-",
      "B+",
      "B-",
      "AB+",
      "A+",
      "A-",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Almas Hospital Blood Bank - Chankuvatty",
    "lat": 11.00015,
    "lng": 75.991133,
    "address": "",
    "phone": "0483 2748536,  0483 2748539",
    "bloodGroups": [
      "AB+",
      "B-",
      "A+",
      "B+",
      "A-",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Orchid Institute of Health Care and Research Private Limited Blood Bank",
    "lat": 11.051502,
    "lng": 76.06974,
    "address": "PB NO:212, Down Hill\r\nP.O.Malappuram",
    "phone": "0483-2734279, 2736369, 2736569",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank Manjeri",
    "lat": 11.116071,
    "lng": 76.120541,
    "address": "",
    "phone": "0483 2766880",
    "bloodGroups": [
      "AB+",
      "O+",
      "O-",
      "A+",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Korambayil Hospital Blood Bank",
    "lat": 11.123065,
    "lng": 76.125653,
    "address": "",
    "phone": "0483 2766573, 0483 2766822",
    "bloodGroups": [
      "A-",
      "B-",
      "B+",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Al-Shifa Hospital Private Limited",
    "lat": 10.984799,
    "lng": 76.223878,
    "address": "",
    "phone": "04933 299160, 04933 299103",
    "bloodGroups": [
      "A+",
      "B-",
      "AB-",
      "B+",
      "O-"
    ]
  },
  {
    "name": "M. E. S. Medical College Blood Bank",
    "lat": 10.957239,
    "lng": 76.175673,
    "address": "",
    "phone": "04933 298300, 04933 258306",
    "bloodGroups": [
      "AB+",
      "O+",
      "B-",
      "O-",
      "A-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Government Hospital -Taluk Head Quarters Hospital Blood Bank ",
    "lat": 10.974255,
    "lng": 76.231942,
    "address": "",
    "phone": "0493 3226505 ",
    "bloodGroups": [
      "O-",
      "B-",
      "AB-",
      "AB+",
      "A+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Taluk Head Quarters Hospital",
    "lat": 10.4458201,
    "lng": 75.921608,
    "address": "",
    "phone": "0494 2422044",
    "bloodGroups": [
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Karuna Medical College Hospital Blood Bank",
    "lat": 10.680366,
    "lng": 76.775773,
    "address": "IV/931, Vilayodi, Chittur",
    "phone": "04923 221792",
    "bloodGroups": [
      "O+",
      "A-",
      "A+",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Mother Care Hospital Blood Bank",
    "lat": 10.983437,
    "lng": 76.423227,
    "address": "Vattambalam",
    "phone": "04924 232600, 04924 232888",
    "bloodGroups": [
      "B-",
      "A+",
      "O+",
      "AB+",
      "AB-",
      "O-",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Valluvanad Hospital Blood Bank",
    "lat": 10.774578,
    "lng": 76.360532,
    "address": "",
    "phone": "0466 2244405",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "District Hospital",
    "lat": 10.769198,
    "lng": 76.658382,
    "address": "",
    "phone": "0491 2534524",
    "bloodGroups": [
      "A-",
      "A+",
      "O+",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Palakkad Blood Bank",
    "lat": 10.761629,
    "lng": 76.655046,
    "address": "5/373, I Floor, Soorya Enclave, Opposite Palat Hospital,\r\nCivil Station Road",
    "phone": "0491 2505066",
    "bloodGroups": [
      "O-",
      "A-"
    ]
  },
  {
    "name": "Holy Cross Hospital Blood Bank",
    "lat": 9.161659,
    "lng": 76.724452,
    "address": "Adoor",
    "phone": "04734 2282466",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Lifeline Super Speciality Hospital Blood Bank",
    "lat": 9.163442,
    "lng": 76.706321,
    "address": "Building No XII/804 J, 14th Mile, Melood ",
    "phone": "04734 223377",
    "bloodGroups": [
      "B+",
      "O+",
      "O-",
      "AB-",
      "AB+",
      "B-",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Mar Gregorious Memorial Muthoot Medical Centre Blood Bank",
    "lat": 9.337904,
    "lng": 76.710744,
    "address": "",
    "phone": "0468 2314000",
    "bloodGroups": [
      "O-",
      "O+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Poyanil Hospital Blood Bank",
    "lat": 9.336697,
    "lng": 76.707947,
    "address": "Kozhencherry, Pathanamthitta",
    "phone": "0468 2310600",
    "bloodGroups": [
      "O+",
      "AB-",
      "B-",
      "A+",
      "A-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Fellowship Mission Hospital Blood Bank",
    "lat": 9.371495,
    "lng": 76.655618,
    "address": "",
    "phone": "0469 2664249, 0469 2664760",
    "bloodGroups": [
      "A-",
      "B-",
      "O-",
      "A+",
      "O+",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Archana Hospital Blood Bank Pandalam",
    "lat": 9.220068,
    "lng": 76.679791,
    "address": "",
    "phone": "",
    "bloodGroups": [
      "A-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Chithra Hospital Blood Bank",
    "lat": 9.465857,
    "lng": 76.778869,
    "address": "",
    "phone": "04734 2252865 (NR)",
    "bloodGroups": [
      "B-",
      "AB-"
    ]
  },
  {
    "name": "General Hospital Blood Bank ",
    "lat": 9.265822,
    "lng": 76.782358,
    "address": "",
    "phone": "0468 2222364",
    "bloodGroups": [
      "O-",
      "O+"
    ]
  },
  {
    "name": "Menathottam Hospital Blood Bank",
    "lat": 9.381963,
    "lng": 76.77424,
    "address": "Angadi, Ranni",
    "phone": "04735 226227",
    "bloodGroups": [
      "A+",
      "B-"
    ]
  },
  {
    "name": "Pushpagiri Hospital Blood Bank",
    "lat": 9.380994,
    "lng": 76.580962,
    "address": "Thiruvalla",
    "phone": "0469 270 0755",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Thiruvalla Medical Mission Hospital Blood Bank",
    "lat": 9.393924,
    "lng": 76.578423,
    "address": "Post Box No. 74",
    "phone": "0469 2626096, 0469 2626000, 0469 2626262",
    "bloodGroups": [
      "A-",
      "AB-",
      "O-",
      "A+",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Taluk Head Quarter Hospital Blood Bank",
    "lat": 8.661363,
    "lng": 76.786533,
    "address": "",
    "phone": "0470 2646565",
    "bloodGroups": [
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Dr. Somervel CSI Mission Hospital Blood Bank",
    "lat": 8.391475,
    "lng": 77.173573,
    "address": "",
    "phone": "0471 2250506",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "NIMS Hospital Blood Bank",
    "lat": 8.30492,
    "lng": 76.5434,
    "address": "Aralumoodu",
    "phone": "0471 3951111",
    "bloodGroups": [
      "O+",
      "B+"
    ]
  },
  {
    "name": "General Hospital Blood Bank",
    "lat": 8.500115,
    "lng": 76.94234,
    "address": "",
    "phone": "0471 2307874",
    "bloodGroups": [
      "B+",
      "A+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Medical College Hospital Blood Bank",
    "lat": 8.604603,
    "lng": 76.93258,
    "address": "",
    "phone": "0471 2528230",
    "bloodGroups": [
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Regional Cancer Centre Blood Bank",
    "lat": 8.520478,
    "lng": 76.924243,
    "address": "Medical College Campus",
    "phone": "0471 2443128, 0471 2522222",
    "bloodGroups": [
      "A+",
      "B+",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Sri Chitra Thirunal Institute of Medical Science and Technology Blood Bank",
    "lat": 8.521055,
    "lng": 76.926493,
    "address": "Chalakkuzhi",
    "phone": "0471 2524477, 0471 2524406",
    "bloodGroups": [
      "B-",
      "AB+",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Women and Children Hospital Blood Bank",
    "lat": 8.487383,
    "lng": 76.956904,
    "address": "Thycaud",
    "phone": "0471 2323457",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Ananthapuri Hospital and Research Institute Blood Bank",
    "lat": 8.486539,
    "lng": 76.926988,
    "address": "NH Bypass, Chacka",
    "phone": "0471 2506565",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Cosmopolitan Hospitals Private Hospital Blood Bank",
    "lat": 8.515748,
    "lng": 76.935768,
    "address": "",
    "phone": "0471 2521188",
    "bloodGroups": [
      "O+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Kerala Institute of Medical Sciences Blood Bank",
    "lat": 8.513628,
    "lng": 76.909544,
    "address": "Anayara, ThiruvAnanthapuram",
    "phone": "0471 3041222",
    "bloodGroups": [
      "A+",
      "A-"
    ]
  },
  {
    "name": "PRS Hospital Private Limited Blood Bank",
    "lat": 8.480729,
    "lng": 76.959445,
    "address": "Killipalam",
    "phone": "0471 2913000",
    "bloodGroups": [
      "AB-",
      "AB+",
      "O+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Sivagiri SreeNarayana Medical Mission Blood Bank",
    "lat": 8.729608,
    "lng": 76.733554,
    "address": "",
    "phone": "0470 2602249",
    "bloodGroups": [
      "AB+",
      "B-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Sree Uthradam Thirunal Hospital Blood Bank",
    "lat": 8.599623,
    "lng": 76.969593,
    "address": "Pattom",
    "phone": "0471 4077777, 0471 4077194",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Superior Blood Bank",
    "lat": 8.4935113,
    "lng": 76.9474123,
    "address": "Gandhari Amman Koil Street",
    "phone": "0471 2334456",
    "bloodGroups": [
      "A-",
      "B-",
      "AB-",
      "A+",
      "O-",
      "B+",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "M/s. S R Super Speciality Hospital Blood Bank",
    "lat": 8.7081618,
    "lng": 76.7316653,
    "address": "Building No 09/1109, 4th Floor, Akathumuri, Vennicode P O, Varkala ",
    "phone": "0470 2611176",
    "bloodGroups": [
      "AB-",
      "O+"
    ]
  },
  {
    "name": "S U T Royal Hospital Blood Bank",
    "lat": 8.516322,
    "lng": 76.940358,
    "address": "Kochullur",
    "phone": "0471 4177777",
    "bloodGroups": [
      "A+",
      "B-",
      "O+",
      "O-"
    ]
  },
  {
    "name": "M/s. Ruckmoni Memorial Devi Hospital Blood Bank",
    "lat": 8.4482986,
    "lng": 77.127416,
    "address": "Ponnambi, Vellarada, Thiruvananthapuram",
    "phone": "0471 2242027, 0471 2241017",
    "bloodGroups": [
      "A+",
      "AB-",
      "O+",
      "B-",
      "O-",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Sree Gokulam Medical College and Research Foundation Blood Bank",
    "lat": 8.692755,
    "lng": 76.914675,
    "address": "Aalamthara-Bhoothamadakki Road",
    "phone": "0472 3041234",
    "bloodGroups": [
      "B+",
      "A-"
    ]
  },
  {
    "name": "Thrissur Metropolitan Health Care Private Limited Blood Bank",
    "lat": 10.510405,
    "lng": 76.21034,
    "address": "Koorkenchery",
    "phone": "0487 2425125",
    "bloodGroups": [
      "A-",
      "AB+",
      "B-",
      "AB-",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Amala Cancer Hospital and Research Centre Blood Bank",
    "lat": 10.561896,
    "lng": 76.168745,
    "address": "",
    "phone": "0487 2304000, 0487 2304100",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Saint James Hospital Blood Bank",
    "lat": 10.315567,
    "lng": 76.335422,
    "address": "Anamala, Old Highway",
    "phone": "0480 2710271",
    "bloodGroups": [
      "A+",
      "B-",
      "A-",
      "B+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Saint Josephs Hospital Blood Bank",
    "lat": 10.616859,
    "lng": 76.094656,
    "address": "",
    "phone": "04885 237185",
    "bloodGroups": [
      "O-",
      "B-",
      "B+",
      "AB-",
      "A+",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Mary Immaculate Mission Hospital Blood Bank",
    "lat": 10.508889,
    "lng": 76.057764,
    "address": "Chuvakkad",
    "phone": "0487 2290237",
    "bloodGroups": [
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Modern Medical Blood Bank",
    "lat": 10.233898,
    "lng": 76.194222,
    "address": "Modern Hospital Complex",
    "phone": "0480 3953397",
    "bloodGroups": [
      "O-",
      "B-",
      "A-",
      "AB-",
      "B+",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Elite Mission Hospital Blood Bank",
    "lat": 10.502217,
    "lng": 76.211028,
    "address": "",
    "phone": "0487 2429322, 0487 3011400",
    "bloodGroups": [
      "A-",
      "B-"
    ]
  },
  {
    "name": "Royal Hospital Blood Bank",
    "lat": 10.645883,
    "lng": 76.067384,
    "address": "Guruvayoor road",
    "phone": "04885 222133",
    "bloodGroups": [
      "O-",
      "A-",
      "O+",
      "AB-",
      "B+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Unity Hospital Private Limited Blood Bank",
    "lat": 10.635746,
    "lng": 76.081869,
    "address": "",
    "phone": "04885 222811",
    "bloodGroups": [
      "B-",
      "O-",
      "AB+",
      "O+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Maria Theresa Hospital Blood Bank",
    "lat": 10.289257,
    "lng": 76.277178,
    "address": "",
    "phone": "",
    "bloodGroups": [
      "AB-",
      "O-",
      "A-",
      "B+",
      "O+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Medical College Hospital Blood Bank",
    "lat": 10.630259,
    "lng": 76.202424,
    "address": "Mulangunnathukavu",
    "phone": "0487 2200310",
    "bloodGroups": [
      "O-",
      "O+",
      "AB+",
      "A-",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Mother Hospital Blood Bank",
    "lat": 10.519157,
    "lng": 76.185077,
    "address": "Olarikkara",
    "phone": "0487 2434100, 0487 2361091",
    "bloodGroups": [
      "AB-",
      "A+",
      "B-",
      "A-",
      "O-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Sacred Heart Mission Hospital Blood Bank",
    "lat": 10.349017,
    "lng": 76.242118,
    "address": "Irinjakakuda",
    "phone": "0480 2826545, 0480 2823128",
    "bloodGroups": [
      "B-",
      "AB-",
      "O-",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "West Fort Hitech Hospital Blood Bank",
    "lat": 10.536504,
    "lng": 76.197029,
    "address": "Guruayoor Road",
    "phone": "0487 2388999",
    "bloodGroups": [
      "A+",
      "O+",
      "B+",
      "O-",
      "AB+",
      "B-",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Janakeeya Samithy (Arogyam) I.M.A Blood Bank Complex and Research Centre ",
    "lat": 10.559875,
    "lng": 76.226818,
    "address": "",
    "phone": "0487 2323964, 0487 2320784",
    "bloodGroups": [
      "B+",
      "O+",
      "A-",
      "A+",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank ",
    "lat": 10.522997,
    "lng": 76.217675,
    "address": "Round East, Thrissur",
    "phone": "0487 2427778,  0487 2427383",
    "bloodGroups": [
      "O-",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Aswini Hospital Private Limited Blood Bank",
    "lat": 10.534768,
    "lng": 76.214142,
    "address": "Karunakaran Nambiar Road",
    "phone": "0487 6612345, 0487 2475000",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Bishop Alappat Mission Hospital Blood Bank",
    "lat": 10.395236,
    "lng": 76.164596,
    "address": "Kattoor-Karuvannur Road, Karanchira ",
    "phone": "0480 2670267",
    "bloodGroups": [
      "AB+",
      "O-",
      "A-",
      "O+",
      "B-",
      "A+",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Jubilee Mission Hospital Blood Bank",
    "lat": 10.520189,
    "lng": 76.227996,
    "address": "P.O.Jubilee Mission",
    "phone": "0487 2432200",
    "bloodGroups": [
      "B+",
      "AB+",
      "O-",
      "AB-",
      "A+",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Malankara Orthodox Syrian Church Medical Mission Hospital Blood Bank",
    "lat": 9.983303,
    "lng": 76.474382,
    "address": "Adupooty Hills, Kunnamkulam Chowannur Post",
    "phone": "04885 222944",
    "bloodGroups": [
      "AB-",
      "B-",
      "A+",
      "B+",
      "O-",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Thrichur Heart Hospital Limited Blood Bank",
    "lat": 10.512613,
    "lng": 76.214571,
    "address": "ST Nagar, Kannamkulangara",
    "phone": "0487 2433101",
    "bloodGroups": [
      "B-",
      "A+",
      "O-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "West Fort Hospital Blood Bank Thrissur",
    "lat": 10.524176,
    "lng": 76.201807,
    "address": "",
    "phone": "0487 2382130, 0487 2388783",
    "bloodGroups": [
      "AB+",
      "B+",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "M/s. Ahalia International Foundation Blood Bank",
    "lat": 10.8217479,
    "lng": 75.8820596,
    "address": "Ahalia Arcade , Kuruppam Road, Thrissur",
    "phone": "04923 225555",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "M/s. Leo Hospital Blood Bank",
    "lat": 11.604557,
    "lng": 76.085057,
    "address": "The Managing Partner -  M/s. Leo Hospital, No 881 (3) ",
    "phone": "04936 202550, 04936 202711",
    "bloodGroups": [
      "B-",
      "B+",
      "AB-",
      "O+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 11.800634,
    "lng": 76.001923,
    "address": "District Hospital\r\nMananthavady\r\nWAyanad",
    "phone": "0493 5245026",
    "bloodGroups": [
      "O+",
      "AB+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "D. M. Wayanad Institute of Medical Sciences Blood Bank",
    "lat": 11.559371,
    "lng": 76.160491,
    "address": "Naseera Nagar",
    "phone": "04936 287000",
    "bloodGroups": [
      "B-",
      "A+",
      "O+",
      "A-",
      "B+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Government Taluk Head Quarters Hospital Blood Bank",
    "lat": 11.662543,
    "lng": 76.257414,
    "address": "",
    "phone": "0493 6223920",
    "bloodGroups": [
      "AB-",
      "B-",
      "O-",
      "O+",
      "A+",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 22.184448,
    "lng": 74.211956,
    "address": "District Hospital",
    "phone": "07394 235504",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Ashoknagar Seva Samiti Blood Bank",
    "lat": 18.510632,
    "lng": 73.816224,
    "address": "Bhonsle Complex, Vidisha Road",
    "phone": "07543 222522",
    "bloodGroups": [
      "AB-",
      "B+",
      "O-",
      "A-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "District Hospital Balaghat",
    "lat": 21.818351,
    "lng": 80.182799,
    "address": "District Hospital Balaghat",
    "phone": "7632240799",
    "bloodGroups": [
      "A-",
      "A+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Agrawal Blood Bank",
    "lat": 21.816763,
    "lng": 80.189731,
    "address": "Main Road, Balaghat",
    "phone": "07632 240022",
    "bloodGroups": [
      "A+",
      "AB+",
      "O-",
      "B-",
      "O+",
      "B+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 22.02134,
    "lng": 74.541084,
    "address": "District Hospital ",
    "phone": "07290 222025",
    "bloodGroups": [
      "O+",
      "AB+",
      "O-",
      "AB-",
      "B-",
      "A-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 21.903381,
    "lng": 77.898085,
    "address": "District Hospital",
    "phone": "07141 233250",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Padhar Hospital Blood Bank",
    "lat": 22.055189,
    "lng": 77.86498,
    "address": "Gram Padhar, Betul",
    "phone": "07141 263227, 07141 263228, 07141 263590",
    "bloodGroups": [
      "O-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "WCL Hospital Blood Bank Pathakheda ",
    "lat": 22.125155,
    "lng": 78.142296,
    "address": "WCL Area Hospital, Post, Pathakheda",
    "phone": "07146 270210",
    "bloodGroups": [
      "A+",
      "AB-",
      "B+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 26.566008,
    "lng": 78.782684,
    "address": "District Hospital",
    "phone": "07534 234074",
    "bloodGroups": [
      "B-",
      "O-",
      "AB+",
      "A+",
      "AB-",
      "O+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Chirayu Medical College and Hospital Blood Bank",
    "lat": 23.268916,
    "lng": 77.308073,
    "address": "Bhainsakhedi, Bairagarh",
    "phone": "0755 6679000, 0755 6679101, 0755 6679102, 0755 6679103",
    "bloodGroups": [
      "B+",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Gandhi Medical College Blood Bank",
    "lat": 23.259924,
    "lng": 77.390958,
    "address": "Gandhi Medical College and Hamidia Hospital",
    "phone": "0755 4050148",
    "bloodGroups": [
      "AB+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Bhopal Memorial Hospital and Research Centre Blood Bank",
    "lat": 23.18006,
    "lng": 77.25035,
    "address": "Bhopal Memorial Hospital and Research Centre, Near Karod Chourha, Raisen Bypass Road",
    "phone": "0755 2742212",
    "bloodGroups": [
      "O+",
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 23.229861,
    "lng": 77.417539,
    "address": "J P Hospital, 1250, Hospital Campus, Tulsi Nagar",
    "phone": "0755 2556812",
    "bloodGroups": [
      "B+",
      "A-",
      "AB-",
      "O-",
      "A+",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "IGH Gas Rahat Blood Bank",
    "lat": 23.1549,
    "lng": 77.244677,
    "address": "Indira Gandhi Mahila Evam Bal Chikitsalaya Gas Rahat",
    "phone": "0755 2713100",
    "bloodGroups": [
      "A-",
      "B+",
      "AB-",
      "O-",
      "O+",
      "B-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Indian Red7091 Cross Society (IRCS) Blood Bank",
    "lat": 23.2307,
    "lng": 77.419553,
    "address": "Indian Red Cross Society, Shivaji Nagar, Near J P Hospital\r\n",
    "phone": "0755 2526108",
    "bloodGroups": [
      "O-",
      "O+"
    ]
  },
  {
    "name": "Kasturba Hospital BHEL Blood Bank",
    "lat": 23.222946,
    "lng": 77.446666,
    "address": "BHEL, Bhopal",
    "phone": "0755 2505304",
    "bloodGroups": [
      "A-",
      "O-"
    ]
  },
  {
    "name": "MP Thelasmia Kid Care Society Blood Bank",
    "lat": 23.2582415,
    "lng": 77.3952417,
    "address": "Opposite Hamidia Hospital, 4, Fategarh, Sultania Road",
    "phone": "0755 2538891, 0755 5242131",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Tatpar Pathology and Diagnostic Centre Blood Bank",
    "lat": 23.25369,
    "lng": 77.412695,
    "address": "10, Neelam Colony, Bhopal",
    "phone": "0755 2576466",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Jawahar Lal Nehru Cancer Hospital and Research Centre Blood Bank",
    "lat": 23.273077,
    "lng": 77.380764,
    "address": "Idgah Hills, Bhopal",
    "phone": "0755 4255682",
    "bloodGroups": [
      "A+",
      "A-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "People Hospital Blood Bank",
    "lat": 23.301078,
    "lng": 77.424616,
    "address": "Ayodhya Bypass road, Peoples Campus, Bhanpur Bhopal\r\n",
    "phone": "0755 4005227",
    "bloodGroups": [
      "A+",
      "AB+",
      "B+",
      "AB-",
      "O-",
      "O+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "New Bhopal Blood Bank",
    "lat": 23.20973,
    "lng": 77.437187,
    "address": "B-82, E/6 Arera Colony, Bhopal\r\n",
    "phone": "0755 3206332, 0755 3206327",
    "bloodGroups": [
      "A-",
      "O+",
      "B+",
      "O-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Arpan Blood Bank",
    "lat": 23.2289768,
    "lng": 77.4351847,
    "address": "Maiti Chari. Trust 131/6, M.P. Nagar, Z-II  Kiram Complex",
    "phone": "0755 4090142",
    "bloodGroups": [
      "B-",
      "B+",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Chirayu Health and Medicare Blood Bank ",
    "lat": 23.258167,
    "lng": 77.39707,
    "address": "Malipura, Bhopal",
    "phone": "0755 2737401, 0755 2737402, 0755 2737403",
    "bloodGroups": [
      "O+",
      "AB-",
      "B-",
      "AB+",
      "O-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "City Blood Bank of Bhojpal Charitable Trust",
    "lat": 23.26,
    "lng": 77.412,
    "address": "Bajaj Complex Opposite Sindhi Gurudwara, Jehangirabad\r\n",
    "phone": "0755 3295144",
    "bloodGroups": [
      "AB+",
      "B-",
      "A-",
      "O+",
      "O-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "JK Hospital and Medical Research Centre Blood Bank",
    "lat": 23.178855,
    "lng": 77.428807,
    "address": "J.K. Town, Kolar Road",
    "phone": "0755 4087000",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Manas Blood Bank of Chinmayi Swasthya Seva Sadhbhav Shikshan Samiti",
    "lat": 23.26,
    "lng": 77.39,
    "address": "Motia Talab, Bhopal",
    "phone": "0755 4250909",
    "bloodGroups": [
      "B+",
      "O-",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Bansal Hospital Redefining Healthcare Blood Bank",
    "lat": 23.199485,
    "lng": 77.420061,
    "address": "Near Shahpura Lake, Shahpura",
    "phone": "0755 7086000, 0755 4086099",
    "bloodGroups": [
      "B+",
      "B-",
      "AB+",
      "A+",
      "O-",
      "AB-",
      "A-",
      "O+"
    ]
  },
  {
    "name": "District Hospital",
    "lat": 21.204824,
    "lng": 76.114212,
    "address": "District Hospital",
    "phone": "07325-251166",
    "bloodGroups": [
      "A+",
      "O-",
      "AB+",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Chandubhai Somabhai Patel Blood Bank ",
    "lat": 21.304,
    "lng": 76.224,
    "address": "Chandubhai Somabhai Patel Blood Bank (of Arogyaseva Mandal), Rashtriyapura, Amravati Road",
    "phone": "07325 255133",
    "bloodGroups": [
      "B-",
      "AB+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 24.90762,
    "lng": 79.584212,
    "address": "District Hospital",
    "phone": "07682 248312",
    "bloodGroups": [
      "B-",
      "O-",
      "A+",
      "O+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "WCL Badkui Hospital Chhindwara Blood Bank",
    "lat": 22.113513,
    "lng": 78.430952,
    "address": "WCL Badkuhi Hospital, Chandameta Post\r\n",
    "phone": "07162 220249",
    "bloodGroups": [
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 22.052641,
    "lng": 78.937218,
    "address": "District Hospital",
    "phone": "07162 243442, 07162 243443",
    "bloodGroups": [
      "AB-",
      "O+",
      "B+",
      "A-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 23.833141,
    "lng": 79.440745,
    "address": "District Hospital",
    "phone": "07812 222183",
    "bloodGroups": [
      "O-",
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 25.687237,
    "lng": 78.442216,
    "address": "District Hospital",
    "phone": "07522 238624",
    "bloodGroups": [
      "AB-",
      "AB+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 22.962207,
    "lng": 76.048075,
    "address": "M G Government - District Hospital",
    "phone": "07272 251718",
    "bloodGroups": [
      "A+",
      "B-",
      "O-",
      "AB-",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Vishnuprabha Charitable Trust Blood Bank",
    "lat": 22.964817,
    "lng": 76.046337,
    "address": "39, HIG, Chamunda Complex, Civil Lines",
    "phone": "07272 253110",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "District Hospital Blood Bank ",
    "lat": 22.594249,
    "lng": 75.308054,
    "address": "Bhoj District Hospital, Mandu Road  ",
    "phone": "07292 235246",
    "bloodGroups": [
      "A+",
      "O+",
      "A-",
      "O-",
      "B+",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Mittal Hospital Blood Bank",
    "lat": 22.595954,
    "lng": 75.299087,
    "address": "Narsingh Chopati, Dhar",
    "phone": "07292 222451, 07292 222453",
    "bloodGroups": [
      "AB-",
      "B-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 22.946033,
    "lng": 81.075282,
    "address": "District Hospital Blood Bank",
    "phone": "07644 234962",
    "bloodGroups": [
      "O-",
      "O+",
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 21.824535,
    "lng": 76.343016,
    "address": "District Hospital",
    "phone": "0733 2230779",
    "bloodGroups": [
      "B+",
      "O+"
    ]
  },
  {
    "name": "Deep Blood Bank",
    "lat": 22.8740505,
    "lng": 74.7337069,
    "address": "Near Priyadarshni Gas Agency, Bhawani Mata Road\r\n\r\n",
    "phone": "0733 2224705",
    "bloodGroups": [
      "A-",
      "A+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 24.646947,
    "lng": 77.308376,
    "address": "District Hospital",
    "phone": "07542 250312",
    "bloodGroups": [
      "B-",
      "B+",
      "AB+",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Kanchan Medicare and Research Centre Private Limited Blood Bank",
    "lat": 24.648661,
    "lng": 77.302928,
    "address": "Lohati Bhawan, A. B. Road",
    "phone": "07542 226720",
    "bloodGroups": [
      "AB-",
      "B-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Indian Red Cross Society (IRCS) Blood Bank",
    "lat": 25.531751,
    "lng": 78.200319,
    "address": "Indian Red Cross Society, Hospital Campus, Red Cross Building, Dabra",
    "phone": "0752 4470222",
    "bloodGroups": [
      "O+",
      "B-",
      "A-"
    ]
  },
  {
    "name": " Blood Bank (Component & Apheresis Unit) G.R.Medical College",
    "lat": 26.192166,
    "lng": 78.164638,
    "address": "Blood Bank, Neurology Building , J. A. Hospital Campus, G. R. Medical College, Gwalior.  ",
    "phone": "0751 2403225",
    "bloodGroups": [
      "O-",
      "B+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 26.225961,
    "lng": 78.222716,
    "address": "District Hospital, Morar, (Maternity Hospital Campus) Morar",
    "phone": "0751 5030097",
    "bloodGroups": [
      "O+",
      "AB+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Indian Red Cross Society (IRCS) Blood Bank",
    "lat": 26.191826,
    "lng": 78.159549,
    "address": "Indian Red Cross Society, Behind Kamla Raja Hospital, Kampoo",
    "phone": "0751 4074294",
    "bloodGroups": [
      "O+",
      "A-",
      "A+",
      "AB-",
      "B+",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Shri Radheswami Blood Bank",
    "lat": 26.195391,
    "lng": 78.158556,
    "address": "Dal Bazar Tiraha Raj Payga Road, Lashkar Gwalior",
    "phone": "0751 2330393",
    "bloodGroups": [
      "O+",
      "O-",
      "AB+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Emergency Blood Bank",
    "lat": 26.191025,
    "lng": 78.155889,
    "address": "1, Kasturba Market, Kampoo",
    "phone": "0751 262 5377",
    "bloodGroups": [
      "O+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 22.340634,
    "lng": 77.093043,
    "address": "District Hospital",
    "phone": "07577 223102",
    "bloodGroups": [
      "A-",
      "B-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 22.452716,
    "lng": 77.430707,
    "address": "District Hospital",
    "phone": "07574 254446",
    "bloodGroups": [
      "B+",
      "B-",
      "A+",
      "O+",
      "O-",
      "A-",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Civil Hospital Itarsi Blood Bank",
    "lat": 22.361975,
    "lng": 77.451276,
    "address": "Janseva Rugnalaya Civil Hospital, Itarsi",
    "phone": "07574 241988",
    "bloodGroups": [
      "O+",
      "A-",
      "B+",
      "A+",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "MY Hospital & MGM Medical College - State of ART Model Blood Bank ",
    "lat": 22.714476,
    "lng": 75.882875,
    "address": "MY Hospital & MGM Medical College, A.B.Road, Indore  ",
    "phone": "0731 2438138",
    "bloodGroups": [
      "AB+",
      "O-",
      "A-",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Vishesh Hospital Blood Bank",
    "lat": 22.7187135,
    "lng": 75.8882735,
    "address": "2/1, A.B. Road, Near Geeta Bhawan, Chouraha\r\n",
    "phone": "0731 4238111, 0731 2499331, 0731 2499332, 0731 2499333",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Gurjar Hospital and Endoscopy Centre Private Limited Blood Bank",
    "lat": 22.691901,
    "lng": 75.866108,
    "address": "44 B, Bhawarkuan Chouraha, A.B. Road\r\n",
    "phone": "0731 2363716, 0731 2363717, 0731 2363718 ",
    "bloodGroups": [
      "O+",
      "A+",
      "B+",
      "AB+",
      "A-",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Gokuldas Hospital Blood Bank",
    "lat": 22.716411,
    "lng": 75.8760433,
    "address": "11, Sarju Prasad Marg\r\n",
    "phone": "0731 2519212",
    "bloodGroups": [
      "AB-",
      "B-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "SNG Hospital Blood Bank",
    "lat": 22.720246,
    "lng": 75.8817,
    "address": "16/1, South Tukoganj Kanchan Bagh, Main Road, Near Crown Palace Hotel\r\n",
    "phone": "0731 4219191, 0731 2525555",
    "bloodGroups": [
      "B-",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Index Medical College Hospital and Research Centre Blood Bank",
    "lat": 22.732016,
    "lng": 75.888857,
    "address": "104, Trishul Apartment, 5, Sanghi Colony, Opposite to Amaltas Hotel, A.B. Road\r\n",
    "phone": "0731 4215757",
    "bloodGroups": [
      "AB-",
      "AB+",
      "O-",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Arihant Hospital and Research Centre Blood Bank",
    "lat": 22.701662,
    "lng": 75.829585,
    "address": "Situated in 283- A, Gumasta Nagar\r\n",
    "phone": "0731 2785172, 0731 278517274",
    "bloodGroups": [
      "B-",
      "AB+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Aruvindo Blood Banks SAIMS Hospital",
    "lat": 22.796953,
    "lng": 75.845156,
    "address": "Indore Ujjain State Highway, Near MR 10 Crossing\r\n",
    "phone": "0731 4231000, 0731 4231100",
    "bloodGroups": [
      "B-",
      "O-",
      "A+",
      "A-",
      "AB-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Bombay Hospital Trust Blood Bank",
    "lat": 22.71957,
    "lng": 75.857726,
    "address": "Eastern Ring Rd,Ring Rd, IDA Scheme No.94/95, Tulsi Nagar, Vijay Nagar\r\n",
    "phone": "0731 2558866",
    "bloodGroups": [
      "O+",
      "AB+",
      "A+",
      "AB-",
      "A-",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Greater Kailash Hospitals Private Limited Blood Bank",
    "lat": 22.72527,
    "lng": 75.889633,
    "address": "111/2, Old Palasia\r\n",
    "phone": "0731 6633333,  0731 4051160, 0731 2491160, 0731 3057935, 0731 4091515",
    "bloodGroups": [
      "A+",
      "O+"
    ]
  },
  {
    "name": "Sanghvi Blood Bank",
    "lat": 22.7166872,
    "lng": 75.8739793,
    "address": "1st Floor, Manas Bhavan, RNT Marg\r\n\r\n",
    "phone": "0731 2527081, 0731 4208761",
    "bloodGroups": [
      "B-",
      "AB+",
      "O-",
      "AB-",
      "O+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Verma Union Hospital Blood Bank",
    "lat": 22.71209,
    "lng": 75.838098,
    "address": "120, Dhar Road, Opposite to Kastur Cinema\r\n",
    "phone": "0731 2380609, 0731 4022000, 0731 4056651",
    "bloodGroups": [
      "A+",
      "O-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "NSCB Medical College Blood Bank",
    "lat": 23.149881,
    "lng": 79.881151,
    "address": "Netaji Subhash Chandra Bose (NSCB) Medical College, Ist Floor Hospital Premises, Nagpur Road ",
    "phone": "0761 2370951, 0761-2673646 (Extn.300)",
    "bloodGroups": [
      "O-",
      "A+",
      "B+",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Rani Durgawati Hospital Blood Bank",
    "lat": 23.100428,
    "lng": 79.565702,
    "address": "Rani Durgawati Hospital",
    "phone": "0761 261052",
    "bloodGroups": [
      "A-",
      "O-",
      "O+",
      "B+",
      "AB-",
      "B-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "District Victoria Hospital Blood Bank",
    "lat": 23.172743,
    "lng": 79.936409,
    "address": "Government Seth Govinddas Victoria Hospital",
    "phone": "0761 2622202",
    "bloodGroups": [
      "AB+",
      "AB-",
      "O+",
      "A+",
      "B+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Bansal Blood Bank and Transfusion Service",
    "lat": 23.164273,
    "lng": 79.929699,
    "address": "Sukheja Towers, 1st Floor, Behind Main Bus Stand, 610 Wright Town\r\n",
    "phone": "0761 5004322",
    "bloodGroups": [
      "A+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Jabalpur Thalesemia Society Blood Bank",
    "lat": 23.169545,
    "lng": 79.932327,
    "address": "12 Anjuman Shopping Complex, Malviya Chowk Jabalpur\r\n",
    "phone": "0761 2401958",
    "bloodGroups": [
      "B+",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Khanna Pathology Lab and Blood Bank",
    "lat": 23.1708138,
    "lng": 79.9304742,
    "address": "14, Roopram Towers, Golbazar\r\n",
    "phone": "0761 2316980",
    "bloodGroups": [
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Military Hospital Blood Bank ",
    "lat": 23.1496957,
    "lng": 79.9530199,
    "address": "Military Hospital Jabalpur\r\n",
    "phone": "0761 762227",
    "bloodGroups": [
      "O+",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "District Hospital",
    "lat": 22.773068,
    "lng": 74.591422,
    "address": "District Hospital.JHABUA",
    "phone": "07392 243312",
    "bloodGroups": [
      "A-",
      "B-",
      "O+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Jivan Jyoti Hospital Blood Bank",
    "lat": 22.913396,
    "lng": 74.53969,
    "address": "Meghnagar\r\n",
    "phone": "07392 243312, 07390 284455",
    "bloodGroups": [
      "AB+",
      "B+",
      "B-",
      "O-",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 23.832575,
    "lng": 80.39196,
    "address": "Government  District Hospital",
    "phone": "07622 230367",
    "bloodGroups": [
      "A+",
      "AB+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 21.831932,
    "lng": 75.628611,
    "address": "District Hospital, Sanawad Road ",
    "phone": "07282 250702",
    "bloodGroups": [
      "A-",
      "O+",
      "O-"
    ]
  },
  {
    "name": "District Hospital Blood Bank Mandla",
    "lat": 22.596278,
    "lng": 80.370388,
    "address": "District Hospital",
    "phone": "07642 253077",
    "bloodGroups": [
      "AB-",
      "B+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 24.069241,
    "lng": 75.071826,
    "address": "District Hospital",
    "phone": "07422 241241",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Jain Pathology Laboratory and Blood Bank",
    "lat": 24.5550033,
    "lng": 75.1727662,
    "address": "Gandhi Chouraha\r\n",
    "phone": "07422 242518",
    "bloodGroups": [
      "O+",
      "A-",
      "AB+",
      "AB-",
      "B-",
      "O-",
      "B+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 26.496004,
    "lng": 77.998665,
    "address": "District Hospital",
    "phone": "07532 226318",
    "bloodGroups": [
      "B+",
      "AB-",
      "AB+",
      "A-",
      "O+",
      "B-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Jindal Blood Bank",
    "lat": 26.7048053,
    "lng": 78.2265252,
    "address": "Balkrishna Bhawan, Hospital Road\r\n",
    "phone": "0753 2250789",
    "bloodGroups": [
      "AB-",
      "O+",
      "O-",
      "B+",
      "AB+",
      "A+",
      "A-"
    ]
  },
  {
    "name": "District Hospital Narsinghpur Blood Bank ",
    "lat": 22.565735,
    "lng": 79.110807,
    "address": "Shankar Lal Dubey District Hospital",
    "phone": "07792 230480",
    "bloodGroups": [
      "AB-",
      "B+",
      "B-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Indian Red Cross Society (IRCS) Blood Bank",
    "lat": 24.460273,
    "lng": 74.874825,
    "address": "Indian Red Cross Society, District Hospital Campus\r\n",
    "phone": "07423 223878, 07423 225982",
    "bloodGroups": [
      "O+",
      "B-",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 24.712076,
    "lng": 80.181218,
    "address": "District Hospital",
    "phone": "07732 253658",
    "bloodGroups": [
      "O+",
      "O-",
      "B-",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 23.333493,
    "lng": 77.78043,
    "address": "District Hospital",
    "phone": "07482 222062",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 24.00976,
    "lng": 76.732073,
    "address": "District Hospital campus",
    "phone": "07372 201021, 07372 201023",
    "bloodGroups": [
      "A-",
      "AB+",
      "O-",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 23.327397,
    "lng": 75.038845,
    "address": "District Hospital",
    "phone": "07412 270445",
    "bloodGroups": [
      "O-",
      "A-",
      "AB-",
      "A+",
      "AB+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Manav Seva Samiti Blood Bank",
    "lat": 23.3266577,
    "lng": 75.039959,
    "address": "Nagrik Vishram Griha College Road\r\n\r\n",
    "phone": "0741 2239000 ",
    "bloodGroups": [
      "A+",
      "O-",
      "B-",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "S. S. Medical College Blood Bank",
    "lat": 24.531793,
    "lng": 81.299794,
    "address": "S. S. Medical College",
    "phone": "0766 2257441",
    "bloodGroups": [
      "B-",
      "B+",
      "O-",
      "A-",
      "O+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 23.492157,
    "lng": 78.451821,
    "address": "District Hospital, (Tilli Hospital)",
    "phone": "07582 236548",
    "bloodGroups": [
      "AB+",
      "O+",
      "O-",
      "B+",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Bhagyoday Tirth Hospital Blood Bank",
    "lat": 23.851061,
    "lng": 78.722466,
    "address": "Khurai Road\r\n",
    "phone": "0758 2266671",
    "bloodGroups": [
      "O+",
      "AB+",
      "B-",
      "O-",
      "AB-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Sadguru Blood Bank Chitrakoot",
    "lat": 25.095043,
    "lng": 80.515971,
    "address": "Sadguru Jankikund Chikitsalaya, Chitrakoot",
    "phone": "0767  0265320-6445",
    "bloodGroups": [
      "O+",
      "AB-",
      "A+",
      "A-",
      "B-",
      "O-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 24.567945,
    "lng": 80.832069,
    "address": "District Hospital, Blood Bank",
    "phone": "07672 223226",
    "bloodGroups": [
      "AB-",
      "O+",
      "B+",
      "B-"
    ]
  },
  {
    "name": "MP Birla Hospital and Priyamvada Birla Cancer Research Institute Blood Bank",
    "lat": 24.585065,
    "lng": 80.85646,
    "address": "J. R. Birla Road, Post Birla Vikas\r\n",
    "phone": "07672 257411, 07672 257412, 07672 404085",
    "bloodGroups": [
      "A-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 23.198387,
    "lng": 77.081271,
    "address": "District Hospital",
    "phone": "07562 226737",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A-",
      "A+",
      "B-",
      "B+",
      "O-"
    ]
  },
  {
    "name": "District Hospital Blood Bank Seoni",
    "lat": 22.054391,
    "lng": 79.330324,
    "address": "Smt Indira Gandhi District Hospital Blood Bank ",
    "phone": "07692 220358",
    "bloodGroups": [
      "O-",
      "B-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Burhar Central Hospital of South Eastern Coal Fields Limited Blood Bank",
    "lat": 23.185907,
    "lng": 81.571377,
    "address": "Sohagpur Area, Dhanpuri Post",
    "phone": "07652 250223",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 23.30792,
    "lng": 81.352897,
    "address": "Shri Kushabhau Thakre, District Hospital",
    "phone": "07652 245256",
    "bloodGroups": [
      "B-",
      "AB+",
      "B+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Murlidhar Kripa Hospital Blood Bank",
    "lat": 23.2506645,
    "lng": 76.1374297,
    "address": "Murlidhar Kripa Hospital of JK Mansingh Ka Trust, Maxi District, Shajapur\r\n",
    "phone": "07363 233426, 07363 233428",
    "bloodGroups": [
      "B-",
      "O-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 23.421106,
    "lng": 76.274685,
    "address": "District Hospital",
    "phone": "07364 222127 ",
    "bloodGroups": [
      "B-",
      "B+",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "District hospital sheopur",
    "lat": 25.676067,
    "lng": 76.711645,
    "address": " District Hospital Sheopur",
    "phone": "7746977417",
    "bloodGroups": [
      "AB-",
      "A-",
      "O+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 25.25408,
    "lng": 77.39027,
    "address": "District Hospital",
    "phone": "07492 222362",
    "bloodGroups": [
      "A-",
      "A+",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 24.413386,
    "lng": 81.88065,
    "address": "District Hospital, Blood Bank",
    "phone": "07822 252207, 07822 252153 ",
    "bloodGroups": [
      "B-",
      "AB-",
      "A+",
      "A-",
      "O-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Nehru Jan shatabdi Chikitsalaya Blood Bank ",
    "lat": 24.06319,
    "lng": 82.383071,
    "address": "Nehru Jan shatabdi Chikitsalaya Blood Bank of Northern Coal Field Jyant Sinroli",
    "phone": "07805 254982",
    "bloodGroups": [
      "O-",
      "AB+",
      "AB-",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Red Cross Blood Bank",
    "lat": 24.0925456,
    "lng": 82.6559943,
    "address": "NTPC Hospital, Vindhya Nagar\r\n",
    "phone": "07805 245144",
    "bloodGroups": [
      "B+",
      "AB+",
      "A-",
      "O+",
      "B-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 24.452408,
    "lng": 78.500693,
    "address": "Rajendra Hospital (District Hospital), Blood Bank",
    "phone": "07683 247396 ",
    "bloodGroups": [
      "A-",
      "O+",
      "A+",
      "AB+",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Grassim Hospital and Blood Bank",
    "lat": 23.4465681,
    "lng": 75.407488,
    "address": "Birlagram Nagda\r\n",
    "phone": "07366 247200",
    "bloodGroups": [
      "A-",
      "B+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 23.105277,
    "lng": 75.463821,
    "address": "District Hospital",
    "phone": "0734 2551077",
    "bloodGroups": [
      "O-",
      "AB-",
      "A+",
      "O+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Puspha Mission Hospital and Maternity Home Blood Bank",
    "lat": 23.168295,
    "lng": 75.795961,
    "address": "Dewas Road",
    "phone": "0734 2526732",
    "bloodGroups": [
      "B+",
      "AB+",
      "O-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Ujjain Charitable Trust Blood Bank",
    "lat": 23.192897,
    "lng": 75.776423,
    "address": "Ujjain\r\n",
    "phone": "0734 4013621 ",
    "bloodGroups": [
      "B+",
      "AB+",
      "O+",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "CR Gardi Hospital and RD Blood Bank",
    "lat": 23.233015,
    "lng": 75.811619,
    "address": "Gardi Medical College Sursa\r\n",
    "phone": "0736 8261305",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 23.571113,
    "lng": 80.390813,
    "address": "District Hospital",
    "phone": "07653 222314",
    "bloodGroups": [
      "O+",
      "A-",
      "B-",
      "AB+",
      "O-",
      "A+",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 23.520189,
    "lng": 77.808353,
    "address": "District Hospital",
    "phone": "07592 237825",
    "bloodGroups": [
      "AB+",
      "A+",
      "A-",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Civil Surgeon General Hospital Blood Bank",
    "lat": 19.108046,
    "lng": 74.73557,
    "address": "District Government Hospital Tarakpur Savedi Road, Ahmednagar",
    "phone": "0241 2430127 (Office)",
    "bloodGroups": [
      "AB+",
      "B+",
      "AB-",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Sanjeevani Blood Bank Kopargaon",
    "lat": 19.88042,
    "lng": 74.470873,
    "address": "110, 2/B Nishigandh, Vivekanand Nagar, Near  S.G. Vidyalay, Kopargaon\r\n",
    "phone": "02423 222237, 02423 224885, 02423 223117",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Rotary Blood Bank - Rahuri Charitable Trust",
    "lat": 19.419633,
    "lng": 74.65553,
    "address": "Acharya Anand Rushiji Bhavan, Near Water Tank, Nagar Manmad Road,  A/P Rahuri, Ahmednagar District\r\n",
    "phone": "02426 232975",
    "bloodGroups": [
      "B+",
      "AB+",
      "A+",
      "O-",
      "A-",
      "AB-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Arpan Blood Bank",
    "lat": 19.569309,
    "lng": 74.206528,
    "address": "First Floor, H.No.1542/43, Above Bank of Badoda, Swatantrya Chowk, Sangamner,  Ahmednagar District\r\n",
    "phone": "02425 226036, 02425 220457",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Jankalyan Blood Bank Nalegaon",
    "lat": 18.501067,
    "lng": 73.857499,
    "address": "Gadgil Patangan, Nalegaon, Ahmednagar\r\n\r\n",
    "phone": "0241 2346647, 0241 2329827",
    "bloodGroups": [
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Pravara Medical Trust Blood Bank - Pravara Rural Hospital and Medical Dental College Loni (BK)",
    "lat": 19.578952,
    "lng": 74.456127,
    "address": "Pravara Rural Hospital & Medical Dental College Loni (BK) TQ. Rahata, Ahmednagar ",
    "phone": "02422 271201, 02422 271528, 02422 2733413 ",
    "bloodGroups": [
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Jondhale&#39;s Nitya Seva Blood Bank",
    "lat": 19.6227,
    "lng": 74.660399,
    "address": "R.C.Complex, Mamlatdar Kacheri Road, Shrirampur,                  Ahmednagar\r\n",
    "phone": "02422 225000",
    "bloodGroups": [
      "AB-",
      "AB+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Shri Sainath Blood Bank",
    "lat": 19.763137,
    "lng": 74.47058,
    "address": "Opposite to Bus Stand,  Shri Saibaba Sansthan, Shirdi Tal - Rahata\r\n",
    "phone": "02423 258525 ",
    "bloodGroups": [
      "A+",
      "A-",
      "O-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Padmashri Dr. Vithalrao Vikhe Patil Foundation, Ahmednagar Medical College Hospital Blood Bank",
    "lat": 19.181403,
    "lng": 74.689625,
    "address": "Opposite to Government Milk Dairy, Vadgaon Gupta  M.I.D.C., Ahmednagar ",
    "phone": "0241 2778042 (Exte-449)",
    "bloodGroups": [
      "AB-",
      "O-",
      "O+",
      "AB+",
      "A-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Shrirampur Blood Bank",
    "lat": 19.619247,
    "lng": 74.663502,
    "address": "Shrirampur",
    "phone": "02422 224293, 02422 210600        ",
    "bloodGroups": [
      "AB+",
      "A-",
      "AB-",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Anand Rushiji Blood Bank",
    "lat": 19.080688,
    "lng": 74.732289,
    "address": "Survey No.16/1, Plot No.2 Behind Anadrushiji Hospital Burudgaon Road,\r\n",
    "phone": "0241 2320472, 0241 2320473, 0241 2320474",
    "bloodGroups": [
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Jeevanraj Charitable Foundation,s Ahmednagar Blood Bank",
    "lat": 19.082959,
    "lng": 74.760389,
    "address": "F.P. No. - 17, 2nd Floor, Ahmednagar Zillha Krishi Audyogik Sarva Seva Sahakari Sanstha Maryadit, Market Yard, Ahmednagar\r\n",
    "phone": "0241 2450099",
    "bloodGroups": [
      "O+",
      "AB+",
      "A-",
      "AB-",
      "B-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Nandkishor Education Society - Arpan Blood Bank",
    "lat": 20.004874,
    "lng": 73.787165,
    "address": "2nd  Floor, Sahakar Kranti Building, Market Yard, Nagar - Pune Road \r\n",
    "phone": "0241 2451700, 0241 2451800",
    "bloodGroups": [
      "B+",
      "AB+",
      "B-",
      "A+",
      "AB-",
      "O+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Poonam Janjagruti Sanstha Sanchit, Ashtavinayak Blood Bank",
    "lat": 19.117005,
    "lng": 74.735872,
    "address": "Ashtavinayak Blood Bank, Ahmednagar  1st Floor, Sai Palace Opposite  to Akashwani Kendra, Near Professsor Coloney Chowk, Ahmednagar\r\n",
    "phone": "0241 2421334 ",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Civil Surgeon General Hospital Blood Bank",
    "lat": 20.702666,
    "lng": 77.001984,
    "address": "District General Hospital Compound, Z.P. Road, Akola\r\n",
    "phone": "0724 2434401",
    "bloodGroups": [
      "A-",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "District Hospital for Women Blood Bank",
    "lat": 20.714492,
    "lng": 77.008904,
    "address": "Plot No.2, OPD Building, District Hospital for Women, Near Durga Chowk, Akola-444005\r\n",
    "phone": "0724 2433398, 0724 2433778 ",
    "bloodGroups": [
      "O+",
      "O-",
      "B+",
      "AB-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Dr. Vivek Pimpalkar Blood Bank",
    "lat": 21.106181,
    "lng": 77.072925,
    "address": "Najul Shit No. 408, Plot No-9/7, Krishna Kripa Building,  M.G.Road, Akola\r\n",
    "phone": "0724 2438271 ",
    "bloodGroups": [
      "AB+",
      "O-",
      "A+",
      "AB-",
      "A-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Shriram Blood Bank",
    "lat": 21.106181,
    "lng": 77.072925,
    "address": "T. K. Chambers, Ratanlal Plot, Akola ",
    "phone": "0724 2433175, 0724 2432175",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Akola Diagnostic Centre Blood Bank and Component Lab",
    "lat": 20.70644,
    "lng": 77.011207,
    "address": "Shivshirsh, Opposite to Gajanan Hospital, Ramnagar, Akola\r\n",
    "phone": "0724 2458777",
    "bloodGroups": [
      "O-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Dr. Mankar Memorial Blood Bank",
    "lat": 20.724952,
    "lng": 77.04278,
    "address": "Mankar Hospital, 2nd Floor, Dr. Mankar Smruti Building, Aastha Hospital, Opposite to Khandelwal CT-Scan Centre, Amanakha Plot,  Civil Line, Akola",
    "phone": "0724 2457530 ",
    "bloodGroups": [
      "AB-",
      "O-",
      "B-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Dr. Hedgewar Blood Bank",
    "lat": 21.140578,
    "lng": 79.060506,
    "address": "Balaji Plot  SBI Colony No - 1,  Near Jathat Peth,  No.1 Akola\r\n",
    "phone": "0724 2491264, 0724 2491265, 0724 2491266",
    "bloodGroups": [
      "AB-",
      "A-",
      "B+"
    ]
  },
  {
    "name": "ICON Blood Bank - Ganediwal Charitable Trust",
    "lat": 20.713446,
    "lng": 77.011958,
    "address": "Ganediwal Charitable Trust, ICON Blood Bank, ICON Hospital, Kedia Plot, Akola",
    "phone": "0724 2411263",
    "bloodGroups": [
      "AB+",
      "B+"
    ]
  },
  {
    "name": "District General Hospital Blood Bank Amravati",
    "lat": 20.93386,
    "lng": 77.760815,
    "address": "Dr. Babasaheb Ambedkar Chowk, District General Hospital Blood Bank, Amaravati",
    "phone": "0721 2663337, 0721 2663339, 0721 2663338",
    "bloodGroups": [
      "AB+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Shri Balaji Blood Bank & component lab Amravati",
    "lat": 20.928177,
    "lng": 77.756362,
    "address": "1st Floor, Alsi Complex, Ambapeth, Amravati\r\n",
    "phone": "0721 2671600 ",
    "bloodGroups": [
      "B+",
      "B-"
    ]
  },
  {
    "name": "Dr. P.D.M.H.C. Hospital and Research Centre Blood Bank",
    "lat": 20.923,
    "lng": 77.816645,
    "address": "Block-A,1st Floor, Shivaji Nagar, Amravati \r\n",
    "phone": "0721 2665545",
    "bloodGroups": [
      "A+",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Sant Gadgebaba Blood Bank and Component Centre Badnera",
    "lat": 20.794116,
    "lng": 77.709547,
    "address": "Opposite to Shrihari Hospital, Juni Vasti (Old Town), Badnera  Amravati\r\n",
    "phone": "0721 2580490, 0721 2580455              ",
    "bloodGroups": [
      "B+",
      "A-"
    ]
  },
  {
    "name": "Dr. Late Sadanadaji Burma Memorial Blood Bank",
    "lat": 21.298921,
    "lng": 77.518316,
    "address": "Plot No- 53, Sheet No-20c, Gvalipura,  Sadar Bazar, Paratwada, Amravati\r\n",
    "phone": "8484010184",
    "bloodGroups": [
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Regional Blood Bank Government Medical College and Hospital",
    "lat": 19.890542,
    "lng": 75.317164,
    "address": "Regional Blood Bank Government Medical College and Hospital, Aurangabad, (GHATI)",
    "phone": "0240 2402108, 0240 2402418",
    "bloodGroups": [
      "B+",
      "O-"
    ]
  },
  {
    "name": "Mahatma Gandhi Mishan (MGM) Hospital Blood Bank",
    "lat": 19.877896,
    "lng": 75.354519,
    "address": "Mahatma Gandhi Mishan Medical College & Hospital Blood Bank, N-6, Town Center,  CIDCO,  Aurangabad ",
    "phone": "0240 6601100, 0240 6601167",
    "bloodGroups": [
      "AB-",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Dattaji Bhale Blood Bank - Hedgewar Hospital",
    "lat": 19.876165,
    "lng": 75.343313,
    "address": "C/o. Dr. Hegdewar Rugnalaya Campus, Near Gajanan Mandir, Jawahar Colony Road, Garkheda Parisar,  Aurangabad\r\n",
    "phone": "0240 2335196, 0240 2331195, 0240 2352371",
    "bloodGroups": [
      "A-",
      "O+"
    ]
  },
  {
    "name": "Lokmanya Blood Bank",
    "lat": 19.872123,
    "lng": 75.323251,
    "address": "Gopinath Chember,  Basement Floor, Behind Jaydev Travels, Adalat Road,  Aurangabad ",
    "phone": "0240 6602163, 0240 2328362 ",
    "bloodGroups": [
      "O-",
      "B+"
    ]
  },
  {
    "name": "Seth Nandlal Dhoot Hospital Blood Bank",
    "lat": 19.872742,
    "lng": 75.387668,
    "address": "Plot No A-1, MIDC Chikalthana, Jalna Road, Aurangabad\r\n",
    "phone": "0240 2489001 - 10",
    "bloodGroups": [
      "B-",
      "O+",
      "A-",
      "O-",
      "AB+",
      "A+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Arpan Voluntary (Marathwada)  Blood Bank",
    "lat": 19.875504,
    "lng": 75.352445,
    "address": "2nd Floor, Soniya Chambers, Near Uddhanpula, Seven Hills, Jalna Road, Aurangabad\r\n",
    "phone": "0240 2345359, 0240 6604204",
    "bloodGroups": [
      "O+",
      "B+",
      "A-",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Amruta Blood Bank",
    "lat": 19.855842,
    "lng": 75.338268,
    "address": "Shop No- 102/103, 1st Floor ,Nano Comlex Near Shanoormiya Arga, Vegetable Arket, Shahnoorwadi, Aurangabad\r\n",
    "phone": "0240 2060145 ",
    "bloodGroups": [
      "A-",
      "O-",
      "B-",
      "AB-",
      "AB+",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Aurangabad Blood Bank",
    "lat": 19.873384,
    "lng": 75.344972,
    "address": "Opposite to Sparsh Hospital, Jawahar Nagar Akashwani Aurangabad\r\n",
    "phone": "0240 6002002, 0240 2330400",
    "bloodGroups": [
      "A+",
      "A-",
      "O-",
      "B-",
      "B+",
      "O+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Lions Blood Bank",
    "lat": 19.87244,
    "lng": 75.323188,
    "address": "1st Floor, above Lions  Balsadan, Near Teg Bahadur English School, Osmanpura, Aurangabad ",
    "phone": "0240 2340250, 2337255",
    "bloodGroups": [
      "A-",
      "AB-",
      "B+",
      "O-",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Civil Surgeon General Hospital Blood Bank",
    "lat": 18.986918,
    "lng": 75.75332,
    "address": "Civil Surgeon District General Hospital, Barshi Road, Beed  ",
    "phone": "02442 220609",
    "bloodGroups": [
      "AB+",
      "O+",
      "AB-",
      "B+",
      "A-",
      "B-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Swami Ramanand Tirth Arben Medical College Hospital Blood Bank",
    "lat": 18.731377,
    "lng": 76.370902,
    "address": "Swami Ramanand Tirth Arben Medical College Hospital Ambajogai Tq. Ambajogai,  Beed",
    "phone": "02446 244472 ",
    "bloodGroups": [
      "O+",
      "B+"
    ]
  },
  {
    "name": "Vaidynath Blood Bank",
    "lat": 18.842659,
    "lng": 76.535058,
    "address": "Mundhe Children Hospital, Near Dube Petrol Pump, Jai Nagar, Parli-Vaijnath, Beed",
    "phone": "02446 223584",
    "bloodGroups": [
      "O-",
      "A-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Navjivan Blood Bank",
    "lat": 19.000048,
    "lng": 75.755254,
    "address": "Plot No 2-10-240 1 st Floor, Jalna Road, Opposite to M.S.E.B. Office, Beed ",
    "phone": "02442 233423, 02442 232434, 02442 223975",
    "bloodGroups": [
      "B+",
      "A-",
      "AB+",
      "B-",
      "AB-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Arpan Blood Bank Beed",
    "lat": 18.725503,
    "lng": 76.390737,
    "address": "3rd Floor, Thorat Multispeciality Hospital, D.P. Road, Anand Nagar, Ambejogai, Dist - Beed,\r\n",
    "phone": "02446 245002           ",
    "bloodGroups": [
      "B-",
      "B+",
      "A-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Civil Hospital Bhandara Blood Bank",
    "lat": 21.162022,
    "lng": 79.65973,
    "address": "General Hospital Blood Bank, Bhandara\r\n",
    "phone": "07184 252247(Hospital), 07184 250725(Blood Bank)",
    "bloodGroups": [
      "A+",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Jeevandhara Buldana Urban Blood Bank",
    "lat": 20.532707,
    "lng": 76.180604,
    "address": "1st Floor, DSD City Mall, Above Bank of India, Tehsil to Stadium Road, Buldhana \r\n",
    "phone": "9657221122",
    "bloodGroups": [
      "O-",
      "O+",
      "A+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 20.708409,
    "lng": 76.566704,
    "address": "General Hospital Shegaon Road, Khamgaon, Buldhana",
    "phone": "07263 255332, 07263 254571",
    "bloodGroups": [
      "O+",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Saibai Mote General Hospital Blood Bank",
    "lat": 20.795868,
    "lng": 76.696688,
    "address": "Saibai Mote General Hospital, Shegaon, Buldhana",
    "phone": "07265 252020",
    "bloodGroups": [
      "B-",
      "A-"
    ]
  },
  {
    "name": "Civil Surgeon District General Hospital Blood Bank",
    "lat": 20.533583,
    "lng": 76.187482,
    "address": "General Hospital Blood Bank Buldhana, Near Prabadhan School, Bhonde Sarakar Chauk Bhuldhana(M.S)",
    "phone": "07262 242423 (Extn.234)",
    "bloodGroups": [
      "AB-",
      "AB+",
      "A-",
      "B+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Dr. Murlidhar Kharche Memorial Jeevan Jyoti Blood Bank",
    "lat": 20.886486,
    "lng": 76.207174,
    "address": "Bharat Kala Road, Malkapur, Buldhana ",
    "phone": "07267 26700",
    "bloodGroups": [
      "O-",
      "O+",
      "AB-",
      "B+",
      "A+",
      "A-",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Lilavati Blood Bank",
    "lat": 20.534727,
    "lng": 76.172461,
    "address": "John Lay Out, Jamrnn Road, Near Bus stand, Buldhana",
    "phone": "07262 243811",
    "bloodGroups": [
      "A-",
      "AB-",
      "B-",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Shri. Brahman Swrankar Samaj Trust Blood Bank",
    "lat": 20.543402,
    "lng": 76.170956,
    "address": "Farshi, Main Road, Khamgaon, Buldhana",
    "phone": "07263 255577",
    "bloodGroups": [
      "B+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "General Hospital Blood Bank",
    "lat": 19.953683,
    "lng": 79.296742,
    "address": "Government General Hospital Blood Bank, Near Chota Bazar, Main Road, Mahatma Gandhi Marg, Chandrapur",
    "phone": "07172 252103, 07172 253992",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Ankur Hospital Blood Bank",
    "lat": 19.970044,
    "lng": 79.30788,
    "address": "Balaji Ward, Chandrapur",
    "phone": "07172 251522, 07172 255522, 07172 264522",
    "bloodGroups": [
      "O-",
      "A-",
      "A+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Dr. Ninawe Blood Bank",
    "lat": 19.957547,
    "lng": 79.295961,
    "address": "Niwane Hospital, Near Benglur Bakery, Kasturba Road, Chandrapur",
    "phone": "07172 254884, 07172 254994      ",
    "bloodGroups": [
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Christanand Education Society Blood Bank",
    "lat": 20.607715,
    "lng": 79.855757,
    "address": "Christanand Education Society Blood Bank,  Christanand Hospital, Gujri Ward No.2, Brahmapuri",
    "phone": "07177 272016, 07177 271109",
    "bloodGroups": [
      "AB+",
      "B-",
      "A+",
      "O-",
      "O+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Shahada Blood Bank (Whole Human Blood)",
    "lat": 21.554796,
    "lng": 74.472875,
    "address": "Shahada",
    "phone": "02565 223446",
    "bloodGroups": [
      "A-",
      "O+",
      "AB+",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Shri Bhausaheb Hire Government Medical College and Hospital Blood Bank",
    "lat": 20.863814,
    "lng": 74.761869,
    "address": "Civil Hospital Compound, Sakri Road Dhule",
    "phone": "02562 288833",
    "bloodGroups": [
      "A+",
      "A-",
      "B+",
      "AB+",
      "AB-",
      "B-",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Navjeevan Medical Relief & Research Society&#39;s Shree Navjeevan Blood Bank and Component Laboratary",
    "lat": 20.894428,
    "lng": 74.759698,
    "address": "Plot No. 39, S. No. 579/3+5, Sushil Nagar Behind Vaibhav Nagar, Dhule.(424001)(M.S.)",
    "phone": "02562 245662, 02562 246289, 02562 244662",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Jawahar Medical Foundation Blood Bank",
    "lat": 20.90361,
    "lng": 74.741293,
    "address": "Hutatma Shririshkumar Nagar, Opposite to Jawahar Suthgirani, Morane, Sakri Road, Dhule",
    "phone": "02562 276317, 02562 277298",
    "bloodGroups": [
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Jeevan Jyoti Blood Bank",
    "lat": 20.897883,
    "lng": 74.775354,
    "address": "3252 Agra Road, Near Prabhakar Theater",
    "phone": "02562 232807",
    "bloodGroups": [
      "AB+",
      "O-",
      "AB-",
      "B-",
      "A+",
      "A-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Nirnay Janseva Blood Bank",
    "lat": 20.904116,
    "lng": 74.77767,
    "address": "Fulwala Chowk, (C.S.No.1415/A/1/A) Lane No. 4  Dr. Odhekar Building, Agra Road",
    "phone": "02562 238262",
    "bloodGroups": [
      "A-",
      "B+"
    ]
  },
  {
    "name": "Arpan Blood Bank",
    "lat": 20.904116,
    "lng": 74.77767,
    "address": "Atul Medical and Rehabilitation Society, Arpan Blood Bank,  Jain Oswal Boarding, Ganpati Road, Near Santoshi Mata Mandir, Dhule, Nashik ",
    "phone": "02562 229163, 02562 229164, 02562 229165 ",
    "bloodGroups": [
      "AB+",
      "O+",
      "B+",
      "AB-"
    ]
  },
  {
    "name": " Late  Shri Mukeshbai Patel Blood Bank ",
    "lat": 21.458578,
    "lng": 74.961094,
    "address": "Shree Swami  Samartha Vaidyakiya  Shaikshanik and Sanshodhan Sanstha, Late  Shri Mukeshbai Patel Blood Bank, 1st Floor, Agrasen  Patpedhi, Maharaja Complex  Shirpur, Dhule ",
    "phone": "09823142895, 08421756756",
    "bloodGroups": [
      "O+",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Sub-District Rural Hospital Blood Bank",
    "lat": 19.414671,
    "lng": 80.003753,
    "address": "Aheri, At Post and Tal., Aheri, Gadchiroli",
    "phone": "07133 272072",
    "bloodGroups": [
      "O-",
      "O+",
      "B+",
      "A-",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Civil Surgeon - General Hospital Blood Bank",
    "lat": 20.170208,
    "lng": 79.982909,
    "address": "Gadchiroli, General Hospital Blood Bank, Gadchiroli",
    "phone": "07132 222056, 07132 222644",
    "bloodGroups": [
      "O-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Bai Gangabai Ladies Hospital Blood Bank",
    "lat": 21.459648,
    "lng": 80.196834,
    "address": "Gondia, Bai Gangabai Ladies Hospital Blood Bank, Civil Lines,  Gondia",
    "phone": "07182 232606",
    "bloodGroups": [
      "B-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Civil Surgeon - District General Hospital Blood Bank",
    "lat": 19.721787,
    "lng": 77.154487,
    "address": "Akola Road Risala Bazar, Hingoli",
    "phone": "02456 224118",
    "bloodGroups": [
      "O-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Civil Hospital Blood Bank",
    "lat": 21.00845,
    "lng": 75.568216,
    "address": "Civil Hospital Blood Bank, Dixit Wadi, Zilha Peth, Jalgaon",
    "phone": "0257 2226642, 0257 2252145",
    "bloodGroups": [
      "AB+",
      "A-",
      "AB-",
      "B+",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Madhavrao Golwalkar Swayamsevi Blood Bank",
    "lat": 21.016507,
    "lng": 75.564845,
    "address": "11-255-J-JMP Market, Chitra Chowk, Near Kombadi Bazar, Jalgaon",
    "phone": "0257 2234590, 0257 2261979",
    "bloodGroups": [
      "AB-",
      "AB+",
      "O+",
      "A-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Jeevan Surabhi Blood Bank",
    "lat": 20.464642,
    "lng": 74.998859,
    "address": "Kargaon Road, Laxmi nagar,  Chalisgaon, Jalgaon",
    "phone": "02589 223833",
    "bloodGroups": [
      "A+",
      "O-",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Jeevanshri Raktapedi",
    "lat": 21.045399,
    "lng": 75.063926,
    "address": "Ist Floor, Rasmanju Complex, Bhagwat Road, Amalner ",
    "phone": "9226894187",
    "bloodGroups": [
      "A-",
      "O+"
    ]
  },
  {
    "name": "Dhanwantri Blood Bank",
    "lat": 21.034297,
    "lng": 75.781029,
    "address": "H. No. 5/464/1, T. P. Scheme, No-1, Survey No 124/1/3A Plot No. 777/3, Jamner Road, Rangoli Hotel, Jawal Anand Nagar Bhusawal, Jalgaon ",
    "phone": "02582 243243",
    "bloodGroups": [
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Godavari Foundation Blood Bank",
    "lat": 21.023689,
    "lng": 75.705103,
    "address": "Hospital Building, 2nd Floor, Gate No. 315/316/321/305 Jalgaon - Bhsawal Road, N.H. No. 6,  Jalgaon (kh) ",
    "phone": "0257 3058539, 0257 3058526",
    "bloodGroups": [
      "A-",
      "B-",
      "AB-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 21.011122,
    "lng": 75.567945,
    "address": "Near Civil Hospital, Athwadi Bazar, Opposite to B.J.Market, Jalgaon",
    "phone": "0257 2226233, 0257 2236255, 0257 2235855",
    "bloodGroups": [
      "O+",
      "B+",
      "O-",
      "A-",
      "AB-",
      "A+",
      "B-"
    ]
  },
  {
    "name": "M/s. Jalgaon Blood Bank and Component",
    "lat": 21.00408,
    "lng": 75.493766,
    "address": "Near Mahesh Pragati Bhavan, Ring Road, Jalgaon",
    "phone": "0257 2222278",
    "bloodGroups": [
      "O+",
      "B-",
      "B+",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Askaran Tarachand Jain Blood Bank",
    "lat": 21.008464,
    "lng": 75.568216,
    "address": "Jawahar Market, First Floor, Near Police Station Chopda, Jalgaon",
    "phone": "02586 221019, 02586 220457, 02586 220468",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Civil Surgeon General Hospital Blood Bank",
    "lat": 19.84031,
    "lng": 75.888795,
    "address": "Balod Bank Survey No-488, Infront of Collector Office, Civil Hospital, Jalna  ",
    "phone": "02482 224381, 02482 224393",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Jankalyan Blood Bank",
    "lat": 19.867491,
    "lng": 75.879779,
    "address": "Wing No. 03, S. No. 224, Shri Chatrapati Shivaji Maharaj Bazar Sankul, Old Cotton Market Yard",
    "phone": "02482 238397, 02482 243085, 02482 232407",
    "bloodGroups": [
      "O+",
      "A-",
      "O-",
      "B+",
      "AB-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Noor Hospital Blood Bank",
    "lat": 19.860878,
    "lng": 75.664447,
    "address": "Aurangabad - Jalna Road, Warudi, Tq- Badnapur, Jalna",
    "phone": "02482 222515",
    "bloodGroups": [
      "A-",
      "A+",
      "B-",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Rajashri Chatrapati Shahu Maharaj Government Medical College and Chatrapati Pramilaraje General Hospital Blood Bank",
    "lat": 16.701443,
    "lng": 74.227074,
    "address": "Dasara Chowk, Somwar Peth, C. P. R. Hospital Compound, Kolhapur\r\n",
    "phone": "0231 2644337",
    "bloodGroups": [
      "B+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Late Balasaheb Datye - Lions Blood Bank",
    "lat": 16.681682,
    "lng": 74.467741,
    "address": "5/468, Datye Mala, Lions Park,  Ichalkaranji, Tal-Hatkanangale, Kolhapur\r\n",
    "phone": "0230 2436130",
    "bloodGroups": [
      "A-",
      "A+",
      "B+",
      "AB-",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Rajarshi Shahu Blood Bank",
    "lat": 16.691308,
    "lng": 74.244866,
    "address": "Rotary Samaj Seva Centre, 253, K.E.Assembly Road, Kolhapur\r\n",
    "phone": "0231 2651640 ",
    "bloodGroups": [
      "A-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Mahatma Gandhi Hospital Blood Bank",
    "lat": 16.86221,
    "lng": 74.240034,
    "address": "At Post - New Pargaon, TQ-Hatkanangale, Kolhapur",
    "phone": "0230 2477081, 0230 2477082, 0230 2477083,  0230 2477308, 0230 2477309  ",
    "bloodGroups": [
      "B+",
      "O+",
      "B-",
      "O-",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Annasaheb Galatge Lions Blood Bank",
    "lat": 16.186455,
    "lng": 74.372559,
    "address": "Doctor&#39;s Colony, Gadhinglaj, Kolhapur",
    "phone": "02327 223100, 02327 226355",
    "bloodGroups": [
      "O+",
      "A-",
      "B-",
      "O-",
      "B+",
      "A+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Acharya Shree Tulsi Blood Bank ",
    "lat": 16.785709,
    "lng": 74.56459,
    "address": "Gate No.1232 Sangli - Kolhapur Road, Jaysingpur Udgaon, Kolhapur\r\n",
    "phone": "02322 227955, 02322 228455",
    "bloodGroups": [
      "O+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Dr. D. Y. Patil Hospital Blood Bank",
    "lat": 16.715186,
    "lng": 74.256447,
    "address": "Kadamwadi, Kolhapur",
    "phone": "0231 2653286, 0231 2651027",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Arpan Blood Bank - Blood Component and Apheresis Centre Kolhapur",
    "lat": 19.189209,
    "lng": 72.97706,
    "address": "1st Floor, Saroj Appartment, Subhash Road 1315, &#39;C&#39; Ward,  Opposite to Shramik Bhavan, Laxmipuri, Kolhapur",
    "phone": "0231 2640588, 0231 2640599, 0231 6617208",
    "bloodGroups": [
      "AB-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Sai Seva Medical Foundation - Vaibhavlaxmi Blood Bank",
    "lat": 19.205274,
    "lng": 72.840465,
    "address": "1036/A, E- Ward, 1st  Floor, Deccan Engineering, Opposite to Parvati Multiplex, Rajaram Road, Kolhapur\r\n",
    "phone": "0231 6454949, 0231 2664949",
    "bloodGroups": [
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Kolhapur Municipal Corporation Blood Bank",
    "lat": 16.698607,
    "lng": 74.223891,
    "address": "C.T.S. 83 D-Ward, Near Kasba Gate Police, Chowky, Kolhapur\r\n",
    "phone": "0231 2541870",
    "bloodGroups": [
      "B-",
      "AB-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Vande Mataram Samajik Samstha&#39;s - Jeevandhara Blood Bank",
    "lat": 16.69573,
    "lng": 74.247263,
    "address": "1648 E- Ward Saidarshan Hights , Opposite to Sarada Medical, Chandrakanth Candre Kalasangrahalay, Rajarampuri, 7th Lane, Kolhapur\r\n",
    "phone": "0231 2526363, 0231 2522223",
    "bloodGroups": [
      "AB-",
      "A+",
      "B-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Sanjeevan Blood Bank",
    "lat": 16.706599,
    "lng": 74.231346,
    "address": "250/B/65  First Floor, Lucky Naresh Banglow, Opposite to Collector Office, Nagala Park, Kolhapur, \r\n",
    "phone": "0231 2668031, 0231 2668032",
    "bloodGroups": [
      "A+",
      "O-",
      "O+",
      "B-",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Shri.R.R.Patil Shikashan Sheti sanshodhan Aani vikas sanstha Blood Bank",
    "lat": 16.680271,
    "lng": 74.461733,
    "address": "M/s Adhar Blood Bank, 1st Floor, C.S. No. 16432 / 1, H No. 12/966, C/o. Dr. Dilip Joshi Hospital, Sambhaji Chowk, Rajaram Road, Ichalkaranji, Tal - Hatkanangle, Kolhapur",
    "phone": "0230 2430073, 0230 2430074",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Government Medical College General Hospital Blood Bank",
    "lat": 18.39451,
    "lng": 76.578201,
    "address": "Blood Bank, Government Medical College & Hospital, Old Railway Station,  Gandhi Chowk, Latur",
    "phone": "02382 257670, 02382 253017",
    "bloodGroups": [
      "O-",
      "B+"
    ]
  },
  {
    "name": "IRCS - Dr. Bhalchandra Blood Bank",
    "lat": 18.401208,
    "lng": 76.580639,
    "address": "Red Cross Bhavan, Gandhi Market, Latur ",
    "phone": "02382 246078, 02382 254994",
    "bloodGroups": [
      "B+",
      "AB-",
      "O+",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Smt. Saraswati Karad Blood Bank",
    "lat": 18.429485,
    "lng": 76.577846,
    "address": "MIMSR Medical College and Y.C.R. Hospital, Vishwanath Puram,  Ambejogai Road, Latur",
    "phone": "02382 227424, 02382 227028 (Extn. 242)",
    "bloodGroups": [
      "AB+",
      "A-"
    ]
  },
  {
    "name": "IRCS Nagappa Amberkhane Blood Bank",
    "lat": 18.392306,
    "lng": 77.106985,
    "address": "Banshelki Road Near Nalegaon Railway Crossing Gate Udgir, Latur ",
    "phone": "02385 258325",
    "bloodGroups": [
      "A+",
      "A-",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Arpan Blood Bank Latur",
    "lat": 18.408491,
    "lng": 76.551573,
    "address": "H.No R-3-1030,  Old Sonawane Hospital, Near  Ashok Hotel, Main Road, Latur",
    "phone": "02382 251476, 02382 252476",
    "bloodGroups": [
      "A+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Mauli Blood Bank",
    "lat": 18.451173,
    "lng": 73.89143,
    "address": "Gayatri Hospital, Barshi Road, Latur ",
    "phone": "02382 224000",
    "bloodGroups": [
      "O+",
      "A-"
    ]
  },
  {
    "name": "Global Hospital Blood Bank",
    "lat": 18.999282,
    "lng": 72.840787,
    "address": "No. 35, Dr. Ernest Borges Road, Hospital Avenue, \r\nOpposite to Shirodkar High School, Parel, Mumbai.",
    "phone": "022 67670101, 022 67670342",
    "bloodGroups": [
      "A-",
      "O-",
      "A+",
      "B-",
      "AB-",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "ACTREC",
    "lat": 19.065019,
    "lng": 73.064508,
    "address": "Department of Transfusion Medicine, ACTREC, \r\nTata memorial centre, \r\nSector 22 Kharghar, \r\nNavi Mumbai.",
    "phone": "022 27405000, Ext 5515;                                  Direct No. 022 27405073",
    "bloodGroups": [
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Deepak Foundation&#39;s Anviksha Blood Bank",
    "lat": 19.082389,
    "lng": 72.904481,
    "address": "Paras Darshan, M. G. Road, Ghatkopar, (E) Mumbai ",
    "phone": "022 21026290, 022 21025927",
    "bloodGroups": [
      "A+",
      "O+",
      "B-",
      "AB+",
      "B+",
      "AB-",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Ashirwad Blood Bank",
    "lat": 19.017341,
    "lng": 72.848164,
    "address": "Imperial Mahal, 2nd Floor  Above Shabana Stores, Khodadad Circle, Dr. B. A. Ambedkar Road, Dadar TT,  Mumbai",
    "phone": "022 24154826, 022 24154827",
    "bloodGroups": [
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Asian Heart Institute and Research Center",
    "lat": 19.065253,
    "lng": 72.860832,
    "address": "ICICI Tower,  Bandra Kurla Complex, Bandra (E) Mumbai",
    "phone": "022 66986666, 022 26508487",
    "bloodGroups": [
      "O+",
      "B-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "B.S.E.S M.G. Hospital Blood Bank",
    "lat": 19.119457,
    "lng": 72.844948,
    "address": "Rotary D. G. Goenka Blood Bank, Near Railway Station Andheri (W), Mumbai",
    "phone": "022 66487576, 022 66487577, 022 66487578, 022 26283557",
    "bloodGroups": [
      "B-",
      "B+",
      "O-",
      "AB+",
      "O+",
      "A-",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Bandra Holy Family Hospital Society Blood Bank",
    "lat": 19.055059,
    "lng": 72.827202,
    "address": "Saint Andrews Road, Bandra, Mumbai",
    "phone": "022 30610300, 022 30610555, 022 26518373",
    "bloodGroups": [
      "B-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Bhabha Atomic Research Centre Hospital Blood Bank",
    "lat": 19.042464,
    "lng": 72.914358,
    "address": "BARC Hospital, Anushakti Nagar Mumbai",
    "phone": "022 25598353, 022 25598361, 022 25558494 ",
    "bloodGroups": [
      "AB+",
      "AB-",
      "O+",
      "O-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Bombay Hospital Trust Blood Bank",
    "lat": 18.94103,
    "lng": 72.82816,
    "address": "12, New Marine Lines Mumbai",
    "phone": "022 22067676",
    "bloodGroups": [
      "O-",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Borivali Blood Bank (Doshi Memorial Charitable Trust)",
    "lat": 19.199816,
    "lng": 72.845937,
    "address": "3,4,5, Vithal Apartment, Near Ram Mandir, Mandpeshwar Road, Opposite, Flyover,  Borivali (w) ",
    "phone": "022 28936203, 022 28935219",
    "bloodGroups": [
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Breach Candy Hospital And Research Centre Blood Bank",
    "lat": 18.972677,
    "lng": 72.804312,
    "address": "60 A, Bhulabhai Desai Road, Mumbai",
    "phone": "022 23667811, 022 23872666",
    "bloodGroups": [
      "AB+",
      "O+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "B. Y. L. Nair Hospital Blood Bank",
    "lat": 18.974279,
    "lng": 72.822573,
    "address": "New OPD Building. 2nd Floor, Dr. A. L. Nair Road Mumbai Central, Mumbai ",
    "phone": "022 23027644, 022 23027645, 022 23098150",
    "bloodGroups": [
      "AB-",
      "B+",
      "O+",
      "A-",
      "A+",
      "O-",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Cama and Albles Hospital - Abdul Fazalbhoy Blood Bank",
    "lat": 18.941948,
    "lng": 72.832185,
    "address": "Mahapalika Marg, Mumbai CST",
    "phone": "022 22611667, 022 22611654, 022 22611647 (Extn. 319)                         022 22611648",
    "bloodGroups": [
      "O+",
      "AB-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Dr. L. H. Hiranandani Hospital Blood Bank",
    "lat": 19.120591,
    "lng": 72.917105,
    "address": "Hill Side Avenue, Hiranandani Gardens, Powai ",
    "phone": "022 25763355, 022 25763356, 022 25763357, 022 25763344, 022 25763311",
    "bloodGroups": [
      "AB-",
      "AB+",
      "O+",
      "B+",
      "O-",
      "B-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "ESIC Model Hospital cum ODC Blood Bank",
    "lat": 19.118392,
    "lng": 72.86724,
    "address": "Room No. 20/A, 1st Floor, ESIC Model Hospital cum ODC & PGIMSR, Central Road, M.I.D.C, Opposite to MIDC Police Station, Andheri (East), Mumbai ",
    "phone": "022 28321361",
    "bloodGroups": [
      "A-",
      "O+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Fortis Hospital Blood Bank",
    "lat": 19.162122,
    "lng": 72.942063,
    "address": "Mulund Goregaon Link Road, Nahur , Mumbai ",
    "phone": "022 67994370, 022 43654374",
    "bloodGroups": [
      "A-",
      "O-",
      "B-"
    ]
  },
  {
    "name": "G. T. Hospital Blood Bank",
    "lat": 18.946532,
    "lng": 72.833317,
    "address": "Near L.T.Marg Police Station, Mumbai",
    "phone": "022 22031111, 022 22621468 (Extn. 1351)",
    "bloodGroups": [
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Hematology Laboratory Blood Bank",
    "lat": 19.183375,
    "lng": 72.853442,
    "address": "Parekh House, Ground Floor,\r\n14 Mama Parmanand Marg, \r\nMumbai.",
    "phone": "022 23691297",
    "bloodGroups": [
      "B-",
      "AB-",
      "O+",
      "A+",
      "A-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Harilal Bhagwati Hospital Blood Bank",
    "lat": 19.245458,
    "lng": 72.856027,
    "address": "S. V. P. Road, Borivali-W, Mumbai",
    "phone": "022 28932461, 022 28932462, 022 28932463 (Extn.205, 409)",
    "bloodGroups": [
      "B-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Suburban Hi-tech Blood Bank",
    "lat": 19.183781,
    "lng": 72.849166,
    "address": "Shagun Building, 2nd Floor, 206, Rani Sati Road, Malad (E)",
    "phone": "022 28714060, 022 28714070",
    "bloodGroups": [
      "B+",
      "A+",
      "AB-",
      "A-",
      "O-",
      "O+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Holy Spirit Hospital Blood Bank",
    "lat": 19.128442,
    "lng": 72.866496,
    "address": "Mahakali  Road, Andheri (E), Mumbai",
    "phone": "022 28200353, 022 28248505",
    "bloodGroups": [
      "B+",
      "O-"
    ]
  },
  {
    "name": "Indian Red Cross Society Bombay City Branch Blood Bank",
    "lat": 18.932476,
    "lng": 72.836574,
    "address": "Blood Centre, 141, Shahid Bhagatsingh Road, Town Hall Compound, Near R.B.I. Fort",
    "phone": "022 40500400, 022 22663560, 022 22663195, 022 22677448",
    "bloodGroups": [
      "O-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "INS - Ashwini Blood Bank",
    "lat": 18.901263,
    "lng": 72.815698,
    "address": "Near R. C. Church, Colaba, Mumbai",
    "phone": "022 22151666 (Extn. 3764)",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Jaslok Hospital And Research Centre Blood Bank",
    "lat": 18.971653,
    "lng": 72.809968,
    "address": "15, Dr. G. Deshmukh Marg, Mumbai",
    "phone": "022 66573434, 022 66573035",
    "bloodGroups": [
      "AB-",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "K. B. Bhabha General Hospital Blood Bank",
    "lat": 19.057493,
    "lng": 72.833636,
    "address": "R. K. Patkar Marg, Bandra (W), Mumbai",
    "phone": "022 26422541, 022 26422775, 022 26405226 (Extn. 4103, 4104)",
    "bloodGroups": [
      "O-",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "K. J. Somaiya Medical College and Hospital Blood Bank",
    "lat": 19.047282,
    "lng": 72.874706,
    "address": "Somaiya Ayurvihar Complex, Eastern Express Highway, Sion, Mumbai ",
    "phone": "022 24024671, 022 24020946, 022 24091855      ",
    "bloodGroups": [
      "A-",
      "B-",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Kapoorben Vasanji Lathiya Blood Bank - Nanavati Hospital",
    "lat": 19.095831,
    "lng": 72.840101,
    "address": " Dr Balabhai Nanavati Hospital,S V Road, Vile Parle (W), Mumbai ",
    "phone": "022 26119924, 022 26182255, 022 26267500",
    "bloodGroups": [
      "B+",
      "O+",
      "A-",
      "A+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "K. E. M. Hospital Blood Bank",
    "lat": 19.001515,
    "lng": 72.841877,
    "address": "Acharya Donde Marg, Parel, Mumbai",
    "phone": "022 24107421, 022 24107246, 022 24107249, 022 24107000 ",
    "bloodGroups": [
      "B-",
      "A-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Kohinoor Hospital Blood Bank",
    "lat": 19.076212,
    "lng": 72.886208,
    "address": "Upper Basement, Room No. 29 to 43, Kirol Road, Off L.B.S Marg, Kurla (w)",
    "phone": "022  67556737, 022  67556755, 022 30553055",
    "bloodGroups": [
      "O-",
      "B+",
      "O+",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Kokilaben Dhirubhai Ambani Blood Bank",
    "lat": 19.131221,
    "lng": 72.824772,
    "address": "4 Bunglows, Achutrao Patwardhan Marg, Andheri (west), Mumbai ",
    "phone": "022 30900900, 022 30972030",
    "bloodGroups": [
      "A+",
      "A-"
    ]
  },
  {
    "name": "Lilavati Hospital and Research Centre Blood Bank",
    "lat": 19.051089,
    "lng": 72.828889,
    "address": "A 791, Bandra Reclamation, Bandra (W), Mumbai",
    "phone": "022 26751000, 022 26568000, 022 26437648",
    "bloodGroups": [
      "AB-",
      "AB+",
      "B+",
      "O+",
      "A-",
      "B-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Lokmanya Tilak Municipal Hospital Blood Bank",
    "lat": 19.036984,
    "lng": 72.859049,
    "address": "O. P. D. Building, 1st Floor, Sion (W), Mumbai",
    "phone": "022 24021771,  022 24063494, 022 24063489",
    "bloodGroups": [
      "A+",
      "B+",
      "O+",
      "AB-",
      "A-",
      "B-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "M. T. Agarwal Municipal General Hospital Blood Bank",
    "lat": 19.177861,
    "lng": 72.946234,
    "address": "Dr. R. P. Road, Mulund (W), Mumbai",
    "phone": "022 25640767, 022 25605730 (Extn. 308)",
    "bloodGroups": [
      "A+",
      "O-"
    ]
  },
  {
    "name": "Mahatma Gandhi Seva Mandir Blood Bank",
    "lat": 19.055801,
    "lng": 72.836932,
    "address": "Mahatma Gandhi Seva Mandir Hospital, 2nd Floor, Opposite to Bandra Lake, S. V. Road, Bandra (W), Mumbai  ",
    "phone": "022 26431893, 022 26431897",
    "bloodGroups": [
      "A+",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Manas Serological Institute Blood Bank",
    "lat": 19.13522,
    "lng": 72.848108,
    "address": "CTS NO-167 / 168 / A1, 101-104, Grace Plaza, S. V. Road, \r\nNear Railway Phatak, Jogeshwari (W), Mumbai ",
    "phone": "022 26784546 ",
    "bloodGroups": [
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Masina Hospital Blood Bank",
    "lat": 18.974886,
    "lng": 72.835711,
    "address": "Sant Savta Marg, Byculla (E) ",
    "phone": "022 23700715",
    "bloodGroups": [
      "AB+",
      "B-",
      "A+",
      "O-",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "N.  Wadia Maternity  Hospital Blood Bank",
    "lat": 19.003238,
    "lng": 72.842837,
    "address": "Acharya Donde Marg, Parel, Mumbai",
    "phone": "022 24165638, Extn 124; 022 24146963,022 24146964,022 24146965,Extn 124",
    "bloodGroups": [
      "A-",
      "O-",
      "B-",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Matoshri Valbai Mulji Shah - Arpan Blood Bank",
    "lat": 19.142653,
    "lng": 72.933304,
    "address": "Aniraj Tower,  Janta Market, L.B.S Marg, Bhandup (W), Mumbai",
    "phone": "022 25951044, 022 25941142",
    "bloodGroups": [
      "AB-",
      "O+",
      "B+",
      "A+",
      "B-",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Navjivan Blood Bank and Lab",
    "lat": 19.23024,
    "lng": 72.852643,
    "address": "Shop No.1, Abhilasha II, Punjabi Lane Borivali (W)",
    "phone": "022 28934122, 022 28935133, 022 28918144, 022 28921727, 022 25339495                                  ",
    "bloodGroups": [
      "A-",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "P. D. Hinduja National Hospital And Medical Research Centre Blood Bank",
    "lat": 19.033615,
    "lng": 72.838105,
    "address": "Veer Savarkar Road, Mahim (W), Mumbai",
    "phone": "022 24447308, 022 24447309, 022 24447310",
    "bloodGroups": [
      "A-",
      "O+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Meenatai Thackeray Blood Bank - Siddharth Hospital",
    "lat": 19.159649,
    "lng": 72.840284,
    "address": "Siddharth Nagar, Prabhodhan Kridabhawan Marg,\r\nGoregaon (W)",
    "phone": "022 28797586, 022 28797587, 022 28722929                     ",
    "bloodGroups": [
      "AB+",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Prince Aly Khan Hospital Blood Bank",
    "lat": 18.97084,
    "lng": 72.836617,
    "address": "Aga Hall, Nesbit Road, Mazgaon, Mumbai ",
    "phone": "022 23777934, 022 23777936, 022 23777800, 022 23777907, 022 23777908",
    "bloodGroups": [
      "O+",
      "B+",
      "A+",
      "A-",
      "AB-",
      "O-",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Dr. R. N. Cooper General Hospital Blood Bank",
    "lat": 19.107714,
    "lng": 72.835618,
    "address": "North south Road No-1, Juhu, Vile-Parle (W) Mumbai",
    "phone": "022 26242609, 022 26247254, 022 26247255, 022 26247256 (Extn. 201, 203)",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Rajawadi Blood Bank - Seth V. C. Gandhi & M. A. Vora Municipal General Hospital",
    "lat": 19.079304,
    "lng": 72.901693,
    "address": "Seth V. C. Gandhi and M. A. Vora M, Rajawadi, Ghatkopar-(E), Mumbai",
    "phone": "022 21025611 (Extn. 141, 122)",
    "bloodGroups": [
      "AB+",
      "O-",
      "B+",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "S. L. Raheja Hospital Blood Bank",
    "lat": 19.046572,
    "lng": 72.842207,
    "address": "Mahim, Raheja Rugnalaya Marg, Mumbai",
    "phone": "022 24445528, 022 66529682, 022 24449418",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "S. R. Mehta and Sir. K.P. Cardiac Institute Blood Bank",
    "lat": 19.032412,
    "lng": 72.85958,
    "address": "Plot No. 96, Road No.31, King Circle Sion, (E) Mumbai  ",
    "phone": "022 24035454, 022 2409 4732",
    "bloodGroups": [
      "AB-",
      "A+",
      "O+",
      "B-",
      "A-",
      "B+",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Saifee Hospital Trust Blood Bank",
    "lat": 18.952471,
    "lng": 72.818058,
    "address": "15/17, Maharishi Karve Marg, Opposite to Charni Road Station Mumbai",
    "phone": "022 67571140",
    "bloodGroups": [
      "B+",
      "O-"
    ]
  },
  {
    "name": "Sarvodaya Hospital Samarpan Blood Bank",
    "lat": 19.089801,
    "lng": 72.907187,
    "address": "Office Building, 2nd Floor, Sarvodaya Hospital, LBS  Marg, Ghatkopar (W), Mumbai",
    "phone": "022 25102511, 022 25100100",
    "bloodGroups": [
      "AB-",
      "B+",
      "A+",
      "A-",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Seven Hills Health Care Private Limited Hospital Blood Bank",
    "lat": 19.117797,
    "lng": 72.87809,
    "address": "Blood Bank, 2nd Floor, Block-16, Seven Hills Hospital,  Survey No.155, 156, 162 - 168 Part, Marol - Maroshi Road,  \r\nAndheri (E), Mumbai ",
    "phone": "022 67676719",
    "bloodGroups": [
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Shushrusha Citizens Co-operative Hospital Blood Bank",
    "lat": 19.023426,
    "lng": 72.837899,
    "address": "698-B Ranade Road, Dadar, Mumbai",
    "phone": "022 24469579, 022 25288698",
    "bloodGroups": [
      "B-",
      "O+",
      "AB-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Sir J.J.Group of Hospital Blood Bank",
    "lat": 18.962909,
    "lng": 72.833639,
    "address": "Main Building, Ground Floor, Sir J. J. Hospital, Byculla, Mumbai",
    "phone": "022 23735555, 022 23739400 (Extn. 2248, 2238)",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Sir J.J.Mahanagar Rakthapedhi",
    "lat": 18.963334,
    "lng": 72.832489,
    "address": "Sir J.J Mahanagar Raktapedhi, F. D. Petit Building, J.J.Campus, J. J. Road, Byculla, Mumbai ",
    "phone": "022 23735585, 022 23733531",
    "bloodGroups": [
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Saint George&#39;s Hospital & Regional  Blood Bank",
    "lat": 18.94027,
    "lng": 72.837319,
    "address": "Saint George&#39;s Hospital, Behind General Post Office, \r\nP. D&#39;Mello Road, Fort, Mumbai",
    "phone": "022 22621420, 022 22620242 (Extn.1431)  ",
    "bloodGroups": [
      "AB-",
      "B+",
      "B-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Tata Memorial Hospital Blood Bank",
    "lat": 19.004856,
    "lng": 72.842945,
    "address": "5th Floor, Service Block, Dr. E. Borges Road, Parel, Mumbai ",
    "phone": "022 24177000, 022 24127096 (Extn. 4682, 4684)",
    "bloodGroups": [
      "AB-",
      "O-",
      "O+",
      "A+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "The B.D. Petit Parsee General Hospital Blood Bank",
    "lat": 18.968704,
    "lng": 72.805743,
    "address": "B.Petit Road, Cumballa Hill,  Mumbai",
    "phone": "022 61186190, 022 61186192, 022 61186333",
    "bloodGroups": [
      "O-",
      "B-",
      "AB+",
      "A-",
      "O+"
    ]
  },
  {
    "name": "V. N. Desai Municipal General Hospital Blood Bank",
    "lat": 19.078822,
    "lng": 72.844994,
    "address": "T. P. S. II, 11th Road, Santacruz (E) Mumbai",
    "phone": "022 26182081, 022 357022, 022 26151506 (Extn.356, 357)",
    "bloodGroups": [
      "A+",
      "B+",
      "A-",
      "AB+",
      "AB-",
      "B-",
      "O-"
    ]
  },
  {
    "name": "West Coast Blood Bank",
    "lat": 19.042954,
    "lng": 72.84073,
    "address": "Basement 101, Moon Building, 798, Mori Road, Mahim(W), Mumbai",
    "phone": "022 24444544 ",
    "bloodGroups": [
      "A-",
      "O-",
      "B+",
      "O+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Government Medical College Blood Bank Nagpur",
    "lat": 21.126097,
    "lng": 79.097101,
    "address": "Model Blood Bank, 2nd Floor, Hospital Building, Government Medical College & Hospital, Nagpur  ",
    "phone": "0712 2744695",
    "bloodGroups": [
      "AB+",
      "B-",
      "A+",
      "A-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Super Speciality Hospital and Medical Post Graduate Institute Blood Bank",
    "lat": 21.123952,
    "lng": 79.102367,
    "address": "Maenad Road, Near RST Cancer Hospital, Nagpur",
    "phone": "0712 2703501, 0712 2746682",
    "bloodGroups": [
      "AB+",
      "A-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Indira Gandhi Medical College and Hospital Blood Bank",
    "lat": 21.153917,
    "lng": 79.092894,
    "address": "IGMC Hospital, Central Avenue Road, Nagpur ",
    "phone": "07122820134,0712 2728621, 0712 2774766",
    "bloodGroups": [
      "O-",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Daga Memorial Women Government Hospital Blood Bank",
    "lat": 21.151511,
    "lng": 79.105434,
    "address": "Gandhibag, Nagpur",
    "phone": "0712 2729202, 0712 2729333 ",
    "bloodGroups": [
      "B+",
      "AB+",
      "B-",
      "O-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Central India Institute of Haematology & Oncology&#39;s Blood & Blood Component Bank and Apheresis Unit",
    "lat": 21.134731,
    "lng": 79.080223,
    "address": "Plot No-14/2, Park Corner, Bal Raj Marg, Near Loma Square, Dhantoli, Nagpur",
    "phone": "0712 2430038 , 0712 2428972 , 0712 6464198",
    "bloodGroups": [
      "O+",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Jeevan Jyoti Blood Bank and Component",
    "lat": 21.123051,
    "lng": 79.057149,
    "address": "J P Chamber, Madhav Nagar, Dakshin Ambakshari Road  Nagpur",
    "phone": "0712 2231660,  0712 2230876",
    "bloodGroups": [
      "B-",
      "AB+",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Dr. Hegdewar Blood Bank",
    "lat": 21.140579,
    "lng": 79.060505,
    "address": "2, Sitaram Smruti, West High Court Road, Laxmibhuvan Square, Audumbar Apartment, Dharmpeth, Nagpur ",
    "phone": "0712 2528292, 0712 2538900, 09922407171, 09881000203",
    "bloodGroups": [
      "B-",
      "O+",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Sainath Blood Bank",
    "lat": 21.134294,
    "lng": 79.076369,
    "address": "531,Jaiswal Building, Above R.K. Traders, Old shukrawari Road, Sakkardara Nagpur",
    "phone": "9422502066",
    "bloodGroups": [
      "A+",
      "A-",
      "B+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Ayush Blood Bank and component Lab",
    "lat": 21.135231,
    "lng": 79.072978,
    "address": "9th Floor, A wing, 901-905, 910-912, Lokmat Building, Nagpur",
    "phone": "0712 6618666, 0712 5631137     ",
    "bloodGroups": [
      "O+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Lifeline Blood Bank Components and Apherisis Centre Blood Bank",
    "lat": 21.138999,
    "lng": 79.063093,
    "address": "Neeti Gaurav complex , 2nd Floor, Central Bazar Road, Lokmat Square, Ramdaspeth, Nagpur ",
    "phone": "0712 6686666, 0712 6686665",
    "bloodGroups": [
      "O+",
      "AB+",
      "A+",
      "A-",
      "B-",
      "B+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Rainbow Blood Bank",
    "lat": 21.133584,
    "lng": 79.072736,
    "address": "3rd Floor, 282, Rainbow Diagnostic Services Central Bazar Road, Ramdas Peth, Nagpur",
    "phone": "0712 6636666",
    "bloodGroups": [
      "AB-",
      "B-",
      "O-"
    ]
  },
  {
    "name": "NKP Salve Institute of Medical Science and Research Center (Lata Mangeshkar Hospital), Blood Bank",
    "lat": 21.144346,
    "lng": 79.078848,
    "address": "5, YMCA Complex, Digdoh Hills, Hingna Road, Nagpur",
    "phone": "07104 236290, 07104 236291, 07104 232905",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Dr. Shankarrao Chavan Government Medical College and Guru Govindsinghji Memorial Hospital Blood Bank",
    "lat": 19.109305,
    "lng": 77.29295,
    "address": "Vazirabad, Nanded ",
    "phone": "02462 235711, 02462 235712, 02462 234702",
    "bloodGroups": [
      "O+",
      "A-",
      "A+",
      "B+",
      "B-",
      "AB-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 17.399811,
    "lng": 78.485456,
    "address": "Parsi Anjuman Complex, Vazirabad, Nanded      ",
    "phone": "02462 236699, 02462 231012, 02462 236633, 02462 227335",
    "bloodGroups": [
      "B+",
      "O+"
    ]
  },
  {
    "name": "Golvalkar Guruji Blood Bank",
    "lat": 19.168646,
    "lng": 77.326553,
    "address": "Plot No.2-12-407, Bandhaghat Road, Vazirabad, Nanded",
    "phone": "02462 243300",
    "bloodGroups": [
      "O+",
      "B-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Arpan Blood Bank",
    "lat": 19.161084,
    "lng": 77.303022,
    "address": "2nd Floor, Dayma Complex, Doctor Lane, Ghamodia,Nanded",
    "phone": "02462 241587, 02452 239587",
    "bloodGroups": [
      "O-",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Guru Gobindsinghji Blood Bank",
    "lat": 19.156029,
    "lng": 77.309,
    "address": "Geeta Bhavan 1 & 2 Floor, House No 3-1-366, Near Government, Opposite to Ayurvedic College, Bus Stand Road, Vazirabad, Nanded          ",
    "phone": "02462 233332",
    "bloodGroups": [
      "A-",
      "O+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Nanded Blood Bank",
    "lat": 19.161264,
    "lng": 77.304543,
    "address": "Shivaji Nagar ,Opposite to Adhar Hospital, Nanded ",
    "phone": "02462 233810",
    "bloodGroups": [
      "AB+",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Hazur Saheb Blood Bank",
    "lat": 19.153093,
    "lng": 77.318654,
    "address": "2nd Floor, Opposite to Bank of India, Sant Kripa Market, GG Road, Nanded ",
    "phone": "02462 248888, 02462 239999",
    "bloodGroups": [
      "AB+",
      "B+",
      "AB-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Civil Surgeon - District General Hospital Blood Bank",
    "lat": 21.33867,
    "lng": 74.234768,
    "address": "Nandurbar, Railway Station Road Survey No.406, Civil Hospital Compound,  Sakri Road, Near Collector Office Nandurbar  ",
    "phone": "02564 202510, 02564 210135, 02564 226225, 02564 210122",
    "bloodGroups": [
      "AB+",
      "A-",
      "AB-",
      "O-",
      "B+",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Sahada Blood Bank - Shree Swami  Samartha Vaidyakiya  Shaikshanik and Sanshodhan Sanstha ",
    "lat": 21.554798,
    "lng": 74.472874,
    "address": "C/o. 1st Floor, Shushrut Hospital, Khetiya Road, Survey \r\nNo. 67/3, Plot No. 3, Sahada, Nandurbar",
    "phone": "9371855918",
    "bloodGroups": [
      "B+",
      "O+",
      "B-",
      "O-",
      "AB+",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Jankalyan Rakta Pedhi",
    "lat": 21.36433536,
    "lng": 74.24463853,
    "address": "Nandurbar,1st Floor, Vivekanand Hospital, Desaipura, Nandurbar ",
    "phone": "02564 226934, 02564 226935, 02564 222226 ",
    "bloodGroups": [
      "A-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Malegaon Blood Bank",
    "lat": 20.55474,
    "lng": 74.524396,
    "address": "2nd Floor, West End Complex, Satana Naka, Malegaon ",
    "phone": "9371550550",
    "bloodGroups": [
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Seva Blood Bank",
    "lat": 20.552689,
    "lng": 74.516643,
    "address": "Nilkanth Building, Satana Naka, Satana Road, Malegaon, Nashik",
    "phone": "02554 257077",
    "bloodGroups": [
      "AB-",
      "A+",
      "B+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Roachabai Sugnomal Manwani - Cantonment General Hospital Blood Bank",
    "lat": 19.903354,
    "lng": 73.825824,
    "address": "Vadner Road, Devlali, Nashik",
    "phone": "0253 2493365, 0253 24913377,  0253 2462068",
    "bloodGroups": [
      "O-",
      "B-"
    ]
  },
  {
    "name": "Metro Blood Bank - District (Civil) Hospital Nashik",
    "lat": 19.996886,
    "lng": 73.778198,
    "address": "District - Civil Hospital Blood Bank, Near Thakkar Bazaar,  Trimbak Naka, Nashik",
    "phone": "0253 2318020, 0253 2577949",
    "bloodGroups": [
      "AB+",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Sainik Aspatal Military Hospital Blood Bank",
    "lat": 19.9483203,
    "lng": 73.841866,
    "address": "Sainik Aspatal, Military Hospital, Deolali",
    "phone": "9545355252",
    "bloodGroups": [
      "AB+",
      "B+",
      "A-",
      "O+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Ansar Blood Bank",
    "lat": 20.552043,
    "lng": 74.532641,
    "address": "1398/1, Islampura, Industrial Society Compound, Quidwai Road, Malegaon, Nasik",
    "phone": "02554 238383, 02554 230169, 02254 230039",
    "bloodGroups": [
      "A-",
      "A+"
    ]
  },
  {
    "name": "Arpan Blood Bank and Blood Component Laboratory and Research Centre",
    "lat": 20.004874,
    "lng": 73.787164,
    "address": "1st Floor, Office No.102/103, Dr. Athawale Chambers, Opposite to Gavkari Press Tilak Path, Nashik \r\n",
    "phone": "0253 2311358, 0253 2576058",
    "bloodGroups": [
      "B-",
      "O+",
      "AB+",
      "O-",
      "B+",
      "A-",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Jankalyan Blood Bank",
    "lat": 20.008838,
    "lng": 73.7702,
    "address": "3, Shree Nagar, Old Gangapur Naka, Gangapur Road, Nashik\r\n",
    "phone": "0253 2573493, 0253 2575249",
    "bloodGroups": [
      "O-",
      "B-",
      "AB-",
      "AB+",
      "A-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "NDMVPS Medical College and Hospital Blood Bank",
    "lat": 20.037363,
    "lng": 73.852998,
    "address": "At Post Adgaon Dist Nashik ",
    "phone": "0253 2220522, 0253 2303930",
    "bloodGroups": [
      "B-",
      "AB-",
      "AB+",
      "A-",
      "O-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Samta Blood Bank",
    "lat": 19.984791,
    "lng": 73.782607,
    "address": "F-1, 1st Floor Suyojit Comercial Complex, Mumbai Agra Highway, Below Data Mastics, Mumbai Naka, Nashik \r\n",
    "phone": "0253 2472499, 0253 2472599, 0253 2472699, 09975997867, 09975997863, 09975997864",
    "bloodGroups": [
      "O-",
      "B+"
    ]
  },
  {
    "name": "Sanjeevani Blood Bank",
    "lat": 19.975586,
    "lng": 73.803963,
    "address": "Nashik, Krushna-Chaya Bangla, Plot No. 10/11, Kurdukar Nagar, Behind Fame Theatre, Nashik Pune Road, Nashik ",
    "phone": "0253 2411888  ",
    "bloodGroups": [
      "A-",
      "AB-",
      "B+",
      "B-",
      "A+",
      "O-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Jijau Mahila Sevabhavi Sansthan Nashik Blood Bank and Transfusion Research institute Blood Bank",
    "lat": 19.990656,
    "lng": 73.775241,
    "address": "Ishwar Krupa Ganesh Nagar, Tidke Colony, Nashik ",
    "phone": "0253 2232996",
    "bloodGroups": [
      "B-",
      "B+",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "The Santajee Educational and Medical foundation Trust - Jeevan  Blood Bank ",
    "lat": 19.987781,
    "lng": 73.784138,
    "address": "Suyojit City Center, G-11, 12, 13, S. No. 567/1/1 & 567/1/3 (CTS No. 7249 & FP No. 60) Mumbai Naka, Near Mahamarg Bus Stand, Nashik \r\n",
    "phone": "7387348888",
    "bloodGroups": [
      "O+",
      "B+",
      "AB-",
      "A+",
      "B-",
      "O-",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "SMBT Institute of Medical Science and Research Centre - Blood Bank and Component",
    "lat": 19.76062,
    "lng": 73.769851,
    "address": "SMBT Institute of Medical Science & Research Centre, Blood Bank & Component,  Block-101, Ground Floor, \u2018A\u2019 Wing, New SMBT Hospital Building, Survey No. 470, Nandihills Appt., At Post-Dhamangaon, Ghoti, Igatpuri, Nashik\r\n",
    "phone": "02553 222300",
    "bloodGroups": [
      "A+",
      "O-",
      "A-",
      "O+",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Hindustan Aeronautics Limited Blood Bank",
    "lat": 20.105897,
    "lng": 73.931932,
    "address": "HAL, Aircraft Division, HAL, In Front of GES HAL High School, Ojhar Township, Niphad, Nashik\r\n",
    "phone": "02550 275845, 02550 278932 (Extn. 2589)",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "J.D.C. Bytco Hospital Blood Bank",
    "lat": 19.949132,
    "lng": 73.838742,
    "address": "1st Floor, Bytco Hospital, Nashik Road, Behind Durga Garden, Shahu Path, Nashik",
    "phone": "0253 2460251, 0253 24605352",
    "bloodGroups": [
      "A-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Shri Krishna Blood Bank",
    "lat": 17.83503,
    "lng": 76.622149,
    "address": "Dr. Patange Hospital Building, Ajay Nagar Omerga, Omerga,  Osmanabad  ",
    "phone": "02457 252004, 02457 252232, 02457 252469",
    "bloodGroups": [
      "B+",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Civil Surgeon, General Hospital Blood Bank",
    "lat": 18.18077,
    "lng": 76.034735,
    "address": "Civil Hospital Osmanabad, Tqand, Osmanabad ",
    "phone": "02472 226924",
    "bloodGroups": [
      "B+",
      "O-",
      "AB-",
      "B-",
      "O+",
      "AB+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Civil Surgeon - District General Hospital Blood Bank",
    "lat": 19.271699,
    "lng": 76.765032,
    "address": "Blood Bank Civil Surgeon, District General Hospital Blood Bank, Subhash Road, Parbhani\r\n",
    "phone": "02452 223458, 02452 231287",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Kanthak Sevabhavi Sanstha - New Life Blood  Bank",
    "lat": 19.273124,
    "lng": 76.782625,
    "address": "Plot No 22, Survey No 389 and 394, Beside Gurudwara, Station Road, Parbhani ",
    "phone": "02452 220222",
    "bloodGroups": [
      "O+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 18.152597,
    "lng": 74.574996,
    "address": "Indian Red Cross Society (IRCS), (Late Manikbai Chandulal Saraf) Blood Bank, Near Government Silver Jubilee Hospital, Patas Road, Baramati, Pune",
    "phone": "02112 222951",
    "bloodGroups": [
      "AB+",
      "B+",
      "B-",
      "O-",
      "A-",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Pune Chest and General Hospital Blood Bank",
    "lat": 18.575032,
    "lng": 73.80537,
    "address": "Aundh Cest Hospital, Aundh Camp, Pune",
    "phone": "020 27285432, 020 27286458",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Sasoon Sarvopchar Hospital Blood Bank",
    "lat": 18.515846,
    "lng": 73.858714,
    "address": "Ground Floor, Section 5, Opposite to Central Medical Stores, Station Road, Pune",
    "phone": "020 26126868, 020 24480431",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Armed Forces Blood Bank",
    "lat": 18.505159,
    "lng": 73.889694,
    "address": "Vanwadi Armed Force Medical College, Pune",
    "phone": "020 26026038, 020 26306337",
    "bloodGroups": [
      "O-",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Jankalyan Raktapedhi Pune",
    "lat": 18.50092,
    "lng": 73.857531,
    "address": "1003, Shukrawar Peth, Swargate - Saras Baugh Road, Near Natraj Hotel, Pune",
    "phone": "020 24449527, 020 24444502",
    "bloodGroups": [
      "O+",
      "B-",
      "AB-",
      "O-",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Inlaks Budharani Hospital Blood Bank",
    "lat": 18.534391,
    "lng": 73.887409,
    "address": "7-9, Koregaon Park, Pune",
    "phone": "020 66099999, 020 66099727, 020 66099703",
    "bloodGroups": [
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Indian Serological Institute Blood Bank",
    "lat": 18.506291,
    "lng": 73.84264,
    "address": "21, Anand Baugh, Navi Peth, Near Vaikunth, Pune",
    "phone": "020 24535244, 020 24538453",
    "bloodGroups": [
      "B+",
      "B-",
      "O-",
      "A-",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Acharya Anandrushiji Blood Bank",
    "lat": 18.508647,
    "lng": 73.844846,
    "address": "191-192, New Sadashiv Peth, S. M. Joshi Foundation Building, Near Patrakar Bhavan, Pune",
    "phone": "020 24537627, 020 65250707, 020 24531600",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Akshay Blood Bank",
    "lat": 18.47143,
    "lng": 73.959674,
    "address": "Survey No.10/1/3, Unnati Nagar, Bantar High School, Hadapsar, Pune",
    "phone": "020 26993247, 020 26993248,  ",
    "bloodGroups": [
      "A+",
      "AB-",
      "B+",
      "O+",
      "AB+",
      "O-",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Garware Blood Bank - Talegaon Rural Hospital",
    "lat": 18.735319,
    "lng": 73.675984,
    "address": "Talegaon Dhabhade, Maval, Pune ",
    "phone": "02114 223916, 02114 308399",
    "bloodGroups": [
      "AB+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Jehangir Hospital Blood Bank",
    "lat": 18.530392,
    "lng": 73.876808,
    "address": "32, Sasoon Road, Pune ",
    "phone": "020 66811722, 020 66811723,",
    "bloodGroups": [
      "A-",
      "AB+",
      "AB-",
      "B+",
      "O+",
      "O-",
      "A+",
      "B-"
    ]
  },
  {
    "name": "KEM Hospital Blood Bank",
    "lat": 18.519784,
    "lng": 73.866906,
    "address": "Sardar Moodliar Road, Rastha Peth, Pune",
    "phone": "020 26125600, 020 66037324, 020 26125603",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Grant Medical Foundation A.H. Wadia Trust Blood Bank",
    "lat": 18.533369,
    "lng": 73.876939,
    "address": "40, Sassoon Road, Ruby Hall Clinic, Post Box No. 70, Pune",
    "phone": "020 26166318, 020 66455264, 020 26163391",
    "bloodGroups": [
      "A+",
      "A-",
      "B+",
      "AB-",
      "O-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Bharati Vidyapeeth Medical Foundation Blood Bank",
    "lat": 18.459914,
    "lng": 73.855994,
    "address": "Sector - 28, Dhankawadi, Pune Satara Road, Pune",
    "phone": "020 40555555, 020 24379432",
    "bloodGroups": [
      "O+",
      "AB-",
      "A+",
      "A-",
      "B+",
      "AB+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Padmashree Dr. D.Y. Patil (Vishweshwar) Blood Bank",
    "lat": 18.624175,
    "lng": 73.82126,
    "address": "Padmashree, Dr. D. Y. Patil Medical College Hospital, Sant Tukaram Nagar, Pimpari, Pune",
    "phone": "020 27423844, 020 27420439",
    "bloodGroups": [
      "B+",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Deenanath Mangeshkar Hospital Blood Bank",
    "lat": 18.502108,
    "lng": 73.832232,
    "address": "Erandawane, Near Mhatre Bridge, Pune",
    "phone": "020 26602307, 020 26602308, 020 26602313, 020 25420104",
    "bloodGroups": [
      "O+",
      "B+",
      "O-",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Poona Serological Institute Blood Bank",
    "lat": 18.516656,
    "lng": 73.866532,
    "address": "C.T.S. No. 592, 3rd Floor, Dhanwantari Complex, Rasta Peth, Pune",
    "phone": "020 26133387, 020 26141719, 020 27472876                     ",
    "bloodGroups": [
      "A-",
      "AB+",
      "O-",
      "O+",
      "A+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Sahiyadari Speciality Hospital Blood Bank",
    "lat": 18.513091,
    "lng": 73.839308,
    "address": "Kokoan Mitra Mandal Medical Port Trust&#39;s Sahiyadari Speciality Hospital Blood Bank, Plot No-30 C, Erandvane, Karve Road, Pune ",
    "phone": "020 25403232, 020 67213000",
    "bloodGroups": [
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Aditya Birla Memorial Hospital Blood Bank",
    "lat": 18.625716,
    "lng": 73.774775,
    "address": "Survey No:31, Near Morya Mangal Karyalay, Thergaon, Chinchwad, Pune ",
    "phone": "020 30717690, 020 30717676",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Rakesh Jain Memorial Blood Bank",
    "lat": 18.510752,
    "lng": 73.842158,
    "address": "Poona Hospital and Reserch Centre 27, Sadashiv Peth, Pune  ",
    "phone": "020 24331706, 020 66069000, 020 24338477",
    "bloodGroups": [
      "AB-",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Noble Hospital Blood Bank",
    "lat": 18.505035,
    "lng": 73.927256,
    "address": "B-007, Basement C/o. Noble Hospital, 153 Magarpatta City Road, Hadapsar, Pune  ",
    "phone": "020 66285050, 020 66285199",
    "bloodGroups": [
      "A+",
      "B-"
    ]
  },
  {
    "name": "Smt Kashibai Navale General Hospital Blood Bank",
    "lat": 18.45624,
    "lng": 73.822183,
    "address": "Sr. No. 50/15 building NO.5 2nd Floor, Narhe, Ambegaon, Pune  ",
    "phone": "020 241062299, 020 24699884, 020 24106274",
    "bloodGroups": [
      "AB+",
      "A-",
      "B-",
      "B+",
      "A+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Pimpari Serological Institute Blood Bank",
    "lat": 18.624322,
    "lng": 73.807929,
    "address": "Esteem Tower, opposite K.S.B. Pump, Pune-Mumbai Highway, Kharalwadi, Pimpari ",
    "phone": "020 27421179, 020 27427779",
    "bloodGroups": [
      "AB-",
      "B+",
      "O-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Chakan Blood Bank",
    "lat": 18.762296,
    "lng": 73.860866,
    "address": "Sr. No. 4976/1/2 Gate No. 2401, Yashwantnagar Ambethan Road. A/P Chakan, Khed, Pune ",
    "phone": "02135 202141",
    "bloodGroups": [
      "A+",
      "AB-",
      "A-",
      "O+",
      "B-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "R.G Gholap Memorial Blood Bank",
    "lat": 18.487158,
    "lng": 73.857098,
    "address": "Office No. 301, 3rd Floor Ashoka Centre, S. No - 47/14, Satara Road, Parvati, Pune",
    "phone": "020 65402140, 9822442140, 8554942140",
    "bloodGroups": [
      "A+",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Kranti Mitra Mandal Charitable Trust Blood Bank",
    "lat": 18.501083,
    "lng": 73.939062,
    "address": "1st Floor PMT Buiding Gadital, Hadapsar, Pune ",
    "phone": "020 26992828, 020 64782828, 020 26993703",
    "bloodGroups": [
      "AB-",
      "B-",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Krantiveer Chapekar Bandhu Blood Bank",
    "lat": 18.625689,
    "lng": 73.784672,
    "address": "Pimpri Chinchwad Mahanagar Palika Talera Hospital, Tanaji Nagar Chinchwad, Pune  ",
    "phone": "020 27610054, 020 27610042",
    "bloodGroups": [
      "AB-",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "The New Century Medical & Education Foundation Trust - NCORD Blood Bank & Aphaeresis Centre",
    "lat": 18.56475,
    "lng": 73.800994,
    "address": "NCORD Blood Bank and Aphaeresis centre, S. No. 241/2/1, Geet Ganga Building, Medipoint Hospital Lane, Baner, Pune",
    "phone": "020 46608585",
    "bloodGroups": [
      "AB-",
      "O-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Ekta Apang Vikas Sanstha Blood Bank",
    "lat": 18.477273,
    "lng": 73.90302,
    "address": "Office No. 17/18/19, 1st Floor, Sunshree Woods Commercial Complex, NIBM, Kondhwa, Haveli, Pune",
    "phone": "020 26855144",
    "bloodGroups": [
      "A-",
      "B-",
      "O+",
      "O-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Chattrapati Shahu Maharaj Pratisthan",
    "lat": 18.466519,
    "lng": 73.857679,
    "address": "S.No. 30, 4th floor, office no. 41, 402, 403, and 5th floor off 502, waris Heights, Pune-Satara Road, Dhankwadi, Pune",
    "phone": "9890927792",
    "bloodGroups": [
      "AB+",
      "A-",
      "B+",
      "O-",
      "B-",
      "O+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Chattrapati Shahu Maharaj Pratisthan Blood Bank",
    "lat": 18.466161,
    "lng": 73.857642,
    "address": "S. No. 30, 4th Floor, Office No. 41, 402, 403, and 5th Floor off 502, Waris Heights, Pune - Satara Road, Dhankwadi, Pune",
    "phone": "020 65267000",
    "bloodGroups": [
      "AB-",
      "O+",
      "B-",
      "O-",
      "B+",
      "A-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "District Civil Surgeon Blood Bank",
    "lat": 18.640782,
    "lng": 72.871716,
    "address": "District Hospital Blood Bank, Civil Hospital Campus, Sea Face Road, Alibag  ",
    "phone": "02141 225734",
    "bloodGroups": [
      "AB-",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Kakasaheb Chitle Memorial Centre Sanchalit - Jankalyan Blood Bank",
    "lat": 18.082736,
    "lng": 73.42265,
    "address": "C.S. No. 1651, Near Lokmanya Vyayamshala, Shiwaji Chowk, Mahad, Raigad",
    "phone": "02145 222604, 02145 225103, 02145 224807 ",
    "bloodGroups": [
      "AB-",
      "A+"
    ]
  },
  {
    "name": "M.B. More Foundation Blood Bank",
    "lat": 19.067134,
    "lng": 73.066397,
    "address": "Ghar. No. 412, 1st Floor, Mangaon, Morba Road, Opposite to Civil Hospital, Mangaon, Raigad\r\n",
    "phone": "9421230000",
    "bloodGroups": [
      "O+",
      "A+"
    ]
  },
  {
    "name": "Advanced Centre for Treatment Reasearch and Education in Cancer",
    "lat": 19.065019,
    "lng": 73.064507,
    "address": "Owe Village, Sector 22, Plot No. 2, Kharghar, Navi Mumbai ",
    "phone": "022 27405073",
    "bloodGroups": [
      "A-",
      "AB-",
      "B-",
      "O+",
      "O-"
    ]
  },
  {
    "name": "M/s. Navi Mumbai Blood Bank",
    "lat": 19.034045,
    "lng": 73.029533,
    "address": "Navi Mumbai Blood Bank, Vishwanath Bhavan, C-87, Sector 12, Kharghar, Navi Mumbai",
    "phone": "09870653138, 09223300850",
    "bloodGroups": [
      "B+",
      "AB-",
      "O+",
      "AB+",
      "O-",
      "A+",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Shree Sai Blood Bank & Component",
    "lat": 18.99397,
    "lng": 73.106561,
    "address": "103,104,105,1st Floor Tirthraj Building, Old Thana Naka Road, Near Taluka Police Station,  Old Panvel, Raigad",
    "phone": "022 27467856, 022 27450885, 022 27463796",
    "bloodGroups": [
      "AB-",
      "O+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Rotary Club New Panvel charitable Trust s Late Dr. B.V. Limaye Blood Bank",
    "lat": 19.008249,
    "lng": 73.108321,
    "address": "Plot No-8, Sect.1, Khanda Colony, Mumbai Pune Road, New Panvel (W) ",
    "phone": "022 27459322, 022 32092960",
    "bloodGroups": [
      "O-",
      "AB-",
      "B+",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Civil Surgeon - General Hospital Blood Bank",
    "lat": 16.989126,
    "lng": 73.298866,
    "address": "Civil Hospital, Ratnagiri",
    "phone": "02352 225616",
    "bloodGroups": [
      "A+",
      "A-",
      "B-",
      "O-",
      "O+",
      "B+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Shree Swami Samarth Blood Bank",
    "lat": 17.399914,
    "lng": 73.547448,
    "address": "B.K.L.Walwalkar Hospital Diagnostic & Research Centre, Shree Kshetra Darvan, Chiplun, Ratnagiri",
    "phone": "02355 264137, 02355 264149, 02355 264181            ",
    "bloodGroups": [
      "B-",
      "AB-",
      "O-",
      "O+",
      "B+",
      "A-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 17.019013,
    "lng": 73.298977,
    "address": "Khareghat Road, Ratnagiri",
    "phone": "02352 223262, 02352 222347",
    "bloodGroups": [
      "O+",
      "AB+",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Padmabhushan Vasantdada Patil Government Hospital Blood Bank",
    "lat": 16.852571,
    "lng": 74.574678,
    "address": "Padmabhushan Vasantdada Patil Government Hospital , Blood Bank, Dr. Ambedkar Road, Sangli .                                         \r\n",
    "phone": "0233 2374651, 0233 2374652, 0233 2374653, 0233 2374654, 0233 2374655",
    "bloodGroups": [
      "O+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Rajaram Bapu Blood Bank",
    "lat": 17.048399,
    "lng": 74.251122,
    "address": "Islampur C.S. No. 99/1, Near Islampur Spiral CT-Scan,\r\nPeth-Sangli Road\r\n",
    "phone": "02342 224939",
    "bloodGroups": [
      "O+",
      "AB-",
      "O-",
      "AB+",
      "B+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Vasantdada Patil Blood Bank and Haematology Research Centre",
    "lat": 16.82132,
    "lng": 74.649492,
    "address": "AIP - Miraj, Mirasaheb Shopping Complex,  Opposite to City Police Station, Miraj, Sangli",
    "phone": "0233 2229619, 0233 2222319",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Miraj Medical Centre - Wanless Hospital Blood Bank",
    "lat": 16.832135,
    "lng": 74.645472,
    "address": "Wanless Hospital Blood Bank, Medical Centre, Miraj",
    "phone": "0233 2223291, 0233 2223292, 0233 2223293, 0233 2223294, 0233 2223295",
    "bloodGroups": [
      "O+",
      "A-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Jeevan Rekha Charitable Trust Blood Bank",
    "lat": 17.049271,
    "lng": 75.204853,
    "address": "H. No. 329/E, Ward No. 5, 1st Floor, Umrani Road, A/p-jath, Sangli\r\n",
    "phone": "02344 248000, 02344 248922",
    "bloodGroups": [
      "B+",
      "A-",
      "B-",
      "O-",
      "A+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Smt. Anila Kantilal Kothari Blood Bank & Department of Hemato Oncology",
    "lat": 16.833879,
    "lng": 74.635364,
    "address": "Dr. D. K. Gosavi Memorial, Shri Siddhivinayak Ganapati Cancer Hospital, Sangli - Miraj Road, Miraj",
    "phone": "0233 2212155, 0233 2211601, 0233 2211602",
    "bloodGroups": [
      "AB-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Bharati Vidyapeeth University Medical college And Hospital Blood Bank",
    "lat": 16.841716,
    "lng": 74.617969,
    "address": "A/p Wanlesswadi, Miraj \r\n",
    "phone": "0233 2601594, 0233 2601593 (Extn. 266)",
    "bloodGroups": [
      "AB-",
      "B-",
      "A-",
      "B+",
      "AB+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Hindratna Prakashbapu Patil Blood Bank",
    "lat": 16.8537,
    "lng": 74.580099,
    "address": "2nd Floor, Siddhivinayak Commercial Complex Guest House, Miraj Road, Near Tata Petrol Pump, Sangli\r\n",
    "phone": "0233 2672233",
    "bloodGroups": [
      "O-",
      "A+"
    ]
  },
  {
    "name": "Miraj Serological Institute Blood Bank",
    "lat": 16.828931,
    "lng": 74.639399,
    "address": "S. No.795/A1, Dr. Bhalchandra Patil Hospital,  Zaribag Budhgaonkar Mala, Near Gulabrao Patil Medical College, Miraj \r\n",
    "phone": "0233 6451819, 0233 2211400",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Akshay Blood Bank",
    "lat": 16.838026,
    "lng": 74.651827,
    "address": "Plot No. 1/7, Near Anand Nursing Home, 2nd Floor, Miraj Sangli Road,  Sangli",
    "phone": "0233 2212448, 0233 2212449 ",
    "bloodGroups": [
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank - Shirgaonkar Blood Bank",
    "lat": 16.853702,
    "lng": 74.575077,
    "address": "Opposite to Civil Hospital, Plot No. 49, City Survey No.601/7, Sangli",
    "phone": "0233 2373044, 0233 2372376",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Shree Basaveshwar Manav Vikas Gramin Sevabhavi Sanstha Blood Bank",
    "lat": 16.842421,
    "lng": 74.619929,
    "address": "Arihant Galaxy, 1st Floor, C.S. NO- 1599, Opposite to Civil Hospital, Garpir Road, Sangli\r\n",
    "phone": "0233 6012777, 09604520087, 07798539069",
    "bloodGroups": [
      "O-",
      "AB-",
      "A+",
      "B+",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Azad Panchi Group Charitable Trust Blood Bank",
    "lat": 16.844539,
    "lng": 74.572891,
    "address": "Near Civil Hospital, Ganesh Nagar, 1st Lane, S. No. 1682, Sangli\r\n",
    "phone": "0233 2374333",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "S. S. Venutai Y. Chavan Sub-District Hospital Blood Bank Karad",
    "lat": 17.288048,
    "lng": 74.186177,
    "address": "Plot No. 290/91, Budhwar Peth Station Road, Karad, Satara",
    "phone": "02164 222459, 02164 221020",
    "bloodGroups": [
      "O+",
      "AB+",
      "A+",
      "B-",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Civil Surgeon - Sarva Samanya Hospital Blood Bank",
    "lat": 17.691305,
    "lng": 74.009424,
    "address": "Bazar Road, Satara",
    "phone": "02162 238494, 02162 235640                ",
    "bloodGroups": [
      "A+",
      "A-",
      "AB+",
      "O+",
      "O-",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Phaltan Medical Foundation Blood Bank",
    "lat": 17.992317,
    "lng": 74.42537,
    "address": "C.T.S. No. 5604/6, Near Dnyaneshwar Mandir, Behind State Bank of India, Laxminagar, 1st Floor Phaltan, Satara",
    "phone": "02166 221197, 02166 220897, 02166 220007 ",
    "bloodGroups": [
      "O-",
      "B-",
      "A-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Krishna Hospital and Medical Research Centre Blood Bank Karad",
    "lat": 17.285065,
    "lng": 74.185701,
    "address": "Poona Bangalore (NH 4) Highway, Near Debhewadi Road, Karad, Satara",
    "phone": "02164 241456, 02164 242170",
    "bloodGroups": [
      "AB+",
      "A-",
      "A+",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Instutute of Medical Science and Research Blood Bank and Blood Component Seperation Unit",
    "lat": 17.431214,
    "lng": 74.549364,
    "address": "Shree Chatrapati Shivaji Education Societys, Instutute of Medical Science and Research Blood Bank and Blood Component Seperation Unit,  Vita Road, Vidyagiri, Mayani, Satatra",
    "phone": "02161 270661, 02161 270761 (Extn. 303)",
    "bloodGroups": [
      "A+",
      "AB-",
      "AB+",
      "O+",
      "A-",
      "B+",
      "B-"
    ]
  },
  {
    "name": "M/s. K. N. Gujar Blood Bank",
    "lat": 17.278263,
    "lng": 74.183727,
    "address": "M/s K.N. Gujar Blood Bank, F. P. No. 21, 203/A/6, 1st Floor, K.N. Gujar Hospital, Shanivar Peth, Near S.T. Bus Stand, Karad, Satara",
    "phone": "02164 222868 ",
    "bloodGroups": [
      "B-",
      "O-",
      "AB-",
      "A+",
      "AB+",
      "O+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "M/s. Balaji Blood Bank",
    "lat": 17.695093,
    "lng": 74.010716,
    "address": "M/s. MA. NA. Shri R.R. (AABA) Patil Shikshan Sheti Sanshodhan Aani Vikas Sansthas  Balaji Blood Bank, C.S.No - 467/8 A 1b/45, Jaldhara Building 2nd Floor, Sadar Bazar, Satara - 415002\r\n",
    "phone": "02162 226995, 02162 226996 ",
    "bloodGroups": [
      "A-",
      "AB-",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Akshay Blood Bank",
    "lat": 17.672028,
    "lng": 74.021087,
    "address": "Akshay Medical Trust, Akshay Blood Bank, 506/22, Sadar Bazar, Near State Bank, Opposite to Nirmal Hotel, Satara",
    "phone": "02162 230730, 02162 231731",
    "bloodGroups": [
      "O+",
      "B-"
    ]
  },
  {
    "name": "Mauli Blood Bank Satara",
    "lat": 17.686084,
    "lng": 74.007955,
    "address": "529/b,  Parasnis Colony, Near Hotel Monark, Powai Naka Sadar Bazar, Satara ",
    "phone": "02162 222586, 02162 222031",
    "bloodGroups": [
      "B-",
      "A+",
      "O-",
      "A-",
      "AB+",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Yashwantrao Chavan Blood Bank",
    "lat": 17.275751,
    "lng": 74.18181,
    "address": "Phase 5, Super Market, 1st Floor Hall No. 2/1 Final Plot No. 432,433, Shaniwar Peth, Karad  ",
    "phone": "02164 228122",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Civil Surgeon - General Hospital Blood Bank",
    "lat": 16.12019,
    "lng": 73.689563,
    "address": "Sindhudurg Oros, At Post - Oros, Kudal, Sindhudurga (Oros)",
    "phone": "0236 2228902",
    "bloodGroups": [
      "B+",
      "O-",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Cottage Hospital Blood Bank, Sawantwadi",
    "lat": 15.902781,
    "lng": 73.823544,
    "address": "Sub -District Cottage Hospital, Blood Bank, Sawantwadi, \r\nC-Sindhudurg",
    "phone": "02363 275035",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Dean Chatrapati Shivaji Maharaj Sarvopchar Hospital Blood Bank",
    "lat": 17.659024,
    "lng": 75.912826,
    "address": "B-Block Ground Floor, Shri. Chatrapati Shivaji Maharaj Sarvopchar Hospital, Solapur, Maharashtra",
    "phone": "0217 2310766, 0217 2749440",
    "bloodGroups": [
      "O+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Shri Markendya Charitable and Medical Trust Irrapanna N Boli Blood Bank",
    "lat": 17.659918,
    "lng": 75.906391,
    "address": "Ashok Chowk, 896/97, Bhavnarishi Peth (Bolli Mangal Karayalaya 1 floor, Solapur",
    "phone": "0217 2653829, 0217 2390144, 0217 2620348",
    "bloodGroups": [
      "A-",
      "AB+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Dr. Hegdewar Rakta Pedhi Sanstha, Solapur",
    "lat": 17.66391,
    "lng": 75.900793,
    "address": "1st Floor, Sahyadri Shopping Centre Railway Lines, Solapur",
    "phone": "0217 2311215,  0217 2311281, 0217 2311215, 0217 2311281",
    "bloodGroups": [
      "B-",
      "AB+",
      "B+",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Solapur Blood Bank",
    "lat": 17.65992,
    "lng": 75.906391,
    "address": "136, Railway Line, Near Railway Station, Near Atthar Hospital, Anjani Chembers,  Solapur",
    "phone": "0217 2317242, 0217 2318028 ",
    "bloodGroups": [
      "B+",
      "O+",
      "AB-",
      "B-",
      "AB+",
      "A+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "IMA - Sahakar Maharshi Shankarrao Mohite Patil Blood Bank",
    "lat": 17.660169,
    "lng": 75.906401,
    "address": "804, Old Pandharpur Road, Ganeshnagar Akluj, Solapur",
    "phone": "02185 222101, 02185 225601, 02185 222665, 02185 222166",
    "bloodGroups": [
      "O+",
      "AB-",
      "O-",
      "B+",
      "A-",
      "A+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Akshay Blood Bank",
    "lat": 17.669558,
    "lng": 75.915101,
    "address": "Survey No. 2212, First Floor, Laxmi Narayan Apartment, South Sadar Bazar, Solapur ",
    "phone": "0217 2315025, 0217 26993247",
    "bloodGroups": [
      "AB-",
      "A+",
      "B+",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "M. M. Patel Public Charitable Trust - Ashwini Rural Medical College and Hospital Blood Bank",
    "lat": 17.644778,
    "lng": 75.986234,
    "address": "Kumbhari, Gat No. 261 and 262 , Akkalkot Road, Kumbhari, \r\nTal.South Solapur. Dist. Solapur ",
    "phone": "0217 2280891, 0217 2280897",
    "bloodGroups": [
      "O+",
      "AB-",
      "A+",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Athar Minorities Social and Welfare Associations - Athar Blood Bank",
    "lat": 17.676725,
    "lng": 75.910238,
    "address": "1st Floor, 410 Shukrawar Peth, Jamiya Complex, Near Jama Masjid, Solapur",
    "phone": "0217 2622999",
    "bloodGroups": [
      "B+",
      "A+",
      "B-",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Indian Red Cross Society - Smt. Gopabai Damani Blood Bank",
    "lat": 17.660077,
    "lng": 75.906391,
    "address": "165 Railway Line, Red Cross Road, Dufferin Chowk, Solapur ",
    "phone": "0217 2726858, 0217 2722106",
    "bloodGroups": [
      "O+",
      "A-"
    ]
  },
  {
    "name": "Indian Red Cross Society - Sarjubai Bansila Bajaj Blood Bank",
    "lat": 17.562936,
    "lng": 75.265589,
    "address": "62/2/3/4, Bhakti Marg, Pandharpur, Solapur",
    "phone": "02186 223650, 02186 222219",
    "bloodGroups": [
      "B+",
      "O+",
      "A-"
    ]
  },
  {
    "name": "SIDDHESHWAR BLOOD BANK",
    "lat": 17.672075,
    "lng": 75.904841,
    "address": "Kalyani Towers, 126 Siddheshwar Peth, Near Yashwantrao Hospital Behind civil court, Solapur ",
    "phone": "0217 2323222",
    "bloodGroups": [
      "AB-",
      "O+",
      "B+",
      "A-",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Tarapur Atomic Power Station Hospital Blood Bank",
    "lat": 19.813093,
    "lng": 72.743519,
    "address": "TAPS Hospital Blood Bank, TAPS 1&2 (Anushri) Township Near Boisar, Palghar ",
    "phone": "02525 264001",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Vitthal Sayanna General Hospital (Civil Hospital) Blood Bank",
    "lat": 19.199056,
    "lng": 72.978096,
    "address": "Civil Hospital, 1st Floor, Tembhi Naka, Thane (W)-400601\r\n",
    "phone": "022 25472582, 022 25471409, 022 25471409",
    "bloodGroups": [
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Central Hospital Blood Bank",
    "lat": 19.229578,
    "lng": 73.165135,
    "address": "Ulhasnagar, Central Hospital, Nehru Chowk Road, Ulhasnagar",
    "phone": "0251 2709432, 0251 2708730",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "JVP Blood Bank and Transfusion Centre Blood Bank",
    "lat": 19.072305,
    "lng": 73.000676,
    "address": "201, 213 Arenja Arcade Plot No. 4 Sec-17, Next to Apana Bazar, Vashi, Navi Mumbai",
    "phone": "022 27894490, 022 67912094",
    "bloodGroups": [
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Sankalp Blood Bank",
    "lat": 19.241131,
    "lng": 73.146766,
    "address": "Riddhi Siddhi, Opposite to ICICI Bank, Near Ramchandra Hall, Murbad Road Kalyan (W)",
    "phone": "0251 2300096, 0251 2203974",
    "bloodGroups": [
      "B-",
      "O+",
      "B+",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Jupiter Hospital Blood Bank",
    "lat": 19.209617,
    "lng": 72.972405,
    "address": "Jupiter Hospital, Eastern Express Highway, Service Road, Near Voltas,  Naupada, Thane (W)  ",
    "phone": "022 21725521, 022 21725555, 022 25853320",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Plasma Diagnostic Lab and Blood Bank",
    "lat": 19.215794,
    "lng": 73.096159,
    "address": "Meghdoot, Building, Gopal Nagar, Hotel Janaki, Opposite to Manjunath School, Dombivali( E)",
    "phone": "0251 2802491, 0251 2453568, 0251 2438078",
    "bloodGroups": [
      "O+",
      "O-",
      "AB+",
      "AB-",
      "A+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Vaidhya Blood Bank",
    "lat": 19.187896,
    "lng": 72.96724,
    "address": "1st Floor. Satyam Apartment, M.G. Road, Jeevan Jyot Hospital, Near Naupada Police Station, Thane (W)",
    "phone": "022 25380787, 022 25411773",
    "bloodGroups": [
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Mahatma Gandhi Mission Medical College and Hospital Blood Bank",
    "lat": 19.003199,
    "lng": 73.118362,
    "address": "Plot No. 1 and 2, Sector-18, Kamothe, Navi Mumbai",
    "phone": "022 27863483, 022 27427905, 022 27420320",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Navjeevan Blood Bank",
    "lat": 19.187729,
    "lng": 72.967926,
    "address": "Gokhale Road, Naupada, Near Dr.Mhaskar&#39;s Hospital, Thane (W)",
    "phone": "022 25400425, 022 25339495                ",
    "bloodGroups": [
      "AB+",
      "B-",
      "A+",
      "O-",
      "AB-",
      "A-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Sarla Blood Bank",
    "lat": 19.255677,
    "lng": 72.865577,
    "address": "Ravi Hospital, 1st Floor, 50 Anand Nagar, Navghar Vasai (W)",
    "phone": "0250 2332684, 0250 2349950, 0250 3256565, 0250 2332425",
    "bloodGroups": [
      "B+",
      "A+",
      "AB-",
      "B-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Tssia Blood Bank",
    "lat": 19.194769,
    "lng": 72.952884,
    "address": "Tssia House, Road No.P 26/T,Rd-16, Wagle Estate, Thane (W) ",
    "phone": "022 25803263, 022 39410060, 022 25362283                       ",
    "bloodGroups": [
      "O-",
      "O+",
      "A+",
      "AB-",
      "A-",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Kai Wamanrao Oak Blood Bank",
    "lat": 19.186459,
    "lng": 72.975467,
    "address": "Ghantali Mandir Road, Vishnu Nagar, Naupada, Thane",
    "phone": "022 25385248, 022 25392440",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Blood Line Blood Bank",
    "lat": 19.200762,
    "lng": 72.97498,
    "address": "Swargiya Dharmvir Anand Dighe Sankool, Tika No-10, Near Vikas Palm, Dr. Ambedkar Road, Thane (W) ",
    "phone": "022 25374000, 022 25375000, 022 25376000",
    "bloodGroups": [
      "B+",
      "B-"
    ]
  },
  {
    "name": "Kalyan Dombivali Municipal Corporation Sponsored Nandakishore Education Society Arpan Blood Bank",
    "lat": 19.244366,
    "lng": 73.122511,
    "address": "2nd Floor, Bai Rukhminibal Hospital, Kalyan (W) ",
    "phone": "0251 3266322",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Smt. Devkaabai Kalyanji Chheda Amrutvahini Blood Bank",
    "lat": 19.208377,
    "lng": 72.847668,
    "address": "Ashirwad Apartment, 2nd Floor,  Dshsnu (E), Thane ",
    "phone": "02528 220478, 02528 220614",
    "bloodGroups": [
      "O-",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Sanjeevan Blood Bank ",
    "lat": 19.156842,
    "lng": 72.997815,
    "address": "1st Floor, Indravati Hospital, Sector-3, Airoli, Navi Mumbai ",
    "phone": "022 27790286, 022 27790287, 022 27794582",
    "bloodGroups": [
      "AB+",
      "A+",
      "A-",
      "O+",
      "O-",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Vijayee Blood Bank",
    "lat": 19.358711,
    "lng": 72.811841,
    "address": "Andrandes Bhavan 1st Floor, Plot No. 2, Sr. No 277-A, Behind Papdi Telephone Exchange, Near Sai Services,  Vasai (W) ",
    "phone": "0250 2321050, 0250 6450250",
    "bloodGroups": [
      "AB+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Mira Bhayandar Municipal Corporation Rajeev Gandhi Blood Bank",
    "lat": 19.274233,
    "lng": 72.861175,
    "address": "C.S No.30/32 Poonam Sagar Complex, Near Allahabad Bank Mira Road (E), Thane",
    "phone": "022 64510666",
    "bloodGroups": [
      "O-",
      "B-",
      "AB+",
      "A+",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Maharashtra Blood Bank, Component and Apheresis Centre",
    "lat": 19.692902,
    "lng": 72.772639,
    "address": "C- Wing, 107/207, Kuldeep Arcade, Near Navli Railway Phatak, Station Road, Palghar (W), Thane ",
    "phone": "02525 251102, 02525 253102",
    "bloodGroups": [
      "A-",
      "O+",
      "O-",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Chidanand Charitable Trust Dombivali Blood Bank",
    "lat": 19.212614,
    "lng": 73.088869,
    "address": "Siddhi Hospital, Bajiprabhu Chowk, Dombivali (East) ",
    "phone": "0251 284393",
    "bloodGroups": [
      "B+",
      "AB+",
      "A-",
      "O-",
      "O+",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Seva Blood Bank",
    "lat": 19.215715,
    "lng": 73.091599,
    "address": "Pushpadev Apartment, Basement, Opposite to Manav Kalyan Kendra, Near Sarvesh Hall, Dombivali ",
    "phone": "0251 2442283",
    "bloodGroups": [
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Chhatrapati Shivaji Maharaj Hospital Blood Bank",
    "lat": 19.1922569,
    "lng": 72.986723,
    "address": "Thane Belapur Road, Kalwa, Thane",
    "phone": "022 25347784, 022 25347785, 022 25347786,  022 25372777, 022 25347791",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Navi Mumbai Municipal Corporation Blood Bank",
    "lat": 19.082788,
    "lng": 72.996027,
    "address": "General Hospital Vashi, Near Saint Mary Church, Sector-10, Vashi, Navi Mumbai",
    "phone": "022 27888750, 022 27899906",
    "bloodGroups": [
      "B-",
      "A+",
      "O+",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Lokmanya TSSIA Blood Bank Thane",
    "lat": 19.191526,
    "lng": 72.95169,
    "address": "Tssia House, Road No. P 26/T, Road-16, Next to Thane Janata Sahakari Bank, Behind the Petrol Pump, Wagle Estate, Thane (W)",
    "phone": "9225630689",
    "bloodGroups": [
      "AB-",
      "A+",
      "A-",
      "AB+",
      "B+",
      "B-"
    ]
  },
  {
    "name": "District - Civil Surgeon, General Hospital Blood Bank Wardha",
    "lat": 20.737833,
    "lng": 78.603162,
    "address": "New Building, OPD 1st Floor General Hospital, Dr. Ambedkar Road, Near Jilha Parisad, Wardha",
    "phone": "07152 245249, 07152 250624",
    "bloodGroups": [
      "A+",
      "A-",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Kasturba Health Society Blood Bank",
    "lat": 20.739287,
    "lng": 78.660927,
    "address": "Sevagram, Department of Pathology, MGIMS and Kasturba Hospital,  Sevagram, Wardha",
    "phone": "07152 284108, 07152 284333",
    "bloodGroups": [
      "O-",
      "B+",
      "AB+",
      "O+",
      "B-",
      "A+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Jawaharlal Nehru Medical College Blood Bank",
    "lat": 20.715824,
    "lng": 78.575564,
    "address": "Savangi (Meghe), Paloti Road, Wardha",
    "phone": "07152 287877, 07152 287701, 07152 287706, 07152 287714, 07152 287711",
    "bloodGroups": [
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Civil Surgeon, General Hospital Blood Bank Washim",
    "lat": 20.12259,
    "lng": 77.127893,
    "address": "General Hospital Blood Bank, Near Akola Naka,  Washim ",
    "phone": "07252 233066, 07252 233379",
    "bloodGroups": [
      "B+",
      "O+",
      "A+",
      "B-",
      "AB+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Sau Kantadevi Dale Blood Bank",
    "lat": 20.105396,
    "lng": 77.143122,
    "address": "Maa Ganga Memorial Baheti Hospital, Akola Naka, Washim ",
    "phone": "07252 234343, 07252 235606",
    "bloodGroups": [
      "AB+",
      "A+",
      "AB-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Shri Vasantrao Naik Blood Bank ",
    "lat": 20.39524,
    "lng": 78.118668,
    "address": "Government Medical College and Hospital, Yavatmal",
    "phone": "07232 242456",
    "bloodGroups": [
      "AB+",
      "B+",
      "AB-",
      "A-",
      "O+",
      "O-",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Laxmi Blood Bank",
    "lat": 19.906603,
    "lng": 77.567708,
    "address": "Chiddarwar Hospital, Motinagar, Pusad, Yavatmal",
    "phone": "07233 246775, 07233 246535, 07233 246535    ",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Satyashanti Blood Bank",
    "lat": 19.910776,
    "lng": 77.569957,
    "address": "2nd Floor, Satyashanti Hospital, Opposite to Bus Stand, Pusad",
    "phone": "07233 248095, 07233 246095 ",
    "bloodGroups": [
      "B+",
      "A+",
      "A-",
      "AB-",
      "O-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Aishwarya Blood Bank",
    "lat": 20.389322,
    "lng": 78.118544,
    "address": "Survey No.3/2, Godhani Road, Gurunanak Nagar, Near Amolakshand College, Mouza, Umarsara, Yavatmal",
    "phone": "07232 252500, 07232 242340         ",
    "bloodGroups": [
      "O+",
      "B+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Shri Gajanan Blood Bank And Components",
    "lat": 20.418283,
    "lng": 78.12953,
    "address": "Property No: 71, Road No.9, 2nd Floor, Bajaj Satkar Bhavan, Yavatmal (m.s) ",
    "phone": "07232 242985",
    "bloodGroups": [
      "O+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Ekneel Blood Bank",
    "lat": 20.389322,
    "lng": 78.118544,
    "address": "Near City Centre, Datta Chowk",
    "phone": "07232 250111",
    "bloodGroups": [
      "B-",
      "O+",
      "AB+",
      "A+",
      "AB-",
      "O-",
      "B+"
    ]
  },
  {
    "name": "District Hospital Blood Bank ",
    "lat": 24.343447,
    "lng": 93.692909,
    "address": "Churachandpur District Hospital, IB Road, Hiangtam Lamka",
    "phone": "387423396",
    "bloodGroups": [
      "A-",
      "O+"
    ]
  },
  {
    "name": "JNIMS Hospital Blood Bank and Transfusion Unit ",
    "lat": 24.811173,
    "lng": 93.961697,
    "address": "JNIMS Hospital, \r\nRyang Palli Road, Near TV Road\r\nPorompat, Imphal East",
    "phone": "0385 2443142, 0385 2443144",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Model Blood Bank - Department of IHBT",
    "lat": 24.815898,
    "lng": 93.922827,
    "address": "RIIMS, Lamphalphelpat, Lamphel Road, Imphal",
    "phone": "0385 2411434",
    "bloodGroups": [
      "A-",
      "A+",
      "O+",
      "O-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Shija Blood Bank and Transfusion Services   ",
    "lat": 24.835805,
    "lng": 93.914217,
    "address": "Shija Hospital and Research Institute, Meitei Langol, Lamphelpat, Imphal",
    "phone": "0385 2055584",
    "bloodGroups": [
      "A-",
      "AB+",
      "B-",
      "AB-",
      "B+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "District Hospital Blood Bank and Transfusion Unit",
    "lat": 24.624975,
    "lng": 94.013034,
    "address": "District Hospital, Khangbok, Maning Leikai, Manipur",
    "phone": "0384 8222214",
    "bloodGroups": [
      "O+",
      "B+",
      "A-",
      "A+",
      "AB+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Military Hospital Blood Bank",
    "lat": 25.571624,
    "lng": 91.873071,
    "address": "Military Hospital, Rilbong, Shillong",
    "phone": "0364 2224300, 0364 2224302",
    "bloodGroups": [
      "B-",
      "A+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Nazareth Hospital Blood Bank ",
    "lat": 25.571321,
    "lng": 91.897913,
    "address": "Nazareth Hospital, Laitumkhrah, Shillong ",
    "phone": "0364 2224052",
    "bloodGroups": [
      "O-",
      "B-",
      "O+",
      "B+",
      "AB+"
    ]
  },
  {
    "name": " Regional Blood Bank, East Khasi Hills - Pasteur Institute",
    "lat": 25.583606,
    "lng": 91.884132,
    "address": "Pasteur Institute, Pasteur Hill, Lawmali",
    "phone": "0364 2591629",
    "bloodGroups": [
      "A+",
      "O+",
      "AB+",
      "B-",
      "AB-",
      "O-",
      "A-"
    ]
  },
  {
    "name": "North Eastern Indira Gandhi Regional Institute of Health and Medical Sciences Blood Bank",
    "lat": 25.591485,
    "lng": 91.940381,
    "address": "North Eastern Indira Gandhi Regional Institute of Health and Medical Sciences , Mawdiangdiang, Shillong",
    "phone": "0364 2538063",
    "bloodGroups": [
      "A+",
      "AB+",
      "AB-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Dr. H. Gordon Roberts Hospital Blood Bank",
    "lat": 25.584829,
    "lng": 91.875283,
    "address": "Jaiaw, Shillong                               ",
    "phone": "0364 2545826",
    "bloodGroups": [
      "AB-",
      "A+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Tura Civil Hospital Blood Bank",
    "lat": 25.514811,
    "lng": 90.203482,
    "address": "Tura Civil Hospital, Dermile, Near Dermile Fuel Station\r\n",
    "phone": "03651 232043",
    "bloodGroups": [
      "AB+",
      "B-",
      "B+",
      "A+",
      "O-",
      "AB-",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Jowai Civil Hospital Blood Bank   ",
    "lat": 25.438521,
    "lng": 92.199331,
    "address": "Jowai Civil Hospital, Durlong\r\nOpp. Lower Primary School Panaliar,\r\nPanaliar Towai",
    "phone": "03652 20735",
    "bloodGroups": [
      "O+",
      "A+",
      "B+",
      "AB-",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Civil Hospital Blood Bank Aizawl",
    "lat": 23.732287,
    "lng": 92.716561,
    "address": "Block -B , Civil Hospital,\r\nNear Millenium Centre,Aizawl\r\n",
    "phone": "0389 2341617",
    "bloodGroups": [
      "AB+",
      "B+",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Synod Hospital Blood Bank Durtlang",
    "lat": 23.772714,
    "lng": 92.731326,
    "address": "Blood Bank, Synod Hospital, Durtlang",
    "phone": "0389 2361222",
    "bloodGroups": [
      "AB-",
      "A+",
      "AB+",
      "B+",
      "B-",
      "O+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "District Hospital Blood Bank Champhai",
    "lat": 23.48105,
    "lng": 93.3097,
    "address": "District Hospital, Champhai\r\nVengsang Champhai\r\nNear BSNL office Champhai",
    "phone": "03831 234926",
    "bloodGroups": [
      "O+",
      "AB+",
      "B+",
      "A+",
      "B-",
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank Kolasib",
    "lat": 24.231419,
    "lng": 92.676799,
    "address": "Blood Bank, District Hospital, Kolasib\r\nVenglai, Kolasib, Hospital Road",
    "phone": "03837 221930",
    "bloodGroups": [
      "AB-",
      "AB+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "District Hospital Blood Bank Lawngtlai",
    "lat": 22.536684,
    "lng": 92.888179,
    "address": "District Hospital, Electric veng, Near CMO office, Lawngtlai",
    "phone": "03835 232210",
    "bloodGroups": [
      "B+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Civil Hospital Blood Bank",
    "lat": 22.886385,
    "lng": 92.744135,
    "address": "Civil Hospital, Chanmari-2 Lunglei",
    "phone": "0372 2324555",
    "bloodGroups": [
      "AB+",
      "O-",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Christian Hospital Blood Bank Serkawn",
    "lat": 22.90691,
    "lng": 92.758415,
    "address": "Christian Hospital, Serkawn",
    "phone": "0372 2342268",
    "bloodGroups": [
      "AB-",
      "B+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "District Hospital Blood Bank Mamit",
    "lat": 23.909365,
    "lng": 92.494861,
    "address": "Blood Bank, District Hospital,Lungsir, Mamit",
    "phone": "0389 2565655",
    "bloodGroups": [
      "B-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Civil Hospital Blood Bank Saiha",
    "lat": 22.488391,
    "lng": 92.982668,
    "address": "District Hospital, New Saiha West, Saiha",
    "phone": "03835 222388",
    "bloodGroups": [
      "A+",
      "AB+",
      "B-",
      "A-",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "J N Hospital Blood Bank,Serchhip",
    "lat": 23.307946,
    "lng": 92.856366,
    "address": "Blood Bank, District Hospital, Serchhip",
    "phone": "03838 226184",
    "bloodGroups": [
      "A+",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 25.905078,
    "lng": 93.731607,
    "address": "District Hospital Colony, Dimapur",
    "phone": "9436009493",
    "bloodGroups": [
      "B-",
      "O-",
      "B+",
      "AB-",
      "AB+",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Christian Institute of Health Sciences and Research Blood Bank",
    "lat": 25.865482,
    "lng": 93.771446,
    "address": "Christian Institute of Health Sciences & Research, \r\n4th Mile, P.B. 31, P.O. ARTC, Dimapur",
    "phone": "9862583187",
    "bloodGroups": [
      "B-",
      "B+",
      "AB+",
      "A+",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Naga Hospital Authority Blood Bank",
    "lat": 25.669384,
    "lng": 94.095902,
    "address": "Naga Hospital, NH 39, AH1, Kohima",
    "phone": "9436000422",
    "bloodGroups": [
      "A+",
      "AB-"
    ]
  },
  {
    "name": "General Hospital Blood Bank",
    "lat": 25.596486,
    "lng": 94.12323,
    "address": "General Hospital, Kohima",
    "phone": "9436292954",
    "bloodGroups": [
      "A-",
      "AB-",
      "O+",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Dr. Imkongliba Memorial District Hospital Blood Bank",
    "lat": 26.318678,
    "lng": 94.52071,
    "address": "Dr. Imkongliba memorial District Hospital, Majakong Ward, Mokukchung",
    "phone": "9436006242",
    "bloodGroups": [
      "AB-",
      "O-",
      "A+",
      "A-",
      "B-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 26.716467,
    "lng": 95.02633,
    "address": "Mon Civil Hospital, Tuensang-Mon Naginimora Road\r\nBlood Bank",
    "phone": "9436441059",
    "bloodGroups": [
      "AB+",
      "A+",
      "O+",
      "B+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 25.710067,
    "lng": 94.464482,
    "address": "District Hospital, Bethany 1 Colony, Phek town",
    "phone": "9436013317",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 26.253444,
    "lng": 94.817879,
    "address": "Civil Hospital, Tuensang-Mon-Naginimora Road, Nagaland\r\nBlood Bank",
    "phone": "9436007242",
    "bloodGroups": [
      "AB+",
      "B+",
      "O-",
      "A+",
      "O+",
      "AB-",
      "A-",
      "B-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 26.079008,
    "lng": 94.259206,
    "address": "Wokha Civil Hospital, Wokha, Near NH 61",
    "phone": "9436240964",
    "bloodGroups": [
      "A+",
      "AB+",
      "O-",
      "B-",
      "A-",
      "AB-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 26.002962,
    "lng": 94.523584,
    "address": "District Hospital, South Point East, Near Sheipu, Zunhebeto\r\nBlood Bank",
    "phone": "9436824331",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Angul",
    "lat": 20.9211366,
    "lng": 84.8567932,
    "address": "District Head Quarter Hospital, Angul\r\n",
    "phone": "06764 230880",
    "bloodGroups": [
      "O-",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, SDH, Athamallik",
    "lat": 21.20617844,
    "lng": 84.93461609,
    "address": "Sub Divisional Hospital Athamallik, Badadamdasahi, Athamallik",
    "phone": "06763 254213",
    "bloodGroups": [
      "A+",
      "AB-",
      "O-",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Nalco Hospital Blood Bank",
    "lat": 20.850763,
    "lng": 85.152407,
    "address": "National Aluminium Company Ltd, Nalco Nagra, Angul",
    "phone": "",
    "bloodGroups": [
      "AB-",
      "B+",
      "A-",
      "B-",
      "A+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Sub Divisional Hospital Talcher",
    "lat": 20.946461,
    "lng": 85.240965,
    "address": "Sub-Divisional Hospital, Talcher, Angul",
    "phone": "06760 242020",
    "bloodGroups": [
      "B-",
      "O+",
      "B+",
      "O-",
      "AB-",
      "AB+",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Neheru Satabdi (N.S) Central Hospital Blood Bank",
    "lat": 20.931088,
    "lng": 85.173211,
    "address": "Neheru Shatabdi Hospital, MCL, AT/PO - Dera, Talcher",
    "phone": "06760 267118",
    "bloodGroups": [
      "O+",
      "O-",
      "AB-",
      "A+",
      "B+",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Balangir",
    "lat": 20.707443,
    "lng": 83.494856,
    "address": "District Head Quarters Hospital Campus, Balangir\r\n",
    "phone": "6652230646",
    "bloodGroups": [
      "O+",
      "AB+",
      "B-",
      "O-",
      "A-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Biju Padhnaik Red Cross Blood Bank, CHC Kantabanji",
    "lat": 20.468944,
    "lng": 82.914898,
    "address": "Road No: 1, CHC Kantabanji , Balangir, Odisha",
    "phone": "06657 220464",
    "bloodGroups": [
      "AB+",
      "B+",
      "O-",
      "O+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Patnagarh",
    "lat": 20.708494,
    "lng": 83.129548,
    "address": "Sub Divisional Hospital Blood Bank Patnagarh , At/Po/Ps- Patnagarh",
    "phone": "06658 222161",
    "bloodGroups": [
      "O-",
      "AB-",
      "AB+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, SDH, Titlagarh                    ",
    "lat": 20.2894944,
    "lng": 83.1516406,
    "address": "Sub-Divisional Hospital,Titlagarh, At/Po/Ps- Titlagarh,  Balangir",
    "phone": "06655 220318",
    "bloodGroups": [
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Balasore",
    "lat": 21.493347,
    "lng": 86.935961,
    "address": "District Head Quarters Hospital, Baleshwar",
    "phone": "06782 241496",
    "bloodGroups": [
      "B+",
      "AB-",
      "A-",
      "B-",
      "AB+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Jyoti Hospital Blood Bank",
    "lat": 21.471497,
    "lng": 86.891335,
    "address": "Kuruda, Balasore",
    "phone": "06782 256375, 06782 256376",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A-",
      "O+",
      "B-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Nilagiri",
    "lat": 21.463441,
    "lng": 86.775551,
    "address": "Sud Divisional Hospital,  Nilagiri, At/Po/Ps-Nilagiri",
    "phone": "06782-233237",
    "bloodGroups": [
      "O-",
      "B-",
      "A-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Baragarh",
    "lat": 21.335042,
    "lng": 83.616202,
    "address": "Distict Head Quarter Hospital, Bargarh",
    "phone": "06646 234104",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Catholic Mission Hospital Blood Bank, Bargarh",
    "lat": 21.331385,
    "lng": 83.608727,
    "address": "Bargarh-Bheden Rd, Tora, Ruhunia",
    "phone": "06646 230203",
    "bloodGroups": [
      "O+",
      "O-",
      "AB-",
      "B-",
      "AB+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, SDH, Padampur",
    "lat": 20.999564,
    "lng": 83.060982,
    "address": "At-Padampur, Po-Rajborasambar,",
    "phone": "06638 223490",
    "bloodGroups": [
      "A+",
      "B+",
      "O+",
      "AB-",
      "A-",
      "B-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Bhadrak ",
    "lat": 21.065246,
    "lng": 86.502463,
    "address": "District Head Quarter Hospital, Bhadrak",
    "phone": "06784 251817",
    "bloodGroups": [
      "O-",
      "AB-",
      "A+",
      "A-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Boudh ",
    "lat": 20.840309,
    "lng": 84.321603,
    "address": "District Head Quarters Hospital, NH 224, Boudh",
    "phone": "06841 222202",
    "bloodGroups": [
      "O+",
      "AB+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Central Red Cross Blood Bank, Cuttack",
    "lat": 20.474804,
    "lng": 85.888633,
    "address": "Mangalabag, Medical Road, Cuttack",
    "phone": "0671 2302258",
    "bloodGroups": [
      "O+",
      "B+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Shrirama Chandra Bhanj (SCB) Medical College Blood Bank",
    "lat": 20.473658,
    "lng": 85.892097,
    "address": "Dock Road, Manglabag",
    "phone": "0671-2424202",
    "bloodGroups": [
      "A+",
      "O+",
      "B-",
      "O-",
      "AB+",
      "AB-",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Deogarh",
    "lat": 21.534301,
    "lng": 84.729719,
    "address": "District Head Quarters Hospital, Deogarh\r\n",
    "phone": "06641 226182",
    "bloodGroups": [
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Dhenkanal",
    "lat": 20.663314,
    "lng": 85.597065,
    "address": "District Head Quarters Hospital",
    "phone": "06762 221388",
    "bloodGroups": [
      "A+",
      "O+",
      "B-",
      "B+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood, Paralakhemundi",
    "lat": 18.771476,
    "lng": 84.096865,
    "address": "District Hospital, Paralakhemundi,Gajapati",
    "phone": "06815 222467, 06815 222787",
    "bloodGroups": [
      "A-",
      "B+",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Maharaja Krishna Chandra Gajapati Medical College Blood bank",
    "lat": 19.312434,
    "lng": 84.810241,
    "address": "National Highway 59, Berhampur, Ganjam",
    "phone": "0680 2292534",
    "bloodGroups": [
      "B+",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, SDH, Bhanjanagar",
    "lat": 19.93655984,
    "lng": 84.57996368,
    "address": "Sub Divisional Hospital Bhanjanagar",
    "phone": "06821 240133",
    "bloodGroups": [
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Jagatsinghpur",
    "lat": 20.251662,
    "lng": 86.179783,
    "address": "District Head Quarters Hospital, Jagatsinghpur",
    "phone": "06724 221808",
    "bloodGroups": [
      "B+",
      "AB+",
      "B-",
      "A-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Jajpur",
    "lat": 20.849463,
    "lng": 86.328963,
    "address": "District Head Quarters Hospital, Jajpur",
    "phone": "06728 225177",
    "bloodGroups": [
      "A-",
      "O+",
      "B+",
      "AB-",
      "O-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, CHC Jajpur road",
    "lat": 20.948487,
    "lng": 20.948487,
    "address": "CHC Jajpur Road",
    "phone": "06726  224957",
    "bloodGroups": [
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Jharsuguda",
    "lat": 21.853817,
    "lng": 84.017235,
    "address": "District Head Quarter Hospital, Near Hanuman Mandir, ",
    "phone": "06645 272180",
    "bloodGroups": [
      "B+",
      "O-"
    ]
  },
  {
    "name": "TRL Hospital, Belpahada",
    "lat": 21.8138695,
    "lng": 83.8530636,
    "address": "TRL Hospital, Belpahar, Jharsuguda, Odisha ",
    "phone": "06645 258411",
    "bloodGroups": [
      "A-",
      "O-",
      "AB-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Central Hospital (MCL), Brajaraj Nagar",
    "lat": 21.8479363,
    "lng": 83.9174688,
    "address": "Blood Bank, Central Hospital (MCL),Brajaraj Nagar, Jharsuguda",
    "phone": "06760 269382",
    "bloodGroups": [
      "O-",
      "AB+"
    ]
  },
  {
    "name": "District Head Quarters Hospital Blood Bank Bhawanipatna",
    "lat": 19.901936,
    "lng": 83.159977,
    "address": "Hospital Road, SH 44,",
    "phone": "06670 234952",
    "bloodGroups": [
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, SDH, Dharmagarh",
    "lat": 19.869351,
    "lng": 82.781124,
    "address": "Sub-Divisional Hospital, At/Po- Dharmagarh",
    "phone": "6672242077",
    "bloodGroups": [
      "B+",
      "A-",
      "AB-",
      "O+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Sardar Rajas Medical College Hospital Blood Bank",
    "lat": 19.890621,
    "lng": 83.014694,
    "address": "Blood Bank, Sardar Rajas MCH, Bhawaniptna",
    "phone": "06670 226701",
    "bloodGroups": [
      "O+",
      "AB-",
      "O-",
      "A-",
      "A+",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, SDH, Baliguda",
    "lat": 20.200309,
    "lng": 83.909889,
    "address": "Sub-Divisional Hospital, Near SBI, Balliguda",
    "phone": "6846243195",
    "bloodGroups": [
      "O-",
      "O+",
      "B-",
      "A-",
      "A+",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Kandhamal",
    "lat": 20.485796,
    "lng": 84.224718,
    "address": "District Head Quarter Hospital Phulbani, Kandhamal",
    "phone": "06842 253006",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "District Head Quarters Hospital Blood Bank Kendrapara",
    "lat": 20.502151,
    "lng": 86.425929,
    "address": "District Head Quarters Hospital Blood Bank, Kendrapara",
    "phone": "06727 233334",
    "bloodGroups": [
      "AB+",
      "AB-",
      "O+",
      "A-",
      "O-",
      "B+",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, SDH, Anandapur",
    "lat": 21.628282,
    "lng": 85.596419,
    "address": "Sub Divisional Hospital, Anandapur, Ghasipura",
    "phone": "06731 221467",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, SDH, Champua",
    "lat": 21.6293658,
    "lng": 85.5978164,
    "address": "Sub Divisional Hospital Champua, At/-SDH, Champua",
    "phone": "06767 240898",
    "bloodGroups": [
      "AB+",
      "B-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Tisco Hospital Blood Bank, Kendujhar",
    "lat": 22.018667,
    "lng": 85.418371,
    "address": "Tisco Hospital, Joda, Kendujhar",
    "phone": "06767 272010",
    "bloodGroups": [
      "O+",
      "A+",
      "AB+"
    ]
  },
  {
    "name": " Odisha Red Cross Blood Bank, Kendujhar",
    "lat": 21.628282,
    "lng": 85.596419,
    "address": "District  Head Quarter Hospital,Kendujhar",
    "phone": "06766 254380",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Central Hospital Blood Bank Joda",
    "lat": 22.036011,
    "lng": 85.434191,
    "address": "Blood Bank,Central  Hospital, Joda, Keonjhar",
    "phone": "06767 272231",
    "bloodGroups": [
      "A+",
      "A-",
      "O+",
      "AB-",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Capital Hospital ",
    "lat": 20.260999,
    "lng": 85.82211,
    "address": "Capital Hospital, Udyan Marg, Unit-6, Ganga Nagar",
    "phone": "0674 2394985",
    "bloodGroups": [
      "A-",
      "B-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Bhubaneshwar Municipal Hospital",
    "lat": 20.230822,
    "lng": 85.841899,
    "address": "OldTown, Samantarapur\r\n",
    "phone": "0674 2591206",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Kalinga Hospital Limited Blood Bank",
    "lat": 20.313722,
    "lng": 85.818325,
    "address": "Kalinga Hospital, Chandrasekharpur, Bhubaneswar",
    "phone": "0674 2300570,  Extn.322",
    "bloodGroups": [
      "A-",
      "A+",
      "O+",
      "B+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Apollo Hospital Blood Bank, Bhubaneswar",
    "lat": 20.305593,
    "lng": 85.831789,
    "address": "Plot No. 251, Old Sainik School Road, Bhubaneswar, Opposite to Vanibihar",
    "phone": "0674 7150454, 06746661016",
    "bloodGroups": [
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Hi-Tech Medical College & Hospital Blood Bank",
    "lat": 20.300484,
    "lng": 85.877272,
    "address": "Pandra,Rasulgarh,Bhubaneshwar",
    "phone": "06743094253, 0674 2371217",
    "bloodGroups": [
      "AB-",
      "A-",
      "AB+",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Sum Hospital Blood Bank",
    "lat": 20.283391,
    "lng": 85.769625,
    "address": "K-8, Kalinga Nagar ",
    "phone": "06746098855, 0674 2386281",
    "bloodGroups": [
      "A+",
      "B-",
      "AB-",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Kalinga Institute of Medical Sciences (KIMS) Blood Bank",
    "lat": 20.353379,
    "lng": 85.814853,
    "address": "NALCO Nagar, Chandrasekharpur",
    "phone": "0674-2300570 (Ext-322), 0674 2725472",
    "bloodGroups": [
      "AB+",
      "B-",
      "B+",
      "A-",
      "O-",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "AMRI Hospital Blood Bank",
    "lat": 20.260166,
    "lng": 85.777769,
    "address": "Plot No. 1, Near Jayadev Vatika Park, Khandagiri, ",
    "phone": "0674 6666600",
    "bloodGroups": [
      "A+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Khurda",
    "lat": 20.0553881,
    "lng": 84.9466673,
    "address": "District Head Quarter Hospital, CDMO Campus, At/Po/Dt-Khordha\r\n",
    "phone": "06755 223978",
    "bloodGroups": [
      "O-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "NALCO Hospital Blood Bank",
    "lat": 18.760347,
    "lng": 82.9011261,
    "address": "Sector 3, Damanjodi",
    "phone": "06852 254515",
    "bloodGroups": [
      "A+",
      "AB-",
      "O+",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Red Cross Blood Bank, SDH, Koraputk",
    "lat": 18.863146,
    "lng": 82.572509,
    "address": "Sub Divisional Hospital, Sardar Patel Marg",
    "phone": "06854 233600",
    "bloodGroups": [
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Koraput",
    "lat": 18.805606,
    "lng": 82.705017,
    "address": "District Head Quarter Hospital, Janiguda",
    "phone": "06852 252101",
    "bloodGroups": [
      "O-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Asha Kiran Society Blood Bank",
    "lat": 18.599153,
    "lng": 82.601739,
    "address": "Lamtaput, Koraput",
    "phone": "06868 272213",
    "bloodGroups": [
      "AB-",
      "AB+",
      "A+",
      "A-",
      "O+"
    ]
  },
  {
    "name": "HAL Hospital Blood Bank",
    "lat": 18.729641,
    "lng": 82.8215279,
    "address": "Sunabeda, Koraput",
    "phone": "06853 220234, 06583 220572",
    "bloodGroups": [
      "O-",
      "A-",
      "AB+",
      "B-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Malkangiri",
    "lat": 18.581971,
    "lng": 82.075923,
    "address": "District Head quarters Hospita Malkangiri, ",
    "phone": "06861 231200",
    "bloodGroups": [
      "AB+",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Baripada",
    "lat": 21.931231,
    "lng": 86.727842,
    "address": "District Head Quarters Hospital Baripada, Mayurbhanj",
    "phone": "06792 254641",
    "bloodGroups": [
      "A-",
      "O+",
      "B-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Odisha red Cross Blood Bank, Karanjia, Mayurbhanj",
    "lat": 21.764292,
    "lng": 85.973327,
    "address": "Sub Divisional Hospital, Karanjia (Post), Mayurbhanj",
    "phone": "06796 221832",
    "bloodGroups": [
      "A-",
      "B-",
      "B+",
      "AB-",
      "O+",
      "A+",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, SDH, Rairangpur",
    "lat": 22.2692759,
    "lng": 86.1564211,
    "address": "Sub-Divisional Hspital, Rairangpur ",
    "phone": "06794 22298",
    "bloodGroups": [
      "A-",
      "B+",
      "A+",
      "AB+",
      "AB-",
      "B-",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, SDH, Udala",
    "lat": 21.576557,
    "lng": 86.565098,
    "address": "Sub Divisional Hospital, Udala, Mayurbhanj",
    "phone": "06795 232288",
    "bloodGroups": [
      "O+",
      "A-",
      "A+",
      "B-",
      "B+",
      "AB+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Nabarangpur",
    "lat": 19.22886,
    "lng": 82.56679,
    "address": "District Head Quarter Hospital, Miriganiguda",
    "phone": "6858222360",
    "bloodGroups": [
      "A+",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Christian Hospital Blood Bank Nabarangpur",
    "lat": 19.2392509,
    "lng": 82.547666,
    "address": "Christian Hospital, Nabarangpur, Mission Compound",
    "phone": "06858 222566",
    "bloodGroups": [
      "O-",
      "AB-",
      "A+",
      "B+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Nayagarh ",
    "lat": 20.128058,
    "lng": 85.107413,
    "address": "District Head Quarter Hospital Nayagarh",
    "phone": "06753 252410",
    "bloodGroups": [
      "O-",
      "B-",
      "O+",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Evangelical Hospital Blood Bank",
    "lat": 20.3088467,
    "lng": 82.7417943,
    "address": "Gadramunda, Khariar",
    "phone": "09668429249, 09668648114",
    "bloodGroups": [
      "AB+",
      "O+",
      "A-",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Nuapada",
    "lat": 20.808848,
    "lng": 82.534107,
    "address": "District Headquarter Hospital, Nuapada",
    "phone": "9437292867",
    "bloodGroups": [
      "A-",
      "AB+",
      "O+",
      "AB-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Aharya Harihar Red Cross Blood Bank",
    "lat": 19.814381,
    "lng": 85.829648,
    "address": "District Head Quarters Hospital, Grand Road ",
    "phone": "06752 224097",
    "bloodGroups": [
      "A+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Christian Hospital Blood Bank",
    "lat": 19.516658,
    "lng": 83.506689,
    "address": "Bissam Cuttack, Rayagada",
    "phone": "06863 247505",
    "bloodGroups": [
      "AB-",
      "B+",
      "O+",
      "A-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood bank, SDH, Gunupur",
    "lat": 19.071552,
    "lng": 83.809261,
    "address": "sub- Divisional Hospital Gunupur, SDH Campus",
    "phone": "8596985766",
    "bloodGroups": [
      "AB+",
      "B+",
      "A+",
      "O+",
      "A-",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Jesus Mary Hospital Blood Bank",
    "lat": 21.497281,
    "lng": 83.969962,
    "address": "Barapali, Sambalpur",
    "phone": "0663 2545606",
    "bloodGroups": [
      "B-",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, SDH, Kuchinda ",
    "lat": 21.745975,
    "lng": 84.350757,
    "address": "Sub Divisional Hospital Kuchinda, Sambalpur",
    "phone": "06642 220509",
    "bloodGroups": [
      "O-",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank Sambalpur",
    "lat": 21.473765,
    "lng": 83.974011,
    "address": "District Head Quarter Hospital, Pani Tanki Road, Modipada (Post), Sambalpur",
    "phone": "0663 2400180",
    "bloodGroups": [
      "A+",
      "B+"
    ]
  },
  {
    "name": "VSS Medical College and Hospital Blood Bank",
    "lat": 21.501094,
    "lng": 83.884655,
    "address": " VSS Medical College Hospital, Burla\r\nOpposite to PG Hospital, VSS, MC Burla",
    "phone": "0663 2431420",
    "bloodGroups": [
      "O+",
      "A-",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Subarnapur",
    "lat": 20.843647,
    "lng": 83.907,
    "address": "District Headquarters Hospital Sonepur, Hospital Road, Near fire station",
    "phone": "06654 220150",
    "bloodGroups": [
      "AB+",
      "A+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Rourkela",
    "lat": 22.264089,
    "lng": 84.865108,
    "address": "Rourkela Government Hospital Campus, Rourkela, PO- Uditnagr, S.T.I Chowk",
    "phone": "0661 2401770",
    "bloodGroups": [
      "A-",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Immuno-Haematology & Blood Transfusion Centre, Rourkela",
    "lat": 22.2640892,
    "lng": 84.8651084,
    "address": "ISPAT General Hospital, Steel Authority of India ltd. Rourkela Steel Plant, Sector - 19",
    "phone": "6612439919",
    "bloodGroups": [
      "AB+",
      "O-",
      "B+",
      "O+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Vesaj Patel Hospital and Research Center Blood Bank",
    "lat": 22.2265275,
    "lng": 84.821447,
    "address": "Vesaj Patel Hosp and Research Center, Rourkela",
    "phone": "0661 2401799",
    "bloodGroups": [
      "B+",
      "AB+",
      "A-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Community Welfare Society Hospital Blood Bank",
    "lat": 22.255332,
    "lng": 84.900917,
    "address": "Jagda, Rourkela",
    "phone": "0661 2473931, 0661 2473927",
    "bloodGroups": [
      "B+",
      "O-",
      "B-",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Hi-Tech Medical college & Hospital Blood Bank",
    "lat": 22.223584,
    "lng": 84.8296273,
    "address": "Near Hanuman Vatika, R.G.H Campus",
    "phone": "6612400751, 0661 2400524",
    "bloodGroups": [
      "O+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, SDH, Bonai ",
    "lat": 21.819928,
    "lng": 84.956534,
    "address": "Sub Divisional Hospital Bonai, Bonaigarh",
    "phone": "06626 244500",
    "bloodGroups": [
      "O-",
      "A+",
      "B-",
      "A-",
      "AB+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Sundergarh",
    "lat": 22.118256,
    "lng": 84.036159,
    "address": "District Headquarter Hospital Premises, Sundargarh",
    "phone": "06622 273225",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Karaikal Government General Hospital Blood Bank",
    "lat": 10.917635,
    "lng": 79.836804,
    "address": "Kamarajar Salai Government Hospital, Puducherry       ",
    "phone": "04368 222450, 227752",
    "bloodGroups": [
      "AB-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Sri Venkateshwara Medical College Hospital and Research Centre",
    "lat": 11.903661,
    "lng": 79.701071,
    "address": "13-A, Pondy-Vellupuram Main Road, Sugar Factory - Parry, Ariyur",
    "phone": "0413 2644476, 0413 2260601",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Pondicherry Institute of Medical Sciences Blood Bank",
    "lat": 12.046974,
    "lng": 79.854738,
    "address": "Kalathumettupathai, Ganapathichettikulam, Village No. 20\r\nKalapet, Puducherry ",
    "phone": "0413 2656271, 0413 2656272, 0413 2656700",
    "bloodGroups": [
      "AB-",
      "B-",
      "O-",
      "B+",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Sri Manakula Vinayagar Medical College Hospital Blood Bank",
    "lat": 11.921612,
    "lng": 79.62821,
    "address": "Kalitheerthalkuppam, Madagadipet, Puducherry",
    "phone": "0413 2643000, 0413 2643014, 0413 6533912",
    "bloodGroups": [
      "B+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Vinayaka Missions Medical College and Hospital Blood Bank",
    "lat": 10.955396,
    "lng": 79.847776,
    "address": "Keezhakasakudimedu, Kottucherry Post,  Karaikal, Puducherry ",
    "phone": "04368 263255, 04368 263277,  04368 263 255",
    "bloodGroups": [
      "AB+",
      "O-",
      "A-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Mahatma Gandhi Medical College and Research Institute",
    "lat": 11.811867,
    "lng": 79.778314,
    "address": "Pondy-Cuddalore Main Road, Pillaiyarkuppam\r\nPuducherry",
    "phone": "0413 2615449",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Aarupadai Veedu Medical College Blood Bank",
    "lat": 11.831098,
    "lng": 79.783102,
    "address": "East Coast Road, Kirumampakkam, Pondy Cuddalore Road,                               \r\nPuducherry",
    "phone": "0413 2611072, 0413 2477316, 0413 2615625 ",
    "bloodGroups": [
      "O-",
      "A+",
      "O+",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Indhira Gandhi Goverment General Hospital Blood Bank ",
    "lat": 11.931847,
    "lng": 79.83303,
    "address": "1,RVE Victor Simonel Street, Adjucent to Assembly",
    "phone": "0413 2225366",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Jawahar Institute of Post Graduate Medical Education & Research (JIPMER) Hospital Blood Bank",
    "lat": 11.954602,
    "lng": 79.797995,
    "address": "80, OPD Block, Second Floor, Dhanvantari Nagar, Gorimedu Near Gorimedu Check post",
    "phone": "0413 2297186, 0413 2297187",
    "bloodGroups": [
      "AB-",
      "O-",
      "B-",
      "AB+",
      "O+",
      "A-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "St. Joseph&#39;s Hospital (Cluny)  Blood Bank",
    "lat": 11.930442,
    "lng": 79.834177,
    "address": "St.Joseph&#39;s Hospital cluny, 16, Romain Rolland Street, Puducherry",
    "phone": "0413 225571",
    "bloodGroups": [
      "A+",
      "AB+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Sri Lakshminarayana Institute of Medical Sciences Blood Bank",
    "lat": 11.938014,
    "lng": 79.737529,
    "address": "Osudu Agaram Village, Villianur Commune, Kudapakkam\r\nPost, Opposite Oostheri Lake",
    "phone": "0413 2299218, 2299219",
    "bloodGroups": [
      "B-",
      "O+",
      "A+",
      "B+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "INDIRA GANDHI MEDICAL COLLEGE & RESEARCH INSTITUTE ( BLOOD BANK)",
    "lat": 11.939856,
    "lng": 79.79624,
    "address": "225,First Floor, Vazhudavur Road, Kathirkamam",
    "phone": "0413 2275512 ",
    "bloodGroups": [
      "A-",
      "B-",
      "O-",
      "AB-",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "East Coast Hospitals Blood Bank",
    "lat": 11.930089,
    "lng": 79.77957,
    "address": "No 1, Perambai Road, Paris Nagar, Moolakulam,  Near Vasantha Raja Theatre",
    "phone": "0413 2297899, 0413 2297824",
    "bloodGroups": [
      "A+",
      "A-",
      "AB-",
      "B+",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Rajiv Gandhi Government Women and Child Hospital Blood Bank",
    "lat": 11.93782,
    "lng": 79.806917,
    "address": "Iyyanar Kovil, Victor Simonal Street, 100 Feet Road\r\nPuducherry",
    "phone": "0413 222 9355",
    "bloodGroups": [
      "AB-",
      "A+",
      "AB+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "A.G. Padmavathi Hospital Blood Bank",
    "lat": 11.92318,
    "lng": 79.777662,
    "address": "R.S. 127/1A, Villianur Main Road, Arumparthapuram, Oulgaret, Near Adhithiya School",
    "phone": "0413 2295551,9003136689",
    "bloodGroups": [
      "O+",
      "O-",
      "B+",
      "A+",
      "AB-",
      "B-",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Yanam Old Age Home Blood Bank",
    "lat": 16.729453,
    "lng": 82.216893,
    "address": "D.no:7-4-055, Old Rajeev Nagar, River bank, Yanam",
    "phone": "8842324933",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Ajnala Civil Hospital Blood bank",
    "lat": 31.8091472,
    "lng": 74.26834,
    "address": "Fatehgarh Churian Road, Near Main Chowk",
    "phone": "01858 221105",
    "bloodGroups": [
      "O+",
      "B-",
      "A-",
      "AB-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Sri Guru Ram Das Institute of Medical Sciences and Research Blood bank",
    "lat": 31.635855,
    "lng": 74.966905,
    "address": "Mehta Road, PO Vallah",
    "phone": "0183 2870245 ",
    "bloodGroups": [
      "AB-",
      "O-",
      "B-",
      "B+",
      "A+",
      "A-",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Green Avenue Blood Bank",
    "lat": 31.637056,
    "lng": 74.856332,
    "address": "644, Mcleod Road, Rani Ka Bagh",
    "phone": "0183 2563103,0183 2566402",
    "bloodGroups": [
      "O-",
      "A+",
      "B-",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Anil Blood Bank",
    "lat": 31.643995,
    "lng": 74.86651,
    "address": "Inside EMC Super speciality Hospital, Green Avenue",
    "phone": "01835131105, 01835131111",
    "bloodGroups": [
      "O-",
      "A-",
      "B+",
      "A+",
      "AB+",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Amandeep Blood Bank",
    "lat": 31.634549,
    "lng": 74.859014,
    "address": " Amandeep Hospital, Model Town, Gt Road",
    "phone": "01832566738, 08283844000",
    "bloodGroups": [
      "AB-",
      "AB+",
      "A-",
      "O-",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Guru Nanak Dev Hospital Blood bank",
    "lat": 31.649955,
    "lng": 74.883616,
    "address": "Government Medical College, Majitha Road",
    "phone": "0183 2426918",
    "bloodGroups": [
      "B+",
      "B-",
      "AB+",
      "O-",
      "AB-",
      "A-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Adhlakha Medical Center Blood Bank",
    "lat": 31.651164,
    "lng": 74.874725,
    "address": "29-B, Race Course Road, Basant Avenue",
    "phone": "0183 2225353",
    "bloodGroups": [
      "A-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Fortis Hospital Limited Blood Bank",
    "lat": 31.664656,
    "lng": 74.918134,
    "address": "Fortis Escort Heart and Super Speciality Institute Limited, Majitha Virka, By Pass Road",
    "phone": " 0183 30121222, 01836662222",
    "bloodGroups": [
      "A+",
      "B+",
      "A-",
      "AB+",
      "O-",
      "AB-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Shri Guru Ram Das Charitable Hospital Blood Bank",
    "lat": 31.615001,
    "lng": 74.882255,
    "address": "Circular Road,Near Gurdwara Sahib Shaduin Taran Taru Road",
    "phone": "0183 2553668",
    "bloodGroups": [
      "AB-",
      "A-",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Guru Tej Rasila Charitable Hospital",
    "lat": 31.640206,
    "lng": 75.180095,
    "address": "Guru Tej Rasila Charitable Hospital, Saidpura, Amritsar",
    "phone": "9779922477",
    "bloodGroups": [
      "A-",
      "B-",
      "AB-",
      "AB+",
      "O-",
      "A+",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Jallianwala Bagh Martyr&#39;s Memorial (JBMM) Civil Hospital Blood Bank",
    "lat": 31.633401,
    "lng": 74.878894,
    "address": "G.T Road, Inder Palace Road, Maharaja Ranjit Singh Nagar, Hhasanpura Chowk, Hussainpura \r\n\r\nG.T. Road, Inder Palace Road, Ram Bagh,",
    "phone": "0183 2534906",
    "bloodGroups": [
      "B-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Maharaj Sawan Singh Charitable Hospital Blood Bank",
    "lat": 31.51633,
    "lng": 75.288007,
    "address": "G.T Road, Near Bus Stand",
    "phone": "01853-273130 (Ext-236), 01853-273161,62  (Ext-239)",
    "bloodGroups": [
      "A-",
      "A+",
      "O+",
      "B-",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Barnala Civil Hospital Blood Bank ",
    "lat": 30.375616,
    "lng": 75.544877,
    "address": "Civil Hospital Barnala, Ram Bagh Road",
    "phone": "01679 33042",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Military Blood Bank Bathinda",
    "lat": 30.216442,
    "lng": 74.986339,
    "address": "Military Blood Bank,  Bathinda",
    "phone": "0164 2291174",
    "bloodGroups": [
      "B+",
      "AB+",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Bhathinda Civil Hospital Blood Bank ",
    "lat": 30.19344,
    "lng": 74.947545,
    "address": "Mansa Road, Opposite Police Lines",
    "phone": "1642240208",
    "bloodGroups": [
      "B+",
      "AB+",
      "B-",
      "A-",
      "AB-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Max Super Speciality Hospital Blood Bank",
    "lat": 30.192388,
    "lng": 74.946979,
    "address": "NH-64, Near Bathindha District Civil Hospital, Mansa Road",
    "phone": "0164 6601400",
    "bloodGroups": [
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Adesh Institute of Medical Sciences and Research Blood Bank",
    "lat": 30.222218,
    "lng": 75.058662,
    "address": "NH- 7, Barnala Road, Bhucho, Tehsil Nathana\r\n",
    "phone": "01645055015, 0164 5055084, 0164 5055000",
    "bloodGroups": [
      "B-",
      "A+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Gupta Hospital Blood Bank",
    "lat": 30.207465,
    "lng": 74.950084,
    "address": "2/A, Power House Road, Near Jindal Heart Hospital",
    "phone": "0164 2212377, 0164 2217041",
    "bloodGroups": [
      "AB-",
      "A-",
      "A+",
      "B+",
      "O+",
      "AB+",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Rampura Phul Civil Hospital Blood Bank ",
    "lat": 30.274566,
    "lng": 75.235609,
    "address": "Cinema Road, Dashmesh Nagar",
    "phone": "01651 220700",
    "bloodGroups": [
      "AB+",
      "A+",
      "A-",
      "AB-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Guru Gobind Singh Medical College Blood Bank Hospital Blood Bank",
    "lat": 30.681255,
    "lng": 74.747606,
    "address": "Sadiq Road, Kotakpura",
    "phone": "01639 255436, 01639 - 251111",
    "bloodGroups": [
      "A+",
      "B+"
    ]
  },
  {
    "name": "Kotkapura Civil Hospital Blood Bank",
    "lat": 30.584713,
    "lng": 74.820153,
    "address": " NH15, Faridkot Road",
    "phone": "01635-228306,  0163 522 3306",
    "bloodGroups": [
      "B+",
      "AB-",
      "A+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Fatehgarh Sahib Civil Hospital Blood Bank",
    "lat": 30.646899,
    "lng": 76.390134,
    "address": "Old Tehsil, Government Quarters, BBSBE College Campus\r\nNear DC Complex",
    "phone": "01763 232203",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": " Abohar Civil Hospital Blood Bank",
    "lat": 30.141667,
    "lng": 74.198522,
    "address": "NH 15, Krishna Nagri, Near Lakarh Mandi ",
    "phone": "0163 422 1400, 01634 500924",
    "bloodGroups": [
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Fazilka Civil Hospital Blood Bank",
    "lat": 30.40713,
    "lng": 74.024688,
    "address": "Railway Colony",
    "phone": "01638 267444",
    "bloodGroups": [
      "O+",
      "A+",
      "B+",
      "B-",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Dr. Anil Bhaghi Memorial Hospital Blood Bank",
    "lat": 30.9493,
    "lng": 74.619453,
    "address": "Martyr Anil Baghi Road",
    "phone": "01632-220555, 220556",
    "bloodGroups": [
      "B-",
      "AB+",
      "A-",
      "AB-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Ferozpur Civil Hospital Blood Bank ",
    "lat": 30.952504,
    "lng": 74.607649,
    "address": "Housing Board Colony",
    "phone": "01632242964, 01632 242082",
    "bloodGroups": [
      "AB-",
      "AB+",
      "B-",
      "O-",
      "A+",
      "B+",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Batala Civil Hospital Blood Bank ",
    "lat": 31.808527,
    "lng": 75.215451,
    "address": "308 diamond avenue, batala, Civil Hospital Rd, Dharampura Colony",
    "phone": "01871 240144",
    "bloodGroups": [
      "O-",
      "A-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Gurdaspur Civil Hospital Blood Bank",
    "lat": 32.040838,
    "lng": 75.403333,
    "address": "Police Line, Near Bus Stand",
    "phone": "01874 240009",
    "bloodGroups": [
      "AB-",
      "B-",
      "A-",
      "B+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Military Hospital Blood Bank",
    "lat": 32.249222,
    "lng": 75.647473,
    "address": "167, Military Hospital, Pathankot",
    "phone": "8054081441",
    "bloodGroups": [
      "O-",
      "O+",
      "A-",
      "A+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Dasuya Civil Hospital Blood Bank",
    "lat": 31.807263,
    "lng": 75.665537,
    "address": "Hoshiarpur-Chandigarh Road, Keharvali, Dasuya\r\n",
    "phone": "01883 285084",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Garhshankar Civil Hospital Blood Bank",
    "lat": 31.213261,
    "lng": 76.151158,
    "address": "Anandpur Sahib Road",
    "phone": "01884 282051",
    "bloodGroups": [
      "O-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Shivam Hospital Blood Bank",
    "lat": 31.520779,
    "lng": 75.900469,
    "address": "Phagwara Road, Near Railway Crossing",
    "phone": " 081466 80263, 01882 248173, Extn -110  ",
    "bloodGroups": [
      "B+",
      "B-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Hoshiarpur Civil Hospital Blood Bank ",
    "lat": 31.530807,
    "lng": 75.899503,
    "address": "Kamalpur",
    "phone": "01882250190, 01882 250700",
    "bloodGroups": [
      "B+",
      "O+",
      "A-",
      "AB-",
      "B-",
      "O-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Bhai Ghanaiya Ji Charitable Blood Bank and Hospital",
    "lat": 31.535364,
    "lng": 75.901668,
    "address": "Model colony, Hoshiarpur",
    "phone": "01882 229547",
    "bloodGroups": [
      "A-",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Indian Medical Association Blood Bank Hoshiarpur",
    "lat": 31.530798,
    "lng": 75.90642,
    "address": "Sud Nursing Home,Premgarh, Dhobian Wali Gali,,",
    "phone": "01882 222244",
    "bloodGroups": [
      "A+",
      "B+",
      "B-",
      "O-",
      "A-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Sant Baba Rangi Ram Ji Charitable Hospital Blood Bank ",
    "lat": 31.675185,
    "lng": 75.657103,
    "address": "Jaja Road, Vpo - Jaja, Near Tanda\r\n",
    "phone": "01886 280266, 01886 225025",
    "bloodGroups": [
      "B+",
      "A+",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Mukerian Civil Hospital Blood Bank",
    "lat": 31.950081,
    "lng": 75.613623,
    "address": "Model Town, Tikhowal",
    "phone": "0188 3244702",
    "bloodGroups": [
      "A-",
      "B-",
      "B+",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Baba Budha Sabib Cardiac Centre (BBC) Heart Care & Pruthi Hospital Blood Bank",
    "lat": 31.317437,
    "lng": 75.57421,
    "address": "301, Lajpat Nagar",
    "phone": "0181-2222299, 0181-2222266, 0181-2222244",
    "bloodGroups": [
      "O-",
      "A+"
    ]
  },
  {
    "name": "Jalandhar Civil Hospital",
    "lat": 31.330707,
    "lng": 75.565197,
    "address": "Near Police Station,Jyothi Chowk, Islam Ganj",
    "phone": "0181 2233356,  0181 222 7982",
    "bloodGroups": [
      "B+",
      "O-",
      "A-",
      "AB-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Dr. Kanwaljit Singh Grover (KSG) Memorial Blood Bank ",
    "lat": 31.3150872,
    "lng": 75.5732243,
    "address": "Inside New Ruby Hospital, 26 Link Road, Lajput Nagar, Jalandhar",
    "phone": "0181 2224151, 0181-4614171, 0181-220130, 0181 222 1389",
    "bloodGroups": [
      "A-",
      "AB-",
      "AB+",
      "B+",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Military Hospital ",
    "lat": 31.2842844,
    "lng": 75.6295921,
    "address": "Military Hospital, Jalandhar  Cantt.",
    "phone": "8130105571",
    "bloodGroups": [
      "A-",
      "AB+",
      "B-",
      "O+",
      "AB-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Kidney Hospital and LifeLine Medical Institutions Blood bank",
    "lat": 31.304465,
    "lng": 75.587635,
    "address": "63 & 64 Waryam Nagar, Cool Road",
    "phone": "0181 244 0252, 0181 4681100",
    "bloodGroups": [
      "AB+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Tagore Hospital & Heart Care Center Blood Bank",
    "lat": 31.337046,
    "lng": 75.563262,
    "address": "91, Banda Bahadur Nagar, Mahavir Marg, Near Kapurthala Chowk\r\n",
    "phone": "0181 4685777, 0181 4685700",
    "bloodGroups": [
      "B+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Ohri Hospital Blood Bank",
    "lat": 31.324038,
    "lng": 75.567511,
    "address": "Mahavir Marg, Near State Bank Of Patiala, Shaheed Udham Singh Nagar",
    "phone": "0181 2222259",
    "bloodGroups": [
      "AB+",
      "A+",
      "B+",
      "O+",
      "O-",
      "B-",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Sacred Heart Hospital Blood Bank ",
    "lat": 31.363857,
    "lng": 75.550527,
    "address": "Grand Trunk Road, Maqsudan",
    "phone": "0181 267 0664",
    "bloodGroups": [
      "O+",
      "B-"
    ]
  },
  {
    "name": "SGL Charitable Hospital Blood Bank",
    "lat": 31.301186,
    "lng": 75.597155,
    "address": "1st - 4th Floor, Garha Road, Urban Estate Part I, Guru Amardas Market, Hardyal Nagar, ",
    "phone": "1815043300, 0181 248 1205, 0181 248 1206, 0181 248 0319",
    "bloodGroups": [
      "AB+",
      "O-",
      "B-",
      "B+",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Patel Hospital Private Limited Blood Bank",
    "lat": 31.323729,
    "lng": 75.578156,
    "address": "Civil Lines, Behind Hotel Skylark",
    "phone": " 0181 3041255, 0181 3041027, 0181 304 1000",
    "bloodGroups": [
      "AB+",
      "AB-",
      "B+",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Ghai Hospital Blood Bank ",
    "lat": 31.307531,
    "lng": 75.567277,
    "address": "661, A & B, Guru Teg Bahadur Nagar,, Near Ravi Dass Chowk\r\n",
    "phone": "0181 2277837 ",
    "bloodGroups": [
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Shree Devi Talab Mandir Charitable Hospital Blood Bank",
    "lat": 31.342787,
    "lng": 75.581737,
    "address": "Mandir Marg, Tanda Road, Near Kusht Ashram, Near Doaba Chowk, Doaba College",
    "phone": "0181 2292319, 0181 2290263 ",
    "bloodGroups": [
      "AB-",
      "A-",
      "O+",
      "AB+",
      "B-",
      "O-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Joshi Hospital and Trauma Centre Blood Bank",
    "lat": 31.334225,
    "lng": 75.563308,
    "address": "Kapurthala Chowk, Near Satyam Hospital, Adarsh Nagar",
    "phone": "0181 2620650, 0181 2620950, 0181 262 1333",
    "bloodGroups": [
      "O+",
      "O-",
      "A-",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Punjab Institute of Medical Sciences (PIMS) Blood Bank",
    "lat": 31.306683,
    "lng": 75.595821,
    "address": "Garha Road",
    "phone": "0181 6606000, Extn. 1007",
    "bloodGroups": [
      "O+",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Capitol Hospital Blood Bank",
    "lat": 31.364442,
    "lng": 75.597437,
    "address": "Jalandhar-Pathankot Road, NH-44, Near Reru Chowk",
    "phone": "0181 2366666",
    "bloodGroups": [
      "AB+",
      "A-",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Johal Multispeciality Hospital Blood Bank",
    "lat": 31.321636,
    "lng": 75.632472,
    "address": "Hoshiarpur Road, Rama Mandi",
    "phone": "0181 2410820, 0181 2410620\t",
    "bloodGroups": [
      "O+",
      "B+",
      "AB+",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Nakodar Civil Hospital Blood Bank ",
    "lat": 31.128006,
    "lng": 75.47587,
    "address": "Hospital Rd, Amardas Colony",
    "phone": "01821 220053",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Phillaur Civil Hospital Blood Bank ",
    "lat": 31.021583,
    "lng": 75.790012,
    "address": "Abad Pura, Phillaur",
    "phone": "01826 222549",
    "bloodGroups": [
      "A+",
      "A-",
      "B-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Kapurthala Civil Hospital Blood Bank ",
    "lat": 31.37571,
    "lng": 75.381995,
    "address": "Civil Hospital, Kapurthala Road",
    "phone": "01822-230070, 01628 220102",
    "bloodGroups": [
      "B-",
      "AB+",
      "A-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Phagwara Civil Hospital Blood bank",
    "lat": 31.226118,
    "lng": 75.76766,
    "address": "NH 1, Chahal Nagar",
    "phone": "01824-228149, 01824 228303",
    "bloodGroups": [
      "AB+",
      "B+",
      "A-",
      "B-",
      "A+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Kapurthala Blood Donor Council Blood bank",
    "lat": 31.219092,
    "lng": 75.77041,
    "address": "Guru Hargobind Nagar, Blood Bank Bhawan, Phagwara\r\n",
    "phone": "01824 269681, 01824-262300",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Khanna Civil Hospital Blood Bank ",
    "lat": 30.703465,
    "lng": 76.222834,
    "address": "Karnail Singh Rd, Ahluwalia Mohalla, Anant Nagar",
    "phone": "01628220102, 01628 221724",
    "bloodGroups": [
      "B-",
      "AB+",
      "A+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Shri Guru Teg Bahadur Charitable Hospital",
    "lat": 31.302247,
    "lng": 75.572492,
    "address": "Near Gurudwara,  Guru Teg Bahadur (GTB) Nagar, Jalandhar\r\n",
    "phone": "01614377147, 0181 4377100, 0181 227 1875, 0181 4620460",
    "bloodGroups": [
      "AB-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "SNS Pahawa Charitable Hospital Blood Bank",
    "lat": 30.885426,
    "lng": 75.862185,
    "address": "Industrial Area-B, Ludhiana",
    "phone": "0161 2534181",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Red Cross Regional Blood Bank",
    "lat": 30.907375,
    "lng": 75.841051,
    "address": "Red Cross Bhavan, The Mall Road, Near Rakh Bagh",
    "phone": "0161 2441257",
    "bloodGroups": [
      "B-",
      "AB-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Dayanand Medical College & Hospital Blood Bank",
    "lat": 30.916089,
    "lng": 75.835767,
    "address": "Rajpura Road, Near Rose Garden, Tagore Nagar, Civil Lines",
    "phone": "0161 4687676, 01612304280 extn. 354, 0161 468 8800",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Christian Medical College and Brown Memorial Hospital Blood Bank",
    "lat": 30.91067,
    "lng": 75.863458,
    "address": "CMC Chowk, Brown road",
    "phone": "01612115031, 0161 2115000, 0161 2115694,  0161 211 5376",
    "bloodGroups": [
      "AB-",
      "O-",
      "B+",
      "A+",
      "O+",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Mohan Dai Oswal Cancer Treatment & Research Foundation Blood Bank",
    "lat": 30.890496,
    "lng": 75.884942,
    "address": "Grand Trunk Rd, Sherpur Khurd Colony, Parbhat Nagar, Balsingh Nagar",
    "phone": "0161 2676101, 0161-2670182, 0161-5094538, 39, 40",
    "bloodGroups": [
      "A+",
      "AB+",
      "O-",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Ludhiana Civil Hospital Blood Bank ",
    "lat": 30.906634,
    "lng": 75.859678,
    "address": "Field Ganj Road, CMC Campus",
    "phone": "0161 2610002, 0161 2226999",
    "bloodGroups": [
      "AB+",
      "O-",
      "A+",
      "B+",
      "B-",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Dr. B.L. Kapoor Memorial Hospital Blood Bank",
    "lat": 30.920492,
    "lng": 75.849864,
    "address": "Sabzi Mandi Road, G.T.Road, Old Sabzi Mandi, Dal Bazar",
    "phone": "0161 2743043, 0161-2743053",
    "bloodGroups": [
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Deepak Memorial Hospital Blood Bank",
    "lat": 30.892357,
    "lng": 75.811069,
    "address": "Opposite Gate No 1, PAU, Sarabha Nagar",
    "phone": "0161 4671100, 0161 4671111, 0161 245 1500",
    "bloodGroups": [
      "AB+",
      "AB-",
      "B+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Shri Krishna Charitable Hospital Blood Bank",
    "lat": 30.888281,
    "lng": 75.845858,
    "address": "Pritm Nagar, Model Town",
    "phone": "0161 5052550, 0161 244 0942",
    "bloodGroups": [
      "A-",
      "A+",
      "B-",
      "AB-",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Fortis Hospital Blood Bank ",
    "lat": 30.889292,
    "lng": 75.935144,
    "address": "6kms from Samrala Chowk, Chandigarh Road, Mundian Kalan Village, Near Radha Soami Satsang Bhavan,",
    "phone": "1615222333",
    "bloodGroups": [
      "B+",
      "O-",
      "AB-",
      "A-",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Satguru Pratap Singh Hospital (SPS) Blood Bank",
    "lat": 30.883346,
    "lng": 75.887705,
    "address": "Grand Trunk Rd, Sherpur Chowk, Sherpur",
    "phone": "0161 6117111, 01616117114",
    "bloodGroups": [
      "AB-",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Deep Nursing Home and Children Hospital Blood Bank",
    "lat": 30.88946,
    "lng": 75.837507,
    "address": "Plot No.481, Model Town Rd, Model Town, Near Mint Gumri Chowk",
    "phone": "0161 5069210, 0161 463 8421",
    "bloodGroups": [
      "B+",
      "A+"
    ]
  },
  {
    "name": "Shree Ragunath Hospital Blood Bank",
    "lat": 30.888778,
    "lng": 75.795876,
    "address": "Aggar Nagar - B Block, Aggar Nagar",
    "phone": "0161 4361121",
    "bloodGroups": [
      "B-",
      "A+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Mansa Civil Hospital Blood Bank ",
    "lat": 29.985368,
    "lng": 75.40316,
    "address": "Water Works Road, Civil Hospital",
    "phone": "01652220208, 01652 222102",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Moga Civil Hospital Blood Bank ",
    "lat": 30.811673,
    "lng": 75.169349,
    "address": "Mina Bazar, New Town",
    "phone": "1636230540",
    "bloodGroups": [
      "AB-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Banga Civil Hospital Blood Bank ",
    "lat": 31.184344,
    "lng": 75.995988,
    "address": "SH18, Gandhi Nagar Mohalla",
    "phone": "01823 260700, 01823-500444",
    "bloodGroups": [
      "B+",
      "O+",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Guru Nanak Mission Hospital Blood Bank",
    "lat": 31.193742,
    "lng": 75.948973,
    "address": "Phagwara - Mohali Expressway, ",
    "phone": "01823 260260, Extn : 1039, 0182 326 2679",
    "bloodGroups": [
      "A-",
      "O+",
      "B+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Blood Donors Council, Blood Bank ",
    "lat": 31.118537,
    "lng": 76.116853,
    "address": "Blood Donors Complex, Rahon Road",
    "phone": "01823 221940, 01823 220974",
    "bloodGroups": [
      "A+",
      "B+",
      "O-",
      "B-",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Pathankot Civil Hospital Blood Bank ",
    "lat": 32.2824637,
    "lng": 75.6529524,
    "address": "Shahpur Road",
    "phone": "0186 2220180, 0186 2250160",
    "bloodGroups": [
      "O+",
      "AB+",
      "A+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Chintpurni Medical College and Hospital Blood Bank",
    "lat": 32.306064,
    "lng": 75.757861,
    "address": "Near Indian Heritage School, DLM City, Bungal,",
    "phone": "01870 250601, 0187 025 0600, 01870-250603",
    "bloodGroups": [
      "O-",
      "B+",
      "A+",
      "B-",
      "AB-",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Nabha Civil Hospital Blood Bank",
    "lat": 30.370999,
    "lng": 76.146125,
    "address": "Nabha",
    "phone": "01765 226361, 01765 220 644",
    "bloodGroups": [
      "B+",
      "A+"
    ]
  },
  {
    "name": "Government Medical College and Rajindra Hospital Blood Bank",
    "lat": 30.327696,
    "lng": 76.386153,
    "address": "Sangrur Road",
    "phone": "0175 2203912,  0175 221 2542",
    "bloodGroups": [
      "AB-",
      "B-",
      "O-",
      "A-",
      "B+",
      "O+",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Military Hospital Blood Bank",
    "lat": 30.326207,
    "lng": 76.382177,
    "address": "Patiala",
    "phone": "9872461083",
    "bloodGroups": [
      "O-",
      "B+",
      "AB+",
      "A-",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Life Line Blood Centre",
    "lat": 30.343682,
    "lng": 76.399514,
    "address": "13-A, Walia Hospital, Corner View Colony, Dukhniwaran Road, Factory Area",
    "phone": "0175 2351532",
    "bloodGroups": [
      "O+",
      "B+",
      "AB-",
      "A+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Gian Sagar Medical College and Hospital Blood Bank",
    "lat": 30.528959,
    "lng": 76.671462,
    "address": "Ramnagar (Banur),  District Patiala, Punjab",
    "phone": "01762 510132 Ext:1128/1060, 01762 520 000, 01762507299",
    "bloodGroups": [
      "O+",
      "B+"
    ]
  },
  {
    "name": "Rajpura Civil Hospital Blood Bank",
    "lat": 30.478441,
    "lng": 76.584065,
    "address": "AP Jain Hospital, Rajpura",
    "phone": "01762 225539, 0175 221 2055",
    "bloodGroups": [
      "A+",
      "B-",
      "O+",
      "O-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Ananadpur Sahib Civil Hospital Blood Bank",
    "lat": 31.238973,
    "lng": 76.494595,
    "address": "Ward No:1, Nania Devi Road, Keshgarh Sahib",
    "phone": "0188 7232102, 01881-232612, 232102",
    "bloodGroups": [
      "O-",
      "O+",
      "A+",
      "A-",
      "AB-",
      "B+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "BBMB Hospital Blood Bank",
    "lat": 31.382789,
    "lng": 76.364112,
    "address": "BBMB Hosital Nangal Town Ship",
    "phone": "1887223902",
    "bloodGroups": [
      "O-",
      "B+",
      "AB+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Rupnagar Civil Hospital Blood Bank ",
    "lat": 30.966052,
    "lng": 76.52516,
    "address": "Ali Mohalla, Mil Mil Nagar, Gugga Mari Mohalla, Near Bela Chowk ",
    "phone": "01881 222080",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Kharar Civil Hospital Blood Bank",
    "lat": 30.752837,
    "lng": 76.632796,
    "address": "Civil Hospital Road, Guru Teg Bahadur Nagar, Near Bus Stand\r\n",
    "phone": "0160 2280797",
    "bloodGroups": [
      "B-",
      "O+",
      "O-",
      "A-",
      "B+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Sri Guru Harkrishan Sahib Charitable Eye Hospital Trust Blood Bank",
    "lat": 30.69336,
    "lng": 76.698763,
    "address": "Sector 77, Ajitgarh, Sohana, Sahibzada Ajit Singh Nagar, \r\n",
    "phone": "0172 2295000, Extn: 401 and 405",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Fortis Hospital Mohali, Blood Bank",
    "lat": 30.694086,
    "lng": 76.730141,
    "address": "Sector 62, Phase - VIII, Sahibzada Ajit Singh Nagar,",
    "phone": "0172 469222, 01724692270",
    "bloodGroups": [
      "B+",
      "AB+",
      "A+",
      "AB-",
      "A-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Silver Oaks Hospital Blood Bank",
    "lat": 30.692232,
    "lng": 76.733098,
    "address": "Phase 9, Sector 63, SAS Nagar, Sahibzada Ajit Singh Nagar, \r\nPunjab India, SAS Nagar",
    "phone": "0172 5097113, 0172 5063618",
    "bloodGroups": [
      "O-",
      "AB+",
      "B+",
      "B-",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Grecian Super Speciality Hospital Blood Bank",
    "lat": 30.691127,
    "lng": 76.723553,
    "address": "Sector 69 , Sahibzada Ajit Singh Nagar",
    "phone": "0172 469 6600, 0172 5098045, 0172 2234340, 0172 2234341",
    "bloodGroups": [
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Ivy Health and Life Sciences Private Limited",
    "lat": 30.706958,
    "lng": 76.708016,
    "address": "IVY Hospital, Sector-71",
    "phone": "0172 7170121, 01725242120, 0172 5044333",
    "bloodGroups": [
      "AB-",
      "A+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Max Super Specialty Hospital Blood Bank",
    "lat": 30.73975,
    "lng": 76.714419,
    "address": "Near Civil Hospital, Phase-VI, Sector 56A",
    "phone": "0172 6652396, 0172 665 2000, 0172 6652397, 2398, 2399",
    "bloodGroups": [
      "B-",
      "AB+",
      "O+",
      "O-",
      "B+",
      "A-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Mohali Civil Hospital Blood Bank",
    "lat": 30.739307,
    "lng": 76.713957,
    "address": "Phase 6, 56A, Sector 56, Sahibzada Ajit Singh Nagar\r\n\r\n",
    "phone": "01722223637, 0172 2225264",
    "bloodGroups": [
      "AB+",
      "A+",
      "B-",
      "AB-",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Malerkotla Civil Hospital Blood Bank ",
    "lat": 30.26952,
    "lng": 75.809513,
    "address": "Railway Rd, Agar Nagar",
    "phone": "01675 253057",
    "bloodGroups": [
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Civil Hospital Blood Bank",
    "lat": 30.668559,
    "lng": 76.294889,
    "address": "Civil Hospital, Nasrali, Mandi Gobindgarh",
    "phone": "01765 255602",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Sangrur Civil Hospital Blood Bank ",
    "lat": 30.251874,
    "lng": 75.836328,
    "address": "Mubarik Mehal Colony, Dhuri Road, Mahavir chowk",
    "phone": "0167 2230130",
    "bloodGroups": [
      "O-",
      "AB-",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Muktsar Civil Hospital Blood Bank ",
    "lat": 30.463286,
    "lng": 74.537174,
    "address": "Canal Colony, Bathinda Road, Sri Muktsar Sahib ",
    "phone": "0163 3262275, 01635-228306",
    "bloodGroups": [
      "A-",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Patti Civil Hospital Blood Bank ",
    "lat": 31.274623,
    "lng": 74.853386,
    "address": " Civil Hospital Patti, Taran taran ",
    "phone": "01851 244949",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Tarn Taran Civil Hospital Blood Bank ",
    "lat": 31.458838,
    "lng": 74.923433,
    "address": "NH 15, Guru Teg Bahadur Nagar",
    "phone": "01852 222755",
    "bloodGroups": [
      "A-",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Guru Nanak Dev Super Speciality Hospital Blood Bank",
    "lat": 31.446706,
    "lng": 74.937133,
    "address": "Goindwal Sahib Road, Bachre",
    "phone": "01852 667100",
    "bloodGroups": [
      "AB+",
      "O-",
      "A-",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Amrit Kaur Government Hospital Blood Bank",
    "lat": 26.080635,
    "lng": 74.326431,
    "address": "Rajasthan State Highway 59, Champa Nagar",
    "phone": "01462 257222",
    "bloodGroups": [
      "O-",
      "O+",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "J.L.N. and A.G. Hospital Blood Bank",
    "lat": 26.469566,
    "lng": 74.636014,
    "address": "JLN Hospital,  Ajmer",
    "phone": "0145 2431842, 0145 2627686, 0145 2625500,5509",
    "bloodGroups": [
      "B+",
      "B-",
      "AB+",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "North Western Railway Hospital Blood Bank",
    "lat": 26.439622,
    "lng": 74.639781,
    "address": "Beawar Road, Ramganj, ",
    "phone": "0145 2461004, 0145 2460402,  0145 246006",
    "bloodGroups": [
      "O+",
      "AB-",
      "A-",
      "B+",
      "A+",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Military Hospital Blood Bank",
    "lat": 26.310265,
    "lng": 74.727086,
    "address": "Military Hospital, Nasirabad",
    "phone": "01491 220045",
    "bloodGroups": [
      "O-",
      "AB+",
      "A+",
      "A-",
      "B-",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "RAJKIYA MAHILA CHIKITSALAYA, AJMER",
    "lat": 26.52447481,
    "lng": 74.66235606,
    "address": "LOHAGAL ROAD, AJMER",
    "phone": "0145 2789212",
    "bloodGroups": [
      "AB+",
      "A-",
      "AB-",
      "A+",
      "B-",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Mittal Hospital and Research Centre Blood Bank",
    "lat": 26.474396,
    "lng": 74.612285,
    "address": "Pushkar Road",
    "phone": "0145 2603600",
    "bloodGroups": [
      "B+",
      "B-",
      "AB+",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Government Y.N. Hospital Blood Bank",
    "lat": 26.581635,
    "lng": 74.861008,
    "address": "Kishangarh Road, Mitra Niwas Colony\r\nNear R.K House",
    "phone": "01463 245602",
    "bloodGroups": [
      "O-",
      "A+",
      "O+",
      "A-",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Rajiv Gandhi Government General Hospital Blood Bank",
    "lat": 27.57247,
    "lng": 76.458792,
    "address": "Bijli Ghar Ka choraha, Mangal Marg",
    "phone": "0144 2346033, 0144 2345087 ",
    "bloodGroups": [
      "AB-",
      "O-",
      "B-",
      "B+",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Seth Makhan Lal Mahawar Charitable Blood Bank Society",
    "lat": 27.550891,
    "lng": 76.615215,
    "address": "Red Cross Bhavan, Near Income Tax Bhawan, Moti Dungari, ",
    "phone": "0144 2348277",
    "bloodGroups": [
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Kailash Hospital Blood Bank",
    "lat": 27.88214,
    "lng": 76.286106,
    "address": "Delhi-Jaipur NH-08, Behror, Near Bharat Petrol Pump\r\n\r\n",
    "phone": "01494 222222, 01494 222444 ",
    "bloodGroups": [
      "B-",
      "A-",
      "B+",
      "O-",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Mahatma Gandhi Government Hospital Blood Bank",
    "lat": 23.553246,
    "lng": 74.442491,
    "address": "Bikaner",
    "phone": "02962 242483, 02962240223",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Baran Government Hospital, Blood bank",
    "lat": 25.104377,
    "lng": 76.503388,
    "address": "Government Hospital, Kota Road, Gandhi Colony",
    "phone": "07453 230322, 07453 236222 PMO-9414257218",
    "bloodGroups": [
      "O+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Barmer Government Hospital Blood Bank",
    "lat": 25.7505,
    "lng": 71.396354,
    "address": "Railway Colony",
    "phone": "02982 230402",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "R. B. M. Hospital Blood bank",
    "lat": 27.22366,
    "lng": 77.506446,
    "address": "Vikas Nagar, Near circular road",
    "phone": "05644223633, 05644 223622",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Jindal Super Speciality Hospital Blood Bank",
    "lat": 27.230266,
    "lng": 77.477799,
    "address": "S.P.M. Nagar, U.I.T Colony",
    "phone": "05644 236 800, 05644-236550",
    "bloodGroups": [
      "B-",
      "O-"
    ]
  },
  {
    "name": "Mahatma Gandhi Hospital Blood Bank",
    "lat": 25.347562,
    "lng": 74.641874,
    "address": "Swami Ram Charan Marg, Bhopal Ganj",
    "phone": "01482 232 641, 04182220139",
    "bloodGroups": [
      "A-",
      "AB-",
      "AB+",
      "B+",
      "O-",
      "B-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Bhupal Singh Dhariwal Memorial Blood Bank ",
    "lat": 25.358359,
    "lng": 74.645124,
    "address": "Sector:8, R C Vyas Colony, Near Sahakari Bhumi vikas bank",
    "phone": "01482 238113, 01482239113",
    "bloodGroups": [
      "O-",
      "AB-",
      "B+",
      "A-",
      "B-",
      "A+",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Ram Snehi Hospital Blood Bank ",
    "lat": 25.349758,
    "lng": 74.643888,
    "address": "Nehru Road",
    "phone": "01482 234 100, 01482238640",
    "bloodGroups": [
      "B+",
      "A+",
      "B-",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Prince Bijoy Memorial Man&#39;s Hospital Blood bank",
    "lat": 28.012378,
    "lng": 73.327022,
    "address": "National Highway 89, SP Medical College Road, Near Ambedkar Circal",
    "phone": "01512226333 Ext-125, 0151 2226334, 0151 2226338 ",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Sanjeevani Jan Sewa Samiti Blood Bank",
    "lat": 28.011857,
    "lng": 73.354305,
    "address": "2nd Floor, Chalana Hospital Campus, Sector-6, JN Vyas Colony, Near Police Station",
    "phone": "0151 2235035",
    "bloodGroups": [
      "B-",
      "A-",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Kothari Medical Centre and Research Institute Blood Bank",
    "lat": 28.02578,
    "lng": 73.298469,
    "address": "NH-15, Bangla Nagar, Bikaner.",
    "phone": "9414506583",
    "bloodGroups": [
      "A-",
      "AB-"
    ]
  },
  {
    "name": "P.B.S.S.General Hospital Blood Bank",
    "lat": 25.441477,
    "lng": 75.644144,
    "address": "Opposite to Road Wave bus stand Bumdi, Near to DC office",
    "phone": "0747 2443456, 0747-2442760",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Shree Sanwaliyaji Government Hospital Blood Bank",
    "lat": 24.619153,
    "lng": 74.681808,
    "address": "A63, Udaipur Rd, Senthi, Bapu Nagar, Chittorgarh",
    "phone": "01472 241102, 01472 240744",
    "bloodGroups": [
      "A-",
      "AB-",
      "AB+",
      "B+",
      "A+",
      "B-",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Rajasthan Atomic Power Station (R.A.P.S) Hospital Blood Bank ",
    "lat": 24.873676,
    "lng": 75.617899,
    "address": "Chittaurgarh",
    "phone": "01475 233250",
    "bloodGroups": [
      "B+",
      "O-",
      "AB+",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Government D.B. Hospital Blood Bank",
    "lat": 28.28984,
    "lng": 74.959757,
    "address": "Near Polica Line, Churu.",
    "phone": "01562 250333",
    "bloodGroups": [
      "A-",
      "B-",
      "B+",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Ratangarh General Hospital Blood Bank",
    "lat": 28.07138,
    "lng": 74.623013,
    "address": "Man Nagar, Churu",
    "phone": "01567 222330, 01567-222924",
    "bloodGroups": [
      "B+",
      "AB-",
      "A-",
      "O+",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Lion Charitable Trust Blood Bank",
    "lat": 27.697179,
    "lng": 74.471967,
    "address": "Near Kanoi Balika School, Adarsh Colony, Ramgariya Dharamshala Road.",
    "phone": "01568 225300, 01568-225307",
    "bloodGroups": [
      "AB-",
      "B+",
      "B-",
      "O+",
      "O-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Shri Ramkaran Joshi General Hospital Bood bank",
    "lat": 26.883949,
    "lng": 76.335767,
    "address": "Lalsot, Dausa, NH-11A, Lalsot Road, ",
    "phone": "01427-220960, 01427 220223",
    "bloodGroups": [
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Dholpur Government Hospital",
    "lat": 26.690079,
    "lng": 77.899636,
    "address": "Madina Colony,  Hospital Road",
    "phone": "05642 220738, 05642 221180, Ext 207, 05642-220221",
    "bloodGroups": [
      "AB+",
      "A+",
      "O-",
      "A-",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Shri Haridev Joshi General Hospital Blood bank",
    "lat": 23.858847,
    "lng": 73.71089,
    "address": "New Colony, Dungarpur.",
    "phone": "02964 232413",
    "bloodGroups": [
      "A-",
      "O+",
      "AB+",
      "B-",
      "A+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Life Line Blood Bank",
    "lat": 29.609166,
    "lng": 74.297906,
    "address": "1st floor Bombay hospital campus, Town Road, Hanumangarh Junction",
    "phone": "01552 269135",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Sawai Man Singh (S.M.S) Hospital Blood Bank",
    "lat": 26.906044,
    "lng": 75.816216,
    "address": "J.L.N. Marg, Near Maharani College",
    "phone": "0141 2560291, 0141 2569885, 0141 261 9020, 0141 2518434, 8234",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Santokba Durlabhji Medical Hopsital Blood bank",
    "lat": 26.893786,
    "lng": 75.812174,
    "address": "Santokba Durlabhji Memorial Hospital cum Medical Research Institute\r\n5th Floor, SDMH OPD Block, Bhawani Singh Road, Bapu Nagar",
    "phone": " 0141 256 6251, 0141-5196655",
    "bloodGroups": [
      "O-",
      "AB+",
      "O+",
      "B+",
      "B-",
      "A+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Government Mahila Chikitsalaya Blood Bank",
    "lat": 26.914775,
    "lng": 75.824649,
    "address": "Opposite Sangneri Gate, Adarsh Nagar ",
    "phone": "0141-2610542, 0141 2601333, 0141 2601334 ",
    "bloodGroups": [
      "A+",
      "O+",
      "AB+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Zanana Hospital Blood Bank",
    "lat": 26.925927,
    "lng": 75.806748,
    "address": "Chand-Pole Gate, Station Road, Reserve Police Line",
    "phone": " 0141 231 9350, 0141-2776205, 0141 2378721, 0141 2378219, 0141 2378204",
    "bloodGroups": [
      "B+",
      "AB-",
      "A-",
      "B-",
      "O+",
      "O-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Bhagwan Mahaveer Cancer Hospital & Research Centre Blood Bank",
    "lat": 26.863267,
    "lng": 75.805818,
    "address": "Jawahar Lal Nehru Marg, Bajaj Nagar, Near Saras Sankul",
    "phone": "0141-2700107 (Ext:275)",
    "bloodGroups": [
      "O-",
      "O+",
      "AB+",
      "AB-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Jaipuria Hospital Blood Bank ",
    "lat": 26.856547,
    "lng": 75.800524,
    "address": "Milap Nagar, Tonk Road, Jaipur",
    "phone": "0141 2552034, Extn. 200",
    "bloodGroups": [
      "A-",
      "O+",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Mahatama Gandhi National Institute of Medical Sciences (MGNIMS) Blood Bank",
    "lat": 26.770811,
    "lng": 75.855209,
    "address": "Riico Institutional Area, Sitapura, Tonk Road, ",
    "phone": "0141 2771777  ext 109/110, 0141 2770900",
    "bloodGroups": [
      "A-",
      "B+"
    ]
  },
  {
    "name": "Swasthya Kalyan Blood Bank and Thalesemia Research Center",
    "lat": 26.916784,
    "lng": 75.829997,
    "address": "Swasthya Kalyan Bhawan, Narain Singh Road,  Near Trimurti Circle.\r\n",
    "phone": "0141 2545293, 0141 721771",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Monilek Hospital and Research Center Blood Bank",
    "lat": 26.88687,
    "lng": 75.83414,
    "address": "Sector 4, Jawahar Nagar,  Monilek meag Jawahar nagar, Near UDB Building jawahar nagar",
    "phone": "0141 2651393, 0141 2653022",
    "bloodGroups": [
      "B+",
      "B-",
      "AB+",
      "O-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "National Institute of Medical Sciences Blood bank",
    "lat": 27.192337,
    "lng": 75.954816,
    "address": "Shobha Nagar, Jaipur-Delhi Highway (NH-11C)",
    "phone": "0142 6513118, 0141 2605050",
    "bloodGroups": [
      "B+",
      "A+",
      "AB+",
      "O-",
      "AB-",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Agrasen Blood Bank",
    "lat": 26.957297,
    "lng": 75.777845,
    "address": "Puran mal Phoola Devi Memorial Trust, Maharaja Agrasen Hospital Campus, Sector No-7, Vidyadhar Nagar.",
    "phone": "0141 2335569, 0141 2572954",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "S.K. Soni Blood Bank",
    "lat": 26.968848,
    "lng": 75.773365,
    "address": "Sector 5, Vidhyadhar Nagar,  Main Sikar Road,",
    "phone": "1415163940, 0141 5164000, 0141 2232409, 10, 12",
    "bloodGroups": [
      "A-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Fortis Escorts Hospital Blood Bank",
    "lat": 26.846176,
    "lng": 75.803437,
    "address": "Jawahar Lal Nehru Marg,  Malviya Nagar.",
    "phone": "0141254700, 0141 409 7109 ",
    "bloodGroups": [
      "A-",
      "A+"
    ]
  },
  {
    "name": "Narayana Multispeciality Hospital Blood bank",
    "lat": 26.794932,
    "lng": 75.824591,
    "address": "Sec-28, Kumbha Marg, Prathap Nagar-Sanganer,",
    "phone": "0141 7122222, 0141 5192939, 0141 5192901",
    "bloodGroups": [
      "A+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Apex Swasthya Kalyan Blood Bank",
    "lat": 26.854701,
    "lng": 75.82519,
    "address": "Apex Hospital Pvt. Ltd.\r\nSP-4 & 6, Malviya Nagar Industrial Area, Malviya Nagar, ",
    "phone": "0141 4101111, 0141 2751870, 0141 2751006",
    "bloodGroups": [
      "AB-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Metro Blood Bank ",
    "lat": 26.868106,
    "lng": 75.768461,
    "address": "Metro Manas Arogya Sadan (MAS) Heart Care and Multispeciality Hospital\r\nShipra Path, Mansarovar, Near Technology Park",
    "phone": "0141-6661234, 0141 2786001 ",
    "bloodGroups": [
      "AB+",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Pushpa Devi Memorial Blood Bank ",
    "lat": 26.938802,
    "lng": 75.780923,
    "address": "52-53, Ashok Vihar, Ambabari Bridge, Behind petol pump, Jhotwara Road",
    "phone": "0141-2336135",
    "bloodGroups": [
      "A+",
      "B-",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Life care Blood Bank",
    "lat": 26.967938,
    "lng": 75.766452,
    "address": "Life Care Blood Bank,  Shri Balalji Hospital Campus,  46-D, Paramhans Colony,  Murlipura, Jaipur.",
    "phone": "0141 223 6108",
    "bloodGroups": [
      "A+",
      "A-",
      "AB+",
      "B-",
      "O-",
      "B+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Sevaytan Swasthay Kalyan Blood Bank",
    "lat": 26.901102,
    "lng": 75.770403,
    "address": "Sevayatan Hospital, Ajmer Rd, Mittal Colony, Sodala\r\n",
    "phone": "1412220290",
    "bloodGroups": [
      "A+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Government BDM Hospital Blood Bank",
    "lat": 27.702019,
    "lng": 76.190905,
    "address": "Kotputli,  NH-8, Near Morargi Dhramsala",
    "phone": "01421 222088",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Government S.J. Hospital Blood Bank",
    "lat": 26.241797,
    "lng": 73.021563,
    "address": "Hanuman Circle",
    "phone": "02992 251335,  02992-250701",
    "bloodGroups": [
      "O+",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Jalore Government General Hospital Blood Bank",
    "lat": 25.235099,
    "lng": 72.504023,
    "address": "Vedhaynath Colony, Jalore",
    "phone": "02973-225098, 02973 225090",
    "bloodGroups": [
      "B-",
      "O-"
    ]
  },
  {
    "name": "Jhalawar Hospital and Medical College Blood Bank",
    "lat": 24.586774,
    "lng": 76.160622,
    "address": "N.H.-12, Kota Road, \r\n",
    "phone": "07432-233233, 07432- 233388, 7432-234465",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Government B.D.K. Hospital Blood Bank",
    "lat": 28.116641,
    "lng": 75.395501,
    "address": "Man Nagar, Opposite Bus Depot, Road No:1",
    "phone": "01592234789, 01592 232199, 01592 232524",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Birla Sarvajanik Hospital Blood Bank",
    "lat": 28.358777,
    "lng": 75.604018,
    "address": "13, Chirawa-Pilani Rd, Norangpura, Pilani",
    "phone": "01596 242 114",
    "bloodGroups": [
      "A+",
      "B+",
      "A-",
      "AB+",
      "O+",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Mahatma Gandhi Hospital Blood Bank",
    "lat": 26.282878,
    "lng": 73.018759,
    "address": "Jalori Bari Road, Jaswant Sarai, Ratanada",
    "phone": "0291 263 9851, 0291 2636437, 6438, 6439",
    "bloodGroups": [
      "AB+",
      "O+",
      "A+",
      "O-",
      "A-",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Mathura Das Mathur Government Hospital Blood Bank",
    "lat": 26.266415,
    "lng": 73.009226,
    "address": "Main RoadMain Road, Sector-C, Shastri Nagar, Jodhpur.",
    "phone": "0291 2624300",
    "bloodGroups": [
      "O-",
      "B+",
      "A-",
      "O+",
      "AB-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Umaid Hospital Blood Bank",
    "lat": 26.284673,
    "lng": 73.009906,
    "address": " Siwanchi Gate Road, Pratap Nagar",
    "phone": "0291 243 5730 (Ext:233), 0291 2435720",
    "bloodGroups": [
      "AB+",
      "B+",
      "AB-",
      "O-",
      "A+",
      "B-",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Military Hospital Blood Bank",
    "lat": 26.289543,
    "lng": 73.047169,
    "address": "Cantt Area, Jodhpur.\r\n",
    "phone": "0291 2566257 ",
    "bloodGroups": [
      "B-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Kanun Devi Parasmal Mehta Medical and Blood Bank",
    "lat": 26.27777,
    "lng": 73.015288,
    "address": "733, 1st - C Road, Sardarpura",
    "phone": "0291 5106836, 5107835",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Kalapurnam General Hospital Khichan Blood Bank",
    "lat": 27.115405,
    "lng": 72.415203,
    "address": "Bhatiyara Mohalla, Jodhpur.",
    "phone": "02925 222970, ",
    "bloodGroups": [
      "B+",
      "O+",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Ambika Hospital Blood Bank",
    "lat": 26.231723,
    "lng": 73.021055,
    "address": "B-22,23, Saraswati Nagar,  Madhuban Housing Board, Basni",
    "phone": "0291-2721223, 0291 2721316",
    "bloodGroups": [
      "AB-",
      "AB+",
      "A+",
      "B+"
    ]
  },
  {
    "name": "AIIMS Hospital Blood Bank",
    "lat": 26.241422,
    "lng": 73.004365,
    "address": "Basni Industrial Area, Phase-2, Jodhpur.",
    "phone": "0291 2740741",
    "bloodGroups": [
      "AB+",
      "A+",
      "AB-",
      "B-",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Jodhpur Medical College",
    "lat": 26.269415,
    "lng": 73.007401,
    "address": "Near Sriram Excellency Hotel, Opposite Petrol Pump,\r\nJodhpur. ",
    "phone": "0291 1281551, 0291 2434374",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Government Hospital Karauli Blood Bank",
    "lat": 26.500853,
    "lng": 77.025833,
    "address": "Gulab Bagh",
    "phone": "07464 220029, 07464220105",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Kota Blood Bank Society",
    "lat": 25.15205,
    "lng": 75.835195,
    "address": "Kota, 1-Basant Bihar, Dadabari, Near Modi College",
    "phone": "0744 2402020, 0744 2402010",
    "bloodGroups": [
      "O-",
      "A-",
      "B-",
      "B+",
      "A+",
      "AB+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Krishna Rotary Blood Bank",
    "lat": 25.153422,
    "lng": 75.851833,
    "address": "1-A- 12, S.F.S., Doctor\u00e2\u20ac\u2122s Enclave, Talwandi",
    "phone": "0744 3291661",
    "bloodGroups": [
      "A-",
      "AB+",
      "A+",
      "B+",
      "O-",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Maharao Bhimsingh Hospital Blood Bank",
    "lat": 25.198998,
    "lng": 75.856664,
    "address": "Maharao Bhimsingh Hospital, Nayapura,\r\nKota.",
    "phone": "0744 2322171, 0744 2326000",
    "bloodGroups": [
      "O-",
      "O+",
      "B-",
      "A-"
    ]
  },
  {
    "name": "New Hospital  Medical College Blood Bank",
    "lat": 25.119971,
    "lng": 75.831146,
    "address": "Ganesh Nagar Road, Rama Krishna Puram, Kota.",
    "phone": "0744 24770477",
    "bloodGroups": [
      "A-",
      "B+"
    ]
  },
  {
    "name": "Shri Ram Blood Bank",
    "lat": 25.144698,
    "lng": 75.837722,
    "address": "Shri Ram Hospital , Sheela Choudhary Rd, New Rajeev Gandhi Nagar, VIP Colony, Talwandi,",
    "phone": "0744 2437378",
    "bloodGroups": [
      "A-",
      "AB+",
      "B+",
      "A+",
      "AB-",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Sudha Blood Bank",
    "lat": 25.150517,
    "lng": 75.852151,
    "address": "Sudha Hospital and Research Centre Private Limited, 11-A, Talwandi, Jhalawar Road, VIP Colony, Talwandi, Kota.",
    "phone": "0744-3010086, 0744 3010000, 10001, 10003, 0744 279 0001",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Bharat Vikas Parishad Chikitshalya Blood Bank",
    "lat": 25.16239,
    "lng": 75.831475,
    "address": "Pratap Nagar, Dada Bari",
    "phone": "0744 2404501, 0744 2404502, 0744 2404503",
    "bloodGroups": [
      "B-",
      "B+"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 27.207987,
    "lng": 73.737224,
    "address": "Bikaner Road, Near Balwa Nagaur\r\n",
    "phone": "01582 242985",
    "bloodGroups": [
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Government Bangar Hospital Blood Bank",
    "lat": 25.776368,
    "lng": 73.332182,
    "address": "Bangar Hospital, Veer Durga Das Nagar, Pali",
    "phone": "02932 226059",
    "bloodGroups": [
      "B+",
      "A+",
      "AB+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 25.922226,
    "lng": 73.663357,
    "address": "Sojat",
    "phone": "02960 222030",
    "bloodGroups": [
      "O-",
      "B+",
      "B-",
      "O+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Bhagwan Mahavir Hospital Blood Bank",
    "lat": 25.132911,
    "lng": 73.11258,
    "address": "Jawai Bhand Road , Ramnagar",
    "phone": "02933 258632, 02933 258699",
    "bloodGroups": [
      "B+",
      "AB-",
      "B-",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Government District Hospital Blood Bank",
    "lat": 25.6835288,
    "lng": 81.9984388,
    "address": "District Hospital Blood Bank, Pratapgarh.",
    "phone": "01478 225104, 01478 222939",
    "bloodGroups": [
      "AB-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "R.K. District Hospital Blood Bank",
    "lat": 25.024193,
    "lng": 73.883611,
    "address": "Haribhau Upadhyay Nagar, Rajsamand.",
    "phone": "02952220433, 02952 220529, 02952 220033",
    "bloodGroups": [
      "O-",
      "AB-",
      "A+",
      "B+",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Riya Hospital Blood Bank",
    "lat": 26.487535,
    "lng": 76.740236,
    "address": "NH 11B, Adarsh Nagar",
    "phone": "07463-230080, 07463 233374",
    "bloodGroups": [
      "A+",
      "B+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Sawai Madhopur Government General Hospital Blood Bank",
    "lat": 25.217543,
    "lng": 75.837287,
    "address": "Alampur chowk \r\nHousing Board Rd, Housing Board, Sawai Madhopur,",
    "phone": "07462-234140, 07462 233040",
    "bloodGroups": [
      "AB+",
      "A+",
      "B+"
    ]
  },
  {
    "name": "S.K. Hospital Blood Bank",
    "lat": 27.61311,
    "lng": 75.150577,
    "address": "silver Jubilee Road, Near SK College",
    "phone": "01572 270 499, 01572 251093",
    "bloodGroups": [
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Shri MunshiRam Mittal Memorial Seva Samiti Blood bank",
    "lat": 27.612976,
    "lng": 75.150611,
    "address": "Opposite to  S.K. School, Silver Jubilee Road, ",
    "phone": "01572 270777, 01572 240404",
    "bloodGroups": [
      "AB+",
      "A-",
      "B+",
      "AB-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Dr. K.M. Memorial Jain Heart & General Hospital Blood Bank",
    "lat": 27.613529,
    "lng": 75.145288,
    "address": "Station Road, Subhash Chowk",
    "phone": "01572 253034, 01572-250999",
    "bloodGroups": [
      "O-",
      "O+",
      "B+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Getwell Hospital and Research Center Blood Bank ",
    "lat": 27.611508,
    "lng": 75.149061,
    "address": "Opp.S.K. School,Near, Dr.B.L.Ranwa (Physician)",
    "phone": "01572 271 101, 01572 270173, 01572 270101",
    "bloodGroups": [
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Government General Hospital Blood Bank",
    "lat": 24.88629,
    "lng": 72.859424,
    "address": "Palace Road Sirohi, Near Govt College Sirohi,",
    "phone": "02972 220041",
    "bloodGroups": [
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Rotary International Global Hospital Blood Bank",
    "lat": 24.538286,
    "lng": 72.801958,
    "address": "Radha Mohan Mehrotra Global Hospital Trauma Centre, \r\nOpposite Modern Insulators Ltd., Talhati, Abu Road",
    "phone": "02974228606, 02974 22860, 02974 228472",
    "bloodGroups": [
      "B+",
      "B-",
      "AB-",
      "A-",
      "O-",
      "AB+",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 29.903133,
    "lng": 73.873964,
    "address": "Hardeep Colony, Sri Ganganagar.",
    "phone": "0154 2466009",
    "bloodGroups": [
      "B+",
      "O+",
      "AB+",
      "A-",
      "AB-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Tapovan Blood Bank",
    "lat": 29.913206,
    "lng": 73.881827,
    "address": "Opposite to Jawahar Nagar Tehsil Bhawan ",
    "phone": "0154-2460412, 0154 2460514",
    "bloodGroups": [
      "A-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Swastik Blood Bank ",
    "lat": 29.91577,
    "lng": 73.87975,
    "address": "Gagan Path, Jhawar Nagar, Jawahar Nagar",
    "phone": "0154 2463764",
    "bloodGroups": [
      "AB-",
      "A+",
      "O-",
      "AB+",
      "B-",
      "B+",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Purohit Charitable Trust Blood Bank",
    "lat": 29.923281,
    "lng": 73.874708,
    "address": "11-12 G Block, Gaushala road",
    "phone": "0154 2489635",
    "bloodGroups": [
      "O+",
      "B-",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Sadat Government Hospital Blood Bank",
    "lat": 26.176904,
    "lng": 75.785332,
    "address": "Sadat Government Hospital, Bahir Colony, Tonk",
    "phone": "01432 247416, 01432 244160",
    "bloodGroups": [
      "AB+",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Maharana Bhupal Government Hospital Blood Bank",
    "lat": 24.589107,
    "lng": 73.692338,
    "address": "Hospital Rd, City&#39;s Prime Health Care Area",
    "phone": "0294 252 8811 Ext: 241 ,  2942413305",
    "bloodGroups": [
      "B+",
      "AB+"
    ]
  },
  {
    "name": "GBH American Hospital Blood bank",
    "lat": 24.593634,
    "lng": 73.696364,
    "address": " 101, Kothi Bagh, Bhatt Ji Ki Bari, Meera Girls College Road",
    "phone": "0294 2426000, 0294 2428712",
    "bloodGroups": [
      "B+",
      "AB+",
      "O-",
      "A-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Geetanjali Medical College and Hospital Blood Bank",
    "lat": 24.553352,
    "lng": 73.731888,
    "address": "Hiranmagri Extension, Manwakhera NH-8 Bypass, Near Eklingpura Chouraha",
    "phone": "0294 2500000, 0294 2500008 ",
    "bloodGroups": [
      "A+",
      "O-",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Saral Blood Bank",
    "lat": 24.594033,
    "lng": 73.698544,
    "address": "Smt. Sarala Singhvi Charitable Society, \r\n30, Bhikharinath Ka Math, Bhupalpura",
    "phone": "0294 2416285 ",
    "bloodGroups": [
      "A+",
      "B+",
      "O+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Lokmitra Blood Bank and Thalassemia Research Centre",
    "lat": 24.581121,
    "lng": 73.712858,
    "address": "205, Bussiness Centre, Madhuvan",
    "phone": "0294 2413100",
    "bloodGroups": [
      "AB+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Pacific Medical College and Hospital Blood Bank",
    "lat": 24.668857,
    "lng": 73.70231,
    "address": "Bhilon ka Bedla, N.H. 27, Pratap Pura, Girwa",
    "phone": "0294 3920000, 0294-2980077",
    "bloodGroups": [
      "B-",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Central Blood Bank STNM Hospital",
    "lat": 27.331167,
    "lng": 88.614144,
    "address": "STNM Hospital Complex ,NH 31A , Gangtok,  East Sikkim\r\n",
    "phone": "03592 207691",
    "bloodGroups": [
      "A+",
      "O+",
      "B+",
      "AB+",
      "A-",
      "O-",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Central Referral Hospital Blood Bank",
    "lat": 27.316213,
    "lng": 88.597237,
    "address": "Manipal Central Referral Hospital , 5th Mile Tadong, \r\nGangtok.\r\nSikkim Manipal Instutute of Medical Sciences, National Highway 31A",
    "phone": "03592 231137 (EXTENSION 163)",
    "bloodGroups": [
      "O+",
      "A-",
      "O-",
      "A+",
      "AB+",
      "B+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Government General Hospital Blood Bank",
    "lat": 27.165618,
    "lng": 88.360388,
    "address": "Namchi District Hospital, Hospital Road, Namchi",
    "phone": "03595 264544",
    "bloodGroups": [
      "B+",
      "O-",
      "AB+",
      "A-",
      "A+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "CANCER INSTITUTE HOSPITAL BLOOD BANK",
    "lat": 13.005335,
    "lng": 80.239623,
    "address": "Cancer Institute (WIA) ,No.18 Sardar Patel road",
    "phone": "044 22209150,044 24910754,044 22350241",
    "bloodGroups": [
      "AB+",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Rajiv Gandhi Government General Hospital",
    "lat": 13.081279,
    "lng": 80.27678,
    "address": "General Hospital Road\r\nPark Town,\r\nChennai, Tamil Nadu ",
    "phone": "044 25305711,  044 2530 5000",
    "bloodGroups": [
      "O+",
      "B+",
      "A-",
      "AB-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "The Institute of Child Health and Hospital for Children",
    "lat": 13.072798,
    "lng": 80.258257,
    "address": "Halls Road, Egmore, Chennai",
    "phone": "044 28191132  044 2819 2138",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Government Kilpauk Medical College Hospital Blood Bank",
    "lat": 13.078315,
    "lng": 80.243824,
    "address": "Government Kilpauk Medical College and Hospital,                    822, Poonamallee High Rd, Kilpauk, Chennai  ",
    "phone": "044 28364955",
    "bloodGroups": [
      "O+",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Southern Railway Headquarters Hospital",
    "lat": 13.101967,
    "lng": 80.232996,
    "address": "Ayanavaram\r\nChennai, Tamil Nadu ",
    "phone": "044 2674 1624",
    "bloodGroups": [
      "O+",
      "O-",
      "A-",
      "A+"
    ]
  },
  {
    "name": "ESIC Hospital And Occupational Diseases Centre Blood Bank",
    "lat": 13.034844,
    "lng": 80.2083,
    "address": "Ashok Pillar Main Road, K.K. Nagar,Chennai",
    "phone": "044 24893714  ",
    "bloodGroups": [
      "A+",
      "O+",
      "B+",
      "A-",
      "AB-",
      "AB+",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Apollo Hospital Enterprises Limited Blood Bank",
    "lat": 13.063084,
    "lng": 80.251472,
    "address": "No:21, Greams Lane, Off Greams Road, Thousand Lights West, Thousand Lights, Chennai ",
    "phone": "044 28294870,  044 2829 0200",
    "bloodGroups": [
      "B-",
      "A+",
      "A-",
      "O+",
      "AB-",
      "AB+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Jeevan Blood Bank and Research Centre",
    "lat": 13.064595,
    "lng": 80.241688,
    "address": "22/11, Wheatcrofts Road, Nungambakkam\r\nChennai, Tamil Nadu 600034",
    "phone": "0435 20220    044 2826 3113",
    "bloodGroups": [
      "AB-",
      "B+",
      "A-",
      "O-",
      "AB+",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Apollo Speciality Hospital Blood Bank",
    "lat": 13.033595,
    "lng": 80.24507,
    "address": "4th Floor, Geo Tower, Old No.319, New No.465, Anna Salai, Nandanam, Chennai",
    "phone": "044 24347288, 044 24331741, 044 24336119",
    "bloodGroups": [
      "O-",
      "B+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Madras Medical Mission(Institute of Cardio Vascular Diseses)",
    "lat": 13.085812,
    "lng": 80.187029,
    "address": "No. 4 Dr.Jayalalitha Nagar, Mogapair",
    "phone": "044 26561801",
    "bloodGroups": [
      "AB-",
      "A+",
      "B+",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Kanchi Kamakoti Child Trust Hospital Blood Bank",
    "lat": 13.057336,
    "lng": 80.245785,
    "address": "12 A, Nageshwara Road, Nungambakkam, Chennai",
    "phone": "044 42001800, Extn 205",
    "bloodGroups": [
      "AB-",
      "A+",
      "AB+",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Vijaya Hospital Blood Bank",
    "lat": 13.049867,
    "lng": 80.208392,
    "address": "New No: 434 (OId No: 180), N.S.K Salai, Vadapalani",
    "phone": "044 24881392, 044 24842931, 044 24802221, 044 24802165,",
    "bloodGroups": [
      "AB+",
      "B+"
    ]
  },
  {
    "name": "MIOT Hospital Blood Bank",
    "lat": 13.021971,
    "lng": 80.186066,
    "address": "No. 4/112 Mount Poonamelle Road, Manapakkam, Chennai",
    "phone": "044 22492288, 044 42002288",
    "bloodGroups": [
      "O+",
      "A-"
    ]
  },
  {
    "name": "Hindu Mission Hospital Blood Bank",
    "lat": 12.923848,
    "lng": 80.113982,
    "address": "103, GST Road, Tambram, Patel Nagar, Tambaram,Chennai",
    "phone": "044 22262244, Extn 193  ",
    "bloodGroups": [
      "O-",
      "B+",
      "B-"
    ]
  },
  {
    "name": "International Centre for Cardio Thoracic and Vascular Diseases",
    "lat": 13.076019,
    "lng": 80.181451,
    "address": "R-30c, Ambattur Industrial Estate Road, Mogappair,Chennai",
   
 "phone": "044 42017575, 044 26564224  ",
    "bloodGroups": [
      "A+",
      "O-",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Dr.Kamatchi Memorial and Blood Component Research Centre ",
    "lat": 12.949232,
    "lng": 80.209635,
    "address": "Run by Kamatchi Memorial Trust, 1 Radial Road, Pallikaranai, Rose Avenue, Chennai",
    "phone": "044 66300300  ",
    "bloodGroups": [
      "O+",
      "B-",
      "O-",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Bharathiraja Speciality Hospital Blood Bank",
    "lat": 13.048082,
    "lng": 80.245055,
    "address": "20 Gopathi Narayanaswami Chetty Road, Thiyagaraya Nagar\r\nParthasarathy Puram, T.Nagar Chennai",
    "phone": "044 3011 3011",
    "bloodGroups": [
      "AB-",
      "AB+",
      "A+",
      "O+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Global Hospitals Blood Bank (A unit of Rabindranath GE Medical Association Pvt Ltd",
    "lat": 12.898506,
    "lng": 80.206289,
    "address": "439, Cheran Nagar, Perumbakkam\r\nCheran Nagar, Perumbakkam,\r\nChennai",
    "phone": "044 22777000",
    "bloodGroups": [
      "AB-",
      "B-",
      "AB+",
      "B+",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Sri Ramachandra Medical College and Research Institute Blood Bank",
    "lat": 13.038833,
    "lng": 80.143534,
    "address": "No.1, Ramachandra Nagar, Porur, Chennai",
    "phone": "044 24768027, 044 24768031, 044 24768033, 044 45928500",
    "bloodGroups": [
      "B-",
      "AB-",
      "A+",
      "O-",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Rotary Blood Bank",
    "lat": 12.98107,
    "lng": 80.195475,
    "address": "Medavakkam Main Rd, Vanuvampet, Madipakkam, Chennai",
    "phone": "044 43584482  044 2242 2639",
    "bloodGroups": [
      "AB+",
      "A-"
    ]
  },
  {
    "name": "St Thomas Blood Bank and Research Centre St Thomas Hospital",
    "lat": 13.012134,
    "lng": 80.19625,
    "address": "5/105, II floor Defence Colony Road, St. Thomas Mount",
    "phone": "044 22319393",
    "bloodGroups": [
      "O+",
      "AB-",
      "B+",
      "A-",
      "B-",
      "O-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Right Hospitals Blood Bank",
    "lat": 13.078914,
    "lng": 80.240581,
    "address": "No.1, Professor Subramaniam Street, Kilpauk",
    "phone": "044 26403939",
    "bloodGroups": [
      "O-",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Apollo Hospitals Blood Bank",
    "lat": 13.071266,
    "lng": 80.150603,
    "address": "Run by Apollo Hospitals Educational Trust, No. 64, Fourth Floor, Vanagaram to Ambattur Main Road, Ayanambakkam",
    "phone": "044 26533429",
    "bloodGroups": [
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Landsteiner Lakshmi Memorial Research Foundation",
    "lat": 13.079435,
    "lng": 80.257308,
    "address": "14/90, Ground Floor, First Floor and Second Floor, Ayyavoo Street, Aminijikarai",
    "phone": "044 42320000, 044 26644111",
    "bloodGroups": [
      "A-",
      "O+",
      "O-",
      "B+",
      "A+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Madras Egmore Lions Blood Bank and Research Foundation",
    "lat": 13.069705,
    "lng": 80.260797,
    "address": "Egmore Lions Blood Bank and Research Foundation, 130 Marshall Road, Egmore\r\nChennai",
    "phone": "044 28414949, 044 28414959, 044 28415959",
    "bloodGroups": [
      "B+",
      "A-",
      "O+",
      "AB-",
      "O-",
      "A+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Government Royapettah Hospital Blood Bank",
    "lat": 13.054709,
    "lng": 80.265073,
    "address": "No 1, Westcott Road, Royapettah, Chennai, Tamil Nadu ",
    "phone": "044 28482611,  044 28483053",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Government Peripheral Hospital Blood Bank",
    "lat": 13.095428,
    "lng": 80.219317,
    "address": "Government Peripheral Hospital \r\nM-2, Third Avenue,  Anna Nagar,  \r\n(Near K-4 Police Station)\r\nChennai",
    "phone": "044 26209490",
    "bloodGroups": [
      "AB+",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Government Kasthurbai Gandhi Hospital for Women & Children",
    "lat": 13.059296,
    "lng": 80.278431,
    "address": "Victoria Hostel Rd, Triplicane, Chennai, Tamil Nadu",
    "phone": "044 28545123, 044 28545001",
    "bloodGroups": [
      "B+",
      "A-",
      "AB+",
      "B-",
      "AB-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Institute of Obstetrics and Gynaecology Government Hospital for Women and Children",
    "lat": 13.073689,
    "lng": 80.259207,
    "address": "Police Commisioners Rd, Egmore, Chennai, Tamil Nadu",
    "phone": "044 28194896",
    "bloodGroups": [
      "AB+",
      "A-",
      "AB-",
      "A+",
      "O-",
      "B-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Government RSRM Hospital",
    "lat": 13.108993,
    "lng": 80.288403,
    "address": "Cemetery Road, Royapuram, Chennai, Tamil Nadu ",
    "phone": "044 25901665  ",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Chennai Port Trust Hospital Blood Bank",
    "lat": 13.085925,
    "lng": 80.291757,
    "address": "No.10 Spring Heaven Road, George Town, Chennai, Tamil Nadu",
    "phone": "044 25362201",
    "bloodGroups": [
      "B-",
      "AB-",
      "A-",
      "O-",
      "A+",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "ESI Hospital Blood Bank",
    "lat": 13.094828,
    "lng": 80.240417,
    "address": "The Blood Bank Medical Officer, ESI Hospital, Ayanavaram, \r\nChennai",
    "phone": "044 26449284",
    "bloodGroups": [
      "AB-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Rotary Central TTK Voluntary Health Services (Dr Raganathan Memorial Blood Bank)",
    "lat": 13.002059,
    "lng": 80.24716,
    "address": "Tharamani, Adyar, Chennai, Tamil Nadu",
    "phone": "044 22541692,  044 22542829",
    "bloodGroups": [
      "B-",
      "A-",
      "B+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": " AA Lab Blood Bank",
    "lat": 13.054067,
    "lng": 80.239828,
    "address": "Old No 12 New No 23, 5th Cross Street, Nungambakkam\r\nNungambakkam\r\nChennai, Tamil Nadu",
    "phone": "044 28170930  ",
    "bloodGroups": [
      "A+",
      "B+",
      "A-",
      "AB-",
      "O+",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Sree Venkateswara Blood Bank",
    "lat": 13.109828,
    "lng": 80.281945,
    "address": "158, Mannarswamy Kovil Street\r\nRoyapuram\r\nChennai, Tamil Nadu",
    "phone": "044 25960226  ",
    "bloodGroups": [
      "O+",
      "B+",
      "A-",
      "B-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "CSI Rainy Multi Speciality Hospital",
    "lat": 13.11812,
    "lng": 80.290511,
    "address": "45, GA Road, Old Washermanpet, Chennai, Tamil Nadu ",
    "phone": "044 40505050",
    "bloodGroups": [
      "A+",
      "O-",
      "AB-",
      "AB+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Dhanvandri Blood Bank and Research Centre of Sreemahalakshmi Charitable Health Trust",
    "lat": 13.031013,
    "lng": 80.231629,
    "address": "F-1, 52A, T.Nagar, S W Boag Rd,CIT Nagar, Chennai, Tamil Nadu",
    "phone": "044 24310660, 044 24310610",
    "bloodGroups": [
      "A+",
      "AB-",
      "B-",
      "AB+",
      "B+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "ACS General Hospital ",
    "lat": 13.06852,
    "lng": 80.131421,
    "address": "Run by Dr MGR Educational Reaserch Institute, Poonamalle High Road, Chennai- Bangalore Highway NH4, Velappanchava\r\nChennai, Tamil Nadu ",
    "phone": "044 23782176, 044 23782186, 044 26802133",
    "bloodGroups": [
      "A+",
      "B+"
    ]
  },
  {
    "name": "Muthukumaran Medical College Hospital and Research Institute",
    "lat": 13.017931,
    "lng": 80.108969,
    "address": "Chikkarayapuram, Chennai, Tamil Nadu",
    "phone": "044 66344000, 044 24784000",
    "bloodGroups": [
      "A+",
      "O+",
      "B+",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Tagore Medical College Hospital Blood Bank",
    "lat": 12.860204,
    "lng": 80.291655,
    "address": "Vandalur - Kelambakkam Road, Melakkottaiyur Post, Near Vandalur, Rathinamangalam, Chennai, Tamil Nadu",
    "phone": " 044 30101111",
    "bloodGroups": [
      "AB-",
      "AB+",
      "B-",
      "A-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Fortis Malar Hospitals Limited Blood Bank",
    "lat": 13.01006,
    "lng": 80.258702,
    "address": "52, First Main Road, Gandhi Nagar, Adyar",
    "phone": "044 42892222",
    "bloodGroups": [
      "O-",
      "A+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Madha Medical College and Hospital Blood Bank",
    "lat": 13.004678,
    "lng": 80.112061,
    "address": "State Highway 113,Thandalam,Kovur, Harijana Colony\r\nChennai, Tamil Nadu",
    "phone": "044 24780333  ",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Billroth Hospitals Limited Blood Bank",
    "lat": 13.075671,
    "lng": 80.227297,
    "address": "No.56 & 57, New Door No,5& AMP:7 Gajapathy Street, Shenoy Nagar, Chennai",
    "phone": "044 42921767",
    "bloodGroups": [
      "B-",
      "A-"
    ]
  },
  {
    "name": "Government Stanley Hospital Blood Bank",
    "lat": 13.105854,
    "lng": 80.285439,
    "address": "305 OSH Rd, Royapuram, Chennai, Tamil Nadu",
    "phone": "044 25284941",
    "bloodGroups": [
      "O+",
      "A-",
      "O-",
      "AB+",
      "B-",
      "AB-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Sree Balaji General Hospital Blood Bank",
    "lat": 12.954308,
    "lng": 80.137703,
    "address": "7, Works Road, Chrompet,Chennai",
    "phone": "044 22415600  044 2241 5603",
    "bloodGroups": [
      "AB-",
      "B+"
    ]
  },
  {
    "name": "The Tamil Nadu Dr. MGR Medical University Blood Bank",
    "lat": 13.009896,
    "lng": 80.218188,
    "address": "69, Anna Salai, Guindy,Chennai",
    "phone": "0442 22353546  044 2235 3547",
    "bloodGroups": [
      "AB-",
      "O-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "ESI Hospital Blood Bank",
    "lat": 11.009114,
    "lng": 77.023704,
    "address": "ESI Hospital, Kamarajar Road, Uppilipalayam, Varadharajapuram(P.O)",
    "phone": " 0422 2300871",
    "bloodGroups": [
      "A+",
      "B-"
    ]
  },
  {
    "name": "Coimbatore Medical College Hospital Blood Bank",
    "lat": 10.994861,
    "lng": 76.969577,
    "address": "Trichy Road, Kallimadu, Coimbatore",
    "phone": "0422 2301393, 0422 230 0871",
    "bloodGroups": [
      "O+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "KG Hospital Blood Bank",
    "lat": 11.000435,
    "lng": 76.971556,
    "address": "5, Government Arts College Road, Coimbatore",
    "phone": "0422 2212121, 0422 2212129",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "PSG Hospital Blood Bank",
    "lat": 11.018766,
    "lng": 77.007145,
    "address": "Avinashi Road, Kalluri Nagar, Peelamedu, PSG Medical College And Hospital Campus, Coimbatore",
    "phone": "0422 2570170",
    "bloodGroups": [
      "O+",
      "A+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "G. Kuppusamy Naidu Memorial Hospital Blood Bank",
    "lat": 11.01277,
    "lng": 76.980509,
    "address": "P.B. No. 6327, Nethaji Road, Pappanaickenpalayam,\r\nCoimbatore",
    "phone": "0422 4305336, 0422 224 5000",
    "bloodGroups": [
      "B+",
      "O+",
      "O-",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Ramakrishna Hospital Blood Bank",
    "lat": 11.023686,
    "lng": 76.976713,
    "address": " No. 395 Sarojini Naidu Road , New Siddhapudur, Coimbatore ",
    "phone": "0422 450 0000",
    "bloodGroups": [
      "A-",
      "AB+",
      "AB-",
      "O-",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Ramana Gounder Medical Trust Hospital Blood Bank",
    "lat": 11.07054,
    "lng": 76.942457,
    "address": "Mettupalayam Road, S. F. No. 47 and 48 Thudaiyalur ",
    "phone": "0422 2642488, 0422 2642435",
    "bloodGroups": [
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Ganga Hospital Blood Bank",
    "lat": 11.025162,
    "lng": 76.952501,
    "address": "No. 313, Mettupalayam Road, Saibaba Koil, Coimbatore ",
    "phone": "0422 4250000  0422 248 5000",
    "bloodGroups": [
      "O-",
      "A+",
      "A-",
      "B+",
      "AB-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Kongu Nadu Hospital Private Limited Blood Bank",
    "lat": 11.018134,
    "lng": 76.960595,
    "address": "336 to 353 Dr. Rajendra Prasad Road, (100 feet Road) 11th St, Tatabad, Coimbatore",
    "phone": "0422 4316000, 0422 2494303",
    "bloodGroups": [
      "A+",
      "O-",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Lions Club of Coimbatore Legend Blood Bank Research Centre",
    "lat": 11.005808,
    "lng": 76.951074,
    "address": "Red Rase Tower No.422 DB Road, R.S. Puram",
    "phone": "04222477373, 04222470046",
    "bloodGroups": [
      "B-",
      "A-"
    ]
  },
  {
    "name": "Shanthi Social Services Medical Centre Blood Bank",
    "lat": 11.003734,
    "lng": 77.038048,
    "address": "Neelikonampalayam, Coimbatore ",
    "phone": "0422 2576122",
    "bloodGroups": [
      "A-",
      "O-"
    ]
  },
  {
    "name": " Kuriji Hospital Blood Bank (A Unit of Vangal Amman Health Service Limited)",
    "lat": 11.019604,
    "lng": 76.994964,
    "address": "522/3, Udayampalayam Road, Sowripalayam Post",
    "phone": "0422 2562744",
    "bloodGroups": [
      "AB-",
      "B+",
      "O+",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Sree Abirami Hospital Private Limited Blood Bank",
    "lat": 10.952537,
    "lng": 76.973216,
    "address": "No. 33, Madukkarai Road, Sundarapuram, Coimbatore",
    "phone": "0422 246 6666",
    "bloodGroups": [
      "A+",
      "B+",
      "B-",
      "A-",
      "AB+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 11.304849,
    "lng": 76.937118,
    "address": " Ooty main road, Mettupalayam, Coimbatore",
    "phone": "04254 272275",
    "bloodGroups": [
      "A+",
      "B-",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Sheela Hospitals Blood Bank",
    "lat": 11.018303,
    "lng": 76.960319,
    "address": "No. 117, East Power House road, Tatabad,Coimbatore",
    "phone": "0422 4334500",
    "bloodGroups": [
      "B+",
      "A+",
      "O+",
      "AB-",
      "O-",
      "B-",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Kovai Medical Centre and Hospital Blood Bank",
    "lat": 11.042085,
    "lng": 77.040324,
    "address": "3209 Avinashi Road, Sitra, Coimbatore",
    "phone": "0422 4323800",
    "bloodGroups": [
      "B+",
      "AB+",
      "A-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "IMA Rotary Midtown Mahaveer Blood Bank",
    "lat": 11.005732,
    "lng": 76.960893,
    "address": " 92, Syrian Church Road, RS Puram, Coimbatore  ",
    "phone": "0422 6513322, 0422 6563322, 0422 247 1824",
    "bloodGroups": [
      "AB-",
      "A-",
      "A+",
      "O+",
      "O-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "The Coimbatore Bio Medical Services Blood Bank",
    "lat": 11.014581,
    "lng": 76.953349,
    "address": "No.190A, Bashyakarlu Road East, R.S. Puram",
    "phone": "0422 2552297",
    "bloodGroups": [
      "A+",
      "B-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Karpagam Hospital Blood Bank",
    "lat": 10.885007,
    "lng": 77.008223,
    "address": "Pollachi Main Road, Othakkalmandapam, Coimbatore",
    "phone": "0422 6554443",
    "bloodGroups": [
      "O-",
      "O+",
      "B+",
      "B-",
      "A+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Swaasam Blood Bank (Run by Any time Blood Voluntary Association)",
    "lat": 11.024262,
    "lng": 76.984656,
    "address": "Shop No. 9/3, Sakthi estate, M. G Road, Avarampalayam, \r\nCoimbatore",
    "phone": "099425 44454, 09942344454",
    "bloodGroups": [
      "AB+",
      "B-",
      "O-",
      "AB-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "RVS Hospital Blood Bank",
    "lat": 11.028425,
    "lng": 77.134135,
    "address": "242-B, Trichy Rd,Mathiyalagan Nagar,Sulur,  ",
    "phone": "0422 2682942, 0422 2682943",
    "bloodGroups": [
      "AB-",
      "AB+",
      "A-",
      "O-",
      "A+",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 10.658046,
    "lng": 77.009584,
    "address": "Government Hospital, NH209,Mahalingapuram,Udumalpet Road,Pollachi",
    "phone": "04259 229322",
    "bloodGroups": [
      "A+",
      "O-"
    ]
  },
  {
    "name": "Pollachi Blood Bank Services",
    "lat": 10.665479,
    "lng": 77.007079,
    "address": "No : 6, Kanitha methai Ramaujam Street, Venkatesa Colony, Pollachi",
    "phone": "04259 223414",
    "bloodGroups": [
      "AB+",
      "B-",
      "AB-",
      "B+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Rajah Muthiah Medical College and Hospital Blood Bank",
    "lat": 11.398477,
    "lng": 79.718821,
    "address": "Annamalai Nagar, Chidambaram",
    "phone": "04144 238147, Extn 28",
    "bloodGroups": [
      "AB-",
      "A-",
      "A+",
      "B-",
      "O+",
      "B+",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Kamaraj Government Hospital Blood Bank",
    "lat": 11.394771,
    "lng": 79.699614,
    "address": "S.P.Kovil Street, Chidamabaram bus stand, Chidambaram",
    "phone": "04144 223099",
    "bloodGroups": [
      "AB-",
      "B+",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 11.515577,
    "lng": 79.316767,
    "address": "Government  Hospital, Viruduchalam (T.K)",
    "phone": "04143 231766",
    "bloodGroups": [
      "AB+",
      "A+",
      "A-",
      "O-",
      "B-",
      "AB-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 11.756684,
    "lng": 79.759266,
    "address": "Nellikuppam road, Cuddalore",
    "phone": "04142 292052",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Neyveli Lignite Corporation",
    "lat": 11.537043,
    "lng": 79.467181,
    "address": "NH532, M.K Colony, Neyveli, Tamil Nadu",
    "phone": "04142 2522784, 04142 28364613",
    "bloodGroups": [
      "O-",
      "A+"
    ]
  },
  {
    "name": "Dharmapuri Medical College Hospital Blood Bank",
    "lat": 12.122192,
    "lng": 78.156738,
    "address": "3/29A, Nethaji Bye Pass Road, Kamalakhsmi Colony,\r\nDharmapuri",
    "phone": "04342 231748",
    "bloodGroups": [
      "A-",
      "B-",
      "B+",
      "O-",
      "AB-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Ashok Blood Bank and Clinical Laboratory",
    "lat": 12.132581,
    "lng": 78.161182,
    "address": "No. 63A, Sengodipuram Road IInd Floor, Dharmapuri",
    "phone": "0434 2260627",
    "bloodGroups": [
      "A+",
      "O+"
    ]
  },
  {
    "name": "Om Sakthi Blood Bank",
    "lat": 12.132676,
    "lng": 78.161652,
    "address": "No 4 Sengodipuram, Dharmapuri",
    "phone": "04342 260388, 04342 261388",
    "bloodGroups": [
      "A-",
      "A+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Christian Community Health Center and Hospital Blood Bank",
    "lat": 10.545977,
    "lng": 77.725236,
    "address": "Shanthipuram, Ambilikkai, Tamil Nadu ",
    "phone": "04553 249050",
    "bloodGroups": [
      "A+",
      "AB-",
      "O+",
      "A-",
      "B-",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "St.Joseph Hospital Blood Bank",
    "lat": 10.370257,
    "lng": 77.980644,
    "address": "Chennai Theni Highway, Nehruji Nagar",
    "phone": "04512 421130, 04512 426091, 04512 430399",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Dindigul Blood Bank",
    "lat": 10.366656,
    "lng": 77.977708,
    "address": "No. 28/2, Veppan thoppu street, Palani Road, Dindigul",
    "phone": "0451 2427143   ext. 2429812",
    "bloodGroups": [
      "A-",
      "B-",
      "AB+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Government Head quarters Hospital Blood Bank",
    "lat": 10.363893,
    "lng": 77.976364,
    "address": "Trichy Road,New bus stand, Opp to North police station\r\n",
    "phone": "04511 2424600",
    "bloodGroups": [
      "O-",
      "A-",
      "B+",
      "A+",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Leonard Hospital Blood Bank",
    "lat": 10.165505,
    "lng": 77.760672,
    "address": "SH 155, Arunachalapuram, Batlagundu",
    "phone": "04543 262670",
    "bloodGroups": [
      "A-",
      "B-",
      "AB+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Christian Fellowship Hospital Blood Bank",
    "lat": 10.48803,
    "lng": 77.751707,
    "address": "Dindigul Main Road, Oddanchathram",
    "phone": "04553 241226,04553 241379",
    "bloodGroups": [
      "A-",
      "O-",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 10.448498,
    "lng": 77.516908,
    "address": "Dindigul Road, South Anna Nagar, Palani",
    "phone": "04542 248553",
    "bloodGroups": [
      "B-",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Erode Blood Bank and Clinical Laboratory",
    "lat": 11.336191,
    "lng": 77.718506,
    "address": "No. 43, Patel Road, 1st Floor,Erode",
    "phone": "04242 253163",
    "bloodGroups": [
      "B-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Kongu Blood Bank",
    "lat": 11.340634,
    "lng": 77.715943,
    "address": "TS No. 51/1E Ist floor, Perundurai Road",
    "phone": "0424 2263537, 0424 2263536",
    "bloodGroups": [
      "O+",
      "AB-",
      "A-",
      "A+",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Lotus Blood Bank",
    "lat": 11.326009,
    "lng": 77.730096,
    "address": "(Lotus Apollo Hospital) Poonthurai Main Road",
    "phone": "04242 282828",
    "bloodGroups": [
      "A-",
      "A+",
      "AB+",
      "B-",
      "B+"
    ]
  },
  {
    "name": "IRT Perunthurai Medical College Hospital Blood Bank",
    "lat": 11.280826,
    "lng": 77.567496,
    "address": "Perundurai, Erode ",
    "phone": "04294 220910  ",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 11.456457,
    "lng": 77.428786,
    "address": "Government Hospital, Gobichettipalayam",
    "phone": "04285 227153",
    "bloodGroups": [
      "O+",
      "A-",
      "O-",
      "AB-",
      "AB+",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Sri Ram Blood Bank",
    "lat": 11.455893,
    "lng": 77.42957,
    "address": "4/28, Govt Hospital Road, Gobichettipalayam, ",
    "phone": "04285 222596, 04285 222 224",
    "bloodGroups": [
      "A+",
      "O-",
      "B-",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Chengalpattu Medical College Hospital Blood Bank",
    "lat": 12.677617,
    "lng": 79.98029,
    "address": "Anna Nagar, Chengalpattu",
    "phone": "044 27431909, 044 2743 1221",
    "bloodGroups": [
      "AB-",
      "A+",
      "B-",
      "O-",
      "A-",
      "O+",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Shri Sathya Sai Medical College and Research Institute Blood Bank",
    "lat": 12.746312,
    "lng": 80.132393,
    "address": "Tiruporur - Guduvancherry Main Road, Ammapettai, Chengalpat",
    "phone": "044 27440700044 27440346   044 2744 0347",
    "bloodGroups": [
      "B-",
      "AB+",
      "O+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Military Hospital Blood Bank, St. Thomas Mount",
    "lat": 13.024872,
    "lng": 80.199193,
    "address": "Defence Colony 1st Ave,Ekkatuthangal, Chennai",
    "phone": "044 25316500",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Meenakshi Medical College Hospital and Research Institute Blood Bank",
    "lat": 12.872611,
    "lng": 79.723864,
    "address": "Enathur, Karrapettai Post, Kanchipuram",
    "phone": "044 27264096, 044 27261339",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Government Aringnar Anna Memorial Cancer Hospital Blood Bank",
    "lat": 12.86981,
    "lng": 79.715799,
    "address": " Bangalore High Road, Karaipettai",
    "phone": "044 27264244, 044 27264246",
    "bloodGroups": [
      "AB+",
      "O+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 12.832978,
    "lng": 79.710277,
    "address": "Hospital Road, Kanchipuram",
    "phone": "044 27222307, 044 272223308",
    "bloodGroups": [
      "A+",
      "O+"
    ]
  },
  {
    "name": "Annai Medical College and Hospital Blood Bank (Run by Sri Devi Karumari Amman Educational Trust)",
    "lat": 12.97068,
    "lng": 79.976376,
    "address": "1st Floor Casuality Block, Dr. G. Jayarama Nagar, Pennatur, Sri Perumbudur Taluk",
    "phone": "044 27162100",
    "bloodGroups": [
      "AB-",
      "AB+",
      "O+",
      "O-",
      "A+",
      "B-",
      "A-",
      "B+"
    ]
  },
  {
    "name": "SRM Medical College Hospital Blood Bank",
    "lat": 12.822849,
    "lng": 80.048734,
    "address": "SRM Nagar, Potheri, Kattankulathur, Kancheepuram",
    "phone": "044 27455707, 044 2745 5510",
    "bloodGroups": [
      "A+",
      "B+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Chettinad Hospital and Research Institute Blood Bank",
    "lat": 12.794973,
    "lng": 80.216129,
    "address": "SH 121, Rajiv Gandhi Salai, Kelambakkam ",
    "phone": "044 4741000",
    "bloodGroups": [
      "A-",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Madurantakam Government Hospital Blood Bank",
    "lat": 12.50908,
    "lng": 79.890064,
    "address": "Hospital Road, Madurantakam",
    "phone": "044 27555216",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Karpaga Vinayaga Institute of Medical Sciences Blood Bank",
    "lat": 12.592392,
    "lng": 79.911956,
    "address": "GST Road, Chinna Kolambakkam, Palayanoor P.O.\r\nMadurantagam Taluk.\r\n",
    "phone": "044 27566050  044 2759 8484",
    "bloodGroups": [
      "O+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Government Hospital Tambaram Blood Bank",
    "lat": 12.9456,
    "lng": 80.134345,
    "address": "Government Hospital Tambaram, GST Road, Chrompet",
    "phone": "044  22382400",
    "bloodGroups": [
      "AB+",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Deen Dayal Hospital Blood Bank",
    "lat": 13.177496,
    "lng": 79.810762,
    "address": "No. 61, Deen Dayal Nagar, Kunnavalam Post, Tirupati Road,Thiruvallur Taluk,Tamil Nadu ",
    "phone": "044 27677700",
    "bloodGroups": [
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Sree Mookambika Institute Medical Science Blood Bank",
    "lat": 8.361102,
    "lng": 77.292365,
    "address": "14-9C 15, Ist Floor, Medical College Hospital Building, Padanilam, Kulasekaram",
    "phone": "04651 2788250",
    "bloodGroups": [
      "O+",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 8.247696,
    "lng": 77.313237,
    "address": "Padmanabhapuram, Thuckalay, Kanyakumari",
    "phone": "04651 256023",
    "bloodGroups": [
      "A-",
      "A+",
      "O-",
      "O+",
      "B+",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Catherine Booth Hospital Blood Bank (Run By The Salvation Army)",
    "lat": 8.200027,
    "lng": 77.43068,
    "address": "M/s.  The Salvation Army Catherine Booth Hospital,\r\nArunachalam Colony, Nagercoil",
    "phone": "04652 275516, 04652 275517",
    "bloodGroups": [
      "A-",
      "O-",
      "O+",
      "AB+",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Kanyakumari Medical College Hospital Blood Bank",
    "lat": 8.172512,
    "lng": 77.392704,
    "address": "KGMCH,  Asaripallam",
    "phone": "04652 236949",
    "bloodGroups": [
      "AB-",
      "A-",
      "B+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Kanya Blood Bank",
    "lat": 8.17554,
    "lng": 77.429731,
    "address": "No.173 A/1, K.P. Road, Ramavarmapuram, Nagercoil",
    "phone": "04652 279850, 04652 273951",
    "bloodGroups": [
      "A+",
      "B+",
      "O+",
      "B-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Vivek Blood Bank",
    "lat": 8.184559,
    "lng": 77.410413,
    "address": " 253, K-11,  K.P. Road, Nagercoil",
    "phone": "04652 230108, 04652 234408",
    "bloodGroups": [
      "O-",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Dr. Jeyasekharan Medical Trust and Nursing Home Blood Bank",
    "lat": 8.184416,
    "lng": 77.409869,
    "address": "No. 253, KP Road, Nagercoil, Kanyakumari, ",
    "phone": "04652 230019,0465 230020,04652 230021  ",
    "bloodGroups": [
      "B-",
      "B+",
      "A-",
      "O-",
      "AB-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Thangam Blood Bank (Run by Thangam Chartiable Community Health Trust) William Hospital",
    "lat": 8.191431,
    "lng": 77.423288,
    "address": "No 252, II floor, william hospital complex, Krishnan Koil, Nagerkoil",
    "phone": "04652 277955",
    "bloodGroups": [
      "A-",
      "O-",
      "A+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Bensam Hospital Blood Bank",
    "lat": 8.189676,
    "lng": 77.412207,
    "address": "Kalliancaud, NH 66, Nagercoil",
    "phone": "04652 232532, 04652 232533, 04652 232534, 04652 232535",
    "bloodGroups": [
      "A-",
      "B-",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Kanyakumari Medical Mission CSI Hospital Blood Bank",
    "lat": 8.211518,
    "lng": 77.302952,
    "address": "CSI Hospital, SH 180,Neyyoor",
    "phone": "04651 222222",
    "bloodGroups": [
      "O+",
      "O-"
    ]
  },
  {
    "name": "Karur Blood Bank",
    "lat": 10.963696,
    "lng": 78.069084,
    "address": "No. 196/29, Kamarajapuram",
    "phone": "0432 4236177, 0432 4236188",
    "bloodGroups": [
      "B-",
      "O-"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 10.962277,
    "lng": 78.080228,
    "address": "Government Headquarters Hospital, Karur",
    "phone": "0432 4260197",
    "bloodGroups": [
      "O-",
      "O+",
      "B-",
      "AB-",
      "AB+",
      "A+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "M/S TCR Blood Bank ( Run by TCR hospital & Charitable Trust)",
    "lat": 12.5186,
    "lng": 78.2137,
    "address": "TCR Multi Speciality Hospital, No.1/450, Avvai Nagar,Near LIC, Krishnagiri.",
    "phone": "04343 239393",
    "bloodGroups": [
      "B-",
      "O+",
      "AB+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 12.72911,
    "lng": 77.825456,
    "address": "SH 17, Denkanikotta Road, Hosur, \r\n",
    "phone": "04344 222635",
    "bloodGroups": [
      "A-",
      "AB+",
      "O+",
      "B-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Arogya Blood Bank (A Unit of Arogya Seva Hospitals Private Limited)",
    "lat": 12.728397,
    "lng": 77.824389,
    "address": "35 Opposite CSI church , Denkanikottai road,\r\nNew Temple Land Hudco, Shanthi Nagar East, Hosur",
    "phone": "04344 225555 ",
    "bloodGroups": [
      "B+",
      "O-",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 12.524837,
    "lng": 78.220022,
    "address": "Gandhi Road, Old pet, Krishnagiri",
    "phone": "04343 238880",
    "bloodGroups": [
      "O+",
      "O-",
      "AB+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Government Rajaji Hospital Blood Bank",
    "lat": 9.926986,
    "lng": 78.131758,
    "address": "Government Rajaji Hospital, Madurai",
    "phone": "0452 2520950",
    "bloodGroups": [
      "A-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Meenakshi Mission Hospital and Research Centre Blood Bank",
    "lat": 9.947597,
    "lng": 78.162318,
    "address": "Lake Area, Melur Road, Madurai, Tamil Nadu ",
    "phone": "0452 2588741  ",
    "bloodGroups": [
      "B-",
      "AB+",
      "A-",
      "AB-",
      "A+",
      "O+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "The Apollo Speciality Hospital Blood Bank",
    "lat": 9.927966,
    "lng": 78.148775,
    "address": "No.14 Deputy Collectors Colony, Lake View Road, K.K. Nagar, Madurai",
    "phone": "0452 2581147",
    "bloodGroups": [
      "B-",
      "A+",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Vadamalayan Hospital Blood Bank",
    "lat": 9.942846,
    "lng": 78.130616,
    "address": "Vadamalayan Hospital, No.9B, PT Rajan Road, Chokkikulam, Reserve Police Line",
    "phone": "0452 2545400",
    "bloodGroups": [
      "B+",
      "AB-",
      "AB+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Sivan Blood Bank Run by Lakshmiammal Memorial Trust",
    "lat": 9.923292,
    "lng": 78.140268,
    "address": "Plot No.10, D.No. 58A Kuruvikaran Salai, 1st Cross Street, Aringnar Anna Nagar",
    "phone": "0452 2536562",
    "bloodGroups": [
      "O-",
      "A+",
      "AB-",
      "B-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Velammal Medical College Hospital and Reserach Institute Blood Bank",
    "lat": 9.887094,
    "lng": 78.150868,
    "address": "Velammal Village, Madurai-Tuticorin Ring Road, Anuppanadi\r\nMadurai",
    "phone": "0452 25110033  ",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Annai Abirami Blood Bank",
    "lat": 9.915247,
    "lng": 78.119525,
    "address": "171/1, Opposite S K G & CO, South Masi Street, Kondaiyanaidu Ln, Periyar, Madurai Main",
    "phone": "0452 2339750",
    "bloodGroups": [
      "O-",
      "O+",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Christian Mission Hospital Blood Bank",
    "lat": 9.915951,
    "lng": 78.125557,
    "address": "E Veli St. Old Kuyavar Palayam Salai, Madurai Main, Madurai",
    "phone": "0452 2326458, 0452 2326294",
    "bloodGroups": [
      "B-",
      "AB-",
      "A+",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 9.962367,
    "lng": 77.788596,
    "address": "Government  Head quarters Hospital, Usilampatti, Madurai ",
    "phone": "04552 252185",
    "bloodGroups": [
      "A+",
      "O+",
      "B+",
      "A-",
      "B-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 11.10168,
    "lng": 79.647377,
    "address": "GovernmentHospital, MainRoad, Mayiladuthurai",
    "phone": "04364 223451",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 10.77284,
    "lng": 79.843885,
    "address": "Government Head Quarters Hospital, Nagapattinam",
    "phone": "04365 248600",
    "bloodGroups": [
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Shharc Charity Blood Bank",
    "lat": 11.215701,
    "lng": 78.168668,
    "address": "39A, Dr. Shankaram Road, Gandhi Nagar (Near BSNL Office), Namakkal",
    "phone": "0428 6234552",
    "bloodGroups": [
      "B-",
      "AB+",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 11.216752,
    "lng": 78.168939,
    "address": "Government Head Quarters Hospital, Namakkal",
    "phone": "04286 221411",
    "bloodGroups": [
      "AB+",
      "O+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 11.461112,
    "lng": 78.185127,
    "address": "Government  Hospital, Rasipuram",
    "phone": "04287 222878",
    "bloodGroups": [
      "O+",
      "AB-",
      "B-",
      "A+",
      "B+",
      "A-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 11.23657,
    "lng": 78.860775,
    "address": "Government  Head Quarters Hospital,Thuraiyur Main Road, Perambalur",
    "phone": "04328 277128",
    "bloodGroups": [
      "AB-",
      "O+",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Muthu Medical Center Blood Bank (Muthu Charitable Trust)",
    "lat": 11.238114,
    "lng": 78.864898,
    "address": "No.153 Mettu Street  Opposite to Vegetable Market Perambalur, Tamil Nadu",
    "phone": "0432 8277477",
    "bloodGroups": [
      "B-",
      "A+",
      "AB-",
      "A-",
      "O+",
      "O-",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Dhanalakshmi Srinivasan Medical College and Hospital Blood Bank",
    "lat": 11.198683,
    "lng": 78.872944,
    "address": "1st floor Diagnostic Block, Trichy \u2013 Chennai Highways (NH 45) Siruvachur, Perambaulur",
    "phone": "04328 327999",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 10.378804,
    "lng": 78.818264,
    "address": "Government Head Quarters Hospital, Santhanathapuram\r\nPudukkottai",
    "phone": "04332 228111",
    "bloodGroups": [
      "O-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 10.180049,
    "lng": 79.000136,
    "address": "The Medical Officer,  Taluk Government  Hospital, Aranthangi",
    "phone": "04371 270544 ",
    "bloodGroups": [
      "O+",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Government Headquarters Hospital Blood Bank",
    "lat": 9.363747,
    "lng": 78.831928,
    "address": "Government Headquarters Hospital, Ramanathapuram",
    "phone": "04567 228178",
    "bloodGroups": [
      "A+",
      "AB+",
      "O+",
      "O-",
      "A-",
      "B-",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 11.59695,
    "lng": 78.60139,
    "address": "Cuddalore Main Road, Attur, Salem District\r\n",
    "phone": "04282 243771",
    "bloodGroups": [
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 11.795825,
    "lng": 77.798916,
    "address": "Government Head Quarters Hospital, Mettur Dam",
    "phone": "04298 245400",
    "bloodGroups": [
      "A+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Government Mohan Kumaramangalam Medical College Hospital Blood Bank",
    "lat": 11.656585,
    "lng": 78.153948,
    "address": "Super Specialty Block, Steel Plant Main Road, Salem",
    "phone": "04272 210964,0427 238 3313",
    "bloodGroups": [
      "B-",
      "O-",
      "A+",
      "A-",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Sri Gokulam Hospital Blood Bank",
    "lat": 11.672702,
    "lng": 78.133827,
    "address": "No. 3/60, Mayanur Road, Salem",
    "phone": "0427 2448171, 0427 2448176",
    "bloodGroups": [
      "AB+",
      "O-",
      "AB-",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Sithi Vinayagar Blood Bank",
    "lat": 11.671281,
    "lng": 78.151721,
    "address": "No, 1C Vidhyalaya Road, Salem",
    "phone": "0427 2312577, 0427 2316440  ",
    "bloodGroups": [
      "B-",
      "AB-",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Vinayaga Mission Kirubananda Variar Medical College Hospital Blood Bank",
    "lat": 11.585415,
    "lng": 78.06378,
    "address": "Sankari Main Road, Chinna Seeragapadi, Salem",
    "phone": "0427 3982000",
    "bloodGroups": [
      "B+",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "KSM Blood Bank (Run by Maruti Charitable Trust)",
    "lat": 11.666537,
    "lng": 78.143476,
    "address": "245/10 , 5th Cross street, Brindavan Road, Fairlands, Salem \r\n",
    "phone": "0427 2446788,  0427 2445453 ",
    "bloodGroups": [
      "O-",
      "AB+",
      "O+",
      "AB-",
      "B+",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Salem Blood Bank",
    "lat": 11.659085,
    "lng": 78.168204,
    "address": "Run by SHHARC Charity Trust, 2A 3rd Agraharam,  (Opposite to Kasiwiswanathar Temple), Salem\r\n",
    "phone": "04272 265432",
    "bloodGroups": [
      "B-",
      "B+",
      "A+",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Kurinji Hospital Blood Bank",
    "lat": 11.677233,
    "lng": 78.135322,
    "address": "Tee Jay salai, Five Roads, Salem\r\n",
    "phone": "0427 2433321, 0427 2433300, 0427 2433301, 0427 2433302",
    "bloodGroups": [
      "A+",
      "B+"
    ]
  },
  {
    "name": "Maruti Blood Bank",
    "lat": 11.672426,
    "lng": 78.136187,
    "address": "Door No. 5, 5/1, Srinivasa Complex, (First Floor) Ram Nagar, Meyyanur, Salem",
    "phone": "0427 2444962, 0427 4040110",
    "bloodGroups": [
      "A-",
      "O+",
      "AB-",
      "B+",
      "AB+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Salem Steel Authority of India Salem Steel Plant",
    "lat": 11.654349,
    "lng": 78.025247,
    "address": "Mohan Nagar, Salem",
    "phone": "0427 2388263",
    "bloodGroups": [
      "A-",
      "O-",
      "B-",
      "B+",
      "AB+",
      "O+",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Minu Labs and Blood Bank",
    "lat": 11.675357,
    "lng": 78.131943,
    "address": "7.A/4, Ramakrishna Road, (Rajaji Road)",
    "phone": "0427 2318881, 0427 2332425",
    "bloodGroups": [
      "O-",
      "AB-",
      "AB+",
      "B-",
      "A-",
      "B+",
      "A+",
      "O+"
    ]
  },
  {
    "name": "S Palaniyandi Mudaliar Memorial Hospital Blood Bank",
    "lat": 11.661224,
    "lng": 78.192156,
    "address": "No. 29 Cuddalore Road,  Ammapet, Salem\r\n",
    "phone": "0427 2244500, 0427 2240394, 0427 2240395 ",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Sri Shellapha Hospital Blood Bank",
    "lat": 11.659832,
    "lng": 78.154862,
    "address": "239, Rajaram  Nagar, Near Gandhi Stadium, Salem\r\n",
    "phone": "0427 2421266, 0427 2421277",
    "bloodGroups": [
      "B+",
      "AB-",
      "A+",
      "AB+",
      "B-",
      "A-",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Government Sivagangai Medical College Hospital Blood Bank",
    "lat": 9.838881,
    "lng": 78.478259,
    "address": "Vanieyankudi, Sivagangai\r\n",
    "phone": "04575 246356",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 10.063948,
    "lng": 78.777174,
    "address": "Government Head Quarters Hospital, Karaikudi, Sivagangai District\r\n",
    "phone": "04565 221782",
    "bloodGroups": [
      "A+",
      "A-",
      "AB+",
      "O+",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Sri Kaali Blood Bank",
    "lat": 10.956521,
    "lng": 79.37494,
    "address": "No. 165A Gandhi Adigal Salai, Kumbakonam,  Tamil Nadu ",
    "phone": "0435 242 6037",
    "bloodGroups": [
      "B+",
      "AB-",
      "O+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 10.969246,
    "lng": 79.385655,
    "address": "Government Head Quarters Hospital, Dr. Moorthy Road, Kumbakonam",
    "phone": "0435 2425104",
    "bloodGroups": [
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 10.421081,
    "lng": 79.317866,
    "address": "Palaniappan St.Nadimuthu Nagar, Pattukkottai, ",
    "phone": "04373 252080",
    "bloodGroups": [
      "B-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Thanjavur Medical College Hospital Blood Bank",
    "lat": 10.758601,
    "lng": 79.106601,
    "address": "Thanjavur Medical College Hospital, Thanjavur",
    "phone": "04362 246452, 04362 240951, 04362 240124",
    "bloodGroups": [
      "AB-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Sri Kaali Blood Bank",
    "lat": 10.785119,
    "lng": 79.120603,
    "address": "No. 32 Thirunagar, Thanjavur",
    "phone": "0435 2426037",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Government Raja Mirasudar Hospital",
    "lat": 10.785541,
    "lng": 79.1366,
    "address": "Government Raja Mirasudar Hospital, Thanjavur",
    "phone": "04362 276880",
    "bloodGroups": [
      "B-",
      "B+",
      "AB+",
      "A+",
      "O-",
      "O+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Lakshminarayana Blood Bank",
    "lat": 10.764582,
    "lng": 79.134439,
    "address": "No. 190 ,11 th cross,  Arulananda Ammal Nagar",
    "phone": "04362 255485 ",
    "bloodGroups": [
      "A+",
      "B+",
      "B-",
      "A-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 10.776729,
    "lng": 79.12912,
    "address": "Indian Red Cross Society, 43/C, Al - Seraj Building, Medical College Road",
    "phone": "04362 273456, 04362 273456, 04362  278333",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Meenakshi Hospital Blood Bank",
    "lat": 10.745435,
    "lng": 79.111902,
    "address": "SF No.244/2, 3rd Floor, Nilagiri Therkku Thottam Village,  Near New Bus Stand, Trichy Main Road, Tanjore\r\n",
    "phone": "0436 2226474",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Government Lawley Hospital Blood Bank",
    "lat": 11.347494,
    "lng": 76.792608,
    "address": "Government Lawley Hospital, Coonoor",
    "phone": "0423 2231050",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Government Taluk Hospital Blood Bank",
    "lat": 9.676495,
    "lng": 77.240608,
    "address": "Government Taluk Hospital, Gudalur",
    "phone": "04262 261222",
    "bloodGroups": [
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Gudalur Adivasi Hospital Blood Bank (Previously named as Ashwini hospital & under Ashwini trust)",
    "lat": 11.50223,
    "lng": 76.498838,
    "address": "0/147 G7, Kothervayal, Gudalur, Kothervayal, Ashwini Hospital Road\r\n",
    "phone": "0426 2261645",
    "bloodGroups": [
      "B-",
      "A-",
      "B+",
      "O+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Government Head quarters Hospital",
    "lat": 11.407951,
    "lng": 76.700279,
    "address": "Government Head quarters Hospital,Udagamandalam",
    "phone": "0423 2446146",
    "bloodGroups": [
      "A-",
      "O+",
      "O-",
      "AB-",
      "A+",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Military Hospital Blood Bank",
    "lat": 11.367257,
    "lng": 76.782632,
    "address": "Military Hospital, Wellington",
    "phone": "0423 2200154",
    "bloodGroups": [
      "B+",
      "A-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 10.123029,
    "lng": 77.53294,
    "address": "Government Head Quarters Hospital, Thenkarai, Periyakulam",
    "phone": "04546 231292",
    "bloodGroups": [
      "O-",
      "A-",
      "O+",
      "B+",
      "AB+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Government Theni Medical College Hospital Blood Bank",
    "lat": 10.006927,
    "lng": 77.553185,
    "address": "Government  Theni Medical College, Kanavilaku, Madurai Road, Theni",
    "phone": "04546 294053",
    "bloodGroups": [
      "A-",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 13.127649,
    "lng": 79.91098,
    "address": "Government  Thiruvallur Head Quarters Hospital, JN Road, Thiruvallur\u00ef\u00bf\u00bd",
    "phone": "044 27664849",
    "bloodGroups": [
      "B+",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Government Medical College and Hospital Blood Bank",
    "lat": 10.779139,
    "lng": 79.606921,
    "address": "The Medical Officer,  Government  Medical College & Hospital, Collectrate Campus, Vilamal, Thiruvarur",
    "phone": "04366 222204",
    "bloodGroups": [
      "B+",
      "AB+",
      "O-",
      "AB-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 9.175646,
    "lng": 77.874168,
    "address": "Government Head Quarters Hospital, Kovilpatti, Thoothukudi",
    "phone": "04632 223106",
    "bloodGroups": [
      "B-",
      "AB+",
      "O+",
      "O-",
      "A-",
      "AB-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Sudiksha Prabhu Hospital Blood Bank and Research Centre",
    "lat": 9.172693,
    "lng": 77.864944,
    "address": "59,60, Chokkan Urani Street, AKS Theatre Road\r\nV.O.C. Nagar, Kadershan Koil, Kovilpatti",
    "phone": "04632 233939, 04632 233828",
    "bloodGroups": [
      "A-",
      "A+"
    ]
  },
  {
    "name": "Aarthi Hospital Blood Bank",
    "lat": 9.174494,
    "lng": 77.866384,
    "address": "60, Santhaipettai Road, Kovilpatti\r\n",
    "phone": "04362 223346",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Government Thoothukudi Medical College Hospital Blood Bank",
    "lat": 8.798061,
    "lng": 78.136134,
    "address": "Palayamkottai Road, Thoothukudi \r\n",
    "phone": "0462 2321052",
    "bloodGroups": [
      "O-",
      "B-"
    ]
  },
  {
    "name": "Tuticorin Blood Bank",
    "lat": 8.808076,
    "lng": 78.146747,
    "address": "No. 67/70, 1st Floor, North Car Street, Tuticorin",
    "phone": "0461 4200666",
    "bloodGroups": [
      "B-",
      "A+",
      "A-",
      "B+",
      "AB+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Southern Railway Hospital Blood Bank",
    "lat": 10.784568,
    "lng": 78.725301,
    "address": "Gold Rock, Railway colony",
    "phone": "0431 249 0708",
    "bloodGroups": [
      "O-",
      "B+"
    ]
  },
  {
    "name": "Mahathma Gandhi Memorial Government Hospital Blood Bank",
    "lat": 10.811588,
    "lng": 78.677458,
    "address": "(Attached with KAP Vishwanathan Medical College) Mahathma Gandhi Memorial Government Hospital, EVR Road, Puthur, Trichy",
    "phone": "0431 2770047",
    "bloodGroups": [
      "A+",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "KMC Speciality Hospitals Blood Bank ( Kaveri Hospitals)",
    "lat": 10.802301,
    "lng": 78.680138,
    "address": "No. 6 Royal Road, Cantonment, Trichy ",
    "phone": "0431 4077777, (Ex.2508)",
    "bloodGroups": [
      "AB-",
      "O+",
      "AB+",
      "B-",
      "A+",
      "B+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Bharath Blood Bank  ",
    "lat": 10.819196,
    "lng": 78.676748,
    "address": "No, 15A Rishi Complex, II Floor,  Main Road, Thillainagar ",
    "phone": "0431 2760995, 0431 2760226",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Chennai Medical College Hospital and Research Centre",
    "lat": 10.954422,
    "lng": 78.754891,
    "address": "SRM Medical College, Irungallar, Manachanallur, Trichy",
    "phone": "0431 4298925",
    "bloodGroups": [
      "O-",
      "O+",
      "A+",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Government Headquarters Hospital Blood Bank",
    "lat": 10.604228,
    "lng": 78.437862,
    "address": "Government  Head Quarters Hospital, Viralimalai Road, Manapparai",
    "phone": "0432 260760",
    "bloodGroups": [
      "B+",
      "AB+",
      "B-",
      "A-",
      "A+",
      "AB-",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Church of South India Mission General Hospital Blood Bank",
    "lat": 10.830302,
    "lng": 78.67675,
    "address": "Woraiyur, Tiruchirappalli",
    "phone": "0431 2761927, 0431 2762879, 0431 2760672, Ext. 423",
    "bloodGroups": [
      "A-",
      "AB+",
      "B+",
      "AB-",
      "O+",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Child Jesus Hospital Blood Bank",
    "lat": 10.805162,
    "lng": 78.686566,
    "address": "Next to All India Radio, Promenade Road, Cantonment, Tiruchirappalli",
    "phone": "0431 2415816, 0431 2410816",
    "bloodGroups": [
      "A+",
      "B-",
      "AB+",
      "AB-",
      "B+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 8.702599,
    "lng": 77.385988,
    "address": "Goverment Hospital, Ambasamudram",
    "phone": "04634 253480",
    "bloodGroups": [
      "O+",
      "AB+",
      "AB-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 9.167302,
    "lng": 77.535764,
    "address": "Government Hospital, Katcheri Road, Sankaran Kovil\r\n",
    "phone": "04636 222399",
    "bloodGroups": [
      "A-",
      "O+",
      "A+",
      "AB-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 8.952567,
    "lng": 77.315522,
    "address": "Government Head Quarters Hospital, Tenkasi",
    "phone": "04633 280138",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A-",
      "A+",
      "B-",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Shifa Hospitals Blood Bank",
    "lat": 8.728161,
    "lng": 77.710143,
    "address": "No. 82 Kailasapuram Middle Street, IIIrd Floor, Thirunelveli Junction, Thirunelveli",
    "phone": "0462 2323041, 0462 2323044, 0462 2333245",
    "bloodGroups": [
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Tirunelveli Medical College Hospital Blood Bank",
    "lat": 8.711749,
    "lng": 77.75082,
    "address": "Tirunelveli Medical College Hospital, Tirunelveli",
    "phone": "0462 2576878, 0462 2572615",
    "bloodGroups": [
      "O-",
      "B+"
    ]
  },
  {
    "name": "Kartheek Nursing Home Blood Bank",
    "lat": 8.704073,
    "lng": 77.738605,
    "address": "Complex No. 37 (STC Road) Perumal Puram 7th Street, Thirunelveli",
    "phone": "0462 2530409,  0462 2530410,  0462 2531777",
    "bloodGroups": [
      "B+",
      "AB-",
      "A+",
      "A-",
      "O+",
      "B-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Life Line Blood Bank Component and Research Centre ",
    "lat": 8.729758,
    "lng": 77.719592,
    "address": "Run by Subashtika Charitable Society, 3rd Floor, Sri Sudharsan Hospital, No.4, Salai Street, Vannarpettai",
    "phone": "0462 4560430",
    "bloodGroups": [
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Aarthi Hospital and Diagnostic Centre Blood Bank",
    "lat": 8.716055,
    "lng": 77.749882,
    "address": "No. 177/A-22/2, Trivandrum High Road Vannarapettai, Tirunelveli",
    "phone": "0462 2501363, 0462 221346",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Galaxy Hospital Blood Bank",
    "lat": 8.733836,
    "lng": 77.723049,
    "address": "North Bye Pass Road, Vannerpettai, Tirunelveli\r\n",
    "phone": "0462 2501951, 0462 2501955",
    "bloodGroups": [
      "O+",
      "AB-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 10.732509,
    "lng": 77.530473,
    "address": "Government  Hospital, Park Road, Near Taluk Office, Dharapuram",
    "phone": "04258 220226",
    "bloodGroups": [
      "A+",
      "O+",
      "AB-",
      "B-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Revathy Medical Centre Blood Bank",
    "lat": 11.120178,
    "lng": 77.32933,
    "address": "No 10, CKP Layout 4th Floor, Valayankadu Main Road, Kumar Nagar (West) Avinashi Road, Tiruppur",
    "phone": "0421 4332211",
    "bloodGroups": [
      "O+",
      "O-",
      "A-",
      "B-",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "DSK Hospital Blood Bank",
    "lat": 11.103261,
    "lng": 77.369155,
    "address": "9 Kathir Nagar, Kangayam Main Road, Kathir Layout Road, Sathyamurthy Nagar, Tiruppur",
    "phone": "0421 2422434, 0421 2421350",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 11.076008,
    "lng": 77.36898,
    "address": "Government Head Quarters Hospital, Dharapuram Road, Tiruppur ",
    "phone": "0421 2423400",
    "bloodGroups": [
      "A+",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 10.583823,
    "lng": 77.247247,
    "address": "Government Hospital, VOC Street, Udumalpet",
    "phone": "04252 220092",
    "bloodGroups": [
      "A-",
      "O-"
    ]
  },
  {
    "name": "Udumalpet Indian Medical Association Rotary Blood Bank",
    "lat": 10.586364,
    "lng": 77.255039,
    "address": "UKP-IMA Building, K.P.N. Nagar Gandhinagar Post, Udumalpet",
    "phone": "04252 226458",
    "bloodGroups": [
      "B+",
      "A+"
    ]
  },
  {
    "name": "Government Medical College Hospital Blood Bank",
    "lat": 12.225476,
    "lng": 79.064744,
    "address": "Government Thiruvannamalai Medical College Hospital, Thiruvannamalai",
    "phone": "04175 223585",
    "bloodGroups": [
      "AB+",
      "A-"
    ]
  },
  {
    "name": "ST Thomas Hospital Blood Bank and Leprosy Centre",
    "lat": 12.466265,
    "lng": 79.335994,
    "address": "Chettupattu, Polur Road, Tiruvannamalai",
    "phone": "04181 252263",
    "bloodGroups": [
      "B+",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Government Medical College Hospital Blood Bank",
    "lat": 12.845971,
    "lng": 79.135775,
    "address": "Arni Road, Arani Road, Opposite Staff Quarters, Adukkamparai, Vellore",
    "phone": "04162 263900",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 12.786665,
    "lng": 78.716928,
    "address": "Government Hospital, Nethaji Road, Ambur",
    "phone": "04174 244656",
    "bloodGroups": [
      "B-",
      "A-",
      "A+",
      "AB-",
      "AB+",
      "B+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Bethesda Hospital Blood Bank",
    "lat": 12.778149,
    "lng": 78.720022,
    "address": "Mission Compound, Post Box No 56,  Ambur",
    "phone": "04174 242131",
    "bloodGroups": [
      "O+",
      "AB+",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 12.945268,
    "lng": 78.870574,
    "address": "Government Hospital, Gudiyatham",
    "phone": "04171 221100",
    "bloodGroups": [
      "B+",
      "A-",
      "AB+",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 12.49646,
    "lng": 78.565713,
    "address": "Government Hospital, Railway Station Road, Achamangalam, Tirupattur",
    "phone": "04179 220080",
    "bloodGroups": [
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 12.676583,
    "lng": 78.615933,
    "address": "Government Hospital, Vaniyambadi",
    "phone": "04174 225700",
    "bloodGroups": [
      "O-",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "CMC Hospital Blood Bank",
    "lat": 12.92504,
    "lng": 79.136105,
    "address": "IDA Scudder Road, Vellore, Tamil Nadu ",
    "phone": "0416 2222102,0416 2282010",
    "bloodGroups": [
      "O+",
      "O-",
      "A-",
      "A+",
      "AB+",
      "B+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Masonic Blood Bank",
    "lat": 12.930498,
    "lng": 79.135092,
    "address": "W/BRO V Surendranath Reddy Memorial Trust ,No. 5/2 New Katpadi Road, Opposite to Hotal River view, Vellore",
    "phone": "0416 2220717, 0416 2223024",
    "bloodGroups": [
      "AB-",
      "AB+",
      "B-",
      "A-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Sri Narayani Hospital and Research Centre Blood Bank",
    "lat": 12.870762,
    "lng": 79.089846,
    "address": "Sripuram, Thirumalaikodi, Vellore, Tamil Nadu ",
    "phone": "0416 2206300,0416 2271202, 0416 2271844, 0416 2271584",
    "bloodGroups": [
      "O-",
      "O+",
      "AB-",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 12.926168,
    "lng": 79.356628,
    "address": "Government Head Quarters Hospital, Walaja",
    "phone": "04172 232538",
    "bloodGroups": [
      "B+",
      "B-"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 11.737301,
    "lng": 78.959375,
    "address": "Government Hospital, Kachirapalayam Road, Kallakurichi",
    "phone": "04151 222527",
    "bloodGroups": [
      "O+",
      "A+",
      "AB-",
      "AB+",
      "B-",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Melmaruvathur Adiparasakthi Institute of Medical Sciences and Research Blood Bank",
    "lat": 12.434226,
    "lng": 79.81321,
    "address": "A unit of Adiparasuthi Charitable Medical Eductional Cultural Trust, Melmaruvathur, Kancheepuram",
    "phone": "044 27528302, 044 27528303, 044 27528304",
    "bloodGroups": [
      "O+",
      "B-",
      "A-",
      "O-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 12.241136,
    "lng": 79.651734,
    "address": "Government Hospital, Hospital Road, Dindivanam\r\n",
    "phone": "04147 222250",
    "bloodGroups": [
      "AB-",
      "AB+",
      "A-",
      "B-",
      "O-"
    ]
  },
  {
    "name": "St Joseph Hospital Blood Bank",
    "lat": 12.219359,
    "lng": 79.654492,
    "address": "Police line, Jayapuram, Tindivanam \r\n",
    "phone": "04147 226363",
    "bloodGroups": [
      "B-",
      "AB+",
      "O+",
      "O-",
      "A-",
      "AB-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 11.692762,
    "lng": 79.285932,
    "address": "Government Hospital, Ulundurpettai",
    "phone": "04149 222201",
    "bloodGroups": [
      "A+",
      "B+"
    ]
  },
  {
    "name": "Government Villupuram Medical College and Hospital Blood Bank",
    "lat": 11.992895,
    "lng": 79.516782,
    "address": "Government  Villupuram Medical College and Hospital, Mundiyambakkam, Villupuram",
    "phone": "04146 232101",
    "bloodGroups": [
      "AB+",
      "O-"
    ]
  },
  {
    "name": "GN Blood Bank",
    "lat": 11.939851,
    "lng": 79.487355,
    "address": " Run by GG Educational and Charitable Trust, 7-C, Chairman Chidambaram Street, Villupuram",
    "phone": "04146 225545",
    "bloodGroups": [
      "AB-",
      "O-",
      "B+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 9.502673,
    "lng": 78.097224,
    "address": "Pandalkudi Road, Near Vellai Kottai, Aruppukottai\r\n",
    "phone": "04566 220264",
    "bloodGroups": [
      "O+",
      "B-",
      "A-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 9.41412,
    "lng": 77.597374,
    "address": "Government Hospital",
    "phone": "04563 221301",
    "bloodGroups": [
      "B+",
      "B-",
      "A+",
      "O+",
      "AB-",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 9.460615,
    "lng": 77.786369,
    "address": "Government Hospital, Parasakthi colony, Near Sivakasi railway station, Shield Road",
    "phone": "04562 220301",
    "bloodGroups": [
      "A+",
      "B-",
      "O-",
      "AB+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 9.588385,
    "lng": 77.961917,
    "address": "Government Head Quarters Hospital, Ramamoorthy Road, Virudhunagar",
    "phone": "04562 244425",
    "bloodGroups": [
      "O+",
      "AB+",
      "B+",
      "B-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Rajiv Gandhi Institute of Medical Sciences Blood Bank",
    "lat": 19.664144,
    "lng": 78.524732,
    "address": "Teachers Colony, Near State Bank of Hyderabad, Ground Floor, IP Block, Govt. District Head Quarters Hopsital Premises",
    "phone": "8732224108",
    "bloodGroups": [
      "AB+",
      "A-",
      "B-",
      "O+",
      "AB-",
      "B+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 18.87247,
    "lng": 79.444699,
    "address": " Ground Floor, Area Hospital, I.B Chaurastha",
    "phone": "08736259259, 08736252259",
    "bloodGroups": [
      "AB+",
      "A+",
      "B-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Singareni Collieries Co. Ltd Blood bank",
    "lat": 19.063129,
    "lng": 79.487441,
    "address": "Sector-1, Area Hospital, Ramakrishnapur, Mandamarri (M), Bellampalli",
    "phone": "08736-228677 ext No -328",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 19.664062,
    "lng": 78.532011,
    "address": "Area Hospital, Gajulpet Road\r\nnear A1 Function Hall",
    "phone": "9440387455",
    "bloodGroups": [
      "O-",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "The Singareni Collieries Co. Ltd",
    "lat": 19.664062,
    "lng": 78.532011,
    "address": "Area Hospital Blood Bank, Ramakrishnapuram",
    "phone": "08736 228677",
    "bloodGroups": [
      "O-",
      "O+"
    ]
  },
  {
    "name": "Challa Hospital Blood Bank (A Multi Speciality Hospital)",
    "lat": 17.439581,
    "lng": 78.450633,
    "address": "D.No. 7-1-71/A/1, 1st Floor, Dharam Karam Road, Ameerpet",
    "phone": "040 23731215",
    "bloodGroups": [
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Aarohi Blood Bank",
    "lat": 17.411615,
    "lng": 78.449834,
    "address": "No.6-3-182/1 to 3, 3rd Floor, \r\nLake View Palace, \r\nRoad No.1, Banjara Hills\r\n",
    "phone": "040 23384212\t",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Institute of Transfusion Medicine and Research",
    "lat": 17.42114,
    "lng": 78.449212,
    "address": "Road.No.1, Banjara Hills",
    "phone": "040 23328956",
    "bloodGroups": [
      "B+",
      "AB-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "NTR Trust Blood Bank",
    "lat": 17.423643,
    "lng": 78.425977,
    "address": "D.No. 8-2-269/H/191/A/1, NTR Trust Bhavan, Road No. 2, Banjara Hills\r\n",
    "phone": "040 30799999",
    "bloodGroups": [
      "O-",
      "A+",
      "AB+",
      "B-",
      "AB-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Care Hospital Blood Bank",
    "lat": 17.412542,
    "lng": 78.450258,
    "address": "1st Floor, Road No.1, Banjara Hills",
    "phone": "040 30418296",
    "bloodGroups": [
      "AB+",
      "A-",
      "O+"
    ]
  },
  {
    "name": " Star Hospitals Blood Bank",
    "lat": 17.41567,
    "lng": 78.439477,
    "address": " A unit of Unimed Healthcare Private Limited, 6th floor,8-2-596/ Road No : 10, Banjara Hills",
    "phone": "040 44777777 EXT: 603",
    "bloodGroups": [
      "B+",
      "A-",
      "AB-",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Mythri Charitable Trust Blood Bank and Transfusion Centre",
    "lat": 17.391514,
    "lng": 78.497215,
    "address": "3-4-808 1st Floor, Barkatpura, Bs C C Shroff Hospital, Barkatpura, Hyderabad, Telangana\r\n",
    "phone": "040 27550238, 040 66822271",
    "bloodGroups": [
      "AB+",
      "AB-",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Sanjeevini Blood Bank",
    "lat": 17.405787,
    "lng": 78.499215,
    "address": "Sanjeevini Non-Governmental Organisation, Niveditha Orthopaedic Center, H.No.1-1-79/A, RTC Cross Road, Bhagyanagar, Hyderabad",
    "phone": "040 27667500, 040 65522343",
    "bloodGroups": [
      "AB-",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Rudhira Voluntary Blood Bank",
    "lat": 17.406011,
    "lng": 78.478212,
    "address": " H.No.3-6-10/A,1st floor, Anasuya Commercial Complex, Liberty Road, Himayathnagar",
    "phone": "040 23220222",
    "bloodGroups": [
      "O+",
      "O-"
    ]
  },
  {
    "name": "Satya Nursing Home Blood Bank",
    "lat": 17.404758,
    "lng": 78.482139,
    "address": "D.No. 3-6-426, First Floor, Street No. 4, Himayatnagar, Hyderabad, Hyderabad District, Telangana\r\n",
    "phone": "040 66753026",
    "bloodGroups": [
      "O+",
      "O-",
      "AB+",
      "AB-",
      "B-",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Nizams Institute of Medical Sciences Blood Bank",
    "lat": 17.421241,
    "lng": 78.451389,
    "address": "Accident and Emergency Block, 2nd Floor, Road.No.1, Banjara Hills",
    "phone": "040 23489722",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "The Osmania General Hospital Blood Bank",
    "lat": 17.372522,
    "lng": 78.473807,
    "address": " Osmania General Hospital Premises, Hyderabad",
    "phone": "040 24600146",
    "bloodGroups": [
      "B+",
      "A-"
    ]
  },
  {
    "name": "MNJ  Institute of Oncology and Regional Cancer Centre Blood Bank",
    "lat": 17.398812,
    "lng": 78.462087,
    "address": "Ground Floor, Lakdikapool, Red Hills\r\n",
    "phone": "040 23397000, 040 23318424",
    "bloodGroups": [
      "O-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "General Chest Hospital",
    "lat": 17.445384,
    "lng": 78.434951,
    "address": "Blood Bank Medical Officer,  Blood Bank, General and Chest Hospital, Irrumnuma, Hyderabad",
    "phone": "040-23814939",
    "bloodGroups": [
      "AB-",
      "O+",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Lions Club of Hyderabad(East) Bhanji Kheraj Blood Bank",
    "lat": 17.520718,
    "lng": 78.440959,
    "address": "Feroz Gandhi Park,  Bank Street, Koti, Hyderabad",
    "phone": "040 24745243",
    "bloodGroups": [
      "A+",
      "B-",
      "O-",
      "O+",
      "AB-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Blood Bank Thelasemia and Sickle Cell",
    "lat": 17.385044,
    "lng": 78.486671,
    "address": "Blood Bank Medical Officer, Blood Bank Thelasemia and Sick Cell, Hyderabad",
    "phone": "9391029400",
    "bloodGroups": [
      "O+",
      "AB+",
      "B-",
      "A+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Andhra Mahila Sabha Durgabhai Deshmukh Hospital & Blood Bank",
    "lat": 17.4025,
    "lng": 78.509832,
    "address": "Osmania University Road, Ram Nagar Gundu, Adikmet, Hyderabad, Telangana \r\n",
    "phone": "040 27656969, 040 27681158",
    "bloodGroups": [
      "AB+",
      "A-",
      "B+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Share Medical Care (Mediciti Hospital) Blood Bank",
    "lat": 17.406546,
    "lng": 78.471614,
    "address": "D.No. 5-9-22/B/103, Flat No.103, First Floor, My Home Sarovar Complex, Secretariat Road",
    "phone": "040 23231111",
    "bloodGroups": [
      "A-",
      "AB-",
      "O-",
      "AB+",
      "O+",
      "B+",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Aditya Hospital Blood Bank",
    "lat": 17.390308,
    "lng": 78.481143,
    "address": "4-3-154/3, Beside Pragati College, Hanuman Tekdi, Abids, Hyderabad.\r\n",
    "phone": "040 24763565",
    "bloodGroups": [
      "O-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Himabindhu Multispeciality Hospital Blood Bank",
    "lat": 17.352329,
    "lng": 78.506534,
    "address": "H.No. 17-1-383/1/1, 1st Floor, Vinay Nagar, Sagar Road, Santhosh Nagar",
    "phone": "040 64558828  ",
    "bloodGroups": [
      "B-",
      "O+"
    ]
  },
  {
    "name": "Thalassemia and Sickle Cell Society Vuppala Venkaiah Memorial Blood Bank",
    "lat": 17.368886,
    "lng": 78.480146,
    "address": "D.No.22-8-496 to 501, 1st and 2nd floor, Chatta Bazar X Road, Near City Civil Courts, Purana Haveli, Hyderabad\r\n",
    "phone": "040 24403783",
    "bloodGroups": [
      "A-",
      "O+"
    ]
  },
  {
    "name": "NEW LIFE EDUCATIONAL SOCIETY BLOOD BANK ",
    "lat": 17.37694,
    "lng": 78.34905,
    "address": "22-1-1038,1st FLOOR,ABID ALI KHAN LIONS EYE HOSPITAL,DARULSHIFA, Hyderabad, TELANGANA",
    "phone": "040 24575757, 040 64558864",
    "bloodGroups": [
      "AB+",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Apollo Hospital Blood Bank",
    "lat": 17.415057,
    "lng": 78.416515,
    "address": "Apollo hospital, Ground floor, Jubilee hills, Hyderabad\r\n",
    "phone": "040 23607777, Ext: 2604",
    "bloodGroups": [
      "O+",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Employees State Insurance Corporation Medical College Hospital Blood Bank",
    "lat": 17.447882,
    "lng": 78.439955,
    "address": "Second Floor, Radiology Block, Sanath nagar, Hyderabad",
    "phone": "040 67872049",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Yashoda Super Speciality Hospitals Blood Bank",
    "lat": 17.424342,
    "lng": 78.457724,
    "address": "D.No. 6-3-903/A/4/F-3, 2nd floor, Shirdi Apartments,\r\nSomajiguda",
    "phone": "040 23319999",
    "bloodGroups": [
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Apollo Hospital Enterprises Ltd",
    "lat": 17.39928,
    "lng": 78.479256,
    "address": "D.No.3/5/836 to 838, main road, hyderguda, hyderabad.\r\n",
    "phone": "040 23231380",
    "bloodGroups": [
      "AB+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Lions Club Matadin Goel Blood Bank",
    "lat": 17.403106,
    "lng": 78.479609,
    "address": "Blood Bank Medical Officer,  Lions Club Matadin Goel Blood Bank, Himayatnagar, Hyderabad,",
    "phone": "040 23226624",
    "bloodGroups": [
      "O-",
      "A+"
    ]
  },
  {
    "name": "Chiranjeevi Blood Bank",
    "lat": 17.428205,
    "lng": 78.416539,
    "address": "Road No.1, Jubliee Hills checkpost",
    "phone": "040 23555005, 040 23554849",
    "bloodGroups": [
      "O+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Owaisi Medical and Research Centre",
    "lat": 17.34132,
    "lng": 78.506714,
    "address": " Nawab Lutfud Dowli Palace,  Kanchanbagh, Zafargadh,Santoshnagar,Hyderabad\r\n",
    "phone": "040 64638871, 040 24343129, 040 24323723",
    "bloodGroups": [
      "O+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Kamineni Health Services Pvt.Ltd. Blood Bank",
    "lat": 17.392587,
    "lng": 78.479728,
    "address": "D.No. 4-1-1227, Cellar Portion, Boggulakunta, Kingkoti, Hyderguda, Hyderabad District, Telangana\r\n",
    "phone": "040 66924030, 040 66924444",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "The Government  Maternity Hospital",
    "lat": 17.385808,
    "lng": 78.48723,
    "address": "Blood bank,  Sultan Bazar, Koti, Hyderabad",
    "phone": "040 23305967",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Global Hospital Blood Bank",
    "lat": 17.405254,
    "lng": 78.463164,
    "address": "D.No.6-1-1070/1 to 4, Lakdikapool",
    "phone": "040 23244444, 040 30644444",
    "bloodGroups": [
      "A+",
      "A-",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Sri Balaji Blood Bank (A Unit of Sri Balaji Educational Society)",
    "lat": 17.375363,
    "lng": 78.497278,
    "address": "Cellar Portion, 16-8-923, Nalgonda X Road, Malakpet, Hyderabad",
    "phone": "040 64522466",
    "bloodGroups": [
      "A+",
      "B+",
      "O-",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Premier Hospital Blood Bank",
    "lat": 17.391657,
    "lng": 78.427008,
    "address": "12-2-718, Nanal Nagar X Roads, Mehdipatnam, Hyderabad",
    "phone": "040 23774469",
    "bloodGroups": [
      "O+",
      "A-"
    ]
  },
  {
    "name": "Institute of Preventive Medicine",
    "lat": 17.393915,
    "lng": 78.490331,
    "address": "Public Health Laboratories and Food (Health) Administration, Narayanaguda, Hyderabad",
    "phone": "040 27557733",
    "bloodGroups": [
      "A+",
      "AB+",
      "O-",
      "O+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "M G M H BLOOD BANK (Government Modern Maternity Hospital)",
    "lat": 17.365982,
    "lng": 78.464893,
    "address": "Government Modern Maternity Hospital, Opp City College, Petlaburz, Hyderabad\r\n",
    "phone": "040 24523641",
    "bloodGroups": [
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Rakshita Voluntary Blood Bank",
    "lat": 17.381461,
    "lng": 78.480605,
    "address": " H.No.5-1-931, First Floor, Jambagh, Putlibowli",
    "phone": "040 65263309",
    "bloodGroups": [
      "AB+",
      "A+"
    ]
  },
  {
    "name": "The Govt. Niloufer Hospital Blood Bank",
    "lat": 17.398649,
    "lng": 78.461057,
    "address": "Premises of Government Niloufer Hospital, Red Hills, Nampally\r\n",
    "phone": "040 23314075, Ext : 287",
    "bloodGroups": [
      "O+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Health, Agriculture, Rural Development Society (HARD)  Blood Bank",
    "lat": 17.396159,
    "lng": 78.463155,
    "address": "No.11-5-263/3, Red Hills, Hyderabad",
    "phone": "040 23300859, 040 23300959",
    "bloodGroups": [
      "A+",
      "AB-",
      "B+",
      "AB+",
      "O+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "The ESI Hospital Blood Bank",
    "lat": 17.456588,
    "lng": 78.426852,
    "address": " ESI Hospital premises, Ground Floor, Sanathnagar",
    "phone": "040 23701232, 040 23701233",
    "bloodGroups": [
      "B+",
      "O-",
      "AB-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "St. Theresa&#39;s Hospital Blood Bank",
    "lat": 17.451375,
    "lng": 78.436556,
    "address": "Erragadda, Sanath Nagar, Hyderabad",
    "phone": "040 23802255, 040 23812288",
    "bloodGroups": [
      "O-",
      "AB+",
      "AB-",
      "A+",
      "O+",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Gandhi Hospital Blood Bank",
    "lat": 17.42323,
    "lng": 78.504138,
    "address": "1st Floor, A block, Musheerabad, Secunderabad, Telangana\r\n",
    "phone": "040 27505566",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Lions Club of Secunderabad Twin Cities",
    "lat": 17.432643,
    "lng": 78.490824,
    "address": "2nd Floor, Varalaxmi Complex, Opposite Stay Inn Hotel, James Street, M.G.Road, Secunderabad",
    "phone": "040 32411317",
    "bloodGroups": [
      "B+",
      "O+",
      "O-",
      "A+",
      "A-",
      "AB+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Yashoda Hospital (A Unit of Datta Chandra Hospital Pvt. Ltd.)  Blood Bank",
    "lat": 17.441664,
    "lng": 78.497002,
    "address": " 1-1-156/157, 9th Floor, Alexander Road, Secunderabad, Telangana\r\n",
    "phone": "040 23319999, 040 24555555, 040 27713333",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Vivekananda Environmental International Society Social Service Blood Bank",
    "lat": 17.440396,
    "lng": 78.500468,
    "address": "H.No.9-1-127/D/1, Opposite St.Mary&#39;s Church, S.D.Road, Secunderabad",
    "phone": "040 64505032",
    "bloodGroups": [
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Janani Voluntary Blood Bank (A Unit of Janani Organization)",
    "lat": 17.441361,
    "lng": 78.500984,
    "address": " D.No.9-1-66/3, 2nd Floor, Lane Opposite Oriental Bank, S.D.Road, Secunderabad",
    "phone": "040 65603222",
    "bloodGroups": [
      "B+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Krishna Institute of Medical Sciences Blood Bank",
    "lat": 17.437572,
    "lng": 78.482096,
    "address": "D.No.1-8-31/1, Block-III, 2nd Floor, Minister Road, Secretariat, Secunderabad\r\n",
    "phone": "040 44186253 , 040 44186255",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Jeevadhara Voluntary Blood Bank (A Unit of Jeevadhaara Society)",
    "lat": 17.435457,
    "lng": 78.502918,
    "address": "H.No.9-4-269 to 275, Saluja Hospital, Second Floor, Rezimental Bazar, Secunderabad",
    "phone": "040 65996696, 040 27707088",
    "bloodGroups": [
      "O+",
      "A+",
      "B+",
      "B-",
      "AB+",
      "AB-",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Sunshine Hospital Blood Bank",
    "lat": 17.44101,
    "lng": 78.486923,
    "address": "No.1-7-201- to 205, II Floor, P.G.Road, Behind Paradise  Hotel,  Secunderabad",
    "phone": "040 64643345, 040 43444546",
    "bloodGroups": [
      "AB-",
      "O+",
      "A-",
      "B+",
      "A+",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Sri Devi Charitable Trust Blood Bank",
    "lat": 17.424972,
    "lng": 78.535869,
    "address": "D. No.: 12-13-197, Flat No. 106 & 107, Opposite HUDA Complex, Tarnaka, Secunderabad",
    "phone": "040 27016016",
    "bloodGroups": [
      "A-",
      "O+",
      "B+",
      "AB-",
      "AB+",
      "O-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Princess Esra Hospital Blood Bank",
    "lat": 17.356461,
    "lng": 78.474211,
    "address": "Second Floor, 23-2-665, Shah Ali Banda",
    "phone": "040 65875989",
    "bloodGroups": [
      "O-",
      "A-",
      "A+",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "RTC Hospital",
    "lat": 17.425416,
    "lng": 78.530499,
    "address": "RTC Hospital Blood Bank, Tarnaka, Hyderabad",
    "phone": "040-27018691",
    "bloodGroups": [
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 17.405048,
    "lng": 78.508731,
    "address": "1-9-310, Street No:14, Opposite Achyutha Reddy Complex,  Vidya Nagar Hyderabad\r\n",
    "phone": "040 27633087",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Chalmeda Ananda Rao Institute of Medical Sciences Blood Bank",
    "lat": 18.45324,
    "lng": 79.165083,
    "address": "Block C, Ground Floor, Bommakal (V), Karimnagar",
    "phone": "0878 2285565, 0878 2285318",
    "bloodGroups": [
      "A+",
      "A-",
      "AB-",
      "O-",
      "B+",
      "O+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Singareni Collieries Co.Ltd Blood Bank",
    "lat": 18.75955,
    "lng": 79.481638,
    "address": "Area Hospital Blood Bank, Ram Mandir, Godavarikhani",
    "phone": "08728-244362",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Indian Red Cross Society Jagityal, Blood Bank",
    "lat": 18.438555,
    "lng": 79.128841,
    "address": "District Headquarters Hospital JAGTIAL \r\nFirst Floor, Old Bus Stand",
    "phone": "9441290111",
    "bloodGroups": [
      "B-",
      "A-",
      "O-",
      "AB-",
      "B+",
      "O+",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Government District Head Quarters Hospital Blood Bank",
    "lat": 18.438555,
    "lng": 79.128841,
    "address": "Savaran Street, Manchiryal Chowrastha",
    "phone": "0878 2240223, 0878 2240337",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 18.438555,
    "lng": 79.128841,
    "address": "D.No.4-1-22, Osmanpura, \r\nOpp to Andhra Bank Main Branch",
    "phone": "0878 6451199",
    "bloodGroups": [
      "AB+",
      "A-",
      "O-",
      "A+",
      "B-",
      "O+",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Life Care Voluntary Blood Bank",
    "lat": 18.443293,
    "lng": 79.12973,
    "address": "D.No.3-1-446, 1st Floor, Opposite Government Hospital, Prashanth Nagar",
    "phone": "9441038039",
    "bloodGroups": [
      "B-",
      "O+",
      "O-",
      "AB-",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Prathima Institute of Medical Sciences Blood Bank",
    "lat": 18.498565,
    "lng": 79.151148,
    "address": "1st Floor, Hospital Building, Nagnur",
    "phone": "0878 2216500, 08782216555, 08782216380/81",
    "bloodGroups": [
      "O-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Apollo Reach Hospitals - Apollo Blood Bank",
    "lat": 18.454907,
    "lng": 79.13294,
    "address": "H.No.4-72, 3rd Floor, Subhash Nagar, \r\nNear Railway station\r\n",
    "phone": "0878 2200000",
    "bloodGroups": [
      "O-",
      "A+",
      "O+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "The Government Area Hospital Blood Bank",
    "lat": 17.584049,
    "lng": 80.332784,
    "address": "Bhadrachalam, Bhadradri Kothagudem",
    "phone": "9347563589",
    "bloodGroups": [
      "B-",
      "O+",
      "AB-",
      "A-",
      "AB+",
      "B+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "The APVVP District Head Quarters Hospital Blood Bank",
    "lat": 17.247253,
    "lng": 80.151445,
    "address": "1st Floor, Room.No.31, O.P. Block, Wyra Road, Khammam",
    "phone": "08742 224815",
    "bloodGroups": [
      "AB+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Rudhira Voluntary Blood Bank",
    "lat": 17.769321,
    "lng": 80.499386,
    "address": "(A Unit of Rudhira Health Organization), H.No.11-4-25/A, 1st & 2nd Floor, Wyra Road, Khammam",
    "phone": "08742 220666",
    "bloodGroups": [
      "AB-",
      "O-",
      "O+",
      "B-",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Siva Multi Speciality Hospital Blood Bank",
    "lat": 17.2508,
    "lng": 80.144151,
    "address": "H.No.11-2-44, Balaji Nagar, Wyra Road, Khammam",
    "phone": "08742 231883",
    "bloodGroups": [
      "O+",
      "B+",
      "B-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "The Government Area Hospital Blood Bank",
    "lat": 17.249377,
    "lng": 80.152006,
    "address": "Kothagudem, Khammam",
    "phone": "08008204232, 0949014408",
    "bloodGroups": [
      "A-",
      "O-"
    ]
  },
  {
    "name": "The Singareni Collieries  Co. Ltd",
    "lat": 17.247253,
    "lng": 80.151445,
    "address": "Hospital Blood Bank, Main Hospital, Kothagudem, Khammam",
    "phone": "09491145226, 09866803810",
    "bloodGroups": [
      "B+",
      "O+",
      "B-",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Sarala Blood Bank ",
    "lat": 17.556004,
    "lng": 80.614396,
    "address": "A Unit of Sarala Memorial Charitable Chartitable Trust, D.No. 5-13-7, 2nd Floor, M.G. Road, Kothagudem, Khammam",
    "phone": "9393667032",
    "bloodGroups": [
      "A-",
      "AB+",
      "B+",
      "B-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Singareni Collieries Co. Ltd",
    "lat": 17.931207,
    "lng": 80.82662,
    "address": "Blood Bank Medical Officer,  Blood Bank, Singareni Collieries Co. Ltd, Manuguru, Dist. Khammam, Mobile no:9491145024",
    "phone": "9866803810",
    "bloodGroups": [
      "A-",
      "O-",
      "B+",
      "AB+",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Asha Emergency & Chest Hospital Blood Bank",
    "lat": 17.24618,
    "lng": 80.832243,
    "address": "D. No.: 4-851/1, Opposite Bus Stand, Kalabharathi Road, Sattupally, Khammam\r\n",
    "phone": "8790276999",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Singareni Collieries Co. Ltd",
    "lat": 17.594134,
    "lng": 80.322363,
    "address": "Singareni Collieries Co. Ltd Blood Bank, Yellandu, District Khammam.",
    "phone": "9491145024",
    "bloodGroups": [
      "A-",
      "B-"
    ]
  },
  {
    "name": "Indian Red Cross Society ",
    "lat": 16.233659,
    "lng": 77.808136,
    "address": "Blood Bank, Area Hospital, Gadwal, Mahaboobnagar",
    "phone": "08546 271757",
    "bloodGroups": [
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Government District Head Quarters Hospital Blood Bank",
    "lat": 16.750213,
    "lng": 77.991441,
    "address": "Ground Floor, Mahaboobnagar",
    "phone": "9440635240",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 16.0,
    "lng": 78.0011525,
    "address": "Ground & First Floor,D.No.1-6-65/5/A,1-6-65/5/A, Modern High School Chourastha",
    "phone": "08542 223225,08542 246225 ",
    "bloodGroups": [
      "O-",
      "B-",
      "A-",
      "AB+",
      "O+",
      "B+",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "IRCS & RCH-II  Blood Bank District Hospital Wanaparthy ",
    "lat": 16.362312,
    "lng": 78.062182,
    "address": "Blood Bank, District Hospital,Wanaparthy, WANAPARTHY",
    "phone": "08545 230133",
    "bloodGroups": [
      "O-",
      "B-",
      "O+",
      "A-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Maheshwara Medical College and Maheshwara Hospital Blood Bank",
    "lat": 17.562407,
    "lng": 78.20521,
    "address": "1st floor, Maheshwara Hospital Building, Isnapur Cross Road, Chitkul Village, Patancheru Mandal, Medak",
    "phone": "7032888434",
    "bloodGroups": [
      "O+",
      "B+",
      "B-",
      "A+",
      "A-",
      "O-",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Bharat Heavy Electricals Limited Hospital ",
    "lat": 17.496713,
    "lng": 78.305268,
    "address": "Blood Bank, Ramachandrapuram, Medak",
    "phone": "040 23184386",
    "bloodGroups": [
      "A+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "The APVVP District Head Quarters Hospital",
    "lat": 18.052936,
    "lng": 78.261853,
    "address": "Blood Bank, Sangareddy, Medak",
    "phone": "09346783440, 09949849099",
    "bloodGroups": [
      "B-",
      "A-"
    ]
  },
  {
    "name": "Indian Red Cross Society",
    "lat": 18.098842,
    "lng": 78.84139,
    "address": "Blood Bank, Area Hospital Premises, Siddipet,  Medak",
    "phone": "9440037038",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Government District Head Quarter Hospital Nalgonda",
    "lat": 17.055864,
    "lng": 79.277882,
    "address": "Blood Bank, District Head Quarters Hospital Premises, 1st Floor, Old Building, Nalgonda",
    "phone": "9441367822",
    "bloodGroups": [
      "A+",
      "B-",
      "AB+",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Indian Red Cross Society",
    "lat": 17.054925,
    "lng": 79.273455,
    "address": " Blood Bank, D.No. 5-6-300, Red cross Bhavan, Near RTC Bus Stand, Nalgonda",
    "phone": "09849193555, 09866185147",
    "bloodGroups": [
      "AB+",
      "A-",
      "A+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Lions Club Blood Bank",
    "lat": 17.057571,
    "lng": 79.262029,
    "address": "Govt Area Hospital, Main Road , Suryapet - Nalgonda Dist  08684-224699",
    "phone": "08684 224699",
    "bloodGroups": [
      "A+",
      "AB+",
      "A-",
      "AB-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Indian Red Cross Society ,RCH-II",
    "lat": 17.141493,
    "lng": 79.606681,
    "address": "Blood Bank, RCH-II, TVVP Area Hospital, 1st Floor, Suryapet, dist:Suryapet.",
    "phone": "8684224699",
    "bloodGroups": [
      "B+",
      "A-"
    ]
  },
  {
    "name": "Sai Prasad Orthopedic Hospital",
    "lat": 17.135315,
    "lng": 79.633367,
    "address": "Blood Bank, H.No.1-2-270/45/3, Opposite Vijetha Hotel, Suryapet, Nalgonda",
    "phone": "08684 223223",
    "bloodGroups": [
      "O-",
      "A-",
      "AB-",
      "B+",
      "AB+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Indian Red Cross Society",
    "lat": 18.322975,
    "lng": 78.337899,
    "address": "Blood Bank, Area Hospital, Kamareddy, Nizamabad",
    "phone": "08468 221096",
    "bloodGroups": [
      "AB-",
      "A+",
      "B-",
      "O+"
    ]
  },
  {
    "name": "V.T.Thakur Memorial Rotary",
    "lat": 18.323995,
    "lng": 78.334305,
    "address": "Blood Bank, H.No.1-4-31/1, Godown Road, Bathukammakunta, Kamareddy, Nizamabad",
    "phone": "08468 222222",
    "bloodGroups": [
      "AB-",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "The Government District Headquarters Hospital ",
    "lat": 18.675665,
    "lng": 78.099084,
    "address": "Blood Bank, 7th  Floor, Khaleelwadi, R.P. Road, Nizamabad",
    "phone": "08462 251251",
    "bloodGroups": [
      "AB+",
      "A+",
      "A-",
      "B-",
      "O-",
      "O+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Indian Red Cross Society",
    "lat": 18.672505,
    "lng": 78.094087,
    "address": "Blood Bank, M.R.O. Office, Complex, Khaleelwadi, Nizamabad",
    "phone": "08462 222002",
    "bloodGroups": [
      "A+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Perali Narasaiah Memorial Charitable Trust ",
    "lat": 18.674236,
    "lng": 78.10156,
    "address": "Blood Bank, H.No.5-7-71, Khaleelwadi, Nizamabad",
    "phone": "08462 220141",
    "bloodGroups": [
      "A-",
      "AB+"
    ]
  },
  {
    "name": "S.B.Voluntary Blood Bank",
    "lat": 18.673955,
    "lng": 78.102653,
    "address": " H.No.5-6-812, 3rd Floor, Amrutha Laxmi Hospital, Opposite Rajiv Gandhi Auditorium, Khaleelwadi, Nizamabad",
    "phone": "08462 646430",
    "bloodGroups": [
      "B-",
      "O+"
    ]
  },
  {
    "name": "BBR Multispeciality Hospital Blood Bank",
    "lat": 17.464246,
    "lng": 78.457112,
    "address": "H. No.: 7-4-194, Ferozguda, Near Bank of India, Balanagar, Hyderabad",
    "phone": "040 23773333, 040 23778800",
    "bloodGroups": [
      "B+",
      "A+",
      "B-",
      "O-",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Janani Voluntary Blood Bank",
    "lat": 17.491139,
    "lng": 78.398166,
    "address": "D.No.125-28-11/1, GPR Complex, KPHB Colony, Kukatpally, Hyderabad",
    "phone": "040 23150496",
    "bloodGroups": [
      "B+",
      "A+",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Life Voluntary Blood Bank",
    "lat": 17.492862,
    "lng": 78.39781,
    "address": "MIG-323,Above Syndicate Bank,Road no-4, Remedy hospital lane,  First Floor, KPHB Colony, Phase-I, Kukatpally, Ranga Reddy. ",
    "phone": "040 23059222, 040 23159222",
    "bloodGroups": [
      "O-",
      "AB+",
      "AB-",
      "B-",
      "A-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Ozone Institute of Medical Sciences Hospital Blood Bank",
    "lat": 17.36107,
    "lng": 78.549759,
    "address": "H. No.: 11-13-201/33, Plot No. 23, 25 & 26. Road No. 4, Green Hills Colony, L. B. Nagar, Hyderabad",
    "phone": "040 30108109, 040 64556533",
    "bloodGroups": [
      "B-",
      "AB-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Rajyalakshmi Charitable Trust Blood Bank (A Unit of Rajyalakshmi Charitable Trust)",
    "lat": 17.367454,
    "lng": 78.530729,
    "address": "1st Floor, D.No.18-77/78, Street No.3, Kamala Nagar, Chaitanyapuri, Dilsukhnagar, Hyderabad",
    "phone": "040 64597760",
    "bloodGroups": [
      "A-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Continental Hospital Blood Bank",
    "lat": 17.417886,
    "lng": 78.339922,
    "address": "Plot No. 3, Road No. 2, IT & Financial district, Nanakramguda, Hyderabad",
    "phone": "040 67000000, Extn: 1105",
    "bloodGroups": [
      "O-",
      "B-",
      "AB+",
      "A+",
      "O+"
    ]
  },
  {
    "name": "ADRM Hospital and Blood Bank",
    "lat": 17.398478,
    "lng": 78.536069,
    "address": "4th Floor, D.No. 9-2, Plot No. 3, Ramanthapur, Hyderabad",
    "phone": "040 27035588",
    "bloodGroups": [
      "A-",
      "B-",
      "A+",
      "B+",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Narayana Hrudayalaya Mallareddy Hospital Blood Bank",
    "lat": 17.544026,
    "lng": 78.433044,
    "address": " # 1-1-216, Suraram &#39;X&#39; Road, Qutbullapur Mandal, Jeedimetla, Hyderabad",
    "phone": "040 23783106, 040  23783000 Extn: 3106",
    "bloodGroups": [
      "AB-",
      "AB+",
      "A+",
      "A-",
      "O+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Ram Hospital Blood Bank",
    "lat": 17.516138,
    "lng": 78.447736,
    "address": "2nd Floor,Ram Hospital, D.No.57/A, Shapur Nagar, IDA., Jeedimetla, Hyderabad",
    "phone": "040 23095757.9703730554",
    "bloodGroups": [
      "B+",
      "AB-",
      "B-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Malla Reddy Medical College and Malla Reddy General Hospital Blood Bank",
    "lat": 17.545201,
    "lng": 78.432739,
    "address": "Survey No.138, Suraram Main Roads, Quthbullapur Mandal",
    "phone": "040 23783000 Extn: 3106",
    "bloodGroups": [
      "AB-",
      "O+",
      "A-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "SLMS Hospital Blood Bank",
    "lat": 17.376463,
    "lng": 78.557369,
    "address": "Nagole &#39;x&#39; Roads, Ranga Reddy",
    "phone": "040 64579998",
    "bloodGroups": [
      "B+",
      "O+",
      "AB+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Citizens Hospital Blood Bank",
    "lat": 17.470667,
    "lng": 78.311308,
    "address": "D.No.1-100/1/CCH, Nallagandla Village, Serilingampally Mandal",
    "phone": "040 67191919, 040-67192580 Extn: 2581/2582, ",
    "bloodGroups": [
      "B+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 17.33643,
    "lng": 77.904848,
    "address": "Govt. Community Health Centre, Vikarabad, Ranga Reddy",
    "phone": "08416 252227",
    "bloodGroups": [
      "B-",
      "A-",
      "O+",
      "AB+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Indian Red Cross Society, Blood Bank",
    "lat": 18.005635,
    "lng": 79.557155,
    "address": "Opp: Dist. Collectorate, Subedari,Hanamkonda.",
    "phone": "0870 2456765",
    "bloodGroups": [
      "B-",
      "O-",
      "B+",
      "AB-",
      "A+",
      "O+",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank RCH-II ( Jangaon)",
    "lat": 17.721054,
    "lng": 79.160411,
    "address": "Sub Divisional Branch, 1st Floor, Area Hospital Premises, Janagaon, Warangal",
    "phone": "09440026445, 09866652205",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Government Mahatma Gandhi Memorial Hospital Blood Bank",
    "lat": 17.990313,
    "lng": 79.592843,
    "address": "MGM  Hospital Blood Bank, 1st Floor, O.P.Block, MGM. Hospital, Warangal",
    "phone": "9490611947",
    "bloodGroups": [
      "AB-",
      "B+",
      "A-",
      "A+",
      "B-",
      "O+",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Saint Anns Hospital Blood Bank",
    "lat": 17.981693,
    "lng": 79.52627,
    "address": "FATHIMANAGAR NIT (POST) WARANGAL DT. TELANGANA STATE \r\n",
    "phone": "9866309453",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Singareni Collieries Company Limited Area Hospital Blood Bank",
    "lat": 18.400965,
    "lng": 79.852782,
    "address": "Bhupalpalli, Warangal ",
    "phone": "08713 248104",
    "bloodGroups": [
      "AB+",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Mother Voluntary Blood Bank",
    "lat": 18.000637,
    "lng": 79.585628,
    "address": "MAS (Multipurpose Amicable Social Services Society), D.No.11-26-231, 1st Floor, Opp: MGM Hospital, Warangal",
    "phone": "7386698009",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Kakatiya Voluntary Blood Bank (A Unit of Life Care Medical and Educational Society)",
    "lat": 18.003153,
    "lng": 79.579693,
    "address": "Telengana Bhavan, Opposite Alankar Main Road, Hanumakonda, Warangal",
    "phone": "0870-2448243",
    "bloodGroups": [
      "B-",
      "AB+",
      "AB-",
      "O-",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Bimal Singha Memorial Hospital Blood Bank",
    "lat": 24.196139,
    "lng": 91.831476,
    "address": "Bimal Singha Memorial Hospital Kamalpur,  DhalaiTripura\r\n",
    "phone": "03826 262232",
    "bloodGroups": [
      "B+",
      "AB+",
      "AB-",
      "B-",
      "A+",
      "O-",
      "O+",
      "A-"
    ]
  },
  {
    "name": "District Hospital Gomati Blood Bank",
    "lat": 23.554399,
    "lng": 91.455532,
    "address": "District Hospital,Near Tepania Eco Park, Udaipur Gomati, ",
    "phone": "9436131338",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "District Hospital  Blood Bank Dharmanagar",
    "lat": 24.234,
    "lng": 92.09507,
    "address": "District Hospital North Tripura, Hospital Road",
    "phone": "0382 2231621",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "R.G.M Hospital Blood Bank Unakoti ",
    "lat": 24.304612,
    "lng": 92.033366,
    "address": "District Hospital Unakoti, Kailashahar, Unakoti, Opp to District Jail",
    "phone": "0382 4222221",
    "bloodGroups": [
      "O+",
      "B-",
      "AB+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Indira Gandhi Memorial Hospital Blood Bank",
    "lat": 23.8311,
    "lng": 91.276015,
    "address": "Indira Gandhi Memorial (I.G.M) Hospital, Akhaura Road, Agartala, Tripura West.",
    "phone": "0381 2325736, 0381 2326614, 0381 2315875",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Tripura Medical College and Dr. B.R.A.M. Teaching Hospital Blood Bank",
    "lat": 23.783323,
    "lng": 91.25688,
    "address": "Tripura Medical College, Hapania, Agartala, West Tripura.",
    "phone": "0381 2374144",
    "bloodGroups": [
      "B-",
      "A+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "ILS Hospital Blood Bank",
    "lat": 23.867534,
    "lng": 91.289606,
    "address": "Capital Complex Extension, P.O. New Secretariat, Kunjaban, Agartala, Tripura.\r\n\r\n",
    "phone": "0381 2415000",
    "bloodGroups": [
      "A-",
      "A+",
      "O+",
      "AB-",
      "B+",
      "B-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Agartala Govt. Medical College GBP Hospital Blood Bank",
    "lat": 23.51648,
    "lng": 91.17531,
    "address": "Agartala Government Medical College and G.B. Hospital Complex, P.O.- Kunjaban, Agartala, Tripura",
    "phone": "0381 2355069",
    "bloodGroups": [
      "AB-",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Military Hospital",
    "lat": 27.152822,
    "lng": 77.999201,
    "address": "Idgah Colony, Agra, Uttar Pradesh 282001",
    "phone": "0562 2452712",
    "bloodGroups": [
      "AB-",
      "AB+",
      "B-",
      "O+",
      "B+",
      "A+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Samarpan Blood Bank",
    "lat": 27.19704,
    "lng": 77.997713,
    "address": "Samarpan Bhawan\r\nDelhi Gate",
    "phone": "0562 2855080, 0562 4004644",
    "bloodGroups": [
      "O-",
      "A+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 27.17064,
    "lng": 78.010456,
    "address": "MG Road, Chhipitola, Rakabganj, Agra\r\n",
    "phone": "0562 2463043",
    "bloodGroups": [
      "O+",
      "B+",
      "AB-",
      "AB+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "S.N. Medical College",
    "lat": 27.188073,
    "lng": 78.006357,
    "address": "Meerut",
    "phone": "05622 260353",
    "bloodGroups": [
      "B+",
      "AB+",
      "B-",
      "A-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Agra City Blood Bank",
    "lat": 27.179146,
    "lng": 78.002405,
    "address": "71, M.G. Road, Opposite to  Subhash Park",
    "phone": "0562 2262122",
    "bloodGroups": [
      "B+",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Goyal Jan Suvidha Charitable Blood Bank",
    "lat": 27.198683,
    "lng": 78.003769,
    "address": "Sanjay Place",
    "phone": "0562 3255164",
    "bloodGroups": [
      "O+",
      "AB-",
      "A+",
      "B+",
      "O-",
      "A-",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Life Line Charitable Blood Bank",
    "lat": 28.33669,
    "lng": 79.420104,
    "address": "156 A, Gulab Rai Marg, Delhi Gate",
    "phone": "9997031902",
    "bloodGroups": [
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Pushpanjali Hospital and Research Centre Private limited",
    "lat": 27.198608,
    "lng": 77.995402,
    "address": "Delhi Gate",
    "phone": "0562 4024000",
    "bloodGroups": [
      "B-",
      "O+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Sanjeevani Charitable Blood Bank ",
    "lat": 27.204177,
    "lng": 78.003361,
    "address": "A Unit of Sanjeevani Charitable Trust, 2/42A, Ramnagar Colony, Church Road",
    "phone": "0562 2858573",
    "bloodGroups": [
      "O-",
      "O+"
    ]
  },
  {
    "name": " Lokhitam Blood Bank",
    "lat": 27.215043,
    "lng": 78.02117,
    "address": "D-520, Kamla Nagar",
    "phone": "0562 3276700, 0562 22883111",
    "bloodGroups": [
      "B+",
      "B-",
      "O+",
      "AB-",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "G.R. Hospital and Research Centre Private limited",
    "lat": 27.12969,
    "lng": 78.052565,
    "address": "Near Bhole Baba Dairy, Barauli Ahir, Shamsabad Road",
    "phone": "9027111947",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Pushpa Maa Samaj Charitable Blood bank",
    "lat": 27.21103,
    "lng": 77.989507,
    "address": "1st Floor, Gihar Complex, Khandari, X-ing, NH - 2,",
    "phone": "0562 6451121",
    "bloodGroups": [
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Sri Jagdamba Charitable Blood Bank and Component",
    "lat": 27.203435,
    "lng": 78.046861,
    "address": "D-101, Phase-2, Trans Yamuna Colony,",
    "phone": "0562 6541977, 0562 3259291",
    "bloodGroups": [
      "A+",
      "AB-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Malkhan Singh, District Hospital Blood Bank",
    "lat": 27.889079,
    "lng": 78.071255,
    "address": "Rasalganj Road, City, Aligarh",
    "phone": "0571 2523338",
    "bloodGroups": [
      "AB-",
      "O-",
      "AB+",
      "A-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "J.N. Medical College Blood Bank",
    "lat": 27.918377,
    "lng": 78.088725,
    "address": "AMU Aligarh\r\n",
    "phone": "0571 2720016, 0571 2721113, 0571 2720014",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Dev Hospital Blood Bank",
    "lat": 27.616404,
    "lng": 78.055196,
    "address": "18/205, Sarai Khirni, Agra Road",
    "phone": "0571 2410061",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Jeevan Sanjeevan Blood Bank, Jeevan Hospital",
    "lat": 27.882584,
    "lng": 78.082163,
    "address": "2/151, Bela marg, Vishnupuri",
    "phone": "0571 2506162",
    "bloodGroups": [
      "AB-",
      "A+",
      "B+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "S.R.N. Hospital, M.L. N. Medical College",
    "lat": 25.456005,
    "lng": 81.852791,
    "address": "Hanuman Mandir, Swarooprani Hospital, North Malaka",
    "phone": "0532 2256507",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Military Hospital Blood Bank",
    "lat": 25.46047,
    "lng": 81.814778,
    "address": "Mahoba",
    "phone": "",
    "bloodGroups": [
      "AB+",
      "O+",
      "B-",
      "O-",
      "AB-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Moti Lal Nehru District Hospital Blood Bank",
    "lat": 25.439232,
    "lng": 81.8286,
    "address": "12 Dr. Katjoo Road, Allahabad Near Railway Station\r\n",
    "phone": "0532 2240031",
    "bloodGroups": [
      "A+",
      "AB+"
    ]
  },
  {
    "name": "AMA (Allahabad Medical Association) Blood Bank",
    "lat": 25.468205,
    "lng": 81.844042,
    "address": "Stanely Road, Allahabad\r\n",
    "phone": "0532 2266513",
    "bloodGroups": [
      "AB+",
      "O-",
      "B+",
      "A-",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Mahamaya Rajkiya Allopathic Medical College",
    "lat": 26.509125,
    "lng": 82.6139,
    "address": "Mahamaya Rajkiya Allopathic Medical College, Saddarpur Tanda \r\n",
    "phone": "05273 213000",
    "bloodGroups": [
      "B-",
      "O+",
      "A+",
      "AB+",
      "B+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "District Combined Hospital Blood Bank",
    "lat": 28.946386,
    "lng": 77.21707,
    "address": "Bhajan Vihar, Baghpat",
    "phone": "",
    "bloodGroups": [
      "A+",
      "O+",
      "O-",
      "AB+",
      "B+",
      "A-",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 27.572408,
    "lng": 81.605903,
    "address": "Friganj, Bahraich",
    "phone": "05252 237265",
    "bloodGroups": [
      "AB+",
      "B-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 25.750805,
    "lng": 84.147468,
    "address": "District Hospital Blood Bank\r\n",
    "phone": "8382957867",
    "bloodGroups": [
      "AB-",
      "O-",
      "A+",
      "B+",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Combined District Hospital Blood Bank",
    "lat": 27.409812,
    "lng": 82.192775,
    "address": "Combined District Hospital, Balrampur\r\n",
    "phone": "05263 235776",
    "bloodGroups": [
      "O-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 25.48931,
    "lng": 80.334888,
    "address": "District Hospital, Banda\r\n",
    "phone": "05192 220415",
    "bloodGroups": [
      "A+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Hind Institute of Medical Sciences",
    "lat": 26.906812,
    "lng": 81.122637,
    "address": "Near Minar Canal, Safedabad-Faizabad Road",
    "phone": "05248 221399",
    "bloodGroups": [
      "O-",
      "AB-",
      "A-",
      "A+",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Mayo Institute of Medical Sciences Blood Bank",
    "lat": 26.909607,
    "lng": 81.141778,
    "address": "Run by Bodhisatva Charitable Trust, Faizabad Road, Gadia aizabad Road, Gadia, Barabanki, Dharsani",
    "phone": "05248 229696, 05248 229595",
    "bloodGroups": [
      "O+",
      "AB-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Military Hospital Blood Bank",
    "lat": 28.332012,
    "lng": 79.426081,
    "address": "Hamirpur",
    "phone": "0581 2403584",
    "bloodGroups": [
      "O+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 28.361399,
    "lng": 79.416409,
    "address": "Civil Lines, Bareilly, Uttar Pradesh\r\n",
    "phone": "0581 2550009",
    "bloodGroups": [
      "O-",
      "A-",
      "A+",
      "B+",
      "AB+",
      "AB-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Ganga Sheel Charitable Trust Blood Bank",
    "lat": 28.347944,
    "lng": 79.426794,
    "address": " A-3, Rampur Garden",
    "phone": "0581 2510083, 0581 2510140",
    "bloodGroups": [
      "A+",
      "A-",
      "B-",
      "O-",
      "B+",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Sri Ram Murti Samarak Institute of Medical Sciences Blood Bank",
    "lat": 28.481101,
    "lng": 79.443201,
    "address": "Bareilly - Nainital Road, Bhojipura, Bareilly, Uttar Pradesh",
    "phone": "0581 2582014-25",
    "bloodGroups": [
      "B-",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Ruhelkhand Medical College and Hospital Blood Bank",
    "lat": 28.380191,
    "lng": 79.462087,
    "address": "Pilibhit By Pass Road",
    "phone": "0581 2526011, 0581 2526012",
    "bloodGroups": [
      "B+",
      "O-",
      "B-",
      "A+",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Clara Swain Mission Hospital Blood Bank",
    "lat": 28.349627,
    "lng": 79.415881,
    "address": "Civil Lines, Bareilly",
    "phone": "0581 2500000",
    "bloodGroups": [
      "B-",
      "A-",
      "A+",
      "O+",
      "O-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "IMA Blood Bank",
    "lat": 28.346917,
    "lng": 79.424735,
    "address": "IMA Bhawan, 110, Civil Lines",
    "phone": "0581 2422900",
    "bloodGroups": [
      "O+",
      "O-"
    ]
  },
  {
    "name": "IMA Blood Bank",
    "lat": 28.346917,
    "lng": 79.424734,
    "address": "Run by Indian Medical Association, Civil Lines",
    "phone": "",
    "bloodGroups": [
      "A+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Rajshree Medical Research Institute",
    "lat": 28.48308,
    "lng": 79.285312,
    "address": "21 Km Near Toll Plaza, Rampur Road Bareilly",
    "phone": "8192000281",
    "bloodGroups": [
      "A-",
      "A+",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 26.800773,
    "lng": 82.759197,
    "address": "Bhinga",
    "phone": "05542 283273",
    "bloodGroups": [
      "O+",
      "AB-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "M/s Sewa Blood Bank",
    "lat": 26.7800781,
    "lng": 82.76441135,
    "address": "R.K. Puram, Near Kotwali",
    "phone": "5542209030",
    "bloodGroups": [
      "A+",
      "A-",
      "B-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "OPEC Hospital Blood Bank",
    "lat": 26.779101,
    "lng": 82.762356,
    "address": "OPEC Hospital, Basti\r\n",
    "phone": "05542 283021",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 29.384974,
    "lng": 78.136521,
    "address": "Lakhimpur Khiri",
    "phone": "01342 262710",
    "bloodGroups": [
      "AB-",
      "O+",
      "B-",
      "A-",
      "AB+",
      "O-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Sarvodaya Jankalyan Samati",
    "lat": 26.005074,
    "lng": 81.044749,
    "address": "Near Exchange, Kalagarh Road, Dharmpur",
    "phone": "04344 230464, 04334 233533",
    "bloodGroups": [
      "O-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 28.027732,
    "lng": 79.126275,
    "address": "Bareilly",
    "phone": "05832 266264",
    "bloodGroups": [
      "AB+",
      "B+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Babu Banarasi Das District Hospital Blood Bank",
    "lat": 28.728373,
    "lng": 77.468591,
    "address": "Gonda",
    "phone": "05732 254633",
    "bloodGroups": [
      "O+",
      "A+"
    ]
  },
  {
    "name": "NAPS (Narora Atomic Power Station) Hospital Blood Bank",
    "lat": 28.205915,
    "lng": 78.379131,
    "address": "Narora",
    "phone": "05734 222261",
    "bloodGroups": [
      "A-",
      "B+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Combined District Hospital Blood Bank",
    "lat": 25.196167,
    "lng": 80.914609,
    "address": "Combined District Hospital\r\n",
    "phone": "05198 236555",
    "bloodGroups": [
      "B-",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 26.495682,
    "lng": 83.781488,
    "address": "Saket Nagar, Deoria",
    "phone": "05568 227691",
    "bloodGroups": [
      "B-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Dr. Bhimrao Ambedkar Combined Hospital (District Hospital)",
    "lat": 26.787903,
    "lng": 79.005523,
    "address": "Civil Lines, Etawah\r\n",
    "phone": "05688 255526",
    "bloodGroups": [
      "AB-",
      "A-",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Rural Institute of Medical Sciences and Research",
    "lat": 26.96145,
    "lng": 78.962055,
    "address": "Safai",
    "phone": "05688 276563",
    "bloodGroups": [
      "A+",
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 26.777679,
    "lng": 82.141614,
    "address": "Shahjahanpur",
    "phone": "05278 220078",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Chandan Diagnostics Center and Blood Bank",
    "lat": 26.774399,
    "lng": 82.143734,
    "address": "Mukut Complex Near District Hospital Rakabganj, Lajpat Nagar, Faizabad",
    "phone": "",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 25.936333,
    "lng": 80.813799,
    "address": "Azamgarh",
    "phone": "9719429909",
    "bloodGroups": [
      "AB-",
      "O-",
      "O+",
      "A+",
      "AB+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Shyam Nursing Home and Blood Bank",
    "lat": 25.930647,
    "lng": 80.800955,
    "address": "400/761, Civil Line (Near S.P. Residence)",
    "phone": "05180 221166",
    "bloodGroups": [
      "B-",
      "O+"
    ]
  },
  {
    "name": "SNM, District Hospital Blood Bank",
    "lat": 27.157627,
    "lng": 78.389439,
    "address": "Rehna Road, Bypass Road Company Baag, Arya Nagar\r\n",
    "phone": "9639011119",
    "bloodGroups": [
      "AB+",
      "A-",
      "B+",
      "B-",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Jeevan Dhara Blood Bank",
    "lat": 27.160557,
    "lng": 78.398609,
    "address": "8 Buddh Ashram, Bye Paas Road",
    "phone": "",
    "bloodGroups": [
      "A-",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Dr. M.C. Agrawal Hospital and Research Centre Private limited",
    "lat": 27.159652,
    "lng": 78.403521,
    "address": "Kotla Chungi, Bye Pass Road",
    "phone": "",
    "bloodGroups": [
      "B-",
      "AB+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "F.H. Hospital Blood Bank",
    "lat": 27.230412,
    "lng": 78.212065,
    "address": "Near Etmadpur, Railway over Bridge NH-2, Tundla District, Firozabad",
    "phone": "08477936666, 08194005712",
    "bloodGroups": [
      "B-",
      "AB+",
      "B+",
      "A+",
      "AB-",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Sevarth Sansthan Blood Bank",
    "lat": 27.23053,
    "lng": 78.21226,
    "address": "Sevarth Sansthan Seth Bimal Kumar Jain Trauma and Phsytherapy Dharmarth Samiti, NH-2, Agra Road",
    "phone": "05612 240022, 05612 240033",
    "bloodGroups": [
      "AB+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Naveen Hospital",
    "lat": 28.477615,
    "lng": 77.518568,
    "address": "Railway Road",
    "phone": "0120 2321356",
    "bloodGroups": [
      "A-",
      "O-",
      "AB-",
      "O+",
      "B-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Sharda Hospital Blood Bank",
    "lat": 28.474444,
    "lng": 77.4827,
    "address": "Plot No. 32-34, Knowledge Park-III",
    "phone": "0120 3212361",
    "bloodGroups": [
      "AB-",
      "O-",
      "A-",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Kailash Hospital Llimited",
    "lat": 28.577474,
    "lng": 77.331606,
    "address": " A unit of Kailash Group of Hospitals Limited, 23 KP-1, NEAR PARI CHOWK",
    "phone": "0120 2327338, 0120 2327339",
    "bloodGroups": [
      "O+",
      "B+",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Shri Krishna Life Line Hospital Blood Bank ",
    "lat": 28.460872,
    "lng": 77.532452,
    "address": "NH-22D, Sector Tau Swarn Nagri, Greater Noida, Gautam Buddha Nagar",
    "phone": "120 2399180",
    "bloodGroups": [
      "B-",
      "A+"
    ]
  },
  {
    "name": "Kailash Hospital and Heart Institute ",
    "lat": 28.577472,
    "lng": 77.331603,
    "address": "A Unit of Kailash Healthcare Limited, H-33, Sector-27, Noida",
    "phone": "0120 2444444",
    "bloodGroups": [
      "A+",
      "O-",
      "B+",
      "B-",
      "AB-",
      "A-",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Metro Hospital and Heart Institute",
    "lat": 28.597462,
    "lng": 77.338017,
    "address": "X-1, Sector -12",
    "phone": "0120 2533491,0120 2533489",
    "bloodGroups": [
      "B+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Prayag Hospital and Research Centre",
    "lat": 28.563602,
    "lng": 77.365447,
    "address": "J-206/A-01, Sector-41",
    "phone": "0120 4021900",
    "bloodGroups": [
      "O+",
      "AB+",
      "O-",
      "B+",
      "A-",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Prakash Hospital Blood Bank",
    "lat": 28.58564,
    "lng": 77.34952,
    "address": "D-12, 12-A, 12-B, Sector-33",
    "phone": "0120 2505264",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Rotary Noida Research and Social Welfare Trust Blood Bank",
    "lat": 28.576931,
    "lng": 77.339491,
    "address": "E-2, IMA House, Sector-31, Nithari",
    "phone": "0120 4282685",
    "bloodGroups": [
      "AB-",
      "AB+",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Dr. Bhimrao Ambedkar Multi Specialty Hospital Blood Bank",
    "lat": 28.576565,
    "lng": 77.33745,
    "address": "Sector-30",
    "phone": "09818789357, 09212798250",
    "bloodGroups": [
      "A-",
      "B-",
      "A+",
      "AB+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Yatharth Wellness Super Speciality Hospital and Heart Care Blood Bank",
    "lat": 28.532064,
    "lng": 77.384568,
    "address": "NH-01, Sector-110",
    "phone": "08800797906, 08800797911",
    "bloodGroups": [
      "AB-",
      "B-",
      "O-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Jaypee Hospital Blood Bank",
    "lat": 28.515258,
    "lng": 77.371495,
    "address": "A Unit of Jaypee Healthcare Limited, Sector-128",
    "phone": "0120 4582868",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Santosh Medical and Dental College",
    "lat": 28.670024,
    "lng": 77.432342,
    "address": "Kushinagar",
    "phone": "0120 2791741, 0120 2791735",
    "bloodGroups": [
      "A-",
      "AB-",
      "B+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "MMG, District Hospital Blood Bank",
    "lat": 28.662528,
    "lng": 77.42361,
    "address": "MMG, District Hospital Ghaziabad",
    "phone": "0120 2853030",
    "bloodGroups": [
      "AB-",
      "A+",
      "B-",
      "O-",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Yashoda Hospital and Research",
    "lat": 28.66037,
    "lng": 77.442026,
    "address": "3rd M Nehru Nagar ",
    "phone": "0120 4182000, ext.128",
    "bloodGroups": [
      "O+",
      "O-"
    ]
  },
  {
    "name": "Life Line Blood Bank",
    "lat": 28.669238,
    "lng": 77.440304,
    "address": "Life Line Blood Bank 3rd B2 Nehru Nagar\r\n",
    "phone": "0120 2793989",
    "bloodGroups": [
      "AB+",
      "B-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Yashoda Hospital and Research Centre Limited, Kaushambi",
    "lat": 28.659996,
    "lng": 77.438403,
    "address": "H-1, Kaushambi, Near Dabur Chowk, Ghaziabad",
    "phone": "0120 4181900",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Lok Priya Hospital Blood Bank",
    "lat": 28.968368,
    "lng": 77.730589,
    "address": " G.T. Road, Modinagar",
    "phone": "01232 247556",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Pushpanjali Crossley Hospital (Max Superspeciality Hospital, Vaishali)",
    "lat": 28.634769,
    "lng": 77.333007,
    "address": "W-3, Sector-I, Vaishali",
    "phone": "0120 4173042",
    "bloodGroups": [
      "AB-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "M/s Shanti Gopal Hospital Blood Bank",
    "lat": 28.641918,
    "lng": 77.379325,
    "address": "Plot No. NH-1, Ahinsa Khand-II, Indrapuram",
    "phone": "0120 4777000",
    "bloodGroups": [
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Divya Joyati Institute Of Medical Science & Research",
    "lat": 28.830657,
    "lng": 77.570159,
    "address": "Niwari Road, Road, Modinagar\r\n",
    "phone": "9368564762",
    "bloodGroups": [
      "O+",
      "B+",
      "B-",
      "A-",
      "AB+",
      "O-",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Family Health Care Hospital Blood Bank",
    "lat": 28.652652,
    "lng": 77.360171,
    "address": "15-H.C. -1 Vasundhara, Gaziabad, Uttar Pradesh",
    "phone": "0120 4225556",
    "bloodGroups": [
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Atlanta Mediworld Multispeciality Hospital",
    "lat": 28.657847,
    "lng": 77.360777,
    "address": "NH-1, Sector-14, Vasundhara",
    "phone": "1204735555-1302",
    "bloodGroups": [
      "B+",
      "A+",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Dev Nandani Hospital Blood Bank",
    "lat": 28.728814,
    "lng": 77.792219,
    "address": "Near Railway Crossing, Garh Road",
    "phone": "0122 3200800",
    "bloodGroups": [
      "AB+",
      "O+",
      "A+",
      "B-",
      "AB-",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Rama Medical College and Research Centre Blood Bank ",
    "lat": 28.69787,
    "lng": 77.607979,
    "address": "Run by Rama Educational Society, Rama Delhi NH-24 [38km milestone] Hapur",
    "phone": "0122 2327300",
    "bloodGroups": [
      "AB+",
      "O+",
      "O-",
      "B-",
      "AB-",
      "A-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Narinder Mohan Hospital and Heart Centre",
    "lat": 28.666671,
    "lng": 77.439269,
    "address": "Mohan Nagar, Ghaziabad.\r\n",
    "phone": "0120 2657501-505, EXT No- 340",
    "bloodGroups": [
      "O+",
      "A-",
      "B-",
      "B+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 25.582008,
    "lng": 83.582114,
    "address": "District Hospital, Gazipur\r\n",
    "phone": "",
    "bloodGroups": [
      "B-",
      "AB+",
      "O+",
      "AB-",
      "B+",
      "A+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 27.409813,
    "lng": 82.192774,
    "address": "Balrampur",
    "phone": "05262 225358",
    "bloodGroups": [
      "O+",
      "B-",
      "AB+",
      "A+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "City Blood Bank",
    "lat": 26.753844,
    "lng": 83.364532,
    "address": "Pratibha Complex,  Infront of Jubilee Inter School, Jublee Nagar ",
    "phone": "0551 2346357",
    "bloodGroups": [
      "AB+",
      "O+",
      "O-",
      "A-",
      "B+",
      "A+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Air Force Hospital Blood Bank",
    "lat": 26.759066,
    "lng": 83.420833,
    "address": "Maharajganj",
    "phone": "0551 2272381",
    "bloodGroups": [
      "B-",
      "O+",
      "A-",
      "AB-",
      "AB+",
      "B+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Nehru Hospital and B.R.D. Medical College",
    "lat": 26.813424,
    "lng": 83.400296,
    "address": "Gorakhpur",
    "phone": "0551 2508815, 0551 2508814",
    "bloodGroups": [
      "O-",
      "A+",
      "O+",
      "B+",
      "AB-",
      "AB+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Guru Shri Gorakhnath Chikitsalaya Blood Bank",
    "lat": 26.776322,
    "lng": 83.357794,
    "address": " Gorakhnath Mandir",
    "phone": "0551 2257138, 0551 2257570",
    "bloodGroups": [
      "O+",
      "O-",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Fatima Hospital Blood Bank",
    "lat": 26.787217,
    "lng": 83.400142,
    "address": "Padri Bazar",
    "phone": "0551 2281862",
    "bloodGroups": [
      "O-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Savitri Blood Bank and Component Centre",
    "lat": 26.758493,
    "lng": 83.364814,
    "address": "Savitri Hospital Campus, Dilezakpur, Cinema Road\r\n",
    "phone": " 0551 2205914, 0551 220915, 0551 2205916",
    "bloodGroups": [
      "AB-",
      "A+",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Saraswathi Institute of Medical Science",
    "lat": 28.713701,
    "lng": 77.692994,
    "address": "NH-24, Anwarpur Pilkhuwa",
    "phone": "0122 2320511",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 27.395757,
    "lng": 80.134659,
    "address": "Gorakhpur",
    "phone": "9670783667",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Bagla Combined District Hospital Blood Bank",
    "lat": 27.599857,
    "lng": 78.049858,
    "address": "",
    "phone": "05722 230094",
    "bloodGroups": [
      "B+",
      "B-"
    ]
  },
  {
    "name": "Government Medical College and Hospital Blood Bank",
    "lat": 25.999845,
    "lng": 79.473401,
    "address": "Government Medical College and Hospital, Orai",
    "phone": "05162 210201",
    "bloodGroups": [
      "O+",
      "AB-",
      "B-",
      "A-",
      "O-",
      "B+",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 25.759674,
    "lng": 82.696747,
    "address": "Ghaziabad",
    "phone": "05452 263554",
    "bloodGroups": [
      "B-",
      "O-",
      "A-",
      "B+",
      "A+",
      "AB-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "M/s Isha Hospital Blood Bank",
    "lat": 25.733137,
    "lng": 82.672548,
    "address": "Haribandhanpur Parav",
    "phone": "07535945945, 07534945945",
    "bloodGroups": [
      "AB+",
      "B+",
      "O+",
      "O-",
      "A+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Sant Diagnostic Centre and Blood Bank",
    "lat": 25.45845516,
    "lng": 78.61560658,
    "address": "25/1A, Sant Bhawan, Opposite to MLB Medical College, Between Gate no -1 & 2, Kanpur Road Jhansi",
    "phone": "0510 2320831",
    "bloodGroups": [
      "B+",
      "AB+",
      "B-",
      "A+"
    ]
  },
  {
    "name": "MLB Medical College and Hospital",
    "lat": 25.459045,
    "lng": 78.615934,
    "address": "Bundelkhand University,\r\nJhansi.",
    "phone": "9450939194",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 25.457843,
    "lng": 78.57868,
    "address": "Shivpuri Road, Rajghat Colony, Jhansi.",
    "phone": "0510 2448442",
    "bloodGroups": [
      "O-",
      "AB-"
    ]
  },
  {
    "name": "St. Judes Hospital Blood Bank",
    "lat": 25.462874,
    "lng": 78.547451,
    "address": "St. Judes Hospital Campus,\r\n Sipri, Jhansi",
    "phone": "0510 2360957",
    "bloodGroups": [
      "B-",
      "A-",
      "AB-",
      "O+",
      "AB+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Nirmal Hospital Blood Bank",
    "lat": 25.460278,
    "lng": 78.617827,
    "address": "Opposite Medical College Gate No.-03",
    "phone": "0510 2322028",
    "bloodGroups": [
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Parakh Voluntary Blood Bank ",
    "lat": 25.458336,
    "lng": 78.616978,
    "address": "Run by Samagra Vikash Jan Kalyan Samiti, Karguawaji Road, Opposite Gate No.-2",
    "phone": "0510 2321134",
    "bloodGroups": [
      "AB-",
      "A-",
      "B+",
      "B-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Combined District Hospital Blood Bank",
    "lat": 27.118091,
    "lng": 79.712484,
    "address": "Combined District Hospital, Kannauj",
    "phone": "05694 237627",
    "bloodGroups": [
      "A-",
      "O-",
      "B-",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "B.S.D.B.A. Government Medical College and Hospital",
    "lat": 26.963334,
    "lng": 79.792236,
    "address": "Tirwa - Kannauj Road, Tirwa, NH 91A, Nunari\r\n",
    "phone": "9415527666",
    "bloodGroups": [
      "AB+",
      "O+",
      "O-",
      "A+",
      "B+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Combined District Hospital (M) Blood Bank",
    "lat": 26.380489,
    "lng": 26.380489,
    "address": "Akbarpur, Kanpur Dehat ",
    "phone": "05111 270728",
    "bloodGroups": [
      "O+",
      "A-"
    ]
  },
  {
    "name": "Mariampur Hospital and Blood Bank",
    "lat": 26.465207,
    "lng": 80.305556,
    "address": "Shastri Nagar",
    "phone": "0512 216788",
    "bloodGroups": [
      "AB+",
      "A+",
      "B-",
      "B+",
      "O-",
      "A-",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Life Line Blood Bank",
    "lat": 26.479559,
    "lng": 80.299895,
    "address": " B-1, Sarvoday Nagar",
    "phone": "0512 2295797, 0512 2219473",
    "bloodGroups": [
      "O+",
      "B+",
      "O-",
      "A+",
      "AB-",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Regency Hospital Limited",
    "lat": 26.479223,
    "lng": 80.316263,
    "address": " A-2, Sarvodaya Nagar",
    "phone": "0512 2242201-10",
    "bloodGroups": [
      "A+",
      "O-",
      "O+",
      "AB+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "GSVM Medical College Blood Bank",
    "lat": 26.481102,
    "lng": 80.307684,
    "address": "Swaroop Nagar, Kanpur",
    "phone": "7706922922",
    "bloodGroups": [
      "AB+",
      "B+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Sanjeevani Blood Bank",
    "lat": 26.486118,
    "lng": 80.290276,
    "address": " 117/O 461 ,Geeta Nagar, Kanpur",
    "phone": "8005192796",
    "bloodGroups": [
      "A+",
      "A-",
      "O-",
      "B+",
      "B-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Sneh Pathology X-ray and Blood Bank",
    "lat": 26.439394,
    "lng": 80.33679,
    "address": "133/10, O-Block, Kidwai Nagar",
    "phone": "0512 2601408",
    "bloodGroups": [
      "B-",
      "A-",
      "B+",
      "O-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "UHM, District Hospital",
    "lat": 26.474045,
    "lng": 80.346099,
    "address": "Shop No. 30/01, Mall Rd, Bada Chouraha, Parade Chouraha, Parade, Kanpur",
    "phone": "0512 2311144",
    "bloodGroups": [
      "B+",
      "AB-",
      "O+",
      "O-",
      "AB+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Air Force Hospital",
    "lat": 26.446739,
    "lng": 80.375727,
    "address": " Nathu Singh Road, Saharanpur",
    "phone": "0581 2403584",
    "bloodGroups": [
      "A-",
      "B-",
      "O-"
    ]
  },
  {
    "name": "CLM Hospital and Blood Bank",
    "lat": 26.463772,
    "lng": 80.296612,
    "address": "121/625, Industrial Estate, Shastri Nagar",
    "phone": "0512 2241595",
    "bloodGroups": [
      "AB-",
      "AB+",
      "A-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Sai Blood Bank",
    "lat": 26.433311,
    "lng": 80.322243,
    "address": "N-2, Kidwai Nagar",
    "phone": "0512 2607720",
    "bloodGroups": [
      "O-",
      "AB+",
      "B+",
      "A-",
      "B-",
      "O+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Rama Medical College Hospital and Research Centre",
    "lat": 26.567295,
    "lng": 80.220837,
    "address": "Rama Medical College Hospital & Research Centre,\r\nBlood Bank, GT Road, Mandhana, Kanpur",
    "phone": "0512 2780882, 0512 2780886",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "LPS Institute of Cardiology",
    "lat": 26.481154,
    "lng": 80.303811,
    "address": "Mall Road, Sarvodaya Nagar",
    "phone": "0512 2532269",
    "bloodGroups": [
      "AB+",
      "B-",
      "O-",
      "A+",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Tulsi Hospital Limited",
    "lat": 26.479826,
    "lng": 80.344033,
    "address": "14/116-A, Civil Lines",
    "phone": "0512 2536404, 0512 2536406",
    "bloodGroups": [
      "A+",
      "B-",
      "AB+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Krishna Super Speciality Hospital ",
    "lat": 26.448475,
    "lng": 80.344084,
    "address": "A Unit of Gita Healthcare Private Limited, 363, Harrisganj, Near Tatmil Chauraha",
    "phone": "0512 2320061, 0512 2320071",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "SPM Hospital Research and Trauma Centre Blood Bank",
    "lat": 26.501131,
    "lng": 80.257486,
    "address": " A Unit of Tyco Hospitals Private Ltimited, C-48, Kalyanpur",
    "phone": "0512 2570553",
    "bloodGroups": [
      "AB-",
      "O-",
      "A-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Combined District Hospital",
    "lat": 25.361049,
    "lng": 81.403171,
    "address": "Manjhanpur",
    "phone": "05331 232030",
    "bloodGroups": [
      "A-",
      "AB-"
    ]
  },
  {
    "name": "District Hospital",
    "lat": 27.945898,
    "lng": 80.784474,
    "address": "Auriya",
    "phone": "9415543070",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "District Hospital",
    "lat": 24.696225,
    "lng": 78.412323,
    "address": "Chitrakoot",
    "phone": "05176 272343",
    "bloodGroups": [
      "AB+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Career Institute of Medical Sciences and Hospital Blood Bank ",
    "lat": 26.91543,
    "lng": 80.909715,
    "address": "A Unit of Career Convent Education and Charitable Trust, Sitapur-Hardoi Bypass Road, Near IIM",
    "phone": "0522 2960429, 0522 2960439",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Indira Diagnostic and Blood Bank Limited",
    "lat": 26.870091,
    "lng": 80.971582,
    "address": " Sanjay Gandhi Puram, Faizabad Road",
    "phone": "0522 2380084",
    "bloodGroups": [
      "B-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Sanjay Gandhi Post-Graduate Institute (SGPGI)",
    "lat": 26.742135,
    "lng": 80.945981,
    "address": "Department of Transfusion Medicine, Sanjay Gandhi Postgraduate Institute of Medical Sciences, Rae Bareli Road",
    "phone": "0522 2494500, 0522 2495341",
    "bloodGroups": [
      "A-",
      "O+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Sh. Chattrapati Shivaji Maharaj Chikitsalaya University",
    "lat": 26.813839,
    "lng": 80.904558,
    "address": "KGMU, Lucknow",
    "phone": "9335349791",
    "bloodGroups": [
      "A+",
      "O+",
      "A-",
      "AB+",
      "AB-",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Balrampur Hospital Blood Bank",
    "lat": 26.856601,
    "lng": 80.926431,
    "address": "Balrampur Hospital, Chakbast Road, Qaiserbagh, Lucknow, Uttar Pradesh",
    "phone": "0522 22624040, 0522 2629949",
    "bloodGroups": [
      "A+",
      "B+",
      "O-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Command Hospital Blood Bank",
    "lat": 26.81745,
    "lng": 80.940818,
    "address": "Faizabad",
    "phone": "0522 2296288",
    "bloodGroups": [
      "A+",
      "O+",
      "O-",
      "A-",
      "B-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Dr. Shyama Prasad Mukharjee Civil Hospital",
    "lat": 26.844593,
    "lng": 80.948999,
    "address": "Gorakhpur",
    "phone": "0522 2239595",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Vivekanand Polyclinic and Institute of Medical Sciences",
    "lat": 26.875283,
    "lng": 80.942804,
    "address": "Vrindaban",
    "phone": "0522 2328942, 0522 2321277",
    "bloodGroups": [
      "B-",
      "AB-",
      "A+",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Kohli Blood Bank and Components Private limited",
    "lat": 26.865274,
    "lng": 80.911431,
    "address": "2nd Floor, A-Block, Kanchan Market, Chowk",
    "phone": "0522 2259004",
    "bloodGroups": [
      "AB+",
      "O-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Eras Medical College and Hospital Blood Bank",
    "lat": 26.878389,
    "lng": 80.872448,
    "address": "Sarfaraj Ganj, Musabag, Picnic Spot-Hardoi Road",
    "phone": "0522 2408122,0522 2408123",
    "bloodGroups": [
      "B-",
      "AB-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Shekhar Hospital Private Limited Blood Bank",
    "lat": 26.876188,
    "lng": 80.985528,
    "address": "B Block, Church Road, Indira Nagar, Lucknow",
    "phone": "0522 2352352, 05224927272",
    "bloodGroups": [
      "B+",
      "A-",
      "AB+",
      "O-",
      "O+",
      "AB-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Nidan Diagnostic Centre and Blood Bank",
    "lat": 26.854084,
    "lng": 80.995132,
    "address": "4/31, Captan Manoj Pandey Chauraha, Vivek Khand, Gomti Nagar",
    "phone": "0522 2393390",
    "bloodGroups": [
      "AB+",
      "O+",
      "A-",
      "B-",
      "A+",
      "O-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Dr Ram Manohar Lohia Institute of Medical Sciences",
    "lat": 26.86889,
    "lng": 80.999691,
    "address": "Gomati Nagar",
    "phone": "09997031902, 09897766466",
    "bloodGroups": [
      "AB+",
      "B+",
      "AB-",
      "O-",
      "O+"
    ]
  },
  {
    "name": "St. Joseph Hospital Blood Bank",
    "lat": 26.854293,
    "lng": 80.991967,
    "address": "Vishal Khand-5, Gomti Nagar",
    "phone": "0522 4054247",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "B.N.K. Hospital Blood Bank",
    "lat": 26.879585,
    "lng": 80.932757,
    "address": "B-1/196 Nirala Nagar, Lucknow",
    "phone": "0522 4049945",
    "bloodGroups": [
      "AB+",
      "B+",
      "B-",
      "AB-",
      "O-",
      "A+",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Lucknow Nursing Home Association Blood Bank",
    "lat": 26.878474,
    "lng": 80.938496,
    "address": "c 228, Officers Colony, Nirala Nagar",
    "phone": "0522 4070185",
    "bloodGroups": [
      "A-",
      "AB-",
      "O-",
      "B+",
      "B-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Sahara Hospital Blood Bank",
    "lat": 26.850106,
    "lng": 81.023867,
    "address": "Viraj Khand, Gomati Nagar",
    "phone": "0522 6781680, 0522 6781683",
    "bloodGroups": [
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Divine Heart Hospital and Research Centre Blood Bank",
    "lat": 26.859198,
    "lng": 81.023215,
    "address": "Viraj Khand, Institutional Area - 5, Gomti Nagar",
    "phone": "0522 2721991, 0522 2721995",
    "bloodGroups": [
      "A+",
      "B+",
      "AB+",
      "O-",
      "A-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Nova Hospital Limited",
    "lat": 26.850001,
    "lng": 80.983334,
    "address": "Patrakarpuram Crossing Vikash Khand-1,Gomti Nagar",
    "phone": "0522 2300024",
    "bloodGroups": [
      "B-",
      "A+"
    ]
  },
  {
    "name": "Fatima Hospital Blood bank",
    "lat": 26.871551,
    "lng": 80.952133,
    "address": " 35-C, Mahanagar Colony",
    "phone": "0522 2961196, 0522 2323195",
    "bloodGroups": [
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Dr O P Choudhery Hospital Blood Bank",
    "lat": 26.785201,
    "lng": 80.973148,
    "address": "Chaudhary Vihar, Raibarely Road",
    "phone": "0522 2441172",
    "bloodGroups": [
      "O-",
      "AB-",
      "B+",
      "O+",
      "A+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Integral Institute of Medical Sciences and Research Blood Bank",
    "lat": 26.957942,
    "lng": 81.002588,
    "address": "Kursi Road, Lucknow",
    "phone": "0522 2890730, 0522 2890812",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Medison Hospital Private Limited Blood Bank",
    "lat": 26.90491,
    "lng": 80.959052,
    "address": "Medison Hospital & Blood Bank, UGF,D3 Durgapuram Colony Sector 13 VikasNagar, Near Goel Motors,Near Tedhi Pulia,Ring Road",
    "phone": "0522 2739917, 0522 2739918",
    "bloodGroups": [
      "B-",
      "B+",
      "A+",
      "O-",
      "AB-",
      "O+",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Fehmina Hospital and Blood Bank",
    "lat": 26.854943,
    "lng": 80.90488,
    "address": "Victoriaganaj, Near Sunni Inter College, Tulsidas marg",
    "phone": "7860059998",
    "bloodGroups": [
      "O-",
      "AB+",
      "AB-",
      "A-",
      "A+",
      "O+",
      "B-",
      "B+"
    ]
  },
  {
    "name": "GCRG Memorial Hospital & Charitable Blood Bank",
    "lat": 26.842776,
    "lng": 80.949164,
    "address": "Village-Parvatpur, Chandrika Devi Road, Bakshi Ka Talab",
    "phone": "9559662557",
    "bloodGroups": [
      "O-",
      "AB-",
      "B-",
      "A-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Charak Hospital and Research Center Blood Bank",
    "lat": 26.872555,
    "lng": 80.871172,
    "address": "Dubagga Hardoi Road, Lucknow",
    "phone": "9415410623",
    "bloodGroups": [
      "A-",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "District Hospital",
    "lat": 25.293146,
    "lng": 79.88485,
    "address": "Makaniya Purva, Mahoba",
    "phone": "",
    "bloodGroups": [
      "B+",
      "AB+",
      "B-",
      "AB-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Agrawal Life Line Hospital and Trauma Centre Blood Bank",
    "lat": 27.435244,
    "lng": 77.701066,
    "address": "Kamdhenu Nagar, Agra Road",
    "phone": "0565 2430857",
    "bloodGroups": [
      "O-",
      "A+",
      "AB-",
      "AB+",
      "O+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "K.D. Medical College Hospital & Research Centre Blood Bank",
    "lat": 27.650459,
    "lng": 77.549915,
    "address": " 24 KM Mile Stone, Mathura-Delhi Road, NH-2, Post-Akbarpur\r\n",
    "phone": "7055400500",
    "bloodGroups": [
      "AB-",
      "B+",
      "AB+",
      "A+",
      "A-",
      "O+",
      "B-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 25.351229,
    "lng": 82.986065,
    "address": "Etah",
    "phone": "0565 2401199",
    "bloodGroups": [
      "AB-",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Rotary Blood Bank, Rotary Point",
    "lat": 27.5117922,
    "lng": 77.654894,
    "address": "Near Alwar Railway Bridge, Delhi-mathura NH-2",
    "phone": "8171911911",
    "bloodGroups": [
      "O-",
      "B+",
      "AB-",
      "B-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Ramakrishna Mission Sevashrama ",
    "lat": 27.571999,
    "lng": 77.694371,
    "address": "Swami Vivekananda Road, Near Anandmayee Maa Temple, Mathura, Vrindaban",
    "phone": "0565 2442310",
    "bloodGroups": [
      "B+",
      "O+",
      "A+",
      "AB+",
      "B-",
      "AB-",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Fatima Hospital Blood Bank",
    "lat": 25.923014,
    "lng": 83.570215,
    "address": "Fatima Hospital, Chandmari Imiliya Road, Maunathbhanjan, Mau",
    "phone": "0547 220943",
    "bloodGroups": [
      "O+",
      "A-",
      "B-",
      "AB+",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Combined District Hospital",
    "lat": 25.921403,
    "lng": 83.563806,
    "address": "Munshi Pura",
    "phone": "9927612995",
    "bloodGroups": [
      "O+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Military Hospital",
    "lat": 28.987584,
    "lng": 77.689042,
    "address": "Pratapgarh",
    "phone": "0121 2643012",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Lokpriya Hospital Blood Bank",
    "lat": 28.968374,
    "lng": 77.730585,
    "address": "Samrat Palace, Garh Road",
    "phone": "0121 2760040",
    "bloodGroups": [
      "AB-",
      "O-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "SVBP Hospital Blood Bank",
    "lat": 28.958429,
    "lng": 77.753433,
    "address": "LLRM Medical College Campus",
    "phone": "0121 2763647",
    "bloodGroups": [
      "A+",
      "B+",
      "B-",
      "O+",
      "AB+",
      "O-",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "P.L. Sharma Hospital Blood Bank",
    "lat": 28.98213,
    "lng": 77.699779,
    "address": "Jali Kothi",
    "phone": "",
    "bloodGroups": [
      "B-",
      "AB+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Subharti Hospital Blood Bank",
    "lat": 28.961414,
    "lng": 77.638197,
    "address": " Meerut by Pass Road",
    "phone": "0121 2439150, 0121 2439112",
    "bloodGroups": [
      "B-",
      "A-",
      "AB-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Sanjeevani Blood Bank",
    "lat": 28.972402,
    "lng": 77.687042,
    "address": "644, Bhagpat Road",
    "phone": "0121 2525864",
    "bloodGroups": [
      "B-",
      "O+",
      "O-",
      "A+",
      "AB+",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Anand Hospital Blood Bank",
    "lat": 28.96181,
    "lng": 77.746366,
    "address": " A-1, Damodar Colony, Garh Road",
    "phone": "0121 2792000",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Jaswant Rai Specialty Hospital Blood Bank",
    "lat": 28.991297,
    "lng": 77.72323,
    "address": "Opposite Sports Stadium, Civil Lines, Mawana Road",
    "phone": "0121 2663888, 0121 2663887, 0121 2651700",
    "bloodGroups": [
      "O+",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Vadhava Blood Bank ",
    "lat": 28.961817,
    "lng": 77.755222,
    "address": "Meerut",
    "phone": "9412746144",
    "bloodGroups": [
      "A-",
      "AB+",
      "B+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 25.154094,
    "lng": 82.577234,
    "address": "Sultanpur",
    "phone": "05442 253092",
    "bloodGroups": [
      "AB+",
      "A-",
      "B+",
      "O-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Pt. Deen Dayal Upadhaya Combined District Hospital",
    "lat": 28.848179,
    "lng": 78.765907,
    "address": "Civil Lines\r\nMoradabad, Uttar Pradesh ",
    "phone": "0591 2410670",
    "bloodGroups": [
      "AB-",
      "B+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Asian Vivekanand Super Specialty Hospital Blood Bank",
    "lat": 28.883923,
    "lng": 78.736882,
    "address": "Faizabad",
    "phone": "0591 2551100",
    "bloodGroups": [
      "O-",
      "AB+",
      "B+",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Dr. Chaturvedi Central Blood Bank",
    "lat": 28.845183,
    "lng": 78.774082,
    "address": "Renukoot",
    "phone": "0591 2413857, 0591 2422395",
    "bloodGroups": [
      "B+",
      "O+",
      "AB-",
      "B-",
      "A-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Sri Sai Hospital and Blood Bank",
    "lat": 28.840201,
    "lng": 78.752813,
    "address": "Mansarovar Scheme, Delhi Road",
    "phone": "0591 2481720",
    "bloodGroups": [
      "O-",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Teerthankar Mahaveer Hospital and Research Centre",
    "lat": 28.822812,
    "lng": 78.65787,
    "address": "N.H. 24, Delhi Road, Bagadpur, Moradabad, Uttar Pradesh 244001",
    "phone": "0591 2476819, 16, 2360777 ",
    "bloodGroups": [
      "B-",
      "AB+",
      "AB-",
      "B+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Cosmos Hospital, Multi Speciality and Trauma Centre",
    "lat": 28.894018,
    "lng": 78.729084,
    "address": "Prem Nagar, P.O.- Kazipura, Kanth Road",
    "phone": "0591 2555500, 0591 2555501",
    "bloodGroups": [
      "O-",
      "A-",
      "AB-",
      "O+",
      "B+",
      "B-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 28.84818,
    "lng": 78.76591,
    "address": "Bank Civil Lines, Moradabad",
    "phone": "",
    "bloodGroups": [
      "A+",
      "A-",
      "O+",
      "AB+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "IMA Blood Bank (Run by Indian Medical Association)",
    "lat": 30.334183,
    "lng": 78.017785,
    "address": " IMA Bhawan, Court Compound",
    "phone": "",
    "bloodGroups": [
      "A-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 29.478774,
    "lng": 77.696912,
    "address": "Banda",
    "phone": "0131 2440407",
    "bloodGroups": [
      "A-",
      "O+",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Muzaffarnagar Medical College and Hospital",
    "lat": 29.372403,
    "lng": 77.706668,
    "address": "Opposite Begrajpur Industrial Area, Ghasipura",
    "phone": "01396 52702",
    "bloodGroups": [
      "O+",
      "A-",
      "AB+",
      "B-",
      "A+",
      "O-",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "District Hospital",
    "lat": 28.630707,
    "lng": 79.816455,
    "address": "Ekta Nagar, Pilibhit ",
    "phone": "9415030192",
    "bloodGroups": [
      "AB+",
      "B-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 25.922103,
    "lng": 81.998641,
    "address": "Barabanki",
    "phone": "9415486482",
    "bloodGroups": [
      "A+",
      "AB+",
      "O+",
      "AB-",
      "B+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 26.222751,
    "lng": 81.23944,
    "address": "Nirala nagar, Raebareli",
    "phone": "",
    "bloodGroups": [
      "AB-",
      "B+",
      "A+",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 28.807443,
    "lng": 79.014396,
    "address": "Lucknow",
    "phone": "0595 2324687",
    "bloodGroups": [
      "A+",
      "A-",
      "AB-",
      "B+",
      "O+",
      "B-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Maulana Mohamad Ali Johar Hospital",
    "lat": 28.818555,
    "lng": 79.060106,
    "address": " Nainital Road",
    "phone": "0595 2341916, 0595 2329242",
    "bloodGroups": [
      "B+",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Tarawati Nursing Home Private Limited Blood Bank",
    "lat": 29.95683,
    "lng": 77.557192,
    "address": " Bajoria Road",
    "phone": "0132 2716003",
    "bloodGroups": [
      "B-",
      "AB-",
      "AB+",
      "O+",
      "B+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "SBD, District Hospital",
    "lat": 29.955375,
    "lng": 77.559465,
    "address": "Bajoria Road \r\n",
    "phone": "0132 2715408",
    "bloodGroups": [
      "O-",
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 26.732839,
    "lng": 83.139134,
    "address": "Khalilabad",
    "phone": "05547 226392",
    "bloodGroups": [
      "O-",
      "AB-",
      "B+",
      "A+",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Jeevan Deep Hospital Private Limited Blood Bank",
    "lat": 25.387859,
    "lng": 82.592757,
    "address": "Indira Mill Crossing, Jeevandeep Road, Jamunipur, SRN Bhadohi",
    "phone": "",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Maharaja Chet Singh District Hospital",
    "lat": 25.358723,
    "lng": 82.464122,
    "address": "Gyanpur",
    "phone": "04414 251406",
    "bloodGroups": [
      "O-",
      "A+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 27.871234,
    "lng": 79.913853,
    "address": "Ambedkar Nagar",
    "phone": "05842 240209",
    "bloodGroups": [
      "O+",
      "A+",
      "B-",
      "A-",
      "AB+",
      "O-",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Swami Vivekanand Charitable Blood Bank",
    "lat": 27.874974,
    "lng": 79.915468,
    "address": "  A unit of Swami Vivekanand Charitable Trust Regd.,   Near Anta Chauraha",
    "phone": "05842 280224",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Hind Institute of Medical Sciences Blood Bank",
    "lat": 27.188717,
    "lng": 80.85432,
    "address": " Atariya, Sitapur",
    "phone": "",
    "bloodGroups": [
      "AB+",
      "B+",
      "O+",
      "O-",
      "AB-",
      "A-",
      "A+"
    ]
  },
  {
    "name": "District Hospital",
    "lat": 27.571025,
    "lng": 80.676905,
    "address": "Nai Basti",
    "phone": "",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A+",
      "B+",
      "O+",
      "O-"
    ]
  },
  {
    "name": "BCM Hospital Blood Bank",
    "lat": 27.530523,
    "lng": 80.745172,
    "address": "Khairabad",
    "phone": "05862 252228, 05862 252850",
    "bloodGroups": [
      "B-",
      "A+",
      "A-",
      "AB-",
      "AB+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Hindalco Hospital Blood Bank",
    "lat": 24.212959,
    "lng": 83.036739,
    "address": "Plant -1 Road, Renukoot",
    "phone": "05446 252077, 05446 252079, 05446 254791, 05446 254796",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "District Joint Hospital",
    "lat": 24.646173,
    "lng": 83.058614,
    "address": "SH 5A, Bhandar Khurd",
    "phone": "9161349145",
    "bloodGroups": [
      "AB-",
      "B-",
      "A+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Sanjay Gandhi Hospital Blood Bank",
    "lat": 26.210663,
    "lng": 81.807126,
    "address": "SH 34, Katra Maharan",
    "phone": "05368 255009",
    "bloodGroups": [
      "B-",
      "AB+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 26.262708,
    "lng": 82.069909,
    "address": "Sultanpur",
    "phone": "9415168259",
    "bloodGroups": [
      "O+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 26.537805,
    "lng": 80.478884,
    "address": "Orai",
    "phone": "0515 2840149",
    "bloodGroups": [
      "B+",
      "O-",
      "B-",
      "A+",
      "A-",
      "O+",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Banaras Heart Hospital Component Blood Bank",
    "lat": 25.311963,
    "lng": 82.986551,
    "address": "62, Chandrika Nagar, Sigra",
    "phone": "0542 2224567",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Shri Shiv Prasad Gupta Mandliya Zilla Chikitsalaya",
    "lat": 25.31984,
    "lng": 83.008853,
    "address": "Varanasi",
    "phone": "09412487707, 08953003624",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Heritage Hospital",
    "lat": 25.279165,
    "lng": 83.003404,
    "address": "LANKA BHU ROAD",
    "phone": "0542 2368888",
    "bloodGroups": [
      "A+",
      "B-"
    ]
  },
  {
    "name": "Sir Sunderlal Hospital Blood Bank",
    "lat": 25.276992,
    "lng": 83.001231,
    "address": "IMS, BHU, Lanka\r\n",
    "phone": "0542 2369237, 0542 2309408",
    "bloodGroups": [
      "B+",
      "AB+",
      "A-",
      "O+",
      "B-",
      "O-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Santushti Hospital Private Limited Blood Bank",
    "lat": 25.282632,
    "lng": 82.975715,
    "address": "N8/180-B-51, BHU - DLW Road, DLW Sunderpur Road, Sunderpur, Newada, Varanasi, Uttar Pradesh",
    "phone": "0542 2316230",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Apex Hospital Component Blood Bank ",
    "lat": 25.283163,
    "lng": 82.968511,
    "address": "Apex Welcare Trust, N-7/2, A-5, D.L.W. Hydil Road",
    "phone": "0542 2316794",
    "bloodGroups": [
      "B-",
      "A+",
      "AB+",
      "B+",
      "O-",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Pt. Deen Dayal Upadhayay Government Hospital",
    "lat": 28.628047,
    "lng": 77.112399,
    "address": "Pandeypur",
    "phone": "0542 2505073",
    "bloodGroups": [
      "B-",
      "A+",
      "AB+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Heritage Institute of Medical Sciences Blood Bank ",
    "lat": 25.278956,
    "lng": 83.002917,
    "address": "3rd Floor, Near Mohan Sarai, Ram Nagar Bypass, Bhadwar\r\n",
    "phone": "9415226197",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "District Hospital ",
    "lat": 29.59808,
    "lng": 79.659042,
    "address": "District Hospital, Almora",
    "phone": "0596 223 0225",
    "bloodGroups": [
      "AB-",
      "O-",
      "A+",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Govind Singh Mahra Government Hospital Blood Bank",
    "lat": 29.643481,
    "lng": 79.438859,
    "address": "GSM Government Hospital, Ranikhet ",
    "phone": "05962 30064",
    "bloodGroups": [
      "A-",
      "O+",
      "O-",
      "A+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Gopeshwar (Chamoli) District Hospital Blood Bank",
    "lat": 30.410086,
    "lng": 79.320134,
    "address": "District Hospital, Gopeshwar (Chamoli)",
    "phone": "01372 222230",
    "bloodGroups": [
      "O+",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Doon Hospital, District Hospital Blood Bank ",
    "lat": 30.318779,
    "lng": 78.042188,
    "address": "Court Road, Nagar Nigam, Dehradun",
    "phone": "9456174232",
    "bloodGroups": [
      "B+",
      "B-",
      "A-"
    ]
  },
  {
    "name": "IMA Blood Bank of Uttarakhand",
    "lat": 30.334225,
    "lng": 78.017667,
    "address": "47, Ballupur Road, Dehradun ",
    "phone": "0135 2755010, 0135 2755011",
    "bloodGroups": [
      "B-",
      "O-",
      "AB+",
      "A-",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Max Super Speciality Hospital Blood Bank",
    "lat": 30.373737,
    "lng": 78.074684,
    "address": "Mansa Malsi, Khasra No. 165-166, Massorie Diversion Road\r\nNear indian oil petrol Pump",
    "phone": "0135 6673031",
    "bloodGroups": [
      "A+",
      "O+",
      "O-",
      "B-",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Sainik (Military Hospital) Hospital Blood Bank",
    "lat": 30.316493,
    "lng": 78.032191,
    "address": "Army Canteen, Dehradun ",
    "phone": "0135 2702413",
    "bloodGroups": [
      "O+",
      "A+",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Shri Mahant Indiresh Hospital Blood Bank",
    "lat": 30.304956,
    "lng": 78.021322,
    "address": "Patel Nagar, Dehradun ",
    "phone": "0135 2522270, 01356672576",
    "bloodGroups": [
      "A+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Himalayan Institute Trust Blood Bank",
    "lat": 30.192882,
    "lng": 78.164815,
    "address": "HIHT, Jolly Grant, Dehradun\r\nNear Airport",
    "phone": "0135 247 1455",
    "bloodGroups": [
      "B+",
      "A+",
      "AB+",
      "O-",
      "AB-",
      "B-",
      "O+",
      "A-"
    ]
  },
  {
    "name": "SPS Government Hospital Blood Bank",
    "lat": 30.108705,
    "lng": 78.295839,
    "address": "SPS Government Hospital, Rishikesh ",
    "phone": "0135 2430096,  0135 2431032",
    "bloodGroups": [
      "AB-",
      "O-",
      "A-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "HMG District Hospital Blood Bank Haridwar",
    "lat": 29.951147,
    "lng": 78.161657,
    "address": "Bilkeshwar Road, Near Mela Hospital, Laltaro Pul, Haridwar",
    "phone": "09412379159, 09690005344",
    "bloodGroups": [
      "AB+",
      "A-",
      "O-",
      "A+",
      "AB-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Ramakrishna Mission Sevashrana Blood Bank",
    "lat": 29.933208,
    "lng": 78.148128,
    "address": "Opposite to Harihar Ashram, Ramakrishna Mission",
    "phone": "1334244985",
    "bloodGroups": [
      "O-",
      "A-"
    ]
  },
  {
    "name": "BHEL Hospital Blood Bank ",
    "lat": 29.94804,
    "lng": 78.115461,
    "address": "Near HDFC bank BHEL, Haridwar ",
    "phone": "1334281217",
    "bloodGroups": [
      "O-",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Government Combined Hospital Blood Bank Roorkee",
    "lat": 29.878353,
    "lng": 77.878609,
    "address": "Government Hospital, Dehradun Road, Roorkee\r\nNear Idgah chowk",
    "phone": "133 2264333",
    "bloodGroups": [
      "B+",
      "O+",
      "B-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Sainik Hospital Blood Bank",
    "lat": 29.854008,
    "lng": 77.886842,
    "address": "Army Canteen, Roorkee",
    "phone": "01332 279976",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Dr. Susheela Tiwari Memorial Hospital Blood Bank",
    "lat": 29.204322,
    "lng": 79.515729,
    "address": "STM Govt Hospital Rampur Road, Haldwani. \r\nOpposite to FTI Building",
    "phone": "05946, 234104, 3313, 3312",
    "bloodGroups": [
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Soban Singh Jeena Base Hospital (SSJ) Blood Bank",
    "lat": 29.215833,
    "lng": 79.52931,
    "address": "Near Roadways Bus Stand, Haldwani ",
    "phone": "0594 625 0223",
    "bloodGroups": [
      "A+",
      "B-"
    ]
  },
  {
    "name": "Government Combined Hospital Blood Bank",
    "lat": 29.751387,
    "lng": 78.524142,
    "address": "Government Hospital Pauri Road, Kotdwar",
    "phone": "01382 222021, 01382 229740",
    "bloodGroups": [
      "AB+",
      "B-",
      "A+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 30.150844,
    "lng": 78.773687,
    "address": "District Hospital, Pauri Garhwal",
    "phone": "01368 222086",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A+",
      "A-",
      "B+",
      "O-"
    ]
  },
  {
    "name": "H.N. Bahuguna Government Base Hospital Blood Bank",
    "lat": 30.222802,
    "lng": 78.816142,
    "address": "Base Hospital, Badrinath Road, Srinagar ",
    "phone": "01346 222706",
    "bloodGroups": [
      "AB-",
      "A-",
      "A+",
      "B+",
      "O+"
    ]
  },
  {
    "name": "B.D. Pandey District Hospital Blood Bank",
    "lat": 29.587434,
    "lng": 80.211347,
    "address": "District Hospital Mallital, Nainital ",
    "phone": "05942 235022",
    "bloodGroups": [
      "B+",
      "O+",
      "AB-",
      "A-",
      "B-"
    ]
  },
  {
    "name": "B.D. Pandey (P) Hospital Blood Bank",
    "lat": 29.587436,
    "lng": 80.211345,
    "address": "B.D. Pandey District Hospital, Pithoragarh ",
    "phone": "05964 25687",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "L.D. Bhatt Governmentt Hospital Kashipur",
    "lat": 29.218682,
    "lng": 78.963999,
    "address": "Ramnagar Road Kashipur Udam singh nagar,\r\nOpposite to Domino&#39;s Kashipur Ramnagar Road",
    "phone": "05947 278443",
    "bloodGroups": [
      "AB-",
      "B-",
      "O+",
      "O-",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Jeevan Rekha Hospital Blood Bank",
    "lat": 29.238855,
    "lng": 78.965199,
    "address": "Kachnal Gazi, Manpur Road",
    "phone": "05947 261203, 05947 261202",
    "bloodGroups": [
      "B-",
      "O+",
      "AB-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Chamunda Hospital Blood Bank ",
    "lat": 29.218723,
    "lng": 78.96485,
    "address": "Chamunda Hospital, Kashipur ",
    "phone": "9411270462",
    "bloodGroups": [
      "O-",
      "A+",
      "A-",
      "B+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Jawahar Lal Nehru District Hospital (JLN ) Blood Bank",
    "lat": 28.970388,
    "lng": 79.399832,
    "address": "Kichha Road, Rudrapur, Near Indra Chouk",
    "phone": "9412088195",
    "bloodGroups": [
      "O-",
      "B+"
    ]
  },
  {
    "name": "Uttarkashi District Hospital Blood Bank",
    "lat": 30.729788,
    "lng": 78.442688,
    "address": "District Hospital, Near Vishwanath Temple",
    "phone": "0137 422 2082",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Barasat District Hospital Blood Bank",
    "lat": 22.721578,
    "lng": 88.492236,
    "address": "P.O. Barasat",
    "phone": "033 25840347",
    "bloodGroups": [
      "AB+",
      "O+",
      "B+",
      "A-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Base Hospital Blood Bank Barrackpore",
    "lat": 22.767744,
    "lng": 88.347009,
    "address": "North 24-Paraganas",
    "phone": "",
    "bloodGroups": [
      "O+",
      "A-",
      "O-",
      "B+",
      "A+",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Barrackpore S.D. Hospital (Dr. B.N. Bose) Hospital Blood Bank",
    "lat": 22.7516453,
    "lng": 88.3709966,
    "address": "Barrackpore, District- North 24 Parganas P.O. Barrackpore",
    "phone": "033 25923676 ",
    "bloodGroups": [
      "B+",
      "AB+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "S.D. Hospital Blood Bank Basirhat",
    "lat": 22.666139,
    "lng": 88.89003,
    "address": "P.O. Basirhat",
    "phone": "03217 267506",
    "bloodGroups": [
      "A-",
      "B+",
      "A+",
      "B-",
      "AB-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Bongaon S.D. Hospital Blood Bank (Dr. J.R. Dhar)",
    "lat": 23.047662,
    "lng": 88.822849,
    "address": "P.O. Bongaon",
    "phone": "03215 255073",
    "bloodGroups": [
      "B-",
      "AB-",
      "O+",
      "A-",
      "A+",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Canning Sub Divisional Hospital Blood Bank",
    "lat": 22.314134,
    "lng": 88.659722,
    "address": "Canning",
    "phone": "03218 255 242",
    "bloodGroups": [
      "A+",
      "AB-",
      "O+",
      "O-",
      "AB+",
      "B-",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Diamond Harbour Hospital Blood Bank",
    "lat": 22.197588,
    "lng": 88.190999,
    "address": "Diamond Harbour Rd, Harindanga",
    "phone": "03174 255237, 03174-255346",
    "bloodGroups": [
      "A+",
      "AB-",
      "B-",
      "AB+",
      "O+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Baruipur Sub-Divisional Hospital Blood Bank",
    "lat": 22.359212,
    "lng": 88.4335733,
    "address": "Subuddhipur, Baruipur,",
    "phone": "033 2433 5303, 03324332043",
    "bloodGroups": [
      "O+",
      "AB-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Bankura Sammilani Medical College and Hospital Blood Bank",
    "lat": 23.233875,
    "lng": 87.037024,
    "address": "Gobindanagar, P.O.- Kenduadihi",
    "phone": "03242 241366, 03242 244701, 702, 703",
    "bloodGroups": [
      "A+",
      "B+",
      "B-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Little Heart Childrens Hospital Private Limited Blood Bank",
    "lat": 23.2328678,
    "lng": 87.0347214,
    "address": "271/7/1, Taragoti Samanta Road, Kenduadihi\r\n",
    "phone": "03242 243352,  03242 243829",
    "bloodGroups": [
      "O+",
      "B-",
      "AB-",
      "A+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Bishnupur S.D. Hospital Blood Bank ",
    "lat": 23.068944,
    "lng": 87.309801,
    "address": "P.O. Bishnupur",
    "phone": "03244 253075",
    "bloodGroups": [
      "AB-",
      "A+",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Khatra SD Hospital Blood Bank",
    "lat": 22.969097,
    "lng": 86.848541,
    "address": "Hospital Road",
    "phone": "03243-256029",
    "bloodGroups": [
      "A+",
      "B+"
    ]
  },
  {
    "name": "Asansol District Hospital Blood Bank ",
    "lat": 23.676673,
    "lng": 86.974114,
    "address": "SB Gorai Rd, Hamid Nagar",
    "phone": "0341  2304040",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "ECL Central Hospital Kalla Blood Bank ",
    "lat": 23.7012794,
    "lng": 86.9963121,
    "address": "Domohani Rd, C H Kalla, Near Kazi Nazrul University",
    "phone": "0341 221910 ext 1125",
    "bloodGroups": [
      "O+",
      "B+",
      "AB-",
      "O-",
      "B-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Divisional Railway Hospital Blood Bank Asansol",
    "lat": 23.674512,
    "lng": 86.941165,
    "address": "Asansol",
    "phone": "0341 2220529",
    "bloodGroups": [
      "O-",
      "A+",
      "AB+",
      "B+",
      "A-",
      "B-",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Kasturba Gandhi Hospital Blood Bank",
    "lat": 23.849528,
    "lng": 86.895907,
    "address": "Chittaranjan Locovotive Works, Barddhaman Rd, Alipore\r\n",
    "phone": "0341 252 5645, 0342 2525822",
    "bloodGroups": [
      "AB+",
      "A-",
      "AB-",
      "B+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Rashmi Blood bank",
    "lat": 23.254108,
    "lng": 87.853364,
    "address": "Saheed Shibsankar Seba Samity, Baburbag Rd, Baburbag, \r\nNear Burdwan Fire Station",
    "phone": "0342 2657251",
    "bloodGroups": [
      "A-",
      "B+",
      "B-",
      "AB-",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Burdwan Medical College and Hospital Blood Bank",
    "lat": 23.244835,
    "lng": 87.857325,
    "address": "Near Baburbag Road, Bardhaman University",
    "phone": "03422665908, 0342 2559777",
    "bloodGroups": [
      "O-",
      "O+"
    ]
  },
  {
    "name": "Burnpur Hospital SAIL-ISP Blood Bank",
    "lat": 23.6660013,
    "lng": 86.9451971,
    "address": "IiSCO Steel Plant Ltd",
    "phone": "0341 2231332, 0341 2231227",
    "bloodGroups": [
      "AB+",
      "A-",
      "B-",
      "O+",
      "A+",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Sanctoria Hospital Blood Bank",
    "lat": 23.7061752,
    "lng": 86.8280197,
    "address": "2, Jhalbagan, Sanctoria",
    "phone": "0341 2523576, 0341 2523577, 0341-2521035",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Bidhannagar Sub-Divisional Hospital Blood Bank ",
    "lat": 23.5370135,
    "lng": 87.331789,
    "address": "Bidhannagar, Dr. Zakir Hussain avenue",
    "phone": "0343 253 4153, 0343 2533951",
    "bloodGroups": [
      "O+",
      "B-",
      "AB-",
      "B+",
      "A+",
      "O-",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Durgapur Steel Plant Hospital Blood Bank",
    "lat": 23.572531,
    "lng": 87.30336,
    "address": "J. M. Sengupta Road, Durgapore-V, Burdwan (west),B-Zone.",
    "phone": "03432746319, 0343 2745967",
    "bloodGroups": [
      "O-",
      "A-",
      "AB+",
      "AB-",
      "A+",
      "B-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "The Mission Hospital Blood Bank (A Unit of Durgapur Medical Centre Private Limited)",
    "lat": 23.5201833,
    "lng": 87.3554804,
    "address": "Plot No: 219(P), Sector-2C, Iman Kalyan Sarani, Bidhan Nagar",
    "phone": "0343 2535555,Ext:-188",
    "bloodGroups": [
      "AB+",
      "A-",
      "A+",
      "O-",
      "O+",
      "AB-",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Vivekananda Hospital Private Limited Blood bank",
    "lat": 23.523226,
    "lng": 87.339337,
    "address": "Dr. Zakir Hussain Avenue, Bidhan Nagar\r\nBeside Durgapur Esi Hospital",
    "phone": "0343 2532430 , 2531001, 2531002, 2531003 ",
    "bloodGroups": [
      "O-",
      "B-",
      "B+",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "IQ City Narayana Multispeciality Hospital Blood Bank",
    "lat": 23.570751,
    "lng": 87.3372,
    "address": "Sovapur, Bijra Road, Jemua",
    "phone": "0343 2608522, 0343 260 8000, 3432608335",
    "bloodGroups": [
      "B-",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Kalna Sub Divisional Hospital Blood Bank ",
    "lat": 23.223472,
    "lng": 88.346155,
    "address": "STKK Road",
    "phone": "03454 255052",
    "bloodGroups": [
      "B+",
      "AB-",
      "O-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Hemraj Blood Bank, Katwa S.D. Hospital",
    "lat": 23.646029,
    "lng": 88.126393,
    "address": "Kachari Road, ",
    "phone": "03453 255060",
    "bloodGroups": [
      "A+",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Life Line Blood Bank",
    "lat": 23.68721,
    "lng": 86.973343,
    "address": "N.C.B. Road, P.O.- Raniganj, Burdwan \r\nNear Neilkantha Hotel",
    "phone": "0341 2440590",
    "bloodGroups": [
      "AB-",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Rampurhat S.D. Hospital Blood Bank",
    "lat": 24.188551,
    "lng": 87.7930965,
    "address": "P.O. Rampurhat, Rampurahat hospital Road, Besides of NH-60\r\n",
    "phone": "03461 255102, 03461 255285",
    "bloodGroups": [
      "AB+",
      "AB-",
      "B-",
      "O+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Bolpur Sub Divisional Hospital Blood Bank",
    "lat": 23.663705,
    "lng": 87.690853,
    "address": "Nanoor Chandidas Road",
    "phone": "03463 221136",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Suri Sadar District Hospital Blood Bank",
    "lat": 23.915783,
    "lng": 87.516918,
    "address": "P.O. Suri",
    "phone": "03462 255483, 03462 255766",
    "bloodGroups": [
      "AB+",
      "AB-",
      "B-",
      "A+",
      "O-",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Cooch Behar Municipality Hospital Blood Bank",
    "lat": 26.3193973,
    "lng": 89.4406897,
    "address": "Cooch Behar Municipality Building (Ground Floor), Near Sagar Dighi, Po - Cooch Behar",
    "phone": "03582 222286",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "M.J.N Hospital Blood Bank",
    "lat": 26.32175,
    "lng": 89.446384,
    "address": "Silverjubilee Road",
    "phone": "03582 231049",
    "bloodGroups": [
      "A+",
      "AB+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "St. John Ambulance Association, Cooch Berar District Centre",
    "lat": 26.3227486,
    "lng": 89.43823,
    "address": "Sagardighi North Collectorate Building,  P.O. Cooch Behar  ",
    "phone": "03582 227693, 03583 227497",
    "bloodGroups": [
      "B+",
      "A+",
      "A-",
      "O-",
      "O+",
      "AB-",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Balurghat District Hospital Blood Bank",
    "lat": 25.247506,
    "lng": 88.781652,
    "address": "West Dinajpur, Balurghat",
    "phone": "03522 255 288, 03522 270464, 03522 255641",
    "bloodGroups": [
      "O-",
      "AB+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Base Hospital and Blood Bank",
    "lat": 26.712463,
    "lng": 88.317248,
    "address": "158, C/O 99 APO, Siliguri ",
    "phone": "8116603913",
    "bloodGroups": [
      "A-",
      "A+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Darjeeling District Hospital Blood Bank ",
    "lat": 27.0444301,
    "lng": 88.2624757,
    "address": "Hill Cart Road, Near Darjeeling Police Station",
    "phone": "03542 2254218,  03542 255636",
    "bloodGroups": [
      "A+",
      "O-",
      "A-",
      "AB+",
      "O+",
      "B-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "S.D. Hospital Blood Bank Siliguri",
    "lat": 26.711004,
    "lng": 88.427963,
    "address": "P.O. Siliguri",
    "phone": "0353 2533133",
    "bloodGroups": [
      "AB-",
      "AB+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Kalimpong Sub Divisional Hospital Blood Bank ",
    "lat": 27.072148,
    "lng": 88.472107,
    "address": "Kalimpong Hospital, Chotta Bhalukhop",
    "phone": " 03552 255 363, 03552255245",
    "bloodGroups": [
      "AB+",
      "A+",
      "O-",
      "O+",
      "B-",
      "AB-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Kurseong Sub Divisional Hospital Blood Bank ",
    "lat": 26.880521,
    "lng": 88.277576,
    "address": "Burdawan Road, Near Kurseong Palace Hotel",
    "phone": "0354 2344333",
    "bloodGroups": [
      "A+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "North Bengal Medical College Hospital Blood Bank",
    "lat": 26.691918,
    "lng": 88.380047,
    "address": "Thiknikata,  P.O. Shusrut Nagar",
    "phone": "03532585174, 03532 585483",
    "bloodGroups": [
      "AB-",
      "A-",
      "AB+",
      "B+",
      "B-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Siliguri Terai Lions Charitable Trust Blood Bank ",
    "lat": 26.740331,
    "lng": 88.439515,
    "address": "A Unit of Lions Club of Siliguri Terai,\r\nDist 322F,  2nd Mile, Sevoke Road, Siliguri.",
    "phone": "0353 2548925",
    "bloodGroups": [
      "A-",
      "B-",
      "AB+",
      "O+",
      "AB-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Paul P. Harris, Siliguri Rotary Blood Bank",
    "lat": 26.7304824,
    "lng": 88.4166094,
    "address": "Rotary Hall, Pradhan Nagar, \r\nNear Medica North Bengal Clinic",
    "phone": "0353 2573240",
    "bloodGroups": [
      "B-",
      "AB-",
      "A-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Arambagh Sub Divisional Hospital Blood Bank ",
    "lat": 22.887385,
    "lng": 87.786016,
    "address": "Opposite to ravindra Bhavan",
    "phone": "03211 255962, 03211 255095",
    "bloodGroups": [
      "B-",
      "O-",
      "AB-",
      "AB+",
      "A+",
      "A-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Imambara Sadar Hospital Blood Bank",
    "lat": 22.8926,
    "lng": 88.399647,
    "address": "New Hospital Road, Akhanbazar",
    "phone": "033 26800236",
    "bloodGroups": [
      "B-",
      "O+",
      "O-",
      "A-",
      "AB-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Chandannagar Sub Divisional Hospital Blood Bank ",
    "lat": 22.866913,
    "lng": 88.369249,
    "address": " Helapukur Rd, Last French Colony, Chandannagar",
    "phone": "033 2683 5398, 033 26859443",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Walsh Hospital  Blood Bank",
    "lat": 22.755211,
    "lng": 88.346626,
    "address": "Serampore Walsh S.D. Hospital, 22/A T.C Goswami Street, Opposite Holy home school",
    "phone": "033 26526305",
    "bloodGroups": [
      "B-",
      "AB+",
      "O+",
      "A-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Sanjiban Hospital Blood Bank",
    "lat": 22.4807481,
    "lng": 88.1152976,
    "address": "A Unit of Chikitsabrati Udyog\r\nMonsatala More, Fuleswas, P.O. Sijberia",
    "phone": "033 71666026, 03371666000",
    "bloodGroups": [
      "AB+",
      "A-",
      "O-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Howrah Orthopaedic Hospital Blood Bank",
    "lat": 22.5839912,
    "lng": 88.3356088,
    "address": "222, Church Road, Howrah Railway Station\r\nNear Bijoy krishna Girls&#39; college",
    "phone": "033-26413688, 033 26411642",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Howrah District Hospital Blood Bank",
    "lat": 22.580194,
    "lng": 88.335924,
    "address": "09, Biplabi Haren Ghosh Sarani",
    "phone": "033 26411227 / 033 26418821",
    "bloodGroups": [
      "AB-",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Uluberia Sub-Divisional Hospital Blood Bank ",
    "lat": 22.470189,
    "lng": 88.094533,
    "address": "Uluberia Station Road, Near Uluberia Station",
    "phone": "033 26612928",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Air Force Hospital Blood Bank",
    "lat": 26.7044458,
    "lng": 89.3603002,
    "address": "No. 10 , P.O. Hasimara",
    "phone": "03566 255060",
    "bloodGroups": [
      "A-",
      "AB+",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Alipurduar Sub Divisional Hospital Blood Bank ",
    "lat": 26.484428,
    "lng": 89.523071,
    "address": "Hospital Rd, Alipurduar",
    "phone": "03564 274085",
    "bloodGroups": [
      "A+",
      "AB+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Jalpaiguri Sub Divisonal Hospital Blood Bank",
    "lat": 26.529163,
    "lng": 88.727445,
    "address": "Hospital para ",
    "phone": "03561 220047",
    "bloodGroups": [
      "O+",
      "B+",
      "A+",
      "AB+",
      "A-",
      "B-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "B.M. Birla Heart Research Centre Blood Bank",
    "lat": 22.53269,
    "lng": 88.328346,
    "address": " 1/1 National Library Avenue\r\n",
    "phone": "033 30403040, 033 30403112 ",
    "bloodGroups": [
      "AB-",
      "O+"
    ]
  },
  {
    "name": "B.R. Singh Hospital Blood Bank",
    "lat": 22.565712,
    "lng": 88.370758,
    "address": "Eastern Railway, Sealdah ",
    "phone": "033 23523679",
    "bloodGroups": [
      "B+",
      "A+"
    ]
  },
  {
    "name": "Belle Vue Clinic Blood Bank",
    "lat": 22.542571,
    "lng": 88.355055,
    "address": "9, Dr. U. N. Bramachari Street.",
    "phone": "033 22872321, 033 22876725, 033 22877973",
    "bloodGroups": [
      "O+",
      "B-",
      "A+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Bhoruka Research Centre for Haematology and Blood Transfusion",
    "lat": 22.555075,
    "lng": 88.357116,
    "address": "63 Rafi Ahmed Kidwai Road, Kolkata ",
    "phone": "033 22658092",
    "bloodGroups": [
      "O+",
      "B+"
    ]
  },
  {
    "name": "Peerless Hospital and Research Center Limited Blood Bank",
    "lat": 22.480926,
    "lng": 88.39381,
    "address": "360 Panchasayar",
    "phone": "03211 24622394, 03211 24620071, 03211 24620072, 03211 24620073",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Mission of Mercy Hospital and Research Centre Blood Bank",
    "lat": 22.548112,
    "lng": 88.3600601,
    "address": "Park Street",
    "phone": "033 66352095, 033 66352099",
    "bloodGroups": [
      "B+",
      "O+",
      "A-",
      "A+",
      "AB-",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Apollo Gleneagles Hospital Limited Blood Bank",
    "lat": 22.574843,
    "lng": 88.401517,
    "address": "58, Canal Circular Road",
    "phone": "033 23202122, 033 23203040",
    "bloodGroups": [
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Barasat Cancer Research and Welfare Centre Blood Bank",
    "lat": 22.7240431,
    "lng": 88.4887791,
    "address": "Banamalipur, Barasat ",
    "phone": "033 25522222, 033 25522562, 033 2552500",
    "bloodGroups": [
      "B-",
      "AB-",
      "AB+",
      "O-",
      "O+",
      "A+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Central Hospital Blood Bank",
    "lat": 22.5460158,
    "lng": 88.3103853,
    "address": "South Eastern Railway, 11, Garden Rich Road",
    "phone": "033 24504074",
    "bloodGroups": [
      "A+",
      "A-",
      "AB-",
      "AB+",
      "B+",
      "O+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Command Hospital (EC) Blood Bank",
    "lat": 22.529472,
    "lng": 88.330501,
    "address": "Alipore Road",
    "phone": "033 22226415, 033 22226411",
    "bloodGroups": [
      "A+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Chittaranjan National Cancer Institute Blood Bank",
    "lat": 22.526268,
    "lng": 88.347256,
    "address": "37, SP Mukherjee Road",
    "phone": "033 24765101 ",
    "bloodGroups": [
      "AB+",
      "B-",
      "AB-",
      "B+",
      "O-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Calcutta National Medical College Hospital Blood Bank",
    "lat": 22.546116,
    "lng": 88.371121,
    "address": "24, Gorachand Road\r\n",
    "phone": "033 22848397,033 22844834",
    "bloodGroups": [
      "AB+",
      "A-",
      "A+",
      "O-",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Indian Association of Blood Cancer and Allied Diseases",
    "lat": 22.5718203,
    "lng": 88.3924006,
    "address": "81-C Narkeldanga Main Road, Phool Bagan, Beliaghata\r\nKolkata, West Bengal 700054",
    "phone": "033 64610972, 033 23730138",
    "bloodGroups": [
      "O+",
      "AB-",
      "A-",
      "AB+",
      "O-",
      "B+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Institute of Blood Transfusion Medicine and Immunohaematology",
    "lat": 22.585192,
    "lng": 88.375102,
    "address": "205, Vivekananda Road, Maniktala ",
    "phone": "033 23510619",
    "bloodGroups": [
      "A-",
      "O-"
    ]
  },
  {
    "name": "ESI Hospital, Maniktala Blood Bank",
    "lat": 22.58558,
    "lng": 88.392535,
    "address": "Maniktala, 55, Bagmari Road",
    "phone": "033 23557212",
    "bloodGroups": [
      "O+",
      "B-",
      "A+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Lions District 322B1 Blood Bank",
    "lat": 22.5675717,
    "lng": 88.3510506,
    "address": "27/8A Water Loo Street",
    "phone": "033 2248 5778",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Calcutta Medical College Hospital Blood Bank",
    "lat": 22.573681,
    "lng": 88.360779,
    "address": "88, College Street",
    "phone": "033 22551591",
    "bloodGroups": [
      "O+",
      "AB-",
      "A+",
      "B-",
      "A-",
      "AB+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Marwari Relief Society Blood Bank",
    "lat": 22.5828594,
    "lng": 88.3574931,
    "address": "227, Rabindra Sarani",
    "phone": "033 22745675",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Life Care Medical Complex Private Limited Blood Bank",
    "lat": 22.549891,
    "lng": 88.370811,
    "address": "204/1 B Linton Street. ",
    "phone": "033 22846940, 033 22896768",
    "bloodGroups": [
      "B+",
      "AB+"
    ]
  },
  {
    "name": "N.R.S. Medical College and Hospital Blood Bank",
    "lat": 22.561845,
    "lng": 88.370626,
    "address": "138, A.J.C. Bose Road",
    "phone": "033 22652214 Ext.3003",
    "bloodGroups": [
      "B-",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "M.R. Bangur Hospital Blood Bank",
    "lat": 22.499155,
    "lng": 88.346592,
    "address": "Deshapran Sashmal Road, Tollygunge",
    "phone": "033 24727873, 033 24730000",
    "bloodGroups": [
      "AB+",
      "B+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Peoples Blood Bank",
    "lat": 22.525654,
    "lng": 88.346302,
    "address": "90A, S.P. Mukherjee Road",
    "phone": "033 24555164, 033 24555027",
    "bloodGroups": [
      "A-",
      "A+",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Blood Bank Ramkrishna Mission Seva Prathisthan",
    "lat": 22.5233814,
    "lng": 88.351709,
    "address": "99, Sarat Bose Road,",
    "phone": "033 24753636",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "R.G. Kar Medical College and Hospital Blood Bank",
    "lat": 22.604657,
    "lng": 88.378256,
    "address": "Belgachia Road. 1, Khudiram Bose Sarani\r\n",
    "phone": "033 25331277",
    "bloodGroups": [
      "B-",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "S.S.K.M Hospital Blood Bank",
    "lat": 22.539616,
    "lng": 88.343926,
    "address": "244, A. J. C. Bose Road ",
    "phone": "033 22234147",
    "bloodGroups": [
      "B-",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Woodland Multispeciality Hospital Limited Blood Bank",
    "lat": 22.53223,
    "lng": 88.329213,
    "address": "8/5,Alipore Road\r\n",
    "phone": "033- 2456 7075 - 7089",
    "bloodGroups": [
      "B+",
      "O-",
      "AB-",
      "O+",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Saroj Gupta Cancer Centre and Research Institute Blood Bank",
    "lat": 22.4591971,
    "lng": 88.3196724,
    "address": "Mahatma Gandhi Road, Thakurpukur",
    "phone": "033 24532781",
    "bloodGroups": [
      "O-",
      "A+"
    ]
  },
  {
    "name": "The Haemophilia Society Calcutta Chapter Blood Bank",
    "lat": 22.502558,
    "lng": 88.4005252,
    "address": "Singhabari, Kalikapur, E.M. Bye Pass",
    "phone": "033 24263739, 033 24264273",
    "bloodGroups": [
      "A-",
      "O+",
      "O-",
      "B+",
      "B-"
    ]
  },
  {
    "name": "KPC Medical College and Hospital",
    "lat": 22.4938363,
    "lng": 88.3731117,
    "address": "Jadavpur, 1F, Raja S.C. Mullick Road",
    "phone": "033 66211765, 033 30016100, 033 30016299",
    "bloodGroups": [
      "B-",
      "O+",
      "B+",
      "AB+",
      "O-",
      "A+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Health Point - A Multispeciality Hospital Blood Bank",
    "lat": 22.531068,
    "lng": 88.353145,
    "address": "21/1, Prannath Pandit Street, (Opposite Lansdown Padmapukur)",
    "phone": "033 64556455, 033 30575735",
    "bloodGroups": [
      "AB+",
      "O+",
      "AB-",
      "A+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Ashok Laboratory, Centre for Transfusion, Medicine and Clinical Research",
    "lat": 22.5078809,
    "lng": 88.3639574,
    "address": "308 Jodhpur Park",
    "phone": "033 24148250, 033 24720333",
    "bloodGroups": [
      "B-",
      "O-",
      "AB-",
      "B+",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Blood Bank, ESIC Hospital and ODC (E.Z.)",
    "lat": 22.453064,
    "lng": 88.302505,
    "address": "Diamond Harbour Road, P.O. Joka ",
    "phone": "033 24381631, 033 24671764, 033 24671322, 033 24676280, 033 24672799",
    "bloodGroups": [
      "A-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Cord Life Sciences India Private Limited Blood Bank",
    "lat": 22.3923025,
    "lng": 88.2717419,
    "address": "P.L.Deuty Road (Off. Diamond Harbour Road), Bishnupur, South 24-Pgs.",
    "phone": "098713 21804",
    "bloodGroups": [
      "B-",
      "AB-",
      "O-",
      "O+",
      "B+",
      "AB+",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Fortis Hospitals Limited Blood Bank",
    "lat": 22.52022,
    "lng": 88.401133,
    "address": " 730, Anandpur, EM Bypass",
    "phone": " 033 - 66284230 / 8585030368",
    "bloodGroups": [
      "O+",
      "B-",
      "AB-",
      "A-",
      "AB+",
      "A+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Tata Medical Centre Trust Blood Bank",
    "lat": 22.577236,
    "lng": 88.479461,
    "address": "14 Mar (EW), New Town, Rajarhat",
    "phone": "0322 4269048",
    "bloodGroups": [
      "AB+",
      "A-",
      "O-",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Institute of Child Health Blood Bank",
    "lat": 22.5387081,
    "lng": 88.3719339,
    "address": "11 Dr. Biresh Guha Street, Kolkata ",
    "phone": "033 22905686",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Medica Super Specialty Hospital Blood Bank",
    "lat": 22.494356,
    "lng": 88.400972,
    "address": "1st Floor, 127, Mukundapur, E.M. Bypass  ",
    "phone": "033 66525000",
    "bloodGroups": [
      "O+",
      "A+"
    ]
  },
  {
    "name": "College of Medicine and Sagore Dutta Hospital Blood Bank",
    "lat": 22.6749766,
    "lng": 88.374313,
    "address": "Kmarhati",
    "phone": "033 25834277",
    "bloodGroups": [
      "B-",
      "O-",
      "AB+",
      "O+",
      "A-",
      "AB-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Malda Medical College & Hospital Blood bank",
    "lat": 24.99533,
    "lng": 88.137375,
    "address": "Malda Medeical College&Hospital, P.O.- Malda, P.S. - English Bazar,",
    "phone": "(03512) 221087, 221085,  221427, 252480",
    "bloodGroups": [
      "O-",
      "B+",
      "O+",
      "A-",
      "B-",
      "A+",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Contai Sub Divisional Hospital Blood Bank",
    "lat": 21.781682,
    "lng": 87.776009,
    "address": "Vill. : Darua, P.O.: Darua, P.S. : Contai",
    "phone": "03220- 254464.",
    "bloodGroups": [
      "A-",
      "AB+",
      "B-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Haldia Sub Divisional Hospital Blood Bank",
    "lat": 22.0806305,
    "lng": 88.142764,
    "address": "Basudevpur, P.O.-Khanganchak, PS- Durgachak\r\n\r\nNear SDO office Haldia and ADM Office",
    "phone": "032 24277441",
    "bloodGroups": [
      "B-",
      "A-",
      "AB-",
      "O+",
      "B+",
      "O-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Dr. Bidhan Chandra Roy Hospital Blood Bank, Haldia (A Unit of ICARE)  ",
    "lat": 22.0639805,
    "lng": 88.0360249,
    "address": "Vill-Banbishnupur, P.O.- Balughata, P.S. Bhawanipur, Purba Medinipur Pin-721645",
    "phone": "0322 4269225, ",
    "bloodGroups": [
      "B-",
      "AB-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Purba Medinipur District Hospital Blood bank",
    "lat": 22.286378,
    "lng": 87.919661,
    "address": "P.O. Tamluk",
    "phone": "03228 263233, 263209",
    "bloodGroups": [
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Ghatal Sub Divisonal Hospital Blood Bank ",
    "lat": 22.657052,
    "lng": 87.737725,
    "address": "SH 4, Kuspata, Ghatal",
    "phone": "03225 255064",
    "bloodGroups": [
      "B-",
      "O+",
      "O-",
      "AB-",
      "A+",
      "AB+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Jhargram Blood Bank",
    "lat": 22.447732,
    "lng": 86.997281,
    "address": "Jhargram District Hospital, \r\nP.O. Jhargram, Raghunathpur",
    "phone": "03221 259789",
    "bloodGroups": [
      "B+",
      "A+",
      "O-",
      "A-",
      "O+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Kharagpur Sub Divsional Hospital Blood Bank ",
    "lat": 22.32698,
    "lng": 87.314481,
    "address": "South Side, P.O. Kharagpur",
    "phone": "03222 221860, 259125, 255947",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "South Eastern Railway Main Hospital Blood Bank, Kharagpur",
    "lat": 22.3343711,
    "lng": 87.3149694,
    "address": "Kharagpur",
    "phone": "03222 292195, 03222292476",
    "bloodGroups": [
      "AB+",
      "A+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Midnapur Medical College and Hospital Blood Bank",
    "lat": 22.4208441,
    "lng": 87.3218013,
    "address": "Vidyasagar Road , Paschim Medinipur, Medinipur, ",
    "phone": "03222 261007, 222400",
    "bloodGroups": [
      "B+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "S.D. Hospital Blood Bank Jangipur",
    "lat": 24.460303,
    "lng": 88.061671,
    "address": "P.O. Jangipur\r\nP.S.  Raghunathgunj ",
    "phone": "03483 266257, 03483267330",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "S.D. Hospital Blood Bank Kandi",
    "lat": 23.953471,
    "lng": 88.038984,
    "address": "P.O. Kandi \r\nPS-KANDI",
    "phone": "03484 255401",
    "bloodGroups": [
      "B+",
      "AB+",
      "A-",
      "O-",
      "O+"
    ]
  },
  {
    "name": "S.D. Hospital,Lalbagh",
    "lat": 24.171845,
    "lng": 88.277211,
    "address": "Hospital road\r\nLalbagh, Murshidabad",
    "phone": "03482 270247,03482 270224",
    "bloodGroups": [
      "O-",
      "B+",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Baharampur District Hospital Blood Bank",
    "lat": 24.088999,
    "lng": 88.257123,
    "address": "P.O. Baharampur\r\n",
    "phone": "03482 252332",
    "bloodGroups": [
      "B-",
      "A+",
      "A-",
      "AB+",
      "AB-",
      "B+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Gandhi Memorial Hospital Blood Bank",
    "lat": 22.965616,
    "lng": 88.466843,
    "address": "Alipore Road, P.O. Kalyani",
    "phone": "033 25898443, 033 25897292",
    "bloodGroups": [
      "AB+",
      "AB-",
      "B+",
      "O-",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Nadia District Hospital Blood Bank Krishnanagar (Saktinagar)",
    "lat": 23.405437,
    "lng": 88.49109,
    "address": "P.O. Krishnanagar",
    "phone": " 03472 258533",
    "bloodGroups": [
      "O+",
      "AB+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Jawaharlal Nehru Memorial Hospital Blood Bank",
    "lat": 22.975118,
    "lng": 88.455524,
    "address": "P.O. Kalyani",
    "phone": "033 25828386",
    "bloodGroups": [
      "AB+",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Nabadwip SGH Blood Bank",
    "lat": 23.424553,
    "lng": 88.3571715,
    "address": "Nadia",
    "phone": "9434160366",
    "bloodGroups": [
      "AB+",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Deben Mahato (Sadar) Hospital Blood Bank",
    "lat": 23.332391,
    "lng": 86.362661,
    "address": "P.O.Purulia  ",
    "phone": "03252 222678",
    "bloodGroups": [
      "B-",
      "O-",
      "AB-",
      "A+",
      "B+",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Sub Divisional Hospital Blood Bank Islampur",
    "lat": 26.257667,
    "lng": 88.185293,
    "address": "P.O. Islampur",
    "phone": "9830385878",
    "bloodGroups": [
      "O-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Raiganj Blood Bank, Uttar Dinajpur Raiganj District Hospital",
    "lat": 25.609904,
    "lng": 88.132494,
    "address": "P.O. Raiganj",
    "phone": "03523 241400",
    "bloodGroups": [
      "O+",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Mundakkayam Medical Trust (M.M.T.) Hospital Blood Bank ",
    "lat": 9.535157,
    "lng": 76.908953,
    "address": "",
    "phone": "04869 280356",
    "bloodGroups": [
      "B+",
      "A+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Sainik Aspatal Military Hospital Blood Bank",
    "lat": 19.9483203,
    "lng": 73.841866,
    "address": "Sainik Aspatal, Military Hospital, Deolali",
    "phone": "9545355252",
    "bloodGroups": [
      "AB+",
      "B+",
      "A-",
      "O+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "District Hospital for Women Blood Bank",
    "lat": 20.714492,
    "lng": 77.008904,
    "address": "Plot No.2, OPD Building, District Hospital for Women, Near Durga Chowk, Akola-444005\r\n",
    "phone": "0724 2433398, 0724 2433778 ",
    "bloodGroups": [
      "O+",
      "O-",
      "B+",
      "AB-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "MP Birla Hospital and Priyamvada Birla Cancer Research Institute Blood Bank",
    "lat": 24.585065,
    "lng": 80.85646,
    "address": "J. R. Birla Road, Post Birla Vikas\r\n",
    "phone": "07672 257411, 07672 257412, 07672 404085",
    "bloodGroups": [
      "A-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "BBMB Hospital Blood Bank",
    "lat": 31.382789,
    "lng": 76.364112,
    "address": "BBMB Hosital Nangal Town Ship",
    "phone": "1887223902",
    "bloodGroups": [
      "O-",
      "B+",
      "AB+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Prakash Hospital Blood Bank",
    "lat": 28.58564,
    "lng": 77.34952,
    "address": "D-12, 12-A, 12-B, Sector-33",
    "phone": "0120 2505264",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Laxmiben Kushalbhai Patel Blood Bank ",
    "lat": 21.113314,
    "lng": 21.113314,
    "address": "Laxmiben Kushalbhai Patel Blood Bank, 1st Floor, Janak Smarak  Hospital, Kanpura, Vyara, Tapi",
    "phone": "02626 220251",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "K. E. M. Hospital Blood Bank",
    "lat": 19.001515,
    "lng": 72.841877,
    "address": "Acharya Donde Marg, Parel, Mumbai",
    "phone": "022 24107421, 022 24107246, 022 24107249, 022 24107000 ",
    "bloodGroups": [
      "B-",
      "A-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Mata Chanan Devi Hospital Blood Bank",
    "lat": 28.618861,
    "lng": 77.078382,
    "address": "Mata Chanan Devi Hospital, C-1 Janakpuri New Delhi ",
    "phone": "011 45582193, 011 45582194",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Jharsuguda",
    "lat": 21.853817,
    "lng": 84.017235,
    "address": "District Head Quarter Hospital, Near Hanuman Mandir, ",
    "phone": "06645 272180",
    "bloodGroups": [
      "B+",
      "O-"
    ]
  },
  {
    "name": "Sri Ram Murti Samarak Institute of Medical Sciences Blood Bank",
    "lat": 28.481101,
    "lng": 79.443201,
    "address": "Bareilly - Nainital Road, Bhojipura, Bareilly, Uttar Pradesh",
    "phone": "0581 2582014-25",
    "bloodGroups": [
      "B-",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Barak Blood Bank and Clinical Research Centre",
    "lat": 24.808015,
    "lng": 92.795242,
    "address": "Central Rd, Tarapur, Kanakpur Part-II",
    "phone": " 03842 222 185",
    "bloodGroups": [
      "O-",
      "O+",
      "A-",
      "AB-",
      "A+",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Life Line Blood Bank",
    "lat": 29.609166,
    "lng": 74.297906,
    "address": "1st floor Bombay hospital campus, Town Road, Hanumangarh Junction",
    "phone": "01552 269135",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "HKES Blood Bank Organisation",
    "lat": 17.328385,
    "lng": 76.844483,
    "address": "M.R. Medical College, Basave shwara Teaching and General Hospital, No.7-52 Sadam Road",
    "phone": "08472 220307, 08472  225085",
    "bloodGroups": [
      "AB-",
      "B-",
      "AB+",
      "A+",
      "B+",
      "O+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Jalpaiguri Sub Divisonal Hospital Blood Bank",
    "lat": 26.529163,
    "lng": 88.727445,
    "address": "Hospital para ",
    "phone": "03561 220047",
    "bloodGroups": [
      "O+",
      "B+",
      "A+",
      "AB+",
      "A-",
      "B-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Nabarangpur",
    "lat": 19.22886,
    "lng": 82.56679,
    "address": "District Head Quarter Hospital, Miriganiguda",
    "phone": "6858222360",
    "bloodGroups": [
      "A+",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Dr. Bidhan Chandra Roy Hospital Blood Bank, Haldia (A Unit of ICARE)  ",
    "lat": 22.0639805,
    "lng": 88.0360249,
    "address": "Vill-Banbishnupur, P.O.- Balughata, P.S. Bhawanipur, Purba Medinipur Pin-721645",
    "phone": "0322 4269225, ",
    "bloodGroups": [
      "B-",
      "AB-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Asian Heart Institute and Research Center",
    "lat": 19.065253,
    "lng": 72.860832,
    "address": "ICICI Tower,  Bandra Kurla Complex, Bandra (E) Mumbai",
    "phone": "022 66986666, 022 26508487",
    "bloodGroups": [
      "O+",
      "B-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Pushpagiri Hospital Blood Bank",
    "lat": 9.380994,
    "lng": 76.580962,
    "address": "Thiruvalla",
    "phone": "0469 270 0755",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Government Combined Hospital Blood Bank Roorkee",
    "lat": 29.878353,
    "lng": 77.878609,
    "address": "Government Hospital, Dehradun Road, Roorkee\r\nNear Idgah chowk",
    "phone": "133 2264333",
    "bloodGroups": [
      "B+",
      "O+",
      "B-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Dhanwantri Blood Bank",
    "lat": 21.034297,
    "lng": 75.781029,
    "address": "H. No. 5/464/1, T. P. Scheme, No-1, Survey No 124/1/3A Plot No. 777/3, Jamner Road, Rangoli Hotel, Jawal Anand Nagar Bhusawal, Jalgaon ",
    "phone": "02582 243243",
    "bloodGroups": [
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Shree Mahavir Health And Medical Relief Society Blood Bank",
    "lat": 21.184104,
    "lng": 72.813897,
    "address": "Blood Bank, Shree Mahavir Health And Medical Relief Society, Shri B.D.Mehta  Mahavir Heart Institute, Shree Mahavir Health Campus,  Athwagate, Ring road, Surat",
    "phone": "0261 2471770, 0261 2462116",
    "bloodGroups": [
      "B-",
      "A+",
      "B+"
    ]
  },
  {
    "name": " TTD Central Hospital Blood Bank",
    "lat": 13.642148,
    "lng": 79.421067,
    "address": "Tirumala Tirupati Devastanam (TTD), Kapil Teertham Road, Tirupati\r\n",
    "phone": "0877 2264622",
    "bloodGroups": [
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Sanjay Gandhi Hospital Blood Bank",
    "lat": 26.210663,
    "lng": 81.807126,
    "address": "SH 34, Katra Maharan",
    "phone": "05368 255009",
    "bloodGroups": [
      "B-",
      "AB+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Bapuji Hospital Blood Bank",
    "lat": 14.4588202,
    "lng": 75.9167473,
    "address": "C.G. Hospital Road",
    "phone": "08192 253850  ",
    "bloodGroups": [
      "AB-",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Indu Blood Bank Vadodara",
    "lat": 22.304204,
    "lng": 73.1935,
    "address": "Indu Blood Bank, III Floor, Vinraj Plaza, Opposite to Government Press, Khoti, Vadodara",
    "phone": "0265 2437676, 0265 2411477",
    "bloodGroups": [
      "A-",
      "AB-",
      "O-",
      "AB+",
      "B-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Jindal Blood Bank",
    "lat": 26.7048053,
    "lng": 78.2265252,
    "address": "Balkrishna Bhawan, Hospital Road\r\n",
    "phone": "0753 2250789",
    "bloodGroups": [
      "AB-",
      "O+",
      "O-",
      "B+",
      "AB+",
      "A+",
      "A-"
    ]
  },
  {
    "name": "The APVVP District Head Quarters Hospital Blood Bank",
    "lat": 17.247253,
    "lng": 80.151445,
    "address": "1st Floor, Room.No.31, O.P. Block, Wyra Road, Khammam",
    "phone": "08742 224815",
    "bloodGroups": [
      "AB+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Sree Gokulam Medical College and Research Foundation Blood Bank",
    "lat": 8.692755,
    "lng": 76.914675,
    "address": "Aalamthara-Bhoothamadakki Road",
    "phone": "0472 3041234",
    "bloodGroups": [
      "B+",
      "A-"
    ]
  },
  {
    "name": "G. Kuppusamy Naidu Memorial Hospital Blood Bank",
    "lat": 11.01277,
    "lng": 76.980509,
    "address": "P.B. No. 6327, Nethaji Road, Pappanaickenpalayam,\r\nCoimbatore",
    "phone": "0422 4305336, 0422 224 5000",
    "bloodGroups": [
      "B+",
      "O+",
      "O-",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Sadar Hospital Ara (Bhojpur) Blood bank",
    "lat": 25.559755,
    "lng": 84.667554,
    "address": "Sapna Cinema Road, Nawada,",
    "phone": "7870307773",
    "bloodGroups": [
      "A+",
      "B-",
      "B+",
      "AB-",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Nahan Regional Hospital Blood Bank ",
    "lat": 30.559933,
    "lng": 77.295483,
    "address": "Regional Hospital, Nahan ",
    "phone": "01702 223344",
    "bloodGroups": [
      "O+",
      "AB-",
      "AB+",
      "B-",
      "O-",
      "A+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Sithi Vinayagar Blood Bank",
    "lat": 11.671281,
    "lng": 78.151721,
    "address": "No, 1C Vidhyalaya Road, Salem",
    "phone": "0427 2312577, 0427 2316440  ",
    "bloodGroups": [
      "B-",
      "AB-",
      "B+",
      "O-"
    ]
  },
  {
    "name": "West Coast Blood Bank",
    "lat": 19.042954,
    "lng": 72.84073,
    "address": "Basement 101, Moon Building, 798, Mori Road, Mahim(W), Mumbai",
    "phone": "022 24444544 ",
    "bloodGroups": [
      "A-",
      "O-",
      "B+",
      "O+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Rourkela",
    "lat": 22.264089,
    "lng": 84.865108,
    "address": "Rourkela Government Hospital Campus, Rourkela, PO- Uditnagr, S.T.I Chowk",
    "phone": "0661 2401770",
    "bloodGroups": [
      "A-",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Rotary Seva Sangh Blood Bank",
    "lat": 16.160405,
    "lng": 74.81216,
    "address": " R. S. No. 211/B, Plot No. 14C, Yogikolla Road",
    "phone": "0831 225300",
    "bloodGroups": [
      "O+",
      "B-",
      "AB+",
      "AB-",
      "A-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Sai Prasad Orthopedic Hospital",
    "lat": 17.135315,
    "lng": 79.633367,
    "address": "Blood Bank, H.No.1-2-270/45/3, Opposite Vijetha Hotel, Suryapet, Nalgonda",
    "phone": "08684 223223",
    "bloodGroups": [
      "O-",
      "A-",
      "AB-",
      "B+",
      "AB+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "GSVM Medical College Blood Bank",
    "lat": 26.481102,
    "lng": 80.307684,
    "address": "Swaroop Nagar, Kanpur",
    "phone": "7706922922",
    "bloodGroups": [
      "AB+",
      "B+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Jankalyan Blood Bank",
    "lat": 20.008838,
    "lng": 73.7702,
    "address": "3, Shree Nagar, Old Gangapur Naka, Gangapur Road, Nashik\r\n",
    "phone": "0253 2573493, 0253 2575249",
    "bloodGroups": [
      "O-",
      "B-",
      "AB-",
      "AB+",
      "A-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Ghatal Sub Divisonal Hospital Blood Bank ",
    "lat": 22.657052,
    "lng": 87.737725,
    "address": "SH 4, Kuspata, Ghatal",
    "phone": "03225 255064",
    "bloodGroups": [
      "B-",
      "O+",
      "O-",
      "AB-",
      "A+",
      "AB+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "K.M. Memorial Hospital & Research Center Blood Bank",
    "lat": 23.633257,
    "lng": 86.173506,
    "address": "Blood Bank, K.M. Memorial Hospital & Research Center, By Pass Road Chas Bokaro",
    "phone": "0651 236188189",
    "bloodGroups": [
      "O+",
      "A-"
    ]
  },
  {
    "name": "Kalna Sub Divisional Hospital Blood Bank ",
    "lat": 23.223472,
    "lng": 88.346155,
    "address": "STKK Road",
    "phone": "03454 255052",
    "bloodGroups": [
      "B+",
      "AB-",
      "O-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Bharat Heavy Electricals Limited Hospital ",
    "lat": 17.496713,
    "lng": 78.305268,
    "address": "Blood Bank, Ramachandrapuram, Medak",
    "phone": "040 23184386",
    "bloodGroups": [
      "A+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Durg District Hospital  Blood Bank",
    "lat": 21.187096,
    "lng": 81.279227,
    "address": "Civil Surgeon, District Hospital, Durg",
    "phone": "7882219888",
    "bloodGroups": [
      "B-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Government District Head Quarters Hospital Blood Bank",
    "lat": 18.438555,
    "lng": 79.128841,
    "address": "Savaran Street, Manchiryal Chowrastha",
    "phone": "0878 2240223, 0878 2240337",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Azad Panchi Group Charitable Trust Blood Bank",
    "lat": 16.844539,
    "lng": 74.572891,
    "address": "Near Civil Hospital, Ganesh Nagar, 1st Lane, S. No. 1682, Sangli\r\n",
    "phone": "0233 2374333",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "IMA Blood Bank",
    "lat": 28.346917,
    "lng": 79.424734,
    "address": "Run by Indian Medical Association, Civil Lines",
    "phone": "",
    "bloodGroups": [
      "A+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "JVP Blood Bank and Transfusion Centre Blood Bank",
    "lat": 19.072305,
    "lng": 73.000676,
    "address": "201, 213 Arenja Arcade Plot No. 4 Sec-17, Next to Apana Bazar, Vashi, Navi Mumbai",
    "phone": "022 27894490, 022 67912094",
    "bloodGroups": [
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, SDH, Bhanjanagar",
    "lat": 19.93655984,
    "lng": 84.57996368,
    "address": "Sub Divisional Hospital Bhanjanagar",
    "phone": "06821 240133",
    "bloodGroups": [
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 12.418764,
    "lng": 75.742555,
    "address": "General Thimayya Road",
    "phone": "08272 223445",
    "bloodGroups": [
      "B-",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Saint Joseph General Hospital Blood Bank",
    "lat": 16.297514,
    "lng": 80.440648,
    "address": "Opposite to Andhra Christian College, Near Flyover, Main Road, Guntur\r\n",
    "phone": "0863 2322700, 0863 2320386 ",
    "bloodGroups": [
      "A+",
      "AB-"
    ]
  },
  {
    "name": "GCRG Memorial Hospital & Charitable Blood Bank",
    "lat": 26.842776,
    "lng": 80.949164,
    "address": "Village-Parvatpur, Chandrika Devi Road, Bakshi Ka Talab",
    "phone": "9559662557",
    "bloodGroups": [
      "O-",
      "AB-",
      "B-",
      "A-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 10.583823,
    "lng": 77.247247,
    "address": "Government Hospital, VOC Street, Udumalpet",
    "phone": "04252 220092",
    "bloodGroups": [
      "A-",
      "O-"
    ]
  },
  {
    "name": "Indian Medical Association Blood Bank Hoshiarpur",
    "lat": 31.530798,
    "lng": 75.90642,
    "address": "Sud Nursing Home,Premgarh, Dhobian Wali Gali,,",
    "phone": "01882 222244",
    "bloodGroups": [
      "A+",
      "B+",
      "B-",
      "O-",
      "A-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Jawahar Lal Nehru Cancer Hospital and Research Centre Blood Bank",
    "lat": 23.273077,
    "lng": 77.380764,
    "address": "Idgah Hills, Bhopal",
    "phone": "0755 4255682",
    "bloodGroups": [
      "A+",
      "A-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Civil Surgeon General Hospital Blood Bank",
    "lat": 20.702666,
    "lng": 77.001984,
    "address": "District General Hospital Compound, Z.P. Road, Akola\r\n",
    "phone": "0724 2434401",
    "bloodGroups": [
      "A-",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Hi-Tech Medical College & Hospital Blood Bank",
    "lat": 20.300484,
    "lng": 85.877272,
    "address": "Pandra,Rasulgarh,Bhubaneshwar",
    "phone": "06743094253, 0674 2371217",
    "bloodGroups": [
      "AB-",
      "A-",
      "AB+",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Fortis Hospital Private Limited Blood Bank",
    "lat": 12.89453,
    "lng": 77.598902,
    "address": "Bannerghatta Road",
    "phone": "080 66214055 ",
    "bloodGroups": [
      "AB+",
      "B-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Sub Divisional Hospital Blood Bank Islampur",
    "lat": 26.257667,
    "lng": 88.185293,
    "address": "P.O. Islampur",
    "phone": "9830385878",
    "bloodGroups": [
      "O-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Military Hospital Blood Bank",
    "lat": 32.249222,
    "lng": 75.647473,
    "address": "167, Military Hospital, Pathankot",
    "phone": "8054081441",
    "bloodGroups": [
      "O-",
      "O+",
      "A-",
      "A+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": " Surakhya  Blood Bank ",
    "lat": 26.175065,
    "lng": 91.75257,
    "address": "Arya Hospital complex, A.M. Road, Rehabri\r\nOpposite Apsara Cinema Hall",
    "phone": "03612606665, 0361 2606888",
    "bloodGroups": [
      "O+",
      "B-",
      "B+",
      "O-",
      "AB-",
      "A+",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Sadar Hospital, Katihar Blood bank",
    "lat": 25.539923,
    "lng": 87.567583,
    "address": "Blood Bank, Sadar Hospital\r\n\r\n",
    "phone": "9431634656",
    "bloodGroups": [
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 18.87247,
    "lng": 79.444699,
    "address": " Ground Floor, Area Hospital, I.B Chaurastha",
    "phone": "08736259259, 08736252259",
    "bloodGroups": [
      "AB+",
      "A+",
      "B-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Malankara Orthodox Syrian Church Medical Mission Hospital Blood Bank",
    "lat": 9.983303,
    "lng": 76.474382,
    "address": "Adupooty Hills, Kunnamkulam Chowannur Post",
    "phone": "04885 222944",
    "bloodGroups": [
      "AB-",
      "B-",
      "A+",
      "B+",
      "O-",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Sainik (Military Hospital) Hospital Blood Bank",
    "lat": 30.316493,
    "lng": 78.032191,
    "address": "Army Canteen, Dehradun ",
    "phone": "0135 2702413",
    "bloodGroups": [
      "O+",
      "A+",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "J.C. Voluntary Blood Bank",
    "lat": 13.337779,
    "lng": 77.11681,
    "address": "Plot No. 5421, II Floor, Narasimha Building, Nisarga Layout, B.H. Road",
    "phone": "08162 272980 ",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Late N.H. Ramani Memorial Voluntary Blood Bank and Navchetan Pathology Lab Modasa",
    "lat": 23.459892,
    "lng": 73.297569,
    "address": "Late N.H. Ramani Memorial Voluntary Blood Bank and Navchetan Pathology Lab, 2nd floor, Upasana Complex, Nr. S.T. Stand, Modasa, Sabarkantha.",
    "phone": "02774 247890, 02774 243690",
    "bloodGroups": [
      "A-",
      "AB+",
      "B-",
      "A+",
      "O-",
      "B+",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Sainath Blood Bank",
    "lat": 21.134294,
    "lng": 79.076369,
    "address": "531,Jaiswal Building, Above R.K. Traders, Old shukrawari Road, Sakkardara Nagpur",
    "phone": "9422502066",
    "bloodGroups": [
      "A+",
      "A-",
      "B+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "IGH Gas Rahat Blood Bank",
    "lat": 23.1549,
    "lng": 77.244677,
    "address": "Indira Gandhi Mahila Evam Bal Chikitsalaya Gas Rahat",
    "phone": "0755 2713100",
    "bloodGroups": [
      "A-",
      "B+",
      "AB-",
      "O-",
      "O+",
      "B-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Canning Sub Divisional Hospital Blood Bank",
    "lat": 22.314134,
    "lng": 88.659722,
    "address": "Canning",
    "phone": "03218 255 242",
    "bloodGroups": [
      "A+",
      "AB-",
      "O+",
      "O-",
      "AB+",
      "B-",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Sri Balaji Action Medical Institute Blood Bank",
    "lat": 28.673738,
    "lng": 77.110226,
    "address": "Sri Balaji Action Medical Institute, FC-34, A-4, Paschim Vihar",
    "phone": "011 42888888, 011 45666666",
    "bloodGroups": [
      "B+",
      "B-",
      "AB-",
      "O+",
      "AB+",
      "O-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank,Kanhangad",
    "lat": 12.314687,
    "lng": 75.105095,
    "address": "Chammattam Vayal, Bella (PO)",
    "phone": "0467 2204333",
    "bloodGroups": [
      "AB+",
      "O-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 23.832575,
    "lng": 80.39196,
    "address": "Government  District Hospital",
    "phone": "07622 230367",
    "bloodGroups": [
      "A+",
      "AB+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Rotary Mysore Chandrakala Hospital Blood Bank",
    "lat": 12.325868,
    "lng": 76.619519,
    "address": "Chandrakala Hospital and Institute of Medical Research, Plot &#39;A&#39;, Kalidasa Road, Jayalakshmipuram",
    "phone": "0821 4288638",
    "bloodGroups": [
      "O-",
      "A+"
    ]
  },
  {
    "name": "Lokpriya Hospital Blood Bank",
    "lat": 28.968374,
    "lng": 77.730585,
    "address": "Samrat Palace, Garh Road",
    "phone": "0121 2760040",
    "bloodGroups": [
      "AB-",
      "O-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "IMA Blood Bank",
    "lat": 15.436162,
    "lng": 75.637616,
    "address": "Zendha Circle, Station Road",
    "phone": "08372 253955 ",
    "bloodGroups": [
      "B-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Dr. Shyama Prasad Mukharjee Civil Hospital",
    "lat": 26.844593,
    "lng": 80.948999,
    "address": "Gorakhpur",
    "phone": "0522 2239595",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "M. U. Pethani Voluntary Blood Bank, Palanpur",
    "lat": 24.170367,
    "lng": 72.435186,
    "address": "Bhagwan Mahavir Seva Samiti Sanchalit Mafatben Uttamlal Pethani Voluntary Blood Bank, Baradpura, Near Delhi Gate,                           Palanpur, Banaskantha",
    "phone": "02742 246914, 02742 245899",
    "bloodGroups": [
      "A+",
      "B-",
      "B+",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Sarvodaya Hospital and Research Centre",
    "lat": 28.422451,
    "lng": 77.316923,
    "address": "YMCA Road, Sector-8, Near ESI Hospital, Faridabad",
    "phone": "0129-4184444",
    "bloodGroups": [
      "B+",
      "AB+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Civil Hospital Blood Bank",
    "lat": 21.00845,
    "lng": 75.568216,
    "address": "Civil Hospital Blood Bank, Dixit Wadi, Zilha Peth, Jalgaon",
    "phone": "0257 2226642, 0257 2252145",
    "bloodGroups": [
      "AB+",
      "A-",
      "AB-",
      "B+",
      "B-",
      "A+"
    ]
  },
  {
    "name": "The APVVP District Head Quarters Hospital",
    "lat": 18.052936,
    "lng": 78.261853,
    "address": "Blood Bank, Sangareddy, Medak",
    "phone": "09346783440, 09949849099",
    "bloodGroups": [
      "B-",
      "A-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 16.0833,
    "lng": 78.8667,
    "address": "Blood Bank Medical Officer,  Blood Bank, Government Hospital, Srisailam Project, Kurnool District",
    "phone": "",
    "bloodGroups": [
      "B+",
      "AB-",
      "A+",
      "B-",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Krishna Hospital and Medical Research Centre Blood Bank Karad",
    "lat": 17.285065,
    "lng": 74.185701,
    "address": "Poona Bangalore (NH 4) Highway, Near Debhewadi Road, Karad, Satara",
    "phone": "02164 241456, 02164 242170",
    "bloodGroups": [
      "AB+",
      "A-",
      "A+",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Swami Ramanand Tirth Arben Medical College Hospital Blood Bank",
    "lat": 18.731377,
    "lng": 76.370902,
    "address": "Swami Ramanand Tirth Arben Medical College Hospital Ambajogai Tq. Ambajogai,  Beed",
    "phone": "02446 244472 ",
    "bloodGroups": [
      "O+",
      "B+"
    ]
  },
  {
    "name": "Lions Club of Secunderabad Twin Cities",
    "lat": 17.432643,
    "lng": 78.490824,
    "address": "2nd Floor, Varalaxmi Complex, Opposite Stay Inn Hotel, James Street, M.G.Road, Secunderabad",
    "phone": "040 32411317",
    "bloodGroups": [
      "B+",
      "O+",
      "O-",
      "A+",
      "A-",
      "AB+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Central Hospital Blood Bank Joda",
    "lat": 22.036011,
    "lng": 85.434191,
    "address": "Blood Bank,Central  Hospital, Joda, Keonjhar",
    "phone": "06767 272231",
    "bloodGroups": [
      "A+",
      "A-",
      "O+",
      "AB-",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Lilavati Blood Bank",
    "lat": 20.534727,
    "lng": 76.172461,
    "address": "John Lay Out, Jamrnn Road, Near Bus stand, Buldhana",
    "phone": "07262 243811",
    "bloodGroups": [
      "A-",
      "AB-",
      "B-",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood bank, SDH, Gunupur",
    "lat": 19.071552,
    "lng": 83.809261,
    "address": "sub- Divisional Hospital Gunupur, SDH Campus",
    "phone": "8596985766",
    "bloodGroups": [
      "AB+",
      "B+",
      "A+",
      "O+",
      "A-",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Bhavnagar Blood Bank",
    "lat": 21.76982,
    "lng": 72.160378,
    "address": "Bhavnagar Blood Bank, Ofice No. 1,2,3 - Plot No. 1686, B-Wing, 1st Floor, Municipal Commercial Complex, Sardar Nagar Circle, Sardarnagar, Bhavnagar",
    "phone": "0278 2561526",
    "bloodGroups": [
      "A-",
      "AB-",
      "B+",
      "B-",
      "O+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Fortis Escorts Hospital Blood Bank",
    "lat": 26.846176,
    "lng": 75.803437,
    "address": "Jawahar Lal Nehru Marg,  Malviya Nagar.",
    "phone": "0141254700, 0141 409 7109 ",
    "bloodGroups": [
      "A-",
      "A+"
    ]
  },
  {
    "name": "Jivan Jyot Blood Bank  ",
    "lat": 23.241748,
    "lng": 69.67181,
    "address": "Jivanjyot Blood Bank, 63, A/B, Vijyanagar, New Hospital Road, Bhuj, Kutch\r\n",
    "phone": "02832 222812",
    "bloodGroups": [
      "B+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Jawahar Lal Nehru District Hospital (JLN ) Blood Bank",
    "lat": 28.970388,
    "lng": 79.399832,
    "address": "Kichha Road, Rudrapur, Near Indra Chouk",
    "phone": "9412088195",
    "bloodGroups": [
      "O-",
      "B+"
    ]
  },
  {
    "name": "Gandhi Lincon Hospital Blood Bank",
    "lat": 24.256318,
    "lng": 72.184372,
    "address": "Bhansali Trust sanchalit Voluntary Blood Bank, Gandhi Lincon Hospital, Nr.Municipal Complex, Nr. Sardar-Baug, Deesa, \r\nBanaskantha",
    "phone": "02744 220172",
    "bloodGroups": [
      "A-",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Fortis Malar Hospitals Limited Blood Bank",
    "lat": 13.01006,
    "lng": 80.258702,
    "address": "52, First Main Road, Gandhi Nagar, Adyar",
    "phone": "044 42892222",
    "bloodGroups": [
      "O-",
      "A+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Cosmos Hospital, Multi Speciality and Trauma Centre",
    "lat": 28.894018,
    "lng": 78.729084,
    "address": "Prem Nagar, P.O.- Kazipura, Kanth Road",
    "phone": "0591 2555500, 0591 2555501",
    "bloodGroups": [
      "O-",
      "A-",
      "AB-",
      "O+",
      "B+",
      "B-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Indian Red Cross Society, Blood Bank",
    "lat": 18.005635,
    "lng": 79.557155,
    "address": "Opp: Dist. Collectorate, Subedari,Hanamkonda.",
    "phone": "0870 2456765",
    "bloodGroups": [
      "B-",
      "O-",
      "B+",
      "AB-",
      "A+",
      "O+",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Divya Joyati Institute Of Medical Science & Research",
    "lat": 28.830657,
    "lng": 77.570159,
    "address": "Niwari Road, Road, Modinagar\r\n",
    "phone": "9368564762",
    "bloodGroups": [
      "O+",
      "B+",
      "B-",
      "A-",
      "AB+",
      "O-",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Sadar Hospital Kaimur (Bhabua) Blood Bank ",
    "lat": 25.039579,
    "lng": 83.607736,
    "address": "Kachahari Road, Kaimur",
    "phone": "06189 223254",
    "bloodGroups": [
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Kanya Blood Bank",
    "lat": 8.17554,
    "lng": 77.429731,
    "address": "No.173 A/1, K.P. Road, Ramavarmapuram, Nagercoil",
    "phone": "04652 279850, 04652 273951",
    "bloodGroups": [
      "A+",
      "B+",
      "O+",
      "B-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "BEML Medical Centre Bharat Earth Movers Limited Blood Bank",
    "lat": 12.983949,
    "lng": 78.237201,
    "address": "Kolar Gold Fields ",
    "phone": "08153 263208 ",
    "bloodGroups": [
      "AB-",
      "O-",
      "B-",
      "A+",
      "A-",
      "AB+",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Alchemist Institute of Medical Sciences Blood Bank",
    "lat": 28.439328,
    "lng": 77.10227,
    "address": "Alchemist Institute of Medical Sciences (A Unit of Alchemist Hospitals Limited) DLF Golf Course Road, Sector-53, Saraswati Kunj",
    "phone": "0124 4511111",
    "bloodGroups": [
      "O+",
      "A+",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Lokmitra Blood Bank and Thalassemia Research Centre",
    "lat": 24.581121,
    "lng": 73.712858,
    "address": "205, Bussiness Centre, Madhuvan",
    "phone": "0294 2413100",
    "bloodGroups": [
      "AB+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Sri Shakti Blood Bank",
    "lat": 15.7687772,
    "lng": 76.7638445,
    "address": "Badarli Venkat Rao Gouda Health Care Association, Venkateshwara Tourist Home, Sukalapeta Road",
    "phone": "0853 5220299",
    "bloodGroups": [
      "A+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 28.027732,
    "lng": 79.126275,
    "address": "Bareilly",
    "phone": "05832 266264",
    "bloodGroups": [
      "AB+",
      "B+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 11.59695,
    "lng": 78.60139,
    "address": "Cuddalore Main Road, Attur, Salem District\r\n",
    "phone": "04282 243771",
    "bloodGroups": [
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Guru Gobind Singh Medical College Blood Bank Hospital Blood Bank",
    "lat": 30.681255,
    "lng": 74.747606,
    "address": "Sadiq Road, Kotakpura",
    "phone": "01639 255436, 01639 - 251111",
    "bloodGroups": [
      "A+",
      "B+"
    ]
  },
  {
    "name": "General Hospital Blood Bank",
    "lat": 8.500115,
    "lng": 76.94234,
    "address": "",
    "phone": "0471 2307874",
    "bloodGroups": [
      "B+",
      "A+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "District Head Quarters Hospital Blood Bank Bhawanipatna",
    "lat": 19.901936,
    "lng": 83.159977,
    "address": "Hospital Road, SH 44,",
    "phone": "06670 234952",
    "bloodGroups": [
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Manas Blood Bank of Chinmayi Swasthya Seva Sadhbhav Shikshan Samiti",
    "lat": 23.26,
    "lng": 77.39,
    "address": "Motia Talab, Bhopal",
    "phone": "0755 4250909",
    "bloodGroups": [
      "B+",
      "O-",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Alchemist Institute of Medical Sciences Blood Bank",
    "lat": 28.439328,
    "lng": 77.10227,
    "address": "Alchemist Institute of Medical Sciences (A Unit of Alchemist Hospitals Limited) DLF Golf Course Road, Sector-53, Saraswati Kunj",
    "phone": "0124 4511111",
    "bloodGroups": [
      "O+",
      "A+",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Samarth Raktdan Kendra                                                             ",
    "lat": 22.949278,
    "lng": 73.630239,
    "address": "Samarth Raktdan Kendra, Gausala chowk, Daulatgunj Bazar, Dahod",
    "phone": "02673 223139, 02673 242514",
    "bloodGroups": [
      "A+",
      "B-",
      "AB+",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Cannannore Co-operative Hospital Society Blood Bank",
    "lat": 11.764148,
    "lng": 75.479831,
    "address": "Talap",
    "phone": "0490 2341604, 0490 2341035, 0490 2341036",
    "bloodGroups": [
      "B+",
      "B-",
      "O+",
      "A-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Bambhaniya Voluntary Blood Bank",
    "lat": 21.774103,
    "lng": 72.143714,
    "address": "Bambhaniya Voluntary Blood Bank Trade Centre, Kalanain Circle, Bhavnagar",
    "phone": "0278 2224744, 0278 3004744",
    "bloodGroups": [
      "O+",
      "AB+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Sadar Hospital Muzaffarpur Blood Bank",
    "lat": 26.122253,
    "lng": 85.382562,
    "address": "Sadar Hospital Blood Bank Muzaffarpur, Near Muzaffarpur Railway Station, Hospital Road, \r\n",
    "phone": "9431013092",
    "bloodGroups": [
      "B-",
      "AB+",
      "O+",
      "AB-",
      "A+",
      "O-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Vishnuprabha Charitable Trust Blood Bank",
    "lat": 22.964817,
    "lng": 76.046337,
    "address": "39, HIG, Chamunda Complex, Civil Lines",
    "phone": "07272 253110",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Annai Abirami Blood Bank",
    "lat": 9.915247,
    "lng": 78.119525,
    "address": "171/1, Opposite S K G & CO, South Masi Street, Kondaiyanaidu Ln, Periyar, Madurai Main",
    "phone": "0452 2339750",
    "bloodGroups": [
      "O-",
      "O+",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Central Hospital (MCL), Brajaraj Nagar",
    "lat": 21.8479363,
    "lng": 83.9174688,
    "address": "Blood Bank, Central Hospital (MCL),Brajaraj Nagar, Jharsuguda",
    "phone": "06760 269382",
    "bloodGroups": [
      "O-",
      "AB+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 9.848086,
    "lng": 76.960597,
    "address": "",
    "phone": "0486 2232474",
    "bloodGroups": [
      "B-",
      "O+",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Malhotra Super Speciality Hospital Blood Bank ",
    "lat": 30.9491629,
    "lng": 76.8319738,
    "address": "(A Unit of Malhotra Clinics Private Limited), SCO No. 8, Himuda Bhatoli Kalan, Opp.- Mahavir Spinning Mills, Baddi",
    "phone": "01795 275009",
    "bloodGroups": [
      "B-",
      "O+"
    ]
  },
  {
    "name": "Tatpar Pathology and Diagnostic Centre Blood Bank",
    "lat": 23.25369,
    "lng": 77.412695,
    "address": "10, Neelam Colony, Bhopal",
    "phone": "0755 2576466",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank, RCH-II",
    "lat": 18.781716,
    "lng": 83.426752,
    "address": "Area Hospital Premises, First Floor, Belagam, Parvathipuram\r\n",
    "phone": "08963 222088",
    "bloodGroups": [
      "A-",
      "B+"
    ]
  },
  {
    "name": "Government Head quarters Hospital",
    "lat": 11.407951,
    "lng": 76.700279,
    "address": "Government Head quarters Hospital,Udagamandalam",
    "phone": "0423 2446146",
    "bloodGroups": [
      "A-",
      "O+",
      "O-",
      "AB-",
      "A+",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Rajiv Gandhi Government General Hospital",
    "lat": 13.081279,
    "lng": 80.27678,
    "address": "General Hospital Road\r\nPark Town,\r\nChennai, Tamil Nadu ",
    "phone": "044 25305711,  044 2530 5000",
    "bloodGroups": [
      "O+",
      "B+",
      "A-",
      "AB-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Cosmos Hospital, Multi Speciality and Trauma Centre",
    "lat": 28.894018,
    "lng": 78.729084,
    "address": "Prem Nagar, P.O.- Kazipura, Kanth Road",
    "phone": "0591 2555500, 0591 2555501",
    "bloodGroups": [
      "O-",
      "A-",
      "AB-",
      "O+",
      "B+",
      "B-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Rajasthan Atomic Power Station (R.A.P.S) Hospital Blood Bank ",
    "lat": 24.873676,
    "lng": 75.617899,
    "address": "Chittaurgarh",
    "phone": "01475 233250",
    "bloodGroups": [
      "B+",
      "O-",
      "AB+",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Shiv Shakti Blood Bank",
    "lat": 29.536432,
    "lng": 75.022062,
    "address": "Guru Gobind Singh Marg, B Block,Opposite to Valmiki Chowk",
    "phone": "01666 234735, 01666 234117 ",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "SNG Hospital Blood Bank",
    "lat": 22.720246,
    "lng": 75.8817,
    "address": "16/1, South Tukoganj Kanchan Bagh, Main Road, Near Crown Palace Hotel\r\n",
    "phone": "0731 4219191, 0731 2525555",
    "bloodGroups": [
      "B-",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Jeevanshri Raktapedi",
    "lat": 21.045399,
    "lng": 75.063926,
    "address": "Ist Floor, Rasmanju Complex, Bhagwat Road, Amalner ",
    "phone": "9226894187",
    "bloodGroups": [
      "A-",
      "O+"
    ]
  },
  {
    "name": "Krishna Rotary Blood Bank",
    "lat": 25.153422,
    "lng": 75.851833,
    "address": "1-A- 12, S.F.S., Doctor\u00e2\u20ac\u2122s Enclave, Talwandi",
    "phone": "0744 3291661",
    "bloodGroups": [
      "A-",
      "AB+",
      "A+",
      "B+",
      "O-",
      "O+",
      "B-"
    ]
  },
  {
    "name": "The Coimbatore Bio Medical Services Blood Bank",
    "lat": 11.014581,
    "lng": 76.953349,
    "address": "No.190A, Bashyakarlu Road East, R.S. Puram",
    "phone": "0422 2552297",
    "bloodGroups": [
      "A+",
      "B-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Patel Hospital Private Limited Blood Bank",
    "lat": 31.323729,
    "lng": 75.578156,
    "address": "Civil Lines, Behind Hotel Skylark",
    "phone": " 0181 3041255, 0181 3041027, 0181 304 1000",
    "bloodGroups": [
      "AB+",
      "AB-",
      "B+",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Kamakshi Hospital Blood Bank",
    "lat": 12.299739,
    "lng": 76.623762,
    "address": "1st Floor, New Building of Kamakshi Hospital Premises, Kuvempnagar Mysore",
    "phone": "0821 2545981  ",
    "bloodGroups": [
      "B-",
      "A-",
      "A+",
      "B+",
      "AB+",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Emergency Blood Bank",
    "lat": 26.191025,
    "lng": 78.155889,
    "address": "1, Kasturba Market, Kampoo",
    "phone": "0751 262 5377",
    "bloodGroups": [
      "O+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Silver Oaks Hospital Blood Bank",
    "lat": 30.692232,
    "lng": 76.733098,
    "address": "Phase 9, Sector 63, SAS Nagar, Sahibzada Ajit Singh Nagar, \r\nPunjab India, SAS Nagar",
    "phone": "0172 5097113, 0172 5063618",
    "bloodGroups": [
      "O-",
      "AB+",
      "B+",
      "B-",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Azad Panchi Group Charitable Trust Blood Bank",
    "lat": 16.844539,
    "lng": 74.572891,
    "address": "Near Civil Hospital, Ganesh Nagar, 1st Lane, S. No. 1682, Sangli\r\n",
    "phone": "0233 2374333",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank",
    "lat": 18.87247,
    "lng": 79.444699,
    "address": " Ground Floor, Area Hospital, I.B Chaurastha",
    "phone": "08736259259, 08736252259",
    "bloodGroups": [
      "AB+",
      "A+",
      "B-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Miraj Medical Centre - Wanless Hospital Blood Bank",
    "lat": 16.832135,
    "lng": 74.645472,
    "address": "Wanless Hospital Blood Bank, Medical Centre, Miraj",
    "phone": "0233 2223291, 0233 2223292, 0233 2223293, 0233 2223294, 0233 2223295",
    "bloodGroups": [
      "O+",
      "A-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Seth Makhan Lal Mahawar Charitable Blood Bank Society",
    "lat": 27.550891,
    "lng": 76.615215,
    "address": "Red Cross Bhavan, Near Income Tax Bhawan, Moti Dungari, ",
    "phone": "0144 2348277",
    "bloodGroups": [
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Immuno-Haematology & Blood Transfusion Centre, Rourkela",
    "lat": 22.2640892,
    "lng": 84.8651084,
    "address": "ISPAT General Hospital, Steel Authority of India ltd. Rourkela Steel Plant, Sector - 19",
    "phone": "6612439919",
    "bloodGroups": [
      "AB+",
      "O-",
      "B+",
      "O+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Chalmeda Ananda Rao Institute of Medical Sciences Blood Bank",
    "lat": 18.45324,
    "lng": 79.165083,
    "address": "Block C, Ground Floor, Bommakal (V), Karimnagar",
    "phone": "0878 2285565, 0878 2285318",
    "bloodGroups": [
      "A+",
      "A-",
      "AB-",
      "O-",
      "B+",
      "O+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Capital Hospital ",
    "lat": 20.260999,
    "lng": 85.82211,
    "address": "Capital Hospital, Udyan Marg, Unit-6, Ganga Nagar",
    "phone": "0674 2394985",
    "bloodGroups": [
      "A-",
      "B-"
    ]
  },
  {
    "name": "Kohli Blood Bank and Components Private limited",
    "lat": 26.865274,
    "lng": 80.911431,
    "address": "2nd Floor, A-Block, Kanchan Market, Chowk",
    "phone": "0522 2259004",
    "bloodGroups": [
      "AB+",
      "O-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Seva Blood Bank",
    "lat": 19.215715,
    "lng": 73.091599,
    "address": "Pushpadev Apartment, Basement, Opposite to Manav Kalyan Kendra, Near Sarvesh Hall, Dombivali ",
    "phone": "0251 2442283",
    "bloodGroups": [
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Blood Line Blood Bank",
    "lat": 19.200762,
    "lng": 72.97498,
    "address": "Swargiya Dharmvir Anand Dighe Sankool, Tika No-10, Near Vikas Palm, Dr. Ambedkar Road, Thane (W) ",
    "phone": "022 25374000, 022 25375000, 022 25376000",
    "bloodGroups": [
      "B+",
      "B-"
    ]
  },
  {
    "name": "Shri Krishna Blood Bank",
    "lat": 17.83503,
    "lng": 76.622149,
    "address": "Dr. Patange Hospital Building, Ajay Nagar Omerga, Omerga,  Osmanabad  ",
    "phone": "02457 252004, 02457 252232, 02457 252469",
    "bloodGroups": [
      "B+",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "M/s. S R Super Speciality Hospital Blood Bank",
    "lat": 8.7081618,
    "lng": 76.7316653,
    "address": "Building No 09/1109, 4th Floor, Akathumuri, Vennicode P O, Varkala ",
    "phone": "0470 2611176",
    "bloodGroups": [
      "AB-",
      "O+"
    ]
  },
  {
    "name": "MIOT Hospital Blood Bank",
    "lat": 13.021971,
    "lng": 80.186066,
    "address": "No. 4/112 Mount Poonamelle Road, Manapakkam, Chennai",
    "phone": "044 22492288, 044 42002288",
    "bloodGroups": [
      "O+",
      "A-"
    ]
  },
  {
    "name": "Golvalkar Guruji Blood Bank",
    "lat": 19.168646,
    "lng": 77.326553,
    "address": "Plot No.2-12-407, Bandhaghat Road, Vazirabad, Nanded",
    "phone": "02462 243300",
    "bloodGroups": [
      "O+",
      "B-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Sakra World Hospital Blood Bank",
    "lat": 12.932125,
    "lng": 77.685263,
    "address": "Sakra world Hospital (A Unit of Takshasila Hospitals Operating Private Limited), S.No. 52/2 and 52/3, Devarabeesanahalli, Varthur Hobli, Bellandur Post",
    "phone": "080 49694916 ",
    "bloodGroups": [
      "B+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Jagatsinghpur",
    "lat": 20.251662,
    "lng": 86.179783,
    "address": "District Head Quarters Hospital, Jagatsinghpur",
    "phone": "06724 221808",
    "bloodGroups": [
      "B+",
      "AB+",
      "B-",
      "A-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Jowai Civil Hospital Blood Bank   ",
    "lat": 25.438521,
    "lng": 92.199331,
    "address": "Jowai Civil Hospital, Durlong\r\nOpp. Lower Primary School Panaliar,\r\nPanaliar Towai",
    "phone": "03652 20735",
    "bloodGroups": [
      "O+",
      "A+",
      "B+",
      "AB-",
      "O-",
      "B-"
    ]
  },
  {
    "name": "M/s. Sri Siddartha Medical College Hospital Blood Bank",
    "lat": 13.160791,
    "lng": 77.323405,
    "address": "Sri Siddhartha Medical College & Hospital, T.Begur, Nelamangala Tq",
    "phone": "9901669103",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Max Super Specialty Hospital Blood Bank",
    "lat": 28.527512,
    "lng": 77.213547,
    "address": "Max Super Specialty Hospital, Heart and Vascular Institute (A Unit of Devki Devi Foundation Institute), 2, Press Enclave Road, Saket",
    "phone": "011 26515050, 011 26505252",
    "bloodGroups": [
      "B-",
      "AB+",
      "A-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Saifee Hospital Trust Blood Bank",
    "lat": 18.952471,
    "lng": 72.818058,
    "address": "15/17, Maharishi Karve Marg, Opposite to Charni Road Station Mumbai",
    "phone": "022 67571140",
    "bloodGroups": [
      "B+",
      "O-"
    ]
  },
  {
    "name": "Sri Jayadeva Institute of Cardiology Blood Bank",
    "lat": 12.917957,
    "lng": 77.599329,
    "address": "Gurappanapaly Post, Banneraghatta Road",
    "phone": "080 22977213",
    "bloodGroups": [
      "B-",
      "AB-",
      "O+",
      "A-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Sanjaya Gandhi Accident Hospital and Research Institute Blood Bank",
    "lat": 12.935769,
    "lng": 77.593859,
    "address": "Jayanagar East, Byrasandra",
    "phone": "080 26564516",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "General Chest Hospital",
    "lat": 17.445384,
    "lng": 78.434951,
    "address": "Blood Bank Medical Officer,  Blood Bank, General and Chest Hospital, Irrumnuma, Hyderabad",
    "phone": "040-23814939",
    "bloodGroups": [
      "AB-",
      "O+",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Nabha Civil Hospital Blood Bank",
    "lat": 30.370999,
    "lng": 76.146125,
    "address": "Nabha",
    "phone": "01765 226361, 01765 220 644",
    "bloodGroups": [
      "B+",
      "A+"
    ]
  },
  {
    "name": "Central Hospital Blood Bank Joda",
    "lat": 22.036011,
    "lng": 85.434191,
    "address": "Blood Bank,Central  Hospital, Joda, Keonjhar",
    "phone": "06767 272231",
    "bloodGroups": [
      "A+",
      "A-",
      "O+",
      "AB-",
      "B-",
      "O-"
    ]
  },
  {
    "name": "ICON Blood Bank - Ganediwal Charitable Trust",
    "lat": 20.713446,
    "lng": 77.011958,
    "address": "Ganediwal Charitable Trust, ICON Blood Bank, ICON Hospital, Kedia Plot, Akola",
    "phone": "0724 2411263",
    "bloodGroups": [
      "AB+",
      "B+"
    ]
  },
  {
    "name": "SRM Medical College Hospital Blood Bank",
    "lat": 12.822849,
    "lng": 80.048734,
    "address": "SRM Nagar, Potheri, Kattankulathur, Kancheepuram",
    "phone": "044 27455707, 044 2745 5510",
    "bloodGroups": [
      "A+",
      "B+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Aharya Harihar Red Cross Blood Bank",
    "lat": 19.814381,
    "lng": 85.829648,
    "address": "District Head Quarters Hospital, Grand Road ",
    "phone": "06752 224097",
    "bloodGroups": [
      "A+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Malhotra Super Speciality Hospital Blood Bank ",
    "lat": 30.9491629,
    "lng": 76.8319738,
    "address": "(A Unit of Malhotra Clinics Private Limited), SCO No. 8, Himuda Bhatoli Kalan, Opp.- Mahavir Spinning Mills, Baddi",
    "phone": "01795 275009",
    "bloodGroups": [
      "B-",
      "O+"
    ]
  },
  {
    "name": "Seva Blood Bank",
    "lat": 20.552689,
    "lng": 74.516643,
    "address": "Nilkanth Building, Satana Naka, Satana Road, Malegaon, Nashik",
    "phone": "02554 257077",
    "bloodGroups": [
      "AB-",
      "A+",
      "B+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Rajpura Civil Hospital Blood Bank",
    "lat": 30.478441,
    "lng": 76.584065,
    "address": "AP Jain Hospital, Rajpura",
    "phone": "01762 225539, 0175 221 2055",
    "bloodGroups": [
      "A+",
      "B-",
      "O+",
      "O-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Rotary K. R. Hospital Blood Bank",
    "lat": 12.941937,
    "lng": 77.553588,
    "address": " No. 75, Hanumanthanagar, 50 Feet Road, Bengaluru ",
    "phone": "080 28437393",
    "bloodGroups": [
      "A-",
      "AB-",
      "B+",
      "A+",
      "O-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "F.H. Hospital Blood Bank",
    "lat": 27.230412,
    "lng": 78.212065,
    "address": "Near Etmadpur, Railway over Bridge NH-2, Tundla District, Firozabad",
    "phone": "08477936666, 08194005712",
    "bloodGroups": [
      "B-",
      "AB+",
      "B+",
      "A+",
      "AB-",
      "O-",
      "A-"
    ]
  },
  {
    "name": "I.N.H.S. Dhanvantri",
    "lat": 11.649693,
    "lng": 92.717418,
    "address": "Ashvini Nagar, Port Blair, Andaman and Nicobar Islands.",
    "phone": "03192 248759",
    "bloodGroups": [
      "B-",
      "AB+",
      "O+",
      "A-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Belgaum Blood Bank and Diagnostic Laboratory",
    "lat": 15.860356,
    "lng": 74.512478,
    "address": "3137, Huns Talkies Road, (opposite to Central High School)",
    "phone": "0831 2425835",
    "bloodGroups": [
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Subharti Hospital Blood Bank",
    "lat": 28.961414,
    "lng": 77.638197,
    "address": " Meerut by Pass Road",
    "phone": "0121 2439150, 0121 2439112",
    "bloodGroups": [
      "B-",
      "A-",
      "AB-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Jalandhar Civil Hospital",
    "lat": 31.330707,
    "lng": 75.565197,
    "address": "Near Police Station,Jyothi Chowk, Islam Ganj",
    "phone": "0181 2233356,  0181 222 7982",
    "bloodGroups": [
      "B+",
      "O-",
      "A-",
      "AB-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Lakeshore HospitalandResearch Centre Limited Blood Bank",
    "lat": 9.918926,
    "lng": 76.318973,
    "address": "Nettoor",
    "phone": "0484 2701033",
    "bloodGroups": [
      "B+",
      "O+",
      "A-",
      "AB+",
      "O-",
      "A+",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Government Kilpauk Medical College Hospital Blood Bank",
    "lat": 13.078315,
    "lng": 80.243824,
    "address": "Government Kilpauk Medical College and Hospital,                    822, Poonamallee High Rd, Kilpauk, Chennai  ",
    "phone": "044 28364955",
    "bloodGroups": [
      "O+",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Haldia Sub Divisional Hospital Blood Bank",
    "lat": 22.0806305,
    "lng": 88.142764,
    "address": "Basudevpur, P.O.-Khanganchak, PS- Durgachak\r\n\r\nNear SDO office Haldia and ADM Office",
    "phone": "032 24277441",
    "bloodGroups": [
      "B-",
      "A-",
      "AB-",
      "O+",
      "B+",
      "O-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Government Y.N. Hospital Blood Bank",
    "lat": 26.581635,
    "lng": 74.861008,
    "address": "Kishangarh Road, Mitra Niwas Colony\r\nNear R.K House",
    "phone": "01463 245602",
    "bloodGroups": [
      "O-",
      "A+",
      "O+",
      "A-",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Vaidynath Blood Bank",
    "lat": 18.842659,
    "lng": 76.535058,
    "address": "Mundhe Children Hospital, Near Dube Petrol Pump, Jai Nagar, Parli-Vaijnath, Beed",
    "phone": "02446 223584",
    "bloodGroups": [
      "O-",
      "A-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 23.832575,
    "lng": 80.39196,
    "address": "Government  District Hospital",
    "phone": "07622 230367",
    "bloodGroups": [
      "A+",
      "AB+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Jalore Government General Hospital Blood Bank",
    "lat": 25.235099,
    "lng": 72.504023,
    "address": "Vedhaynath Colony, Jalore",
    "phone": "02973-225098, 02973 225090",
    "bloodGroups": [
      "B-",
      "O-"
    ]
  },
  {
    "name": "National Institute of Medical Sciences Blood bank",
    "lat": 27.192337,
    "lng": 75.954816,
    "address": "Shobha Nagar, Jaipur-Delhi Highway (NH-11C)",
    "phone": "0142 6513118, 0141 2605050",
    "bloodGroups": [
      "B+",
      "A+",
      "AB+",
      "O-",
      "AB-",
      "A-",
      "O+"
    ]
  },
  {
    "name": "R.K. District Hospital Blood Bank",
    "lat": 25.024193,
    "lng": 73.883611,
    "address": "Haribhau Upadhyay Nagar, Rajsamand.",
    "phone": "02952220433, 02952 220529, 02952 220033",
    "bloodGroups": [
      "O-",
      "AB-",
      "A+",
      "B+",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "District Hospital Blood Bank Lawngtlai",
    "lat": 22.536684,
    "lng": 92.888179,
    "address": "District Hospital, Electric veng, Near CMO office, Lawngtlai",
    "phone": "03835 232210",
    "bloodGroups": [
      "B+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Swami Vivekanand Charitable Blood Bank",
    "lat": 27.874974,
    "lng": 79.915468,
    "address": "  A unit of Swami Vivekanand Charitable Trust Regd.,   Near Anta Chauraha",
    "phone": "05842 280224",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Regional Blood Transfusion Centre - District Hospital",
    "lat": 10.105151,
    "lng": 76.355191,
    "address": "Railway Station Road, Periyar Nagar",
    "phone": "0484 2625101",
    "bloodGroups": [
      "O+",
      "O-",
      "A-",
      "B-",
      "AB+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Sadar Hospital Khagaria Blood Bank ",
    "lat": 25.50788,
    "lng": 86.474581,
    "address": "Ward Number 14, Khagaria",
    "phone": "06244 222 134",
    "bloodGroups": [
      "A-",
      "B+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Upper Siang District Hospital Blood Bank",
    "lat": 28.641662,
    "lng": 95.025348,
    "address": "District Hospital, Yingkiong, Upper Siang District, \r\nArunachal Pradesh.",
    "phone": "03777 222545",
    "bloodGroups": [
      "A-",
      "B+",
      "O-",
      "AB+",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Indian Red Cross Society (IRCS), Kalol, Gandhinagar",
    "lat": 22.608583,
    "lng": 73.459578,
    "address": "Blood Bank, Indian Red Cross Society, Sheth C.S. Municipal Hospital, Kalol, Gandhinagar",
    "phone": "02764 227836  ",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Jeeva Raksha Blood Bank",
    "lat": 13.0032624,
    "lng": 76.0975902,
    "address": "Vokkaligara Hostel Building, Ist Floor, B.M.Road",
    "phone": "08172 26204 ",
    "bloodGroups": [
      "B-",
      "AB+",
      "A+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Swami Dayanand Hospital Blood Bank",
    "lat": 28.678471,
    "lng": 77.304087,
    "address": "Dilshad Garden ",
    "phone": "011 22581031, 011 22583809 ",
    "bloodGroups": [
      "AB+",
      "B+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Soban Singh Jeena Base Hospital (SSJ) Blood Bank",
    "lat": 29.215833,
    "lng": 79.52931,
    "address": "Near Roadways Bus Stand, Haldwani ",
    "phone": "0594 625 0223",
    "bloodGroups": [
      "A+",
      "B-"
    ]
  },
  {
    "name": " Sadar Hospital, Gopalganj Blood Bank",
    "lat": 26.460762,
    "lng": 84.441119,
    "address": "Ward No. 15, Gopalganj",
    "phone": "06156-224754",
    "bloodGroups": [
      "B+",
      "AB-",
      "A+",
      "AB+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Sudiksha Prabhu Hospital Blood Bank and Research Centre",
    "lat": 9.172693,
    "lng": 77.864944,
    "address": "59,60, Chokkan Urani Street, AKS Theatre Road\r\nV.O.C. Nagar, Kadershan Koil, Kovilpatti",
    "phone": "04632 233939, 04632 233828",
    "bloodGroups": [
      "A-",
      "A+"
    ]
  },
  {
    "name": "Air Force Hospital Blood Bank",
    "lat": 26.759066,
    "lng": 83.420833,
    "address": "Maharajganj",
    "phone": "0551 2272381",
    "bloodGroups": [
      "B-",
      "O+",
      "A-",
      "AB-",
      "AB+",
      "B+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Garhwa Sadar Hospital Campus Blood Bank ",
    "lat": 24.158163,
    "lng": 83.802052,
    "address": "Blood Bank, Sadar Hospital Garhwa",
    "phone": "06561 222005",
    "bloodGroups": [
      "B-",
      "A+",
      "AB+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Arpan Voluntary (Marathwada)  Blood Bank",
    "lat": 19.875504,
    "lng": 75.352445,
    "address": "2nd Floor, Soniya Chambers, Near Uddhanpula, Seven Hills, Jalna Road, Aurangabad\r\n",
    "phone": "0240 2345359, 0240 6604204",
    "bloodGroups": [
      "O+",
      "B+",
      "A-",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Tinsukia Blood Bank",
    "lat": 27.490438,
    "lng": 95.363017,
    "address": "S.R. Lohia Road, Chiravapathy, IMA House, Tinsukia",
    "phone": "0374 2332080",
    "bloodGroups": [
      "A-",
      "O+",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Muthukumaran Medical College Hospital and Research Institute",
    "lat": 13.017931,
    "lng": 80.108969,
    "address": "Chikkarayapuram, Chennai, Tamil Nadu",
    "phone": "044 66344000, 044 24784000",
    "bloodGroups": [
      "A+",
      "O+",
      "B+",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Bengaluru Blood Bank and Diagnostic Laboratory",
    "lat": 12.998074,
    "lng": 77.571614,
    "address": "Between 6th and 7th Cross, Opposite R.R.Gold Palace, Sampige Road,Malleshwaram",
    "phone": "080 23347714",
    "bloodGroups": [
      "AB-",
      "O-",
      "AB+",
      "O+",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 10.583823,
    "lng": 77.247247,
    "address": "Government Hospital, VOC Street, Udumalpet",
    "phone": "04252 220092",
    "bloodGroups": [
      "A-",
      "O-"
    ]
  },
  {
    "name": "Raiganj Blood Bank, Uttar Dinajpur Raiganj District Hospital",
    "lat": 25.609904,
    "lng": 88.132494,
    "address": "P.O. Raiganj",
    "phone": "03523 241400",
    "bloodGroups": [
      "O+",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "M/s. K. N. Gujar Blood Bank",
    "lat": 17.278263,
    "lng": 74.183727,
    "address": "M/s K.N. Gujar Blood Bank, F. P. No. 21, 203/A/6, 1st Floor, K.N. Gujar Hospital, Shanivar Peth, Near S.T. Bus Stand, Karad, Satara",
    "phone": "02164 222868 ",
    "bloodGroups": [
      "B-",
      "O-",
      "AB-",
      "A+",
      "AB+",
      "O+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Aarohi Blood Bank",
    "lat": 17.411615,
    "lng": 78.449834,
    "address": "No.6-3-182/1 to 3, 3rd Floor, \r\nLake View Palace, \r\nRoad No.1, Banjara Hills\r\n",
    "phone": "040 23384212\t",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Sundergarh",
    "lat": 22.118256,
    "lng": 84.036159,
    "address": "District Headquarter Hospital Premises, Sundargarh",
    "phone": "06622 273225",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Greater Jorhat Lions Blood Bank",
    "lat": 26.753059,
    "lng": 94.185964,
    "address": "Lions Multiple Service Centre, Sonali Jayanti Nagar",
    "phone": "09854665019, 09854050900",
    "bloodGroups": [
      "A+",
      "A-",
      "B+",
      "B-"
    ]
  },
  {
    "name": "Riya Hospital Blood Bank",
    "lat": 26.487535,
    "lng": 76.740236,
    "address": "NH 11B, Adarsh Nagar",
    "phone": "07463-230080, 07463 233374",
    "bloodGroups": [
      "A+",
      "B+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "IRT Perunthurai Medical College Hospital Blood Bank",
    "lat": 11.280826,
    "lng": 77.567496,
    "address": "Perundurai, Erode ",
    "phone": "04294 220910  ",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Gold Field Hospital and Research Centre",
    "lat": 28.277083,
    "lng": 77.454948,
    "address": "Village and post office Chhainsa, Ballabgarh, Faridabad.",
    "phone": "0129 2209395, 0129 2209390 ",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Government Medical College Hospital Blood Bank",
    "lat": 12.845971,
    "lng": 79.135775,
    "address": "Arni Road, Arani Road, Opposite Staff Quarters, Adukkamparai, Vellore",
    "phone": "04162 263900",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Seth Makhan Lal Mahawar Charitable Blood Bank Society",
    "lat": 27.550891,
    "lng": 76.615215,
    "address": "Red Cross Bhavan, Near Income Tax Bhawan, Moti Dungari, ",
    "phone": "0144 2348277",
    "bloodGroups": [
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Sanjiban Hospital Blood Bank",
    "lat": 22.4807481,
    "lng": 88.1152976,
    "address": "A Unit of Chikitsabrati Udyog\r\nMonsatala More, Fuleswas, P.O. Sijberia",
    "phone": "033 71666026, 03371666000",
    "bloodGroups": [
      "AB+",
      "A-",
      "O-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "K.L.E.Society & Medical Research Centre Blood Bank",
    "lat": 15.887919,
    "lng": 74.519593,
    "address": "Nehru Nagar",
    "phone": "0832 2473777",
    "bloodGroups": [
      "AB-",
      "O-",
      "A+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "ESI Hospital Blood Bank",
    "lat": 11.009114,
    "lng": 77.023704,
    "address": "ESI Hospital, Kamarajar Road, Uppilipalayam, Varadharajapuram(P.O)",
    "phone": " 0422 2300871",
    "bloodGroups": [
      "A+",
      "B-"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 11.737301,
    "lng": 78.959375,
    "address": "Government Hospital, Kachirapalayam Road, Kallakurichi",
    "phone": "04151 222527",
    "bloodGroups": [
      "O+",
      "A+",
      "AB-",
      "AB+",
      "B-",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Bagla Combined District Hospital Blood Bank",
    "lat": 27.599857,
    "lng": 78.049858,
    "address": "",
    "phone": "05722 230094",
    "bloodGroups": [
      "B+",
      "B-"
    ]
  },
  {
    "name": "District Hospital Blood Bank Kolasib",
    "lat": 24.231419,
    "lng": 92.676799,
    "address": "Blood Bank, District Hospital, Kolasib\r\nVenglai, Kolasib, Hospital Road",
    "phone": "03837 221930",
    "bloodGroups": [
      "AB-",
      "AB+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Life Line Blood Centre",
    "lat": 30.343682,
    "lng": 76.399514,
    "address": "13-A, Walia Hospital, Corner View Colony, Dukhniwaran Road, Factory Area",
    "phone": "0175 2351532",
    "bloodGroups": [
      "O+",
      "B+",
      "AB-",
      "A+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Srishti Blood Bank",
    "lat": 21.247,
    "lng": 81.656,
    "address": "2nd Floor, Dhillon Complex, Near Sindhi School, Jawahar Nagar,",
    "phone": "7354111119",
    "bloodGroups": [
      "A+",
      "B-",
      "O+",
      "A-"
    ]
  },
  {
    "name": "ESI Hospital Blood Bank",
    "lat": 13.094828,
    "lng": 80.240417,
    "address": "The Blood Bank Medical Officer, ESI Hospital, Ayanavaram, \r\nChennai",
    "phone": "044 26449284",
    "bloodGroups": [
      "AB-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Air Force Hospital Blood Bank",
    "lat": 26.759066,
    "lng": 83.420833,
    "address": "Maharajganj",
    "phone": "0551 2272381",
    "bloodGroups": [
      "B-",
      "O+",
      "A-",
      "AB-",
      "AB+",
      "B+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "B.R. Singh Hospital Blood Bank",
    "lat": 22.565712,
    "lng": 88.370758,
    "address": "Eastern Railway, Sealdah ",
    "phone": "033 23523679",
    "bloodGroups": [
      "B+",
      "A+"
    ]
  },
  {
    "name": "Nagarmal Modi Seva Sadan Hospital Blood Bank",
    "lat": 23.371161,
    "lng": 85.317141,
    "address": "Blood Bank, Nagarmal Modi Seva Sadan Hospital, Upper Bazar, Ranchi",
    "phone": "9234460464",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "IGH Gas Rahat Blood Bank",
    "lat": 23.1549,
    "lng": 77.244677,
    "address": "Indira Gandhi Mahila Evam Bal Chikitsalaya Gas Rahat",
    "phone": "0755 2713100",
    "bloodGroups": [
      "A-",
      "B+",
      "AB-",
      "O-",
      "O+",
      "B-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Community Health Centre (T.H.Q) - General Hospital Blood Bank",
    "lat": 12.503397,
    "lng": 74.991726,
    "address": "",
    "phone": "0499 4225580",
    "bloodGroups": [
      "A+",
      "O-",
      "A-",
      "AB-",
      "B+",
      "O+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Siva Multi Speciality Hospital Blood Bank",
    "lat": 17.2508,
    "lng": 80.144151,
    "address": "H.No.11-2-44, Balaji Nagar, Wyra Road, Khammam",
    "phone": "08742 231883",
    "bloodGroups": [
      "O+",
      "B+",
      "B-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Sahiyadari Speciality Hospital Blood Bank",
    "lat": 18.513091,
    "lng": 73.839308,
    "address": "Kokoan Mitra Mandal Medical Port Trust&#39;s Sahiyadari Speciality Hospital Blood Bank, Plot No-30 C, Erandvane, Karve Road, Pune ",
    "phone": "020 25403232, 020 67213000",
    "bloodGroups": [
      "O-",
      "AB+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 26.262708,
    "lng": 82.069909,
    "address": "Sultanpur",
    "phone": "9415168259",
    "bloodGroups": [
      "O+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank Himmatnagar",
    "lat": 23.056733,
    "lng": 72.573372,
    "address": "Blood Bank., Indian Red Cross Society Sabarkantha District Branch, Sheth Shri Jamanadas Madhavji Tanna , Red Cross Bhavan, Nr. G.P.O., State Highway, \r\nHimmatnagar, Sabarkantha",
    "phone": "02772 240789, 02772 245110",
    "bloodGroups": [
      "AB+",
      "B-",
      "AB-",
      "B+",
      "A-",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Jeevanshri Raktapedi",
    "lat": 21.045399,
    "lng": 75.063926,
    "address": "Ist Floor, Rasmanju Complex, Bhagwat Road, Amalner ",
    "phone": "9226894187",
    "bloodGroups": [
      "A-",
      "O+"
    ]
  },
  {
    "name": "Indian Red Cross Society ",
    "lat": 16.233659,
    "lng": 77.808136,
    "address": "Blood Bank, Area Hospital, Gadwal, Mahaboobnagar",
    "phone": "08546 271757",
    "bloodGroups": [
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Shri Ramkaran Joshi General Hospital Bood bank",
    "lat": 26.883949,
    "lng": 76.335767,
    "address": "Lalsot, Dausa, NH-11A, Lalsot Road, ",
    "phone": "01427-220960, 01427 220223",
    "bloodGroups": [
      "A-",
      "AB-"
    ]
  },
  {
    "name": "District Hospital",
    "lat": 25.293146,
    "lng": 79.88485,
    "address": "Makaniya Purva, Mahoba",
    "phone": "",
    "bloodGroups": [
      "B+",
      "AB+",
      "B-",
      "AB-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Navjivan Blood Bank",
    "lat": 19.000048,
    "lng": 75.755254,
    "address": "Plot No 2-10-240 1 st Floor, Jalna Road, Opposite to M.S.E.B. Office, Beed ",
    "phone": "02442 233423, 02442 232434, 02442 223975",
    "bloodGroups": [
      "B+",
      "A-",
      "AB+",
      "B-",
      "AB-",
      "O-",
      "A+"
    ]
  },
  {
    "name": " Apollo Hospital International Limited Blood Bank",
    "lat": 23.109635,
    "lng": 72.625835,
    "address": "Blood Bank, Apollo Hospital International Limited, Block No. 1/A, GIDC estate, BHAT, Gandhinagar",
    "phone": "079 66701825",
    "bloodGroups": [
      "O+",
      "A-",
      "A+",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Government Medical College and Hospital Blood Bank",
    "lat": 25.999845,
    "lng": 79.473401,
    "address": "Government Medical College and Hospital, Orai",
    "phone": "05162 210201",
    "bloodGroups": [
      "O+",
      "AB-",
      "B-",
      "A-",
      "O-",
      "B+",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "ILS Hospital Blood Bank",
    "lat": 23.867534,
    "lng": 91.289606,
    "address": "Capital Complex Extension, P.O. New Secretariat, Kunjaban, Agartala, Tripura.\r\n\r\n",
    "phone": "0381 2415000",
    "bloodGroups": [
      "A-",
      "A+",
      "O+",
      "AB-",
      "B+",
      "B-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Agrasen Blood Bank",
    "lat": 26.957297,
    "lng": 75.777845,
    "address": "Puran mal Phoola Devi Memorial Trust, Maharaja Agrasen Hospital Campus, Sector No-7, Vidyadhar Nagar.",
    "phone": "0141 2335569, 0141 2572954",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Sainik Hospital Blood Bank Namkum",
    "lat": 23.3496021,
    "lng": 85.3796172,
    "address": "Blood Bank, Sainik Hospital, Namkum, Ranchi",
    "phone": "0651 2260245",
    "bloodGroups": [
      "AB-",
      "AB+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Rajouri District Hospital Blood Bank ",
    "lat": 33.3880811,
    "lng": 74.316008,
    "address": "District Hospital,  kheora, Rajouri\r\n",
    "phone": "01962 263209",
    "bloodGroups": [
      "AB-",
      "B-",
      "O-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Malerkotla Civil Hospital Blood Bank ",
    "lat": 30.26952,
    "lng": 75.809513,
    "address": "Railway Rd, Agar Nagar",
    "phone": "01675 253057",
    "bloodGroups": [
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Civil Hospital Blood Bank Saiha",
    "lat": 22.488391,
    "lng": 92.982668,
    "address": "District Hospital, New Saiha West, Saiha",
    "phone": "03835 222388",
    "bloodGroups": [
      "A+",
      "AB+",
      "B-",
      "A-",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 25.905078,
    "lng": 93.731607,
    "address": "District Hospital Colony, Dimapur",
    "phone": "9436009493",
    "bloodGroups": [
      "B-",
      "O-",
      "B+",
      "AB-",
      "AB+",
      "A-",
      "O+"
    ]
  },
  {
    "name": "M/s. Good Samaritan Blood Bank",
    "lat": 18.179738,
    "lng": 83.39551,
    "address": "D.No.13-1, Good Samaritan Cancer and General Hospital, Vangayagudem, Eluru, West Godavari\r\n",
    "phone": "08812 246430, 08812 246947",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Sewa Blood Bank",
    "lat": 21.890931,
    "lng": 83.3966244,
    "address": "Opposite to Kirodimal district hospital, Gopi Talkies Road",
    "phone": "07762 225400",
    "bloodGroups": [
      "A+",
      "A-",
      "AB+",
      "O-",
      "AB-",
      "B+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Capital Hospital ",
    "lat": 20.260999,
    "lng": 85.82211,
    "address": "Capital Hospital, Udyan Marg, Unit-6, Ganga Nagar",
    "phone": "0674 2394985",
    "bloodGroups": [
      "A-",
      "B-"
    ]
  },
  {
    "name": "ASN Raju Charitable Trust Blood Bank",
    "lat": 16.54391,
    "lng": 81.516237,
    "address": "D.No. 24-1-1, R.K. Plaza (Sarovar complex), J. P. Raod, Bhimavaram\r\n",
    "phone": "08816 225556",
    "bloodGroups": [
      "O-",
      "B-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 25.759674,
    "lng": 82.696747,
    "address": "Ghaziabad",
    "phone": "05452 263554",
    "bloodGroups": [
      "B-",
      "O-",
      "A-",
      "B+",
      "A+",
      "AB-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 11.10168,
    "lng": 79.647377,
    "address": "GovernmentHospital, MainRoad, Mayiladuthurai",
    "phone": "04364 223451",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Meenakshi Hospital Blood Bank",
    "lat": 10.745435,
    "lng": 79.111902,
    "address": "SF No.244/2, 3rd Floor, Nilagiri Therkku Thottam Village,  Near New Bus Stand, Trichy Main Road, Tanjore\r\n",
    "phone": "0436 2226474",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Malabar Cancer Centre Society Blood Bank",
    "lat": 11.749387,
    "lng": 75.523483,
    "address": "Moozhikkara Post,",
    "phone": "0490 2355881, 0490 2355981",
    "bloodGroups": [
      "O-",
      "O+",
      "A-",
      "AB+",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Sri Balaji Action Medical Institute Blood Bank",
    "lat": 28.673738,
    "lng": 77.110226,
    "address": "Sri Balaji Action Medical Institute, FC-34, A-4, Paschim Vihar",
    "phone": "011 42888888, 011 45666666",
    "bloodGroups": [
      "B+",
      "B-",
      "AB-",
      "O+",
      "AB+",
      "O-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Thiruvalla Medical Mission Hospital Blood Bank",
    "lat": 9.393924,
    "lng": 76.578423,
    "address": "Post Box No. 74",
    "phone": "0469 2626096, 0469 2626000, 0469 2626262",
    "bloodGroups": [
      "A-",
      "AB-",
      "O-",
      "A+",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Sevaytan Swasthay Kalyan Blood Bank",
    "lat": 26.901102,
    "lng": 75.770403,
    "address": "Sevayatan Hospital, Ajmer Rd, Mittal Colony, Sodala\r\n",
    "phone": "1412220290",
    "bloodGroups": [
      "A+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Ganga Hospital Blood Bank",
    "lat": 26.172081,
    "lng": 91.759992,
    "address": "G. S. Road, Lachit Nagar, Ulubari, \r\nNear KFC; Neubari",
    "phone": "0361 2454742",
    "bloodGroups": [
      "B+",
      "A+"
    ]
  },
  {
    "name": "Johal Multispeciality Hospital Blood Bank",
    "lat": 31.321636,
    "lng": 75.632472,
    "address": "Hoshiarpur Road, Rama Mandi",
    "phone": "0181 2410820, 0181 2410620\t",
    "bloodGroups": [
      "O+",
      "B+",
      "AB+",
      "B-",
      "A-"
    ]
  },
  {
    "name": "Samarth Raktdan Kendra                                                             ",
    "lat": 22.949278,
    "lng": 73.630239,
    "address": "Samarth Raktdan Kendra, Gausala chowk, Daulatgunj Bazar, Dahod",
    "phone": "02673 223139, 02673 242514",
    "bloodGroups": [
      "A+",
      "B-",
      "AB+",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Sanjeevani Blood Bank",
    "lat": 19.975586,
    "lng": 73.803963,
    "address": "Nashik, Krushna-Chaya Bangla, Plot No. 10/11, Kurdukar Nagar, Behind Fame Theatre, Nashik Pune Road, Nashik ",
    "phone": "0253 2411888  ",
    "bloodGroups": [
      "A-",
      "AB-",
      "B+",
      "B-",
      "A+",
      "O-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "J.C. Voluntary Blood Bank",
    "lat": 13.337779,
    "lng": 77.11681,
    "address": "Plot No. 5421, II Floor, Narasimha Building, Nisarga Layout, B.H. Road",
    "phone": "08162 272980 ",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Subarnapur",
    "lat": 20.843647,
    "lng": 83.907,
    "address": "District Headquarters Hospital Sonepur, Hospital Road, Near fire station",
    "phone": "06654 220150",
    "bloodGroups": [
      "AB+",
      "A+",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Meenakshi Hospital Blood Bank",
    "lat": 10.745435,
    "lng": 79.111902,
    "address": "SF No.244/2, 3rd Floor, Nilagiri Therkku Thottam Village,  Near New Bus Stand, Trichy Main Road, Tanjore\r\n",
    "phone": "0436 2226474",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Civil Surgeon, General Hospital Blood Bank Washim",
    "lat": 20.12259,
    "lng": 77.127893,
    "address": "General Hospital Blood Bank, Near Akola Naka,  Washim ",
    "phone": "07252 233066, 07252 233379",
    "bloodGroups": [
      "B+",
      "O+",
      "A+",
      "B-",
      "AB+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 20.708409,
    "lng": 76.566704,
    "address": "General Hospital Shegaon Road, Khamgaon, Buldhana",
    "phone": "07263 255332, 07263 254571",
    "bloodGroups": [
      "O+",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Bhabha Atomic Research Centre Hospital Blood Bank",
    "lat": 19.042464,
    "lng": 72.914358,
    "address": "BARC Hospital, Anushakti Nagar Mumbai",
    "phone": "022 25598353, 022 25598361, 022 25558494 ",
    "bloodGroups": [
      "AB+",
      "AB-",
      "O+",
      "O-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Indian Red Cross Society (IRCS), Kalol, Gandhinagar",
    "lat": 22.608583,
    "lng": 73.459578,
    "address": "Blood Bank, Indian Red Cross Society, Sheth C.S. Municipal Hospital, Kalol, Gandhinagar",
    "phone": "02764 227836  ",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "M/s. Sai Aadhar Hospital Blood Bank",
    "lat": 16.325218,
    "lng": 75.289397,
    "address": "Sai Aadhar Hospital, Yadwad Road",
    "phone": "08350 282100",
    "bloodGroups": [
      "AB-",
      "B+",
      "O-",
      "A-",
      "O+",
      "AB+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Shree Mahavir Health And Medical Relief Society Blood Bank",
    "lat": 21.184104,
    "lng": 72.813897,
    "address": "Blood Bank, Shree Mahavir Health And Medical Relief Society, Shri B.D.Mehta  Mahavir Heart Institute, Shree Mahavir Health Campus,  Athwagate, Ring road, Surat",
    "phone": "0261 2471770, 0261 2462116",
    "bloodGroups": [
      "B-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Menathottam Hospital Blood Bank",
    "lat": 9.381963,
    "lng": 76.77424,
    "address": "Angadi, Ranni",
    "phone": "04735 226227",
    "bloodGroups": [
      "A+",
      "B-"
    ]
  },
  {
    "name": "Jamnabai Blood Bank",
    "lat": 22.300308,
    "lng": 22.300308,
    "address": "Blood Bank, Jamnabai General Hospital, Vadodara",
    "phone": "0265 2517400",
    "bloodGroups": [
      "B+",
      "A-",
      "O-",
      "O+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Kanchan Medicare and Research Centre Private Limited Blood Bank",
    "lat": 24.648661,
    "lng": 77.302928,
    "address": "Lohati Bhawan, A. B. Road",
    "phone": "07542 226720",
    "bloodGroups": [
      "AB-",
      "B-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Swasthya Kalyan Blood Bank and Thalesemia Research Center",
    "lat": 26.916784,
    "lng": 75.829997,
    "address": "Swasthya Kalyan Bhawan, Narain Singh Road,  Near Trimurti Circle.\r\n",
    "phone": "0141 2545293, 0141 721771",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "SLMS Hospital Blood Bank",
    "lat": 17.376463,
    "lng": 78.557369,
    "address": "Nagole &#39;x&#39; Roads, Ranga Reddy",
    "phone": "040 64579998",
    "bloodGroups": [
      "B+",
      "O+",
      "AB+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Teerthankar Mahaveer Hospital and Research Centre",
    "lat": 28.822812,
    "lng": 78.65787,
    "address": "N.H. 24, Delhi Road, Bagadpur, Moradabad, Uttar Pradesh 244001",
    "phone": "0591 2476819, 16, 2360777 ",
    "bloodGroups": [
      "B-",
      "AB+",
      "AB-",
      "B+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "Nahan Regional Hospital Blood Bank ",
    "lat": 30.559933,
    "lng": 77.295483,
    "address": "Regional Hospital, Nahan ",
    "phone": "01702 223344",
    "bloodGroups": [
      "O+",
      "AB-",
      "AB+",
      "B-",
      "O-",
      "A+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Government Stanley Hospital Blood Bank",
    "lat": 13.105854,
    "lng": 80.285439,
    "address": "305 OSH Rd, Royapuram, Chennai, Tamil Nadu",
    "phone": "044 25284941",
    "bloodGroups": [
      "O+",
      "A-",
      "O-",
      "AB+",
      "B-",
      "AB-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "S.B.Voluntary Blood Bank",
    "lat": 18.673955,
    "lng": 78.102653,
    "address": " H.No.5-6-812, 3rd Floor, Amrutha Laxmi Hospital, Opposite Rajiv Gandhi Auditorium, Khaleelwadi, Nizamabad",
    "phone": "08462 646430",
    "bloodGroups": [
      "B-",
      "O+"
    ]
  },
  {
    "name": "Rotary and Blood Bank Society Resource Centre",
    "lat": 30.74211,
    "lng": 76.755138,
    "address": "Plot No:4, Dakshin Marg, Sector 37A, Chandigarh",
    "phone": "0172 2696057 ",
    "bloodGroups": [
      "AB+",
      "A-",
      "AB-",
      "B+",
      "B-",
      "O+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "J. S. S. Hospital Blood Bank",
    "lat": 12.29521,
    "lng": 76.65607,
    "address": "J S S Hospital, Ramanuja Road",
    "phone": "0821 2335009",
    "bloodGroups": [
      "AB+",
      "O-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "B.D. Pandey District Hospital Blood Bank",
    "lat": 29.587434,
    "lng": 80.211347,
    "address": "District Hospital Mallital, Nainital ",
    "phone": "05942 235022",
    "bloodGroups": [
      "B+",
      "O+",
      "AB-",
      "A-",
      "B-"
    ]
  },
  {
    "name": "NIMS Hospital Blood Bank",
    "lat": 8.30492,
    "lng": 76.5434,
    "address": "Aralumoodu",
    "phone": "0471 3951111",
    "bloodGroups": [
      "O+",
      "B+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Khurda",
    "lat": 20.0553881,
    "lng": 84.9466673,
    "address": "District Head Quarter Hospital, CDMO Campus, At/Po/Dt-Khordha\r\n",
    "phone": "06755 223978",
    "bloodGroups": [
      "O-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank Himmatnagar",
    "lat": 23.056733,
    "lng": 72.573372,
    "address": "Blood Bank., Indian Red Cross Society Sabarkantha District Branch, Sheth Shri Jamanadas Madhavji Tanna , Red Cross Bhavan, Nr. G.P.O., State Highway, \r\nHimmatnagar, Sabarkantha",
    "phone": "02772 240789, 02772 245110",
    "bloodGroups": [
      "AB+",
      "B-",
      "AB-",
      "B+",
      "A-",
      "O-",
      "O+"
    ]
  },
  {
    "name": "J.C. Voluntary Blood Bank",
    "lat": 13.337779,
    "lng": 77.11681,
    "address": "Plot No. 5421, II Floor, Narasimha Building, Nisarga Layout, B.H. Road",
    "phone": "08162 272980 ",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "SHUSHRUTHA VOLUNTARY BLOOD BANK",
    "lat": 12.9978842,
    "lng": 77.5411603,
    "address": "The Blood Bank Medical officer\r\nSushrutha Voluntary Blood Bank,\r\nNo:875,Modi Hospital Road,  Near Pristine Hospital",
    "phone": "080 23230777",
    "bloodGroups": [
      "O-",
      "O+",
      "A-",
      "AB-",
      "AB+",
      "A+",
      "B+",
      "B-"
    ]
  },
  {
    "name": "MLGH Trauma Centre Yamuna Nagar Blood Bank ",
    "lat": 30.1442,
    "lng": 77.303543,
    "address": "Civil Hospital Blood Bank, Jagadhari, Above Trauma Center, \r\nYamunanagar",
    "phone": "0173 220 0106",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Asian Heart Institute and Research Center",
    "lat": 19.065253,
    "lng": 72.860832,
    "address": "ICICI Tower,  Bandra Kurla Complex, Bandra (E) Mumbai",
    "phone": "022 66986666, 022 26508487",
    "bloodGroups": [
      "O+",
      "B-",
      "AB-",
      "O-"
    ]
  },
  {
    "name": "Indian Red Cross Society, Madanapalli RCH 2",
    "lat": 13.556927,
    "lng": 78.50085,
    "address": "Area Hospital, Patel Road, Madanapalli.\r\n",
    "phone": "08571 222087",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "M. T. Agarwal Municipal General Hospital Blood Bank",
    "lat": 19.177861,
    "lng": 72.946234,
    "address": "Dr. R. P. Road, Mulund (W), Mumbai",
    "phone": "022 25640767, 022 25605730 (Extn. 308)",
    "bloodGroups": [
      "A+",
      "O-"
    ]
  },
  {
    "name": "St. Judes Hospital Blood Bank",
    "lat": 25.462874,
    "lng": 78.547451,
    "address": "St. Judes Hospital Campus,\r\n Sipri, Jhansi",
    "phone": "0510 2360957",
    "bloodGroups": [
      "B-",
      "A-",
      "AB-",
      "O+",
      "AB+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "District Victoria Hospital Blood Bank",
    "lat": 23.172743,
    "lng": 79.936409,
    "address": "Government Seth Govinddas Victoria Hospital",
    "phone": "0761 2622202",
    "bloodGroups": [
      "AB+",
      "AB-",
      "O+",
      "A+",
      "B+",
      "O-",
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 28.027732,
    "lng": 79.126275,
    "address": "Bareilly",
    "phone": "05832 266264",
    "bloodGroups": [
      "AB+",
      "B+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "MIOT Hospital Blood Bank",
    "lat": 13.021971,
    "lng": 80.186066,
    "address": "No. 4/112 Mount Poonamelle Road, Manapakkam, Chennai",
    "phone": "044 22492288, 044 42002288",
    "bloodGroups": [
      "O+",
      "A-"
    ]
  },
  {
    "name": "Index Medical College Hospital and Research Centre Blood Bank",
    "lat": 22.732016,
    "lng": 75.888857,
    "address": "104, Trishul Apartment, 5, Sanghi Colony, Opposite to Amaltas Hotel, A.B. Road\r\n",
    "phone": "0731 4215757",
    "bloodGroups": [
      "AB-",
      "AB+",
      "O-",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Soban Singh Jeena Base Hospital (SSJ) Blood Bank",
    "lat": 29.215833,
    "lng": 79.52931,
    "address": "Near Roadways Bus Stand, Haldwani ",
    "phone": "0594 625 0223",
    "bloodGroups": [
      "A+",
      "B-"
    ]
  },
  {
    "name": "Mission Jan Jagriti Blood Bank",
    "lat": 28.501683,
    "lng": 77.246745,
    "address": "1, Altius Sonia Hospital, Basement, 1, Gulshan Park, Rohtak Road, Nangloi Metro Station, Metro Piller Number 444",
    "phone": "011 30580345, 011 30777777",
    "bloodGroups": [
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Kanaklata Civil Hospital Blood Bank",
    "lat": 26.628524,
    "lng": 92.796499,
    "address": "Main Road, Tezpur",
    "phone": "003712-252999, 03712 220033",
    "bloodGroups": [
      "O-",
      "B-",
      "AB+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "MGM Medical College Hospital Campus Blood Bank Jamshedpur",
    "lat": 22.811699,
    "lng": 86.210334,
    "address": "Sakchi, Jamshedpur",
    "phone": "0657 2230092 ",
    "bloodGroups": [
      "A+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Veerayoga Institute of Medical Sciences Speciality Hospitals Blood Bank",
    "lat": 12.948331,
    "lng": 77.699554,
    "address": "VIMS, No. 88, Marathhalli, Outer Ring Road",
    "phone": "080 4269800",
    "bloodGroups": [
      "A-",
      "B-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Aswini Hospital Private Limited Blood Bank",
    "lat": 10.534768,
    "lng": 76.214142,
    "address": "Karunakaran Nambiar Road",
    "phone": "0487 6612345, 0487 2475000",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Dr. P.D.M.H.C. Hospital and Research Centre Blood Bank",
    "lat": 20.923,
    "lng": 77.816645,
    "address": "Block-A,1st Floor, Shivaji Nagar, Amravati \r\n",
    "phone": "0721 2665545",
    "bloodGroups": [
      "A+",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Sadar Hospital Ara Blood Bank",
    "lat": 25.558506,
    "lng": 84.670631,
    "address": "Sadar Hospital Ara Blood Bank, Shivganj\r\n",
    "phone": "09507840742, 09334466166",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Sanjay Gandhi Hospital Blood Bank",
    "lat": 26.210663,
    "lng": 81.807126,
    "address": "SH 34, Katra Maharan",
    "phone": "05368 255009",
    "bloodGroups": [
      "B-",
      "AB+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Mary Immaculate Mission Hospital Blood Bank",
    "lat": 10.508889,
    "lng": 76.057764,
    "address": "Chuvakkad",
    "phone": "0487 2290237",
    "bloodGroups": [
      "AB-",
      "O-"
    ]
  },
  {
    "name": "NEW LIFE EDUCATIONAL SOCIETY BLOOD BANK ",
    "lat": 17.37694,
    "lng": 78.34905,
    "address": "22-1-1038,1st FLOOR,ABID ALI KHAN LIONS EYE HOSPITAL,DARULSHIFA, Hyderabad, TELANGANA",
    "phone": "040 24575757, 040 64558864",
    "bloodGroups": [
      "AB+",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Dhanwantri Blood Bank",
    "lat": 21.034297,
    "lng": 75.781029,
    "address": "H. No. 5/464/1, T. P. Scheme, No-1, Survey No 124/1/3A Plot No. 777/3, Jamner Road, Rangoli Hotel, Jawal Anand Nagar Bhusawal, Jalgaon ",
    "phone": "02582 243243",
    "bloodGroups": [
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Lower Assam Hospital Blood Bank",
    "lat": 26.492861,
    "lng": 90.551479,
    "address": "Chapaguri Road, North Bongaigaon",
    "phone": "3664230465",
    "bloodGroups": [
      "O-",
      "B-",
      "O+",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "Indian Red Cross Society",
    "lat": 17.054925,
    "lng": 79.273455,
    "address": " Blood Bank, D.No. 5-6-300, Red cross Bhavan, Near RTC Bus Stand, Nalgonda",
    "phone": "09849193555, 09866185147",
    "bloodGroups": [
      "AB+",
      "A-",
      "A+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Sheela Hospitals Blood Bank",
    "lat": 11.018303,
    "lng": 76.960319,
    "address": "No. 117, East Power House road, Tatabad,Coimbatore",
    "phone": "0422 4334500",
    "bloodGroups": [
      "B+",
      "A+",
      "O+",
      "AB-",
      "O-",
      "B-",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "The Institute of Child Health and Hospital for Children",
    "lat": 13.072798,
    "lng": 80.258257,
    "address": "Halls Road, Egmore, Chennai",
    "phone": "044 28191132  044 2819 2138",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Chodana Sub-District Hospital Blood Bank",
    "lat": 33.9429341,
    "lng": 74.7993502,
    "address": "Sub-District Hospital, Chadoora, Budgam",
    "phone": "01951 257236",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Shree Sai Blood Bank & Component",
    "lat": 18.99397,
    "lng": 73.106561,
    "address": "103,104,105,1st Floor Tirthraj Building, Old Thana Naka Road, Near Taluka Police Station,  Old Panvel, Raigad",
    "phone": "022 27467856, 022 27450885, 022 27463796",
    "bloodGroups": [
      "AB-",
      "O+",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 11.59695,
    "lng": 78.60139,
    "address": "Cuddalore Main Road, Attur, Salem District\r\n",
    "phone": "04282 243771",
    "bloodGroups": [
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Devkamal Hospital and Research Centre Blood Bank",
    "lat": 23.3691335,
    "lng": 85.2204851,
    "address": "Bajra Bazar, Bajra, Near IIT Bus Stand, Itki Road",
    "phone": "7549000645",
    "bloodGroups": [
      "A-",
      "B-",
      "AB+",
      "B+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Sawai Man Singh (S.M.S) Hospital Blood Bank",
    "lat": 26.906044,
    "lng": 75.816216,
    "address": "J.L.N. Marg, Near Maharani College",
    "phone": "0141 2560291, 0141 2569885, 0141 261 9020, 0141 2518434, 8234",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Central Hospital N. F. Railway Blood Bank",
    "lat": 26.151872,
    "lng": 91.694899,
    "address": "PNGB Road, Near Kamakhya Railway Station, Maligaon, Guwahati",
    "phone": "03612723762, 03612570492",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Chhatrapati Shivaji Maharaj Hospital Blood Bank",
    "lat": 19.1922569,
    "lng": 72.986723,
    "address": "Thane Belapur Road, Kalwa, Thane",
    "phone": "022 25347784, 022 25347785, 022 25347786,  022 25372777, 022 25347791",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank Mandya",
    "lat": 12.4279555,
    "lng": 76.7010341,
    "address": " District Hospital Premises",
    "phone": "0832 224040",
    "bloodGroups": [
      "O+",
      "A+",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Kanker District Hospital Blood Bank  ",
    "lat": 20.264724,
    "lng": 81.495155,
    "address": "Civil Surgeon, District Hospital, Kanker",
    "phone": "7868241063",
    "bloodGroups": [
      "A-",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Hi-Tech Medical College & Hospital Blood Bank",
    "lat": 20.300484,
    "lng": 85.877272,
    "address": "Pandra,Rasulgarh,Bhubaneshwar",
    "phone": "06743094253, 0674 2371217",
    "bloodGroups": [
      "AB-",
      "A-",
      "AB+",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Government BDM Hospital Blood Bank",
    "lat": 27.702019,
    "lng": 76.190905,
    "address": "Kotputli,  NH-8, Near Morargi Dhramsala",
    "phone": "01421 222088",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "General Hospital Rewari Blood Bank",
    "lat": 28.202218,
    "lng": 76.619789,
    "address": "Room No. 16, Government / Civil Hospital Blood Bank,  \r\nKayasthwara Mohalla, ",
    "phone": "01274 253101,  01274 254 743",
    "bloodGroups": [
      "A+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Muthu Medical Center Blood Bank (Muthu Charitable Trust)",
    "lat": 11.238114,
    "lng": 78.864898,
    "address": "No.153 Mettu Street  Opposite to Vegetable Market Perambalur, Tamil Nadu",
    "phone": "0432 8277477",
    "bloodGroups": [
      "B-",
      "A+",
      "AB-",
      "A-",
      "O+",
      "O-",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Kongu Blood Bank",
    "lat": 11.340634,
    "lng": 77.715943,
    "address": "TS No. 51/1E Ist floor, Perundurai Road",
    "phone": "0424 2263537, 0424 2263536",
    "bloodGroups": [
      "O+",
      "AB-",
      "A-",
      "A+",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Baby Memorial Hospital Blood Bank",
    "lat": 11.259595,
    "lng": 75.792216,
    "address": "Indira Gandhi Road",
    "phone": "0495 2777777",
    "bloodGroups": [
      "B-",
      "AB-",
      "O+",
      "A-",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Save Life Blood Bank",
    "lat": 28.701048,
    "lng": 77.103863,
    "address": "16, Jarnally Colony, 1st floor, Opposite to General Hospital, Karnal",
    "phone": "0184 2207557, 0184 2207558",
    "bloodGroups": [
      "A-",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Immuno-Haematology & Blood Transfusion Centre, Rourkela",
    "lat": 22.2640892,
    "lng": 84.8651084,
    "address": "ISPAT General Hospital, Steel Authority of India ltd. Rourkela Steel Plant, Sector - 19",
    "phone": "6612439919",
    "bloodGroups": [
      "AB+",
      "O-",
      "B+",
      "O+",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Katuri Medical College and Hospital Blood Bank ",
    "lat": 16.227872,
    "lng": 80.30947,
    "address": "Katuri Nagar, Chinakondrupadu, Guntur\r\n",
    "phone": "0863 2288555, 0863 2288556 (Ext No. 234) ",
    "bloodGroups": [
      "O+",
      "AB+",
      "B-",
      "A+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Vydehi Institute of Medical Science Hospital Blood Bank",
    "lat": 12.975378,
    "lng": 77.72927,
    "address": "EPIP AREA, 06 WHITE FIELD",
    "phone": "080 28410874 ",
    "bloodGroups": [
      "AB-",
      "O-",
      "B+",
      "A+",
      "B-",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Sri Venkateswara Institute of Medical sciences Blood Bank",
    "lat": 13.637934,
    "lng": 79.403917,
    "address": "Sri Venkateswara Institute of Medical Sciences (SVIMS) Campus, Tirupati",
    "phone": "0877 2287777",
    "bloodGroups": [
      "O+",
      "AB+",
      "A-",
      "AB-",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Suri Sadar District Hospital Blood Bank",
    "lat": 23.915783,
    "lng": 87.516918,
    "address": "P.O. Suri",
    "phone": "03462 255483, 03462 255766",
    "bloodGroups": [
      "AB+",
      "AB-",
      "B-",
      "A+",
      "O-",
      "A-",
      "B+"
    ]
  },
  {
    "name": "General Hospital Blood Bank Ahwa",
    "lat": 20.761612,
    "lng": 73.689241,
    "address": "Blood Bank, General Hospital, Ahwa, Dang",
    "phone": "02631 220205",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "Superior Blood Bank",
    "lat": 8.4935113,
    "lng": 76.9474123,
    "address": "Gandhari Amman Koil Street",
    "phone": "0471 2334456",
    "bloodGroups": [
      "A-",
      "B-",
      "AB-",
      "A+",
      "O-",
      "B+",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Minu Labs and Blood Bank",
    "lat": 11.675357,
    "lng": 78.131943,
    "address": "7.A/4, Ramakrishna Road, (Rajaji Road)",
    "phone": "0427 2318881, 0427 2332425",
    "bloodGroups": [
      "O-",
      "AB-",
      "AB+",
      "B-",
      "A-",
      "B+",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Dr. Ninawe Blood Bank",
    "lat": 19.957547,
    "lng": 79.295961,
    "address": "Niwane Hospital, Near Benglur Bakery, Kasturba Road, Chandrapur",
    "phone": "07172 254884, 07172 254994      ",
    "bloodGroups": [
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Civil Surgeon General Hospital Blood Bank",
    "lat": 19.108046,
    "lng": 74.73557,
    "address": "District Government Hospital Tarakpur Savedi Road, Ahmednagar",
    "phone": "0241 2430127 (Office)",
    "bloodGroups": [
      "AB+",
      "B+",
      "AB-",
      "O-",
      "A-"
    ]
  },
  {
    "name": "T. D. Medical College Hospital Blood Bank Alappuzha ",
    "lat": 9.416254,
    "lng": 76.347601,
    "address": "Vandanam",
    "phone": "0477 2282709",
    "bloodGroups": [
      "O-",
      "A+",
      "B-",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 10.658046,
    "lng": 77.009584,
    "address": "Government Hospital, NH209,Mahalingapuram,Udumalpet Road,Pollachi",
    "phone": "04259 229322",
    "bloodGroups": [
      "A+",
      "O-"
    ]
  },
  {
    "name": "Singareni Collieries Co. Ltd Blood bank",
    "lat": 19.063129,
    "lng": 79.487441,
    "address": "Sector-1, Area Hospital, Ramakrishnapur, Mandamarri (M), Bellampalli",
    "phone": "08736-228677 ext No -328",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Saint Joseph Hospital Blood Bank",
    "lat": 10.012211,
    "lng": 76.323922,
    "address": "Dharmagiri",
    "phone": "0485 2862391",
    "bloodGroups": [
      "B+",
      "O-",
      "B-",
      "A+",
      "AB-",
      "O+",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Vijaya Sri Blood Bank",
    "lat": 16.51304,
    "lng": 80.635644,
    "address": "VijayaSri Palace,D. No. 29-19-27/4, Ground Floor, First Floor and Second Floor, Dornakal Road, Suryaraopet, Vijayawada",
    "phone": "0866 2433199",
    "bloodGroups": [
      "O-",
      "A+",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Government Medical College and Hospital Blood Bank",
    "lat": 32.736061,
    "lng": 74.853998,
    "address": "Government Medical College and Hospital, Mahesh Pura Chowk, Bakshi Nagar",
    "phone": "0191 2584290, 0191 2584291, 0191 2584292",
    "bloodGroups": [
      "O-",
      "B-",
      "A+",
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Amruta Blood Bank",
    "lat": 19.855842,
    "lng": 75.338268,
    "address": "Shop No- 102/103, 1st Floor ,Nano Comlex Near Shanoormiya Arga, Vegetable Arket, Shahnoorwadi, Aurangabad\r\n",
    "phone": "0240 2060145 ",
    "bloodGroups": [
      "A-",
      "O-",
      "B-",
      "AB-",
      "AB+",
      "B+",
      "O+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 27.395757,
    "lng": 80.134659,
    "address": "Gorakhpur",
    "phone": "9670783667",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Vivekananda Hospital Private Limited Blood bank",
    "lat": 23.523226,
    "lng": 87.339337,
    "address": "Dr. Zakir Hussain Avenue, Bidhan Nagar\r\nBeside Durgapur Esi Hospital",
    "phone": "0343 2532430 , 2531001, 2531002, 2531003 ",
    "bloodGroups": [
      "O-",
      "B-",
      "B+",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Divisional Railway Hospital Blood Bank Asansol",
    "lat": 23.674512,
    "lng": 86.941165,
    "address": "Asansol",
    "phone": "0341 2220529",
    "bloodGroups": [
      "O-",
      "A+",
      "AB+",
      "B+",
      "A-",
      "B-",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Kanun Devi Parasmal Mehta Medical and Blood Bank",
    "lat": 26.27777,
    "lng": 73.015288,
    "address": "733, 1st - C Road, Sardarpura",
    "phone": "0291 5106836, 5107835",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Navarang Blood Bank",
    "lat": 12.9982,
    "lng": 77.551623,
    "address": "No.2953, Ist Floor, Near Navarang Circle, M.K.K.Road, \r\nRajaji Nagar, ",
    "phone": "080 23521233 ",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Little Flower Hospital Blood Bank",
    "lat": 10.190395,
    "lng": 76.39029,
    "address": "M. G. Road",
    "phone": "0484 3096666",
    "bloodGroups": [
      "A-",
      "B-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 21.831932,
    "lng": 75.628611,
    "address": "District Hospital, Sanawad Road ",
    "phone": "07282 250702",
    "bloodGroups": [
      "A-",
      "O+",
      "O-"
    ]
  },
  {
    "name": "District Hospital ",
    "lat": 29.59808,
    "lng": 79.659042,
    "address": "District Hospital, Almora",
    "phone": "0596 223 0225",
    "bloodGroups": [
      "AB-",
      "O-",
      "A+",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Sacred Heart Hospital Blood Bank ",
    "lat": 31.363857,
    "lng": 75.550527,
    "address": "Grand Trunk Road, Maqsudan",
    "phone": "0181 267 0664",
    "bloodGroups": [
      "O+",
      "B-"
    ]
  },
  {
    "name": "Government General Hospital Blood Bank",
    "lat": 14.671459,
    "lng": 77.596684,
    "address": "Government General Hospital, Ananthapur",
    "phone": "08554 275024",
    "bloodGroups": [
      "B+",
      "A-",
      "A+",
      "AB+",
      "AB-",
      "B-",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Jeevanraj Charitable Foundation,s Ahmednagar Blood Bank",
    "lat": 19.082959,
    "lng": 74.760389,
    "address": "F.P. No. - 17, 2nd Floor, Ahmednagar Zillha Krishi Audyogik Sarva Seva Sahakari Sanstha Maryadit, Market Yard, Ahmednagar\r\n",
    "phone": "0241 2450099",
    "bloodGroups": [
      "O+",
      "AB+",
      "A-",
      "AB-",
      "B-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Bombay Hospital Trust Blood Bank",
    "lat": 18.94103,
    "lng": 72.82816,
    "address": "12, New Marine Lines Mumbai",
    "phone": "022 22067676",
    "bloodGroups": [
      "O-",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "M/s. Vaatsalya Life Hospitals Navajeeva Blood Bank",
    "lat": 17.328477,
    "lng": 76.847911,
    "address": "Vaatsalya Life Hospital, 1st Floor, Near RTO Office, SH-10",
    "phone": "08472 240066",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "General Hospital Blood Bank",
    "lat": 11.747531,
    "lng": 75.487227,
    "address": "",
    "phone": "0490 5326050",
    "bloodGroups": [
      "B-",
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank ",
    "lat": 10.522997,
    "lng": 76.217675,
    "address": "Round East, Thrissur",
    "phone": "0487 2427778,  0487 2427383",
    "bloodGroups": [
      "O-",
      "AB+",
      "B-"
    ]
  },
  {
    "name": "Dr. Pattabhi Red Cross Blood Bank ",
    "lat": 16.190546,
    "lng": 81.136154,
    "address": "DM & HO Campus, Machilipatnam",
    "phone": "08672 230605",
    "bloodGroups": [
      "B-",
      "AB+",
      "B+",
      "A-",
      "AB-",
      "A+",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Medical college& Hospital Blood Bank Rajnandgaon",
    "lat": 21.086463,
    "lng": 81.030281,
    "address": "Superitendant medical college& Hospital Rajnandgaon",
    "phone": "9425557320",
    "bloodGroups": [
      "O-",
      "AB-",
      "B-",
      "A-",
      "O+",
      "AB+",
      "B+"
    ]
  },
  {
    "name": "Ami Pathology Laboratory and Blood Bank",
    "lat": 23.08705,
    "lng": 72.592226,
    "address": "Ami Pathology Laboratory and Blood Bank, 14-15 Baronet Tower (Complex), Tollnaka, Highway , Ramnagar, Sabarmati, Ahmedabad",
    "phone": "079 27501202",
    "bloodGroups": [
      "A-",
      "B+",
      "O-",
      "A+",
      "B-",
      "AB-",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Bagalkot Blood Bank",
    "lat": 16.186132,
    "lng": 75.70653,
    "address": "Hanagal Shree Kumareshwar Hospital and Research Centre, Ilkal Road",
    "phone": "0835 220420",
    "bloodGroups": [
      "O-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Civil Surgeon General Hospital Blood Bank",
    "lat": 20.702666,
    "lng": 77.001984,
    "address": "District General Hospital Compound, Z.P. Road, Akola\r\n",
    "phone": "0724 2434401",
    "bloodGroups": [
      "A-",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Swasthya Kalyan Blood Bank and Thalesemia Research Center",
    "lat": 26.916784,
    "lng": 75.829997,
    "address": "Swasthya Kalyan Bhawan, Narain Singh Road,  Near Trimurti Circle.\r\n",
    "phone": "0141 2545293, 0141 721771",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Shri Ramkaran Joshi General Hospital Bood bank",
    "lat": 26.883949,
    "lng": 76.335767,
    "address": "Lalsot, Dausa, NH-11A, Lalsot Road, ",
    "phone": "01427-220960, 01427 220223",
    "bloodGroups": [
      "A-",
      "AB-"
    ]
  },
  {
    "name": "M/s. East Point Hospital Blood Bank Virgonagar",
    "lat": 13.053662,
    "lng": 77.717912,
    "address": "East Point college of Medical Sciences&Hospital, Janana Prabha Campus, Bidarahalli",
    "phone": "080 25136246",
    "bloodGroups": [
      "AB+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Ramakrishna Mission Hospital Blood bank",
    "lat": 27.086178,
    "lng": 93.609065,
    "address": "Ramakrishna Mission Hospital \r\nP.O. Ramakrishna Mission\r\nItanagar,\r\n",
    "phone": " 0360-221 2263, 221 8780",
    "bloodGroups": [
      "AB-",
      "B-",
      "A+",
      "A-",
      "O+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Century Hospital Blood Bank",
    "lat": 9.304895,
    "lng": 76.63545,
    "address": "Mulakuzha",
    "phone": "0479 2468710",
    "bloodGroups": [
      "AB-",
      "A-",
      "O-",
      "O+",
      "B-",
      "B+",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Kongu Nadu Hospital Private Limited Blood Bank",
    "lat": 11.018134,
    "lng": 76.960595,
    "address": "336 to 353 Dr. Rajendra Prasad Road, (100 feet Road) 11th St, Tatabad, Coimbatore",
    "phone": "0422 4316000, 0422 2494303",
    "bloodGroups": [
      "A+",
      "O-",
      "A-",
      "B-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 26.496004,
    "lng": 77.998665,
    "address": "District Hospital",
    "phone": "07532 226318",
    "bloodGroups": [
      "B+",
      "AB-",
      "AB+",
      "A-",
      "O+",
      "B-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Government Villupuram Medical College and Hospital Blood Bank",
    "lat": 11.992895,
    "lng": 79.516782,
    "address": "Government  Villupuram Medical College and Hospital, Mundiyambakkam, Villupuram",
    "phone": "04146 232101",
    "bloodGroups": [
      "AB+",
      "O-"
    ]
  },
  {
    "name": "M/s. K. N. Gujar Blood Bank",
    "lat": 17.278263,
    "lng": 74.183727,
    "address": "M/s K.N. Gujar Blood Bank, F. P. No. 21, 203/A/6, 1st Floor, K.N. Gujar Hospital, Shanivar Peth, Near S.T. Bus Stand, Karad, Satara",
    "phone": "02164 222868 ",
    "bloodGroups": [
      "B-",
      "O-",
      "AB-",
      "A+",
      "AB+",
      "O+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank Mangalore",
    "lat": 12.864857,
    "lng": 74.83818,
    "address": "Lady Goshen Hospital, Behind Central Market",
    "phone": "0824 2423755 ",
    "bloodGroups": [
      "O+",
      "AB-",
      "O-",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Pasighat General Hospital Blood Bank",
    "lat": 28.071544,
    "lng": 95.325113,
    "address": "General Hospital, Pasighat,  Jt. DHS (T&R), High Region, Near NH 52. ",
    "phone": "9436225890",
    "bloodGroups": [
      "A+",
      "O+",
      "B+",
      "B-",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "SRM Medical College Hospital Blood Bank",
    "lat": 12.822849,
    "lng": 80.048734,
    "address": "SRM Nagar, Potheri, Kattankulathur, Kancheepuram",
    "phone": "044 27455707, 044 2745 5510",
    "bloodGroups": [
      "A+",
      "B+",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Lions Blood Bank",
    "lat": 19.87244,
    "lng": 75.323188,
    "address": "1st Floor, above Lions  Balsadan, Near Teg Bahadur English School, Osmanpura, Aurangabad ",
    "phone": "0240 2340250, 2337255",
    "bloodGroups": [
      "A-",
      "AB-",
      "B+",
      "O-",
      "A+",
      "B-"
    ]
  },
  {
    "name": "Aarthi Hospital Blood Bank",
    "lat": 9.174494,
    "lng": 77.866384,
    "address": "60, Santhaipettai Road, Kovilpatti\r\n",
    "phone": "04362 223346",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Chirayu Medical College and Hospital Blood Bank",
    "lat": 23.268916,
    "lng": 77.308073,
    "address": "Bhainsakhedi, Bairagarh",
    "phone": "0755 6679000, 0755 6679101, 0755 6679102, 0755 6679103",
    "bloodGroups": [
      "B+",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Kailash Hospital Blood Bank",
    "lat": 27.88214,
    "lng": 76.286106,
    "address": "Delhi-Jaipur NH-08, Behror, Near Bharat Petrol Pump\r\n\r\n",
    "phone": "01494 222222, 01494 222444 ",
    "bloodGroups": [
      "B-",
      "A-",
      "B+",
      "O-",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 26.496004,
    "lng": 77.998665,
    "address": "District Hospital",
    "phone": "07532 226318",
    "bloodGroups": [
      "B+",
      "AB-",
      "AB+",
      "A-",
      "O+",
      "B-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Kiriburu Meghahatuburu General Hospital Blood Bank",
    "lat": 22.104554,
    "lng": 85.291571,
    "address": "Kiriburu Iron Ore Mines",
    "phone": "06596 245025",
    "bloodGroups": [
      "A+",
      "AB-",
      "O-",
      "A-",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Dr. Anant Ram Janta Hospital Blood Bank",
    "lat": 29.363162,
    "lng": 75.901772,
    "address": "Hospital Road, Hisar, Barwala",
    "phone": "0169 324 2096",
    "bloodGroups": [
      "AB-",
      "B-",
      "O+",
      "A-",
      "AB+",
      "B+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Jankalyan Blood Bank Nalegaon",
    "lat": 18.501067,
    "lng": 73.857499,
    "address": "Gadgil Patangan, Nalegaon, Ahmednagar\r\n\r\n",
    "phone": "0241 2346647, 0241 2329827",
    "bloodGroups": [
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Dr. Late Sadanadaji Burma Memorial Blood Bank",
    "lat": 21.298921,
    "lng": 77.518316,
    "address": "Plot No- 53, Sheet No-20c, Gvalipura,  Sadar Bazar, Paratwada, Amravati\r\n",
    "phone": "8484010184",
    "bloodGroups": [
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Deen Dayal Updhayay Hospital Blood Bank",
    "lat": 31.103536,
    "lng": 77.17218,
    "address": "DDU Complex, Shimla",
    "phone": "0177 2658940",
    "bloodGroups": [
      "O-",
      "O+",
      "B-",
      "A+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "General Hospital Bhiwani Blood Bank ",
    "lat": 28.797229,
    "lng": 76.13081,
    "address": "Bhiwani, Park Colony, Vijay Nagar, Bhiwani,",
    "phone": "01664 253014",
    "bloodGroups": [
      "B+",
      "A+",
      "B-",
      "O-",
      "A-",
      "AB-",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Immaculate Heart of Mary Hospital Blood Bank",
    "lat": 9.70387,
    "lng": 76.720484,
    "address": "Bharanganam, Palai",
    "phone": "0472 2236158",
    "bloodGroups": [
      "A+",
      "A-",
      "B-",
      "AB+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "ACTREC",
    "lat": 19.065019,
    "lng": 73.064508,
    "address": "Department of Transfusion Medicine, ACTREC, \r\nTata memorial centre, \r\nSector 22 Kharghar, \r\nNavi Mumbai.",
    "phone": "022 27405000, Ext 5515;                                  Direct No. 022 27405073",
    "bloodGroups": [
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Fortis Hospital Private Limited Blood Bank",
    "lat": 12.988216,
    "lng": 77.594232,
    "address": "14, Sheriffs Centre,Cunningham Road",
    "phone": "080 41994515, 080 22261037",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Bhadrak ",
    "lat": 21.065246,
    "lng": 86.502463,
    "address": "District Head Quarter Hospital, Bhadrak",
    "phone": "06784 251817",
    "bloodGroups": [
      "O-",
      "AB-",
      "A+",
      "A-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Kishtwar District Hospital Blood Bank  ",
    "lat": 33.3139274,
    "lng": 75.7681239,
    "address": "District Hospital, Near Bus stand Kishtwar.",
    "phone": "01995 261410",
    "bloodGroups": [
      "AB-",
      "B-",
      "O-",
      "O+",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Swami Vivekanand Charitable Blood Bank",
    "lat": 27.874974,
    "lng": 79.915468,
    "address": "  A unit of Swami Vivekanand Charitable Trust Regd.,   Near Anta Chauraha",
    "phone": "05842 280224",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "GNRC Institute of Medical Sciences Blood bank",
    "lat": 26.202192,
    "lng": 91.693312,
    "address": "Sila Grant Town, North Guwahati , Near IIT Guwahati",
    "phone": "03612227700, 03612227701",
    "bloodGroups": [
      "A-",
      "O+",
      "AB-",
      "O-",
      "B-"
    ]
  },
  {
    "name": "Government D.B. Hospital Blood Bank",
    "lat": 28.28984,
    "lng": 74.959757,
    "address": "Near Polica Line, Churu.",
    "phone": "01562 250333",
    "bloodGroups": [
      "A-",
      "B-",
      "B+",
      "O+",
      "O-"
    ]
  },
  {
    "name": "Thrichur Heart Hospital Limited Blood Bank",
    "lat": 10.512613,
    "lng": 76.214571,
    "address": "ST Nagar, Kannamkulangara",
    "phone": "0487 2433101",
    "bloodGroups": [
      "B-",
      "A+",
      "O-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "M. T. Agarwal Municipal General Hospital Blood Bank",
    "lat": 19.177861,
    "lng": 72.946234,
    "address": "Dr. R. P. Road, Mulund (W), Mumbai",
    "phone": "022 25640767, 022 25605730 (Extn. 308)",
    "bloodGroups": [
      "A+",
      "O-"
    ]
  },
  {
    "name": "Bhagyoday Tirth Hospital Blood Bank",
    "lat": 23.851061,
    "lng": 78.722466,
    "address": "Khurai Road\r\n",
    "phone": "0758 2266671",
    "bloodGroups": [
      "O+",
      "AB+",
      "B-",
      "O-",
      "AB-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 21.903381,
    "lng": 77.898085,
    "address": "District Hospital",
    "phone": "07141 233250",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 26.800773,
    "lng": 82.759197,
    "address": "Bhinga",
    "phone": "05542 283273",
    "bloodGroups": [
      "O+",
      "AB-",
      "O-",
      "AB+"
    ]
  },
  {
    "name": "Global Hospitals Blood Bank (A unit of Rabindranath GE Medical Association Pvt Ltd",
    "lat": 12.898506,
    "lng": 80.206289,
    "address": "439, Cheran Nagar, Perumbakkam\r\nCheran Nagar, Perumbakkam,\r\nChennai",
    "phone": "044 22777000",
    "bloodGroups": [
      "AB-",
      "B-",
      "AB+",
      "B+",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Taluk Head Quarter Hospital Blood Bank",
    "lat": 8.661363,
    "lng": 76.786533,
    "address": "",
    "phone": "0470 2646565",
    "bloodGroups": [
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank Himmatnagar",
    "lat": 23.056733,
    "lng": 72.573372,
    "address": "Blood Bank., Indian Red Cross Society Sabarkantha District Branch, Sheth Shri Jamanadas Madhavji Tanna , Red Cross Bhavan, Nr. G.P.O., State Highway, \r\nHimmatnagar, Sabarkantha",
    "phone": "02772 240789, 02772 245110",
    "bloodGroups": [
      "AB+",
      "B-",
      "AB-",
      "B+",
      "A-",
      "O-",
      "O+"
    ]
  },
  {
    "name": "G. T. Hospital Blood Bank",
    "lat": 18.946532,
    "lng": 72.833317,
    "address": "Near L.T.Marg Police Station, Mumbai",
    "phone": "022 22031111, 022 22621468 (Extn. 1351)",
    "bloodGroups": [
      "A-",
      "AB+"
    ]
  },
  {
    "name": "SVBP Hospital Blood Bank",
    "lat": 28.958429,
    "lng": 77.753433,
    "address": "LLRM Medical College Campus",
    "phone": "0121 2763647",
    "bloodGroups": [
      "A+",
      "B+",
      "B-",
      "O+",
      "AB+",
      "O-",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Uluberia Sub-Divisional Hospital Blood Bank ",
    "lat": 22.470189,
    "lng": 88.094533,
    "address": "Uluberia Station Road, Near Uluberia Station",
    "phone": "033 26612928",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Hamirpur Regional Hospital Blood bank",
    "lat": 31.679905,
    "lng": 76.527416,
    "address": " Agriculture Colony, Hamirpur,",
    "phone": "01972 222223",
    "bloodGroups": [
      "AB+",
      "O+",
      "AB-",
      "O-",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Gian Sagar Medical College and Hospital Blood Bank",
    "lat": 30.528959,
    "lng": 76.671462,
    "address": "Ramnagar (Banur),  District Patiala, Punjab",
    "phone": "01762 510132 Ext:1128/1060, 01762 520 000, 01762507299",
    "bloodGroups": [
      "O+",
      "B+"
    ]
  },
  {
    "name": "Sasoon Sarvopchar Hospital Blood Bank",
    "lat": 18.515846,
    "lng": 73.858714,
    "address": "Ground Floor, Section 5, Opposite to Central Medical Stores, Station Road, Pune",
    "phone": "020 26126868, 020 24480431",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Rajiv Gandhi Government General Hospital",
    "lat": 13.081279,
    "lng": 80.27678,
    "address": "General Hospital Road\r\nPark Town,\r\nChennai, Tamil Nadu ",
    "phone": "044 25305711,  044 2530 5000",
    "bloodGroups": [
      "O+",
      "B+",
      "A-",
      "AB-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Help Voluntary Blood Bank  ",
    "lat": 23.000103,
    "lng": 72.604863,
    "address": "Help Voluntary Blood Bank (Green Cross Voluntary Blood Bank Pathology and RIA Laboratory) 6 and 7, Kotyark Complex, Opposite to L.G. Hospital, Maninagar, Ahmedabad ",
    "phone": "079 65136744",
    "bloodGroups": [
      "AB-",
      "A-",
      "B+",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "V.T.Thakur Memorial Rotary",
    "lat": 18.323995,
    "lng": 78.334305,
    "address": "Blood Bank, H.No.1-4-31/1, Godown Road, Bathukammakunta, Kamareddy, Nizamabad",
    "phone": "08468 222222",
    "bloodGroups": [
      "AB-",
      "AB+",
      "A-"
    ]
  },
  {
    "name": "Government RSRM Hospital",
    "lat": 13.108993,
    "lng": 80.288403,
    "address": "Cemetery Road, Royapuram, Chennai, Tamil Nadu ",
    "phone": "044 25901665  ",
    "bloodGroups": [
      "O-"
    ]
  },
  {
    "name": "Government Royapettah Hospital Blood Bank",
    "lat": 13.054709,
    "lng": 80.265073,
    "address": "No 1, Westcott Road, Royapettah, Chennai, Tamil Nadu ",
    "phone": "044 28482611,  044 28483053",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Nabha Civil Hospital Blood Bank",
    "lat": 30.370999,
    "lng": 76.146125,
    "address": "Nabha",
    "phone": "01765 226361, 01765 220 644",
    "bloodGroups": [
      "B+",
      "A+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 23.229861,
    "lng": 77.417539,
    "address": "J P Hospital, 1250, Hospital Campus, Tulsi Nagar",
    "phone": "0755 2556812",
    "bloodGroups": [
      "B+",
      "A-",
      "AB-",
      "O-",
      "A+",
      "O+",
      "AB+"
    ]
  },
  {
    "name": "Civil Surgeon - General Hospital Blood Bank",
    "lat": 16.989126,
    "lng": 73.298866,
    "address": "Civil Hospital, Ratnagiri",
    "phone": "02352 225616",
    "bloodGroups": [
      "A+",
      "A-",
      "B-",
      "O-",
      "O+",
      "B+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "General Hospital Blood Bank Hisar",
    "lat": 29.17,
    "lng": 75.718602,
    "address": "Civil Hospital Blood Bank, Near Bus Stand ",
    "phone": "01662 275566",
    "bloodGroups": [
      "A+",
      "O+",
      "B+"
    ]
  },
  {
    "name": "E. S. I. Hospital Blood Bank",
    "lat": 28.657697,
    "lng": 77.13012,
    "address": "E S I Hospital, Basai  Darapur, Ring Road",
    "phone": "011 25970808, 011 25100664",
    "bloodGroups": [
      "AB+",
      "B-",
      "O-",
      "O+",
      "B+",
      "A-",
      "AB-",
      "A+"
    ]
  },
  {
    "name": "Government Peripheral Hospital Blood Bank",
    "lat": 13.095428,
    "lng": 80.219317,
    "address": "Government Peripheral Hospital \r\nM-2, Third Avenue,  Anna Nagar,  \r\n(Near K-4 Police Station)\r\nChennai",
    "phone": "044 26209490",
    "bloodGroups": [
      "AB+",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Heritage Hospital",
    "lat": 25.279165,
    "lng": 83.003404,
    "address": "LANKA BHU ROAD",
    "phone": "0542 2368888",
    "bloodGroups": [
      "A+",
      "B-"
    ]
  },
  {
    "name": "Metro Heart Institute with Multispecialty",
    "lat": 28.406835,
    "lng": 77.318049,
    "address": "(A Unit of Metro Speciality Hospitals Private Limited) Sector 16A, Near Sunflag Hospital, Faridabad",
    "phone": "0129 4277777",
    "bloodGroups": [
      "O-",
      "AB+",
      "AB-",
      "A+",
      "B-",
      "B+",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Rotary Blood Bank",
    "lat": 9.593201,
    "lng": 76.521811,
    "address": "Mangad Building",
    "phone": "0481 2567403",
    "bloodGroups": [
      "A-",
      "B-",
      "A+",
      "AB+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Parakh Voluntary Blood Bank ",
    "lat": 25.458336,
    "lng": 78.616978,
    "address": "Run by Samagra Vikash Jan Kalyan Samiti, Karguawaji Road, Opposite Gate No.-2",
    "phone": "0510 2321134",
    "bloodGroups": [
      "AB-",
      "A-",
      "B+",
      "B-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Devamatha Hospital Blood Bank",
    "lat": 9.866189,
    "lng": 76.594952,
    "address": "",
    "phone": "0485 2252271",
    "bloodGroups": [
      "A+",
      "AB+",
      "AB-",
      "A-",
      "B-",
      "O+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "Santokba Durlabhji Medical Hopsital Blood bank",
    "lat": 26.893786,
    "lng": 75.812174,
    "address": "Santokba Durlabhji Memorial Hospital cum Medical Research Institute\r\n5th Floor, SDMH OPD Block, Bhawani Singh Road, Bapu Nagar",
    "phone": " 0141 256 6251, 0141-5196655",
    "bloodGroups": [
      "O-",
      "AB+",
      "O+",
      "B+",
      "B-",
      "A+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Aarthi Hospital Blood Bank",
    "lat": 9.174494,
    "lng": 77.866384,
    "address": "60, Santhaipettai Road, Kovilpatti\r\n",
    "phone": "04362 223346",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Institute of Child Health Blood Bank",
    "lat": 22.5387081,
    "lng": 88.3719339,
    "address": "11 Dr. Biresh Guha Street, Kolkata ",
    "phone": "033 22905686",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Gupta Hospital Blood Bank",
    "lat": 30.207465,
    "lng": 74.950084,
    "address": "2/A, Power House Road, Near Jindal Heart Hospital",
    "phone": "0164 2212377, 0164 2217041",
    "bloodGroups": [
      "AB-",
      "A-",
      "A+",
      "B+",
      "O+",
      "AB+",
      "B-",
      "O-"
    ]
  },
  {
    "name": "Thiruvalla Medical Mission Hospital Blood Bank",
    "lat": 9.393924,
    "lng": 76.578423,
    "address": "Post Box No. 74",
    "phone": "0469 2626096, 0469 2626000, 0469 2626262",
    "bloodGroups": [
      "A-",
      "AB-",
      "O-",
      "A+",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Rajpura Civil Hospital Blood Bank",
    "lat": 30.478441,
    "lng": 76.584065,
    "address": "AP Jain Hospital, Rajpura",
    "phone": "01762 225539, 0175 221 2055",
    "bloodGroups": [
      "A+",
      "B-",
      "O+",
      "O-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Seva Blood Bank",
    "lat": 20.552689,
    "lng": 74.516643,
    "address": "Nilkanth Building, Satana Naka, Satana Road, Malegaon, Nashik",
    "phone": "02554 257077",
    "bloodGroups": [
      "AB-",
      "A+",
      "B+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Civil Hospital Blood Bank",
    "lat": 22.886385,
    "lng": 92.744135,
    "address": "Civil Hospital, Chanmari-2 Lunglei",
    "phone": "0372 2324555",
    "bloodGroups": [
      "AB+",
      "O-",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Noor Hospital Blood Bank",
    "lat": 19.860878,
    "lng": 75.664447,
    "address": "Aurangabad - Jalna Road, Warudi, Tq- Badnapur, Jalna",
    "phone": "02482 222515",
    "bloodGroups": [
      "A-",
      "A+",
      "B-",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Verma Union Hospital Blood Bank",
    "lat": 22.71209,
    "lng": 75.838098,
    "address": "120, Dhar Road, Opposite to Kastur Cinema\r\n",
    "phone": "0731 2380609, 0731 4022000, 0731 4056651",
    "bloodGroups": [
      "A+",
      "O-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Dr. Hedgewar Arogaya Sansthan Blood bank",
    "lat": 28.655875,
    "lng": 77.293489,
    "address": "F-18, Karkardooma",
    "phone": "011 22301148, 011 22301149, 011 22309407",
    "bloodGroups": [
      "AB+",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Gandhi Memorial Hospital Blood Bank",
    "lat": 22.965616,
    "lng": 88.466843,
    "address": "Alipore Road, P.O. Kalyani",
    "phone": "033 25898443, 033 25897292",
    "bloodGroups": [
      "AB+",
      "AB-",
      "B+",
      "O-",
      "B-",
      "A-"
    ]
  },
  {
    "name": "District Head Quarters Hospital Blood Bank. ",
    "lat": 13.217176,
    "lng": 79.100329,
    "address": "Head Quarters  Hospital Compound, Chittoor",
    "phone": "9849229482",
    "bloodGroups": [
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Chintpurni Medical College and Hospital Blood Bank",
    "lat": 32.306064,
    "lng": 75.757861,
    "address": "Near Indian Heritage School, DLM City, Bungal,",
    "phone": "01870 250601, 0187 025 0600, 01870-250603",
    "bloodGroups": [
      "O-",
      "B+",
      "A+",
      "B-",
      "AB-",
      "O+",
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank Dharwad",
    "lat": 15.46473,
    "lng": 75.010366,
    "address": "Fort Road",
    "phone": "0836 2747747",
    "bloodGroups": [
      "A+",
      "B+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Narayana Hrudayalaya Mallareddy Hospital Blood Bank",
    "lat": 17.544026,
    "lng": 78.433044,
    "address": " # 1-1-216, Suraram &#39;X&#39; Road, Qutbullapur Mandal, Jeedimetla, Hyderabad",
    "phone": "040 23783106, 040  23783000 Extn: 3106",
    "bloodGroups": [
      "AB-",
      "AB+",
      "A+",
      "A-",
      "O+",
      "B+",
      "O-"
    ]
  },
  {
    "name": "M/s. Seven Hills Hospital Blood Bank",
    "lat": 17.71737,
    "lng": 83.309268,
    "address": "D.No.11-4-4/A, 5th Floor, Rock Dale Layout, Waltair MainRoad, Visakhapatnam\r\n",
    "phone": "0891 6677777",
    "bloodGroups": [
      "B-",
      "AB-",
      "B+",
      "O-",
      "O+",
      "AB+",
      "A+",
      "A-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 12.418764,
    "lng": 75.742555,
    "address": "General Thimayya Road",
    "phone": "08272 223445",
    "bloodGroups": [
      "B-",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Moga Civil Hospital Blood Bank ",
    "lat": 30.811673,
    "lng": 75.169349,
    "address": "Mina Bazar, New Town",
    "phone": "1636230540",
    "bloodGroups": [
      "AB-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Mayur Voluntary Blood Bank   Mandvi",
    "lat": 22.833302,
    "lng": 69.354198,
    "address": "Mayur Voluntary Blood Bank & Pathology Laboratory, \r\nAzad Chowk, Mandvi, Kutch",
    "phone": "02832 231324",
    "bloodGroups": [
      "O-",
      "AB-",
      "O+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "A.P. Vaidyavidhanaparishad Area Hospital - IRCS Blood Bank ",
    "lat": 14.422232,
    "lng": 78.226339,
    "address": "Ground Floor, Muddanuru Road, Pulivendula",
    "phone": "9440978262",
    "bloodGroups": [
      "O+",
      "O-",
      "A+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Palamu Sadar Hospital Blood Bank ",
    "lat": 24.047051,
    "lng": 84.060447,
    "address": "Daltonganj, palamau",
    "phone": "06562 222677",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Shripad Hegde Kadave Institute of Medical Sciences Blood Bank",
    "lat": 14.632385,
    "lng": 74.848338,
    "address": "T.S.S. Hospital",
    "phone": "0838 6221851",
    "bloodGroups": [
      "AB+",
      "B+",
      "O-",
      "A+",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Civil Hospital Blood Bank",
    "lat": 30.668559,
    "lng": 76.294889,
    "address": "Civil Hospital, Nasrali, Mandi Gobindgarh",
    "phone": "01765 255602",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "Christian Hospital Blood Bank Nabarangpur",
    "lat": 19.2392509,
    "lng": 82.547666,
    "address": "Christian Hospital, Nabarangpur, Mission Compound",
    "phone": "06858 222566",
    "bloodGroups": [
      "O-",
      "AB-",
      "A+",
      "B+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Navjeevan Blood Bank and Clinical Laboratory,  Veraval",
    "lat": 20.919489,
    "lng": 70.352739,
    "address": "Navjeevan Blood Bank and Clinical Laboratory, Lilashah Shopping Centre, First Floor, Nr. Bus Station, Veraval, \r\nJunagadh",
    "phone": "02876 221415 ",
    "bloodGroups": [
      "A-",
      "A+",
      "O+",
      "AB-",
      "B-",
      "O-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "SJM Blood Bank Basaveshwara Medical College Hospital and Research Centre",
    "lat": 14.239807,
    "lng": 76.388943,
    "address": "NH-4, By Pass, Near KHB Colony",
    "phone": "08194 222054 ",
    "bloodGroups": [
      "A-",
      "B-"
    ]
  },
  {
    "name": "E.S.I.Hospital Blood Bank",
    "lat": 12.990775,
    "lng": 77.553498,
    "address": "Rajajinagar",
    "phone": "080 23013808",
    "bloodGroups": [
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Government Head Quarters Hospital Blood Bank",
    "lat": 10.378804,
    "lng": 78.818264,
    "address": "Government Head Quarters Hospital, Santhanathapuram\r\nPudukkottai",
    "phone": "04332 228111",
    "bloodGroups": [
      "O-",
      "B+",
      "A-"
    ]
  },
  {
    "name": "Shekhar Hospital Private Limited Blood Bank",
    "lat": 26.876188,
    "lng": 80.985528,
    "address": "B Block, Church Road, Indira Nagar, Lucknow",
    "phone": "0522 2352352, 05224927272",
    "bloodGroups": [
      "B+",
      "A-",
      "AB+",
      "O-",
      "O+",
      "AB-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Shri Sainath Blood Bank",
    "lat": 19.763137,
    "lng": 74.47058,
    "address": "Opposite to Bus Stand,  Shri Saibaba Sansthan, Shirdi Tal - Rahata\r\n",
    "phone": "02423 258525 ",
    "bloodGroups": [
      "A+",
      "A-",
      "O-",
      "B+",
      "AB+"
    ]
  },
  {
    "name": "Kotkapura Civil Hospital Blood Bank",
    "lat": 30.584713,
    "lng": 74.820153,
    "address": " NH15, Faridkot Road",
    "phone": "01635-228306,  0163 522 3306",
    "bloodGroups": [
      "B+",
      "AB-",
      "A+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Amala Cancer Hospital and Research Centre Blood Bank",
    "lat": 10.561896,
    "lng": 76.168745,
    "address": "",
    "phone": "0487 2304000, 0487 2304100",
    "bloodGroups": [
      "O+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 21.903381,
    "lng": 77.898085,
    "address": "District Hospital",
    "phone": "07141 233250",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "OPEC Hospital Blood Bank",
    "lat": 26.779101,
    "lng": 82.762356,
    "address": "OPEC Hospital, Basti\r\n",
    "phone": "05542 283021",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Santokba Durlabhji Medical Hopsital Blood bank",
    "lat": 26.893786,
    "lng": 75.812174,
    "address": "Santokba Durlabhji Memorial Hospital cum Medical Research Institute\r\n5th Floor, SDMH OPD Block, Bhawani Singh Road, Bapu Nagar",
    "phone": " 0141 256 6251, 0141-5196655",
    "bloodGroups": [
      "O-",
      "AB+",
      "O+",
      "B+",
      "B-",
      "A+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "NRI Medical College and General Hospital Blood Bank",
    "lat": 16.413675,
    "lng": 80.555675,
    "address": "Mangalagiri Mandalam, Chinakakani, Guntur\r\n",
    "phone": "08645 236777, 08645 237401, 08645 230101",
    "bloodGroups": [
      "B+",
      "AB+",
      "AB-",
      "O-",
      "A+"
    ]
  },
  {
    "name": "Rajiv Gandhi Government Women and Child Hospital Blood Bank",
    "lat": 11.93782,
    "lng": 79.806917,
    "address": "Iyyanar Kovil, Victor Simonal Street, 100 Feet Road\r\nPuducherry",
    "phone": "0413 222 9355",
    "bloodGroups": [
      "AB-",
      "A+",
      "AB+",
      "O-",
      "O+"
    ]
  },
  {
    "name": "Dr. Susheela Tiwari Memorial Hospital Blood Bank",
    "lat": 29.204322,
    "lng": 79.515729,
    "address": "STM Govt Hospital Rampur Road, Haldwani. \r\nOpposite to FTI Building",
    "phone": "05946, 234104, 3313, 3312",
    "bloodGroups": [
      "B-",
      "AB+"
    ]
  },
  {
    "name": "Lokpriya Hospital Blood Bank",
    "lat": 28.968374,
    "lng": 77.730585,
    "address": "Samrat Palace, Garh Road",
    "phone": "0121 2760040",
    "bloodGroups": [
      "AB-",
      "O-",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Kerala State Co-operative Hospital Complex and Centre for Advanced Medical Services Limited",
    "lat": 12.072392,
    "lng": 75.294333,
    "address": "Pariyaram MC Campus Road",
    "phone": "0497 2808080, 0497 2808111",
    "bloodGroups": [
      "B+",
      "A-"
    ]
  },
  {
    "name": "Swaasam Blood Bank (Run by Any time Blood Voluntary Association)",
    "lat": 11.024262,
    "lng": 76.984656,
    "address": "Shop No. 9/3, Sakthi estate, M. G Road, Avarampalayam, \r\nCoimbatore",
    "phone": "099425 44454, 09942344454",
    "bloodGroups": [
      "AB+",
      "B-",
      "O-",
      "AB-",
      "A+",
      "A-"
    ]
  },
  {
    "name": "Arpan Blood Bank and Blood Component Laboratory and Research Centre",
    "lat": 20.004874,
    "lng": 73.787164,
    "address": "1st Floor, Office No.102/103, Dr. Athawale Chambers, Opposite to Gavkari Press Tilak Path, Nashik \r\n",
    "phone": "0253 2311358, 0253 2576058",
    "bloodGroups": [
      "B-",
      "O+",
      "AB+",
      "O-",
      "B+",
      "A-",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Life Line Charitable Blood Bank",
    "lat": 28.33669,
    "lng": 79.420104,
    "address": "156 A, Gulab Rai Marg, Delhi Gate",
    "phone": "9997031902",
    "bloodGroups": [
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Jawahar Lal Nehru Memorial Hospital Blood Bank",
    "lat": 34.097759,
    "lng": 74.821651,
    "address": "Jawahar Lal Nehru Memorial Hospital Blood Bank, Rainwari, Srinagar",
    "phone": "0194 2507099",
    "bloodGroups": [
      "A-",
      "O+"
    ]
  },
  {
    "name": "Kurinji Hospital Blood Bank",
    "lat": 11.677233,
    "lng": 78.135322,
    "address": "Tee Jay salai, Five Roads, Salem\r\n",
    "phone": "0427 2433321, 0427 2433300, 0427 2433301, 0427 2433302",
    "bloodGroups": [
      "A+",
      "B+"
    ]
  },
  {
    "name": "SJM Blood Bank Basaveshwara Medical College Hospital and Research Centre",
    "lat": 14.239807,
    "lng": 76.388943,
    "address": "NH-4, By Pass, Near KHB Colony",
    "phone": "08194 222054 ",
    "bloodGroups": [
      "A-",
      "B-"
    ]
  },
  {
    "name": "Civil Surgeon - Sarva Samanya Hospital Blood Bank",
    "lat": 17.691305,
    "lng": 74.009424,
    "address": "Bazar Road, Satara",
    "phone": "02162 238494, 02162 235640                ",
    "bloodGroups": [
      "A+",
      "A-",
      "AB+",
      "O+",
      "O-",
      "B-",
      "AB-"
    ]
  },
  {
    "name": " Indian Red Cross Society Blood Bank ",
    "lat": 22.838831,
    "lng": 74.254139,
    "address": "Sanchalit Dr. Mohsinbai S. Lenwala Voluntary Blood Bank, Dr.Harilal C.Seth, Red Cross Bhavan, Police Line road, Dahod",
    "phone": "02673 224422/23",
    "bloodGroups": [
      "A-",
      "AB-"
    ]
  },
  {
    "name": "Rotary K. R. Hospital Blood Bank",
    "lat": 12.941937,
    "lng": 77.553588,
    "address": " No. 75, Hanumanthanagar, 50 Feet Road, Bengaluru ",
    "phone": "080 28437393",
    "bloodGroups": [
      "A-",
      "AB-",
      "B+",
      "A+",
      "O-",
      "B-",
      "O+"
    ]
  },
  {
    "name": "Krishna Super Speciality Hospital ",
    "lat": 26.448475,
    "lng": 80.344084,
    "address": "A Unit of Gita Healthcare Private Limited, 363, Harrisganj, Near Tatmil Chauraha",
    "phone": "0512 2320061, 0512 2320071",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Gian Sagar Medical College and Hospital Blood Bank",
    "lat": 30.528959,
    "lng": 76.671462,
    "address": "Ramnagar (Banur),  District Patiala, Punjab",
    "phone": "01762 510132 Ext:1128/1060, 01762 520 000, 01762507299",
    "bloodGroups": [
      "O+",
      "B+"
    ]
  },
  {
    "name": "Tulsi Pathology Laboratory and Blood Bank",
    "lat": 21.529208,
    "lng": 71.824705,
    "address": "Tulsi Pathology Laboratory and Blood Bank, Bhairav Para, \r\nPalitana, Bhavnagar",
    "phone": "02848 252707",
    "bloodGroups": [
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Narayana Medical College & Hospital Blood Bank",
    "lat": 14.442599,
    "lng": 79.986456,
    "address": "Narayana Hospital compound, Nellore",
    "phone": "0861 2317963",
    "bloodGroups": [
      "B+",
      "B-",
      "O+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "Rajdhani Blood Bank",
    "lat": 21.244963,
    "lng": 81.630129,
    "address": "Main Road, Badhaipara\r\n",
    "phone": "0771 2292120, 0771 2292130",
    "bloodGroups": [
      "B-"
    ]
  },
  {
    "name": "The Coimbatore Bio Medical Services Blood Bank",
    "lat": 11.014581,
    "lng": 76.953349,
    "address": "No.190A, Bashyakarlu Road East, R.S. Puram",
    "phone": "0422 2552297",
    "bloodGroups": [
      "A+",
      "B-",
      "B+",
      "AB-"
    ]
  },
  {
    "name": "Lions Blood Bank",
    "lat": 16.827207,
    "lng": 75.725839,
    "address": "Bandikaman Road, Ward No.6, CTS No.168, Basement Ground and First Floor",
    "phone": "08352 22200050  ",
    "bloodGroups": [
      "AB-"
    ]
  },
  {
    "name": "Sunrise Institute of Medical Sciences Private Limited Blood Bank",
    "lat": 10.025327,
    "lng": 76.338945,
    "address": "Sea Port Air Port Road",
    "phone": "0484 4160000",
    "bloodGroups": [
      "AB-",
      "B-",
      "O+",
      "O-",
      "B+",
      "A-",
      "AB+"
    ]
  },
  {
    "name": "JVP Blood Bank and Transfusion Centre Blood Bank",
    "lat": 19.072305,
    "lng": 73.000676,
    "address": "201, 213 Arenja Arcade Plot No. 4 Sec-17, Next to Apana Bazar, Vashi, Navi Mumbai",
    "phone": "022 27894490, 022 67912094",
    "bloodGroups": [
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Vivekananda Kendra NRL Hospital Blood Bank",
    "lat": 26.591371,
    "lng": 93.749516,
    "address": "NRL Township, Numaligarh Refinery Complex",
    "phone": "03776-266-566,03776-266-700",
    "bloodGroups": [
      "A-",
      "AB-",
      "B-",
      "AB+",
      "B+",
      "O-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "I.M.A.Blood Bank",
    "lat": 8.895879,
    "lng": 76.593227,
    "address": "Ist Floor, IMA Centre, Ashramam",
    "phone": "0474 2766551",
    "bloodGroups": [
      "B+",
      "A+",
      "O+",
      "B-"
    ]
  },
  {
    "name": "Tulsi Pathology Laboratory and Blood Bank",
    "lat": 21.529208,
    "lng": 71.824705,
    "address": "Tulsi Pathology Laboratory and Blood Bank, Bhairav Para, \r\nPalitana, Bhavnagar",
    "phone": "02848 252707",
    "bloodGroups": [
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, SDH, Champua",
    "lat": 21.6293658,
    "lng": 85.5978164,
    "address": "Sub Divisional Hospital Champua, At/-SDH, Champua",
    "phone": "06767 240898",
    "bloodGroups": [
      "AB+",
      "B-",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Christanand Education Society Blood Bank",
    "lat": 20.607715,
    "lng": 79.855757,
    "address": "Christanand Education Society Blood Bank,  Christanand Hospital, Gujri Ward No.2, Brahmapuri",
    "phone": "07177 272016, 07177 271109",
    "bloodGroups": [
      "AB+",
      "B-",
      "A+",
      "O-",
      "O+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Aruvindo Blood Banks SAIMS Hospital",
    "lat": 22.796953,
    "lng": 75.845156,
    "address": "Indore Ujjain State Highway, Near MR 10 Crossing\r\n",
    "phone": "0731 4231000, 0731 4231100",
    "bloodGroups": [
      "B-",
      "O-",
      "A+",
      "A-",
      "AB-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Shyam Nursing Home and Blood Bank",
    "lat": 25.930647,
    "lng": 80.800955,
    "address": "400/761, Civil Line (Near S.P. Residence)",
    "phone": "05180 221166",
    "bloodGroups": [
      "B-",
      "O+"
    ]
  },
  {
    "name": "Sanghvi Blood Bank",
    "lat": 22.7166872,
    "lng": 75.8739793,
    "address": "1st Floor, Manas Bhavan, RNT Marg\r\n\r\n",
    "phone": "0731 2527081, 0731 4208761",
    "bloodGroups": [
      "B-",
      "AB+",
      "O-",
      "AB-",
      "O+",
      "A-",
      "B+"
    ]
  },
  {
    "name": "Arpan Blood Bank Latur",
    "lat": 18.408491,
    "lng": 76.551573,
    "address": "H.No R-3-1030,  Old Sonawane Hospital, Near  Ashok Hotel, Main Road, Latur",
    "phone": "02382 251476, 02382 252476",
    "bloodGroups": [
      "A+",
      "AB-",
      "AB+"
    ]
  },
  {
    "name": "Nadia District Hospital Blood Bank Krishnanagar (Saktinagar)",
    "lat": 23.405437,
    "lng": 88.49109,
    "address": "P.O. Krishnanagar",
    "phone": " 03472 258533",
    "bloodGroups": [
      "O+",
      "AB+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Kiriburu Meghahatuburu General Hospital Blood Bank",
    "lat": 22.104554,
    "lng": 85.291571,
    "address": "Kiriburu Iron Ore Mines",
    "phone": "06596 245025",
    "bloodGroups": [
      "A+",
      "AB-",
      "O-",
      "A-",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Civil Hospital Bhandara Blood Bank",
    "lat": 21.162022,
    "lng": 79.65973,
    "address": "General Hospital Blood Bank, Bhandara\r\n",
    "phone": "07184 252247(Hospital), 07184 250725(Blood Bank)",
    "bloodGroups": [
      "A+",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "K. E. M. Hospital Blood Bank",
    "lat": 19.001515,
    "lng": 72.841877,
    "address": "Acharya Donde Marg, Parel, Mumbai",
    "phone": "022 24107421, 022 24107246, 022 24107249, 022 24107000 ",
    "bloodGroups": [
      "B-",
      "A-",
      "A+",
      "B+"
    ]
  },
  {
    "name": "Fr. Mullers Charitable Instituitions Blood Bank",
    "lat": 12.866805,
    "lng": 74.85933,
    "address": "Post Box No.501, Kankanady",
    "phone": "0824 2238126",
    "bloodGroups": [
      "A-",
      "A+",
      "B-",
      "AB+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "NMDC Apollo Hospital Blood Bank",
    "lat": 18.703695,
    "lng": 81.248612,
    "address": "Bailadila Iron Ore Mines, Bacheli, Dantewada",
    "phone": "07857 230050",
    "bloodGroups": [
      "O+",
      "A-",
      "B-",
      "B+"
    ]
  },
  {
    "name": "Karnataka Hemophillia Society Life Line Blood Bank",
    "lat": 14.457405,
    "lng": 75.902533,
    "address": "No.1138, Ring Road, S. Nijalingappa Layout, Behind KSFC Building",
    "phone": "08192 231948",
    "bloodGroups": [
      "B-",
      "O-",
      "O+",
      "A-",
      "A+"
    ]
  },
  {
    "name": "General Hospital Blood Bank ",
    "lat": 9.265822,
    "lng": 76.782358,
    "address": "",
    "phone": "0468 2222364",
    "bloodGroups": [
      "O-",
      "O+"
    ]
  },
  {
    "name": "Indhira Gandhi Goverment General Hospital Blood Bank ",
    "lat": 11.931847,
    "lng": 79.83303,
    "address": "1,RVE Victor Simonel Street, Adjucent to Assembly",
    "phone": "0413 2225366",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Acharya Shree Tulsi Blood Bank ",
    "lat": 16.785709,
    "lng": 74.56459,
    "address": "Gate No.1232 Sangli - Kolhapur Road, Jaysingpur Udgaon, Kolhapur\r\n",
    "phone": "02322 227955, 02322 228455",
    "bloodGroups": [
      "O+",
      "B-",
      "AB+"
    ]
  },
  {
    "name": "P.B.S.S.General Hospital Blood Bank",
    "lat": 25.441477,
    "lng": 75.644144,
    "address": "Opposite to Road Wave bus stand Bumdi, Near to DC office",
    "phone": "0747 2443456, 0747-2442760",
    "bloodGroups": [
      "AB+"
    ]
  },
  {
    "name": "Noor Hospital Blood Bank",
    "lat": 19.860878,
    "lng": 75.664447,
    "address": "Aurangabad - Jalna Road, Warudi, Tq- Badnapur, Jalna",
    "phone": "02482 222515",
    "bloodGroups": [
      "A-",
      "A+",
      "B-",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "UHM, District Hospital",
    "lat": 26.474045,
    "lng": 80.346099,
    "address": "Shop No. 30/01, Mall Rd, Bada Chouraha, Parade Chouraha, Parade, Kanpur",
    "phone": "0512 2311144",
    "bloodGroups": [
      "B+",
      "AB-",
      "O+",
      "O-",
      "AB+",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Sau Kantadevi Dale Blood Bank",
    "lat": 20.105396,
    "lng": 77.143122,
    "address": "Maa Ganga Memorial Baheti Hospital, Akola Naka, Washim ",
    "phone": "07252 234343, 07252 235606",
    "bloodGroups": [
      "AB+",
      "A+",
      "AB-",
      "O+",
      "B+"
    ]
  },
  {
    "name": "Bandra Holy Family Hospital Society Blood Bank",
    "lat": 19.055059,
    "lng": 72.827202,
    "address": "Saint Andrews Road, Bandra, Mumbai",
    "phone": "022 30610300, 022 30610555, 022 26518373",
    "bloodGroups": [
      "B-",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Mahatma Gandhi Medical College and Research Institute",
    "lat": 11.811867,
    "lng": 79.778314,
    "address": "Pondy-Cuddalore Main Road, Pillaiyarkuppam\r\nPuducherry",
    "phone": "0413 2615449",
    "bloodGroups": [
      "A+"
    ]
  },
  {
    "name": "Janani Voluntary Blood Bank",
    "lat": 17.491139,
    "lng": 78.398166,
    "address": "D.No.125-28-11/1, GPR Complex, KPHB Colony, Kukatpally, Hyderabad",
    "phone": "040 23150496",
    "bloodGroups": [
      "B+",
      "A+",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 25.905078,
    "lng": 93.731607,
    "address": "District Hospital Colony, Dimapur",
    "phone": "9436009493",
    "bloodGroups": [
      "B-",
      "O-",
      "B+",
      "AB-",
      "AB+",
      "A-",
      "O+"
    ]
  },
  {
    "name": "Howrah Orthopaedic Hospital Blood Bank",
    "lat": 22.5839912,
    "lng": 88.3356088,
    "address": "222, Church Road, Howrah Railway Station\r\nNear Bijoy krishna Girls&#39; college",
    "phone": "033-26413688, 033 26411642",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Odisha Red Cross Blood Bank, Nuapada",
    "lat": 20.808848,
    "lng": 82.534107,
    "address": "District Headquarter Hospital, Nuapada",
    "phone": "9437292867",
    "bloodGroups": [
      "A-",
      "AB+",
      "O+",
      "AB-",
      "B-",
      "A+"
    ]
  },
  {
    "name": "Vitthal Sayanna General Hospital (Civil Hospital) Blood Bank",
    "lat": 19.199056,
    "lng": 72.978096,
    "address": "Civil Hospital, 1st Floor, Tembhi Naka, Thane (W)-400601\r\n",
    "phone": "022 25472582, 022 25471409, 022 25471409",
    "bloodGroups": [
      "AB-",
      "O+"
    ]
  },
  {
    "name": "Karpaga Vinayaga Institute of Medical Sciences Blood Bank",
    "lat": 12.592392,
    "lng": 79.911956,
    "address": "GST Road, Chinna Kolambakkam, Palayanoor P.O.\r\nMadurantagam Taluk.\r\n",
    "phone": "044 27566050  044 2759 8484",
    "bloodGroups": [
      "O+",
      "AB-",
      "A-"
    ]
  },
  {
    "name": "Civil Surgeon - Sarva Samanya Hospital Blood Bank",
    "lat": 17.691305,
    "lng": 74.009424,
    "address": "Bazar Road, Satara",
    "phone": "02162 238494, 02162 235640                ",
    "bloodGroups": [
      "A+",
      "A-",
      "AB+",
      "O+",
      "O-",
      "B-",
      "AB-"
    ]
  },
  {
    "name": "Paras Health Care Private Limited Blood Bank",
    "lat": 28.451204,
    "lng": 77.087719,
    "address": "C-1, Sushant Lok City, Phase I, Sector 43, Gurgaon",
    "phone": "0124 4585555",
    "bloodGroups": [
      "A-"
    ]
  },
  {
    "name": "Ratangarh General Hospital Blood Bank",
    "lat": 28.07138,
    "lng": 74.623013,
    "address": "Man Nagar, Churu",
    "phone": "01567 222330, 01567-222924",
    "bloodGroups": [
      "B+",
      "AB-",
      "A-",
      "O+",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Haryana Blood Bank",
    "lat": 29.130234,
    "lng": 75.74437,
    "address": "16, Model Town, NearJjindal Hospital ",
    "phone": "0166 2221740",
    "bloodGroups": [
      "B+"
    ]
  },
  {
    "name": "Sadar Hospital Saharsa Blood Bank ",
    "lat": 25.88715,
    "lng": 86.590953,
    "address": "Zila School Road, Police Line, Saharsa",
    "phone": "9934712522",
    "bloodGroups": [
      "B+",
      "A-",
      "B-",
      "A+",
      "O+",
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "Padmashree Dr. D.Y. Patil (Vishweshwar) Blood Bank",
    "lat": 18.624175,
    "lng": 73.82126,
    "address": "Padmashree, Dr. D. Y. Patil Medical College Hospital, Sant Tukaram Nagar, Pimpari, Pune",
    "phone": "020 27423844, 020 27420439",
    "bloodGroups": [
      "B+",
      "AB+",
      "O-"
    ]
  },
  {
    "name": "Arpan Blood Bank Beed",
    "lat": 18.725503,
    "lng": 76.390737,
    "address": "3rd Floor, Thorat Multispeciality Hospital, D.P. Road, Anand Nagar, Ambejogai, Dist - Beed,\r\n",
    "phone": "02446 245002           ",
    "bloodGroups": [
      "B-",
      "B+",
      "A-",
      "O+",
      "A+"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 11.515577,
    "lng": 79.316767,
    "address": "Government  Hospital, Viruduchalam (T.K)",
    "phone": "04143 231766",
    "bloodGroups": [
      "AB+",
      "A+",
      "A-",
      "O-",
      "B-",
      "AB-",
      "B+",
      "O+"
    ]
  },
  {
    "name": "Kongu Nadu Hospital Private Limited Blood Bank",
    "lat": 11.018134,
    "lng": 76.960595,
    "address": "336 to 353 Dr. Rajendra Prasad Road, (100 feet Road) 11th St, Tatabad, Coimbatore",
    "phone": "0422 4316000, 0422 2494303",
    "bloodGroups": [
      "A+",
      "O-",
      "A-",
      "B-"
    ]
  },
  {
    "name": "Government Medical College General Hospital Blood Bank",
    "lat": 18.39451,
    "lng": 76.578201,
    "address": "Blood Bank, Government Medical College & Hospital, Old Railway Station,  Gandhi Chowk, Latur",
    "phone": "02382 257670, 02382 253017",
    "bloodGroups": [
      "O-",
      "B+"
    ]
  },
  {
    "name": "GSVM Medical College Blood Bank",
    "lat": 26.481102,
    "lng": 80.307684,
    "address": "Swaroop Nagar, Kanpur",
    "phone": "7706922922",
    "bloodGroups": [
      "AB+",
      "B+",
      "O-",
      "AB-"
    ]
  },
  {
    "name": " A. S. Raja Voluntary Blood Bank",
    "lat": 17.720274,
    "lng": 83.313048,
    "address": "D.No. 10-50-11/5, Ground Floor, 1st, 2nd and 3rd Floor, Beside CARE Hospital, Waltair Main Road, Ramnagar, Visakhapatnam\r\n",
    "phone": "0891 2543436,0891 6663436,0891 6644936.",
    "bloodGroups": [
      "O+",
      "B+",
      "AB+",
      "A+"
    ]
  },
  {
    "name": "Sapthagiri Hospital Blood Bank",
    "lat": 13.070573,
    "lng": 77.50228,
    "address": "No.15, Chikkasandra, Hesaraghatta Main Road",
    "phone": "080 22791638",
    "bloodGroups": [
      "B+",
      "B-",
      "A+",
      "O+"
    ]
  },
  {
    "name": "Annai Abirami Blood Bank",
    "lat": 9.915247,
    "lng": 78.119525,
    "address": "171/1, Opposite S K G & CO, South Masi Street, Kondaiyanaidu Ln, Periyar, Madurai Main",
    "phone": "0452 2339750",
    "bloodGroups": [
      "O-",
      "O+",
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Indian Red Cross Society Blood Bank. Narassraopet",
    "lat": 16.235919,
    "lng": 80.048412,
    "address": "Area Hospital, Narasaraopeta ",
    "phone": "8647224455",
    "bloodGroups": [
      "AB+",
      "O+",
      "O-",
      "A+"
    ]
  },
  {
    "name": "B.P. Civil Hospital Blood Bank",
    "lat": 26.344942,
    "lng": 92.689464,
    "address": "Civil Road, Nagaon",
    "phone": "03672-251105",
    "bloodGroups": [
      "A+",
      "AB+"
    ]
  },
  {
    "name": "Narayana Hrudayalaya Blood Bank",
    "lat": 12.80927,
    "lng": 77.695173,
    "address": "University Medical Centre, (KMC) Hospital",
    "phone": "080 27835000 ",
    "bloodGroups": [
      "O-",
      "A-",
      "AB+",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "District Hospital Blood Bank Dharwad",
    "lat": 15.46473,
    "lng": 75.010366,
    "address": "Fort Road",
    "phone": "0836 2747747",
    "bloodGroups": [
      "A+",
      "B+",
      "AB-",
      "O+"
    ]
  },
  {
    "name": "M. T. Agarwal Municipal General Hospital Blood Bank",
    "lat": 19.177861,
    "lng": 72.946234,
    "address": "Dr. R. P. Road, Mulund (W), Mumbai",
    "phone": "022 25640767, 022 25605730 (Extn. 308)",
    "bloodGroups": [
      "A+",
      "O-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 26.496004,
    "lng": 77.998665,
    "address": "District Hospital",
    "phone": "07532 226318",
    "bloodGroups": [
      "B+",
      "AB-",
      "AB+",
      "A-",
      "O+",
      "B-",
      "A+",
      "O-"
    ]
  },
  {
    "name": "Dholpur Government Hospital",
    "lat": 26.690079,
    "lng": 77.899636,
    "address": "Madina Colony,  Hospital Road",
    "phone": "05642 220738, 05642 221180, Ext 207, 05642-220221",
    "bloodGroups": [
      "AB+",
      "A+",
      "O-",
      "A-",
      "AB-",
      "B-"
    ]
  },
  {
    "name": "Late N.H. Ramani Memorial Voluntary Blood Bank and Navchetan Pathology Lab Modasa",
    "lat": 23.459892,
    "lng": 73.297569,
    "address": "Late N.H. Ramani Memorial Voluntary Blood Bank and Navchetan Pathology Lab, 2nd floor, Upasana Complex, Nr. S.T. Stand, Modasa, Sabarkantha.",
    "phone": "02774 247890, 02774 243690",
    "bloodGroups": [
      "A-",
      "AB+",
      "B-",
      "A+",
      "O-",
      "B+",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Woman and Child Hospital Blood Bank",
    "lat": 9.4637103,
    "lng": 76.3702515,
    "address": "Beach bazar",
    "phone": "0477 2251151",
    "bloodGroups": [
      "AB+",
      "O+",
      "O-",
      "B+"
    ]
  },
  {
    "name": "Government Hospital Blood Bank",
    "lat": 9.019172,
    "lng": 76.924716,
    "address": "Govt. Blood Bank \r\nThaluk hospital \r\nPunalur\r\n\r\n\r\n",
    "phone": "0475 2222702, 0475 2228702",
    "bloodGroups": [
      "B-",
      "A-",
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Indian Red Cross Society - Smt. Gopabai Damani Blood Bank",
    "lat": 17.660077,
    "lng": 75.906391,
    "address": "165 Railway Line, Red Cross Road, Dufferin Chowk, Solapur ",
    "phone": "0217 2726858, 0217 2722106",
    "bloodGroups": [
      "O+",
      "A-"
    ]
  },
  {
    "name": "ST Thomas Hospital Blood Bank and Leprosy Centre",
    "lat": 12.466265,
    "lng": 79.335994,
    "address": "Chettupattu, Polur Road, Tiruvannamalai",
    "phone": "04181 252263",
    "bloodGroups": [
      "B+",
      "O+",
      "A-"
    ]
  },
  {
    "name": "Purba Medinipur District Hospital Blood bank",
    "lat": 22.286378,
    "lng": 87.919661,
    "address": "P.O. Tamluk",
    "phone": "03228 263233, 263209",
    "bloodGroups": [
      "AB+",
      "AB-"
    ]
  },
  {
    "name": "The Osmania General Hospital Blood Bank",
    "lat": 17.372522,
    "lng": 78.473807,
    "address": " Osmania General Hospital Premises, Hyderabad",
    "phone": "040 24600146",
    "bloodGroups": [
      "B+",
      "A-"
    ]
  },
  {
    "name": "Bhoruka Research Centre for Haematology and Blood Transfusion",
    "lat": 22.555075,
    "lng": 88.357116,
    "address": "63 Rafi Ahmed Kidwai Road, Kolkata ",
    "phone": "033 22658092",
    "bloodGroups": [
      "O+",
      "B+"
    ]
  },
  {
    "name": "Sadar Hospital Ara (Bhojpur) Blood bank",
    "lat": 25.559755,
    "lng": 84.667554,
    "address": "Sapna Cinema Road, Nawada,",
    "phone": "7870307773",
    "bloodGroups": [
      "A+",
      "B-",
      "B+",
      "AB-",
      "AB+",
      "O+"
    ]
  },
  {
    "name": "Park Hospital Blood Bank",
    "lat": 28.420003,
    "lng": 77.048378,
    "address": "Q Block, South City 2, Sohna Road, Main Sec-47, ",
    "phone": "01244900037, 0124490038",
    "bloodGroups": [
      "AB-",
      "O-",
      "B-",
      "AB+",
      "O+",
      "B+",
      "A+"
    ]
  },
  {
    "name": "Ashirwad Blood Bank",
    "lat": 19.017341,
    "lng": 72.848164,
    "address": "Imperial Mahal, 2nd Floor  Above Shabana Stores, Khodadad Circle, Dr. B. A. Ambedkar Road, Dadar TT,  Mumbai",
    "phone": "022 24154826, 022 24154827",
    "bloodGroups": [
      "A+",
      "AB-"
    ]
  },
  {
    "name": "Community Welfare Society Hospital Blood Bank",
    "lat": 22.255332,
    "lng": 84.900917,
    "address": "Jagda, Rourkela",
    "phone": "0661 2473931, 0661 2473927",
    "bloodGroups": [
      "B+",
      "O-",
      "B-",
      "O+",
      "AB-"
    ]
  },
  {
    "name": "Pandit General Hospital Blood Bank",
    "lat": 14.32773,
    "lng": 74.491531,
    "address": "Sirsi",
    "phone": "0838 2223066",
    "bloodGroups": [
      "B-",
      "AB+",
      "O+",
      "AB-",
      "B+",
      "A-",
      "O-"
    ]
  },
  {
    "name": "Santhi Hospital Blood Bank",
    "lat": 11.362673,
    "lng": 75.964611,
    "address": "Omaserry",
    "phone": "0495 2282550",
    "bloodGroups": [
      "O-",
      "B-",
      "AB-",
      "B+"
    ]
  },
  {
    "name": "Almas Hospital Blood Bank - Chankuvatty",
    "lat": 11.00015,
    "lng": 75.991133,
    "address": "",
    "phone": "0483 2748536,  0483 2748539",
    "bloodGroups": [
      "AB+",
      "B-",
      "A+",
      "B+",
      "A-",
      "O-",
      "AB-"
    ]
  },
  {
    "name": "Sant Gadgebaba Blood Bank and Component Centre Badnera",
    "lat": 20.794116,
    "lng": 77.709547,
    "address": "Opposite to Shrihari Hospital, Juni Vasti (Old Town), Badnera  Amravati\r\n",
    "phone": "0721 2580490, 0721 2580455              ",
    "bloodGroups": [
      "B+",
      "A-"
    ]
  },
  {
    "name": "Dhemaji Civil Hospital Blood Bank",
    "lat": 27.458026,
    "lng": 94.574533,
    "address": "Ward No:9, Lachit Nagar, Natun Nagar Rd",
    "phone": "9678100660",
    "bloodGroups": [
      "O+",
      "B-",
      "AB-",
      "B+",
      "A-",
      "AB+",
      "A+",
      "O-"
    ]
  },
  {
    "name": "District Hospital Blood Bank",
    "lat": 27.17064,
    "lng": 78.010456,
    "address": "MG Road, Chhipitola, Rakabganj, Agra\r\n",
    "phone": "0562 2463043",
    "bloodGroups": [
      "O+",
      "B+",
      "AB-",
      "AB+",
      "A-",
      "A+"
    ]
  }
];

  res.json(bloodBanks);
});

app.listen(PORT, () => {
  console.log(`🚀 VEEVA server running at http://localhost:${PORT}`);
});
