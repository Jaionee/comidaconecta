'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createDonation(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autenticado' }

  // Get commerce id
  const { data: commerce } = await supabase
    .from('commerces')
    .select('id, status')
    .eq('user_id', user.id)
    .single()

  if (!commerce) return { error: 'Completa tu perfil de comercio primero' }
  if (commerce.status !== 'active') return { error: 'Tu perfil está pendiente de verificación por el administrador' }

  const donation = {
    commerce_id: commerce.id,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    food_type: formData.get('food_type') as string,
    quantity_text: formData.get('quantity_text') as string,
    estimated_servings: parseInt(formData.get('estimated_servings') as string) || 1,
    pickup_address: formData.get('pickup_address') as string,
    pickup_deadline: formData.get('pickup_deadline') as string,
  }

  if (!donation.title || !donation.description || !donation.food_type || !donation.quantity_text || !donation.pickup_deadline) {
    return { error: 'Completa todos los campos obligatorios' }
  }

  const { error } = await supabase.from('donations').insert(donation)

  if (error) {
    console.error('Error creating donation:', error)
    return { error: 'Error al publicar la donación' }
  }

  revalidatePath('/comercio/dashboard')
  revalidatePath('/comercio/donaciones')
  redirect('/comercio/dashboard')
}

export async function cancelDonation(donationId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autenticado' }

  const { error } = await supabase
    .from('donations')
    .update({ status: 'cancelled', updated_at: new Date().toISOString() })
    .eq('id', donationId)

  if (error) return { error: 'Error al cancelar' }

  revalidatePath('/comercio/dashboard')
  revalidatePath('/comercio/donaciones')
  return { success: true }
}

export async function confirmCollection(reservationId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autenticado' }

  const { error } = await supabase
    .from('reservations')
    .update({
      status: 'collected',
      commerce_confirmed_at: new Date().toISOString(),
    })
    .eq('id', reservationId)

  if (error) return { error: 'Error al confirmar' }

  // Also update donation status
  const { data: res } = await supabase
    .from('reservations')
    .select('donation_id')
    .eq('id', reservationId)
    .single()

  if (res) {
    await supabase
      .from('donations')
      .update({ status: 'collected', updated_at: new Date().toISOString() })
      .eq('id', res.donation_id)
  }

  revalidatePath('/comercio/dashboard')
  revalidatePath('/comercio/donaciones')
  return { success: true }
}
