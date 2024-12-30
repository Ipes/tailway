// src/app/guides/[animalType]/page.tsx
'use client'

import React from 'react'
import { AlertTriangle, ArrowLeft, Info, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import Mermaid from '@/components/ui/mermaid'
import { getAnimalGuideContent } from '@/config/animalTypes'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    animalType: string
  }>
}

export default function RescueGuidePage({ params: paramsPromise }: PageProps) {
  // Unwrap the params using React.use()
  const params = React.use(paramsPromise);
  
  // Add console logs for debugging
  console.log('URL params:', params);
  console.log('Animal type:', params?.animalType);

  // Check if params and animalType exist
  if (!params?.animalType) {
    console.log('No animal type found in params');
    notFound();
  }

  const guideData = getAnimalGuideContent(params.animalType);
  
  // Log the guide data
  console.log('Guide data:', guideData);
  
  // If the animal type is not supported or no guide data is found, show 404
  if (!guideData) {
    console.log('No guide data found for animal type:', params.animalType);
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Guide Header */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Link 
            href="/guides" 
            className="flex items-center text-white mb-4 hover:text-blue-100"
          >
            <ArrowLeft className="mr-2" /> Back to Guides
          </Link>
          <h1 className="text-3xl font-bold mb-4">{guideData.title}</h1>
          <p className="text-xl">{guideData.description}</p>
        </div>
      </div>

      {/* Emergency Warning */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex items-center">
            <AlertTriangle className="text-red-500 mr-2" />
            <p className="font-semibold text-red-700">
              If the animal is severely injured or aggressive, call professional help immediately
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Steps */}
          {guideData.steps.map((step) => (
            <Card key={step.id}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">
                    {step.id}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">{step.title}</h2>
                </div>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <ul className="space-y-2 text-gray-600">
                  {step.checkPoints.map((point, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          {/* Safety Tips */}
          <Card>
            <CardContent className="p-6 bg-yellow-50">
              <div className="flex items-center mb-4">
                <Info className="text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold text-yellow-800">Safety Tips</h3>
              </div>
              <ul className="space-y-2 text-yellow-800">
                {guideData.safetyTips.map((tip, index) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Flow Chart */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Decision Flow Chart</h3>
              <div className="bg-white p-4 rounded">
                <Mermaid chart={guideData.flowChart} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}