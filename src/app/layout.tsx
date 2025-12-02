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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cyclone-ditwah-missing-persons.vercel.app';

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
        name: 'Cyclone Ditwah Disaster Relief',
        url: siteUrl,
        description: 'Comprehensive disaster relief platform for Cyclone Ditwah in Sri Lanka - missing persons, relief camps, donations, and resources',
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
