// src/app/test-strapi/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAnimalGuide } from '@/lib/api'
import Mermaid from '@/components/ui/mermaid'

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

interface GuideAttributes {
  title: string;
  description: RichTextNode[];
  steps: Step[];
  safetyTips: string[];
  flowChart: string;
}

interface GuideResponse {
  data: Array<{
    id: number;
    attributes: GuideAttributes;
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
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

export default function TestStrapiPage() {
  const [guideData, setGuideData] = useState<GuideAttributes | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  useEffect(() => {
    async function fetchGuide() {
      try {
        console.log('Starting to fetch guide data...')
        const response = await getAnimalGuide('dog')
        console.log('Full API Response:', response)
        setDebugInfo(response)

        if (!response.data || response.data.length === 0) {
          throw new Error('No guide data found in response')
        }

        // Get the first guide data directly from the response
        const guide = response.data[0]
        console.log('Selected guide:', guide)
        
        setGuideData(guide)
      } catch (err) {
        console.error('Error fetching guide:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch guide')
      } finally {
        setLoading(false)
      }
    }

    fetchGuide()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <Card>
          <CardContent>
            <p className="text-gray-600">Loading guide data...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold text-red-600 mb-4">Error Loading Guide</h2>
            <p className="text-gray-600">{error}</p>
            {debugInfo && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <h3 className="font-semibold mb-2">Debug Information:</h3>
                <pre className="whitespace-pre-wrap text-sm">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!guideData) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold text-yellow-600 mb-4">No Guide Found</h2>
            <p className="text-gray-600">Could not find guide data for the requested animal type.</p>
            {debugInfo && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <h3 className="font-semibold mb-2">Debug Information:</h3>
                <pre className="whitespace-pre-wrap text-sm">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card>
        <CardHeader>
          <CardTitle>{guideData.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-gray-600">
              {guideData.description && extractTextFromRichText(guideData.description)}
            </p>
            
            {/* Steps */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Steps</h2>
              {guideData.steps?.map((step: Step) => (
                <div key={step.id} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                  <ul className="list-disc list-inside mt-2">
                    {step.checkPoints?.map((point: string, index: number) => (
                      <li key={index} className="text-gray-600">{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Safety Tips */}
            {guideData.safetyTips && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Safety Tips</h2>
                <ul className="list-disc list-inside space-y-1">
                  {guideData.safetyTips.map((tip: string, index: number) => (
                    <li key={index} className="text-gray-600">{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Flow Chart */}
            {guideData.flowChart && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Decision Flow Chart</h2>
                <div className="bg-white p-4 rounded border">
                  <Mermaid chart={guideData.flowChart} />
                </div>
              </div>
            )}

            {/* Debug Information (only in development) */}
            {process.env.NODE_ENV === 'development' && debugInfo && (
              <div className="mt-8 p-4 bg-gray-100 rounded">
                <h3 className="font-semibold mb-2">Debug Information:</h3>
                <pre className="whitespace-pre-wrap text-sm">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}