import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Suspense } from 'react';
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EmergencyBanner } from "@/components/layout/EmergencyBanner";
import { StickyEmergencyHeader } from "@/components/layout/StickyEmergencyHeader";
import { SetupBanner } from "@/components/layout/SetupBanner";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Analytics } from "@/components/analytics/Analytics";
import { OfflineIndicator } from "@/components/pwa/OfflineIndicator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ditwah.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cyclone Ditwah Disaster Relief | Sri Lanka 2025",
    template: "%s | Cyclone Ditwah Relief",
  },
  description: "Comprehensive disaster relief platform for Cyclone Ditwah, Sri Lanka (November-December 2025). Missing persons registry, relief camps, verified donation portals, and emergency resources. Help reunite families and support relief efforts.",
  keywords: ["Cyclone Ditwah", "Sri Lanka disaster relief", "flood relief Sri Lanka", "missing persons", "relief camps", "donate Sri Lanka", "family reunification", "disaster response 2025", "Sri Lanka floods", "cyclone victims Sri Lanka", "Sri Lanka emergency", "refugee camps Sri Lanka"],
  authors: [{ name: "Cyclone Ditwah Community Response" }],
  creator: "Cyclone Ditwah Community Response",
  publisher: "Cyclone Ditwah Community Response",
  formatDetection: {
    telephone: true,
    email: true,
  },
  // PWA Manifest
  manifest: '/manifest.json',
  // Apple Touch Icon
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Ditwah',
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Cyclone Ditwah Disaster Relief | Sri Lanka 2025",
    description: "Missing persons registry, relief camps, verified donations. Comprehensive disaster relief platform for Cyclone Ditwah in Sri Lanka.",
    type: "website",
    locale: "en_US",
    siteName: "Cyclone Ditwah Disaster Relief",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyclone Ditwah Disaster Relief",
    description: "Missing persons • Relief camps • Donations • Resources. Comprehensive disaster relief for Cyclone Ditwah, Sri Lanka.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  // JSON-LD Structured Data - Enhanced for Rich Snippets
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
      // Event Schema for the Disaster
      {
        '@type': 'Event',
        name: 'Cyclone Ditwah Disaster Relief Operations',
        description: 'Ongoing disaster relief and recovery operations following Cyclone Ditwah in Sri Lanka',
        startDate: '2025-11-27',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: {
          '@type': 'Country',
          name: 'Sri Lanka',
        },
        organizer: { '@id': `${siteUrl}/#organization` },
      },
      // FAQ Schema for Rich Snippets
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
    <html lang={locale}>
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Ditwah" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Ditwah" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#dc2626" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

        {/* Hreflang for Multilingual SEO (Sri Lanka) */}
        <link rel="alternate" hrefLang="en" href={siteUrl} />
        <link rel="alternate" hrefLang="si-LK" href={siteUrl} />
        <link rel="alternate" hrefLang="ta-LK" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />

        {/* Geo-targeting Meta Tags */}
        <meta name="geo.region" content="LK" />
        <meta name="geo.placename" content="Sri Lanka" />
        <meta name="DC.language" content="en, si, ta" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@400;500;600;700&family=Noto+Sans+Tamil:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col pt-10">
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          <StickyEmergencyHeader />
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <SetupBanner isConfigured={isSupabaseConfigured()} />
          <EmergencyBanner />
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          {/* PWA Offline Indicator - Shows when network is unavailable */}
          <OfflineIndicator />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
