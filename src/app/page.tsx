import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import {
  Search, UserPlus, AlertTriangle, CheckCircle,
  Tent, Heart, ArrowRight, Clock, MapPin, ExternalLink, Eye,
  TrendingUp, Activity, Building2, Phone
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { QuickSearch } from '@/components/home/QuickSearch'
import { RecentMissing } from '@/components/home/RecentMissing'
import { LiveUpdates } from '@/components/home/LiveUpdates'
import RecoveryCenter from '@/components/home/RecoveryCenter'

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

// Recovery start date (when cyclone passed)
const RECOVERY_START_DATE = new Date('2025-11-27')

function getRecoveryDays(): number {
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - RECOVERY_START_DATE.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
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
      {/* Recovery Status Bar - Always visible */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-600 rounded text-xs font-semibold uppercase tracking-wide">
                <Activity className="w-3 h-3" />
                Recovery Phase
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-700 rounded text-xs">
                <TrendingUp className="w-3 h-3 text-green-400" />
                Day {getRecoveryDays()} of Recovery
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-3 h-3" />
              <span>Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
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

            </div>

            {/* Right: Two Primary Actions Only */}
            <div className="space-y-4">
              {/* Primary CTA 1: Report Missing (Urgent - Red/Orange) */}
              <Link
                href="/report"
                className="flex items-center justify-between w-full p-5 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white rounded-xl transition group shadow-lg shadow-red-500/20"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <UserPlus className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">{t('reportMissing')}</div>
                    <div className="text-red-100 text-sm">{t('reportMissingDesc')}</div>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition" />
              </Link>

              {/* Primary CTA 2: I Found Someone / Have Information (Hopeful - Green/Blue) */}
              <Link
                href="/found"
                className="flex items-center justify-between w-full p-5 bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white rounded-xl transition group shadow-lg shadow-green-500/20"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Eye className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">I Found Someone / Have Info</div>
                    <div className="text-green-100 text-sm">Report a sighting or found person</div>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition" />
              </Link>

              {/* Primary CTA 3: Family Finder - I am Safe (Reassurance - Blue/Indigo) - NEW */}
              <Link
                href="/im-safe"
                className="flex items-center justify-between w-full p-5 bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white rounded-xl transition group shadow-lg shadow-blue-500/20"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Family Finder: I am Safe</div>
                    <div className="text-blue-100 text-sm">Register yourself as safe for families to see</div>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition" />
              </Link>

              {/* Secondary: Search Link */}
              <Link
                href="/search"
                className="flex items-center justify-center gap-2 w-full py-3 text-slate-600 hover:text-blue-600 transition text-sm font-medium"
              >
                <Search className="w-4 h-4" />
                <span>Search all {stats.missing} registered missing persons</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Unified Statistics Dashboard */}
      <section className="bg-slate-900 text-white py-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Live Crisis Impact
              </h2>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">Cyclone Ditwah Situation Report</h1>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 block mb-1">Last Official Sync</span>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700 text-xs text-slate-300">
                <Clock className="w-3 h-3 text-amber-500" />
                {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Primary Impact Stats */}
            <div className="p-5 bg-red-950/30 rounded-2xl border border-red-900/50 flex flex-col justify-center transition hover:bg-red-900/40">
              <div className="text-red-400 font-bold text-3xl md:text-4xl">{crisisStats.deaths}</div>
              <div className="text-xs text-red-300 font-medium uppercase mt-1">Confirmed Loss</div>
            </div>

            <div className="p-5 bg-amber-950/30 rounded-2xl border border-amber-900/50 flex flex-col justify-center transition hover:bg-amber-900/40">
              <div className="text-amber-400 font-bold text-3xl md:text-4xl">{crisisStats.stillMissing}</div>
              <div className="text-xs text-amber-300 font-medium uppercase mt-1">Active Search</div>
            </div>

            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 flex flex-col justify-center transition hover:bg-white/10">
              <div className="text-white font-bold text-2xl md:text-3xl">{crisisStats.affected}</div>
              <div className="text-xs text-slate-400 font-medium uppercase mt-1">Total Affected</div>
            </div>

            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 flex flex-col justify-center transition hover:bg-white/10">
              <div className="text-blue-400 font-bold text-2xl md:text-3xl">{crisisStats.sheltered}</div>
              <div className="text-xs text-slate-400 font-medium uppercase mt-1">In Shelters</div>
            </div>

            <div className="p-5 bg-blue-900/20 rounded-2xl border border-blue-800/50 col-span-2 lg:col-span-1 flex flex-col justify-center transition hover:bg-blue-800/30">
              <div className="text-blue-300 font-bold text-2xl md:text-3xl">{stats.missing}</div>
              <div className="text-xs text-blue-200 font-medium uppercase mt-1">Registered Here</div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-6 pt-6 border-t border-slate-800/50 text-[10px] uppercase font-bold tracking-widest text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Real-time Monitoring
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-3 h-3" />
              {crisisStats.safetyCentres} Safety Centres Active
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              {crisisStats.districts} Impacted Districts
            </div>
          </div>
        </div>
      </section>

      {/* Live Situation Dashboard - NEW */}
      <section className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900 leading-tight">National Situation Dashboard</h2>
        </div>
        <LiveUpdates />

        {/* Recovery Phase Command Center - Consolidated Pillars 1-4 */}
        <RecoveryCenter />
      </section>

      {/* Quick Services Grid */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Relief Resources - NEW */}
            <Link
              href="/resources"
              className="flex items-start gap-4 p-5 rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition group shadow-sm"
            >
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{t('resources')}</h3>
                <p className="text-sm text-slate-600 mt-1">{t('resourcesDesc')}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                    Live Locator
                  </span>
                </div>
              </div>
            </Link>

            {/* Relief Camps */}
            <Link
              href="/relief-camps"
              className="flex items-start gap-4 p-5 rounded-xl border-2 border-slate-200 hover:border-orange-400 hover:bg-orange-50 transition group shadow-sm"
            >
              <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition">
                <Tent className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{t('reliefCamps')}</h3>
                <p className="text-sm text-slate-600 mt-1">{t('reliefCampsDesc')}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs font-medium text-orange-600">
                    {crisisStats.safetyCentres.toLocaleString()} Active shelters
                  </span>
                </div>
              </div>
            </Link>

            {/* Emergency Contacts - NEW */}
            <Link
              href="/emergency-contacts"
              className="flex items-start gap-4 p-5 rounded-xl border-2 border-slate-200 hover:border-red-400 hover:bg-red-50 transition group shadow-sm"
            >
              <div className="p-3 bg-red-100 rounded-lg group-hover:bg-red-200 transition">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{t('emergencyContacts')}</h3>
                <p className="text-sm text-slate-600 mt-1">{t('emergencyContactsDesc')}</p>
                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-red-600">
                  Dial 117 for Immediate Help
                </div>
              </div>
            </Link>

            {/* Donate */}
            <Link
              href="/donate"
              className="flex items-start gap-4 p-5 rounded-xl border-2 border-slate-200 hover:border-green-400 hover:bg-green-50 transition group shadow-sm"
            >
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{t('donate')}</h3>
                <p className="text-sm text-slate-600 mt-1">{t('donateDesc')}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">
                    ✓ Verified Portals
                  </span>
                </div>
              </div>
            </Link>

            {/* Emergency SOS - External */}
            <a
              href="https://floodsupport.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-5 rounded-xl border-2 border-red-200 bg-red-50 hover:border-red-400 transition group shadow-sm"
            >
              <div className="p-3 bg-red-200 rounded-lg group-hover:bg-red-300 transition">
                <AlertTriangle className="w-6 h-6 text-red-700" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  Emergency SOS
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </h3>
                <p className="text-sm text-slate-600 mt-1">Request urgent rescue or medical help</p>
                <div className="mt-3 text-xs font-bold text-red-600">
                  floodsupport.org
                </div>
              </div>
            </a>

            {/* Search All Missing */}
            <Link
              href="/search"
              className="flex items-start gap-4 p-5 rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition group shadow-sm"
            >
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{t('viewAll')}</h3>
                <p className="text-sm text-slate-600 mt-1">{t('searchDesc')}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs font-medium text-blue-600">
                    {stats.missing} Cases registered
                  </span>
                </div>
              </div>
            </Link>
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
      {/* Floating Emergency SOS - High Visibility */}
      <div className="fixed bottom-6 right-6 z-50 animate-bounce hover:animate-none group">
        <a
          href="https://floodsupport.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-red-600 text-white px-6 py-4 rounded-full shadow-2xl hover:bg-red-700 transition transform hover:scale-105 active:scale-95 border-2 border-white/20"
        >
          <div className="bg-white/20 p-1.5 rounded-full">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Urgent Help</span>
            <span className="text-lg font-black tracking-tight">SOS RESCUE</span>
          </div>
        </a>
        <div className="absolute bottom-full right-0 mb-3 w-48 bg-slate-900 text-white p-3 rounded-xl text-[10px] font-medium shadow-xl opacity-0 group-hover:opacity-100 transition pointer-events-none transform translate-y-2 group-hover:translate-y-0">
          Click here for immediate water rescue, medical emergency or evacuation support.
          <div className="absolute top-full right-6 w-2 h-2 bg-slate-900 transform rotate-45 -translate-y-1"></div>
        </div>
      </div>
    </div>
  )
}
