'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

/**
 * Reserve a donation for an NGO. Handles concurrency via a unique constraint
 * (donation_id + status=reserved) and a simple transaction check.
 */
export async function reserveDonation(donationId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autenticado' }

  // Get NGO id
  const { data: ngo } = await supabase
    .from('ngos')
    .select('id, status')
    .eq('user_id', user.id)
    .single()

  if (!ngo) return { error: 'Completa tu perfil primero' }
  if (ngo.status !== 'active') return { error: 'Tu perfil está pendiente de verificación' }

  // Check donation is still available
  const { data: donation } = await supabase
    .from('donations')
    .select('id, status')
    .eq('id', donationId)
    .single()

  if (!donation || donation.status !== 'available') {
    return { error: 'Esta donación ya no está disponible' }
  }

  // Try to insert (unique constraint on donation_id where status=reserved prevents double reservation)
  const { error: insertError } = await supabase.from('reservations').insert({
    donation_id: donationId,
    ngo_id: ngo.id,
    status: 'reserved',
  })

  if (insertError) {
    if (insertError.code === '23505') { // unique violation
      return { error: 'Alguien ya ha reservado esta donación' }
    }
    return { error: 'Error al reservar' }
  }

  // Update donation status
  await supabase
    .from('donations')
    .update({ status: 'reserved', updated_at: new Date().toISOString() })
    .eq('id', donationId)

  revalidatePath('/ong/dashboard')
  revalidatePath('/ong/donaciones')
  return { success: true }
}

/**
 * Mark a reservation as picked up by the NGO
 */
export async function markAsPickedUp(reservationId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autenticado' }

  const { error } = await supabase
    .from('reservations')
    .update({
      status: 'picked_up',
      ngo_confirmed_at: new Date().toISOString(),
    })
    .eq('id', reservationId)

  if (error) return { error: 'Error al marcar recogida' }

  revalidatePath('/ong/dashboard')
  revalidatePath('/ong/donaciones')
  return { success: true }
}
