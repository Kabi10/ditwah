'use client'

import { useEffect, useState } from 'react'
import { Cloud, AlertCircle, Newspaper, ArrowRight, ExternalLink, Thermometer, Wind, CloudRain, Activity } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export function LiveUpdates() {
    const [updates, setUpdates] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchUpdates() {
            const supabase = createClient()
            const today = new Date().toISOString().split('T')[0]

            const { data, error } = await supabase
                .from('daily_updates')
                .select('*')
                .eq('date', today)
                .single()

            if (data) {
                setUpdates(data)
            } else {
                // Try fallback to most recent update if today's is not yet available
                const { data: recentData } = await supabase
                    .from('daily_updates')
                    .select('*')
                    .order('date', { ascending: false })
                    .limit(1)
                    .single()

                if (recentData) setUpdates(recentData)
            }
            setLoading(false)
        }

        fetchUpdates()
    }, [])

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                    <div className="h-20 bg-gray-100 rounded"></div>
                    <div className="h-20 bg-gray-100 rounded"></div>
                </div>
            </div>
        )
    }

    if (!updates) {
        return (
            <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                <div className="inline-flex p-3 bg-blue-50 rounded-full mb-4">
                    <Activity className="w-6 h-6 text-blue-600 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Live Dashboard Initializing</h3>
                <p className="text-slate-600 text-sm max-w-sm mx-auto">
                    We're currently fetching the latest weather, alerts, and news for Sri Lanka. Please check back in a few minutes.
                </p>
                <Link href="/emergency-contacts" className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm mt-4 hover:underline">
                    View Emergency Contacts <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        )
    }

    const weather = updates.weather_data
    const alerts = updates.alerts || []
    const news = updates.news_items || []

    return (
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    Live Situation Updates
                </h2>
                <span className="text-xs text-gray-500">
                    Last updated: {new Date(updates.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
                {/* Weather Summary */}
                <div className="p-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Cloud className="w-4 h-4" />
                        Weather Condition
                    </h3>
                    {weather?.current && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 font-bold text-xl">
                                    {Math.round(weather.current.temperature_2m)}°C
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-900">Sri Lanka (Colombo)</div>
                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                        <CloudRain className="w-3 h-3" />
                                        {weather.current.precipitation}mm precipitation
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <Wind className="w-3 h-3" strokeWidth={3} />
                                    {weather.current.wind_speed_10m} km/h wind
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <Thermometer className="w-3 h-3" strokeWidth={3} />
                                    Real Feel higher
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Official Alerts */}
                <div className="p-4 bg-orange-50/30">
                    <h3 className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" />
                        Emergency Alerts
                    </h3>
                    <div className="space-y-3">
                        {alerts.length > 0 ? (
                            alerts.slice(0, 2).map((alert: any, i: number) => (
                                <div key={i} className="bg-white p-3 rounded border border-orange-100 shadow-sm transition hover:shadow-md cursor-pointer">
                                    <div className="text-xs font-bold text-orange-700 mb-1">{alert.source}</div>
                                    <div className="text-sm font-medium text-gray-900 line-clamp-2">{alert.title}</div>
                                    <a href={alert.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 mt-2 flex items-center gap-1">
                                        Read more <ExternalLink className="w-2 h-2" />
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-gray-500 italic">No critical alerts for the last 24 hours.</p>
                        )}
                        <Link href="/emergency-contacts" className="text-xs font-bold text-orange-700 flex items-center gap-1 mt-2 hover:underline">
                            View Emergency Contacts <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>

                {/* Latest News */}
                <div className="p-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Newspaper className="w-4 h-4" />
                        Relief News Feed
                    </h3>
                    <div className="space-y-3">
                        {news.slice(0, 3).map((item: any, i: number) => (
                            <div key={i} className="group">
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                                    <div className="text-[10px] text-gray-500 mb-0.5">{item.source} • {new Date(item.pubDate).toLocaleDateString()}</div>
                                    <div className="text-sm text-gray-800 group-hover:text-blue-600 transition line-clamp-2">
                                        {item.title}
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
