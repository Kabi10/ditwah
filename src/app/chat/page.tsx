import { MessageSquare, Phone, MapPin, ExternalLink, Info } from 'lucide-react'

export default function ChatPage() {
    const districtOfficials = [
        {
            district: 'Colombo',
            contacts: [
                { name: 'Disaster Management Unit', phone: '+94112136136', whatsapp: '94112136136', role: 'General Recovery Inquiries' },
                { name: 'District Secretariat (Recovery)', phone: '+94112421221', whatsapp: '94112421221', role: 'Compensation & Grants' }
            ]
        },
        {
            district: 'Galle',
            contacts: [
                { name: 'Galle District DMC Hub', phone: '+94912222222', whatsapp: '94912222222', role: 'Shelter & Resource Allocation' }
            ]
        }
    ]

    const getWhatsAppLink = (phone: string, role: string) => {
        const text = encodeURIComponent(`Hello, I am contacting you regarding ${role} following Cyclone Ditwah. I need assistance with...`)
        return `https://wa.me/${phone}?text=${text}`
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-indigo-600 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-5xl font-black mb-4">Official Chat Directory</h1>
                    <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
                        Directly message district officials and recovery coordinators via WhatsApp or Viber. Skip the phone queue and get text-based answers.
                    </p>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex items-start gap-4 mb-12 shadow-sm">
                    <Info className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                    <div className="text-sm text-amber-900">
                        <p className="font-bold mb-1">How it works:</p>
                        <p>Clicking "Chat on WhatsApp" will open a pre-filled message on your phone. Please state your name and Grama Niladhari division clearly in your message to help officials respond faster.</p>
                    </div>
                </div>

                <div className="space-y-12">
                    {districtOfficials.map((district) => (
                        <div key={district.district}>
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-indigo-600" />
                                {district.district} District Officials
                            </h2>
                            <div className="grid gap-4">
                                {district.contacts.map((contact, i) => (
                                    <div key={i} className="bg-white p-6 rounded-2xl border hover:border-indigo-300 hover:shadow-md transition group">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div>
                                                <div className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-1">{contact.role}</div>
                                                <h3 className="text-lg font-bold text-slate-900">{contact.name}</h3>
                                                <div className="text-slate-500 text-sm mt-1 flex items-center gap-2">
                                                    <Phone className="w-4 h-4" /> {contact.phone}
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <a
                                                    href={getWhatsAppLink(contact.whatsapp, contact.role)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#128C7E] transition shadow-lg shadow-green-100"
                                                >
                                                    <MessageSquare className="w-5 h-5" />
                                                    Chat on WhatsApp
                                                </a>
                                                <a
                                                    href={`viber://chat?number=%2B${contact.whatsapp}`}
                                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#7360F2] text-white font-bold rounded-xl hover:bg-[#5E4ECC] transition shadow-lg shadow-purple-100"
                                                >
                                                    <ExternalLink className="w-5 h-5" />
                                                    Open in Viber
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-slate-500 text-sm italic">
                        Can't find your district? We are updating the directory daily as officials enable digital support lines.
                    </p>
                </div>
            </main>
        </div>
    )
}
