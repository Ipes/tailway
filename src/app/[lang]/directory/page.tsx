// src/app/[lang]/directory/page.tsx
import { getDictionary } from '@/lib/dictionary'
import DirectoryPage from '@/components/DirectoryPage'
import { Locale } from '@/config/i18n.config'
import { use } from 'react'

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { lang } = use(params);
  const dict = use(getDictionary(lang))
  
  return (
    <DirectoryPage 
      dict={dict} 
      lang={lang}
    />
  )
}