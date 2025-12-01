# Cyclone Ditwah Missing Persons Registry

A humanitarian platform to help reunite families affected by Cyclone Ditwah in Sri Lanka (November-December 2025).

**Live at:** [ditwah.com](https://ditwah.com) | [cycloneditwah.com](https://cycloneditwah.com)

## 🚨 Crisis Context

- **212+ deaths** reported
- **~1 million people affected** across nine provinces
- **370+ people still missing**
- **44,000+ displaced** in relief camps

This platform complements existing relief efforts like [floodsupport.org](https://floodsupport.org) (emergency rescue) and [donate.gov.lk](https://donate.gov.lk) (official donations).

## Features

- 📝 **Report Missing Person** - Submit details with photo upload
- 🔍 **Search & Browse** - Filter by district, age, status
- 👁️ **Report Sightings** - Help locate missing persons
- 📱 **WhatsApp Sharing** - Critical for Sri Lankan context
- 🌐 **Multi-language** - English, Sinhala (සිංහල), Tamil (தமிழ்)
- ⚠️ **Abuse Reporting** - Flag fake/inappropriate content

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage (photos)
- **i18n:** next-intl
- **Deployment:** Vercel

## Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd ditwah
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the schema from `supabase/schema.sql`
3. Create a storage bucket named `missing_persons_photos` with public access
4. Copy your project URL and anon key from Settings > API

### 3. Configure Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Supabase Storage Setup

1. Go to Storage in Supabase Dashboard
2. Create bucket: `missing_persons_photos`
3. Set bucket to **Public**
4. Add policy for public read access
5. Add policy for public uploads

## Deployment to Vercel

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Domain Configuration

1. Add `ditwah.com` as primary domain
2. Add `cycloneditwah.com` with redirect to `ditwah.com`

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── lib/                    # Supabase client, actions
└── i18n/                   # Translations (en, si, ta)
```

## Official Resources

- 🏛️ [donate.gov.lk](https://donate.gov.lk) - Official Government Donations
- 🆘 [floodsupport.org](https://floodsupport.org) - Emergency SOS Platform
- ❤️ [redcross.lk](https://www.redcross.lk) - Sri Lanka Red Cross
- 👨‍👩‍👧 [ICRC Family Links](https://familylinks.icrc.org) - International Family Reunification

## Emergency Numbers

- **117** - Emergency | **119** - Police | **1990** - Disaster Management

---

*Created with ❤️ to help reunite families affected by Cyclone Ditwah*
