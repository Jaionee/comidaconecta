'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string
  const role = formData.get('role') as 'commerce' | 'ngo'

  if (!email || !password || !name || !role) {
    return { error: 'Todos los campos obligatorios deben completarse' }
  }

  if (password.length < 6) {
    return { error: 'La contraseña debe tener al menos 6 caracteres' }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role, name },
    },
  })

  if (error) {
    if (error.message.includes('already registered')) {
      return { error: 'Este email ya está registrado' }
    }
    return { error: error.message }
  }

  if (data.user) {
    // Crear perfil en la tabla profiles
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      email,
      role,
      name,
      phone: phone || null,
    })

    if (profileError) {
      console.error('Error creating profile:', profileError)
    }
  }

  revalidatePath('/')
  if (role === 'commerce') redirect('/comercio/perfil')
  else redirect('/ong/perfil')
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email y contraseña son obligatorios' }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'Email o contraseña incorrectos' }
  }

  // Obtener el rol del usuario
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single()

  revalidatePath('/')

  if (profile?.role === 'commerce') redirect('/comercio/dashboard')
  else if (profile?.role === 'ngo') redirect('/ong/dashboard')
  else if (profile?.role === 'admin') redirect('/admin')
  else redirect('/')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/')
  redirect('/')
}
