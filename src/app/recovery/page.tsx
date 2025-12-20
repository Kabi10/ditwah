import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import {
    FileText,
    Home,
    ShieldCheck,
    ClipboardCheck,
    ArrowRight,
    HelpingHand,
    Info,
    Calendar
} from 'lucide-react'

export const metadata = {
    title: 'Recovery Hub | Cyclone Ditwah Relief',
    description: 'Official guides and resources for housing assistance, compensation claims, and local aid distribution schedules.',
}

export default async function RecoveryPage() {
    const t = await getTranslations('recovery')

    const recoverySections = [
        {
            id: 'aid',
            title: 'Aid & Distribution',
            description: 'Find schedules for food, water, and essential supplies distribution in your district.',
            icon: <HelpingHand className="w-8 h-8 text-blue-600" />,
            link: '/recovery/aid',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200'
        },
        {
            id: 'compensation',
            title: 'Compensation Claims',
            description: 'Step-by-step guide on how to apply for government disaster relief and crop damage compensation.',
            icon: <ClipboardCheck className="w-8 h-8 text-orange-600" />,
            link: '/recovery/claims',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200'
        },
        {
            id: 'housing',
            title: 'Housing Assistance',
            description: 'Information on semi-permanent housing, repair grants, and NGO rebuilding projects.',
            icon: <Home className="w-8 h-8 text-green-600" />,
            link: '/recovery/housing',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200'
        },
        {
            id: 'insurance',
            title: 'Insurance Guides',
            description: 'How to file insurance claims for flood and storm damage to property and vehicles.',
            icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
            link: '/recovery/insurance',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200'
        }
    ]

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-slate-900 text-white py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Recovery Information Hub</h1>
                        <p className="text-lg text-slate-300">
                            Moving from immediate relief to long-term recovery. Access verified guides for rebuilding, claims, and community support in the aftermath of Cyclone Ditwah.
                        </p>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {recoverySections.map((section) => (
                        <Link
                            key={section.id}
                            href={section.link}
                            className={`block p-8 rounded-2xl border-2 ${section.bgColor} ${section.borderColor} hover:shadow-xl transition group`}
                        >
                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-white rounded-xl shadow-sm group-hover:scale-110 transition">
                                    {section.icon}
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-slate-900 mb-2">
                                        {section.title}
                                    </h2>
                                    <p className="text-slate-600 mb-4">{section.description}</p>
                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                                        View Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="bg-white rounded-2xl border p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-red-600" />
                        Active Recovery Deadlines
                    </h2>
                    <div className="grid sm:grid-cols-3 gap-6">
                        <div className="p-4 bg-slate-50 rounded-xl border border-dashed">
                            <div className="text-xs font-bold text-red-600 uppercase mb-1">Compensation</div>
                            <div className="font-bold text-slate-900">Crop Damage Filings</div>
                            <div className="text-sm text-slate-500">Deadline: Dec 31, 2025</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-dashed">
                            <div className="text-xs font-bold text-blue-600 uppercase mb-1">Housing</div>
                            <div className="font-bold text-slate-900">Repair Grant Appeals</div>
                            <div className="text-sm text-slate-500">Deadline: Jan 15, 2026</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-dashed text-slate-400">
                            <div className="text-xs font-bold uppercase mb-1 italic">More updates pending...</div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="max-w-7xl mx-auto px-4 py-8 border-t">
                <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200 text-sm text-amber-800">
                    <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>
                        <strong>Note:</strong> All information on this portal is aggregated from official government sources (DMC, District Secretariats) and verified NGOs. Always confirm with your local Grama Niladhari for person-specific eligibility.
                    </p>
                </div>
            </footer>
        </div>
    )
}
