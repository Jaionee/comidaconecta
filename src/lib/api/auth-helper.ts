import { cookies } from 'next/headers'

export interface AuthUser {
  id: string
  email: string
  name: string
  phone: string
  role: 'admin' | 'commerce' | 'ngo'
  token: string
}

// Decode JWT payload without verifying signature (for server-side use only)
// The Worker API always verifies the signature on actual data operations
function decodeJWTPayload(token: string): Record<string, any> | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'))
    return payload
  } catch {
    return null
  }
}

export async function getAuthUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) return null

  // Decode JWT locally to avoid Worker API calls from Vercel server
  const payload = decodeJWTPayload(token)
  if (!payload || !payload.sub || !payload.email) return null

  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name || '',
    phone: payload.phone || '',
    role: payload.role || 'ngo',
    token,
  }
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
