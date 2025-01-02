import { i18n, type Locale } from '../../config/i18n.config'
import type { Metadata } from 'next'

interface Props {
  children: React.ReactNode
  params: { lang: Locale }
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
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

export default function LocaleLayout({ children, params: { lang } }: Props) {
  // Validate that the lang parameter is a supported locale
  if (!i18n.locales.includes(lang as Locale)) {
    return null
  }

  return (
    <>
      {/* You can add language-specific components here, like a language switcher */}
      {children}
    </>
  )
}
