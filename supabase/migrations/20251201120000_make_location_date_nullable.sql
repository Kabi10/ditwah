-- Make last_seen_location and last_seen_date nullable
-- This allows reports to be submitted with partial information during crisis

ALTER TABLE missing_persons ALTER COLUMN last_seen_location DROP NOT NULL;
ALTER TABLE missing_persons ALTER COLUMN last_seen_date DROP NOT NULL;

