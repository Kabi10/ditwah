'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Flag, X, CheckCircle, AlertCircle } from 'lucide-react'
import { reportAbuse } from '@/lib/actions/sightings'

interface AbuseReportButtonProps {
  personId: string
}

export function AbuseReportButton({ personId }: AbuseReportButtonProps) {
  const t = useTranslations('abuse')
  const tPerson = useTranslations('person')
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    formData.set('missing_person_id', personId)

    try {
      const response = await reportAbuse(formData)
      setResult(response)
      if (response.success) {
        setTimeout(() => {
          setIsOpen(false)
          setResult(null)
        }, 2000)
      }
    } catch {
      setResult({ success: false, message: 'An error occurred.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
      >
        <Flag className="w-4 h-4" />
        {tPerson('reportAbuse')}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{t('title')}</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {result && (
              <div className={`p-3 rounded-lg flex items-start gap-2 mb-4 ${
                result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
                {result.success ? <CheckCircle className="w-4 h-4 mt-0.5" /> : <AlertCircle className="w-4 h-4 mt-0.5" />}
                <p className="text-sm">{result.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('reason')} *
                </label>
                <select
                  name="reason"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">{t('reason')}</option>
                  <option value="fake">{t('fake')}</option>
                  <option value="duplicate">{t('duplicate')}</option>
                  <option value="inappropriate">{t('inappropriate')}</option>
                  <option value="other">{t('other')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('description')}
                </label>
                <textarea
                  name="description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Contact (optional)
                </label>
                <input
                  type="text"
                  name="reporter_contact"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 transition"
              >
                {isSubmitting ? 'Submitting...' : t('submit')}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

