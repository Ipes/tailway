// src/app/[lang]/directory/page.tsx
import { getDictionary } from '@/lib/dictionary'
import DirectoryPage from '@/components/DirectoryPage'
import { Locale } from '@/config/i18n.config'

// Use the proper Next.js 15 typing
export default async function Page({
  params = Promise.resolve({ lang: 'en' as Locale }), // provide default value
  searchParams = Promise.resolve({})
}: {
  params?: Promise<{ lang: Locale }>,
  searchParams?: Promise<any>
}) {
  // Wait for params to resolve
  const { lang } = await params;
  const dict = await getDictionary(lang)
  
  return (
    <DirectoryPage 
      dict={dict} 
      lang={lang}
    />
  )
}

// Make params optional to match Next.js interface
Page.generateMetadata = async ({ 
  params = Promise.resolve({ lang: 'en' as Locale })
}: { 
  params?: Promise<{ lang: Locale }> 
}) => {
  const { lang } = await params;
  return {
    title: `Directory - ${lang.toUpperCase()}`
  };
};