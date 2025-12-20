import RecoveryMap, { MapPoint } from '@/components/home/RecoveryMap'

export const metadata = {
    title: 'Consolidated Recovery Map (Embed) | Cyclone Ditwah',
    description: 'Unbranded interactive map of recovery resources and shelters.',
}

export default function EmbedMapPage() {
    // Mock points for initial integration test
    const points: MapPoint[] = [
        { id: '1', lat: 6.9271, lng: 79.8612, title: 'Colombo Main Relief Hub', type: 'shelter', description: 'Active distribution for dry rations and water.' },
        { id: '2', lat: 6.0367, lng: 80.2170, title: 'Galle Town Hall Shelter', type: 'shelter', description: 'Housing 200+ displaced persons. High medical need.' },
        { id: '3', lat: 6.4500, lng: 79.9833, title: 'Kalutara Mobile Aid', type: 'aid', description: 'Mobile health clinic active until 6 PM.' }
    ]

    return (
        <div className="h-screen w-screen bg-white">
            <RecoveryMap
                points={points}
                className="h-full w-full"
                center={[6.5, 80.2]} // Zoomed in to South-West area
                zoom={9}
            />
            {/* Absolute Attribution for Embed */}
            <div className="absolute top-2 right-2 z-[1000] bg-white/90 backdrop-blur px-2 py-1 rounded border shadow-sm text-[10px] font-bold text-slate-500">
                Provided by Cyclone Ditwah Recovery Hub
            </div>
        </div>
    )
}
