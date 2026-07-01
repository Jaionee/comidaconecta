import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/api/auth-helper'
import { api } from '@/lib/api/client'
import Link from 'next/link'
import { Leaf, Users, Package, Shield, LogOut, TrendingUp, Store, Building2, Mail, Phone, MapPin } from 'lucide-react'
import { logout } from '@/app/actions/auth'
import { verifyCommerce, verifyNgo } from '@/app/actions/admin'
import AdminActions from '../dashboard/admin-actions'

export default async function AdminUsersPage() {
  const user = await requireAuth()
  if (user.role !== 'admin') redirect('/')

  const { data: dashboardData } = await api.admin.dashboard(user.token)
  const commerces = dashboardData?.allCommerces || []
  const ngos = dashboardData?.allNgos || []

  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-100">
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-zinc-900/50 border-r border-zinc-800 hidden md:flex flex-col">
        <div className="p-5 border-b border-zinc-800"><div className="flex items-center gap-2"><Shield className="w-5 h-5 text-emerald-400" /><span className="font-bold">Admin</span></div></div>
        <nav className="flex-1 p-3 space-y-1">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 text-sm">Dashboard</Link>
          <Link href="/admin/usuarios" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-900/20 text-emerald-300 text-sm font-medium">Usuarios</Link>
          <Link href="/admin/donaciones" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 text-sm">Donaciones</Link>
        </nav>
        <div className="p-3 border-t border-zinc-800">
          <Link href="/" className="block text-xs text-zinc-600 px-3 mb-2 hover:text-zinc-300">Volver a la web</Link>
          <form action={logout}><button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-500 hover:text-red-400 text-sm w-full">Cerrar sesión</button></form>
        </div>
      </aside>

      <main className="md:ml-64 pt-14 md:pt-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          <h1 className="text-2xl font-bold mb-6">Usuarios</h1>

          {/* Commerces */}
          <h2 className="font-semibold mb-3 flex items-center gap-2"><Store className="w-4 h-4 text-emerald-400" /> Comercios ({commerces.length})</h2>
          <div className="space-y-2 mb-8">
            {commerces.map((c: any) => (
              <div key={c.id} className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{c.business_name}</div>
                    <div className="text-xs text-zinc-500 mt-1 space-y-1">
                      <div className="flex items-center gap-1.5"><Mail className="w-3 h-3" />{c.email}</div>
                      <div className="flex items-center gap-1.5"><Phone className="w-3 h-3" />{c.phone}</div>
                      <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{c.city} · {c.business_type}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    c.status === 'active' ? 'text-emerald-400 bg-emerald-900/20' :
                    c.status === 'pending' ? 'text-amber-400 bg-amber-900/20' : 'text-red-400 bg-red-900/20'
                  }`}>{c.status}</span>
                </div>
                {c.status === 'pending' && (
                  <div className="flex items-center gap-2 mt-3">
                    <AdminActions userId={c.id} type="commerce" action="approve" serverAction={verifyCommerce} />
                    <AdminActions userId={c.id} type="commerce" action="reject" serverAction={verifyCommerce} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* NGOs */}
          <h2 className="font-semibold mb-3 flex items-center gap-2"><Building2 className="w-4 h-4 text-amber-400" /> Entidades sociales ({ngos.length})</h2>
          <div className="space-y-2">
            {ngos.map((n: any) => (
              <div key={n.id} className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{n.organization_name}</div>
                    <div className="text-xs text-zinc-500 mt-1 space-y-1">
                      <div className="flex items-center gap-1.5"><Mail className="w-3 h-3" />{n.email}</div>
                      <div className="flex items-center gap-1.5"><Phone className="w-3 h-3" />{n.phone}</div>
                      <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{n.city}</div>
                      {n.tax_id && <div>CIF: {n.tax_id}</div>}
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    n.status === 'active' ? 'text-emerald-400 bg-emerald-900/20' :
                    n.status === 'pending' ? 'text-amber-400 bg-amber-900/20' : 'text-red-400 bg-red-900/20'
                  }`}>{n.status}</span>
                </div>
                {n.status === 'pending' && (
                  <div className="flex items-center gap-2 mt-3">
                    <AdminActions userId={n.id} type="ngo" action="approve" serverAction={verifyNgo} />
                    <AdminActions userId={n.id} type="ngo" action="reject" serverAction={verifyNgo} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
