import { Phone, Shield, MapPin, Ambulance, AlertTriangle, Building2, ExternalLink } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Emergency Contacts | Cyclone Ditwah Relief',
    description: 'National and district-wise emergency contact numbers for disaster relief in Sri Lanka.',
}

const nationalContacts = [
    { name: 'Disaster Management Centre (DMC)', number: '117', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', available: '24/7' },
    { name: 'Police Emergency', number: '119', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50', available: '24/7' },
    { name: 'Ambulance (Suwa Seriya)', number: '1990', icon: Ambulance, color: 'text-green-600', bg: 'bg-green-50', available: '24/7' },
    { name: 'Fire & Rescue', number: '110', icon: Building2, color: 'text-orange-600', bg: 'bg-orange-50', available: '24/7' },
    { name: 'Bomb Squad / Special Tasks', number: '111', icon: Shield, color: 'text-slate-600', bg: 'bg-slate-50', available: '24/7' },
    { name: 'Child Help Line', number: '1929', icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50', available: '24/7' },
]

const districtContacts = [
    { district: 'Colombo', secretarial: '+94 11 236 9139', dmc: '+94 11 213 6136' },
    { district: 'Gampaha', secretarial: '+94 33 222 2235', dmc: '+94 33 223 4216' },
    { district: 'Kalutara', secretarial: '+94 34 222 2235', dmc: '+94 34 223 6092' },
    { district: 'Galle', secretarial: '+94 91 223 4235', dmc: '+94 91 223 2033' },
    { district: 'Matara', secretarial: '+94 41 222 2235', dmc: '+94 41 223 2033' },
    { district: 'Hambantota', secretarial: '+94 47 222 0235', dmc: '+94 47 222 3345' },
    { district: 'Kandy', secretarial: '+94 81 223 4235', dmc: '+94 81 223 2033' },
    { district: 'Matale', secretarial: '+94 66 222 2235', dmc: '+94 66 223 4216' },
    { district: 'Nuwara Eliya', secretarial: '+94 52 222 2235', dmc: '+94 52 223 4216' },
]

export default function EmergencyContactsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Emergency Contacts</h1>
                    <p className="text-gray-600 mt-2">
                        Direct contact information for national and local emergency services in Sri Lanka.
                    </p>
                </div>

                {/* National Hotlines */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-red-600" />
                        National 24/7 Hotlines
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {nationalContacts.map((contact) => (
                            <a
                                key={contact.number}
                                href={`tel:${contact.number}`}
                                className={`flex items-center justify-between p-4 rounded-xl border-2 border-transparent transition hover:border-current hover:shadow-md ${contact.bg} ${contact.color}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white rounded-full shadow-sm">
                                        <contact.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg">{contact.number}</div>
                                        <div className="text-sm font-medium opacity-80">{contact.name}</div>
                                    </div>
                                </div>
                                <div className="text-xs font-bold uppercase tracking-wider px-2 py-1 bg-white/50 rounded">
                                    {contact.available}
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                {/* District Contacts */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        District Coordination Centers
                    </h2>
                    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-900">District</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-900">District Secretariat</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-900">DMC Center</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {districtContacts.map((contact) => (
                                    <tr key={contact.district} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-medium text-gray-900">{contact.district}</td>
                                        <td className="px-6 py-4">
                                            <a href={`tel:${contact.secretarial}`} className="text-blue-600 hover:underline flex items-center gap-1">
                                                <Phone className="w-3 h-3" />
                                                {contact.secretarial}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href={`tel:${contact.dmc}`} className="text-blue-600 hover:underline flex items-center gap-1">
                                                <Phone className="w-3 h-3" />
                                                {contact.dmc}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* External Directories */}
                <section>
                    <div className="bg-slate-800 rounded-xl p-6 text-white">
                        <h3 className="text-lg font-bold mb-4">Official External Directories</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a
                                href="https://dmc.gov.lk/index.php?option=com_content&view=article&id=32&Itemid=158&lang=en"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 bg-slate-700 rounded hover:bg-slate-600 transition"
                            >
                                <span>DMC Full Contact List</span>
                                <ExternalLink className="w-4 h-4 opacity-50" />
                            </a>
                            <a
                                href="https://www.police.lk/index.php/emergency-contacts"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 bg-slate-700 rounded hover:bg-slate-600 transition"
                            >
                                <span>Police Contact Directory</span>
                                <ExternalLink className="w-4 h-4 opacity-50" />
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
