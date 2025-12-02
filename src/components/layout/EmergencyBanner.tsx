'use client'

import { useTranslations } from 'next-intl'
import { AlertTriangle, Phone } from 'lucide-react'

export function EmergencyBanner() {
  const t = useTranslations('site')

  return (
    <div className="bg-red-600 text-white py-2 px-4 pulse-slow">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-sm">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span className="font-medium">{t('tagline')}</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4 flex-wrap">
          <a
            href="tel:117"
            className="flex items-center gap-1 hover:underline"
          >
            <Phone className="w-3 h-3" />
            <span>117</span>
          </a>
          <span className="hidden md:inline text-red-300">|</span>
          <a
            href="tel:+94112136136"
            className="flex items-center gap-1 hover:underline"
          >
            <Phone className="w-3 h-3" />
            <span className="hidden sm:inline">DMC: </span>+94 112 136 136
          </a>
          <span className="hidden md:inline text-red-300">|</span>
          <a
            href="tel:+94112136222"
            className="flex items-center gap-1 hover:underline"
          >
            <Phone className="w-3 h-3" />
            <span className="hidden sm:inline">Emergency Ops: </span>+94 112 136 222
          </a>
        </div>
      </div>
    </div>
  )
}

