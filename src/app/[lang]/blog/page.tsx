// src/app/[lang]/blog/page.tsx
import React from 'react'
import { Card } from '@/components/ui/card'

interface BlogPageProps {
  params: {
    lang: string
  }
}

export default function BlogPage({ params: { lang } }: BlogPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Blog Coming Soon
        </h1>
        <p className="text-gray-600 mb-6">
          Our blog is currently under development. Please check back later for updates.
        </p>
        <a 
          href={`/${lang}`} 
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Return to Homepage
        </a>
      </Card>
    </div>
  )
}