import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/api/auth-helper'
import { api } from '@/lib/api/client'
import Link from 'next/link'
import { Leaf, ArrowLeft, Store } from 'lucide-react'
import ProfileForm from './profile-form'

export default async function CommerceProfilePage() {
  const user = await requireAuth()

  // Get commerce profile for the authenticated user via dashboard endpoint
  const { data: dashboardData } = await api.dashboards.commerce(user.token)
  const profile = dashboardData?.commerce || null

  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-100">
      <div className="max-w-lg mx-auto px-4 py-12">
        <Link href="/comercio/dashboard" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Volver al panel
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-emerald-900/40 border border-emerald-700/30 flex items-center justify-center">
            <Store className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Perfil de comercio</h1>
            <p className="text-sm text-zinc-500">
              {profile ? 'Actualiza los datos de tu negocio' : 'Completa los datos para empezar a donar'}
            </p>
          </div>
        </div>

        <ProfileForm profile={profile} />
      </div>
    </div>
  )
}
