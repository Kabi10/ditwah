'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { MapPin, Calendar, User } from 'lucide-react'
import type { MissingPerson } from '@/lib/supabase/types'

interface PersonCardProps {
  person: MissingPerson
}

export function PersonCard({ person }: PersonCardProps) {
  const t = useTranslations('search')
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown'
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <Link 
      href={`/person/${person.id}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden card-hover"
    >
      {/* Photo */}
      <div className="relative h-48 bg-gray-100">
        {person.photo_url ? (
          <Image
            src={person.photo_url}
            alt={person.full_name}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <User className="w-16 h-16 text-gray-400" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
          person.status === 'missing' ? 'status-missing' : 'status-found'
        }`}>
          {person.status === 'missing' ? t('missing') : t('found')}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
          {person.full_name}
        </h3>
        
        <div className="space-y-1.5 text-sm text-gray-600">
          {person.age && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              <span>{t('age_years')}: {person.age}</span>
            </div>
          )}
          
          {person.district && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="line-clamp-1">{person.district}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{t('lastSeen')}: {formatDate(person.last_seen_date)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

