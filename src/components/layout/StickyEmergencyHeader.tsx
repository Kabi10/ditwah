'use client'

import { Phone } from 'lucide-react'
import { useTranslations } from 'next-intl'

/**
 * StickyEmergencyHeader - Always visible emergency contact strip
 * Based on research from FEMA.gov and NHS 111 best practices
 * Provides one-tap calling on mobile devices
 */
export function StickyEmergencyHeader() {
  const t = useTranslations('emergency')

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-red-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-1.5">
        <div className="flex items-center justify-center gap-2 sm:gap-4 text-sm">
          <span className="font-bold text-xs sm:text-sm">{t('title')}:</span>
          
          {/* 117 Emergency - Primary */}
          <a
            href="tel:117"
            className="flex items-center gap-1.5 px-2 py-1 bg-white/20 hover:bg-white/30 rounded transition min-h-[36px] sm:min-h-[32px]"
            aria-label={t('call117')}
          >
            <Phone className="w-4 h-4" />
            <span className="font-bold">117</span>
          </a>

          <span className="text-red-300 hidden xs:inline">|</span>

          {/* DMC Hotline */}
          <a
            href="tel:+94112136136"
            className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition min-h-[32px]"
            aria-label={t('callDMC')}
          >
            <Phone className="w-3 h-3" />
            <span className="text-xs sm:text-sm">DMC: +94 112 136 136</span>
          </a>

          {/* Mobile: Compact DMC button */}
          <a
            href="tel:+94112136136"
            className="sm:hidden flex items-center gap-1 px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition min-h-[36px]"
            aria-label={t('callDMC')}
          >
            <Phone className="w-3 h-3" />
            <span className="text-xs">DMC</span>
          </a>
        </div>
      </div>
    </div>
  )
}

