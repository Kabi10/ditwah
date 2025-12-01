'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Search, Filter } from 'lucide-react'
import { useState, useCallback } from 'react'

interface SearchFiltersProps {
  districts: readonly string[]
  currentFilters: {
    q: string
    district: string
    status: string
    minAge: string
    maxAge: string
  }
}

export function SearchFilters({ districts, currentFilters }: SearchFiltersProps) {
  const t = useTranslations('search')
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState(currentFilters)

  const updateFilters = useCallback((key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/search?${params.toString()}`)
  }, [filters, router, searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters('q', filters.q)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-gray-500" />
        <h2 className="font-semibold text-gray-900">{t('filters')}</h2>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={filters.q}
            onChange={(e) => setFilters({ ...filters, q: e.target.value })}
            placeholder={t('title')}
            className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
            <Search className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </form>

      {/* District Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('district')}
        </label>
        <select
          value={filters.district}
          onChange={(e) => updateFilters('district', e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="all">{t('allDistricts')}</option>
          {districts.map((district) => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>

      {/* Status Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('status')}
        </label>
        <select
          value={filters.status}
          onChange={(e) => updateFilters('status', e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="all">{t('allStatuses')}</option>
          <option value="missing">{t('missing')}</option>
          <option value="found">{t('found')}</option>
        </select>
      </div>

      {/* Age Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('age')}
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={filters.minAge}
            onChange={(e) => updateFilters('minAge', e.target.value)}
            placeholder="Min"
            min="0"
            max="120"
            className="w-1/2 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="number"
            value={filters.maxAge}
            onChange={(e) => updateFilters('maxAge', e.target.value)}
            placeholder="Max"
            min="0"
            max="120"
            className="w-1/2 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>
    </div>
  )
}

