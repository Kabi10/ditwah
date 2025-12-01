-- Cyclone Ditwah Missing Persons Registry
-- Database Schema for Supabase

-- Missing Persons Table
CREATE TABLE missing_persons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Person details
  full_name TEXT NOT NULL,
  age INTEGER,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  photo_url TEXT,
  physical_description TEXT,
  
  -- Last known location
  last_seen_location TEXT NOT NULL,
  last_seen_date DATE NOT NULL,
  district TEXT NOT NULL,
  landmark TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  
  -- Contact info for reporter
  reporter_name TEXT NOT NULL,
  reporter_phone TEXT NOT NULL,
  reporter_email TEXT,
  reporter_relationship TEXT,
  
  -- Status
  status TEXT DEFAULT 'missing' CHECK (status IN ('missing', 'found', 'deceased')),
  status_updated_at TIMESTAMPTZ,
  found_location TEXT,
  found_date DATE,
  
  -- Moderation
  is_verified BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  notes TEXT
);

-- Sightings Table
CREATE TABLE sightings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  missing_person_id UUID REFERENCES missing_persons(id) ON DELETE CASCADE,
  
  -- Sighting details
  location TEXT NOT NULL,
  district TEXT NOT NULL,
  sighting_date DATE NOT NULL,
  description TEXT,
  
  -- Reporter
  reporter_name TEXT NOT NULL,
  reporter_phone TEXT NOT NULL,
  
  -- Status
  is_verified BOOLEAN DEFAULT FALSE
);

-- Abuse Reports Table
CREATE TABLE abuse_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  missing_person_id UUID REFERENCES missing_persons(id) ON DELETE SET NULL,
  sighting_id UUID REFERENCES sightings(id) ON DELETE SET NULL,
  
  reason TEXT NOT NULL,
  description TEXT,
  reporter_email TEXT,
  
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved'))
);

-- Indexes for faster queries
CREATE INDEX idx_missing_persons_status ON missing_persons(status);
CREATE INDEX idx_missing_persons_district ON missing_persons(district);
CREATE INDEX idx_missing_persons_created_at ON missing_persons(created_at DESC);
CREATE INDEX idx_missing_persons_published ON missing_persons(is_published);
CREATE INDEX idx_sightings_person ON sightings(missing_person_id);

-- Row Level Security
ALTER TABLE missing_persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE sightings ENABLE ROW LEVEL SECURITY;
ALTER TABLE abuse_reports ENABLE ROW LEVEL SECURITY;

-- Policies: Anyone can read published missing persons
CREATE POLICY "Public can view published missing persons" ON missing_persons
  FOR SELECT USING (is_published = true);

-- Policies: Anyone can insert missing persons (moderated)
CREATE POLICY "Anyone can report missing persons" ON missing_persons
  FOR INSERT WITH CHECK (true);

-- Policies: Anyone can view sightings
CREATE POLICY "Public can view sightings" ON sightings
  FOR SELECT USING (true);

-- Policies: Anyone can report sightings
CREATE POLICY "Anyone can report sightings" ON sightings
  FOR INSERT WITH CHECK (true);

-- Policies: Anyone can submit abuse reports
CREATE POLICY "Anyone can submit abuse reports" ON abuse_reports
  FOR INSERT WITH CHECK (true);

-- Storage bucket for photos
-- Run this in Supabase Dashboard > Storage
-- CREATE BUCKET missing_persons_photos WITH (public = true);

