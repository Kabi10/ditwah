'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { togglePublishStatus, bulkPublish, deleteMissingPerson } from '@/lib/actions/admin'
import type { MissingPerson } from '@/lib/supabase/types'
import { 
  Shield, LogOut, Users, Eye, EyeOff, MapPin, 
  Check, X, Trash2, RefreshCw, ExternalLink
} from 'lucide-react'

interface AdminDashboardProps {
  reports: MissingPerson[]
  stats: { total: number; published: number; unpublished: number; sightings: number } | null
  userEmail: string
}

export function AdminDashboard({ reports, stats, userEmail }: AdminDashboardProps) {
  const [filter, setFilter] = useState<'all' | 'published' | 'unpublished'>('all')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const filteredReports = reports.filter(r => {
    if (filter === 'published') return r.is_published
    if (filter === 'unpublished') return !r.is_published
    return true
  })

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const handleTogglePublish = (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      await togglePublishStatus(id, !currentStatus)
      router.refresh()
    })
  }

  const handleBulkPublish = (publish: boolean) => {
    if (selectedIds.length === 0) return
    startTransition(async () => {
      await bulkPublish(selectedIds, publish)
      setSelectedIds([])
      router.refresh()
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this report? This cannot be undone.')) return
    startTransition(async () => {
      await deleteMissingPerson(id)
      router.refresh()
    })
  }

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredReports.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredReports.map(r => r.id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="font-bold text-xl">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">{userEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
              <ExternalLink className="w-4 h-4" /> View Site
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard icon={Users} label="Total Reports" value={stats.total} color="blue" />
            <StatCard icon={Eye} label="Published" value={stats.published} color="green" />
            <StatCard icon={EyeOff} label="Unpublished" value={stats.unpublished} color="yellow" />
            <StatCard icon={MapPin} label="Sightings" value={stats.sightings} color="purple" />
          </div>
        )}

        {/* Filters & Bulk Actions */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Filter:</span>
              {(['all', 'published', 'unpublished'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            {selectedIds.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{selectedIds.length} selected</span>
                <button onClick={() => handleBulkPublish(true)} disabled={isPending}
                  className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 disabled:opacity-50">
                  <Check className="w-4 h-4 inline mr-1" /> Publish
                </button>
                <button onClick={() => handleBulkPublish(false)} disabled={isPending}
                  className="px-3 py-1 bg-yellow-600 text-white rounded-lg text-sm hover:bg-yellow-700 disabled:opacity-50">
                  <X className="w-4 h-4 inline mr-1" /> Unpublish
                </button>
              </div>
            )}
            <button onClick={() => router.refresh()} className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
              <RefreshCw className={`w-4 h-4 ${isPending ? 'animate-spin' : ''}`} /> Refresh
            </button>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox" checked={selectedIds.length === filteredReports.length && filteredReports.length > 0}
                      onChange={toggleSelectAll} className="rounded" />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Photo</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">District</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Reporter</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredReports.map(report => (
                  <ReportRow key={report.id} report={report} selected={selectedIds.includes(report.id)}
                    onToggleSelect={() => toggleSelect(report.id)} onTogglePublish={() => handleTogglePublish(report.id, report.is_published)}
                    onDelete={() => handleDelete(report.id)} isPending={isPending} />
                ))}
              </tbody>
            </table>
          </div>
          {filteredReports.length === 0 && (
            <div className="p-8 text-center text-gray-500">No reports found</div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: {
  icon: React.ElementType; label: string; value: number; color: string
}) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600',
  }
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  )
}

function ReportRow({ report, selected, onToggleSelect, onTogglePublish, onDelete, isPending }: {
  report: MissingPerson; selected: boolean; onToggleSelect: () => void;
  onTogglePublish: () => void; onDelete: () => void; isPending: boolean
}) {
  return (
    <tr className={selected ? 'bg-blue-50' : 'hover:bg-gray-50'}>
      <td className="px-4 py-3">
        <input type="checkbox" checked={selected} onChange={onToggleSelect} className="rounded" />
      </td>
      <td className="px-4 py-3">
        {report.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={report.photo_url} alt="" className="w-10 h-10 rounded object-cover" />
        ) : (
          <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center">
            <Users className="w-5 h-5 text-gray-400" />
          </div>
        )}
      </td>
      <td className="px-4 py-3">
        <Link href={`/person/${report.id}`} className="font-medium text-gray-900 hover:text-blue-600">
          {report.full_name}
        </Link>
        {report.age && <span className="text-sm text-gray-500 ml-1">({report.age})</span>}
      </td>
      <td className="px-4 py-3 text-gray-600">{report.district}</td>
      <td className="px-4 py-3">
        <div className="text-sm">
          <p className="text-gray-900">{report.reporter_name}</p>
          <p className="text-gray-500">{report.reporter_phone}</p>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          report.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {report.is_published ? 'Published' : 'Pending'}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button onClick={onTogglePublish} disabled={isPending}
            className={`p-1.5 rounded ${report.is_published ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'}`}
            title={report.is_published ? 'Unpublish' : 'Publish'}>
            {report.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button onClick={onDelete} disabled={isPending}
            className="p-1.5 rounded text-red-600 hover:bg-red-50" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

