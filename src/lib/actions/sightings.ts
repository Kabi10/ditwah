'use server'

import { createClient } from '@/lib/supabase/server'

export async function reportSighting(formData: FormData) {
  const supabase = await createClient()

  const missing_person_id = formData.get('missing_person_id') as string
  const location = formData.get('location') as string
  const district = formData.get('district') as string
  const sighting_date = formData.get('sighting_date') as string
  const description = formData.get('description') as string
  const reporter_name = formData.get('reporter_name') as string
  const reporter_phone = formData.get('reporter_phone') as string

  // Validate required fields
  if (!missing_person_id || !location || !district || !sighting_date || !reporter_name || !reporter_phone) {
    return { success: false, message: 'Please fill in all required fields.' }
  }

  // Insert sighting record
  const { error } = await supabase.from('sightings').insert({
    missing_person_id,
    location,
    district,
    sighting_date,
    description: description || null,
    reporter_name,
    reporter_phone,
  })

  if (error) {
    console.error('Database error:', error)
    return { success: false, message: 'Failed to submit sighting. Please try again.' }
  }

  return { 
    success: true, 
    message: 'Sighting report submitted. Thank you for your help!' 
  }
}

export async function reportAbuse(formData: FormData) {
  const supabase = await createClient()

  const missing_person_id = formData.get('missing_person_id') as string
  const reason = formData.get('reason') as string
  const description = formData.get('description') as string
  const reporter_contact = formData.get('reporter_contact') as string

  if (!missing_person_id || !reason) {
    return { success: false, message: 'Please provide a reason for the report.' }
  }

  const { error } = await supabase.from('abuse_reports').insert({
    missing_person_id,
    reason,
    description: description || null,
    reporter_contact: reporter_contact || null,
  })

  if (error) {
    console.error('Database error:', error)
    return { success: false, message: 'Failed to submit report. Please try again.' }
  }

  return { 
    success: true, 
    message: 'Thank you for your report. We will review it shortly.' 
  }
}

