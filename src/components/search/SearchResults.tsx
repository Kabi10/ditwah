'use client'

import { useTranslations } from 'next-intl'
import { AlertCircle, Users } from 'lucide-react'
import { PersonCard } from '@/components/shared/PersonCard'
import type { MissingPerson } from '@/lib/supabase/types'

interface SearchResultsProps {
  persons: MissingPerson[]
  error?: string
  query?: string
}

export function SearchResults({ persons, error, query }: SearchResultsProps) {
  const t = useTranslations('search')

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <p className="text-red-700">{error}</p>
      </div>
    )
  }

  if (persons.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
        <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">{t('noResults')}</p>
        {query && (
          <p className="text-gray-400 mt-2">
            No results for &quot;{query}&quot;
          </p>
        )}
      </div>
    )
  }

  return (
    <div>
      <p className="text-gray-600 mb-6">
        <span className="font-semibold text-gray-900">{persons.length}</span> {t('results')}
        {query && <span className="text-gray-500"> for &quot;{query}&quot;</span>}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {persons.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  )
}

