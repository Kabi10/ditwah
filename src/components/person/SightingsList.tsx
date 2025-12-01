'use client'

import { useTranslations } from 'next-intl'
import { Eye, MapPin, Calendar, User } from 'lucide-react'
import type { Sighting } from '@/lib/supabase/types'

interface SightingsListProps {
  sightings: Sighting[]
}

export function SightingsList({ sightings }: SightingsListProps) {
  const t = useTranslations('person')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Eye className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">{t('sightings')}</h2>
      </div>

      {sightings.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <Eye className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">{t('noSightings')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sightings.map((sighting) => (
            <div 
              key={sighting.id}
              className="bg-white rounded-xl border border-gray-100 p-5"
            >
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{sighting.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{formatDate(sighting.sighting_date)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>Reported by: {sighting.reporter_name}</span>
                </div>
              </div>
              
              {sighting.description && (
                <p className="text-gray-700">{sighting.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

