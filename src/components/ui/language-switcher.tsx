// src/components/ui/language-switcher.tsx
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { i18n } from '@/config/i18n.config'

const LanguageSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = pathname.split('/')[1] || i18n.defaultLocale

  const switchLanguage = (locale: string) => {
    // Remove the current locale from the pathname if it exists
    const newPathname = pathname.replace(`/${currentLocale}`, '')
    router.push(`/${locale}${newPathname}`)
  }

  return (
    <div className="flex items-center space-x-2">
      {i18n.locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLanguage(locale)}
          className={`px-2 py-1 rounded ${
            currentLocale === locale
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher