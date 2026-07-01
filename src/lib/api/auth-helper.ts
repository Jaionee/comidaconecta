import { cookies } from 'next/headers'
import { api } from './client'

export interface AuthUser {
  id: string
  email: string
  name: string
  phone: string
  role: 'admin' | 'commerce' | 'ngo'
  token: string
}

export async function getAuthUser(): Promise<AuthUser | null> {
  const token = (await cookies()).get('token')?.value
  if (!token) return null

  const result = await api.auth.me(token)
  if (!result.success || !result.data) return null

  return { ...result.data as any, token }
}

export async function requireAuth(redirectTo = '/login'): Promise<AuthUser> {
  const user = await getAuthUser()
  if (!user) {
    const { redirect } = await import('next/navigation')
    redirect(redirectTo)
    return Promise.reject(new Error('redirect'))
  }
  return user
}
