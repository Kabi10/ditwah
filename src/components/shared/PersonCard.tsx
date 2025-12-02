'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { MapPin, Calendar, User, Clock, Eye, Share2, MessageCircle } from 'lucide-react'
import { formatDistanceToNow, parseISO, isValid, differenceInHours, differenceInDays } from 'date-fns'
import type { MissingPerson } from '@/lib/supabase/types'

interface PersonCardProps {
  person: MissingPerson
  showActions?: boolean // Show action buttons (Report Sighting, Share)
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ditwah.com'

export function PersonCard({ person, showActions = true }: PersonCardProps) {
  const t = useTranslations('search')

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown'
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  // Format relative time for "Reported X ago"
  const getReportedAgo = (dateString: string | null) => {
    if (!dateString) return null
    try {
      const date = parseISO(dateString)
      if (!isValid(date)) return null
      return formatDistanceToNow(date, { addSuffix: true })
    } catch {
      return null
    }
  }

  // Get urgency level based on when reported
  const getUrgencyLevel = (dateString: string | null): 'critical' | 'urgent' | 'normal' => {
    if (!dateString) return 'normal'
    try {
      const date = parseISO(dateString)
      if (!isValid(date)) return 'normal'
      const hoursAgo = differenceInHours(new Date(), date)
      const daysAgo = differenceInDays(new Date(), date)
      if (hoursAgo <= 24) return 'critical' // First 24 hours
      if (daysAgo >= 3) return 'urgent' // 3+ days missing
      return 'normal'
    } catch {
      return 'normal'
    }
  }

  const reportedAgo = getReportedAgo(person.created_at)
  const urgencyLevel = getUrgencyLevel(person.created_at)
  const personUrl = `${siteUrl}/person/${person.id}`
  const shareText = `MISSING: ${person.full_name}${person.district ? ` from ${person.district}` : ''}. Help us find them! ${personUrl}`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(personUrl)}&quote=${encodeURIComponent(shareText)}`

  // Get border color based on urgency
  const getBorderColor = () => {
    if (person.status === 'found') return 'border-green-400'
    switch (urgencyLevel) {
      case 'critical': return 'border-red-400 border-2'
      case 'urgent': return 'border-amber-400 border-2'
      default: return 'border-gray-100'
    }
  }

  // Get urgency badge
  const getUrgencyBadge = () => {
    if (person.status === 'found') return null
    switch (urgencyLevel) {
      case 'critical':
        return (
          <span className="absolute top-3 left-3 px-2 py-0.5 bg-red-600 text-white rounded text-xs font-bold animate-pulse">
            CRITICAL
          </span>
        )
      case 'urgent':
        return (
          <span className="absolute top-3 left-3 px-2 py-0.5 bg-amber-500 text-white rounded text-xs font-bold">
            3+ DAYS
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border overflow-hidden ${getBorderColor()}`}>
      {/* Clickable Photo Area */}
      <Link href={`/person/${person.id}`} className="block">
        <div className="relative h-48 bg-gray-100">
          {person.photo_url ? (
            <Image
              src={person.photo_url}
              alt={person.full_name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <User className="w-16 h-16 text-gray-400" />
            </div>
          )}

          {/* Urgency Badge */}
          {getUrgencyBadge()}

          {/* Status Badge */}
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
            person.status === 'missing' ? 'status-missing' : 'status-found'
          }`}>
            {person.status === 'missing' ? t('missing') : t('found')}
          </div>

          {/* Reported time badge */}
          {reportedAgo && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 bg-black/60 text-white rounded text-xs">
              <Clock className="w-3 h-3" />
              <span>Reported {reportedAgo}</span>
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link href={`/person/${person.id}`}>
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1 hover:text-blue-600 transition">
            {person.full_name}
          </h3>
        </Link>

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
              <Link
                href={`/search?district=${encodeURIComponent(person.district)}`}
                className="line-clamp-1 hover:text-blue-600 hover:underline transition"
                onClick={(e) => e.stopPropagation()}
              >
                {person.district}
              </Link>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{t('lastSeen')}: {formatDate(person.last_seen_date)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        {showActions && person.status === 'missing' && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex gap-2">
              {/* Report Sighting Button */}
              <Link
                href={`/found?person=${person.id}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition"
                onClick={(e) => e.stopPropagation()}
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Report Sighting</span>
                <span className="sm:hidden">Sighting</span>
              </Link>

              {/* Share Buttons */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
                onClick={(e) => e.stopPropagation()}
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                onClick={(e) => e.stopPropagation()}
                title="Share on Facebook"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

