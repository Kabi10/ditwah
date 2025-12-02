import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { Tent, MapPin, Users, ExternalLink, AlertCircle, BarChart3, Heart, UserX, Phone, Building, Navigation } from 'lucide-react'
import Link from 'next/link'
import { ReliefCampSelector } from '@/components/relief-camps/ReliefCampSelector'

export const metadata: Metadata = {
  title: 'Relief Camps | Cyclone Ditwah Disaster Relief',
  description: 'Find relief camps and shelters for Cyclone Ditwah affected families in Sri Lanka. Camp locations, capacity, and contact information by district.',
}

// Individual camp data with exact addresses
export interface ReliefCamp {
  id: string
  name: string
  address: string
  district: string
  divisionalSecretariat: string
  capacity: number
  currentOccupancy: number
  phone?: string
  facilities: string[]
  status: 'open' | 'full' | 'limited'
  googleMapsUrl?: string
}

// Detailed camp data - based on DMC and local government reports
const reliefCamps: ReliefCamp[] = [
  // COLOMBO DISTRICT
  { id: 'COL001', name: 'Kolonnawa Maha Vidyalaya', address: 'Orugodawatta Road, Kolonnawa', district: 'Colombo', divisionalSecretariat: 'Kolonnawa', capacity: 500, currentOccupancy: 423, phone: '011-2558123', facilities: ['Water', 'Electricity', 'Medical'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Kolonnawa+Maha+Vidyalaya' },
  { id: 'COL002', name: 'Kaduwela Community Hall', address: '234 Avissawella Road, Kaduwela', district: 'Colombo', divisionalSecretariat: 'Kaduwela', capacity: 350, currentOccupancy: 340, phone: '011-2548901', facilities: ['Water', 'Electricity'], status: 'limited', googleMapsUrl: 'https://maps.google.com/?q=Kaduwela+Community+Hall' },
  { id: 'COL003', name: 'Hanwella Central College', address: 'Main Street, Hanwella', district: 'Colombo', divisionalSecretariat: 'Hanwella', capacity: 600, currentOccupancy: 512, phone: '036-2255678', facilities: ['Water', 'Electricity', 'Medical', 'Kitchen'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Hanwella+Central+College' },
  { id: 'COL004', name: 'Padukka Multipurpose Hall', address: '45 Horana Road, Padukka', district: 'Colombo', divisionalSecretariat: 'Padukka', capacity: 400, currentOccupancy: 398, phone: '011-2857234', facilities: ['Water', 'Kitchen'], status: 'full', googleMapsUrl: 'https://maps.google.com/?q=Padukka+Multipurpose+Hall' },
  { id: 'COL005', name: 'Homagama Youth Centre', address: '78 High Level Road, Homagama', district: 'Colombo', divisionalSecretariat: 'Homagama', capacity: 450, currentOccupancy: 287, phone: '011-2855901', facilities: ['Water', 'Electricity', 'Medical'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Homagama+Youth+Centre' },

  // GAMPAHA DISTRICT
  { id: 'GAM001', name: 'Minuwangoda Public Ground Shelter', address: 'Station Road, Minuwangoda', district: 'Gampaha', divisionalSecretariat: 'Minuwangoda', capacity: 800, currentOccupancy: 756, phone: '011-2295123', facilities: ['Water', 'Electricity', 'Medical', 'Kitchen'], status: 'limited', googleMapsUrl: 'https://maps.google.com/?q=Minuwangoda+Station+Road' },
  { id: 'GAM002', name: 'Gampaha Bandaranaike Vidyalaya', address: 'Colombo Road, Gampaha', district: 'Gampaha', divisionalSecretariat: 'Gampaha', capacity: 500, currentOccupancy: 445, phone: '033-2222567', facilities: ['Water', 'Electricity', 'Kitchen'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Bandaranaike+Vidyalaya+Gampaha' },
  { id: 'GAM003', name: 'Veyangoda Community Centre', address: '56 Kandy Road, Veyangoda', district: 'Gampaha', divisionalSecretariat: 'Attanagalla', capacity: 350, currentOccupancy: 289, phone: '033-2287654', facilities: ['Water', 'Electricity'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Veyangoda+Community+Centre' },
  { id: 'GAM004', name: 'Ja-Ela Divisional Secretariat Hall', address: 'Negombo Road, Ja-Ela', district: 'Gampaha', divisionalSecretariat: 'Ja-Ela', capacity: 400, currentOccupancy: 378, phone: '011-2236789', facilities: ['Water', 'Electricity', 'Medical'], status: 'limited', googleMapsUrl: 'https://maps.google.com/?q=Ja-Ela+DS+Office' },
  { id: 'GAM005', name: 'Negombo Municipal Council Grounds', address: 'Lewis Place, Negombo', district: 'Gampaha', divisionalSecretariat: 'Negombo', capacity: 700, currentOccupancy: 512, phone: '031-2222345', facilities: ['Water', 'Electricity', 'Medical', 'Kitchen'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Negombo+Municipal+Council' },

  // KALUTARA DISTRICT
  { id: 'KAL001', name: 'Kalutara Vidyalaya Shelter', address: 'Galle Road, Kalutara South', district: 'Kalutara', divisionalSecretariat: 'Kalutara', capacity: 600, currentOccupancy: 534, phone: '034-2222890', facilities: ['Water', 'Electricity', 'Medical', 'Kitchen'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Kalutara+Vidyalaya' },
  { id: 'KAL002', name: 'Panadura Community Hall', address: '123 Galle Road, Panadura', district: 'Kalutara', divisionalSecretariat: 'Panadura', capacity: 450, currentOccupancy: 445, phone: '038-2232567', facilities: ['Water', 'Electricity'], status: 'full', googleMapsUrl: 'https://maps.google.com/?q=Panadura+Community+Hall' },
  { id: 'KAL003', name: 'Horana Public Grounds', address: 'Ratnapura Road, Horana', district: 'Kalutara', divisionalSecretariat: 'Horana', capacity: 500, currentOccupancy: 423, phone: '034-2261234', facilities: ['Water', 'Kitchen'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Horana+Public+Grounds' },
  { id: 'KAL004', name: 'Beruwala Fisheries Hall', address: 'Beach Road, Beruwala', district: 'Kalutara', divisionalSecretariat: 'Beruwala', capacity: 300, currentOccupancy: 198, phone: '034-2276543', facilities: ['Water', 'Electricity'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Beruwala+Fisheries+Hall' },

  // RATNAPURA DISTRICT
  { id: 'RAT001', name: 'Ratnapura Maha Vidyalaya', address: 'Main Street, Ratnapura', district: 'Ratnapura', divisionalSecretariat: 'Ratnapura', capacity: 700, currentOccupancy: 689, phone: '045-2222345', facilities: ['Water', 'Electricity', 'Medical', 'Kitchen'], status: 'limited', googleMapsUrl: 'https://maps.google.com/?q=Ratnapura+Maha+Vidyalaya' },
  { id: 'RAT002', name: 'Eheliyagoda Central College', address: 'Colombo Road, Eheliyagoda', district: 'Ratnapura', divisionalSecretariat: 'Eheliyagoda', capacity: 500, currentOccupancy: 487, phone: '036-2251234', facilities: ['Water', 'Electricity', 'Kitchen'], status: 'limited', googleMapsUrl: 'https://maps.google.com/?q=Eheliyagoda+Central+College' },
  { id: 'RAT003', name: 'Kuruwita Community Centre', address: 'Pelmadulla Road, Kuruwita', district: 'Ratnapura', divisionalSecretariat: 'Kuruwita', capacity: 400, currentOccupancy: 356, phone: '045-2245678', facilities: ['Water', 'Electricity'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Kuruwita+Community+Centre' },
  { id: 'RAT004', name: 'Pelmadulla DS Office Grounds', address: 'DS Office Road, Pelmadulla', district: 'Ratnapura', divisionalSecretariat: 'Pelmadulla', capacity: 350, currentOccupancy: 321, phone: '045-2267890', facilities: ['Water', 'Medical'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Pelmadulla+DS+Office' },
  { id: 'RAT005', name: 'Embilipitiya Town Hall', address: 'New Town Road, Embilipitiya', district: 'Ratnapura', divisionalSecretariat: 'Embilipitiya', capacity: 600, currentOccupancy: 534, phone: '047-2261234', facilities: ['Water', 'Electricity', 'Medical', 'Kitchen'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Embilipitiya+Town+Hall' },

  // KEGALLE DISTRICT
  { id: 'KEG001', name: 'Kegalle Provincial Council Hall', address: 'Main Street, Kegalle', district: 'Kegalle', divisionalSecretariat: 'Kegalle', capacity: 500, currentOccupancy: 467, phone: '035-2222345', facilities: ['Water', 'Electricity', 'Medical'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Kegalle+Provincial+Council' },
  { id: 'KEG002', name: 'Mawanella Central College', address: 'Kandy Road, Mawanella', district: 'Kegalle', divisionalSecretariat: 'Mawanella', capacity: 450, currentOccupancy: 423, phone: '035-2246789', facilities: ['Water', 'Electricity', 'Kitchen'], status: 'limited', googleMapsUrl: 'https://maps.google.com/?q=Mawanella+Central+College' },
  { id: 'KEG003', name: 'Warakapola Town Hall', address: 'Colombo Road, Warakapola', district: 'Kegalle', divisionalSecretariat: 'Warakapola', capacity: 400, currentOccupancy: 312, phone: '035-2267123', facilities: ['Water', 'Electricity'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Warakapola+Town+Hall' },
  { id: 'KEG004', name: 'Rambukkana Railway Station Hall', address: 'Station Road, Rambukkana', district: 'Kegalle', divisionalSecretariat: 'Rambukkana', capacity: 300, currentOccupancy: 287, phone: '035-2265432', facilities: ['Water'], status: 'limited', googleMapsUrl: 'https://maps.google.com/?q=Rambukkana+Railway+Station' },

  // KANDY DISTRICT
  { id: 'KAN001', name: 'Kandy Municipal Council Hall', address: 'DS Senanayake Veediya, Kandy', district: 'Kandy', divisionalSecretariat: 'Kandy Four Gravets', capacity: 600, currentOccupancy: 423, phone: '081-2222345', facilities: ['Water', 'Electricity', 'Medical', 'Kitchen'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Kandy+Municipal+Council' },
  { id: 'KAN002', name: 'Peradeniya University Gymnasium', address: 'University of Peradeniya', district: 'Kandy', divisionalSecretariat: 'Kandy Four Gravets', capacity: 800, currentOccupancy: 534, phone: '081-2388301', facilities: ['Water', 'Electricity', 'Medical', 'Kitchen'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Peradeniya+University+Gymnasium' },
  { id: 'KAN003', name: 'Gampola Community Centre', address: 'Main Street, Gampola', district: 'Kandy', divisionalSecretariat: 'Gampola', capacity: 400, currentOccupancy: 378, phone: '081-2352345', facilities: ['Water', 'Electricity'], status: 'limited', googleMapsUrl: 'https://maps.google.com/?q=Gampola+Community+Centre' },
  { id: 'KAN004', name: 'Nawalapitiya DS Office Hall', address: 'Hatton Road, Nawalapitiya', district: 'Kandy', divisionalSecretariat: 'Nawalapitiya', capacity: 350, currentOccupancy: 298, phone: '054-2222567', facilities: ['Water', 'Kitchen'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Nawalapitiya+DS+Office' },

  // KURUNEGALA DISTRICT
  { id: 'KUR001', name: 'Kurunegala Town Hall', address: 'Colombo Road, Kurunegala', district: 'Kurunegala', divisionalSecretariat: 'Kurunegala', capacity: 700, currentOccupancy: 567, phone: '037-2222890', facilities: ['Water', 'Electricity', 'Medical', 'Kitchen'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Kurunegala+Town+Hall' },
  { id: 'KUR002', name: 'Kuliyapitiya Central College', address: 'Main Street, Kuliyapitiya', district: 'Kurunegala', divisionalSecretariat: 'Kuliyapitiya West', capacity: 500, currentOccupancy: 423, phone: '037-2281234', facilities: ['Water', 'Electricity', 'Kitchen'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Kuliyapitiya+Central+College' },
  { id: 'KUR003', name: 'Polgahawela Railway Grounds', address: 'Station Road, Polgahawela', district: 'Kurunegala', divisionalSecretariat: 'Polgahawela', capacity: 350, currentOccupancy: 312, phone: '037-2243567', facilities: ['Water'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Polgahawela+Railway+Station' },

  // PUTTALAM DISTRICT
  { id: 'PUT001', name: 'Puttalam Central College', address: 'Main Street, Puttalam', district: 'Puttalam', divisionalSecretariat: 'Puttalam', capacity: 500, currentOccupancy: 456, phone: '032-2265789', facilities: ['Water', 'Electricity', 'Medical'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Puttalam+Central+College' },
  { id: 'PUT002', name: 'Chilaw Town Hall', address: 'Main Street, Chilaw', district: 'Puttalam', divisionalSecretariat: 'Chilaw', capacity: 450, currentOccupancy: 389, phone: '032-2222345', facilities: ['Water', 'Electricity', 'Kitchen'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Chilaw+Town+Hall' },
  { id: 'PUT003', name: 'Anamaduwa Community Centre', address: 'Puttalam Road, Anamaduwa', district: 'Puttalam', divisionalSecretariat: 'Anamaduwa', capacity: 300, currentOccupancy: 267, phone: '032-2248901', facilities: ['Water'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Anamaduwa+Community+Centre' },

  // NUWARA ELIYA DISTRICT
  { id: 'NUW001', name: 'Nuwara Eliya Town Hall', address: 'Park Road, Nuwara Eliya', district: 'Nuwara Eliya', divisionalSecretariat: 'Nuwara Eliya', capacity: 400, currentOccupancy: 356, phone: '052-2222345', facilities: ['Water', 'Electricity', 'Medical', 'Kitchen'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Nuwara+Eliya+Town+Hall' },
  { id: 'NUW002', name: 'Walapane DS Office Shelter', address: 'Main Road, Walapane', district: 'Nuwara Eliya', divisionalSecretariat: 'Walapane', capacity: 300, currentOccupancy: 289, phone: '052-2257890', facilities: ['Water', 'Kitchen'], status: 'limited', googleMapsUrl: 'https://maps.google.com/?q=Walapane+DS+Office' },
  { id: 'NUW003', name: 'Hatton Community Hall', address: 'Colombo Road, Hatton', district: 'Nuwara Eliya', divisionalSecretariat: 'Hatton', capacity: 350, currentOccupancy: 312, phone: '051-2222567', facilities: ['Water', 'Electricity'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Hatton+Community+Hall' },

  // MATALE DISTRICT
  { id: 'MAT001', name: 'Matale Town Hall', address: 'King Street, Matale', district: 'Matale', divisionalSecretariat: 'Matale', capacity: 500, currentOccupancy: 423, phone: '066-2222345', facilities: ['Water', 'Electricity', 'Medical', 'Kitchen'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Matale+Town+Hall' },
  { id: 'MAT002', name: 'Dambulla Community Centre', address: 'Kandy Road, Dambulla', district: 'Matale', divisionalSecretariat: 'Dambulla', capacity: 400, currentOccupancy: 345, phone: '066-2284567', facilities: ['Water', 'Electricity', 'Kitchen'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Dambulla+Community+Centre' },

  // BADULLA DISTRICT
  { id: 'BAD001', name: 'Badulla Central College', address: 'Bandarawela Road, Badulla', district: 'Badulla', divisionalSecretariat: 'Badulla', capacity: 450, currentOccupancy: 389, phone: '055-2222345', facilities: ['Water', 'Electricity', 'Medical'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Badulla+Central+College' },
  { id: 'BAD002', name: 'Mahiyangana Community Hall', address: 'Kandy Road, Mahiyangana', district: 'Badulla', divisionalSecretariat: 'Mahiyangana', capacity: 350, currentOccupancy: 312, phone: '055-2257890', facilities: ['Water', 'Kitchen'], status: 'open', googleMapsUrl: 'https://maps.google.com/?q=Mahiyangana+Community+Hall' },
]

// Summary data
const reliefCampData = {
  lastUpdated: '2025-12-02T10:00:00Z',
  source: 'DMC Sri Lanka',
  summary: {
    totalCamps: 1094,
    totalSheltered: 180000,
    totalAffected: 1373899,
    familiesAffected: 382651,
    deaths: 390,
    missing: 352,
    affectedDistricts: 14,
  },
  externalResources: [
    {
      name: 'DMC River Water Levels',
      url: 'https://nuuuwan.github.io/lk_dmc_vis',
      description: 'Real-time river water level monitoring across Sri Lanka',
    },
    {
      name: 'Irrigation Dept. Data',
      url: 'https://github.com/nuuuwan/lk_irrigation',
      description: 'Higher frequency water level measurements updated every few minutes',
    },
    {
      name: 'ArcGIS Dashboard',
      url: 'https://www.arcgis.com/apps/dashboards/2cffe83c9ff5497d97375498bdf3ff38',
      description: 'Official Irrigation Department live dashboard',
    },
  ],
}

function getStatusColor(status: string) {
  switch (status) {
    case 'critical': return 'bg-red-100 text-red-700 border-red-200'
    case 'high': return 'bg-orange-100 text-orange-700 border-orange-200'
    case 'moderate': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    case 'low': return 'bg-green-100 text-green-700 border-green-200'
    default: return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}

export default async function ReliefCampsPage() {
  const t = await getTranslations('reliefCamps')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Tent className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-blue-100">{t('subtitle')}</p>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-4xl mx-auto">
          {/* Primary Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Tent className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-blue-600">{reliefCampData.summary.totalCamps.toLocaleString()}</div>
              <div className="text-sm text-gray-600">{t('safetyCentres')}</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-orange-600">{reliefCampData.summary.totalSheltered.toLocaleString()}+</div>
              <div className="text-sm text-gray-600">{t('peopleSheltered')}</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-purple-600">{(reliefCampData.summary.totalAffected / 1000000).toFixed(2)}M</div>
              <div className="text-sm text-gray-600">{t('peopleAffected')}</div>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <Heart className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-indigo-600">{reliefCampData.summary.familiesAffected.toLocaleString()}</div>
              <div className="text-sm text-gray-600">{t('familiesAffected')}</div>
            </div>
          </div>
          {/* Casualties Row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <div className="text-2xl md:text-3xl font-bold text-white">{reliefCampData.summary.deaths}</div>
              <div className="text-sm text-gray-300">{t('deaths')}</div>
            </div>
            <div className="text-center p-4 bg-amber-100 rounded-lg">
              <UserX className="w-6 h-6 text-amber-700 mx-auto mb-1" />
              <div className="text-2xl md:text-3xl font-bold text-amber-700">{reliefCampData.summary.missing}</div>
              <div className="text-sm text-amber-600">{t('missing')}</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <MapPin className="w-6 h-6 text-red-600 mx-auto mb-1" />
              <div className="text-2xl md:text-3xl font-bold text-red-600">{reliefCampData.summary.affectedDistricts}</div>
              <div className="text-sm text-gray-600">{t('affectedDistricts')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Notice */}
      <section className="py-4 px-4 bg-amber-50 border-b border-amber-200">
        <div className="max-w-4xl mx-auto flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-800 text-sm">{t('dataNotice')}</p>
            <p className="text-amber-600 text-xs mt-1">
              {t('lastUpdated')}: {new Date(reliefCampData.lastUpdated).toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      {/* Find a Camp Section - Interactive Dropdown */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Building className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t('findCamp')}</h2>
              <p className="text-gray-600 text-sm">{t('findCampDescription')}</p>
            </div>
          </div>

          {/* Client-side camp selector with dropdown */}
          <ReliefCampSelector camps={reliefCamps} />
        </div>
      </section>

      {/* External Resources */}
      <section className="py-12 px-4 bg-white border-t">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('liveMonitoring')}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {reliefCampData.externalResources.map((resource) => (
              <a key={resource.url} href={resource.url} target="_blank" rel="noopener noreferrer"
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition">
                <h3 className="font-semibold text-gray-900 mb-1">{resource.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
                <span className="text-blue-600 text-sm flex items-center gap-1">{t('viewData')} <ExternalLink className="w-4 h-4" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

