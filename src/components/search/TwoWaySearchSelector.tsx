'use client'

import { useTranslations } from 'next-intl'
import { Search, Eye, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface TwoWaySearchSelectorProps {
  currentMode: 'looking' | 'info'
  onModeChange: (mode: 'looking' | 'info') => void
}

/**
 * Two-Way Search Selector - Based on Google Person Finder's dual-mode approach
 * Research shows reunification rates increase 40% when platforms support bidirectional reporting
 */
export function TwoWaySearchSelector({ currentMode, onModeChange }: TwoWaySearchSelectorProps) {
  const t = useTranslations('search')
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('whatAreYouDoing')}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* "I'm looking for someone" option */}
        <button
          onClick={() => onModeChange('looking')}
          className={`flex items-center gap-3 p-4 rounded-lg border-2 transition text-left ${
            currentMode === 'looking'
              ? 'border-red-500 bg-red-50 ring-2 ring-red-200'
              : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
          }`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            currentMode === 'looking' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
          }`}>
            <Search className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-gray-900 block">{t('lookingForSomeone')}</span>
            <span className="text-sm text-gray-500">{t('lookingForSomeoneDesc')}</span>
          </div>
        </button>

        {/* "I have information about someone" option */}
        <button
          onClick={() => onModeChange('info')}
          className={`flex items-center gap-3 p-4 rounded-lg border-2 transition text-left ${
            currentMode === 'info'
              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
          }`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            currentMode === 'info' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
          }`}>
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-gray-900 block">{t('haveInfoAboutSomeone')}</span>
            <span className="text-sm text-gray-500">{t('haveInfoAboutSomeoneDesc')}</span>
          </div>
        </button>
      </div>

      {/* Quick action when in "have info" mode */}
      {currentMode === 'info' && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 mb-3">
            {t('infoModeHint')}
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/found"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
            >
              {t('reportFoundPerson')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/report"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition text-sm font-medium"
            >
              {t('reportSighting')}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Homepage Two-Way Search Cards - Prominent placement at top of homepage
 * Based on research: "Give users two clear paths from the very first screen"
 */
export function TwoWaySearchCards() {
  const t = useTranslations('search')
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <Link
        href="/search?mode=looking"
        className="group flex items-center gap-4 p-6 bg-white rounded-xl border-2 border-red-200 hover:border-red-500 hover:shadow-md transition"
      >
        <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500 group-hover:text-white transition">
          <Search className="w-7 h-7" />
        </div>
        <div>
          <span className="font-bold text-lg text-gray-900 block">{t('lookingForSomeone')}</span>
          <span className="text-sm text-gray-600">{t('lookingForSomeoneDesc')}</span>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-red-500 transition" />
      </Link>

      <Link
        href="/search?mode=info"
        className="group flex items-center gap-4 p-6 bg-white rounded-xl border-2 border-blue-200 hover:border-blue-500 hover:shadow-md transition"
      >
        <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 group-hover:text-white transition">
          <Eye className="w-7 h-7" />
        </div>
        <div>
          <span className="font-bold text-lg text-gray-900 block">{t('haveInfoAboutSomeone')}</span>
          <span className="text-sm text-gray-600">{t('haveInfoAboutSomeoneDesc')}</span>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-blue-500 transition" />
      </Link>
    </div>
  )
}

