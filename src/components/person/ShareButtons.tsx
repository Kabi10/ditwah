'use client'

import { useTranslations } from 'next-intl'
import { Share2, MessageCircle, Facebook, Link as LinkIcon, Check } from 'lucide-react'
import { useState } from 'react'
import type { MissingPerson } from '@/lib/supabase/types'

interface ShareButtonsProps {
  person: MissingPerson
}

export function ShareButtons({ person }: ShareButtonsProps) {
  const t = useTranslations('person')
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/person/${person.id}`
    : ''

  // Format last seen date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const lastSeenDate = formatDate(person.last_seen_date)
  const lastSeenInfo = person.last_seen_location || person.district

  // Build comprehensive share text
  const shareLines = [
    '🔴 MISSING PERSON - Cyclone Ditwah 🌀',
    '',
    `👤 Name: ${person.full_name}`,
    person.age ? `📅 Age: ${person.age} years` : null,
    person.gender ? `⚥ Gender: ${person.gender}` : null,
    lastSeenInfo ? `📍 Last seen: ${lastSeenInfo}` : null,
    lastSeenDate ? `🗓️ Date: ${lastSeenDate}` : null,
    '',
    '🙏 Please share and help reunite this family!',
    '',
    `🔗 More info: ${shareUrl}`,
    person.photo_url ? `📷 Photo available at link above` : null,
  ].filter(Boolean).join('\n')

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareLines)}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareLines)}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Share2 className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">{t('share')}</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {/* WhatsApp - Most important for Sri Lanka */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm">{t('shareWhatsApp')}</span>
        </a>

        {/* Facebook */}
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Facebook className="w-4 h-4" />
          <span className="text-sm">{t('shareFacebook')}</span>
        </a>

        {/* Copy Link */}
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm">Copied!</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-4 h-4" />
              <span className="text-sm">{t('copyLink')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

