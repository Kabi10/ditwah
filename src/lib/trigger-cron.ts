
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import { getWeatherForecast } from './data-sources/weather'
import { getLatestReliefReports } from './data-sources/relief-orgs'
import { fetchDisasterNews } from './data-sources/news'

function getEnv() {
    const envPath = path.resolve(process.cwd(), '.env.local')
    const content = fs.readFileSync(envPath, 'utf8')
    const env: any = {}
    content.split('\n').forEach(line => {
        const [key, ...value] = line.split('=')
        if (key && value) {
            env[key.trim()] = value.join('=').trim()
        }
    })
    return env
}

async function triggerUpdate() {
    console.log('🚀 Manually triggering daily update...')
    const env = getEnv()
    const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL']
    const supabaseKey = env['SUPABASE_SERVICE_ROLE_KEY']

    if (!supabaseUrl || !supabaseKey) {
        console.error('Missing Supabase environment variables')
        process.exit(1)
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const today = new Date().toISOString().split('T')[0]

    try {
        console.log('📡 Fetching data from APIs...')
        const [weather, reliefReports, news] = await Promise.all([
            getWeatherForecast(6.9271, 79.8612),
            getLatestReliefReports(10),
            fetchDisasterNews('Sri Lanka Cyclone Ditwah')
        ])

        console.log(`✅ Fetched: Weather(${!!weather}), Relief(${reliefReports.length}), News(${news.length})`)

        if (news && news.length > 0) {
            console.log('💾 Storing news feed...')
            const newsFeedItems = news.map(item => ({
                source: item.source,
                title: item.title,
                url: item.link,
                summary: item.description || '',
                published_at: new Date(item.pubDate).toISOString(),
                category: 'update'
            }))

            await supabase.from('news_feed').upsert(newsFeedItems, { onConflict: 'url' })
        }

        console.log('💾 Updating daily_updates dashboard...')
        const { error: updateError } = await supabase.from('daily_updates').upsert({
            date: today,
            weather_data: weather,
            alerts: reliefReports.filter(r => r.title.toLowerCase().includes('alert') || r.title.toLowerCase().includes('warning')),
            news_items: news.slice(0, 5),
            statistics: { last_updated: new Date().toISOString() }
        }, { onConflict: 'date' })

        if (updateError) throw updateError

        console.log('✨ Success! Database populated.')
    } catch (error) {
        console.error('❌ Update failed:', error)
    }
}

triggerUpdate()
