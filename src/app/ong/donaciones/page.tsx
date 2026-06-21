import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import {
  Leaf, Search, MapPin, Calendar, Store, LogOut, Heart, Filter,
} from 'lucide-react'
import { logout } from '@/app/actions/auth'
import { reserveDonation } from '@/app/actions/reservations'
import NgoActions from '../dashboard/ngo-actions'

export default async function NgoDonationsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: ngo } = await supabase
    .from('ngos')
    .select('id, status')
    .eq('user_id', user.id)
    .single()

  if (!ngo) redirect('/ong/perfil')

  // Get all available donations, not yet expired
  const { data: donations } = await supabase
    .from('donations')
    .select('*, commerces(business_name, city, address)')
    .eq('status', 'available')
    .gte('pickup_deadline', new Date().toISOString())
    .order('created_at', { ascending: false })

  // Get NGO's existing reservations to know which are already reserved by them or others
  const { data: allReservations } = await supabase
    .from('reservations')
    .select('donation_id, ngo_id')
    .in('status', ['reserved', 'picked_up'])

  const reservedIds = new Set(allReservations?.map(r => r.donation_id) || [])

  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-100">
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-zinc-900/50 border-r border-zinc-800 hidden md:flex flex-col">
        <div className="p-5 border-b border-zinc-800">
          <Link href="/" className="flex items-center gap-2"><Leaf className="w-5 h-5 text-emerald-400" /><span className="font-bold">ComidaConecta</span></Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <Link href="/ong/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 text-sm">Dashboard</Link>
          <Link href="/ong/donaciones" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-amber-900/20 text-amber-300 text-sm font-medium">Donaciones disponibles</Link>
          <Link href="/ong/historial" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 text-sm">Mi historial</Link>
          <Link href="/ong/perfil" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 text-sm">Mi perfil</Link>
        </nav>
        <div className="p-3 border-t border-zinc-800">
          <form action={logout}><button type="submit" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-500 hover:text-red-400 text-sm w-full"><LogOut className="w-4 h-4" /> Cerrar sesión</button></form>
        </div>
      </aside>

      <main className="md:ml-64 pt-14 md:pt-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Donaciones disponibles</h1>
              <p className="text-sm text-zinc-500 mt-1">{donations?.length || 0} donaciones ahora mismo</p>
            </div>
          </div>

          {!donations || donations.length === 0 ? (
            <div className="bg-zinc-800/20 border border-dashed border-zinc-700/30 rounded-xl p-12 text-center">
              <Search className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-500">No hay donaciones disponibles ahora</p>
              <p className="text-xs text-zinc-600 mt-2">Vuelve más tarde o prueba a ampliar la búsqueda</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {donations.map(d => {
                const taken = reservedIds.has(d.id)
                return (
                  <div key={d.id} className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-5 hover:border-emerald-700/30 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{d.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        taken ? 'text-red-400 bg-red-900/20' : 'text-emerald-400 bg-emerald-900/20'
                      }`}>
                        {taken ? 'Reservada' : 'Disponible'}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mb-3 line-clamp-2">{d.description}</p>
                    <div className="space-y-1.5 text-xs text-zinc-500 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Store className="w-3.5 h-3.5 text-zinc-600" />
                        {d.commerces?.business_name}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-zinc-600" />
                        {d.pickup_address}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                        Recoger antes: {new Date(d.pickup_deadline).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-emerald-400">
                        {d.quantity_text} · {d.estimated_servings} raciones
                      </div>
                    </div>
                    {!taken && ngo.status === 'active' && (
                      <NgoActions donationId={d.id} actionType="reserve" reserveAction={reserveDonation} />
                    )}
                    {taken && <p className="text-xs text-red-400 mt-2">Ya reservada por otra entidad</p>}
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
