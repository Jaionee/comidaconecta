'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, XCircle } from 'lucide-react'

type Props = {
  userId: string
  type: 'commerce' | 'ngo'
  action: 'approve' | 'reject'
  serverAction: (id: string, act: 'approve' | 'reject') => Promise<{ success?: boolean; error?: string }>
}

export default function AdminActions({ userId, type, action, serverAction }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleClick() {
    setLoading(true)
    await serverAction(userId, action)
    setLoading(false)
    router.refresh()
  }

  if (action === 'approve') {
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        className="flex items-center gap-1 text-xs bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-2.5 py-1 rounded-lg transition-colors"
      >
        <CheckCircle className="w-3 h-3" />
        {loading ? '...' : 'Aprobar'}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-1 text-xs bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white px-2.5 py-1 rounded-lg transition-colors"
    >
      <XCircle className="w-3 h-3" />
      {loading ? '...' : 'Rechazar'}
    </button>
  )
}
