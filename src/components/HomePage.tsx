// src/components/HomePage.tsx
'use client'

import React from 'react'
import { AlertTriangle, Search, ArrowRight, Phone } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

interface HomePageProps {
  dict: {
    common: {
      loading: string;
      error: string;
    };
    home: {
      hero: {
        title: string;
        subtitle: string;
        emergencyButton: string;
        findHelpButton: string;
      };
      nav: {
        guides: string;
        directory: string;
        blog: string;
      };
      quickAccess: {
        title: string;
        guides: {
          dogs: {
            title: string;
            description: string;
          };
          cats: {
            title: string;
            description: string;
          };
          birds: {
            title: string;
            description: string;
          };
        };
      };
      emergency: {
        title: string;
        veterinary: {
          title: string;
          description: string;
          button: string;
        };
        wildlife: {
          title: string;
          description: string;
          button: string;
        };
      };
    };
  };
  lang: string;
}

export default function HomePage({ dict, lang }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl text-blue-600">Tailway</div>
            <div className="space-x-4">
              <Link href={`/${lang}/guides`} className="px-4 py-2 text-gray-600 hover:text-blue-600">
                {dict.home.nav.guides}
              </Link>
              <Link href={`/${lang}/directory`} className="px-4 py-2 text-gray-600 hover:text-blue-600">
                {dict.home.nav.directory}
              </Link>
              <Link href={`/${lang}/blog`} className="px-4 py-2 text-gray-600 hover:text-blue-600">
                {dict.home.nav.blog}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">{dict.home.hero.title}</h1>
            <p className="text-xl mb-8">{dict.home.hero.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={`/${lang}/guides`} 
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-gray-50"
              >
                <AlertTriangle className="mr-2" />
                {dict.home.hero.emergencyButton}
              </Link>
              <Link 
                href={`/${lang}/directory`} 
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-blue-600"
              >
                <Search className="mr-2" />
                {dict.home.hero.findHelpButton}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Guides */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">{dict.home.quickAccess.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['dogs', 'cats', 'birds'].map((animal) => (
            <Card key={animal}>
              <CardHeader>
                <CardTitle>{dict.home.quickAccess.guides[animal].title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {dict.home.quickAccess.guides[animal].description}
                </p>
                <button className="text-blue-600 font-semibold flex items-center">
                  {dict.home.nav.guides} <ArrowRight className="ml-2" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">{dict.home.emergency.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent>
                <div className="flex items-center mb-4">
                  <Phone className="text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {dict.home.emergency.veterinary.title}
                  </h3>
                </div>
                <p className="text-gray-600">{dict.home.emergency.veterinary.description}</p>
                <button className="mt-4 text-blue-600 font-semibold">
                  {dict.home.emergency.veterinary.button}
                </button>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="flex items-center mb-4">
                  <AlertTriangle className="text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {dict.home.emergency.wildlife.title}
                  </h3>
                </div>
                <p className="text-gray-600">{dict.home.emergency.wildlife.description}</p>
                <button className="mt-4 text-blue-600 font-semibold">
                  {dict.home.emergency.wildlife.button}
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}