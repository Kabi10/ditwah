-- Daily Updates and News Feed Tables
-- For auto-updating Relief News Feed feature

-- Daily Updates table (stores aggregated daily data)
CREATE TABLE IF NOT EXISTS daily_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  weather_data JSONB,
  alerts JSONB DEFAULT '[]'::jsonb,
  news_items JSONB DEFAULT '[]'::jsonb,
  statistics JSONB DEFAULT '{}'::jsonb
);

-- News Feed table (stores individual news articles)
CREATE TABLE IF NOT EXISTS news_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  source TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  summary TEXT,
  published_at TIMESTAMPTZ,
  category TEXT DEFAULT 'update' CHECK (category IN ('update', 'alert', 'weather', 'relief'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_daily_updates_date ON daily_updates(date DESC);
CREATE INDEX IF NOT EXISTS idx_news_feed_published ON news_feed(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_feed_category ON news_feed(category);

-- RLS
ALTER TABLE daily_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_feed ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can view daily updates" ON daily_updates
  FOR SELECT USING (true);

CREATE POLICY "Public can view news feed" ON news_feed
  FOR SELECT USING (true);

-- Service role can insert/update (for cron job)
CREATE POLICY "Service role can manage daily updates" ON daily_updates
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage news feed" ON news_feed
  FOR ALL USING (auth.role() = 'service_role');
