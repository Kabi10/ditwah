import { getTranslations } from 'next-intl/server'
import { ReportForm } from '@/components/report/ReportForm'

export default async function ReportPage() {
  const t = await getTranslations('report')

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {t('title')}
          </h1>
          <p className="text-gray-600 mb-8">
            {t('subtitle')}
          </p>

          <ReportForm />
        </div>
      </div>
    </div>
  )
}

