import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { SearchFilters } from '@/components/search/SearchFilters'
import { SearchResults } from '@/components/search/SearchResults'
import { DISTRICTS } from '@/lib/supabase/types'

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
    district?: string
    status?: string
    minAge?: string
    maxAge?: string
    dateFrom?: string
    dateTo?: string
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const t = await getTranslations('search')
  const params = await searchParams
  const supabase = await createClient()

  // Build query
  let query = supabase
    .from('missing_persons')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  // Apply filters
  if (params.q) {
    query = query.ilike('full_name', `%${params.q}%`)
  }
  
  if (params.district && params.district !== 'all') {
    query = query.eq('district', params.district)
  }
  
  if (params.status && params.status !== 'all') {
    query = query.eq('status', params.status)
  }
  
  if (params.minAge) {
    query = query.gte('age', parseInt(params.minAge))
  }
  
  if (params.maxAge) {
    query = query.lte('age', parseInt(params.maxAge))
  }

  if (params.dateFrom) {
    query = query.gte('last_seen_date', params.dateFrom)
  }

  if (params.dateTo) {
    query = query.lte('last_seen_date', params.dateTo)
  }

  const { data: persons, error } = await query

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('title')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <SearchFilters
              districts={DISTRICTS}
              currentFilters={{
                q: params.q || '',
                district: params.district || 'all',
                status: params.status || 'all',
                minAge: params.minAge || '',
                maxAge: params.maxAge || '',
                dateFrom: params.dateFrom || '',
                dateTo: params.dateTo || '',
              }}
            />
          </aside>

          {/* Results */}
          <main className="lg:col-span-3">
            <SearchResults 
              persons={persons || []} 
              error={error?.message}
              query={params.q}
            />
          </main>
        </div>
      </div>
    </div>
  )
}

