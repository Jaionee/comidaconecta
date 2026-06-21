import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import {
  Leaf, Users, Package, Shield, LogOut, CheckCircle, XCircle,
  AlertCircle, TrendingUp, Store, Building2
} from 'lucide-react'
import { logout } from '@/app/actions/auth'
import { verifyCommerce, verifyNgo } from '@/app/actions/admin'
import AdminActions from './admin-actions'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Verify admin role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/')

  // Get pending verifications
  const { data: pendingCommerces } = await supabase
    .from('commerces')
    .select('*')
    .eq('status', 'pending')
    .limit(20)

  const { data: pendingNgos } = await supabase
    .from('ngos')
    .select('*')
    .eq('status', 'pending')
    .limit(20)

  // Get stats
  const { count: totalCommerces } = await supabase
    .from('commerces')
    .select('*', { count: 'exact', head: true })

  const { count: totalNgos } = await supabase
    .from('ngos')
    .select('*', { count: 'exact', head: true })

  const { count: totalDonations } = await supabase
    .from('donations')
    .select('*', { count: 'exact', head: true })

  const { count: completedDonations } = await supabase
    .from('donations')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'collected')

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
        <nav className="flex-1 p-3 space-y-1">
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
          <h1 className="text-2xl font-bold mb-6">Panel de administración</h1>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
              <Store className="w-5 h-5 text-emerald-400 mb-2" />
              <div className="text-2xl font-bold">{totalCommerces || 0}</div>
              <div className="text-xs text-zinc-400">Comercios registrados</div>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
              <Building2 className="w-5 h-5 text-amber-400 mb-2" />
              <div className="text-2xl font-bold">{totalNgos || 0}</div>
              <div className="text-xs text-zinc-400">Entidades sociales</div>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
              <Package className="w-5 h-5 text-blue-400 mb-2" />
              <div className="text-2xl font-bold">{totalDonations || 0}</div>
              <div className="text-xs text-zinc-400">Donaciones totales</div>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
              <CheckCircle className="w-5 h-5 text-emerald-400 mb-2" />
              <div className="text-2xl font-bold">{completedDonations || 0}</div>
              <div className="text-xs text-zinc-400">Donaciones completadas</div>
            </div>
          </div>

          {/* Pending verifications */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pending Commerces */}
            <div>
              <h2 className="font-semibold mb-3 flex items-center gap-2">
                <Store className="w-4 h-4 text-emerald-400" />
                Comercios pendientes ({pendingCommerces?.length || 0})
              </h2>
              {!pendingCommerces || pendingCommerces.length === 0 ? (
                <p className="text-zinc-500 text-sm">No hay comercios pendientes de verificación</p>
              ) : (
                <div className="space-y-2">
                  {pendingCommerces.map(c => (
                    <div key={c.id} className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-3">
                      <div className="font-medium text-sm">{c.business_name}</div>
                      <div className="text-xs text-zinc-500 mt-1">{c.email} · {c.city} · {c.contact_person}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <AdminActions userId={c.id} type="commerce" action="approve" serverAction={verifyCommerce} />
                        <AdminActions userId={c.id} type="commerce" action="reject" serverAction={verifyCommerce} />
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
                Entidades pendientes ({pendingNgos?.length || 0})
              </h2>
              {!pendingNgos || pendingNgos.length === 0 ? (
                <p className="text-zinc-500 text-sm">No hay entidades pendientes de verificación</p>
              ) : (
                <div className="space-y-2">
                  {pendingNgos.map(n => (
                    <div key={n.id} className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-3">
                      <div className="font-medium text-sm">{n.organization_name}</div>
                      <div className="text-xs text-zinc-500 mt-1">{n.email} · {n.city}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <AdminActions userId={n.id} type="ngo" action="approve" serverAction={verifyNgo} />
                        <AdminActions userId={n.id} type="ngo" action="reject" serverAction={verifyNgo} />
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
