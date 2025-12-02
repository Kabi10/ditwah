'use client'

import { formatDistanceToNow, parseISO, isValid } from 'date-fns'
import { useTranslations } from 'next-intl'
import { Clock } from 'lucide-react'

interface RelativeTimestampProps {
  date: string | Date | null | undefined
  prefix?: string
  showIcon?: boolean
  className?: string
  fallback?: string
}

/**
 * RelativeTimestamp - Displays relative time like "2 hours ago"
 * Based on research: "Users need to know if information is current or potentially outdated"
 */
export function RelativeTimestamp({ 
  date, 
  prefix,
  showIcon = false,
  className = "text-sm text-slate-500",
  fallback = "Unknown"
}: RelativeTimestampProps) {
  const t = useTranslations('common')
  
  if (!date) {
    return <span className={className}>{fallback}</span>
  }
  
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date
    
    if (!isValid(parsedDate)) {
      return <span className={className}>{fallback}</span>
    }
    
    const relativeTime = formatDistanceToNow(parsedDate, { addSuffix: true })
    
    return (
      <span className={`flex items-center gap-1 ${className}`}>
        {showIcon && <Clock className="w-3 h-3" />}
        {prefix && <span>{prefix}</span>}
        <span>{relativeTime}</span>
      </span>
    )
  } catch {
    return <span className={className}>{fallback}</span>
  }
}

/**
 * DataFreshnessBadge - Shows how fresh the data is with color coding
 * Green: < 1 hour, Yellow: 1-24 hours, Red: > 24 hours
 */
export function DataFreshnessBadge({ 
  date,
  label = "Updated"
}: { 
  date: string | Date | null | undefined
  label?: string
}) {
  if (!date) {
    return null
  }
  
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date
    
    if (!isValid(parsedDate)) {
      return null
    }
    
    const now = new Date()
    const diffInHours = (now.getTime() - parsedDate.getTime()) / (1000 * 60 * 60)
    
    let colorClass = 'bg-green-100 text-green-700 border-green-200'
    if (diffInHours > 24) {
      colorClass = 'bg-red-100 text-red-700 border-red-200'
    } else if (diffInHours > 1) {
      colorClass = 'bg-yellow-100 text-yellow-700 border-yellow-200'
    }
    
    const relativeTime = formatDistanceToNow(parsedDate, { addSuffix: true })
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
        <Clock className="w-3 h-3" />
        {label} {relativeTime}
      </span>
    )
  } catch {
    return null
  }
}

