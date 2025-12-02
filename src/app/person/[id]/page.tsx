import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import { User, MapPin, Calendar, Phone, ArrowLeft } from 'lucide-react'
import { getMissingPerson, getSightings } from '@/lib/actions/missing-persons'
import { ShareButtons } from '@/components/person/ShareButtons'
import { SightingsList } from '@/components/person/SightingsList'
import { AbuseReportButton } from '@/components/person/AbuseReportButton'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ditwah.com'

interface PersonPageProps {
  params: Promise<{ id: string }>
}

// Generate dynamic metadata for each person page (SEO + Social Sharing)
export async function generateMetadata({ params }: PersonPageProps): Promise<Metadata> {
  const { id } = await params
  const person = await getMissingPerson(id)

  if (!person) {
    return {
      title: 'Person Not Found',
    }
  }

  const title = `${person.full_name} - Missing Person | Cyclone Ditwah Sri Lanka`
  const description = [
    `🔴 MISSING: ${person.full_name}`,
    person.age ? `Age: ${person.age}` : null,
    person.district ? `Last seen: ${person.last_seen_location || person.district}` : null,
    person.physical_description ? person.physical_description.substring(0, 100) : null,
    'Help reunite this family. Share this page.',
  ].filter(Boolean).join(' | ')

  const personUrl = `${siteUrl}/person/${id}`

  return {
    title,
    description,
    keywords: [
      person.full_name,
      'missing person Sri Lanka',
      'Cyclone Ditwah',
      person.district,
      'flood victims',
      'Sri Lanka disaster 2025',
    ].filter(Boolean),
    alternates: {
      canonical: personUrl,
    },
    openGraph: {
      title,
      description,
      url: personUrl,
      siteName: 'Cyclone Ditwah Missing Persons Registry',
      type: 'profile',
      images: person.photo_url ? [
        {
          url: person.photo_url,
          width: 400,
          height: 400,
          alt: `Photo of ${person.full_name}`,
        }
      ] : [],
      locale: 'en_US',
    },
    twitter: {
      card: person.photo_url ? 'summary_large_image' : 'summary',
      title: `🔴 MISSING: ${person.full_name}`,
      description,
      images: person.photo_url ? [person.photo_url] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

// Generate structured data for the person (JSON-LD)
function generatePersonJsonLd(person: {
  id: string
  full_name: string
  age: number | null
  gender: string | null
  photo_url: string | null
  last_seen_location: string | null
  district: string
  last_seen_date: string | null
  physical_description: string | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/person/${person.id}`,
    name: person.full_name,
    image: person.photo_url || undefined,
    description: person.physical_description || `Missing person from ${person.district}, Sri Lanka`,
    gender: person.gender || undefined,
    birthDate: person.age ? undefined : undefined, // We don't have exact DOB
    additionalType: 'MissingPerson',
    subjectOf: {
      '@type': 'WebPage',
      url: `${siteUrl}/person/${person.id}`,
      name: `${person.full_name} - Missing Person`,
      datePublished: person.last_seen_date || undefined,
    },
    location: {
      '@type': 'Place',
      name: person.last_seen_location || person.district,
      address: {
        '@type': 'PostalAddress',
        addressRegion: person.district,
        addressCountry: 'Sri Lanka',
      },
    },
  }
}

export default async function PersonPage({ params }: PersonPageProps) {
  const { id } = await params
  const t = await getTranslations('person')
  
  const person = await getMissingPerson(id)
  
  if (!person) {
    notFound()
  }

  const sightings = await getSightings(id)

  // Generate JSON-LD structured data for SEO
  const jsonLd = generatePersonJsonLd(person)

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown'
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <>
      {/* JSON-LD Structured Data for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  )
}

