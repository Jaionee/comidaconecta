'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

// Helper: read token from cookie
async function getToken(): Promise<string | null> {
  const c = await cookies()
  return c.get('token')?.value || null
}

// Helper: set token cookie
async function setToken(token: string) {
  const c = await cookies()
  c.set('token', token, {
    httpOnly: true, secure: true, sameSite: 'lax',
    path: '/', maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

// Helper: clear token cookie
async function clearToken() {
  const c = await cookies()
  c.delete('token')
}

export async function signup(formData: FormData) {
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

  const { api } = await import('@/lib/api/client')
  const result = await api.auth.register(email, password, name, phone, role)

  if (!result.success) {
    const msg = result.error || ''
    if (msg.toLowerCase().includes('already') || msg.toLowerCase().includes('exist')) {
      return { error: 'Este email ya está registrado' }
    }
    return { error: msg }
  }

  // Auto-login after signup
  const loginResult = await api.auth.login(email, password)
  if (loginResult.success && loginResult.data?.token) {
    await setToken(loginResult.data.token)
  }

  revalidatePath('/')
  if (role === 'commerce') redirect('/comercio/perfil')
  else redirect('/ong/perfil')
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email y contraseña son obligatorios' }
  }

  const { api } = await import('@/lib/api/client')
  const result = await api.auth.login(email, password)

  if (!result.success) {
    return { error: 'Email o contraseña incorrectos' }
  }

  if (!result.data?.token) {
    return { error: 'Error al obtener sesión' }
  }

  await setToken(result.data.token)
  const user = result.data.user
  revalidatePath('/')

  if (user.role === 'commerce') redirect('/comercio/dashboard')
  else if (user.role === 'ngo') redirect('/ong/dashboard')
  else if (user.role === 'admin') redirect('/admin/dashboard')
  else redirect('/')
}

export async function logout() {
  await clearToken()
  revalidatePath('/')
  redirect('/')
}
