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
        <div className="flex items-center gap-4">
          <a 
            href="tel:117" 
            className="flex items-center gap-1 hover:underline"
          >
            <Phone className="w-3 h-3" />
            <span>Emergency: 117</span>
          </a>
          <a 
            href="tel:1990" 
            className="flex items-center gap-1 hover:underline"
          >
            <Phone className="w-3 h-3" />
            <span>DMC: 1990</span>
          </a>
        </div>
      </div>
    </div>
  )
}

