'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

/**
 * Reserve a donation for an NGO.
 */
export async function reserveDonation(donationId: string) {
  const token = (await cookies()).get('token')?.value
  if (!token) return { error: 'No autenticado' }

  const { api } = await import('@/lib/api/client')
  const result = await api.donations.reserve(donationId, token)

  if (!result.success) {
    return { error: result.error || 'Error al reservar' }
  }

  revalidatePath('/ong/dashboard')
  revalidatePath('/ong/donaciones')
  return { success: true }
}

/**
 * Mark a reservation as picked up by the NGO
 */
export async function markAsPickedUp(reservationId: string) {
  const token = (await cookies()).get('token')?.value
  if (!token) return { error: 'No autenticado' }

  const { api } = await import('@/lib/api/client')
  const result = await api.reservations.pickup(reservationId, token)

  if (!result.success) return { error: 'Error al marcar recogida' }

  revalidatePath('/ong/dashboard')
  revalidatePath('/ong/donaciones')
  return { success: true }
}
