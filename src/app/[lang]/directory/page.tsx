import { getDictionary } from '@/lib/dictionary'
import DirectoryPage from '@/components/DirectoryPage'
import { Locale } from '@/config/i18n.config'

type Props = {
  params: {
    lang: Locale
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page(props: Props) {
  const dict = await getDictionary(props.params.lang)
  
  return (
    <DirectoryPage 
      dict={dict} 
      lang={props.params.lang}
    />
  )
}
