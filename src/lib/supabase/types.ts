export type MissingPerson = {
  id: string
  created_at: string
  updated_at: string
  
  // Person details
  full_name: string
  age: number | null
  gender: 'male' | 'female' | 'other' | null
  photo_url: string | null
  physical_description: string | null
  
  // Last known location
  last_seen_location: string
  last_seen_date: string
  district: string
  landmark: string | null
  latitude: number | null
  longitude: number | null
  
  // Contact info for reporter
  reporter_name: string
  reporter_phone: string
  reporter_email: string | null
  reporter_relationship: string | null
  
  // Status
  status: 'missing' | 'found' | 'deceased'
  status_updated_at: string | null
  found_location: string | null
  found_date: string | null
  
  // Moderation
  is_verified: boolean
  is_published: boolean
  notes: string | null
}

export type Sighting = {
  id: string
  created_at: string
  missing_person_id: string
  
  // Sighting details
  location: string
  district: string
  sighting_date: string
  description: string | null
  
  // Reporter
  reporter_name: string
  reporter_phone: string
  
  // Status
  is_verified: boolean
}

export type AbuseReport = {
  id: string
  created_at: string
  missing_person_id: string | null
  sighting_id: string | null
  
  reason: string
  description: string | null
  reporter_email: string | null
  
  status: 'pending' | 'reviewed' | 'resolved'
}

export const DISTRICTS = [
  'Ampara',
  'Anuradhapura', 
  'Badulla',
  'Batticaloa',
  'Colombo',
  'Galle',
  'Gampaha',
  'Hambantota',
  'Jaffna',
  'Kalutara',
  'Kandy',
  'Kegalle',
  'Kilinochchi',
  'Kurunegala',
  'Mannar',
  'Matale',
  'Matara',
  'Moneragala',
  'Mullaitivu',
  'Nuwara Eliya',
  'Polonnaruwa',
  'Puttalam',
  'Ratnapura',
  'Trincomalee',
  'Vavuniya'
] as const

export type District = typeof DISTRICTS[number]

