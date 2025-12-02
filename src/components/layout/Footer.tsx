'use client'

import { useTranslations } from 'next-intl'
import { ExternalLink, Heart, Phone } from 'lucide-react'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Disclaimer */}
      <div className="bg-amber-900/50 border-t border-amber-700 py-3 px-4">
        <p className="max-w-7xl mx-auto text-center text-amber-200 text-sm">
          ⚠️ {t('disclaimer')}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Official Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('officialResources')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://donate.gov.lk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition"
                >
                  <ExternalLink className="w-3 h-3" />
                  Stand with Sri Lanka (Official Donations)
                </a>
              </li>
              <li>
                <a 
                  href="https://floodsupport.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition"
                >
                  <ExternalLink className="w-3 h-3" />
                  FloodSupport.org (Emergency SOS)
                </a>
              </li>
              <li>
                <a 
                  href="https://www.redcross.lk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition"
                >
                  <ExternalLink className="w-3 h-3" />
                  Sri Lanka Red Cross Society
                </a>
              </li>
              <li>
                <a 
                  href="https://familylinks.icrc.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition"
                >
                  <ExternalLink className="w-3 h-3" />
                  ICRC Family Links
                </a>
              </li>
            </ul>
          </div>

          {/* Emergency Numbers */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('emergencyNumbers')}</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-red-400" />
                <a href="tel:117" className="hover:text-white">117 - Emergency (24hr)</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-orange-400" />
                <a href="tel:+94112136136" className="hover:text-white">+94 112 136 136 - DMC General</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-orange-400" />
                <a href="tel:+94112136222" className="hover:text-white">+94 112 136 222 - DMC Emergency Ops</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3" />
                <a href="tel:119" className="hover:text-white">119 - Police</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3" />
                <a href="tel:110" className="hover:text-white">110 - Fire Brigade</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3" />
                <a href="tel:108" className="hover:text-white">108 - Ambulance</a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-white mb-4">About This Platform</h3>
            <p className="text-sm mb-4">
              This platform helps reunite families separated by Cyclone Ditwah. 
              It is a community coordination tool and not affiliated with any government agency.
            </p>
            <p className="text-sm">
              All data is publicly visible to enable rapid coordination during the crisis.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p className="flex items-center justify-center gap-1">
            {t('createdBy')} <Heart className="w-4 h-4 text-red-500" />
          </p>
          <p className="text-gray-500 mt-2">
            Cyclone Ditwah Missing Persons Registry | Sri Lanka 2025
          </p>
        </div>
      </div>
    </footer>
  )
}

