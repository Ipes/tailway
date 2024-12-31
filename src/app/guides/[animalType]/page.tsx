// src/app/guides/[animalType]/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { AlertTriangle, ArrowLeft, Info, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import Mermaid from '@/components/ui/mermaid'
import { getAnimalGuide } from '@/lib/api'
import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'

interface RichTextNode {
  type: string;
  children?: RichTextNode[];
  text?: string;
}

interface Step {
  id: number;
  title: string;
  description: string;
  checkPoints: string[];
}

interface GuideData {
  title: string;
  description: RichTextNode[];
  steps: Step[];
  safetyTips: string[];
  flowChart: string;
  animalType: string;
}

// Helper function to extract text from rich text format
function extractTextFromRichText(nodes: RichTextNode[]): string {
  return nodes
    .map(node => {
      if (node.text) return node.text;
      if (node.children) return extractTextFromRichText(node.children);
      return '';
    })
    .join(' ');
}

export default function RescueGuidePage() {
  const params = useParams();
  const [guideData, setGuideData] = useState<GuideData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGuide() {
      try {
        if (!params?.animalType) {
          throw new Error('No animal type specified');
        }

        const animalType = Array.isArray(params.animalType) 
          ? params.animalType[0] 
          : params.animalType;

        console.log('Fetching guide for animal type:', animalType);
        const response = await getAnimalGuide(animalType);

        if (!response.data || response.data.length === 0) {
          console.log('No guide found for:', animalType);
          notFound();
          return;
        }

        const guide = response.data[0];
        console.log('Found guide:', guide);
        setGuideData(guide);
      } catch (err) {
        console.error('Error fetching guide:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch guide');
      } finally {
        setLoading(false);
      }
    }

    fetchGuide();
  }, [params?.animalType]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Card>
            <CardContent>
              <p className="text-gray-600 py-4">Loading guide...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !guideData) {
    notFound();
    return null;
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
          <p className="text-xl">
            {guideData.description && extractTextFromRichText(guideData.description)}
          </p>
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
          {guideData.steps?.map((step) => (
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
                  {step.checkPoints?.map((point, index) => (
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
          {guideData.safetyTips && guideData.safetyTips.length > 0 && (
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
          )}

          {/* Flow Chart */}
          {guideData.flowChart && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Decision Flow Chart</h3>
                <div className="bg-white p-4 rounded">
                  <Mermaid chart={guideData.flowChart} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}