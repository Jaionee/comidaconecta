'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function createDonation(formData: FormData) {
  const token = (await cookies()).get('token')?.value
  if (!token) return { error: 'No autenticado' }

  const { api } = await import('@/lib/api/client')

  const donation = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    food_type: formData.get('food_type') as string,
    quantity_text: formData.get('quantity_text') as string,
    estimated_servings: parseInt(formData.get('estimated_servings') as string) || 1,
    pickup_address: formData.get('pickup_address') as string,
    pickup_deadline: formData.get('pickup_deadline') as string,
    latitude: formData.get('latitude') ? parseFloat(formData.get('latitude') as string) : undefined,
    longitude: formData.get('longitude') ? parseFloat(formData.get('longitude') as string) : undefined,
  }

  if (!donation.title || !donation.description || !donation.food_type || !donation.quantity_text || !donation.pickup_deadline) {
    return { error: 'Completa todos los campos obligatorios' }
  }

  const result = await api.donations.create(donation, token)
  if (!result.success) return { error: result.error || 'Error al publicar la donación' }

  revalidatePath('/comercio/dashboard')
  revalidatePath('/comercio/donaciones')
  redirect('/comercio/dashboard')
}

export async function cancelDonation(donationId: string) {
  const token = (await cookies()).get('token')?.value
  if (!token) return { error: 'No autenticado' }

  const { api } = await import('@/lib/api/client')
  const result = await api.donations.delete(donationId, token)
  if (!result.success) return { error: 'Error al cancelar' }

  revalidatePath('/comercio/dashboard')
  revalidatePath('/comercio/donaciones')
  return { success: true }
}

export async function confirmCollection(reservationId: string) {
  const token = (await cookies()).get('token')?.value
  if (!token) return { error: 'No autenticado' }

  const { api } = await import('@/lib/api/client')
  const result = await api.donations.collect(reservationId, token)
  if (!result.success) return { error: 'Error al confirmar' }

  revalidatePath('/comercio/dashboard')
  revalidatePath('/comercio/donaciones')
  return { success: true }
}
