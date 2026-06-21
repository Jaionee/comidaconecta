import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Leaf, History as HistoryIcon, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react'
import { logout } from '@/app/actions/auth'

export default async function NgoHistory() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: ngo } = await supabase
    .from('ngos')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!ngo) redirect('/ong/perfil')

  const { data: reservations } = await supabase
    .from('reservations')
    .select('*, donations(*, commerces(business_name, city))')
    .eq('ngo_id', ngo.id)
    .order('reserved_at', { ascending: false })
    .limit(50)

  const statusConfig: Record<string, { color: string; label: string }> = {
    reserved: { color: 'text-amber-400', label: 'Reservada' },
    picked_up: { color: 'text-blue-400', label: 'Recogida (pendiente confirmación)' },
    collected: { color: 'text-emerald-400', label: 'Completada' },
    cancelled: { color: 'text-red-400', label: 'Cancelada' },
  }

  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-100">
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-zinc-900/50 border-r border-zinc-800 hidden md:flex flex-col">
        <div className="p-5 border-b border-zinc-800"><Link href="/" className="flex items-center gap-2"><Leaf className="w-5 h-5 text-emerald-400" /><span className="font-bold">ComidaConecta</span></Link></div>
        <nav className="flex-1 p-3 space-y-1">
          <Link href="/ong/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 text-sm">Dashboard</Link>
          <Link href="/ong/donaciones" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 text-sm">Donaciones disponibles</Link>
          <Link href="/ong/historial" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-amber-900/20 text-amber-300 text-sm font-medium">Mi historial</Link>
          <Link href="/ong/perfil" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 text-sm">Mi perfil</Link>
        </nav>
        <div className="p-3 border-t border-zinc-800">
          <form action={logout}><button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-500 hover:text-red-400 text-sm w-full">Cerrar sesión</button></form>
        </div>
      </aside>

      <main className="md:ml-64 pt-14 md:pt-0">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <h1 className="text-2xl font-bold mb-6">Mi historial</h1>

          {!reservations || reservations.length === 0 ? (
            <div className="bg-zinc-800/20 border border-dashed border-zinc-700/30 rounded-xl p-8 text-center">
              <HistoryIcon className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-500 text-sm">No has realizado ninguna reserva todavía</p>
              <Link href="/ong/donaciones" className="text-amber-400 text-sm hover:text-amber-300 mt-2 inline-block">Ver donaciones disponibles</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {reservations.map(r => {
                const cfg = statusConfig[r.status] || { color: 'text-zinc-500', label: r.status }
                return (
                  <div key={r.id} className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-medium">{r.donations?.title || 'Donación'}</h3>
                      <span className={`text-xs ${cfg.color}`}>{cfg.label}</span>
                    </div>
                    <p className="text-xs text-zinc-500 mb-2">
                      {r.donations?.commerces?.business_name} · {r.donations?.commerces?.city}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-zinc-600">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(r.reserved_at).toLocaleDateString('es-ES')}</span>
                    </div>
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
