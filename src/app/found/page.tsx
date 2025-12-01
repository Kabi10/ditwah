import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { SightingForm } from '@/components/found/SightingForm'

interface FoundPageProps {
  searchParams: Promise<{
    person?: string
  }>
}

export default async function FoundPage({ searchParams }: FoundPageProps) {
  const t = await getTranslations('found')
  const params = await searchParams
  const supabase = await createClient()

  // Get all missing persons for selection
  const { data: persons } = await supabase
    .from('missing_persons')
    .select('id, full_name, photo_url, district')
    .eq('is_published', true)
    .eq('status', 'missing')
    .order('full_name')

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {t('title')}
          </h1>
          <p className="text-gray-600 mb-8">
            {t('selectPerson')}
          </p>

          <SightingForm persons={persons || []} preselectedPersonId={params.person} />
        </div>
      </div>
    </div>
  )
}

