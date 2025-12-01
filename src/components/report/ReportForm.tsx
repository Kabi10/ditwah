'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Upload, User, MapPin, Phone, CheckCircle, AlertCircle } from 'lucide-react'
import { DISTRICTS } from '@/lib/supabase/types'
import { reportMissingPerson } from '@/lib/actions/missing-persons'

export function ReportForm() {
  const t = useTranslations('report')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResult(null)

    const formData = new FormData(e.currentTarget)
    
    try {
      const response = await reportMissingPerson(formData)
      setResult(response)
      if (response.success) {
        (e.target as HTMLFormElement).reset()
        setPhotoPreview(null)
      }
    } catch {
      setResult({ success: false, message: t('error') })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Result Message */}
      {result && (
        <div className={`p-4 rounded-lg flex items-start gap-3 ${
          result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {result.success ? (
            <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          )}
          <p>{result.message}</p>
        </div>
      )}

      {/* Person Details Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-semibold text-gray-900">{t('personDetails')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('fullName')} *
            </label>
            <input
              type="text"
              name="full_name"
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('age')}
            </label>
            <input
              type="number"
              name="age"
              min="0"
              max="120"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('gender')}
            </label>
            <select
              name="gender"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">{t('selectDistrict')}</option>
              <option value="male">{t('male')}</option>
              <option value="female">{t('female')}</option>
              <option value="other">{t('other')}</option>
            </select>
          </div>

          {/* Photo Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('photo')}
            </label>
            <div className="flex items-start gap-4">
              <label className="flex-1 cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">{t('uploadPhoto')}</p>
                </div>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
              {photoPreview && (
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('physicalDescription')}
            </label>
            <textarea
              name="physical_description"
              rows={3}
              placeholder={t('physicalDescriptionHint')}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-semibold text-gray-900">{t('lastKnownLocation')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('location')}
            </label>
            <input
              type="text"
              name="last_seen_location"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('district')} *
            </label>
            <select
              name="district"
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">{t('selectDistrict')}</option>
              {DISTRICTS.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('lastSeenDate')}
            </label>
            <input
              type="date"
              name="last_seen_date"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Phone className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-semibold text-gray-900">{t('contactInfo')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('yourName')} *
            </label>
            <input
              type="text"
              name="reporter_name"
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('yourPhone')} *
            </label>
            <input
              type="tel"
              name="reporter_phone"
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('yourEmail')}
            </label>
            <input
              type="email"
              name="reporter_email"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('relationship')}
            </label>
            <input
              type="text"
              name="reporter_relationship"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
      </section>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isSubmitting ? t('submitting') : t('submit')}
      </button>
    </form>
  )
}

