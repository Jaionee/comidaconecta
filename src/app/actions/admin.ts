'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function verifyCommerce(commerceId: string, action: 'approve' | 'reject') {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autenticado' }

  // Check admin role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') return { error: 'No autorizado' }

  const { error } = await supabase
    .from('commerces')
    .update({
      status: action === 'approve' ? 'active' : 'rejected',
      verified_at: new Date().toISOString(),
    })
    .eq('id', commerceId)

  if (error) return { error: 'Error al actualizar' }
  revalidatePath('/admin/dashboard')
  return { success: true }
}

export async function verifyNgo(ngoId: string, action: 'approve' | 'reject') {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autenticado' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') return { error: 'No autorizado' }

  const { error } = await supabase
    .from('ngos')
    .update({
      status: action === 'approve' ? 'active' : 'rejected',
      verified_at: new Date().toISOString(),
    })
    .eq('id', ngoId)

  if (error) return { error: 'Error al actualizar' }
  revalidatePath('/admin/dashboard')
  return { success: true }
}

export async function deleteDonation(donationId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autenticado' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') return { error: 'No autorizado' }

  await supabase.from('reservations').delete().eq('donation_id', donationId)
  await supabase.from('donations').delete().eq('id', donationId)

  revalidatePath('/admin/donaciones')
  revalidatePath('/admin/dashboard')
  return { success: true }
}
