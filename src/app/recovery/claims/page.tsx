import Link from 'next/link'
import { ClipboardCheck, ArrowLeft, FileText, CheckCircle2, AlertCircle, PhoneCall } from 'lucide-react'

export default function ClaimsPage() {
    const claimSteps = [
        {
            title: 'Gram Niladhari Certification',
            desc: 'Obtain a certification from your Grama Niladhari (GN) confirming the damage to your property or crops.',
            important: true
        },
        {
            title: 'Application Form Filling',
            desc: 'Complete Form DR-01 (Individual Relief) or CR-05 (Crop Damage). These are available at any Divisional Secretariat.',
            important: false
        },
        {
            title: 'Submission of Evidence',
            desc: 'Attach clear photos of the damage, copy of NIC, and bank account details for direct fund transfer.',
            important: false
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-orange-600 text-white py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <Link href="/recovery" className="inline-flex items-center gap-2 text-orange-100 hover:text-white mb-4 transition">
                        <ArrowLeft className="w-4 h-4" /> Back to Recovery Hub
                    </Link>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <ClipboardCheck className="w-8 h-8" />
                        Compensation Claims Guide
                    </h1>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">How to Claim Disaster Relief</h2>
                        <div className="space-y-8">
                            {claimSteps.map((step, i) => (
                                <div key={i} className="flex gap-6">
                                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-black text-xl">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 pb-8 border-b border-slate-100 last:border-0">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                                            {step.title}
                                            {step.important && (
                                                <span className="bg-red-100 text-red-600 text-[10px] uppercase px-2 py-0.5 rounded font-black tracking-widest">Crucial</span>
                                            )}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-8 bg-slate-50 rounded-2xl border-2 border-slate-100">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <FileText className="w-6 h-6 text-orange-600" />
                                Required Documents Checklist
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    'Copy of National Identity Card (NIC)',
                                    'Gram Niladhari (GN) Certificate',
                                    'Original photos of damaged property',
                                    'Police Report (for vehicle/major property)',
                                    'Bank Passbook Photo (Account Holder Page)',
                                    'Deed/Proof of Ownership'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 text-slate-700">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                            <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                DMC Hotline Support
                            </h3>
                            <p className="text-sm text-red-800 mb-4">
                                If you encounter issues with the application process or a Grama Niladhari is unavailable.
                            </p>
                            <a href="tel:117" className="flex items-center justify-center gap-3 w-full py-4 bg-red-600 text-white font-black text-2xl rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition">
                                <PhoneCall /> CALL 117
                            </a>
                        </div>

                        <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-xl">
                            <h3 className="font-bold mb-4">Quick Downloads</h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-lg transition text-sm">
                                    <span>General Relief Form (DR-01)</span>
                                    <FileText className="w-4 h-4" />
                                </button>
                                <button className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-lg transition text-sm">
                                    <span>Crop Compensation Form</span>
                                    <FileText className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
