// src/app/[lang]/directory/page.tsx
import { getDictionary } from '@/lib/dictionary'
import DirectoryPage from '@/components/DirectoryPage'
import { Locale } from '@/config/i18n.config'

type SearchParamsType = { [key: string]: string | string[] | undefined }

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<SearchParamsType>;
}) {
  // Await both promises
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;
  
  const dict = await getDictionary(lang)
  
  return (
    <DirectoryPage 
      dict={dict} 
      lang={lang}
    />
  )
}