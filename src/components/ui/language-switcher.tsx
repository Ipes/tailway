// src/components/ui/language-switcher.tsx
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { i18n } from '@/config/i18n.config'
import { ChevronDown, Globe } from 'lucide-react'

const LanguageSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const currentLocale = pathname.split('/')[1] || i18n.defaultLocale

  const switchLanguage = (locale: string) => {
    const newPathname = pathname.replace(`/${currentLocale}`, '')
    router.push(`/${locale}${newPathname}`)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 w-auto px-3 py-1.5 text-sm bg-white border rounded hover:bg-gray-50"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4 text-gray-500" />
        <span className="font-medium">{currentLocale.toUpperCase()}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 bg-white border rounded shadow-lg z-50 min-w-[120px]">
          <div className="py-1">
            {i18n.locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLanguage(locale)}
                className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                  currentLocale === locale ? 'bg-gray-50 font-medium' : ''
                }`}
              >
                {locale === 'en' ? 'English' : locale === 'nl' ? 'Nederlands' : 'Français'}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default LanguageSwitcher