// src/app/[lang]/directory/page.tsx
import { getDictionary } from '@/lib/dictionary'
import DirectoryPage from '@/components/DirectoryPage'
import { Locale } from '@/config/i18n.config'

interface PageProps {
  params: {
    lang: Locale
  }
}

export default async function Page({ params }: PageProps) {
  const dict = await getDictionary(params.lang)
  
  return (
    <DirectoryPage 
      dict={dict} 
      lang={params.lang}
    />
  )
}