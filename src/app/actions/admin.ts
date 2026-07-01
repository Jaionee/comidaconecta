'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function verifyCommerce(commerceId: string, action: 'approve' | 'reject') {
  const token = (await cookies()).get('token')?.value
  if (!token) return { error: 'No autenticado' }

  const { api } = await import('@/lib/api/client')
  const result = await api.admin.verifyCommerce(commerceId, token)

  if (!result.success) return { error: 'Error al actualizar' }
  revalidatePath('/admin/dashboard')
  return { success: true }
}

export async function verifyNgo(ngoId: string, action: 'approve' | 'reject') {
  const token = (await cookies()).get('token')?.value
  if (!token) return { error: 'No autenticado' }

  const { api } = await import('@/lib/api/client')
  const result = await api.admin.verifyCommerce(ngoId, token)

  if (!result.success) return { error: 'Error al actualizar' }
  revalidatePath('/admin/dashboard')
  return { success: true }
}

export async function deleteDonation(donationId: string) {
  const token = (await cookies()).get('token')?.value
  if (!token) return { error: 'No autenticado' }

  const { api } = await import('@/lib/api/client')
  const result = await api.donations.delete(donationId, token)

  if (!result.success) return { error: 'Error al eliminar' }
  revalidatePath('/admin/donaciones')
  revalidatePath('/admin/dashboard')
  return { success: true }
}
