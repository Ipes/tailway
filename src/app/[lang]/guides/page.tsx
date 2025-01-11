// src/app/[lang]/guides/page.tsx
import { getDictionary } from '@/lib/dictionary'
import GuidesPage from 'src/components/GuidesPage'
import { type Locale } from '@/config/i18n.config'
import type { Metadata } from 'next'

export default async function Page({
  params
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  
  return <GuidesPage dict={dict} lang={lang} />
}
