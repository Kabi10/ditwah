'use client'

import { createClient } from '@/lib/supabase/client'

export async function submitRecoveryIntel(formData: {
    reporter_name: string
    reporter_phone: string
    intel_type: string
    district: string
    location_details: string
    description: string
}) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('recovery_intel')
        .insert([formData])
        .select()

    if (error) {
        console.error('Error submitting recovery intel:', error)
        return { success: false, error }
    }

    return { success: true, data }
}
