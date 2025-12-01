import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { PersonCard } from '@/components/shared/PersonCard'
import type { MissingPerson } from '@/lib/supabase/types'

export async function RecentMissing() {
  const t = await getTranslations('home')
  const supabase = await createClient()

  const { data: persons } = await supabase
    .from('missing_persons')
    .select('*')
    .eq('is_published', true)
    .eq('status', 'missing')
    .order('created_at', { ascending: false })
    .limit(6) as { data: MissingPerson[] | null }

  if (!persons || persons.length === 0) {
    return null
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Recently Reported Missing
          </h2>
          <Link 
            href="/search"
            className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium"
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {persons.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      </div>
    </section>
  )
}

