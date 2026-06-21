'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { XCircle, CheckCircle } from 'lucide-react'

type Props = {
  donationId: string
  actionType: 'cancel' | 'confirm'
  cancelAction?: (id: string) => Promise<{ success?: boolean; error?: string }>
  confirmAction?: (id: string) => Promise<{ success?: boolean; error?: string }>
}

export default function DashboardActions({ donationId, actionType, cancelAction, confirmAction }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleClick() {
    setLoading(true)
    if (actionType === 'cancel' && cancelAction) {
      await cancelAction(donationId)
    } else if (actionType === 'confirm' && confirmAction) {
      await confirmAction(donationId)
    }
    setLoading(false)
    router.refresh()
  }

  if (actionType === 'cancel') {
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
      >
        <XCircle className="w-3.5 h-3.5" />
        {loading ? 'Cancelando...' : 'Cancelar donación'}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
    >
      {loading ? 'Confirmando...' : 'Confirmar recogida'}
    </button>
  )
}
