'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Search, UserPlus, CheckCircle, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const t = useTranslations('nav')
  const tSite = useTranslations('site')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-gray-900">ditwah.com</div>
              <div className="text-xs text-gray-500">{tSite('subtitle')}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/search" 
              className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition"
            >
              <Search className="w-4 h-4" />
              {t('search')}
            </Link>
            <Link 
              href="/report" 
              className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition"
            >
              <UserPlus className="w-4 h-4" />
              {t('report')}
            </Link>
            <Link 
              href="/found" 
              className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition"
            >
              <CheckCircle className="w-4 h-4" />
              {t('found')}
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            
            {/* Mobile menu button - 44x44px touch target */}
            <button
              className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - 44px min touch targets */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t" aria-label="Mobile navigation">
            <div className="flex flex-col gap-1">
              <Link
                href="/search"
                className="flex items-center gap-3 px-4 py-3 min-h-[44px] text-gray-700 hover:bg-gray-100 rounded-lg active:bg-gray-200 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="w-5 h-5" />
                <span className="text-base font-medium">{t('search')}</span>
              </Link>
              <Link
                href="/report"
                className="flex items-center gap-3 px-4 py-3 min-h-[44px] text-white bg-red-600 hover:bg-red-700 rounded-lg active:bg-red-800 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserPlus className="w-5 h-5" />
                <span className="text-base font-medium">{t('report')}</span>
              </Link>
              <Link
                href="/found"
                className="flex items-center gap-3 px-4 py-3 min-h-[44px] text-gray-700 hover:bg-gray-100 rounded-lg active:bg-gray-200 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <CheckCircle className="w-5 h-5" />
                <span className="text-base font-medium">{t('found')}</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

