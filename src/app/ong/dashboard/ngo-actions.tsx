'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  donationId?: string
  reservationId?: string
  actionType: 'reserve' | 'pickup'
  reserveAction?: (id: string) => Promise<{ success?: boolean; error?: string }>
  markAction?: (id: string) => Promise<{ success?: boolean; error?: string }>
}

export default function NgoActions({ donationId, reservationId, actionType, reserveAction, markAction }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleClick() {
    setLoading(true)
    setError('')
    const id = donationId || reservationId
    if (!id) return
    if (actionType === 'reserve' && reserveAction) {
      const result = await reserveAction(id)
      if (result?.error) setError(result.error)
    } else if (actionType === 'pickup' && markAction) {
      const result = await markAction(id)
      if (result?.error) setError(result.error)
    }
    setLoading(false)
    router.refresh()
  }

  if (actionType === 'reserve') {
    return (
      <div>
        <button
          onClick={handleClick}
          disabled={loading}
          className="mt-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
        >
          {loading ? 'Reservando...' : 'Reservar donación'}
        </button>
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    )
  }

  if (actionType === 'pickup') {
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
      >
        {loading ? 'Registrando...' : 'Marcar como recogido'}
      </button>
    )
  }

  return null
}
