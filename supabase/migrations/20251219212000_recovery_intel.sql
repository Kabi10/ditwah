-- Recovery Intelligence Submissions Table
CREATE TABLE recovery_intel (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_name TEXT NOT NULL,
  reporter_phone TEXT NOT NULL,
  intel_type TEXT NOT NULL, -- 'aid', 'shelter', 'hazard', 'other'
  district TEXT NOT NULL,
  location_details TEXT NOT NULL,
  description TEXT NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE recovery_intel ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit recovery intel" ON recovery_intel FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view recovery intel" ON recovery_intel FOR SELECT USING (true); -- Simplified for demo
