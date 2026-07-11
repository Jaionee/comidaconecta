import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/api/auth-helper'
import { api } from '@/lib/api/client'
import Link from 'next/link'
import {
  Leaf, Plus, History, FileText, User, LogOut, Package, AlertCircle,
  CheckCircle, Clock, XCircle, Calendar, Eye, TrendingUp, MapPin
} from 'lucide-react'
import { logout } from '@/app/actions/auth'
import { cancelDonation, confirmCollection } from '@/app/actions/donations'
import DashboardActions from './dashboard-actions'
import DonationMap from '@/components/DonationMap'

function getStatusBadge(status: string) {
  const config: Record<string, { color: string; icon: any; label: string }> = {
    available: { color: 'text-emerald-400 bg-emerald-900/30 border-emerald-700/30', icon: CheckCircle, label: 'Disponible' },
    reserved: { color: 'text-amber-400 bg-amber-900/30 border-amber-700/30', icon: Clock, label: 'Reservada' },
    collected: { color: 'text-blue-400 bg-blue-900/30 border-blue-700/30', icon: CheckCircle, label: 'Recogida' },
    cancelled: { color: 'text-red-400 bg-red-900/30 border-red-800/30', icon: XCircle, label: 'Cancelada' },
    expired: { color: 'text-zinc-500 bg-zinc-800/30 border-zinc-700/30', icon: AlertCircle, label: 'Caducada' },
  }
  const c = config[status] || config.expired
  return c
}

export default async function CommerceDashboard() {
  const user = await requireAuth()

  const { data: dashboardData } = await api.dashboards.commerce(user.token)
  const commerce = dashboardData?.commerce || null
  const donations = dashboardData?.donations || []
  const reservations = dashboardData?.reservations || []

  if (!commerce) {
    redirect('/comercio/perfil')
  }

  const activeDonations = donations.filter((d: any) => d.status === 'available' || d.status === 'reserved')
  const completedCount = donations.filter((d: any) => d.status === 'collected').length
  const totalServings = donations.reduce((sum: number, d: any) => sum + (d.status === 'collected' ? d.estimated_servings : 0), 0)

  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-zinc-900/50 border-r border-zinc-800 hidden md:flex flex-col">
        <div className="p-5 border-b border-zinc-800">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span className="font-bold">ComidaConecta</span>
          </Link>
        </div>

        <nav className="flex-1 min-h-0 overflow-y-auto p-3 space-y-1">
          <Link href="/comercio/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-900/20 text-emerald-300 text-sm font-medium">
            <Package className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/comercio/donar" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 text-sm transition-colors">
            <Plus className="w-4 h-4" /> Nueva donación
          </Link>
          <Link href="/comercio/historial" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 text-sm transition-colors">
            <History className="w-4 h-4" /> Historial
          </Link>
          <Link href="/comercio/informe" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 text-sm transition-colors">
            <FileText className="w-4 h-4" /> Informe mensual
          </Link>
          <Link href="/comercio/perfil" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 text-sm transition-colors">
            <User className="w-4 h-4" /> Mi perfil
          </Link>
        </nav>

        <div className="p-3 border-t border-zinc-800">
          <form action={logout}>
            <button type="submit" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800/50 text-sm w-full transition-colors">
              <LogOut className="w-4 h-4" /> Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 z-30 px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-emerald-400" />
          <span className="font-bold text-sm">ComidaConecta</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/comercio/donar" className="text-emerald-400">
            <Plus className="w-5 h-5" />
          </Link>
          <form action={logout}>
            <button type="submit" className="text-zinc-500">
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Main content */}
      <main className="md:ml-64 pt-14 md:pt-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            {commerce.status === 'pending' && (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-900/20 border border-amber-700/30 rounded-lg text-amber-300 text-sm mb-4">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Tu perfil está pendiente de verificación por el administrador. Mientras tanto, no puedes publicar donaciones.
              </div>
            )}
            <h1 className="text-2xl font-bold">Hola, {commerce.business_name}</h1>
            <p className="text-zinc-500 text-sm mt-1">Panel de donaciones</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-emerald-400">{activeDonations.length}</div>
              <div className="text-xs text-zinc-400 mt-1">Donaciones activas</div>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-400">{completedCount}</div>
              <div className="text-xs text-zinc-400 mt-1">Recogidas</div>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-400">{totalServings}</div>
              <div className="text-xs text-zinc-400 mt-1">Raciones donadas</div>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-zinc-100">{donations.length}</div>
              <div className="text-xs text-zinc-400 mt-1">Total donaciones</div>
            </div>
          </div>

          {/* Active donations map */}
          {activeDonations.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" /> Mapa de donaciones activas
              </h2>
              <DonationMap
                donations={activeDonations.map((d: any) => ({
                  id: d.id,
                  commerce_name: commerce.business_name,
                  commerce_city: commerce.city || '',
                  commerce_address: d.pickup_address || '',
                  food_type: d.food_type || '',
                  amount: d.estimated_servings || 0,
                  created_at: d.created_at,
                }))}
                height="280px"
                zoom={12}
              />
            </div>
          )}

          {/* Active donations */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Donaciones activas</h2>
            <Link
              href="/comercio/donar"
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" /> Nueva
            </Link>
          </div>

          {activeDonations.length === 0 ? (
            <div className="bg-zinc-800/20 border border-dashed border-zinc-700/30 rounded-xl p-8 text-center">
              <Package className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-500 text-sm">No tienes donaciones activas</p>
              <Link href="/comercio/donar" className="text-emerald-400 text-sm hover:text-emerald-300 mt-2 inline-block">
                Publicar tu primera donación
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {activeDonations.map((donation: any) => {
                const badge = getStatusBadge(donation.status)
                const Icon = badge.icon
                const reservation = reservations.find((r: any) => r.donation_id === donation.id)
                return (
                  <div key={donation.id} className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{donation.title}</h3>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {donation.quantity_text} · {donation.estimated_servings} raciones · {donation.food_type.replace(/-/g, ' ')}
                        </p>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${badge.color}`}>
                        <Icon className="w-3 h-3" />
                        {badge.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-zinc-500 mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Límite: {new Date(donation.pickup_deadline).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {donation.pickup_address}</span>
                    </div>

                    {donation.status === 'available' && (
                      <DashboardActions
                        donationId={donation.id}
                        actionType="cancel"
                        cancelAction={cancelDonation}
                      />
                    )}

                    {donation.status === 'reserved' && reservation && (
                      <div className="bg-amber-900/10 border border-amber-700/20 rounded-lg p-3">
                        <div className="text-xs text-amber-300 font-medium mb-1">Reservada por:</div>
                        <div className="text-sm text-zinc-300">{reservation.ngos?.organization_name || 'Entidad social'}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <DashboardActions
                            donationId={reservation.id}
                            actionType="confirm"
                            confirmAction={confirmCollection}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
