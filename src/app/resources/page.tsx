import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { Droplets, Utensils, HeartPulse, Waves, Zap, Trash2, MapPin, Phone, Building2, Search } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
    title: 'Relief Resources & Aid | Cyclone Ditwah Relief',
    description: 'Find food, water, medical aid, and other relief resources for Cyclone Ditwah victims in Sri Lanka.',
}

const resourceTypes = [
    { id: 'food', label: 'Food Aid', icon: Utensils, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'water', label: 'Clean Water', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'medical', label: 'Medical Aid', icon: HeartPulse, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'shelter', label: 'Temporary Shelter', icon: Waves, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'fuel', label: 'Fuel/Gas', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'sanitation', label: 'Sanitation', icon: Trash2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
]

export default async function ResourcesPage({ searchParams }: { searchParams: Promise<{ type?: string, district?: string }> }) {
    const t = await getTranslations('home')
    const params = await searchParams
    const supabase = await createClient()

    let query = supabase.from('relief_resources').select('*')

    if (params.type && params.type !== 'all') {
        query = query.eq('type', params.type)
    }

    if (params.district && params.district !== 'all') {
        query = query.eq('district', params.district)
    }

    const { data: resources } = await query

    return (
        <div className="min-h-screen bg-white">
            {/* Search Header */}
            <section className="bg-slate-900 py-12 px-4 text-white">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
                        <Building2 className="w-8 h-8 text-blue-400" />
                        Relief Resources & Aid Locator
                    </h1>
                    <p className="text-slate-400 max-w-2xl text-lg">
                        Find distribution points for food, clean water, medical supplies, and other essential aid across affected districts.
                    </p>

                    <div className="mt-8 flex flex-col md:flex-row gap-4">
                        <div className="flex-1 bg-white rounded-lg p-1 flex items-center shadow-lg">
                            <Search className="w-5 h-5 text-gray-400 ml-3" />
                            <input
                                type="text"
                                placeholder="Search by location or organization..."
                                className="w-full p-2 text-gray-900 border-none focus:ring-0 placeholder:text-gray-400"
                            />
                        </div>
                        {/* Simple Filter Trigger (Would be real select in prod) */}
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                            {resourceTypes.map(type => (
                                <button key={type.id} className="whitespace-nowrap px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-700 transition">
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Resource Grid */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-gray-900">Available Distribution Points</h2>
                    <div className="text-sm text-gray-500">Showing {resources?.length || 0} locations</div>
                </div>

                {resources && resources.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resources.map((item: any) => {
                            const typeConfig = resourceTypes.find(t => t.id === item.type) || resourceTypes[0]
                            return (
                                <div key={item.id} className="group border rounded-xl p-5 hover:border-blue-400 hover:shadow-lg transition">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 rounded-lg ${typeConfig.bg} ${typeConfig.color}`}>
                                            <typeConfig.icon className="w-6 h-6" />
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${item.availability === 'available' ? 'bg-green-100 text-green-700' :
                                            item.availability === 'limited' ? 'bg-amber-100 text-amber-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                            {item.availability}
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                                    <div className="text-sm text-blue-600 font-medium mb-3 flex items-center gap-1">
                                        <Building2 className="w-3 h-3" />
                                        {item.organization}
                                    </div>

                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-start gap-2 text-sm text-gray-600">
                                            <MapPin className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" />
                                            <span>{item.address}, {item.district}</span>
                                        </div>
                                        {item.distribution_times && (
                                            <div className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded inline-block">
                                                Times: {item.distribution_times}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <a
                                            href={item.google_maps_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 py-2 bg-slate-900 text-white text-center rounded-lg text-sm font-medium hover:bg-slate-800 transition"
                                        >
                                            Directions
                                        </a>
                                        {item.contact_phone && (
                                            <a
                                                href={`tel:${item.contact_phone}`}
                                                className="p-2 border rounded-lg text-gray-600 hover:bg-gray-50 transition"
                                            >
                                                <Phone className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-gray-50 rounded-2xl border-2 border-dashed">
                        <div className="p-4 bg-white rounded-full inline-block mb-4 shadow-sm">
                            <Building2 className="w-12 h-12 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No resources found</h3>
                        <p className="text-gray-500 max-w-sm mx-auto">
                            We haven&apos;t mapped any verified relief distribution points in this category yet.
                        </p>
                    </div>
                )}

                {/* Community Submission Box */}
                <div className="mt-16 bg-blue-50 rounded-2xl p-8 border border-blue-100 flex flex-col md:flex-row items-center gap-8">
                    <div className="bg-white p-4 rounded-xl shadow-sm md:shrink-0">
                        <HeartPulse className="w-12 h-12 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Operating a distribution center?</h3>
                        <p className="text-slate-600">
                            Help us help others by registering your relief center. We verify and list all legitimate aid points to ensure victims can find support quickly.
                        </p>
                    </div>
                    <button className="whitespace-nowrap px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20">
                        Register Resource
                    </button>
                </div>
            </section>
        </div>
    )
}
