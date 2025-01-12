// src/components/ui/navigation.tsx
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from './language-switcher'

interface NavigationProps {
  dict: {
    home: {
      nav: {
        guides: string;
        directory: string;
        blog: string;
      };
    };
  };
  lang: string;
}

export default function Navigation({ dict, lang }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href={`/${lang}`} className="font-bold text-xl text-blue-600">
            Tailway
          </Link>

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
  )
}