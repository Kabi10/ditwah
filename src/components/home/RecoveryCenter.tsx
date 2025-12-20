import Link from 'next/link'
import {
    FileText,
    MessageSquare,
    Map as MapIcon,
    Database,
    ArrowRight,
    ShieldCheck,
    HelpingHand,
    ExternalLink
} from 'lucide-react'
import { getExternalRecoveryResources } from '@/lib/data-sources/external-lists'

export default async function RecoveryCenter() {
    const externalResources = await getExternalRecoveryResources()

    const pillars = [
        {
            title: 'Recovery Information Hub',
            desc: 'Schedules, compensation guides, and housing assistance.',
            icon: <FileText className="w-6 h-6 text-blue-600" />,
            link: '/recovery',
            color: 'blue'
        },
        {
            title: 'Official Chat Directory',
            desc: 'Direct WhatsApp/Viber links to district officials.',
            icon: <MessageSquare className="w-6 h-6 text-indigo-600" />,
            link: '/chat',
            color: 'indigo'
        },
        {
            title: 'Interactive Recovery Map',
            desc: 'View shelters and aid points on a live map.',
            icon: <MapIcon className="w-6 h-6 text-green-600" />,
            link: '/recovery/map', // We can point to a full-page map later
            color: 'green'
        },
        {
            title: 'Embeddable Widgets',
            desc: 'Tools for news sites to host rescue data.',
            icon: <Database className="w-6 h-6 text-purple-600" />,
            link: '/embed/map',
            color: 'purple'
        }
    ]

    return (
        <section className="mt-12">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 leading-tight">Recovery Phase Command Center</h2>
                    <p className="text-slate-500 text-sm mt-1">Consolidated resources for rebuilding and reunification (Day 24+)</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {pillars.map((pillar) => (
                    <Link
                        key={pillar.title}
                        href={pillar.link}
                        className="group p-6 bg-white rounded-2xl border-2 border-slate-100 hover:border-slate-300 hover:shadow-lg transition flex flex-col h-full"
                    >
                        <div className={`p-3 rounded-xl bg-${pillar.color}-50 w-fit mb-4 group-hover:scale-110 transition`}>
                            {pillar.icon}
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">{pillar.title}</h3>
                        <p className="text-xs text-slate-500 mb-6 flex-grow">{pillar.desc}</p>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 group-hover:gap-3 transition-all">
                            Launch <ArrowRight className="w-3 h-3" />
                        </div>
                    </Link>
                ))}
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 text-white overflow-hidden relative">
                <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Database className="w-5 h-5 text-amber-500" />
                            Aggregated External Intelligence
                        </h3>
                        <div className="space-y-4">
                            {externalResources.map((res) => (
                                <a
                                    key={res.id}
                                    href={res.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition group"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">{res.source}</span>
                                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                                    </div>
                                    <h4 className="font-bold text-sm mb-1">{res.title}</h4>
                                    <p className="text-xs text-slate-400 line-clamp-1">{res.description}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="hidden lg:block lg:pl-12 border-l border-white/10">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-400">
                            <ShieldCheck className="w-5 h-5" />
                            Official Verification
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            We are now syncing data every 6 hours with the Disaster Management Centre (DMC) and the ICRC Family Links database.
                            <br /><br />
                            If you have verified information regarding a government aid distribution that is not listed, please use our coordinate system to report it for the benefit of the community.
                        </p>
                        <button className="mt-6 flex items-center gap-2 text-white font-bold text-sm bg-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-700 transition">
                            <HelpingHand className="w-4 h-4" />
                            Provide Recovery Intel
                        </button>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            </div>
        </section>
    )
}
