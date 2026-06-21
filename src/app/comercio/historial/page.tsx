import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Leaf, ArrowLeft, History, Calendar, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react'

export default async function CommerceHistory() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: commerce } = await supabase
    .from('commerces')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!commerce) redirect('/comercio/perfil')

  const { data: donations } = await supabase
    .from('donations')
    .select('*')
    .eq('commerce_id', commerce.id)
    .order('created_at', { ascending: false })
    .limit(50)

  const { data: reservations } = await supabase
    .from('reservations')
    .select('*, ngos(organization_name)')
    .in('donation_id', donations?.map(d => d.id) || [])

  const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
    available: { color: 'text-emerald-400', icon: Clock, label: 'Disponible' },
    reserved: { color: 'text-amber-400', icon: Clock, label: 'Reservada' },
    collected: { color: 'text-blue-400', icon: CheckCircle, label: 'Recogida' },
    cancelled: { color: 'text-red-400', icon: XCircle, label: 'Cancelada' },
    expired: { color: 'text-zinc-500', icon: AlertCircle, label: 'Caducada' },
  }

  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-100">
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-zinc-900/50 border-r border-zinc-800 hidden md:flex flex-col">
        <div className="p-5 border-b border-zinc-800">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span className="font-bold">ComidaConecta</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <Link href="/comercio/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 text-sm">Dashboard</Link>
          <Link href="/comercio/donar" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 text-sm">Nueva donación</Link>
          <Link href="/comercio/historial" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-900/20 text-emerald-300 text-sm font-medium">Historial</Link>
          <Link href="/comercio/informe" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 text-sm">Informe mensual</Link>
          <Link href="/comercio/perfil" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 text-sm">Mi perfil</Link>
        </nav>
      </aside>

      <main className="md:ml-64 pt-14 md:pt-0">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <h1 className="text-2xl font-bold mb-6">Historial de donaciones</h1>

          {!donations || donations.length === 0 ? (
            <div className="bg-zinc-800/20 border border-dashed border-zinc-700/30 rounded-xl p-8 text-center">
              <History className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-500 text-sm">No hay donaciones registradas</p>
            </div>
          ) : (
            <div className="space-y-3">
              {donations.map(d => {
                const cfg = statusConfig[d.status] || statusConfig.expired
                const Icon = cfg.icon
                const res = reservations?.find(r => r.donation_id === d.id)
                return (
                  <div key={d.id} className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-medium">{d.title}</h3>
                      <span className={`inline-flex items-center gap-1 text-xs ${cfg.color}`}>
                        <Icon className="w-3 h-3" />{cfg.label}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mb-2">
                      {d.quantity_text} · {d.estimated_servings} raciones · {d.food_type.replace(/-/g, ' ')}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-zinc-600">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(d.created_at).toLocaleDateString('es-ES')}</span>
                      {res && <span>Recogido por: {res.ngos?.organization_name || 'Entidad'}</span>}
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
