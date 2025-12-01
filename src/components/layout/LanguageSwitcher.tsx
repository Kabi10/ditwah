'use client'

import { useTransition } from 'react'
import { Globe } from 'lucide-react'

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
  { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' },
]

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition()

  const handleChange = (locale: string) => {
    startTransition(() => {
      document.cookie = `locale=${locale};path=/;max-age=31536000`
      window.location.reload()
    })
  }

  return (
    <div className="relative group">
      <button 
        className="flex items-center gap-1.5 px-2 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition"
        disabled={isPending}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm hidden sm:inline">Language</span>
      </button>
      
      <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleChange(lang.code)}
            className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
            disabled={isPending}
          >
            <span>{lang.flag}</span>
            <span className="text-sm">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

