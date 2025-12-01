import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Search, UserPlus, CheckCircle, Users, Heart, Eye } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { QuickSearch } from '@/components/home/QuickSearch'
import { RecentMissing } from '@/components/home/RecentMissing'

async function getStats() {
  const supabase = await createClient()

  const [missingResult, foundResult, sightingsResult] = await Promise.all([
    supabase.from('missing_persons').select('id', { count: 'exact', head: true }).eq('status', 'missing').eq('is_published', true),
    supabase.from('missing_persons').select('id', { count: 'exact', head: true }).eq('status', 'found').eq('is_published', true),
    supabase.from('sightings').select('id', { count: 'exact', head: true }),
  ])

  return {
    missing: missingResult.count ?? 0,
    found: foundResult.count ?? 0,
    sightings: sightingsResult.count ?? 0,
  }
}

export default async function Home() {
  const t = await getTranslations('home')
  const tStats = await getTranslations('stats')
  const stats = await getStats()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('hero')}
          </h1>
          <p className="text-xl md:text-2xl text-red-100 mb-8">
            {t('heroSubtitle')}
          </p>

          {/* Quick Search */}
          <QuickSearch />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <Users className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-3xl md:text-4xl font-bold text-red-600">{stats.missing}</div>
              <div className="text-sm text-gray-600">{tStats('missing')}</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Heart className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-3xl md:text-4xl font-bold text-green-600">{stats.found}</div>
              <div className="text-sm text-gray-600">{tStats('found')}</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl md:text-4xl font-bold text-blue-600">{stats.sightings}</div>
              <div className="text-sm text-gray-600">{tStats('sightings')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/search"
              className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition card-hover border border-gray-100"
            >
              <Search className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('viewAll')}</h3>
              <p className="text-gray-500 text-center text-sm">
                Browse and search all reported missing persons
              </p>
            </Link>

            <Link
              href="/report"
              className="flex flex-col items-center p-8 bg-red-600 text-white rounded-xl shadow-sm hover:shadow-md transition card-hover"
            >
              <UserPlus className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('reportMissing')}</h3>
              <p className="text-red-100 text-center text-sm">
                Report a missing family member or friend
              </p>
            </Link>

            <Link
              href="/found"
              className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition card-hover border border-gray-100"
            >
              <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('reportFound')}</h3>
              <p className="text-gray-500 text-center text-sm">
                Report a sighting or found person
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Missing Persons */}
      <RecentMissing />
    </div>
  )
}
