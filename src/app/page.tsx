import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import {
  Search, UserPlus, CheckCircle, Phone, AlertTriangle,
  Tent, Heart, ArrowRight, Clock, MapPin, ExternalLink
} from 'lucide-react'
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

// Crisis statistics from DMC
const crisisStats = {
  affected: '1.37M',
  sheltered: '180,000+',
  safetyCentres: 1094,
  districts: 14,
  deaths: 390,
  stillMissing: 352,
}

export default async function Home() {
  const t = await getTranslations('home')
  const tStats = await getTranslations('stats')
  const stats = await getStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Critical Actions Bar - Always visible */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-600 rounded text-xs font-semibold uppercase tracking-wide">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Active Crisis
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-300">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <a href="tel:117" className="flex items-center gap-1.5 text-yellow-400 hover:text-yellow-300 font-medium">
                <Phone className="w-4 h-4" />
                117 Emergency
              </a>
              <a href="tel:+94112136136" className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white">
                <Phone className="w-4 h-4" />
                DMC: +94 112 136 136
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero - Utilitarian, Urgent */}
      <section className="bg-white border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left: Title and Search */}
            <div>
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                    {t('hero')}
                  </h1>
                  <p className="text-slate-600 mt-1">
                    Official Missing Persons Registry
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Search for a missing person by name
                </label>
                <QuickSearch />
              </div>

              {/* Quick Stats Row */}
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-red-600">{stats.missing}</span>
                  <span className="text-sm text-slate-600">registered missing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">{stats.found}</span>
                  <span className="text-sm text-slate-600">found safe</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-blue-600">{stats.sightings}</span>
                  <span className="text-sm text-slate-600">sightings reported</span>
                </div>
              </div>
            </div>

            {/* Right: Primary Actions */}
            <div className="space-y-3">
              <Link
                href="/report"
                className="flex items-center justify-between w-full p-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition group"
              >
                <div className="flex items-center gap-3">
                  <UserPlus className="w-6 h-6" />
                  <div>
                    <div className="font-semibold">{t('reportMissing')}</div>
                    <div className="text-red-200 text-sm">{t('reportMissingDesc')}</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition" />
              </Link>

              <Link
                href="/found"
                className="flex items-center justify-between w-full p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition group"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6" />
                  <div>
                    <div className="font-semibold">{t('reportFound')}</div>
                    <div className="text-green-200 text-sm">{t('reportFoundDesc')}</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition" />
              </Link>

              <Link
                href="/search"
                className="flex items-center justify-between w-full p-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg transition group border border-slate-200"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-6 h-6 text-slate-600" />
                  <div>
                    <div className="font-semibold">{t('viewAll')}</div>
                    <div className="text-slate-600 text-sm">{t('searchDesc')}</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Overview Strip */}
      <section className="bg-slate-800 text-white py-4 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Cyclone Ditwah Impact Summary
            </h2>
            <span className="text-xs text-slate-500">Source: DMC Sri Lanka</span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-white">{crisisStats.affected}</div>
              <div className="text-xs text-slate-400">People Affected</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-amber-400">{crisisStats.sheltered}</div>
              <div className="text-xs text-slate-400">Sheltered</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-blue-400">{crisisStats.safetyCentres.toLocaleString()}</div>
              <div className="text-xs text-slate-400">Safety Centres</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-orange-400">{crisisStats.districts}</div>
              <div className="text-xs text-slate-400">Districts</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-red-400">{crisisStats.deaths}</div>
              <div className="text-xs text-slate-400">Deaths</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-red-300">{crisisStats.stillMissing}</div>
              <div className="text-xs text-slate-400">Still Missing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services Grid */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Relief Camps */}
            <Link
              href="/relief-camps"
              className="flex items-start gap-4 p-4 rounded-lg border-2 border-slate-200 hover:border-orange-400 hover:bg-orange-50 transition group"
            >
              <div className="p-2 bg-orange-100 rounded group-hover:bg-orange-200 transition">
                <Tent className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{t('reliefCamps')}</h3>
                <p className="text-sm text-slate-600 mt-0.5">{t('reliefCampsDesc')}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs font-medium text-orange-600">
                    {crisisStats.safetyCentres.toLocaleString()} active centres
                  </span>
                </div>
              </div>
            </Link>

            {/* Donate */}
            <Link
              href="/donate"
              className="flex items-start gap-4 p-4 rounded-lg border-2 border-slate-200 hover:border-green-400 hover:bg-green-50 transition group"
            >
              <div className="p-2 bg-green-100 rounded group-hover:bg-green-200 transition">
                <Heart className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{t('donate')}</h3>
                <p className="text-sm text-slate-600 mt-0.5">{t('donateDesc')}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                    ✓ Verified
                  </span>
                </div>
              </div>
            </Link>

            {/* Emergency SOS */}
            <a
              href="https://floodsupport.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 rounded-lg border-2 border-red-200 bg-red-50 hover:border-red-400 transition group"
            >
              <div className="p-2 bg-red-200 rounded group-hover:bg-red-300 transition">
                <AlertTriangle className="w-5 h-5 text-red-700" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  Emergency SOS
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </h3>
                <p className="text-sm text-slate-600 mt-0.5">Request rescue or urgent help</p>
                <div className="mt-2 text-xs font-medium text-red-600">
                  floodsupport.org
                </div>
              </div>
            </a>

            {/* Contact DMC */}
            <div className="flex items-start gap-4 p-4 rounded-lg border-2 border-slate-200 bg-slate-50">
              <div className="p-2 bg-slate-200 rounded">
                <Phone className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">DMC Hotlines</h3>
                <div className="mt-2 space-y-1">
                  <a href="tel:117" className="block text-sm font-mono text-blue-600 hover:text-blue-800">
                    117 <span className="text-slate-500 font-sans">(24hr)</span>
                  </a>
                  <a href="tel:+94112136136" className="block text-sm font-mono text-blue-600 hover:text-blue-800">
                    +94 112 136 136
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Missing Persons */}
      <RecentMissing />

      {/* Official Partners */}
      <section className="bg-slate-100 py-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Official Resources & Partners</h2>
              <p className="text-sm text-slate-600">
                Verified organizations coordinating relief efforts
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <a
              href="https://dmc.gov.lk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-white rounded border border-slate-200 hover:border-slate-400 transition"
            >
              <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center text-white text-xs font-bold">
                DMC
              </div>
              <div className="min-w-0">
                <div className="font-medium text-slate-900 text-sm truncate">Disaster Management Centre</div>
                <div className="text-xs text-slate-500">dmc.gov.lk</div>
              </div>
            </a>

            <a
              href="https://donate.gov.lk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-white rounded border border-slate-200 hover:border-slate-400 transition"
            >
              <div className="w-10 h-10 bg-green-700 rounded flex items-center justify-center text-white text-xs font-bold">
                GOV
              </div>
              <div className="min-w-0">
                <div className="font-medium text-slate-900 text-sm truncate">Official Donation Portal</div>
                <div className="text-xs text-slate-500">donate.gov.lk</div>
              </div>
            </a>

            <a
              href="https://www.redcross.lk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-white rounded border border-slate-200 hover:border-slate-400 transition"
            >
              <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center text-white text-lg font-bold">
                +
              </div>
              <div className="min-w-0">
                <div className="font-medium text-slate-900 text-sm truncate">Sri Lanka Red Cross</div>
                <div className="text-xs text-slate-500">redcross.lk</div>
              </div>
            </a>

            <a
              href="https://familylinks.icrc.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-white rounded border border-slate-200 hover:border-slate-400 transition"
            >
              <div className="w-10 h-10 bg-blue-700 rounded flex items-center justify-center text-white text-xs font-bold">
                ICRC
              </div>
              <div className="min-w-0">
                <div className="font-medium text-slate-900 text-sm truncate">ICRC Family Links</div>
                <div className="text-xs text-slate-500">familylinks.icrc.org</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Trust Indicator Footer */}
      <section className="bg-slate-800 text-slate-400 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
            <p>
              This platform operates as a community coordination tool. Verify all information through official channels.
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Updated hourly
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Sri Lanka
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
