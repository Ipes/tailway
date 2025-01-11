// src/app/[lang]/directory/page.tsx
import { getDictionary } from '@/lib/dictionary'
import DirectoryPage from '@/components/DirectoryPage'
import { Locale } from '@/config/i18n.config'

type SearchParams = { [key: string]: string | string[] | undefined }

// Use specific type annotations for Next.js 15
async function Page({
  params,
  searchParams,
}: {
  params: { lang: Locale },
  searchParams: SearchParams,
}) {
  const dict = await getDictionary(params.lang)
  
  return (
    <DirectoryPage 
      dict={dict} 
      lang={params.lang}
    />
  )
}

// Add type assertion for the page component
Page.dynamic = 'force-dynamic'

export default Page