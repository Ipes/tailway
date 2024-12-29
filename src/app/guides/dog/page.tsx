'use client'

import React from 'react'
import { AlertTriangle, ArrowLeft, Info, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

interface RescueGuideProps {
  params: {
    animalType: string
  }
}

export default function RescueGuidePage({ params }: RescueGuideProps) {
  // Safely access and capitalize the animal type
  const animalType = params?.animalType || 'animal'
  const capitalizedAnimalType = animalType.charAt(0).toUpperCase() + animalType.slice(1)

  // This would later come from an API/database
  const guideData = {
    title: `Helping a ${capitalizedAnimalType} in Distress`,
    description: `Step-by-step guide for safely assisting a ${animalType} in need`,
    steps: [
      {
        id: 1,
        title: 'Assess the Situation',
        description: `Before approaching, observe the ${animalType}'s behavior from a safe distance:`,
        checkPoints: [
          'Check for signs of aggression',
          'Look for visible injuries',
          'Note the surrounding environment'
        ]
      }
    ],
    safetyTips: [
      'Approach slowly and calmly',
      'Avoid direct eye contact',
      'Keep your movements predictable'
    ]
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

      {/* Step by Step Guide */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Step 1 */}
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
              <div className="bg-gray-100 p-4 rounded">
                [Mermaid Flow Chart Placeholder - To be implemented]
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}