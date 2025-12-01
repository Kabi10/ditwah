'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Search, Filter, X } from 'lucide-react'
import { useState, useCallback } from 'react'

interface SearchFiltersProps {
  districts: readonly string[]
  currentFilters: {
    q: string
    district: string
    status: string
    minAge: string
    maxAge: string
    dateFrom: string
    dateTo: string
  }
}

export function SearchFilters({ districts, currentFilters }: SearchFiltersProps) {
  const t = useTranslations('search')
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState(currentFilters)

  const hasFilters = filters.q || filters.district !== 'all' || filters.status !== 'all' ||
    filters.minAge || filters.maxAge || filters.dateFrom || filters.dateTo

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

  const clearFilters = () => {
    const cleared = {
      q: '',
      district: 'all',
      status: 'all',
      minAge: '',
      maxAge: '',
      dateFrom: '',
      dateTo: '',
    }
    setFilters(cleared)
    router.push('/search')
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
      <div className="mb-4">
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

      {/* Date Range - Last Seen */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('lastSeenDate') || 'Last Seen Date'}
        </label>
        <div className="flex flex-col gap-2">
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => updateFilters('dateFrom', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="From"
          />
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => updateFilters('dateTo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="To"
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasFilters && (
        <button
          onClick={clearFilters}
          className="w-full mt-4 px-4 py-2 flex items-center justify-center gap-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
        >
          <X className="w-4 h-4" />
          {t('clearFilters') || 'Clear Filters'}
        </button>
      )}
    </div>
  )
}

