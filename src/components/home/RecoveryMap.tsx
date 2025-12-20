'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'

// Dynamic import for react-leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false })

export interface MapPoint {
    id: string
    lat: number
    lng: number
    title: string
    type: 'shelter' | 'aid' | 'hazard' | 'sighting'
    description?: string
}

interface RecoveryMapProps {
    points?: MapPoint[]
    center?: [number, number]
    zoom?: number
    className?: string
}

export default function RecoveryMap({
    points = [],
    center = [7.8731, 80.7718], // Sri Lanka center
    zoom = 7,
    className = "h-[500px] w-full rounded-2xl overflow-hidden shadow-inner border"
}: RecoveryMapProps) {
    const [isMounted, setIsMounted] = useState(false)
    const [L, setL] = useState<any>(null)

    useEffect(() => {
        setIsMounted(true)
        // Import leaflet directly for icon configuration
        import('leaflet').then((leaflet) => {
            setL(leaflet)
            // Fix default marker icon issues in Leaflet with Webpack/Next.js
            delete (leaflet.Icon.Default.prototype as any)._getIconUrl
            leaflet.Icon.Default.mergeOptions({
                iconRetinaUrl: '/marker-icon-2x.png',
                iconUrl: '/marker-icon.png',
                shadowUrl: '/marker-shadow.png',
            })
        })
    }, [])

    if (!isMounted || !L) {
        return (
            <div className={`${className} bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 font-medium`}>
                Loading Recovery Map...
            </div>
        )
    }

    const getIconColor = (type: string) => {
        switch (type) {
            case 'shelter': return 'text-green-600'
            case 'aid': return 'text-blue-600'
            case 'hazard': return 'text-red-600'
            default: return 'text-orange-600'
        }
    }

    return (
        <div className={className}>
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={false}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {points.map((point) => (
                    <Marker key={point.id} position={[point.lat, point.lng]}>
                        <Popup>
                            <div className="p-1">
                                <h3 className="font-bold text-sm mb-1">{point.title}</h3>
                                <p className="text-xs text-slate-600 leading-tight">{point.description}</p>
                                <div className={`mt-2 text-[10px] font-bold uppercase tracking-wider ${getIconColor(point.type)}`}>
                                    {point.type}
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}
