'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function NotFound() {
  const { lang } = useParams()
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Guide Not Found</h2>
        <p className="text-gray-600 mb-6">Sorry, we couldn't find the guide you're looking for.</p>
        <Link 
          href={`/${lang}/guides`}
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          Return to Guides
        </Link>
      </div>
    </div>
  )
}