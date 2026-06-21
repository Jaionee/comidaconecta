'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, MapPin, Store, Trash2 } from 'lucide-react'

type Props = {
  donation: any
  deleteAction: (id: string) => Promise<{ success?: boolean; error?: string }>
}

const statusColors: Record<string, string> = {
  available: 'text-emerald-400 bg-emerald-900/20',
  reserved: 'text-amber-400 bg-amber-900/20',
  collected: 'text-blue-400 bg-blue-900/20',
  cancelled: 'text-red-400 bg-red-900/20',
  expired: 'text-zinc-500 bg-zinc-800/30',
}

export default function DonationRow({ donation, deleteAction }: Props) {
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('¿Eliminar esta donación y sus reservas?')) return
    setDeleting(true)
    await deleteAction(donation.id)
    setDeleting(false)
    router.refresh()
  }

  return (
    <div className="bg-zinc-800/30 border border-zinc-700/30 rounded-xl p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-medium">{donation.title}</div>
          <div className="text-xs text-zinc-500 mt-1 space-y-1">
            <div className="flex items-center gap-1.5"><Store className="w-3 h-3" />{donation.commerces?.business_name}</div>
            <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{donation.pickup_address}</div>
            <div className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{new Date(donation.created_at).toLocaleDateString('es-ES')}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[donation.status] || statusColors.expired}`}>
            {donation.status}
          </span>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-zinc-600 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
