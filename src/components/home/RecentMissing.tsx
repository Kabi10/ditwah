import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight, Clock, AlertCircle } from 'lucide-react'
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
    <section className="py-8 px-4 bg-white border-b">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Recently Reported Missing
              </h2>
              <p className="text-sm text-slate-600 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Updated in real-time
              </p>
            </div>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            View all cases
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {persons.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>

        {/* Help prompt */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-amber-800">
            <strong>Recognize someone?</strong> Report a sighting immediately to help reunite families.
          </p>
          <Link
            href="/found"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition whitespace-nowrap"
          >
            Report a Sighting
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

