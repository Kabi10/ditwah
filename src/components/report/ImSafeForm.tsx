'use client'

import { useState } from 'react'
import { CheckCircle, AlertCircle, User } from 'lucide-react'
import { DISTRICTS } from '@/lib/supabase/types'
import { reportFoundPerson } from '@/lib/actions/missing-persons'

export function ImSafeForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setResult(null)

        const formData = new FormData(e.currentTarget)
        try {
            const response = await reportFoundPerson(formData)
            setResult(response)
            if (response.success) {
                (e.target as HTMLFormElement).reset()
            }
        } catch {
            setResult({ success: false, message: 'An unexpected error occurred.' })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-green-600 px-6 py-4 text-white">
                <h2 className="font-bold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Safety Registration Form
                </h2>
            </div>

            {result && (
                <div className={`m-6 p-4 rounded-lg flex items-start gap-3 ${result.success ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-red-50 text-red-800 border border-red-100'
                    }`}>
                    {result.success ? (
                        <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    ) : (
                        <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    )}
                    <p className="font-medium">{result.message}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                <section>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Person Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                            <input type="text" name="full_name" required className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Enter full name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">NIC / ID Number (Optional)</label>
                            <input type="text" name="nic_number" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500" placeholder="e.g. 19XXXXXXXXXX" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                            <select name="district" required className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500">
                                <option value="">Select District</option>
                                {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Current Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Location / Shelter</label>
                            <input type="text" name="found_location" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500" placeholder="e.g. Ananda College Relief Camp" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Note or Message for Family</label>
                            <textarea name="notes" rows={3} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500" placeholder="I am safe and currently at..."></textarea>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Who is reporting this?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase">Reporter Name *</label>
                            <input type="text" name="reporter_name" required className="w-full px-3 py-2 border rounded bg-white" placeholder="Your name" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase">Reporter Phone *</label>
                            <input type="tel" name="reporter_phone" required className="w-full px-3 py-2 border rounded bg-white" placeholder="+94 7X XXX XXXX" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" name="is_self" className="w-4 h-4 text-green-600 rounded" />
                                <span className="text-sm text-gray-700">I am reporting for myself</span>
                            </label>
                        </div>
                    </div>
                </section>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg shadow-green-200 disabled:opacity-50"
                >
                    {isSubmitting ? 'Registering...' : 'Register Safety Report'}
                </button>
            </form>
        </div>
    )
}
