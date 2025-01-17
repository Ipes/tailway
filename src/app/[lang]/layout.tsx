import { i18n, type Locale } from '../../config/i18n.config'
import type { Metadata } from 'next'
import Navigation from '@/components/ui/navigation'
import { getDictionary } from '@/lib/dictionary'

interface Props {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: "Tailway - Animal Emergency Response Guide",
    description: "Immediate guidance for helping animals in distress",
    alternates: {
      languages: {
        'x-default': '/',
        ...Object.fromEntries(
          i18n.locales.map((locale) => [locale, `/${locale}`])
        ),
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  // Validate that the lang parameter is a supported locale
  if (!i18n.locales.includes(lang as Locale)) {
    return null
  }

  // Get dictionary for the current language
  const dict = await getDictionary(lang as Locale)

  return (
    <>
      <Navigation dict={dict} lang={lang as Locale} />
      {children}
    </>
  )
}