'use server'

import { createClient } from '@/lib/supabase/server'
import { v4 as uuidv4 } from 'uuid'

export async function reportMissingPerson(formData: FormData) {
  const supabase = await createClient()

  // Extract form data
  const full_name = formData.get('full_name') as string
  const age = formData.get('age') as string
  const gender = formData.get('gender') as string
  const physical_description = formData.get('physical_description') as string
  const last_seen_location = formData.get('last_seen_location') as string
  const district = formData.get('district') as string
  const last_seen_date = formData.get('last_seen_date') as string
  const reporter_name = formData.get('reporter_name') as string
  const reporter_phone = formData.get('reporter_phone') as string
  const reporter_email = formData.get('reporter_email') as string
  const reporter_relationship = formData.get('reporter_relationship') as string
  const photo = formData.get('photo') as File | null

  // Validate required fields
  if (!full_name || !district || !reporter_name || !reporter_phone) {
    return { success: false, message: 'Please fill in all required fields.' }
  }

  let photo_url: string | null = null

  // Upload photo if provided
  if (photo && photo.size > 0) {
    const fileExt = photo.name.split('.').pop()
    const fileName = `${uuidv4()}.${fileExt}`
    const filePath = `missing_persons/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('missing_persons_photos')
      .upload(filePath, photo, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Photo upload error:', uploadError)
      // Continue without photo rather than failing
    } else {
      const { data: urlData } = supabase.storage
        .from('missing_persons_photos')
        .getPublicUrl(filePath)
      photo_url = urlData.publicUrl
    }
  }

  // Insert missing person record
  const { error } = await supabase.from('missing_persons').insert({
    full_name,
    age: age ? parseInt(age) : null,
    gender: gender || null,
    physical_description: physical_description || null,
    photo_url,
    last_seen_location: last_seen_location || null,
    district,
    last_seen_date: last_seen_date || null,
    reporter_name,
    reporter_phone,
    reporter_email: reporter_email || null,
    reporter_relationship: reporter_relationship || null,
    status: 'missing',
    is_verified: false,
    is_published: true, // Auto-publish for rapid response during crisis
  })

  if (error) {
    console.error('Database error:', error)
    return { success: false, message: 'Failed to submit report. Please try again.' }
  }

  return { 
    success: true, 
    message: 'Report submitted successfully. Our team will review it shortly.' 
  }
}

export async function getMissingPerson(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('missing_persons')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .single()

  if (error) {
    return null
  }

  return data
}

export async function getSightings(personId: string) {
  const supabase = await createClient()
  
  const { data } = await supabase
    .from('sightings')
    .select('*')
    .eq('missing_person_id', personId)
    .order('created_at', { ascending: false })

  return data || []
}

