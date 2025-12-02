import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { Tent, MapPin, Users, ExternalLink, AlertCircle, BarChart3, Heart, UserX } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Relief Camps | Cyclone Ditwah Disaster Relief',
  description: 'Find relief camps and shelters for Cyclone Ditwah affected families in Sri Lanka. Camp locations, capacity, and contact information by district.',
}

// Data structure for relief camps - based on official DMC statistics
const reliefCampData = {
  lastUpdated: '2025-12-02T10:00:00Z',
  source: 'DMC Sri Lanka',
  summary: {
    totalCamps: 1094,
    totalSheltered: 180000,
    totalAffected: 1373899,
    familiesAffected: 382651,
    deaths: 390,
    missing: 352,
    affectedDistricts: 14,
  },
  externalResources: [
    {
      name: 'DMC River Water Levels',
      url: 'https://nuuuwan.github.io/lk_dmc_vis',
      description: 'Real-time river water level monitoring across Sri Lanka',
    },
    {
      name: 'Irrigation Dept. Data',
      url: 'https://github.com/nuuuwan/lk_irrigation',
      description: 'Higher frequency water level measurements updated every few minutes',
    },
    {
      name: 'ArcGIS Dashboard',
      url: 'https://www.arcgis.com/apps/dashboards/2cffe83c9ff5497d97375498bdf3ff38',
      description: 'Official Irrigation Department live dashboard',
    },
  ],
  districts: [
    { name: 'Colombo', camps: 18, occupancy: 5200, status: 'critical' },
    { name: 'Gampaha', camps: 22, occupancy: 6800, status: 'critical' },
    { name: 'Kalutara', camps: 15, occupancy: 4100, status: 'high' },
    { name: 'Ratnapura', camps: 28, occupancy: 8500, status: 'critical' },
    { name: 'Kegalle', camps: 14, occupancy: 3800, status: 'high' },
    { name: 'Kandy', camps: 12, occupancy: 3200, status: 'moderate' },
    { name: 'Matale', camps: 8, occupancy: 2100, status: 'moderate' },
    { name: 'Kurunegala', camps: 16, occupancy: 4500, status: 'high' },
    { name: 'Puttalam', camps: 9, occupancy: 2400, status: 'moderate' },
    { name: 'Anuradhapura', camps: 6, occupancy: 1800, status: 'moderate' },
    { name: 'Polonnaruwa', camps: 4, occupancy: 1200, status: 'low' },
    { name: 'Badulla', camps: 4, occupancy: 1400, status: 'low' },
  ],
}

function getStatusColor(status: string) {
  switch (status) {
    case 'critical': return 'bg-red-100 text-red-700 border-red-200'
    case 'high': return 'bg-orange-100 text-orange-700 border-orange-200'
    case 'moderate': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    case 'low': return 'bg-green-100 text-green-700 border-green-200'
    default: return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}

export default async function ReliefCampsPage() {
  const t = await getTranslations('reliefCamps')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Tent className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-blue-100">{t('subtitle')}</p>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-4xl mx-auto">
          {/* Primary Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Tent className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-blue-600">{reliefCampData.summary.totalCamps.toLocaleString()}</div>
              <div className="text-sm text-gray-600">{t('safetyCentres')}</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-orange-600">{reliefCampData.summary.totalSheltered.toLocaleString()}+</div>
              <div className="text-sm text-gray-600">{t('peopleSheltered')}</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-purple-600">{(reliefCampData.summary.totalAffected / 1000000).toFixed(2)}M</div>
              <div className="text-sm text-gray-600">{t('peopleAffected')}</div>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <Heart className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-indigo-600">{reliefCampData.summary.familiesAffected.toLocaleString()}</div>
              <div className="text-sm text-gray-600">{t('familiesAffected')}</div>
            </div>
          </div>
          {/* Casualties Row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <div className="text-2xl md:text-3xl font-bold text-white">{reliefCampData.summary.deaths}</div>
              <div className="text-sm text-gray-300">{t('deaths')}</div>
            </div>
            <div className="text-center p-4 bg-amber-100 rounded-lg">
              <UserX className="w-6 h-6 text-amber-700 mx-auto mb-1" />
              <div className="text-2xl md:text-3xl font-bold text-amber-700">{reliefCampData.summary.missing}</div>
              <div className="text-sm text-amber-600">{t('missing')}</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <MapPin className="w-6 h-6 text-red-600 mx-auto mb-1" />
              <div className="text-2xl md:text-3xl font-bold text-red-600">{reliefCampData.summary.affectedDistricts}</div>
              <div className="text-sm text-gray-600">{t('affectedDistricts')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Notice */}
      <section className="py-4 px-4 bg-amber-50 border-b border-amber-200">
        <div className="max-w-4xl mx-auto flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-800 text-sm">{t('dataNotice')}</p>
            <p className="text-amber-600 text-xs mt-1">
              {t('lastUpdated')}: {new Date(reliefCampData.lastUpdated).toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      {/* District List */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">{t('campsByDistrict')}</h2>
          </div>
          <div className="grid gap-3">
            {reliefCampData.districts.map((district) => (
              <div
                key={district.name}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{district.name}</h3>
                    <p className="text-sm text-gray-500">{district.camps} {t('camps')} • {district.occupancy.toLocaleString()} {t('people')}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(district.status)}`}>
                  {t(`status.${district.status}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-12 px-4 bg-white border-t">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('liveMonitoring')}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {reliefCampData.externalResources.map((resource) => (
              <a key={resource.url} href={resource.url} target="_blank" rel="noopener noreferrer"
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition">
                <h3 className="font-semibold text-gray-900 mb-1">{resource.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
                <span className="text-blue-600 text-sm flex items-center gap-1">{t('viewData')} <ExternalLink className="w-4 h-4" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

