'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Search } from 'lucide-react'

export function QuickSearch() {
  const t = useTranslations('home')
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full px-6 py-4 pr-14 text-lg rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-300"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  )
}

