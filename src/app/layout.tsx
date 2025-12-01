import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EmergencyBanner } from "@/components/layout/EmergencyBanner";
import { SetupBanner } from "@/components/layout/SetupBanner";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Cyclone Ditwah Missing Persons Registry | Sri Lanka",
  description: "Help reunite families affected by Cyclone Ditwah in Sri Lanka. Search for missing persons, report sightings, and support relief efforts. 370+ people are still missing.",
  keywords: "Cyclone Ditwah, Sri Lanka, missing persons, flood relief, family reunification, disaster response",
  openGraph: {
    title: "Cyclone Ditwah Missing Persons Registry",
    description: "Help reunite families affected by Cyclone Ditwah in Sri Lanka. 370+ people are still missing.",
    type: "website",
    locale: "en_US",
    siteName: "ditwah.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyclone Ditwah Missing Persons Registry",
    description: "Help reunite families affected by Cyclone Ditwah in Sri Lanka.",
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
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@400;500;600;700&family=Noto+Sans+Tamil:wght@400;500;600;700&display=swap"
          rel="stylesheet"
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
