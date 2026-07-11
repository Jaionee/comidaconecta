import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/api/auth-helper'
import { api } from '@/lib/api/client'
import Link from 'next/link'
import { Leaf, Package, Shield, LogOut, TrendingUp, Calendar, MapPin, Store, Building2, Map } from 'lucide-react'
import { logout } from '@/app/actions/auth'
import { deleteDonation } from '@/app/actions/admin'
import DonationRow from './donation-row'
import DonationMap from '@/components/DonationMap'

export default async function AdminDonationsPage() {
  const user = await requireAuth()
  if (user.role !== 'admin') redirect('/')

  const { data: donations } = await api.donations.list(user.token)

  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-100">
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-zinc-900/50 border-r border-zinc-800 hidden md:flex flex-col">
        <div className="p-5 border-b border-zinc-800"><div className="flex items-center gap-2"><Shield className="w-5 h-5 text-emerald-400" /><span className="font-bold">Admin</span></div></div>
        <nav className="flex-1 min-h-0 overflow-y-auto p-3 space-y-1">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 text-sm">Dashboard</Link>
          <Link href="/admin/usuarios" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 text-sm">Usuarios</Link>
          <Link href="/admin/donaciones" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-900/20 text-emerald-300 text-sm font-medium">Donaciones</Link>
        </nav>
        <div className="p-3 border-t border-zinc-800">
          <Link href="/" className="block text-xs text-zinc-600 px-3 mb-2 hover:text-zinc-300">Volver a la web</Link>
          <form action={logout}><button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-500 hover:text-red-400 text-sm w-full">Cerrar sesión</button></form>
        </div>
      </aside>

      <main className="md:ml-64 pt-14 md:pt-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          <h1 className="text-2xl font-bold mb-6">Donaciones ({(donations || []).length})</h1>

          {(donations || []).length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-1.5">
                <Map className="w-4 h-4 text-emerald-400" /> Mapa de todas las donaciones
              </h2>
              <DonationMap
                donations={(donations || []).map((d: any) => ({
                  id: d.id,
                  commerce_name: d.commerces?.business_name || '',
                  commerce_city: d.commerces?.city || d.commerces?.address || '',
                  commerce_address: d.pickup_address || '',
                  food_type: d.food_type || '',
                  amount: d.estimated_servings || 0,
                  created_at: d.created_at,
                }))}
                height="300px"
                zoom={6}
              />
            </div>
          )}

          <div className="space-y-2">
            {(donations || []).map((d: any) => (
              <DonationRow key={d.id} donation={d} deleteAction={deleteDonation} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
