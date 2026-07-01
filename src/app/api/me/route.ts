// Internal API route to check current user from httpOnly cookie
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const token = (await cookies()).get('token')?.value
  if (!token) {
    return NextResponse.json({ user: null })
  }

  const { api } = await import('@/lib/api/client')
  const result = await api.auth.me(token)

  if (!result.success || !result.data) {
    return NextResponse.json({ user: null })
  }

  return NextResponse.json({ user: result.data })
}
