import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/config/i18n.config'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip if the request is for static files
  if (pathname.includes('.') || pathname.startsWith('/_next')) {
    return
  }

  // If it's the root path, redirect to default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${i18n.defaultLocale}`, request.url))
  }

  // If it doesn't start with a locale, redirect to add default locale
  const localeMatch = i18n.locales.some(locale => pathname.startsWith(`/${locale}`))
  if (!localeMatch) {
    return NextResponse.redirect(new URL(`/${i18n.defaultLocale}${pathname}`, request.url))
  }
}

export const config = {
  matcher: ['/((?!_next|images|api|favicon.ico).*)']
}