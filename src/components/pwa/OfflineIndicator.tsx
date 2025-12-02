'use client'

import { useState, useEffect } from 'react'
import { WifiOff, RefreshCw } from 'lucide-react'
import { useTranslations } from 'next-intl'

/**
 * Offline Indicator Component
 * Shows a banner when the user is offline, with last cached time
 * Critical for disaster relief - users need to know data may be stale
 */
export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [lastOnline, setLastOnline] = useState<Date | null>(null)
  const t = useTranslations('pwa')

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine)
    
    // Store last online time in localStorage
    if (navigator.onLine) {
      localStorage.setItem('lastOnline', new Date().toISOString())
    } else {
      const stored = localStorage.getItem('lastOnline')
      if (stored) {
        setLastOnline(new Date(stored))
      }
    }

    const handleOnline = () => {
      setIsOnline(true)
      localStorage.setItem('lastOnline', new Date().toISOString())
    }

    const handleOffline = () => {
      setIsOnline(false)
      const stored = localStorage.getItem('lastOnline')
      if (stored) {
        setLastOnline(new Date(stored))
      }
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Don't render anything if online
  if (isOnline) return null

  const formatLastOnline = () => {
    if (!lastOnline) return t('unknownTime')
    
    const now = new Date()
    const diffMs = now.getTime() - lastOnline.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    
    if (diffMins < 1) return t('justNow')
    if (diffMins < 60) return t('minutesAgo', { count: diffMins })
    if (diffHours < 24) return t('hoursAgo', { count: diffHours })
    return t('daysAgo', { count: Math.floor(diffHours / 24) })
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-amber-500 text-amber-950 px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <WifiOff className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm">{t('offlineTitle')}</p>
            <p className="text-xs text-amber-800">
              {t('lastUpdated')}: {formatLastOnline()}
            </p>
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium transition"
        >
          <RefreshCw className="w-4 h-4" />
          {t('retry')}
        </button>
      </div>
    </div>
  )
}

