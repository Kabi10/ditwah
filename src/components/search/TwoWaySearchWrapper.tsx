'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { TwoWaySearchSelector } from './TwoWaySearchSelector'

interface TwoWaySearchWrapperProps {
  initialMode: 'looking' | 'info'
}

/**
 * Client-side wrapper for Two-Way Search to handle mode state
 */
export function TwoWaySearchWrapper({ initialMode }: TwoWaySearchWrapperProps) {
  const [mode, setMode] = useState<'looking' | 'info'>(initialMode)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleModeChange = (newMode: 'looking' | 'info') => {
    setMode(newMode)
    
    // Update URL with mode parameter while preserving other params
    const params = new URLSearchParams(searchParams.toString())
    params.set('mode', newMode)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <TwoWaySearchSelector
      currentMode={mode}
      onModeChange={handleModeChange}
    />
  )
}

