'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function createCommerceProfile(formData: FormData) {
  const token = (await cookies()).get('token')?.value
  if (!token) return { error: 'No autenticado' }

  const { api } = await import('@/lib/api/client')

  const profile = {
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

  // Create commerce profile via API
  const result = await api.commerces.create(profile, token)
  if (!result.success) return { error: result.error || 'Error al crear perfil' }

  revalidatePath('/comercio/perfil')
  redirect('/comercio/dashboard')
}

export async function createNgoProfile(formData: FormData) {
  const token = (await cookies()).get('token')?.value
  if (!token) return { error: 'No autenticado' }

  const { api } = await import('@/lib/api/client')

  const acceptedFoodTypesStr = formData.get('accepted_food_types') as string
  const acceptedFoodTypes = acceptedFoodTypesStr ? acceptedFoodTypesStr.split(',').filter(Boolean) : []

  const profile = {
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

  const missing: string[] = []
  if (!profile.organization_name) missing.push('Nombre de la entidad')
  if (!profile.organization_type) missing.push('Tipo de entidad')
  if (!profile.address) missing.push('Dirección')
  if (!profile.city) missing.push('Municipio')
  if (missing.length > 0) {
    return { error: `Campos obligatorios: ${missing.join(', ')}` }
  }

  const result = await api.ngos.create(profile, token)
  if (!result.success) return { error: result.error || 'Error al crear perfil' }

  revalidatePath('/ong/perfil')
  redirect('/ong/dashboard')
}
