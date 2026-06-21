import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Rutas públicas
  const publicPaths = ['/login', '/register', '/auth', '/terms', '/']
  const isPublicPath = publicPaths.some(p => pathname === p || pathname.startsWith('/auth/'))

  // Si no hay usuario y la ruta no es pública -> redirect a login
  if (!user && !isPublicPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Si hay usuario, obtener el rol
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const role = profile?.role

    // Redirecciones post-login
    if (pathname === '/login' || pathname === '/register') {
      const url = request.nextUrl.clone()
      if (role === 'commerce') url.pathname = '/comercio/dashboard'
      else if (role === 'ngo') url.pathname = '/ong/dashboard'
      else if (role === 'admin') url.pathname = '/admin/dashboard'
      else url.pathname = '/'
      return NextResponse.redirect(url)
    }

    // Protección de rutas por rol
    if (pathname.startsWith('/comercio') && role !== 'commerce') {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    if (pathname.startsWith('/ong') && role !== 'ngo') {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    if (pathname.startsWith('/admin') && role !== 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
