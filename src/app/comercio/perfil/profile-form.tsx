'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createCommerceProfile } from '@/app/actions/profiles'

const BUSINESS_TYPES = [
  { value: 'bakery', label: 'Panadería / Pastelería' },
  { value: 'restaurant', label: 'Restaurante' },
  { value: 'grocery', label: 'Tienda de comestibles' },
  { value: 'supermarket', label: 'Supermercado' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'catering', label: 'Catering' },
  { value: 'other', label: 'Otro' },
]

export default function ProfileForm({ profile }: { profile: any }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const form = new FormData(e.currentTarget)
    const result = await createCommerceProfile(form)
    setLoading(false)
    if (result?.error) setError(result.error)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-zinc-300">Nombre del negocio *</label>
        <input name="business_name" type="text" required defaultValue={profile?.business_name || ''}
          className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-zinc-300">Tipo de negocio *</label>
        <select name="business_type" required defaultValue={profile?.business_type || ''}
          className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50">
          <option value="">Seleccionar...</option>
          {BUSINESS_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-zinc-300">Dirección *</label>
        <input name="address" type="text" required defaultValue={profile?.address || ''} placeholder="Calle, número, piso"
          className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-zinc-300">Municipio *</label>
        <input name="city" type="text" required defaultValue={profile?.city || ''} placeholder="Bilbao, Getxo..."
          className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-zinc-300">Persona de contacto *</label>
        <input name="contact_person" type="text" required defaultValue={profile?.contact_person || ''}
          className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-300">Teléfono *</label>
          <input name="phone" type="tel" required defaultValue={profile?.phone || ''}
            className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-300">Email *</label>
          <input name="email" type="email" required defaultValue={profile?.email || ''}
            className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-zinc-300">Horario</label>
        <input name="business_hours" type="text" defaultValue={profile?.business_hours || ''} placeholder="Lun-Vie 9:00-20:00, Sáb 10:00-14:00"
          className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-zinc-300">Descripción</label>
        <textarea name="description" rows={3} defaultValue={profile?.description || ''} placeholder="Breve descripción de tu negocio..."
          className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50 resize-none" />
      </div>

      {error && (
        <div className="text-red-400 text-sm bg-red-900/20 border border-red-800/30 rounded-lg px-3 py-2">{error}</div>
      )}

      <button type="submit" disabled={loading}
        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-2.5 rounded-lg font-medium transition-colors mt-2">
        {loading ? 'Guardando...' : profile ? 'Actualizar perfil' : 'Crear perfil'}
      </button>
    </form>
  )
}
