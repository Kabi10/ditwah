import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const SUPPORTED_LOCALES = ['en', 'si', 'ta'] as const
const DEFAULT_LOCALE = 'en'
const LOCALE_COOKIE_NAME = 'NEXT_LOCALE'

/**
 * Detect preferred locale from browser Accept-Language header
 * Priority: Sinhala (si) > Tamil (ta) > English (en)
 * Based on Sri Lanka demographics: Sinhala 74%, Tamil 18%, English 10%
 */
function detectLocaleFromHeader(acceptLanguage: string | null): string {
  if (!acceptLanguage) return DEFAULT_LOCALE

  const lowerHeader = acceptLanguage.toLowerCase()

  // Check for Sinhala first (si, sin, sinhala)
  if (lowerHeader.includes('si') || lowerHeader.includes('sin')) {
    return 'si'
  }

  // Check for Tamil (ta, tam, tamil)
  if (lowerHeader.includes('ta') || lowerHeader.includes('tam')) {
    return 'ta'
  }

  // Default to English
  return DEFAULT_LOCALE
}

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Language auto-detection
  const existingLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value

  if (!existingLocale) {
    // No locale cookie set - detect from browser
    const acceptLanguage = request.headers.get('accept-language')
    const detectedLocale = detectLocaleFromHeader(acceptLanguage)

    // Set the locale cookie for future requests
    supabaseResponse.cookies.set(LOCALE_COOKIE_NAME, detectedLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired - required for Server Components
  await supabase.auth.getUser()

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

