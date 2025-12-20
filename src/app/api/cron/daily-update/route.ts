import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { getWeatherForecast } from '@/lib/data-sources/weather'
import { getLatestReliefReports } from '@/lib/data-sources/relief-orgs'
import { fetchDisasterNews } from '@/lib/data-sources/news'

// Vercel Cron: runs daily or periodically
// https://vercel.com/docs/cron-jobs
export const maxDuration = 300 // 5 minutes

export async function GET(request: Request) {
    // 1. Verify cron secret (if set in environment)
    const authHeader = request.headers.get('authorization')
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 })
    }

    try {
        const supabase = createAdminClient()
        const today = new Date().toISOString().split('T')[0]

        // 2. Fetch data from multiple sources in parallel
        const [weather, reliefReports, news] = await Promise.all([
            getWeatherForecast(6.9271, 79.8612), // Colombo coordinates
            getLatestReliefReports(10),
            fetchDisasterNews('Sri Lanka Cyclone Ditwah')
        ])

        // 3. Store news items in the news_feed table
        // We do this individually to avoid duplicates if possible, or just insert latest
        if (news && news.length > 0) {
            const newsFeedItems = news.map(item => ({
                source: item.source,
                title: item.title,
                url: item.link,
                summary: item.description || '',
                published_at: new Date(item.pubDate).toISOString(),
                category: 'update'
            }))

            // Upsert by title to avoid simple duplicates (in a real app, use a unique URL)
            await supabase.from('news_feed').upsert(newsFeedItems, {
                onConflict: 'url' // Assuming we add a unique constraint to url
            })
        }

        // 4. Update the daily_updates table for the dashboard
        const { error: updateError } = await supabase.from('daily_updates').upsert({
            date: today,
            weather_data: weather,
            alerts: reliefReports.filter(r => r.title.toLowerCase().includes('alert') || r.title.toLowerCase().includes('warning')),
            news_items: news.slice(0, 5),
            statistics: {
                last_updated: new Date().toISOString()
            }
        }, { onConflict: 'date' })

        if (updateError) {
            console.error('Failed to update daily_updates:', updateError)
            return NextResponse.json({ success: false, error: updateError.message }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            date: today,
            stats: {
                newsCount: news.length,
                reliefReportsCount: reliefReports.length,
                weatherUpdated: !!weather
            }
        })
    } catch (error: any) {
        console.error('Cron job failed:', error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
