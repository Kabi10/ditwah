'use client'

import { useTransition, useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, Globe } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧', short: 'EN' },
  { code: 'si', name: 'සිංහල', flag: '🇱🇰', short: 'සිං' },
  { code: 'ta', name: 'தமிழ்', flag: '🇱🇰', short: 'தமி' },
]

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Get current locale from cookie or default to 'en'
  const [currentLocale, setCurrentLocale] = useState('en')

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const cookieLocale = document.cookie
      .split('; ')
      .find(row => row.startsWith('locale='))
      ?.split('=')[1]
    if (cookieLocale) {
      setCurrentLocale(cookieLocale)
    }
  }, [])

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    if (isMobile) return

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, isMobile])

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    } else if (event.key === 'ArrowDown' && !isOpen) {
      setIsOpen(true)
    }
  }

  const handleChange = (locale: string) => {
    setIsOpen(false)
    startTransition(() => {
      document.cookie = `locale=${locale};path=/;max-age=31536000`
      window.location.reload()
    })
  }

  const currentLang = languages.find(l => l.code === currentLocale) || languages[0]

  // Language option button - shared between mobile and desktop
  const LanguageOption = ({ lang, isMobileView }: { lang: typeof languages[0], isMobileView: boolean }) => (
    <button
      onClick={() => handleChange(lang.code)}
      className={`
        w-full flex items-center gap-4 text-left transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset
        ${isMobileView
          ? 'px-4 py-4 min-h-[56px] active:scale-[0.98]'
          : 'px-4 py-3 min-h-[44px] hover:bg-gray-50'
        }
        ${lang.code === currentLocale
          ? 'bg-blue-50 text-blue-700'
          : 'hover:bg-gray-50 active:bg-gray-100'
        }
      `}
      disabled={isPending}
      role="option"
      aria-selected={lang.code === currentLocale}
    >
      <span className={`${isMobileView ? 'text-2xl' : 'text-xl'}`}>{lang.flag}</span>
      <span className={`font-medium flex-1 ${isMobileView ? 'text-base' : 'text-sm'}`}>
        {lang.name}
      </span>
      {lang.code === currentLocale && (
        <Check className={`text-blue-600 ${isMobileView ? 'w-6 h-6' : 'w-5 h-5'}`} />
      )}
    </button>
  )

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button - responsive sizing */}
      <button
        className={`
          flex items-center justify-center gap-1.5
          text-gray-600 hover:text-gray-900 hover:bg-gray-100
          rounded-lg transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
          active:scale-95 active:bg-gray-200
          min-w-[44px] min-h-[44px]
          px-2 py-2 md:px-3 md:py-2
        `}
        disabled={isPending}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Language: ${currentLang.name}. Click to change language.`}
      >
        <span className="text-lg md:text-base">{currentLang.flag}</span>
        <span className="text-sm font-medium hidden sm:inline">{currentLang.short}</span>
        <ChevronDown
          className={`w-4 h-4 md:w-3 md:h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Mobile: Bottom Sheet */}
      {isMobile && (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="bottom" className="rounded-t-2xl px-0 pb-8">
            <SheetHeader className="px-4 pb-2">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-gray-500" />
                <SheetTitle>Select Language</SheetTitle>
              </div>
              <SheetDescription>
                Choose your preferred language
              </SheetDescription>
            </SheetHeader>

            <div
              className="flex flex-col divide-y divide-gray-100"
              role="listbox"
              aria-label="Select language"
            >
              {languages.map((lang) => (
                <LanguageOption key={lang.code} lang={lang} isMobileView={true} />
              ))}
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Desktop: Dropdown */}
      {!isMobile && isOpen && (
        <div
          className={`
            absolute right-0 mt-2 w-48
            bg-white border border-gray-200 rounded-xl
            shadow-lg shadow-gray-200/50
            z-50 py-1 overflow-hidden
            animate-in fade-in-0 zoom-in-95 slide-in-from-top-2
            duration-200
          `}
          role="listbox"
          aria-label="Select language"
        >
          {languages.map((lang) => (
            <LanguageOption key={lang.code} lang={lang} isMobileView={false} />
          ))}
        </div>
      )}
    </div>
  )
}
