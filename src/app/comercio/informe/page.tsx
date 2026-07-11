import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/api/auth-helper'
import { api } from '@/lib/api/client'
import Link from 'next/link'
import { Leaf, FileText, Calendar, TrendingUp, Scale, Heart } from 'lucide-react'

export default async function CommerceMonthlyReport() {
  const user = await requireAuth()

  const { data: dashboardData } = await api.dashboards.commerce(user.token)
  const commerce = dashboardData?.commerce || null

  if (!commerce) redirect('/comercio/perfil')

  // Get donations for current month
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  const { data: donations } = await api.donations.list(user.token)
  const donationsList = Array.isArray(donations) ? donations : []

  const currentMonthDonations = donationsList.filter((d: any) =>
    d.created_at && d.created_at >= monthStart
  )

  const collected = currentMonthDonations.filter((d: any) => d.status === 'collected') || []
  const totalDonations = currentMonthDonations.length
  const totalCollected = collected.length
  const totalServings = collected.reduce((sum: number, d: any) => sum + (d.estimated_servings || 0), 0)
  const uniqueNgos = new Set(
    collected
      .map((d: any) => d.ngo_name)
      .filter(Boolean)
  )

  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-100">
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-zinc-900/50 border-r border-zinc-800 hidden md:flex flex-col">
        <div className="p-5 border-b border-zinc-800">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span className="font-bold">ComidaConecta</span>
          </Link>
        </div>
        <nav className="flex-1 min-h-0 overflow-y-auto p-3 space-y-1">
          <Link href="/comercio/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 text-sm">Dashboard</Link>
          <Link href="/comercio/donar" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 text-sm">Nueva donación</Link>
          <Link href="/comercio/historial" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 text-sm">Historial</Link>
          <Link href="/comercio/informe" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-900/20 text-emerald-300 text-sm font-medium">Informe mensual</Link>
          <Link href="/comercio/perfil" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 text-sm">Mi perfil</Link>
        </nav>
      </aside>

      <main className="md:ml-64 pt-14 md:pt-0">
        <div className="max-w-3xl mx-auto p-4 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-emerald-400" />
            <div>
              <h1 className="text-2xl font-bold">Informe de impacto mensual</h1>
              <p className="text-sm text-zinc-500">
                {commerce.business_name || 'Comercio'} · {now.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4 text-center">
              <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{totalDonations}</div>
              <div className="text-xs text-zinc-400">Donaciones publicadas</div>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4 text-center">
              <Heart className="w-5 h-5 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{totalCollected}</div>
              <div className="text-xs text-zinc-400">Donaciones recogidas</div>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4 text-center">
              <Scale className="w-5 h-5 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{totalServings}</div>
              <div className="text-xs text-zinc-400">Raciones donadas</div>
            </div>
            <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4 text-center">
              <Calendar className="w-5 h-5 text-zinc-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{uniqueNgos.size}</div>
              <div className="text-xs text-zinc-400">Entidades beneficiadas</div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-900/10 border border-amber-700/20 rounded-xl p-4 text-xs text-amber-200/70 mb-8">
            <p className="font-medium text-amber-300 mb-1">⚠️ Aviso importante</p>
            <p>
              Este informe es una herramienta informativa de trazabilidad y gestión interna.
              No constituye un documento fiscal ni una certificación oficial ante la Agencia
              Tributaria. Consulta con tu asesoría fiscal sobre posibles deducciones por donaciones.
            </p>
          </div>

          {/* Detail table */}
          {collected.length > 0 && (
            <div>
              <h2 className="font-semibold mb-3">Donaciones recogidas este mes</h2>
              <div className="space-y-2">
                {collected.map((d: any) => (
                  <div key={d.id} className="bg-zinc-800/20 border border-zinc-700/20 rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{d.title || d.description}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">
                        {d.estimated_servings || 0} raciones · {d.quantity_text || d.amount}
                      </div>
                    </div>
                    <div className="text-xs text-zinc-500 text-right">
                      <div>{new Date(d.created_at).toLocaleDateString('es-ES')}</div>
                      {d.ngo_name && (
                        <div className="text-emerald-400">{d.ngo_name}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
