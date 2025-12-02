-- Import missing persons data from USJ disaster.sufoeusj.org
-- Source: Engineering Faculty Students' Union, University of Sri Jayewardenepura
-- Data Attribution: https://disaster.sufoeusj.org/
-- Run this in Supabase SQL Editor

INSERT INTO missing_persons (full_name, age, gender, physical_description, last_seen_location, last_seen_date, district, reporter_name, reporter_phone, notes, is_verified, is_published) VALUES

-- === NUWARA ELIYA DISTRICT ===
('Shalaka Mayurawansha', NULL, 'male', '5''7" height, lives near Sathosa, owns Studio Thilini', 'Walapane Area', '2025-11-27', 'Nuwara Eliya', 'Parami Attanayake', '0773666997', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('Ashan Umyajith', NULL, 'male', 'University of Peradeniya student, from Batagolla area, no response since last Wednesday', 'Walapane Area, Batagolla', '2025-11-27', 'Nuwara Eliya', 'Family Contact', '0701215686', 'Source: disaster.sufoeusj.org | Alt contacts: 0774547861, 0761286807', false, true),

('Indhrani Karuppaiya', 48, 'female', 'Short height, dark skin, curly hair', 'Ramboda', '2025-11-28', 'Nuwara Eliya', 'Rayer', '0773106351', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('Ravindu Dilshan Krasse', 24, 'male', 'Height: 5''8", Weight: ~50 kg, Watagoda-Pathana Road', 'Pussallawa', '2025-11-28', 'Nuwara Eliya', 'Pasindu Warnasuriya', '0761167898', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('Sinhala Pedi Gedara Ranasinha', NULL, 'male', '6 ft tall, Atabage Ihalagama', 'Pussallawa, Atabage Ihalagama', '2025-11-27', 'Nuwara Eliya', 'Lahiru Gimhana', '0773738111', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('Prabhath Mahanama', 34, 'male', '5''9", light brown skin, driving white Perodua Bezza (CBB 5699), Gonapitiya Tea Factory area', 'Kandapola, Gonapitiya Tea Factory area', '2025-11-28', 'Nuwara Eliya', 'Yasith Ransika', '0774064767', 'Source: disaster.sufoeusj.org | Vehicle: White Perodua Bezza CBB 5699', false, true),

('Sri Plus Villa Cabana Owner', 47, 'male', 'Tour guide and cabana owner', 'Mandaramnuwara', '2025-11-27', 'Nuwara Eliya', 'Harshan Amarasinghe', '0776208543', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('A.M. Dammika', 36, 'male', NULL, 'Mandaramnuwara', '2025-11-27', 'Nuwara Eliya', 'A.M. Dammika Priyanthi', '0707531003', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

-- === KANDY DISTRICT ===
('J.A. Erandani Kumudu Kumari', 34, 'female', '4''10" height, weight 60 kg, Naranhinna', 'Delthota, Naranhinna', '2025-11-27', 'Kandy', 'J.A. Lahiru Mahesh', '0778512490', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('Kaveesha Jegadeeshan', 23, 'female', '5''4", fair skin, medium hair, Nillamba', 'Delthota, Nillamba', '2025-11-28', 'Kandy', 'Maleesha Godamunna', '0742952999', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('සචින්ත වීරසිංහ (Sachintha Weerasinghe)', 21, 'male', 'Height: 5''8"-6'', Ududumbara', 'Gampola/Gelioya, Ududumbara', '2025-11-27', 'Kandy', 'අචල ධීම්න්ත', '0759675953', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('O.L. Lahiru Lakshitha Perera', NULL, 'male', 'With mother, grandmother, two sisters, brother, and uncle. Gurudeniya, Ranavirumawatha', 'Gampola/Gelioya, Gurudeniya, Ranavirumawatha', '2025-11-28', 'Kandy', 'Hansadewmina', '0701515609', 'Source: disaster.sufoeusj.org | Missing with 6 family members', false, true),

('Ruwini Kanchana', 44, 'female', 'With mother, father, and three daughters, Pallegama', 'Ankubura, Pallegama', '2025-11-28', 'Kandy', 'Chamila', '0763814966', 'Source: disaster.sufoeusj.org | Missing with 5 family members', false, true),

('Halahalpperumage Rita Fonseka', 70, 'female', '5''3", near Bandarahena Buddha statue', 'Madakele, near Bandarahena Buddha statue', '2025-11-28', 'Kandy', 'Kottage Upekkha', '0702132551', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('Mewan Manjushri Kanearachchi', 43, 'male', '5''4" height, medium size', 'Kurunduwatta', '2025-11-27', 'Kandy', 'Thakshmila Rathnayake', '0703170551', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('Roshane Waidyakularathna', 45, 'male', 'Uda Eeriyagama area', 'Peradeniya, Uda Eeriyagama area', '2025-11-29', 'Kandy', 'Darshani Rathnayake', '+94712380484', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('Ruvini Senarathna', 38, 'female', '5''2" height, fair skin', 'Harispathuwa', '2025-11-27', 'Kandy', 'Dilshani Masachchi', '0717954858', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('Mallika Weerasinghe', 60, 'female', '~4''5", fair, short', 'Dellanga', '2025-11-27', 'Kandy', 'Pradeepa', '0764581026', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('Siriwardana', 61, 'male', '~5''8" height', 'Dellanga', '2025-11-27', 'Kandy', 'Pradeepa Siriwardana', '0764581026', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('M.P.C. Supunsala Madawala', 23, 'female', '5 ft height, 11/1/A Ella Kaday', 'Alawathugoda, 11/1/A Ella Kaday', '2025-11-26', 'Kandy', 'Kaushalya Fernando (in Maldives)', '0786740803', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('Imesha Sewmini', 30, 'female', NULL, 'Daduruoya', '2025-11-29', 'Kandy', 'Darshani Rathnayake', '+94712380484', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('සෙනුර වර්ණජිත් (Senura Warnajith)', NULL, 'male', 'University of Kelaniya, Management Faculty, 1st year. From Gampola, Panwilatanna', 'Gampola, Panwilatanna', '2025-11-27', 'Kandy', 'University Contact', '0000000000', 'Source: disaster.sufoeusj.org | UoK Management Faculty 1st year - PHONE NEEDED', false, true),

-- === MATALE DISTRICT ===
('සහන් දිලීප් (Sahan Dilip - Galpusa)', 25, 'male', 'University of Peradeniya Science Faculty student (Year 20), from Ankumbura, Udakitulgolla (area affected by landslide)', 'Ankumbura, Udakitulgolla', '2025-11-28', 'Matale', 'University Contact', '0769401669', 'Source: disaster.sufoeusj.org | UoP Science Faculty Year 20 student', false, true),

('Dissanayaka Mudiyanselage Dammika Dissanayake', 49, 'male', '6 ft tall, Imbulpitiya, Karagahahinna, Alkadua Road. Lives with mother and sister, house partially damaged', 'Imbulpitiya, Karagahahinna, Alkadua Road', '2025-11-26', 'Matale', 'A.G.D. Tharuni', '0765779699', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

-- === BADULLA DISTRICT ===
('Adithya Vihari', 21, 'female', 'Grandmother searching for her', 'Hasalaka', '2025-11-27', 'Badulla', 'Mali Priyangani Fernando', '0774422257', 'Source: disaster.sufoeusj.org | Alt contact: 0750113590', false, true),

('Ishani Kodithuwakku', 27, 'female', '5''8" tall, black hair, tan color, ~60 kg. Signal issues since last Friday', 'Badulla/Maduruketiya', '2025-11-28', 'Badulla', 'Tiran Bhashitha', '0719252820', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

-- === KALUTARA DISTRICT ===
('Kaushalya Sonali', 31, 'female', '5''4" height', 'Padiyapelella', '2025-11-26', 'Kalutara', 'Harsha Amal Bhathiya', '0776442294', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

-- === GAMPAHA DISTRICT ===
('H N Weerakon', NULL, 'female', 'No. 98, Kaluwana, was home when last contacted', 'Kaluwana, Abathanna', '2025-11-27', 'Gampaha', 'A close relative', '0763246602', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('B. Ishara Sumudu Kumari', 35, 'female', '5''7" height, Udukumburagama', 'Ududumbara, Udukumburagama', '2025-11-28', 'Gampaha', 'R.W.N. Rupasingha', '0775185540', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('Tharushi Ishara Abesingha Rathnayake', 21, 'female', 'Height: 5''3", short wolfcut hair, oval face, tan color. 212/A, Polgahaanga', 'Weligalla, 212/A Polgahaanga', '2025-11-26', 'Gampaha', 'Kihaduwage Thamadi', '0721716833', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

-- === PUTTALAM DISTRICT ===
('W R W D Kurera (Watsala), Ramani & Family', NULL, 'female', 'Reporters wife and two children (4 people total: 2 adults, 2 children). Digannawa, Bangadeniya area. Reporter abroad (Korea)', 'Halawata (Arachchikattuwa), Digannawa, Bangadeniya area', '2025-11-27', 'Puttalam', 'Eranga (Korea)', '+821026889022', 'Source: disaster.sufoeusj.org | Alt contact: Chethana 0750844335 | 4 people missing', false, true),

('Wijesingha Arachchige Sudarshika Jayawanthi', 33, 'female', '5''3", ~65 kg, with husband and daughter. Welankale, Adippala, Arachchikattuwa', 'Welankale, Adippala, Arachchikattuwa', '2025-11-27', 'Puttalam', 'Warnakolasuriya Piyanka (New Zealand)', '+64224758176', 'Source: disaster.sufoeusj.org | Missing with husband and daughter', false, true),

('Adikari Arachchilage Ruwan Ratnasiri', 44, 'male', '5''9", ~60 kg, Wela Kale, Adippala', 'Wela Kale, Adippala', '2025-11-27', 'Puttalam', 'Warnakolasuriya Piyanka', '+64224758176', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('Adikari Arachchilage Hazael Catalina', 2, 'female', '~90 cm tall, likely with parents, Wela Kale, Adippala', 'Wela Kale, Adippala', '2025-11-27', 'Puttalam', 'Warnakolasuriya Piyanka', '+64224758176', 'Source: disaster.sufoeusj.org | 2-year-old child, likely with parents', false, true),

('බුද්ධිකා සහ සෙහොත් (Buddhika and child)', NULL, 'female', 'Wife of Air Force officer from Trincomalee, with 3-year-old child', 'Halawata (Arachchikattuwa)', '2025-11-27', 'Puttalam', 'Air Force Contact', '0763451506', 'Source: disaster.sufoeusj.org | Alt: 073629650 | Mother and 3-year-old child', false, true),

('K Hamisha Shamalki', 21, 'female', 'With husband and baby, went to wedding at Kokkaawila, Vilatthawa', 'Kokkaawila, Vilatthawa', '2025-11-27', 'Puttalam', 'K H Ravindra', '0756070463', 'Source: disaster.sufoeusj.org | Alt: 0753344966 | With husband and baby', false, true),

('සසිඳු සචින්ත (Sasindu Sachintha)', NULL, 'male', 'Student from Gampaha Wickramarachchi University (1st year), from Kalegama, Adippala, went to wedding', 'Kalegama, Adippala', '2025-11-27', 'Puttalam', 'Nethmina Jayasinghe', '0715150880', 'Source: disaster.sufoeusj.org | Gampaha Wickramarachchi University 1st year', false, true),

('දිල්කි නවෝදා (Dilki Nawoda)', NULL, 'female', 'Student from Gampaha Wickramarachchi University (1st year), from Kalegama, Adippala, went to wedding', 'Kalegama, Adippala', '2025-11-27', 'Puttalam', 'Nethmina Jayasinghe', '0715150880', 'Source: disaster.sufoeusj.org | Gampaha Wickramarachchi University 1st year', false, true),

('Sahanya Ranasinghe & Family', 20, 'female', 'Traveled from Malabe to Naththandiya last Thursday', 'Naththandiya', '2025-11-28', 'Puttalam', 'Imasha Nugawela', '0740746335', 'Source: disaster.sufoeusj.org | Missing with family', false, true),

('P L Reman Sanjeewa (Maalu Reman)', NULL, 'male', 'Known as Maalu Reman, with mother, father, sister, wife, and newborn. Kokwaththapara, Suruwama Handiya', 'Kokwaththapara, Suruwama Handiya', '2025-11-27', 'Puttalam', 'Sahan Anjana', '+94756787010', 'Source: disaster.sufoeusj.org | Missing with 6 family members including newborn', false, true),

-- === COLOMBO AREA ===
('නෙත්මි පියුමිකා ජයමහ (Nethmi Piyumika Jayamaha)', NULL, 'female', 'University of Peradeniya Agriculture Faculty Year 21 student, from No. 336, Parana Hittipola, Wilgamuwa', 'Weligama / Wilgamuwa', '2025-11-27', 'Colombo', 'Kavinda (WhatsApp only)', '0763610844', 'Source: disaster.sufoeusj.org | UoP Agriculture Faculty Year 21', false, true),

('Sachintha Bennett', NULL, 'male', 'Near Nuwara or Silvester area', 'Near Nuwara or Silvester area', '2025-11-27', 'Colombo', 'Family Contact', '0772706599', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('Tarini Kalansooriya', 23, 'female', NULL, 'Unknown', '2025-11-26', 'Colombo', 'Family Contact', '0741220715', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

('Imalka Jayawardana', 19, 'female', '158 cm, 60 kg, last seen with mother', 'Unknown', '2025-11-28', 'Colombo', 'Harshani Wijesooriya', '0769116529', 'Source: disaster.sufoeusj.org | Last seen with mother', false, true),

-- === POLONNARUWA DISTRICT ===
('Sakila Gimaya', 21, 'female', '5''7", brown skin', 'Polonnaruwa', '2025-11-30', 'Polonnaruwa', 'Jagath Jayasundara', '0710741901', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true),

-- === MONARAGALA / MAHIYANGANA AREA ===
('Suminda Roshan Daramadasa', 27, 'male', '5''4"-5''7", slim build, Wewatta. Final year student at Technical University. Brother is Grama Niladhari in area', 'Mahiyangana, Wewatta', '2025-11-27', 'Monaragala', 'Yashodara Vishwani', '0717331974', 'Source: disaster.sufoeusj.org | Technical University final year student', false, true),

('Isuru Anjana', 21, 'male', 'Caught in flood at Makevita area', 'Mahiyangana, Makevita area', '2025-11-27', 'Monaragala', 'Family Contact', '0750815086', 'Source: disaster.sufoeusj.org | Caught in flood', false, true),

-- === MATARA DISTRICT ===
('Don Madushi Ishara Wanigathunga', 26, 'female', '5''5" height, long hair', 'Ruhuna Campus area', '2025-11-27', 'Matara', 'Bhagya Basnayaka', '0761773297', 'Source: disaster.sufoeusj.org (USJ Engineering Faculty)', false, true);

-- Total: 47 missing persons records from disaster.sufoeusj.org
-- Data collected: December 1, 2025

