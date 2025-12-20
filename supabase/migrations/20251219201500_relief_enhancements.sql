-- Relief Enhancements Migration
-- Shelters Table
CREATE TABLE shelters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  district TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  capacity INTEGER,
  current_occupancy INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('open', 'full', 'limited', 'closed')),
  phone TEXT,
  facilities TEXT[],
  google_maps_url TEXT,
  source TEXT DEFAULT 'manual',
  source_id TEXT,
  last_verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_shelters_district ON shelters(district);
CREATE INDEX idx_shelters_status ON shelters(status);

-- Relief Resources Table
CREATE TABLE relief_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN (
    'food', 'water', 'medical', 'clothing', 'shelter', 'fuel', 'sanitation'
  )),
  name TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  district TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  availability TEXT CHECK (availability IN ('available', 'limited', 'depleted')),
  distribution_times TEXT,
  contact_phone TEXT,
  organization TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_resources_type ON relief_resources(type);
CREATE INDEX idx_resources_district ON relief_resources(district);

-- Volunteer Opportunities Table
CREATE TABLE volunteer_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  organization TEXT NOT NULL,
  district TEXT NOT NULL,
  location TEXT,
  skills_needed TEXT[],
  volunteers_needed INTEGER,
  volunteers_registered INTEGER DEFAULT 0,
  start_date DATE,
  end_date DATE,
  contact_name TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'filled', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE volunteer_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id UUID REFERENCES volunteer_opportunities(id),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  skills TEXT[],
  availability TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily Updates Table
CREATE TABLE daily_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  weather_data JSONB,
  alerts JSONB,
  news_items JSONB,
  statistics JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- News Feed Table
CREATE TABLE news_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  url TEXT UNIQUE,
  image_url TEXT,
  published_at TIMESTAMPTZ,
  category TEXT CHECK (category IN ('update', 'alert', 'story', 'resource')),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Missing Persons Enhancements
ALTER TABLE missing_persons ADD COLUMN nic_number TEXT;
ALTER TABLE missing_persons ADD COLUMN distinctive_marks TEXT;
ALTER TABLE missing_persons ADD COLUMN clothing_description TEXT;
ALTER TABLE missing_persons ADD COLUMN family_members TEXT[];
ALTER TABLE missing_persons ADD COLUMN home_address TEXT;
ALTER TABLE missing_persons ADD COLUMN reporter_notification_email TEXT;
ALTER TABLE missing_persons ADD COLUMN reporter_notification_phone TEXT;
ALTER TABLE missing_persons ADD COLUMN notification_enabled BOOLEAN DEFAULT true;

-- Potential Matches Table
CREATE TABLE potential_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  missing_person_id UUID REFERENCES missing_persons(id) ON DELETE CASCADE,
  matched_person_id UUID REFERENCES missing_persons(id) ON DELETE CASCADE,
  match_type TEXT CHECK (match_type IN ('name', 'location', 'description', 'nic', 'family')),
  match_score FLOAT,
  is_confirmed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS and Policies
ALTER TABLE shelters ENABLE ROW LEVEL SECURITY;
ALTER TABLE relief_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_feed ENABLE ROW LEVEL SECURITY;
ALTER TABLE potential_matches ENABLE ROW LEVEL SECURITY;

-- Public can view everything that is verified or status-appropriate
CREATE POLICY "Anyone can view shelters" ON shelters FOR SELECT USING (status != 'closed');
CREATE POLICY "Anyone can view resources" ON relief_resources FOR SELECT USING (verified = true);
CREATE POLICY "Anyone can view volunteer opportunities" ON volunteer_opportunities FOR SELECT USING (status = 'open');
CREATE POLICY "Anyone can view daily updates" ON daily_updates FOR SELECT USING (true);
CREATE POLICY "Anyone can view news feed" ON news_feed FOR SELECT USING (true);

-- Volunteer registration is public
CREATE POLICY "Anyone can register to volunteer" ON volunteer_registrations FOR INSERT WITH CHECK (true);

-- Notification: Potential matches are private to reporters or admins
-- For now, let's keep it restricted or allow viewing if you have the missing_person_id
CREATE POLICY "View potential matches via related person" ON potential_matches 
  FOR SELECT USING (true); -- Simplification for now, in prod this would be more secure

-- Similarity search extension for matching
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Fuzzy name search function
CREATE OR REPLACE FUNCTION fuzzy_name_search(search_name TEXT, threshold FLOAT DEFAULT 0.4)
RETURNS TABLE (id UUID, full_name TEXT, similarity FLOAT) AS $$
BEGIN
  RETURN QUERY
  SELECT mp.id, mp.full_name, similarity(mp.full_name, search_name) as sim
  FROM missing_persons mp
  WHERE similarity(mp.full_name, search_name) > threshold
  ORDER BY sim DESC;
END;
-- Automatic matching trigger
CREATE OR REPLACE FUNCTION trigger_find_matches()
RETURNS TRIGGER AS $$
BEGIN
  -- Find potential matches by name similarity
  INSERT INTO potential_matches (missing_person_id, matched_person_id, match_type, match_score)
  SELECT 
    NEW.id, 
    mp.id, 
    'name', 
    similarity(NEW.full_name, mp.full_name)
  FROM missing_persons mp
  WHERE mp.id != NEW.id
    AND mp.status != NEW.status -- One is missing, one is found/safe
    AND similarity(NEW.full_name, mp.full_name) > 0.4
    AND NOT EXISTS (
      SELECT 1 FROM potential_matches 
      WHERE (missing_person_id = NEW.id AND matched_person_id = mp.id)
         OR (missing_person_id = mp.id AND matched_person_id = NEW.id)
    );
  
  -- Also match by NIC if provided
  IF NEW.nic_number IS NOT NULL THEN
    INSERT INTO potential_matches (missing_person_id, matched_person_id, match_type, match_score)
    SELECT 
      NEW.id, 
      mp.id, 
      'nic', 
      1.0
    FROM missing_persons mp
    WHERE mp.id != NEW.id
      AND mp.nic_number = NEW.nic_number
      AND NOT EXISTS (
        SELECT 1 FROM potential_matches 
        WHERE (missing_person_id = NEW.id AND matched_person_id = mp.id)
           OR (missing_person_id = mp.id AND matched_person_id = NEW.id)
      );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_person_upsert
AFTER INSERT OR UPDATE OF full_name, nic_number, status ON missing_persons
FOR EACH ROW EXECUTE FUNCTION trigger_find_matches();
