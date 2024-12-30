// src/app/guides/page.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { AlertTriangle, ArrowRight } from 'lucide-react'

export default function GuidesPage() {
  const animalGuides = [
    {
      type: 'dog',
      title: 'Dog Rescue Guide',
      description: 'Help dogs in distress safely and effectively'
    },
    {
      type: 'cat',
      title: 'Cat Rescue Guide',
      description: 'Guide for helping cats in emergency situations'
    },
    {
      type: 'bird',
      title: 'Bird Rescue Guide',
      description: 'Assist birds in need with proper care and safety'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-4">Emergency Animal Guides</h1>
          <p className="text-xl">Step-by-step instructions for helping animals in distress</p>
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <div className="flex items-center">
            <AlertTriangle className="text-red-500 mr-2" />
            <p className="font-semibold text-red-700">
              If an animal is severely injured or aggressive, contact professional help immediately
            </p>
          </div>
        </div>
      </div>

      {/* Guide Cards */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animalGuides.map((guide) => (
            <Link key={guide.type} href={`/guides/${guide.type}`}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{guide.description}</p>
                  <div className="text-blue-600 font-semibold flex items-center">
                    View Guide <ArrowRight className="ml-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}