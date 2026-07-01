import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/api/auth-helper'
import { api } from '@/lib/api/client'
import Link from 'next/link'
import {
  Leaf, Package, Search, History, User, LogOut, Clock,
  CheckCircle, AlertCircle, Heart, Calendar, MapPin, Building2
} from 'lucide-react'
import { logout } from '@/app/actions/auth'
import { reserveDonation, markAsPickedUp } from '@/app/actions/reservations'
import NgoActions from './ngo-actions'

export default async function NgoDashboard() {
  const user = await requireAuth()

  const { data: dashboardData } = await api.dashboards.ngo(user.token)
  const ngo = dashboardData?.ngo || null
  const availableDonations = dashboardData?.availableDonations || []
  const reservations = dashboardData?.reservations || []

  if (!ngo) redirect('/ong/perfil')

  const pendingConfirm = reservations?.filter((r: any) => r.status === 'picked_up') || []
  const activeReservations = reservations?.filter((r: any) => r.status === 'reserved' || r.status === 'picked_up') || []
  const completedCount = reservations?.filter((r: any) => r.status === 'collected').length || 0

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
        <nav className="flex-1 p-3 space-y-1">
          <Link href="/ong/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-amber-900/20 text-amber-300 text-sm font-medium">
            <Package className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/ong/donaciones" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 text-sm transition-colors">
            <Search className="w-4 h-4" /> Donaciones disponibles
          </Link>
          <Link href="/ong/historial" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 text-sm transition-colors">
            <History className="w-4 h-4" /> Mi historial
          </Link>
          <Link href="/ong/perfil" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 text-sm transition-colors">
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
        <form action={logout}>
          <button type="submit" className="text-zinc-500"><LogOut className="w-4 h-4" /></button>
        </form>
      </div>

      <main className="md:ml-64 pt-14 md:pt-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          {ngo.status === 'pending' && (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-900/20 border border-amber-700/30 rounded-lg text-amber-300 text-sm mb-4">
              <AlertCircle className="w-4 h-4 shrink-0" />
              Tu perfil está pendiente de verificación por el administrador.
            </div>
          )}

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Hola, {ngo.organization_name}</h1>
            <p className="text-zinc-500 text-sm mt-1">Panel de donaciones</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-emerald-400">{availableDonations?.length || 0}</div>
              <div className="text-xs text-zinc-400 mt-1">Disponibles ahora</div>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-400">{activeReservations.length}</div>
              <div className="text-xs text-zinc-400 mt-1">Tus reservas activas</div>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-400">{completedCount}</div>
              <div className="text-xs text-zinc-400 mt-1">Recogidas completadas</div>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-zinc-100">{ngo.reputation_points || 0}</div>
              <div className="text-xs text-zinc-400 mt-1">Puntos de reputación</div>
            </div>
          </div>

          {/* Pending confirmations from commerce */}
          {pendingConfirm.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" /> Pendientes de confirmación
              </h2>
              <div className="space-y-3">
                {pendingConfirm.map((r: any) => (
                  <div key={r.id} className="bg-amber-900/10 border border-amber-700/20 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{r.donations?.title}</div>
                        <div className="text-xs text-zinc-500 mt-1">{r.donations?.commerces?.business_name}</div>
                      </div>
                      <span className="text-xs text-amber-400 bg-amber-900/20 px-2 py-0.5 rounded-full">Esperando confirmación</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active reservations */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Tus reservas activas</h2>
            {activeReservations.length === 0 ? (
              <div className="bg-zinc-800/20 border border-dashed border-zinc-700/30 rounded-xl p-8 text-center">
                <Heart className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
                <p className="text-zinc-500 text-sm">No tienes reservas activas</p>
                <Link href="/ong/donaciones" className="text-amber-400 text-sm hover:text-amber-300 mt-2 inline-block">
                  Ver donaciones disponibles
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {activeReservations.map((r: any) => (
                  <div key={r.id} className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{r.donations?.title}</h3>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {r.donations?.commerces?.business_name} · {r.donations?.commerces?.city}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        r.status === 'reserved'
                          ? 'text-amber-400 bg-amber-900/20'
                          : 'text-blue-400 bg-blue-900/20'
                      }`}>
                        {r.status === 'reserved' ? 'Pendiente de recoger' : 'Recogido, pendiente confirmación'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{r.donations?.pickup_address}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{r.donations?.pickup_deadline ? new Date(r.donations.pickup_deadline).toLocaleDateString('es-ES') : ''}</span>
                    </div>
                    {r.status === 'reserved' && (
                      <NgoActions reservationId={r.id} actionType="pickup" markAction={markAsPickedUp} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick available */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Donaciones disponibles</h2>
              <Link href="/ong/donaciones" className="text-amber-400 text-sm hover:text-amber-300">
                Ver todas
              </Link>
            </div>
            {(!availableDonations || availableDonations.length === 0) ? (
              <div className="bg-zinc-800/20 border border-dashed border-zinc-700/30 rounded-xl p-6 text-center">
                <Search className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                <p className="text-zinc-500 text-sm">No hay donaciones disponibles ahora</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-3">
                {availableDonations.slice(0, 4).map((d: any) => (
                  <div key={d.id} className="bg-zinc-800/20 border border-zinc-700/20 rounded-xl p-3">
                    <h3 className="font-medium text-sm">{d.title}</h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      {d.commerces?.business_name} · {d.quantity_text}
                    </p>
                    <NgoActions donationId={d.id} actionType="reserve" reserveAction={reserveDonation} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
