import Link from 'next/link'
import { HelpingHand, ArrowLeft, Search, Clock, MapPin, Phone } from 'lucide-react'

export default function AidPage() {
    const aidSchedules = [
        {
            district: 'Colombo',
            locations: [
                { name: 'Fort Railway Station Square', time: 'Daily 09:00 - 15:00', type: 'Dry Rations & Water', contact: '011-2444444' },
                { name: 'Modara Community Hall', time: 'Mon/Wed/Fri 10:00 - 12:00', type: 'Cooked Meals', contact: '011-2555555' }
            ]
        },
        {
            district: 'Galle',
            locations: [
                { name: 'Galle Town Hall', time: 'Daily 08:30 - 16:30', type: 'Complete Relief Kits', contact: '091-2222222' }
            ]
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-blue-600 text-white py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <Link href="/recovery" className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-4 transition">
                        <ArrowLeft className="w-4 h-4" /> Back to Recovery Hub
                    </Link>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <HelpingHand className="w-8 h-8" />
                        Aid & Distribution Schedules
                    </h1>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="max-w-3xl mb-12">
                    <p className="text-lg text-slate-600 mb-6">
                        Verified distribution points for food, water, and essential supplies. Schedules are subject to weather conditions and supply availability.
                    </p>

                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by district or village..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 transition outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-12">
                    {aidSchedules.map((schedule) => (
                        <div key={schedule.district}>
                            <h2 className="text-2xl font-black text-slate-900 mb-6 border-b-4 border-blue-600 inline-block px-1">
                                {schedule.district} District
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {schedule.locations.map((loc, i) => (
                                    <div key={i} className="p-6 rounded-2xl border bg-slate-50 hover:bg-white hover:shadow-lg transition group">
                                        <h3 className="text-lg font-bold text-slate-900 mb-4">{loc.name}</h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-center gap-3 text-slate-600">
                                                <Clock className="w-4 h-4 text-blue-600" />
                                                <span>{loc.time}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-600">
                                                <MapPin className="w-4 h-4 text-blue-600" />
                                                <span>{loc.type}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-600">
                                                <Phone className="w-4 h-4 text-blue-600" />
                                                <span>{loc.contact}</span>
                                            </div>
                                        </div>
                                        <button className="mt-6 w-full py-2 bg-blue-100 text-blue-700 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition">
                                            Get Location on Map
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <section className="mt-16 bg-slate-900 text-white p-8 rounded-3xl overflow-hidden relative">
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-2xl font-bold mb-4">Are you an organization?</h2>
                        <p className="text-slate-400 mb-6">
                            If your organization is distributing aid, please register your schedule to help us keep this directory accurate for the community.
                        </p>
                        <button className="px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-blue-50 transition">
                            Register Distribution Point
                        </button>
                    </div>
                    <HelpingHand className="absolute -right-12 -bottom-12 w-64 h-64 text-white/5 rotate-12" />
                </section>
            </main>
        </div>
    )
}
