'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Leaf, Users, Package, Shield, LogOut, CheckCircle, XCircle,
  AlertCircle, TrendingUp, Store, Building2, Loader2
} from 'lucide-react'
import { logout } from '@/app/actions/auth'

const WORKER_URL = process.env.NEXT_PUBLIC_API_URL || ''

function getToken(): string | null {
  const m = document.cookie.match(/(?:^|;\s*)token=([^;]*)/)
  return m ? decodeURIComponent(m[1]) : null
}

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [dashboard, setDashboard] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const fetchDashboard = useCallback(async () => {
    const token = getToken()
    if (!token) {
      router.push('/login')
      return
    }

    // Decode JWT payload for user info
    try {
      const parts = token.split('.')
      const payload = JSON.parse(atob(parts[1]))
      if (payload.role !== 'admin') {
        router.push('/')
        return
      }
      setUser(payload)
    } catch {
      router.push('/login')
      return
    }

    // Fetch dashboard data from Worker
    try {
      const res = await fetch(`${WORKER_URL}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success && data.data) {
        const stats = data.data.stats || {}
        setDashboard({
          totalCommerces: stats.total_commerces || 0,
          totalNgos: stats.total_ngos || 0,
          totalDonations: stats.total_donations || 0,
          completedDonations: stats.collected_donations || 0,
          pendingCommerces: data.data.pending_commerces || [],
          pendingNgos: data.data.pending_ngos || [],
        })
      }
    } catch (err) {
      console.error('Dashboard error:', err)
    }
    setLoading(false)
  }, [router])

  useEffect(() => { fetchDashboard() }, [fetchDashboard])

  const handleVerify = async (userId: string, type: 'commerce' | 'ngo', action: 'approve' | 'reject') => {
    const token = getToken()
    if (!token) return
    setActionLoading(`${userId}-${action}`)

    try {
      const res = await fetch(`${WORKER_URL}/api/admin/${type}s/${userId}/${action}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success) {
        setDashboard((prev: any) => {
          if (!prev) return prev
          const key = type === 'commerce' ? 'pendingCommerces' : 'pendingNgos'
          return {
            ...prev,
            [key]: prev[key].filter((c: any) => c.id !== userId),
          }
        })
      }
    } catch (err) {
      console.error(`Verify ${action} error:`, err)
    }
    setActionLoading(null)
  }

  if (loading) {
    return (
      <div className="min-h-svh bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
      </div>
    )
  }

  if (!user) return null

  const pendingCommerces = dashboard?.pendingCommerces || []
  const pendingNgos = dashboard?.pendingNgos || []
  const totalCommerces = dashboard?.totalCommerces || 0
  const totalNgos = dashboard?.totalNgos || 0
  const totalDonations = dashboard?.totalDonations || 0
  const completedDonations = dashboard?.completedDonations || 0

  const isLoading = (id: string, a: string) => actionLoading === `${id}-${a}`

  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-zinc-900/50 border-r border-zinc-800 hidden md:flex flex-col">
        <div className="p-5 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="font-bold">Admin</span>
          </div>
        </div>
        <nav className="flex-1 min-h-0 overflow-y-auto p-3 space-y-1">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-900/20 text-emerald-300 text-sm font-medium">
            <TrendingUp className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/admin/usuarios" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 text-sm transition-colors">
            <Users className="w-4 h-4" /> Usuarios
          </Link>
          <Link href="/admin/donaciones" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 text-sm transition-colors">
            <Package className="w-4 h-4" /> Donaciones
          </Link>
        </nav>
        <div className="p-3 border-t border-zinc-800">
          <div className="text-xs text-zinc-600 px-3 mb-2">
            <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300">
              <Leaf className="w-3.5 h-3.5" /> Volver a la web
            </Link>
          </div>
          <form action={logout}>
            <button type="submit" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800/50 text-sm w-full transition-colors">
              <LogOut className="w-4 h-4" /> Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      <main className="md:ml-64 pt-14 md:pt-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          {/* Mobile header */}
          <div className="flex items-center justify-between mb-6 md:hidden">
            <h1 className="text-xl font-bold">Panel de admin</h1>
            <form action={logout}>
              <button type="submit" className="text-sm text-zinc-500 hover:text-red-400">Cerrar sesión</button>
            </form>
          </div>
          <h1 className="text-2xl font-bold mb-6 hidden md:block">Panel de administración</h1>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
              <Store className="w-5 h-5 text-emerald-400 mb-2" />
              <div className="text-2xl font-bold">{totalCommerces}</div>
              <div className="text-xs text-zinc-400">Comercios registrados</div>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
              <Building2 className="w-5 h-5 text-amber-400 mb-2" />
              <div className="text-2xl font-bold">{totalNgos}</div>
              <div className="text-xs text-zinc-400">Entidades sociales</div>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
              <Package className="w-5 h-5 text-blue-400 mb-2" />
              <div className="text-2xl font-bold">{totalDonations}</div>
              <div className="text-xs text-zinc-400">Donaciones totales</div>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
              <CheckCircle className="w-5 h-5 text-emerald-400 mb-2" />
              <div className="text-2xl font-bold">{completedDonations}</div>
              <div className="text-xs text-zinc-400">Donaciones completadas</div>
            </div>
          </div>

          {/* Pending verifications */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pending Commerces */}
            <div>
              <h2 className="font-semibold mb-3 flex items-center gap-2">
                <Store className="w-4 h-4 text-emerald-400" />
                Comercios pendientes ({pendingCommerces.length})
              </h2>
              {pendingCommerces.length === 0 ? (
                <p className="text-zinc-500 text-sm">No hay comercios pendientes de verificación</p>
              ) : (
                <div className="space-y-2">
                  {pendingCommerces.map((c: any) => (
                    <div key={c.id} className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-3">
                      <div className="font-medium text-sm">{c.business_name}</div>
                      <div className="text-xs text-zinc-500 mt-1">{c.email} · {c.city} · {c.contact_person}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleVerify(c.id, 'commerce', 'approve')}
                          disabled={isLoading(c.id, 'approve')}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg transition-colors"
                        >
                          {isLoading(c.id, 'approve') ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
                          Aprobar
                        </button>
                        <button
                          onClick={() => handleVerify(c.id, 'commerce', 'reject')}
                          disabled={isLoading(c.id, 'reject')}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-600/60 hover:bg-red-600 disabled:opacity-50 text-white rounded-lg transition-colors"
                        >
                          {isLoading(c.id, 'reject') ? <Loader2 className="w-3 h-3 animate-spin" /> : <XCircle className="w-3 h-3" />}
                          Rechazar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pending NGOs */}
            <div>
              <h2 className="font-semibold mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-400" />
                Entidades pendientes ({pendingNgos.length})
              </h2>
              {pendingNgos.length === 0 ? (
                <p className="text-zinc-500 text-sm">No hay entidades pendientes de verificación</p>
              ) : (
                <div className="space-y-2">
                  {pendingNgos.map((n: any) => (
                    <div key={n.id} className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-3">
                      <div className="font-medium text-sm">{n.organization_name}</div>
                      <div className="text-xs text-zinc-500 mt-1">{n.email} · {n.city}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleVerify(n.id, 'ngo', 'approve')}
                          disabled={isLoading(n.id, 'approve')}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg transition-colors"
                        >
                          {isLoading(n.id, 'approve') ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
                          Aprobar
                        </button>
                        <button
                          onClick={() => handleVerify(n.id, 'ngo', 'reject')}
                          disabled={isLoading(n.id, 'reject')}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-600/60 hover:bg-red-600 disabled:opacity-50 text-white rounded-lg transition-colors"
                        >
                          {isLoading(n.id, 'reject') ? <Loader2 className="w-3 h-3 animate-spin" /> : <XCircle className="w-3 h-3" />}
                          Rechazar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
