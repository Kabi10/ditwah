import { Metadata } from 'next'
import { ShieldCheck } from 'lucide-react'
import { ImSafeForm } from '@/components/report/ImSafeForm'

export const metadata: Metadata = {
    title: 'I am Safe / Register Found | Cyclone Ditwah Relief',
    description: 'Register yourself as safe or report someone you have found to help families reunite.',
}

export default async function ImSafePage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex p-3 bg-green-100 rounded-full mb-4">
                        <ShieldCheck className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Register as Safe / Found</h1>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        If you are safe, or if you have found someone who was missing, please register here. This information will be used to notify families and match with missing person reports.
                    </p>
                </div>

                <ImSafeForm />
            </div>
        </div>
    )
}
