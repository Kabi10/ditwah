'use strict';

interface JsonLdProps {
    siteUrl: string;
}

export function JsonLd({ siteUrl }: JsonLdProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': ['Organization', 'EmergencyService'],
                '@id': `${siteUrl}/#organization`,
                name: 'Cyclone Ditwah Disaster Relief',
                url: siteUrl,
                description: 'Comprehensive disaster relief platform for Cyclone Ditwah in Sri Lanka - missing persons, relief camps, donations, and resources',
                foundingDate: '2025-11',
                areaServed: {
                    '@type': 'Country',
                    name: 'Sri Lanka',
                },
                contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+94-117',
                    contactType: 'emergency',
                    availableLanguage: ['English', 'Sinhala', 'Tamil'],
                },
            },
            {
                '@type': 'WebSite',
                '@id': `${siteUrl}/#website`,
                url: siteUrl,
                name: 'Cyclone Ditwah Disaster Relief',
                description: 'Missing persons registry, relief camps, verified donations, and emergency resources for Cyclone Ditwah relief',
                publisher: { '@id': `${siteUrl}/#organization` },
                potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                        '@type': 'EntryPoint',
                        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
                    },
                    'query-input': 'required name=search_term_string',
                },
            },
            {
                '@type': 'WebPage',
                '@id': `${siteUrl}/#webpage`,
                url: siteUrl,
                name: 'Cyclone Ditwah Disaster Relief | Sri Lanka 2025',
                isPartOf: { '@id': `${siteUrl}/#website` },
                about: { '@id': `${siteUrl}/#organization` },
                description: 'Comprehensive disaster relief platform: missing persons, relief camps, donations, and resources for Cyclone Ditwah.',
                breadcrumb: { '@id': `${siteUrl}/#breadcrumb` },
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${siteUrl}/#breadcrumb`,
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: siteUrl,
                    },
                ],
            },
            {
                '@type': 'Event',
                '@id': `${siteUrl}/#event`,
                name: 'Cyclone Ditwah Disaster Relief Operations',
                description: 'Ongoing disaster relief and recovery operations following Cyclone Ditwah in Sri Lanka. Join community efforts to support affected families through donations, volunteering, and resource sharing.',
                image: [
                    {
                        '@type': 'ImageObject',
                        url: `${siteUrl}/icons/icon-512x512.png`,
                        width: 512,
                        height: 512,
                    },
                ],
                startDate: '2025-11-27T00:00:00+05:30',
                endDate: '2026-06-30T23:59:59+05:30',
                eventStatus: 'https://schema.org/EventScheduled',
                eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
                location: {
                    '@type': 'Place',
                    name: 'Sri Lanka - Multiple Districts',
                    address: {
                        '@type': 'PostalAddress',
                        streetAddress: 'Multiple Relief Centers',
                        addressLocality: 'Colombo',
                        addressRegion: 'Western Province',
                        postalCode: '00100',
                        addressCountry: 'LK',
                    },
                },
                performer: {
                    '@type': 'Organization',
                    name: 'Cyclone Ditwah Community Response',
                    url: siteUrl,
                },
                offers: {
                    '@type': 'Offer',
                    name: 'Free Participation in Relief Efforts',
                    url: `${siteUrl}/donate`,
                    price: '0',
                    priceCurrency: 'LKR',
                    availability: 'https://schema.org/InStock',
                    validFrom: '2025-11-27',
                },
                organizer: {
                    '@type': 'Organization',
                    name: 'Cyclone Ditwah Disaster Relief',
                    url: siteUrl,
                },
            },
            {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'How do I report a missing person after Cyclone Ditwah?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Visit ditwah.com/report to submit a missing person report with photo, last known location, and contact details. Reports are immediately published and searchable.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Where can I find relief camps near me in Sri Lanka?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Visit ditwah.com/relief-camps to find all 1,094+ active safety centers across 14 affected districts. Filter by district to find camps nearest to you.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'How do I register myself as safe after the cyclone?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Use the "I am Safe" feature at ditwah.com/im-safe to register your safety status. Your family can then search for you on our platform.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'How can I donate to Cyclone Ditwah relief efforts?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Visit ditwah.com/donate for verified donation portals including the official government portal donate.gov.lk and Sri Lanka Red Cross.',
                        },
                    },
                ],
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
