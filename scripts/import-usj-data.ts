// Import missing persons data from USJ disaster.sufoeusj.org
// Source: Engineering Faculty Students' Union, University of Sri Jayewardenepura
// Data Attribution: https://disaster.sufoeusj.org/

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

type MissingPersonInsert = {
  full_name: string
  age: number | null
  gender: 'male' | 'female' | 'other' | null
  physical_description: string | null
  last_seen_location: string | null
  last_seen_date: string | null
  district: string
  reporter_name: string
  reporter_phone: string
  notes: string // Source attribution
  is_verified: boolean
  is_published: boolean
}

// Data from disaster.sufoeusj.org - scraped December 1, 2025
const missingPersons: MissingPersonInsert[] = [
  // === NUWARA ELIYA DISTRICT ===
  {
    full_name: "Shalaka Mayurawansha",
    age: null,
    gender: "male",
    physical_description: "5'7\" height, lives near Sathosa, owns Studio Thilini",
    last_seen_location: "Walapane Area",
    last_seen_date: "2025-11-27",
    district: "Nuwara Eliya",
    reporter_name: "Parami Attanayake",
    reporter_phone: "0773666997",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Ashan Umyajith",
    age: null,
    gender: "male",
    physical_description: "University of Peradeniya student, from Batagolla area, no response since last Wednesday",
    last_seen_location: "Walapane Area, Batagolla",
    last_seen_date: "2025-11-27",
    district: "Nuwara Eliya",
    reporter_name: "Family Contact",
    reporter_phone: "0701215686",
    notes: "Source: disaster.sufoeusj.org | Alt contacts: 0774547861, 0761286807",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Indhrani Karuppaiya",
    age: 48,
    gender: "female",
    physical_description: "Short height, dark skin, curly hair",
    last_seen_location: "Ramboda",
    last_seen_date: "2025-11-28",
    district: "Nuwara Eliya",
    reporter_name: "Rayer",
    reporter_phone: "0773106351",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Ravindu Dilshan Krasse",
    age: 24,
    gender: "male",
    physical_description: "Height: 5'8\", Weight: ~50 kg, Watagoda-Pathana Road",
    last_seen_location: "Pussallawa",
    last_seen_date: "2025-11-28",
    district: "Nuwara Eliya",
    reporter_name: "Pasindu Warnasuriya",
    reporter_phone: "0761167898",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Sinhala Pedi Gedara Ranasinha",
    age: null,
    gender: "male",
    physical_description: "6 ft tall, Atabage Ihalagama",
    last_seen_location: "Pussallawa, Atabage Ihalagama",
    last_seen_date: "2025-11-27",
    district: "Nuwara Eliya",
    reporter_name: "Lahiru Gimhana",
    reporter_phone: "0773738111",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Prabhath Mahanama",
    age: 34,
    gender: "male",
    physical_description: "5'9\", light brown skin, driving white Perodua Bezza (CBB 5699), Gonapitiya Tea Factory area",
    last_seen_location: "Kandapola, Gonapitiya Tea Factory area",
    last_seen_date: "2025-11-28",
    district: "Nuwara Eliya",
    reporter_name: "Yasith Ransika",
    reporter_phone: "0774064767",
    notes: "Source: disaster.sufoeusj.org | Vehicle: White Perodua Bezza CBB 5699",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Sri Plus Villa Cabana Owner",
    age: 47,
    gender: "male",
    physical_description: "Tour guide and cabana owner",
    last_seen_location: "Mandaramnuwara",
    last_seen_date: "2025-11-27",
    district: "Nuwara Eliya",
    reporter_name: "Harshan Amarasinghe",
    reporter_phone: "0776208543",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "A.M. Dammika",
    age: 36,
    gender: "male",
    physical_description: null,
    last_seen_location: "Mandaramnuwara",
    last_seen_date: "2025-11-27",
    district: "Nuwara Eliya",
    reporter_name: "A.M. Dammika Priyanthi",
    reporter_phone: "0707531003",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },

  // === KANDY DISTRICT ===
  {
    full_name: "J.A. Erandani Kumudu Kumari",
    age: 34,
    gender: "female",
    physical_description: "4'10\" height, weight 60 kg, Naranhinna",
    last_seen_location: "Delthota, Naranhinna",
    last_seen_date: "2025-11-27",
    district: "Kandy",
    reporter_name: "J.A. Lahiru Mahesh",
    reporter_phone: "0778512490",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Kaveesha Jegadeeshan",
    age: 23,
    gender: "female",
    physical_description: "5'4\", fair skin, medium hair, Nillamba",
    last_seen_location: "Delthota, Nillamba",
    last_seen_date: "2025-11-28",
    district: "Kandy",
    reporter_name: "Maleesha Godamunna",
    reporter_phone: "0742952999",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "සචින්ත වීරසිංහ (Sachintha Weerasinghe)",
    age: 21,
    gender: "male",
    physical_description: "Height: 5'8\"-6', Ududumbara",
    last_seen_location: "Gampola/Gelioya, Ududumbara",
    last_seen_date: "2025-11-27",
    district: "Kandy",
    reporter_name: "අචල ධීම්න්ත",
    reporter_phone: "0759675953",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "O.L. Lahiru Lakshitha Perera",
    age: null,
    gender: "male",
    physical_description: "With mother, grandmother, two sisters, brother, and uncle. Gurudeniya, Ranavirumawatha",
    last_seen_location: "Gampola/Gelioya, Gurudeniya, Ranavirumawatha",
    last_seen_date: "2025-11-28",
    district: "Kandy",
    reporter_name: "Hansadewmina",
    reporter_phone: "0701515609",
    notes: "Source: disaster.sufoeusj.org | Missing with 6 family members",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Ruwini Kanchana",
    age: 44,
    gender: "female",
    physical_description: "With mother, father, and three daughters, Pallegama",
    last_seen_location: "Ankubura, Pallegama",
    last_seen_date: "2025-11-28",
    district: "Kandy",
    reporter_name: "Chamila",
    reporter_phone: "0763814966",
    notes: "Source: disaster.sufoeusj.org | Missing with 5 family members",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Halahalpperumage Rita Fonseka",
    age: 70,
    gender: "female",
    physical_description: "5'3\", near Bandarahena Buddha statue",
    last_seen_location: "Madakele, near Bandarahena Buddha statue",
    last_seen_date: "2025-11-28",
    district: "Kandy",
    reporter_name: "Kottage Upekkha",
    reporter_phone: "0702132551",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Mewan Manjushri Kanearachchi",
    age: 43,
    gender: "male",
    physical_description: "5'4\" height, medium size",
    last_seen_location: "Kurunduwatta",
    last_seen_date: "2025-11-27",
    district: "Kandy",
    reporter_name: "Thakshmila Rathnayake",
    reporter_phone: "0703170551",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Roshane Waidyakularathna",
    age: 45,
    gender: "male",
    physical_description: "Uda Eeriyagama area",
    last_seen_location: "Peradeniya, Uda Eeriyagama area",
    last_seen_date: "2025-11-29",
    district: "Kandy",
    reporter_name: "Darshani Rathnayake",
    reporter_phone: "+94712380484",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },

  // === MATALE DISTRICT ===
  {
    full_name: "සහන් දිලීප් (Sahan Dilip - Galpusa)",
    age: 25,
    gender: "male",
    physical_description: "University of Peradeniya Science Faculty student (Year 20), from Ankumbura, Udakitulgolla (area affected by landslide)",
    last_seen_location: "Ankumbura, Udakitulgolla",
    last_seen_date: "2025-11-28",
    district: "Matale",
    reporter_name: "University Contact",
    reporter_phone: "0769401669",
    notes: "Source: disaster.sufoeusj.org | UoP Science Faculty Year 20 student",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Dissanayaka Mudiyanselage Dammika Dissanayake",
    age: 49,
    gender: "male",
    physical_description: "6 ft tall, Imbulpitiya, Karagahahinna, Alkadua Road. Lives with mother and sister, house partially damaged",
    last_seen_location: "Imbulpitiya, Karagahahinna, Alkadua Road",
    last_seen_date: "2025-11-26",
    district: "Matale",
    reporter_name: "A.G.D. Tharuni",
    reporter_phone: "0765779699",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },

  // === BADULLA DISTRICT ===
  {
    full_name: "Adithya Vihari",
    age: 21,
    gender: "female",
    physical_description: "Grandmother searching for her",
    last_seen_location: "Hasalaka",
    last_seen_date: "2025-11-27",
    district: "Badulla",
    reporter_name: "Mali Priyangani Fernando",
    reporter_phone: "0774422257",
    notes: "Source: disaster.sufoeusj.org | Alt contact: 0750113590",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Ishani Kodithuwakku",
    age: 27,
    gender: "female",
    physical_description: "5'8\" tall, black hair, tan color, ~60 kg. Signal issues since last Friday",
    last_seen_location: "Badulla/Maduruketiya",
    last_seen_date: "2025-11-28",
    district: "Badulla",
    reporter_name: "Tiran Bhashitha",
    reporter_phone: "0719252820",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },

  // === KALUTARA DISTRICT ===
  {
    full_name: "Kaushalya Sonali",
    age: 31,
    gender: "female",
    physical_description: "5'4\" height",
    last_seen_location: "Padiyapelella",
    last_seen_date: "2025-11-26",
    district: "Kalutara",
    reporter_name: "Harsha Amal Bhathiya",
    reporter_phone: "0776442294",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },

  // === GAMPAHA DISTRICT ===
  {
    full_name: "H N Weerakon",
    age: null,
    gender: "female",
    physical_description: "No. 98, Kaluwana, was home when last contacted",
    last_seen_location: "Kaluwana, Abathanna",
    last_seen_date: "2025-11-27",
    district: "Gampaha",
    reporter_name: "A close relative",
    reporter_phone: "0763246602",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "B. Ishara Sumudu Kumari",
    age: 35,
    gender: "female",
    physical_description: "5'7\" height, Udukumburagama",
    last_seen_location: "Ududumbara, Udukumburagama",
    last_seen_date: "2025-11-28",
    district: "Gampaha",
    reporter_name: "R.W.N. Rupasingha",
    reporter_phone: "0775185540",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Tharushi Ishara Abesingha Rathnayake",
    age: 21,
    gender: "female",
    physical_description: "Height: 5'3\", short wolfcut hair, oval face, tan color. 212/A, Polgahaanga",
    last_seen_location: "Weligalla, 212/A Polgahaanga",
    last_seen_date: "2025-11-26",
    district: "Gampaha",
    reporter_name: "Kihaduwage Thamadi",
    reporter_phone: "0721716833",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },

  // === PUTTALAM DISTRICT ===
  {
    full_name: "W R W D Kurera (Watsala), Ramani & Family",
    age: null,
    gender: "female",
    physical_description: "Reporter's wife and two children (4 people total: 2 adults, 2 children). Digannawa, Bangadeniya area. Reporter abroad (Korea)",
    last_seen_location: "Halawata (Arachchikattuwa), Digannawa, Bangadeniya area",
    last_seen_date: "2025-11-27",
    district: "Puttalam",
    reporter_name: "Eranga (Korea)",
    reporter_phone: "+821026889022",
    notes: "Source: disaster.sufoeusj.org | Alt contact: Chethana 0750844335 | 4 people missing",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Wijesingha Arachchige Sudarshika Jayawanthi",
    age: 33,
    gender: "female",
    physical_description: "5'3\", ~65 kg, with husband and daughter. Welankale, Adippala, Arachchikattuwa",
    last_seen_location: "Welankale, Adippala, Arachchikattuwa",
    last_seen_date: "2025-11-27",
    district: "Puttalam",
    reporter_name: "Warnakolasuriya Piyanka (New Zealand)",
    reporter_phone: "+64224758176",
    notes: "Source: disaster.sufoeusj.org | Missing with husband and daughter",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Adikari Arachchilage Ruwan Ratnasiri",
    age: 44,
    gender: "male",
    physical_description: "5'9\", ~60 kg, Wela Kale, Adippala",
    last_seen_location: "Wela Kale, Adippala",
    last_seen_date: "2025-11-27",
    district: "Puttalam",
    reporter_name: "Warnakolasuriya Piyanka",
    reporter_phone: "+64224758176",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Adikari Arachchilage Hazael Catalina",
    age: 2,
    gender: "female",
    physical_description: "~90 cm tall, likely with parents, Wela Kale, Adippala",
    last_seen_location: "Wela Kale, Adippala",
    last_seen_date: "2025-11-27",
    district: "Puttalam",
    reporter_name: "Warnakolasuriya Piyanka",
    reporter_phone: "+64224758176",
    notes: "Source: disaster.sufoeusj.org | 2-year-old child, likely with parents",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "බුද්ධිකා සහ සෙහොත් (Buddhika and child)",
    age: null,
    gender: "female",
    physical_description: "Wife of Air Force officer from Trincomalee, with 3-year-old child",
    last_seen_location: "Halawata (Arachchikattuwa)",
    last_seen_date: "2025-11-27",
    district: "Puttalam",
    reporter_name: "Air Force Contact",
    reporter_phone: "0763451506",
    notes: "Source: disaster.sufoeusj.org | Alt: 073629650 | Mother and 3-year-old child",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "K Hamisha Shamalki",
    age: 21,
    gender: "female",
    physical_description: "With husband and baby, went to wedding at Kokkaawila, Vilatthawa",
    last_seen_location: "Kokkaawila, Vilatthawa",
    last_seen_date: "2025-11-27",
    district: "Puttalam",
    reporter_name: "K H Ravindra",
    reporter_phone: "0756070463",
    notes: "Source: disaster.sufoeusj.org | Alt: 0753344966 | With husband and baby",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "සසිඳු සචින්ත (Sasindu Sachintha)",
    age: null,
    gender: "male",
    physical_description: "Student from Gampaha Wickramarachchi University (1st year), from Kalægama, Adippala, went to wedding",
    last_seen_location: "Kalægama, Adippala",
    last_seen_date: "2025-11-27",
    district: "Puttalam",
    reporter_name: "Nethmina Jayasinghe",
    reporter_phone: "0715150880",
    notes: "Source: disaster.sufoeusj.org | Gampaha Wickramarachchi University 1st year",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "දිල්කි නවෝදා (Dilki Nawoda)",
    age: null,
    gender: "female",
    physical_description: "Student from Gampaha Wickramarachchi University (1st year), from Kalægama, Adippala, went to wedding",
    last_seen_location: "Kalægama, Adippala",
    last_seen_date: "2025-11-27",
    district: "Puttalam",
    reporter_name: "Nethmina Jayasinghe",
    reporter_phone: "0715150880",
    notes: "Source: disaster.sufoeusj.org | Gampaha Wickramarachchi University 1st year",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Sahanya Ranasinghe & Family",
    age: 20,
    gender: "female",
    physical_description: "Traveled from Malabe to Naththandiya last Thursday",
    last_seen_location: "Naththandiya",
    last_seen_date: "2025-11-28",
    district: "Puttalam",
    reporter_name: "Imasha Nugawela",
    reporter_phone: "0740746335",
    notes: "Source: disaster.sufoeusj.org | Missing with family",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "P L Reman Sanjeewa (Maalu Reman)",
    age: null,
    gender: "male",
    physical_description: "Known as 'Maalu Reman', with mother, father, sister, wife, and newborn. Kokwaththapara, Suruwama Handiya",
    last_seen_location: "Kokwaththapara, Suruwama Handiya",
    last_seen_date: "2025-11-27",
    district: "Puttalam",
    reporter_name: "Sahan Anjana",
    reporter_phone: "+94756787010",
    notes: "Source: disaster.sufoeusj.org | Missing with 6 family members including newborn",
    is_verified: false,
    is_published: true
  },

  // === COLOMBO AREA ===
  {
    full_name: "නෙත්මි පියුමිකා ජයමහ (Nethmi Piyumika Jayamaha)",
    age: null,
    gender: "female",
    physical_description: "University of Peradeniya Agriculture Faculty Year 21 student, from No. 336, Parana Hittipola, Wilgamuwa",
    last_seen_location: "Weligama / Wilgamuwa",
    last_seen_date: "2025-11-27",
    district: "Colombo",
    reporter_name: "Kavinda (WhatsApp only)",
    reporter_phone: "0763610844",
    notes: "Source: disaster.sufoeusj.org | UoP Agriculture Faculty Year 21",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Sachintha Bennett",
    age: null,
    gender: "male",
    physical_description: "Near Nuwara or Silvester area",
    last_seen_location: "Near Nuwara or Silvester area",
    last_seen_date: "2025-11-27",
    district: "Colombo",
    reporter_name: "Family Contact",
    reporter_phone: "0772706599",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },

  // === POLONNARUWA DISTRICT ===
  {
    full_name: "Sakila Gimaya",
    age: 21,
    gender: "female",
    physical_description: "5'7\", brown skin",
    last_seen_location: "Polonnaruwa",
    last_seen_date: "2025-11-30",
    district: "Polonnaruwa",
    reporter_name: "Jagath Jayasundara",
    reporter_phone: "0710741901",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },

  // === MONARAGALA / MAHIYANGANA AREA ===
  {
    full_name: "Suminda Roshan Daramadasa",
    age: 27,
    gender: "male",
    physical_description: "5'4\"-5'7\", slim build, Wewatta. Final year student at Technical University. Brother is Grama Niladhari in area",
    last_seen_location: "Mahiyangana, Wewatta",
    last_seen_date: "2025-11-27",
    district: "Monaragala",
    reporter_name: "Yashodara Vishwani",
    reporter_phone: "0717331974",
    notes: "Source: disaster.sufoeusj.org | Technical University final year student",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Isuru Anjana",
    age: 21,
    gender: "male",
    physical_description: "Caught in flood at Makevita area",
    last_seen_location: "Mahiyangana, Makevita area",
    last_seen_date: "2025-11-27",
    district: "Monaragala",
    reporter_name: "Family Contact",
    reporter_phone: "0750815086",
    notes: "Source: disaster.sufoeusj.org | Caught in flood",
    is_verified: false,
    is_published: true
  },

  // === OTHER LOCATIONS ===
  {
    full_name: "Ruvini Senarathna",
    age: 38,
    gender: "female",
    physical_description: "5'2\" height, fair skin",
    last_seen_location: "Harispathuwa",
    last_seen_date: "2025-11-27",
    district: "Kandy",
    reporter_name: "Dilshani Masachchi",
    reporter_phone: "0717954858",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Mallika Weerasinghe",
    age: 60,
    gender: "female",
    physical_description: "~4'5\", fair, short",
    last_seen_location: "Dellanga",
    last_seen_date: "2025-11-27",
    district: "Kandy",
    reporter_name: "Pradeepa",
    reporter_phone: "0764581026",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Siriwardana",
    age: 61,
    gender: "male",
    physical_description: "~5'8\" height",
    last_seen_location: "Dellanga",
    last_seen_date: "2025-11-27",
    district: "Kandy",
    reporter_name: "Pradeepa Siriwardana",
    reporter_phone: "0764581026",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "M.P.C. Supunsala Madawala",
    age: 23,
    gender: "female",
    physical_description: "5 ft height, 11/1/A Ella Kaday",
    last_seen_location: "Alawathugoda, 11/1/A Ella Kaday",
    last_seen_date: "2025-11-26",
    district: "Kandy",
    reporter_name: "Kaushalya Fernando (in Maldives)",
    reporter_phone: "0786740803",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Imesha Sewmini",
    age: 30,
    gender: "female",
    physical_description: null,
    last_seen_location: "Daduruoya",
    last_seen_date: "2025-11-29",
    district: "Kandy",
    reporter_name: "Darshani Rathnayake",
    reporter_phone: "+94712380484",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Don Madushi Ishara Wanigathunga",
    age: 26,
    gender: "female",
    physical_description: "5'5\" height, long hair",
    last_seen_location: "Ruhuna Campus area",
    last_seen_date: "2025-11-27",
    district: "Matara",
    reporter_name: "Bhagya Basnayaka",
    reporter_phone: "0761773297",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Tarini Kalansooriya",
    age: 23,
    gender: "female",
    physical_description: null,
    last_seen_location: "Unknown",
    last_seen_date: "2025-11-26",
    district: "Colombo",
    reporter_name: "Family Contact",
    reporter_phone: "0741220715",
    notes: "Source: disaster.sufoeusj.org (USJ Engineering Faculty)",
    is_verified: false,
    is_published: true
  },
  {
    full_name: "Imalka Jayawardana",
    age: 19,
    gender: "female",
    physical_description: "158 cm, 60 kg, last seen with mother",
    last_seen_location: "Unknown",
    last_seen_date: "2025-11-28",
    district: "Colombo",
    reporter_name: "Harshani Wijesooriya",
    reporter_phone: "0769116529",
    notes: "Source: disaster.sufoeusj.org | Last seen with mother",
    is_verified: false,
    is_published: true
  },

  // === UNIVERSITY STUDENTS - ADDITIONAL ===
  {
    full_name: "සෙනුර වර්ණජිත් (Senura Warnajith)",
    age: null,
    gender: "male",
    physical_description: "University of Kelaniya, Management Faculty, 1st year. From Gampola, Panwilatanna",
    last_seen_location: "Gampola, Panwilatanna",
    last_seen_date: "2025-11-27",
    district: "Kandy",
    reporter_name: "University Contact",
    reporter_phone: "0000000000",
    notes: "Source: disaster.sufoeusj.org | UoK Management Faculty 1st year - PHONE NEEDED",
    is_verified: false,
    is_published: true
  },
]

async function importData() {
  console.log(`Importing ${missingPersons.length} records...`)
  
  for (const person of missingPersons) {
    const { error } = await supabase.from('missing_persons').insert(person)
    if (error) {
      console.error(`Failed to insert ${person.full_name}:`, error.message)
    } else {
      console.log(`✓ Inserted: ${person.full_name}`)
    }
  }
  
  console.log('Import complete!')
}

importData()

