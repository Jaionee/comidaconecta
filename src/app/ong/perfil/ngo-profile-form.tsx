'use client'

import { useState } from 'react'
import { createNgoProfile } from '@/app/actions/profiles'

const FOOD_NEEDS = [
  'Pan y bollería',
  'Frutas y verduras',
  'Comida preparada',
  'Envasado / No perecedero',
  'Lácteos',
  'Carne / Pescado',
  'Menú completo',
  'Otros',
]

export default function NgoProfileForm({ profile }: { profile: any }) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const form = new FormData(e.currentTarget)
    const result = await createNgoProfile(form)
    setLoading(false)
    if (result?.error) setError(result.error)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-zinc-300">Nombre de la entidad *</label>
        <input name="organization_name" type="text" required defaultValue={profile?.organization_name || ''}
          className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/50" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-zinc-300">CIF / NIF</label>
        <input name="tax_id" type="text" defaultValue={profile?.tax_id || ''}
          className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/50" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-zinc-300">Dirección *</label>
        <input name="address" type="text" required defaultValue={profile?.address || ''}
          className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/50" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-zinc-300">Municipio *</label>
        <input name="city" type="text" required defaultValue={profile?.city || ''}
          className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/50" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-zinc-300">Persona de contacto *</label>
        <input name="contact_person" type="text" required defaultValue={profile?.contact_person || ''}
          className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/50" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-300">Teléfono *</label>
          <input name="phone" type="tel" required defaultValue={profile?.phone || ''}
            className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/50" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-300">Email *</label>
          <input name="email" type="email" required defaultValue={profile?.email || ''}
            className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/50" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-zinc-300">Tipos de alimentos que necesitáis</label>
        <div className="grid grid-cols-2 gap-2">
          {FOOD_NEEDS.map(type => {
            const checked = profile?.food_needs?.includes(type)
            return (
              <label key={type} className="flex items-center gap-2 text-sm text-zinc-300">
                <input type="checkbox" name="food_needs" value={type} defaultChecked={checked}
                  className="accent-amber-500" />
                {type}
              </label>
            )
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-zinc-300">Descripción</label>
        <textarea name="description" rows={3} defaultValue={profile?.description || ''} placeholder="¿A quién ayudáis? ¿Qué horario tenéis?"
          className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/50 resize-none" />
      </div>

      {error && (
        <div className="text-red-400 text-sm bg-red-900/20 border border-red-800/30 rounded-lg px-3 py-2">{error}</div>
      )}

      <button type="submit" disabled={loading}
        className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white py-2.5 rounded-lg font-medium transition-colors mt-2">
        {loading ? 'Guardando...' : profile ? 'Actualizar perfil' : 'Crear perfil'}
      </button>
    </form>
  )
}
