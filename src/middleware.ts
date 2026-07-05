import { NextResponse, type NextRequest } from 'next/server'

const SUPPORTED = new Set(['es', 'en', 'fr', 'pt', 'de', 'ar', 'id', 'zh', 'eu'])

export function middleware(request: NextRequest) {
  // 1. Already has cookie → skip
  const cookieLang = request.cookies.get('lang')?.value
  if (cookieLang && SUPPORTED.has(cookieLang)) {
    return NextResponse.next()
  }

  // 2. Has URL param → skip (client handles it)
  const urlLang = request.nextUrl.searchParams.get('lang')
  if (urlLang && SUPPORTED.has(urlLang)) {
    return NextResponse.next()
  }

  // 3. Detect from Accept-Language header
  const acceptLang = request.headers.get('Accept-Language') || ''
  // Accept-Language: es-ES,es;q=0.9,en;q=0.8 → first code = 'es'
  const primary = acceptLang.split(',')[0]?.split('-')[0]?.split(';')[0]?.trim().toLowerCase()
  if (primary && SUPPORTED.has(primary)) {
    const response = NextResponse.next()
    response.cookies.set('lang', primary, {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
    })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all pages except internal Next.js paths and static files
    '/((?!api|_next/static|_next/image|favicon.ico|images/|.*\\.).*)',
  ],
}
