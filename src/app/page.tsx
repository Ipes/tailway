import React from 'react'
import { AlertTriangle, Search, ArrowRight, Phone } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl text-blue-600">Tailway</div>
            <div className="space-x-4">
              <Link href="/guides" className="px-4 py-2 text-gray-600 hover:text-blue-600">
                Guides
              </Link>
              <Link href="/directory" className="px-4 py-2 text-gray-600 hover:text-blue-600">
                Directory
              </Link>
              <Link href="/blog" className="px-4 py-2 text-gray-600 hover:text-blue-600">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Found an animal in distress?</h1>
            <p className="text-xl mb-8">Get immediate guidance on how to help</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold flex items-center justify-center">
                <AlertTriangle className="mr-2" />
                Emergency Guide
              </button>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center">
                <Search className="mr-2" />
                Find Help Nearby
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Guides */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Common Animal Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Dogs', 'Cats', 'Birds'].map((animal) => (
            <Card key={animal}>
              <CardHeader>
                <CardTitle>{animal}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Quick guide for helping {animal.toLowerCase()} in distress</p>
                <button className="text-blue-600 font-semibold flex items-center">
                  View Guide <ArrowRight className="ml-2" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">Emergency Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent>
                <div className="flex items-center mb-4">
                  <Phone className="text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">Veterinary Emergency</h3>
                </div>
                <p className="text-gray-600">24/7 emergency veterinary services in your area</p>
                <button className="mt-4 text-blue-600 font-semibold">Find nearest clinic</button>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="flex items-center mb-4">
                  <AlertTriangle className="text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">Wildlife Response</h3>
                </div>
                <p className="text-gray-600">Professional wildlife rescue and rehabilitation</p>
                <button className="mt-4 text-blue-600 font-semibold">Contact rescue team</button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}