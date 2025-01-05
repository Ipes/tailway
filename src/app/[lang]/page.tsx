// src/app/[lang]/page.tsx
import { getDictionary } from '@/lib/dictionary'
import HomePage from 'src/components/HomePage'

export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang)
  
  return <HomePage dict={dict} lang={lang} />
}