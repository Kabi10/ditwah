import { redirect } from 'next/navigation'
import { checkAdminAuth, getAllMissingPersons, getAdminStats } from '@/lib/actions/admin'
import { AdminDashboard } from '@/components/admin/AdminDashboard'

export default async function AdminPage() {
  const auth = await checkAdminAuth()
  
  if (!auth.isAdmin) {
    redirect('/admin/login')
  }

  const [reportsResult, stats] = await Promise.all([
    getAllMissingPersons('all'),
    getAdminStats(),
  ])

  return (
    <AdminDashboard 
      reports={reportsResult.data} 
      stats={stats} 
      userEmail={auth.user?.email || ''} 
    />
  )
}

