'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { fetchFromAPI } from '@/lib/api'
import { useParams } from 'next/navigation'

interface Guide {
  id: number;
  title: string;
  animalType: string;
  description: any[]; // Using any for now, can be typed properly later
}

export default function GuidesPage() {
  const { lang } = useParams()
  const [guides, setGuides] = useState<Guide[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGuides() {
      try {
        const response = await fetchFromAPI(`animal-guides?locale=${lang}`);
        if (response.data) {
          setGuides(response.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch guides');
      } finally {
        setLoading(false);
      }
    }

    fetchGuides();
  }, [lang]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-600">Loading guides...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-4">Animal Emergency Guides</h1>
          <p className="text-xl">Step-by-step guides for helping animals in distress</p>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link key={guide.id} href={`/${lang}/guides/${guide.animalType}`}>
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle>{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600">View Guide</span>
                    <ArrowRight className="text-blue-600" />
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
