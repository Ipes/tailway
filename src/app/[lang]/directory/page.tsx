// src/app/[lang]/directory/page.tsx
import { getDictionary } from '@/lib/dictionary'
import DirectoryPage from '@/components/DirectoryPage'
import { Locale } from '@/config/i18n.config'

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang)
  
  return (
    <DirectoryPage 
      dict={dict} 
      lang={lang}
    />
  )
}