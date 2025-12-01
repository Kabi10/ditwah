import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EmergencyBanner } from "@/components/layout/EmergencyBanner";
import { SetupBanner } from "@/components/layout/SetupBanner";
import { isSupabaseConfigured } from "@/lib/supabase/server";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ditwah.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cyclone Ditwah Missing Persons Registry | Sri Lanka 2025",
    template: "%s | Cyclone Ditwah Missing Persons Registry",
  },
  description: "Official missing persons registry for Cyclone Ditwah, Sri Lanka (November-December 2025). Search 370+ missing persons, report sightings, upload photos. Help reunite families affected by the devastating floods.",
  keywords: ["Cyclone Ditwah", "Sri Lanka missing persons", "flood relief Sri Lanka", "family reunification", "disaster response 2025", "Sri Lanka floods", "missing person search", "cyclone victims Sri Lanka", "ditwah missing", "Sri Lanka emergency"],
  authors: [{ name: "Ditwah Community Response Team" }],
  creator: "ditwah.com",
  publisher: "ditwah.com",
  formatDetection: {
    telephone: true,
    email: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Cyclone Ditwah Missing Persons Registry | Sri Lanka 2025",
    description: "Search 370+ missing persons, report sightings, upload photos. Help reunite families affected by Cyclone Ditwah in Sri Lanka.",
    type: "website",
    locale: "en_US",
    siteName: "ditwah.com",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyclone Ditwah Missing Persons Registry",
    description: "Help reunite families affected by Cyclone Ditwah. 370+ people still missing.",
    site: "@ditwah",
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
    google: 'pending', // Add Google Search Console verification code here
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Cyclone Ditwah Missing Persons Registry',
        url: siteUrl,
        description: 'Community-driven platform to help reunite families separated by Cyclone Ditwah in Sri Lanka',
        foundingDate: '2025-11',
        areaServed: {
          '@type': 'Country',
          name: 'Sri Lanka',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Cyclone Ditwah Missing Persons Registry',
        description: 'Search for missing persons, report sightings, and help reunite families affected by Cyclone Ditwah',
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
        name: 'Cyclone Ditwah Missing Persons Registry | Sri Lanka 2025',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#organization` },
        description: 'Help reunite families affected by Cyclone Ditwah. 370+ people are still missing.',
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
    ],
  };

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@400;500;600;700&family=Noto+Sans+Tamil:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <SetupBanner isConfigured={isSupabaseConfigured()} />
          <EmergencyBanner />
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
