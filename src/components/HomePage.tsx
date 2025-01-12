// src/components/HomePage.tsx
'use client'

import React from 'react'
import { AlertTriangle, Search, ArrowRight, Phone, Menu, X } from 'lucide-react'
import LanguageSwitcher from '@/components/ui/language-switcher'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="font-bold text-xl text-blue-600">Tailway</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href={`/${lang}/guides`} className="px-4 py-2 text-gray-600 hover:text-blue-600">
                {dict.home.nav.guides}
              </Link>
              <Link href={`/${lang}/directory`} className="px-4 py-2 text-gray-600 hover:text-blue-600">
                {dict.home.nav.directory}
              </Link>
              <Link href={`/${lang}/blog`} className="px-4 py-2 text-gray-600 hover:text-blue-600">
                {dict.home.nav.blog}
              </Link>
              <div className="pl-4 border-l border-gray-200">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile Navigation Controls */}
            <div className="flex items-center space-x-4 md:hidden">
              <LanguageSwitcher />
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-blue-600"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          md:hidden fixed inset-y-0 right-0 transform bg-white w-64 p-6 space-y-6 shadow-lg
          transition duration-200 ease-in-out z-30
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="flex justify-end">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-600 hover:text-blue-600"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            <Link 
              href={`/${lang}/guides`} 
              className="px-4 py-2 text-gray-600 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dict.home.nav.guides}
            </Link>
            <Link 
              href={`/${lang}/directory`} 
              className="px-4 py-2 text-gray-600 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dict.home.nav.directory}
            </Link>
            <Link 
              href={`/${lang}/blog`} 
              className="px-4 py-2 text-gray-600 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dict.home.nav.blog}
            </Link>
          </div>
        </div>

        {/* Overlay when mobile menu is open */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </nav>      

      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">{dict.home.hero.title}</h1>
            <p className="text-2xl mb-8">{dict.home.hero.subtitle}</p>
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