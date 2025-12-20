'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Search, UserPlus, CheckCircle, Menu, X, Heart, Tent, Phone } from 'lucide-react'
import { useState } from 'react'
import { LanguageSwitcher } from './LanguageSwitcher'

// Navigation link component with active state detection
function NavLink({
  href,
  children,
  className,
  activeClassName,
  onClick,
}: {
  href: string
  children: React.ReactNode
  className: string
  activeClassName: string
  onClick?: () => void
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? activeClassName : ''}`}
      aria-current={isActive ? 'page' : undefined}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

export function Header() {
  const t = useTranslations('nav')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Base styles for different link types
  const textLinkBase = "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
  const textLinkInactive = "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
  const textLinkActive = "text-gray-900 bg-gray-100 font-medium"

  const buttonBase = "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
          >
            <div>
              <div className="font-bold text-gray-900 text-sm leading-tight">Cyclone Ditwah</div>
              <div className="text-xs text-gray-500">Disaster Relief Platform</div>
            </div>
          </Link>

          {/* Desktop Navigation - Grouped logically */}
          <nav className="hidden lg:flex items-center" aria-label="Main navigation">
            {/* Group 1: Information/Browse */}
            <div className="flex items-center gap-1">
              <NavLink
                href="/search"
                className={`${textLinkBase} ${textLinkInactive}`}
                activeClassName={textLinkActive}
              >
                <Search className="w-4 h-4" />
                {t('search')}
              </NavLink>
              <NavLink
                href="/relief-camps"
                className={`${textLinkBase} ${textLinkInactive}`}
                activeClassName={textLinkActive}
              >
                <Tent className="w-4 h-4" />
                {t('reliefCamps')}
              </NavLink>
              <NavLink
                href="/emergency-contacts"
                className={`${textLinkBase} ${textLinkInactive}`}
                activeClassName={textLinkActive}
              >
                <Phone className="w-4 h-4" />
                Emergency
              </NavLink>
            </div>

            {/* Separator */}
            <div className="w-px h-6 bg-gray-200 mx-3" aria-hidden="true" />

            {/* Group 2: Primary CTA - Donate */}
            <NavLink
              href="/donate"
              className={`${buttonBase} bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500`}
              activeClassName="ring-2 ring-green-300 ring-offset-1"
            >
              <Heart className="w-4 h-4" />
              {t('donate')}
            </NavLink>

            {/* Separator */}
            <div className="w-px h-6 bg-gray-200 mx-3" aria-hidden="true" />

            {/* Group 3: Missing Persons Actions */}
            <div className="flex items-center gap-2">
              <NavLink
                href="/report"
                className={`${buttonBase} bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500`}
                activeClassName="ring-2 ring-red-300 ring-offset-1"
              >
                <UserPlus className="w-4 h-4" />
                {t('report')}
              </NavLink>
              <NavLink
                href="/found"
                className={`${buttonBase} bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500`}
                activeClassName="ring-2 ring-blue-300 ring-offset-1"
              >
                <CheckCircle className="w-4 h-4" />
                {t('found')}
              </NavLink>
              <NavLink
                href="/im-safe"
                className={`${buttonBase} bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500`}
                activeClassName="ring-2 ring-indigo-300 ring-offset-1"
              >
                <CheckCircle className="w-4 h-4" />
                I am Safe
              </NavLink>
            </div>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            {/* Mobile menu button - 44x44px touch target */}
            <button
              className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md hover:bg-gray-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - 44px min touch targets */}
        {isMenuOpen && (
          <nav
            id="mobile-menu"
            className="lg:hidden py-4 border-t"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1">
              {/* Information Section */}
              <div className="px-4 py-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {t('browse')}
                </span>
              </div>
              <NavLink
                href="/emergency-contacts"
                className="flex items-center gap-3 px-4 py-3 min-h-[44px] text-red-600 bg-red-50 hover:bg-red-100 rounded-lg active:bg-red-200 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500"
                activeClassName="bg-red-100 font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="w-5 h-5" />
                <span className="text-base font-bold">EMERGENCY HOTLINES</span>
              </NavLink>
              <NavLink
                href="/search"
                className="flex items-center gap-3 px-4 py-3 min-h-[44px] text-gray-700 hover:bg-gray-100 rounded-lg active:bg-gray-200 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
                activeClassName="bg-gray-100 font-semibold text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="w-5 h-5" />
                <span className="text-base font-medium">{t('search')}</span>
              </NavLink>
              <NavLink
                href="/relief-camps"
                className="flex items-center gap-3 px-4 py-3 min-h-[44px] text-gray-700 hover:bg-gray-100 rounded-lg active:bg-gray-200 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
                activeClassName="bg-gray-100 font-semibold text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                <Tent className="w-5 h-5" />
                <span className="text-base font-medium">{t('reliefCamps')}</span>
              </NavLink>

              {/* Separator */}
              <div className="h-px bg-gray-200 my-2 mx-4" aria-hidden="true" />

              {/* Actions Section */}
              <div className="px-4 py-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {t('actions')}
                </span>
              </div>
              <NavLink
                href="/donate"
                className="flex items-center gap-3 px-4 py-3 min-h-[44px] text-white bg-green-600 hover:bg-green-700 rounded-lg active:bg-green-800 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-300"
                activeClassName="ring-2 ring-green-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="w-5 h-5" />
                <span className="text-base font-medium">{t('donate')}</span>
              </NavLink>
              <NavLink
                href="/report"
                className="flex items-center gap-3 px-4 py-3 min-h-[44px] text-white bg-red-600 hover:bg-red-700 rounded-lg active:bg-red-800 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-300"
                activeClassName="ring-2 ring-red-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserPlus className="w-5 h-5" />
                <span className="text-base font-medium">{t('report')}</span>
              </NavLink>
              <NavLink
                href="/found"
                className="flex items-center gap-3 px-4 py-3 min-h-[44px] text-white bg-blue-600 hover:bg-blue-700 rounded-lg active:bg-blue-800 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-300"
                activeClassName="ring-2 ring-blue-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <CheckCircle className="w-5 h-5" />
                <span className="text-base font-medium">{t('found')}</span>
              </NavLink>
              <NavLink
                href="/im-safe"
                className="flex items-center gap-3 px-4 py-3 min-h-[44px] text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg active:bg-indigo-800 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-300"
                activeClassName="ring-2 ring-indigo-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <CheckCircle className="w-5 h-5" />
                <span className="text-base font-medium">I am Safe</span>
              </NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

