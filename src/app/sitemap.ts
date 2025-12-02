import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ditwah.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
  
  // Get all published missing persons
  const { data: persons } = await supabase
    .from('missing_persons')
    .select('id, updated_at, created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/report`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/found`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Dynamic person pages - critical for SEO
  const personPages: MetadataRoute.Sitemap = (persons || []).map((person: { id: string; updated_at: string | null; created_at: string }) => ({
    url: `${siteUrl}/person/${person.id}`,
    lastModified: new Date(person.updated_at || person.created_at),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...personPages]
}

