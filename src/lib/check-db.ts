
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

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

async function checkData() {
    const env = getEnv()
    const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL']
    const supabaseKey = env['SUPABASE_SERVICE_ROLE_KEY']

    if (!supabaseUrl || !supabaseKey) {
        console.error('Missing Supabase environment variables in .env.local')
        process.exit(1)
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('📊 Checking daily_updates table...')
    const { data, error, count } = await supabase
        .from('daily_updates')
        .select('*', { count: 'exact' })
        .order('date', { ascending: false })
        .limit(5)

    if (error) {
        console.error('❌ Error fetching daily_updates:', error)
    } else {
        console.log(`✅ daily_updates has ${count} records.`)
        data?.forEach(row => {
            console.log(`- ${row.date}: News(${row.news_items?.length || 0}), Alerts(${row.alerts?.length || 0})`)
        })
    }

    console.log('\n📊 Checking news_feed table...')
    const { count: newsCount } = await supabase
        .from('news_feed')
        .select('*', { count: 'exact', head: true })
    console.log(`✅ news_feed has ${newsCount} articles.`)
}

checkData()
