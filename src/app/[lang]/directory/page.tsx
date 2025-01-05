// src/app/[lang]/directory/page.tsx
import { getDictionary } from '@/lib/dictionary'
import DirectoryPage from 'src/components/DirectoryPage'  // Adjust this import path as needed

export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang)
  
  return <DirectoryPage dict={dict} />
}