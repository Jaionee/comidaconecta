'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Leaf, ArrowLeft, Store, Utensils, MapPin, Crosshair } from 'lucide-react'
import { createDonation } from '@/app/actions/donations'

const FOOD_TYPES = [
  { value: 'bakery', label: 'Pan y bollería' },
  { value: 'fruits-vegetables', label: 'Frutas y verduras' },
  { value: 'prepared-food', label: 'Comida preparada' },
  { value: 'packaged', label: 'Envasado / No perecedero' },
  { value: 'menu', label: 'Menú completo' },
  { value: 'other', label: 'Otros' },
]

export default function NewDonationPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)

  // Default pickup deadline to tomorrow at closing time
  // Build local datetime string without using toISOString() (which converts to UTC)
  const tomorrow = new Date(Date.now() + 86400000)
  const localDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 18, 0)
  const pad = (n: number) => String(n).padStart(2, '0')
  const defaultDeadline = `${localDate.getFullYear()}-${pad(localDate.getMonth() + 1)}-${pad(localDate.getDate())}T${pad(localDate.getHours())}:${pad(localDate.getMinutes())}`

  async function detectLocation() {
    if (!navigator.geolocation) {
      setGeoStatus('error')
      return
    }
    setGeoStatus('loading')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setGeoStatus('success')
      },
      () => {
        setGeoStatus('error')
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const form = new FormData(e.currentTarget)
    if (coords) {
      form.set('latitude', String(coords.lat))
      form.set('longitude', String(coords.lng))
    }
    const result = await createDonation(form)
    setLoading(false)
    if (result?.error) setError(result.error)
  }

  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-100">
      <div className="max-w-lg mx-auto px-4 py-12">
        <Link href="/comercio/dashboard" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Volver al dashboard
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-emerald-900/40 border border-emerald-700/30 flex items-center justify-center">
            <Utensils className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Nueva donación</h1>
            <p className="text-sm text-zinc-500">Publica el excedente disponible para recogida</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-300">Título *</label>
            <input name="title" type="text" required placeholder="Ej: Excedente de pan artesanal"
              className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-300">Descripción *</label>
            <textarea name="description" required rows={3} placeholder="Describe qué alimentos son y en qué estado se encuentran..."
              className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50 resize-none" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-300">Tipo de alimento *</label>
            <select name="food_type" required
              className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50">
              <option value="">Seleccionar...</option>
              {FOOD_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-300">Cantidad *</label>
              <input name="quantity_text" type="text" required placeholder="Ej: 10 kg, 5 bandejas"
                className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-300">Raciones aprox. *</label>
              <input name="estimated_servings" type="number" required min="1"
                className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-300">Dirección de recogida *</label>
            <input name="pickup_address" type="text" required placeholder="Dirección donde recoger"
              className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50" />
          </div>

          <div className="border border-zinc-700/30 rounded-lg p-3">
            <label className="block text-sm font-medium mb-2 text-zinc-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Ubicación (GPS)
            </label>
            <input type="hidden" name="latitude" value={coords?.lat ?? ''} />
            <input type="hidden" name="longitude" value={coords?.lng ?? ''} />
            <button type="button" onClick={detectLocation} disabled={geoStatus === 'loading'}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors w-full
                disabled:opacity-50
                ${geoStatus === 'success'
                  ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-700/30'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700'}"
            >
              <Crosshair className={`w-4 h-4 ${geoStatus === 'loading' ? 'animate-spin' : ''}`} />
              {geoStatus === 'idle' && 'Detectar ubicación actual'}
              {geoStatus === 'loading' && 'Detectando ubicación...'}
              {geoStatus === 'success' && `📍 ${coords!.lat.toFixed(5)}, ${coords!.lng.toFixed(5)}`}
              {geoStatus === 'error' && 'No se pudo obtener la ubicación — pulsa para reintentar'}
            </button>
            <p className="text-[10px] text-zinc-600 mt-1.5 leading-tight">
              La ubicación ayuda a las ONGs a encontrar tu donación más fácilmente.
              Solo se envía al publicar la donación.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-300">Fecha límite de recogida *</label>
            <input name="pickup_deadline" type="datetime-local" required defaultValue={defaultDeadline}
              className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50" />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-900/20 border border-red-800/30 rounded-lg px-3 py-2">{error}</div>
          )}

          <button type="submit" disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-2.5 rounded-lg font-medium transition-colors mt-2">
            {loading ? 'Publicando...' : 'Publicar donación'}
          </button>
        </form>
      </div>
    </div>
  )
}
