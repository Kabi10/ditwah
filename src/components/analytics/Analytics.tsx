'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Simple analytics tracking without external dependencies
// Tracks page views and key interactions

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void
    dataLayer?: unknown[]
  }
}

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track page views when route changes
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
    
    // If Google Analytics is configured
    if (typeof window.gtag === 'function') {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
        page_path: url,
      })
    }

    // Log for debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Page view:', url)
    }
  }, [pathname, searchParams])

  return null
}

// Track custom events
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Event:', { action, category, label, value })
  }
}

// Pre-defined tracking events for the platform
export const trackSearch = (query: string, resultsCount: number) => 
  trackEvent('search', 'engagement', query, resultsCount)

export const trackReportSubmit = (type: 'missing' | 'sighting') => 
  trackEvent('submit_report', 'conversion', type)

export const trackShare = (platform: 'whatsapp' | 'facebook' | 'copy', personId: string) => 
  trackEvent('share', 'engagement', `${platform}_${personId}`)

export const trackPersonView = (personId: string, personName: string) => 
  trackEvent('view_person', 'engagement', personName)

export const trackContactClick = (personId: string) => 
  trackEvent('contact_click', 'conversion', personId)

