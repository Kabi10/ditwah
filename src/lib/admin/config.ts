// Admin configuration
// Add admin emails here to grant access to the admin dashboard

export const ADMIN_EMAILS = [
  'admin@ditwah.com',
  'kabilantharmaratnam@gmail.com', // Add your admin emails here
] as const

export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email as typeof ADMIN_EMAILS[number])
}

