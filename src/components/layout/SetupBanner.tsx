'use client'

import { AlertTriangle, ExternalLink } from 'lucide-react'

interface SetupBannerProps {
  isConfigured: boolean
}

export function SetupBanner({ isConfigured }: SetupBannerProps) {
  if (isConfigured) return null

  return (
    <div className="bg-amber-100 border-b border-amber-300 py-3 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 text-sm text-amber-800">
        <AlertTriangle className="w-4 h-4" />
        <span className="font-medium">Supabase not configured.</span>
        <span>The app is running in demo mode. To enable full functionality:</span>
        <a 
          href="https://supabase.com/dashboard" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 underline hover:text-amber-900"
        >
          Create a Supabase project
          <ExternalLink className="w-3 h-3" />
        </a>
        <span>and configure .env.local</span>
      </div>
    </div>
  )
}

