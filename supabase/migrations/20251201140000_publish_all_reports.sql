-- Phase 1: Make all reports visible immediately
-- In crisis situations, we prioritize visibility over pre-moderation
-- Abuse reports can be used for post-moderation

-- Step 1: Change default for is_published to true (new reports auto-published)
ALTER TABLE missing_persons ALTER COLUMN is_published SET DEFAULT true;

-- Step 2: Publish all existing unpublished reports
UPDATE missing_persons SET is_published = true WHERE is_published = false;

-- Note: Admin dashboard (Phase 2) will allow moderators to unpublish reports if needed

