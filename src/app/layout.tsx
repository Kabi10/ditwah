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
import { JsonLd } from "@/components/seo/JsonLd";
import { Inter, Noto_Sans_Sinhala, Noto_Sans_Tamil } from 'next/font/google';

// Optimize Fonts with next/font (Self-hosted, no layout shift)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notoSinhala = Noto_Sans_Sinhala({
  subsets: ['sinhala'],
  display: 'swap',
  variable: '--font-noto-sinhala',
});

const notoTamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  display: 'swap',
  variable: '--font-noto-tamil',
});

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



  return (
    <html lang={locale} className={`${inter.variable} ${notoSinhala.variable} ${notoTamil.variable}`}>
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

        {/* Fonts managed by next/font/google in layout.tsx */}

        {/* Structured Data */}
        <JsonLd siteUrl={siteUrl} />
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
