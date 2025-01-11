// src/app/[lang]/directory/page.tsx
import { getDictionary } from '@/lib/dictionary'
import DirectoryPage from '@/components/DirectoryPage'
import { Locale } from '@/config/i18n.config'
import { NextPage } from 'next'

// Using Next.js built-in types for pages
interface PageProps {
  params: {
    lang: Locale
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

const Page: NextPage<PageProps> = async ({ params, searchParams }) => {
  const dict = await getDictionary(params.lang)
  
  return (
    <DirectoryPage 
      dict={dict} 
      lang={params.lang}
    />
  )
}

export default Page