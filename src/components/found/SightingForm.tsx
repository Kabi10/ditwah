'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { MapPin, Calendar, Phone, User, CheckCircle, AlertCircle } from 'lucide-react'
import { reportSighting } from '@/lib/actions/sightings'

interface Person {
  id: string
  full_name: string
  photo_url: string | null
  district: string
}

interface SightingFormProps {
  persons: Person[]
}

export function SightingForm({ persons }: SightingFormProps) {
  const t = useTranslations('found')
  const [selectedPerson, setSelectedPerson] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPersons = persons.filter(p => 
    p.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.district.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedPerson) return

    setIsSubmitting(true)
    setResult(null)

    const formData = new FormData(e.currentTarget)
    formData.set('missing_person_id', selectedPerson)

    try {
      const response = await reportSighting(formData)
      setResult(response)
      if (response.success) {
        (e.target as HTMLFormElement).reset()
        setSelectedPerson('')
      }
    } catch {
      setResult({ success: false, message: 'An error occurred. Please try again.' })
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

      {/* Person Selection */}
      <section>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or district..."
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
          {filteredPersons.map((person) => (
            <button
              key={person.id}
              type="button"
              onClick={() => setSelectedPerson(person.id)}
              className={`p-3 rounded-lg border text-left transition ${
                selectedPerson === person.id
                  ? 'border-green-500 bg-green-50 ring-2 ring-green-500'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 overflow-hidden">
                {person.photo_url ? (
                  <Image
                    src={person.photo_url}
                    alt={person.full_name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </div>
              <p className="text-sm font-medium text-center line-clamp-1">{person.full_name}</p>
              <p className="text-xs text-gray-500 text-center">{person.district}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Sighting Details */}
      {selectedPerson && (
        <>
          <section>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">{t('sightingDetails')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('whereFound')} *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('whenSeen')} *
                </label>
                <input
                  type="datetime-local"
                  name="sighting_date"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('description')}
                </label>
                <textarea
                  name="description"
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </section>

          {/* Contact Info */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Phone className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">{t('yourInfo')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="reporter_name"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Phone *
                </label>
                <input
                  type="tel"
                  name="reporter_phone"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isSubmitting ? 'Submitting...' : t('submit')}
          </button>
        </>
      )}
    </form>
  )
}

