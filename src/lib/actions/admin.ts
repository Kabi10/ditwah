'use server'

import { createClient, createAdminClient } from '@/lib/supabase/server'
import { isAdminEmail } from '@/lib/admin/config'
import { revalidatePath } from 'next/cache'

export async function checkAdminAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user || !isAdminEmail(user.email)) {
    return { isAdmin: false, user: null }
  }
  
  return { isAdmin: true, user }
}

export async function getAllMissingPersons(filter: 'all' | 'published' | 'unpublished' = 'all') {
  const auth = await checkAdminAuth()
  if (!auth.isAdmin) {
    return { data: [], error: 'Unauthorized' }
  }

  const adminClient = createAdminClient()
  
  let query = adminClient
    .from('missing_persons')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (filter === 'published') {
    query = query.eq('is_published', true)
  } else if (filter === 'unpublished') {
    query = query.eq('is_published', false)
  }
  
  const { data, error } = await query
  
  return { data: data || [], error: error?.message }
}

export async function togglePublishStatus(id: string, publish: boolean) {
  const auth = await checkAdminAuth()
  if (!auth.isAdmin) {
    return { success: false, error: 'Unauthorized' }
  }

  const adminClient = createAdminClient()
  
  const { error } = await adminClient
    .from('missing_persons')
    .update({ is_published: publish, updated_at: new Date().toISOString() })
    .eq('id', id)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin')
  revalidatePath('/')
  revalidatePath('/search')
  
  return { success: true }
}

export async function bulkPublish(ids: string[], publish: boolean) {
  const auth = await checkAdminAuth()
  if (!auth.isAdmin) {
    return { success: false, error: 'Unauthorized' }
  }

  const adminClient = createAdminClient()
  
  const { error } = await adminClient
    .from('missing_persons')
    .update({ is_published: publish, updated_at: new Date().toISOString() })
    .in('id', ids)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin')
  revalidatePath('/')
  revalidatePath('/search')
  
  return { success: true }
}

export async function deleteMissingPerson(id: string) {
  const auth = await checkAdminAuth()
  if (!auth.isAdmin) {
    return { success: false, error: 'Unauthorized' }
  }

  const adminClient = createAdminClient()
  
  const { error } = await adminClient
    .from('missing_persons')
    .delete()
    .eq('id', id)
  
  if (error) {
    return { success: false, error: error.message }
  }
  
  revalidatePath('/admin')
  revalidatePath('/')
  revalidatePath('/search')
  
  return { success: true }
}

export async function getAdminStats() {
  const auth = await checkAdminAuth()
  if (!auth.isAdmin) {
    return null
  }

  const adminClient = createAdminClient()
  
  const [totalResult, publishedResult, unpublishedResult, sightingsResult] = await Promise.all([
    adminClient.from('missing_persons').select('id', { count: 'exact', head: true }),
    adminClient.from('missing_persons').select('id', { count: 'exact', head: true }).eq('is_published', true),
    adminClient.from('missing_persons').select('id', { count: 'exact', head: true }).eq('is_published', false),
    adminClient.from('sightings').select('id', { count: 'exact', head: true }),
  ])
  
  return {
    total: totalResult.count || 0,
    published: publishedResult.count || 0,
    unpublished: unpublishedResult.count || 0,
    sightings: sightingsResult.count || 0,
  }
}

