// src/app/[lang]/directory/page.tsx
import { getDictionary } from '@/lib/dictionary'
import DirectoryPage from '@/components/DirectoryPage'
import { Locale } from '@/config/i18n.config'

// Update Props interface to match Next.js App Router requirements
interface Props {
  params: {
    lang: Locale
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

// Destructure params and searchParams directly
export default async function Page({ params, searchParams }: Props) {
  const dict = await getDictionary(params.lang)
  
  return (
    <DirectoryPage 
      dict={dict} 
      lang={params.lang}
    />
  )
}