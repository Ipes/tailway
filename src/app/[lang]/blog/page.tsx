// src/app/[lang]/blog/page.tsx
import { Locale } from '@/config/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import BlogPage from '@/components/BlogPage'

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  
  return <BlogPage dict={dict} lang={lang} />
}