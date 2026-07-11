import { requireAuth } from '@/lib/api/auth-helper'
import { api } from '@/lib/api/client'
import Link from 'next/link'
import { ArrowLeft, Building2 } from 'lucide-react'
import NgoProfileForm from './ngo-profile-form'

export default async function NgoProfilePage() {
  const user = await requireAuth()

  // Get NGO profile for the authenticated user via dashboard endpoint
  const { data: dashboardData } = await api.dashboards.ngo(user.token)
  const profile = dashboardData?.ngo || null

  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-100">
      <div className="max-w-lg mx-auto px-4 py-12">
        <Link href="/ong/dashboard" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Volver al panel
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-amber-900/40 border border-amber-700/30 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Perfil de entidad social</h1>
            <p className="text-sm text-zinc-500">
              {profile ? 'Actualiza los datos de tu entidad' : 'Completa los datos para empezar'}
            </p>
          </div>
        </div>

        <NgoProfileForm profile={profile} />
      </div>
    </div>
  )
}
