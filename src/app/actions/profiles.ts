'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createCommerceProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autenticado' }

  const profile = {
    user_id: user.id,
    business_name: formData.get('business_name') as string,
    business_type: formData.get('business_type') as string,
    address: formData.get('address') as string,
    city: formData.get('city') as string,
    contact_person: formData.get('contact_person') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    business_hours: (formData.get('business_hours') as string) || null,
    description: (formData.get('description') as string) || null,
  }

  if (!profile.business_name || !profile.business_type || !profile.address || !profile.city) {
    return { error: 'Completa todos los campos obligatorios' }
  }

  // Check if commerce profile already exists
  const { data: existing } = await supabase
    .from('commerces')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (existing) {
    const { error } = await supabase
      .from('commerces')
      .update(profile)
      .eq('id', existing.id)

    if (error) return { error: error.message }
  } else {
    const { error } = await supabase
      .from('commerces')
      .insert(profile)

    if (error) return { error: error.message }
  }

  revalidatePath('/comercio/perfil')
  redirect('/comercio/dashboard')
}

export async function createNgoProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autenticado' }

  const acceptedFoodTypesStr = formData.get('accepted_food_types') as string
  const acceptedFoodTypes = acceptedFoodTypesStr ? acceptedFoodTypesStr.split(',').filter(Boolean) : []

  const profile = {
    user_id: user.id,
    organization_name: formData.get('organization_name') as string,
    organization_type: formData.get('organization_type') as string,
    address: formData.get('address') as string,
    city: formData.get('city') as string,
    contact_person: formData.get('contact_person') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    accepted_food_types: acceptedFoodTypes,
    pickup_hours: (formData.get('pickup_hours') as string) || null,
    description: (formData.get('description') as string) || null,
  }

  if (!profile.organization_name || !profile.organization_type || !profile.address || !profile.city) {
    return { error: 'Completa todos los campos obligatorios' }
  }

  const { data: existing } = await supabase
    .from('ngos')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (existing) {
    const { error } = await supabase
      .from('ngos')
      .update(profile)
      .eq('id', existing.id)

    if (error) return { error: error.message }
  } else {
    const { error } = await supabase
      .from('ngos')
      .insert(profile)

    if (error) return { error: error.message }
  }

  revalidatePath('/ong/perfil')
  redirect('/ong/dashboard')
}
