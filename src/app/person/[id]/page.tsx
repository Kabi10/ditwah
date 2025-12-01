import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import { User, MapPin, Calendar, Phone, ArrowLeft } from 'lucide-react'
import { getMissingPerson, getSightings } from '@/lib/actions/missing-persons'
import { ShareButtons } from '@/components/person/ShareButtons'
import { SightingsList } from '@/components/person/SightingsList'
import { AbuseReportButton } from '@/components/person/AbuseReportButton'

interface PersonPageProps {
  params: Promise<{ id: string }>
}

export default async function PersonPage({ params }: PersonPageProps) {
  const { id } = await params
  const t = await getTranslations('person')
  
  const person = await getMissingPerson(id)
  
  if (!person) {
    notFound()
  }

  const sightings = await getSightings(id)

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown'
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/search"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header with Photo */}
          <div className="md:flex">
            {/* Photo */}
            <div className="md:w-1/3 bg-gray-100 flex items-center justify-center">
              <div className="relative w-full aspect-[3/4] max-h-[400px] md:max-h-none">
                {person.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={person.photo_url}
                    alt={person.full_name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-24 h-24 text-gray-300" />
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="md:w-2/3 p-6 md:p-8">
              {/* Status Badge */}
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                person.status === 'missing' ? 'status-missing' : 'status-found'
              }`}>
                {person.status === 'missing' ? t('missing') : t('found')}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {person.full_name}
              </h1>

              <div className="space-y-3 text-gray-600">
                {person.age && (
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <span>{t('age')}: {person.age} years</span>
                    {person.gender && <span>• {person.gender}</span>}
                  </div>
                )}

                {person.district && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>{person.last_seen_location || person.district}</span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span>{t('lastSeen')}: {formatDate(person.last_seen_date)}</span>
                </div>
              </div>

              {/* Physical Description */}
              {person.physical_description && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{t('description')}</h3>
                  <p className="text-gray-600">{person.physical_description}</p>
                </div>
              )}

              {/* Share Buttons */}
              <div className="mt-6">
                <ShareButtons person={person} />
              </div>
            </div>
          </div>

          {/* Contact & Actions */}
          <div className="border-t p-6 md:p-8 bg-gray-50">
            <div className="flex flex-wrap gap-4">
              {person.reporter_phone && (
                <a
                  href={`tel:${person.reporter_phone}`}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Phone className="w-4 h-4" />
                  {t('contact')}
                </a>
              )}

              <Link
                href={`/found?person=${person.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {t('reportSighting')}
              </Link>

              <AbuseReportButton personId={person.id} />
            </div>
          </div>
        </div>

        {/* Sightings */}
        <SightingsList sightings={sightings} />
      </div>
    </div>
  )
}

