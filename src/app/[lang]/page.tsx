// src/app/[lang]/page.tsx
import { getDictionary } from '@/lib/dictionary'
import HomePage from 'src/components/HomePage'
import { type Locale } from '@/config/i18n.config'

interface Props {
  params: Promise<{ lang: Locale }>
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  
  return <HomePage dict={dict} lang={lang} />
}
