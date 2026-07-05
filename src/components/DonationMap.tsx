'use client'

import { useEffect, useRef, useState } from 'react'

interface DonationMapProps {
  donations: Array<{
    id?: string
    commerce_name?: string
    commerce_city?: string
    commerce_address?: string
    food_type?: string
    amount?: number
    created_at?: string
  }>
  height?: string
  center?: [number, number]
  zoom?: number
}

interface Marker {
  lat: number
  lng: number
  name: string
  details: string
}

export default function DonationMap({
  donations,
  height = '400px',
  center: defaultCenter,
  zoom = 6,
}: DonationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const markersLayer = useRef<any>(null)
  const [markers, setMarkers] = useState<Marker[]>([])
  const [loading, setLoading] = useState(true)

  // Geocode cities to coordinates using Nominatim (free, no API key)
  useEffect(() => {
    async function geocode() {
      setLoading(true)
      const results: Marker[] = []
      const cache = new Map<string, [number, number]>()

      for (const d of donations) {
        const city = d.commerce_city || d.commerce_address || ''
        if (!city) continue

        let coords = cache.get(city)
        if (!coords) {
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1&countrycodes=es`,
              { headers: { 'Accept-Language': 'es' } }
            )
            const data = await res.json()
            if (data?.[0]) {
              coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)]
              cache.set(city, coords)
            }
          } catch {
            // skip failed geocoding
          }
        }

        if (coords) {
          results.push({
            lat: coords[0],
            lng: coords[1],
            name: d.commerce_name || 'Comercio',
            details: `${d.food_type || ''} — ${d.amount ? d.amount + ' kg' : ''}`,
          })
        }
      }

      setMarkers(results)
      setLoading(false)
    }

    geocode()
  }, [donations])

  // Initialize map
  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return

    async function initMap() {
      const L = await import('leaflet')

      // Fix default icon paths (Leaflet + bundler issue)
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })

      if (!mapInstance.current) {
        mapInstance.current = L.map(mapRef.current!).setView(
          defaultCenter || [40.4168, -3.7038],
          zoom
        )

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(mapInstance.current)
      }
    }

    initMap()

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [])

  // Update markers
  useEffect(() => {
    if (!mapInstance.current || markers.length === 0) return

    async function updateMarkers() {
      const L = await import('leaflet')

      if (markersLayer.current) {
        mapInstance.current!.removeLayer(markersLayer.current)
      }

      markersLayer.current = L.layerGroup().addTo(mapInstance.current!)

      const bounds: [number, number][] = []

      markers.forEach((m) => {
        const marker = L.marker([m.lat, m.lng])
          .bindPopup(`<b>${m.name}</b><br/>${m.details}`)
        markersLayer.current!.addLayer(marker)
        bounds.push([m.lat, m.lng])
      })

      if (bounds.length > 1) {
        mapInstance.current!.fitBounds(bounds, { padding: [50, 50] })
      }
    }

    updateMarkers()
  }, [markers])

  return (
    <div className="relative">
      <div ref={mapRef} style={{ height, width: '100%' }} className="rounded-xl border border-zinc-700/30 z-0" />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/60 rounded-xl">
          <div className="text-sm text-zinc-400">Cargando mapa…</div>
        </div>
      )}
    </div>
  )
}
