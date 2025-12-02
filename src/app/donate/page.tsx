import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { ExternalLink, Shield, Building2, Heart, AlertCircle, CheckCircle2, Landmark, Copy } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Donate to Cyclone Ditwah Relief | Official Government Funds',
  description: 'Donate to verified government and humanitarian relief funds for Cyclone Ditwah victims in Sri Lanka. All official donation portals listed.',
}

export default async function DonatePage() {
  const t = await getTranslations('donate')

  const governmentFunds = [
    {
      name: 'donate.gov.lk',
      description: t('govDonateDesc'),
      url: 'https://donate.gov.lk',
      verified: true,
      type: 'government',
    },
    {
      name: 'GovPay Disaster Relief',
      description: t('govPayDesc'),
      url: 'https://govpay.lk/disaster-relief',
      verified: true,
      type: 'government',
    },
  ]

  const humanitarianOrgs = [
    {
      name: 'Sri Lanka Red Cross Society',
      description: t('redCrossDesc'),
      url: 'https://www.redcross.lk',
      verified: true,
    },
    {
      name: 'ICRC Family Links',
      description: t('icrcDesc'),
      url: 'https://familylinks.icrc.org',
      verified: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-green-100">{t('subtitle')}</p>
        </div>
      </section>

      {/* Warning Banner */}
      <section className="bg-amber-50 border-b border-amber-200 py-4 px-4">
        <div className="max-w-4xl mx-auto flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-amber-800 text-sm">{t('scamWarning')}</p>
        </div>
      </section>

      {/* Government Funds */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">{t('governmentFunds')}</h2>
          </div>
          <div className="grid gap-4">
            {governmentFunds.map((fund) => (
              <a
                key={fund.url}
                href={fund.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition"
              >
                <Shield className="w-10 h-10 text-green-600 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg text-gray-900">{fund.name}</h3>
                    {fund.verified && (
                      <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        {t('verified')}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{fund.description}</p>
                  <span className="text-green-600 text-sm flex items-center gap-1">
                    {t('donateNow')} <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Humanitarian Organizations */}
      <section className="py-12 px-4 bg-white border-t">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">{t('humanitarianOrgs')}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {humanitarianOrgs.map((org) => (
              <a
                key={org.url}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-md transition"
              >
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{org.name}</h3>
                  {org.verified && (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  )}
                </div>
                <p className="text-gray-600 text-sm flex-1 mb-3">{org.description}</p>
                <span className="text-red-600 text-sm flex items-center gap-1">
                  {t('visitWebsite')} <ExternalLink className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Bank Account Details */}
      <section className="py-12 px-4 bg-blue-50 border-t">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Landmark className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">{t('bankTransfer')}</h2>
          </div>
          <p className="text-gray-600 mb-6">{t('bankTransferDesc')}</p>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Local Donations */}
            <div className="bg-white p-6 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {t('localDonors')}
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-gray-500">{t('accountName')}</div>
                  <div className="font-medium text-gray-900">Deputy Secretary to the Treasury</div>
                </div>
                <div>
                  <div className="text-gray-500">{t('accountNumber')}</div>
                  <div className="font-medium text-gray-900 font-mono">2026450</div>
                </div>
                <div>
                  <div className="text-gray-500">{t('bank')}</div>
                  <div className="font-medium text-gray-900">Bank of Ceylon</div>
                </div>
              </div>
            </div>

            {/* Foreign Donations (USD) */}
            <div className="bg-white p-6 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                {t('foreignDonorsUSD')}
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-gray-500">{t('accountName')}</div>
                  <div className="font-medium text-gray-900">Central Bank of Sri Lanka</div>
                </div>
                <div>
                  <div className="text-gray-500">{t('accountNumber')}</div>
                  <div className="font-medium text-gray-900 font-mono">021083514</div>
                </div>
                <div>
                  <div className="text-gray-500">{t('swiftCode')}</div>
                  <div className="font-medium text-gray-900 font-mono">CBCELKLX</div>
                </div>
              </div>
            </div>

            {/* Overseas Sri Lankans (LKR) */}
            <div className="bg-white p-6 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                {t('overseasLKR')}
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-gray-500">{t('accountName')}</div>
                  <div className="font-medium text-gray-900">Deputy Secretary to the Treasury</div>
                </div>
                <div>
                  <div className="text-gray-500">{t('accountNumber')}</div>
                  <div className="font-medium text-gray-900 font-mono">50516</div>
                </div>
                <div>
                  <div className="text-gray-500">{t('bank')}</div>
                  <div className="font-medium text-gray-900">Central Bank of Ceylon</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Info */}
      <section className="py-12 px-4 bg-gray-100 border-t">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t('transparencyTitle')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('transparencyDesc')}</p>
        </div>
      </section>
    </div>
  )
}

