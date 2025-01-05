// src/app/[lang]/guides/page.tsx
import { getDictionary } from '@/lib/dictionary'
import GuidesPage from 'src/components/GuidesPage'

export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang)
  
  return <GuidesPage dict={dict} lang={lang} />
}