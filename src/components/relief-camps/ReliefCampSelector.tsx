'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { MapPin, Phone, Users, Navigation, ChevronDown, Building, CheckCircle2, AlertCircle, XCircle } from 'lucide-react'
import type { ReliefCamp } from '@/app/relief-camps/page'

interface ReliefCampSelectorProps {
  camps: ReliefCamp[]
}

export function ReliefCampSelector({ camps }: ReliefCampSelectorProps) {
  const t = useTranslations('reliefCamps')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')
  const [selectedCamp, setSelectedCamp] = useState<ReliefCamp | null>(null)
  
  // Get unique districts
  const districts = useMemo(() => {
    const uniqueDistricts = [...new Set(camps.map(c => c.district))]
    return uniqueDistricts.sort()
  }, [camps])
  
  // Filter camps by district
  const filteredCamps = useMemo(() => {
    if (!selectedDistrict) return []
    return camps.filter(c => c.district === selectedDistrict)
  }, [camps, selectedDistrict])
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"><CheckCircle2 className="w-3 h-3" />{t('campStatus.open')}</span>
      case 'limited':
        return <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium"><AlertCircle className="w-3 h-3" />{t('campStatus.limited')}</span>
      case 'full':
        return <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium"><XCircle className="w-3 h-3" />{t('campStatus.full')}</span>
      default:
        return null
    }
  }
  
  const getOccupancyPercent = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100)
  }
  
  return (
    <div className="space-y-6">
      {/* District Dropdown */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('selectDistrict')}
        </label>
        <div className="relative">
          <select
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value)
              setSelectedCamp(null)
            }}
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('chooseDistrict')}</option>
            {districts.map(district => (
              <option key={district} value={district}>
                {district} ({camps.filter(c => c.district === district).length} {t('camps')})
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>
      
      {/* Camp Dropdown - Only shows when district selected */}
      {selectedDistrict && (
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('selectCamp')}
          </label>
          <div className="relative">
            <select
              value={selectedCamp?.id || ''}
              onChange={(e) => {
                const camp = filteredCamps.find(c => c.id === e.target.value)
                setSelectedCamp(camp || null)
              }}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">{t('chooseCamp')}</option>
              {filteredCamps.map(camp => (
                <option key={camp.id} value={camp.id}>
                  {camp.name} - {camp.address}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      )}
      
      {/* Camp Details Card */}
      {selectedCamp && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-blue-50 border-b border-blue-100">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedCamp.name}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  {selectedCamp.address}
                </p>
              </div>
              {getStatusBadge(selectedCamp.status)}
            </div>
          </div>
          
          {/* Details */}
          <div className="p-4 space-y-4">
            {/* Capacity Bar */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{t('occupancy')}</span>
                <span className="font-medium">{selectedCamp.currentOccupancy} / {selectedCamp.capacity}</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    getOccupancyPercent(selectedCamp.currentOccupancy, selectedCamp.capacity) > 90 
                      ? 'bg-red-500' 
                      : getOccupancyPercent(selectedCamp.currentOccupancy, selectedCamp.capacity) > 70 
                        ? 'bg-amber-500' 
                        : 'bg-green-500'
                  }`}
                  style={{ width: `${getOccupancyPercent(selectedCamp.currentOccupancy, selectedCamp.capacity)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {getOccupancyPercent(selectedCamp.currentOccupancy, selectedCamp.capacity)}% {t('occupied')}
              </p>
            </div>
            
            {/* Facilities */}
            <div>
              <p className="text-sm text-gray-600 mb-2">{t('facilities')}</p>
              <div className="flex flex-wrap gap-2">
                {selectedCamp.facilities.map(facility => (
                  <span key={facility} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {facility}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {selectedCamp.phone && (
                <a
                  href={`tel:${selectedCamp.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                >
                  <Phone className="w-5 h-5" />
                  {t('callCamp')}
                </a>
              )}
              {selectedCamp.googleMapsUrl && (
                <a
                  href={selectedCamp.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  <Navigation className="w-5 h-5" />
                  {t('getDirections')}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Quick list of all camps in district */}
      {selectedDistrict && !selectedCamp && filteredCamps.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">{t('allCampsIn')} {selectedDistrict}</h3>
          <div className="space-y-2">
            {filteredCamps.map(camp => (
              <button
                key={camp.id}
                onClick={() => setSelectedCamp(camp)}
                className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{camp.name}</p>
                    <p className="text-sm text-gray-500">{camp.address}</p>
                  </div>
                  {getStatusBadge(camp.status)}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

