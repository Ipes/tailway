// src/app/directory/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Search, MapPin, Phone, Mail, Filter } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { getDirectoryListings } from '@/lib/api'

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Listing {
  id: number;
  documentId: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  tags: string[];
  isEmergencyService: boolean | null;
  coordinates: Coordinates;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

interface StrapiResponse {
  data: Listing[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  }
}

// Available service types
const serviceTypes = [
    'Veterinary Clinic',
    'Emergency Care',
    'Animal Shelter',
    'Wildlife Rescue',
    'Rehabilitation'
]

export default function DirectoryPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedServices, setSelectedServices] = useState<string[]>([])
    const [selectedDistance, setSelectedDistance] = useState('5')
    const [listings, setListings] = useState<Listing[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
      async function fetchListings() {
        try {
          setLoading(true)
          console.log('Fetching directory listings...')
          const response = await getDirectoryListings()
          console.log('Raw API Response:', response)
          
          if (!response || !response.data) {
            throw new Error('Invalid API response format')
          }
          
          console.log('Setting listings state with:', response.data)
          setListings(response.data)
        } catch (err) {
          console.error('Error fetching listings:', err)
          setError(err instanceof Error ? err.message : 'Failed to fetch listings')
        } finally {
          setLoading(false)
        }
      }

      fetchListings()
    }, [])

    const handleServiceChange = (service: string) => {
      setSelectedServices(prev =>
        prev.includes(service)
          ? prev.filter(s => s !== service)
          : [...prev, service]
      )
    }

    const getFilteredListings = () => {
      if (!listings || listings.length === 0) return []
      
      return listings.filter(listing => {
        if (!listing) return false
        
        // Search query filter
        const matchesSearch = 
          searchQuery === '' || // Show all when no search query
          listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          listing.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (listing.tags && listing.tags.some(tag => 
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          ))

        // Services filter
        const matchesServices = 
          selectedServices.length === 0 || // Show all when no services selected
          (listing.tags && listing.tags.some(tag => 
            selectedServices.includes(tag)
          ))

        return matchesSearch && matchesServices
      })
    }

    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold mb-4">Find Animal Help Near You</h1>
              <p className="text-xl mb-6">Loading directory listings...</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <Card>
              <CardContent>
                <p className="text-gray-600 text-center py-8">Loading...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold mb-4">Find Animal Help Near You</h1>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <Card>
              <CardContent>
                <p className="text-red-600 text-center py-8">Error: {error}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    const filteredListings = getFilteredListings()

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Search */}
        <div className="bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Find Animal Help Near You</h1>
            <p className="text-xl mb-6">Locate veterinarians, shelters, and rescue services in your area</p>
            
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by service or location..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg text-gray-800"
                />
              </div>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold flex items-center justify-center">
                <Filter className="mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent>
                  <h2 className="text-xl font-semibold mb-6 text-gray-800">Filter Results</h2>
                  
                  {/* Service Type */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3 text-gray-800">Service Type</h3>
                    <div className="space-y-2">
                      {serviceTypes.map(service => (
                        <label key={service} className="flex items-center text-gray-700 cursor-pointer">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={selectedServices.includes(service)}
                            onChange={() => handleServiceChange(service)}
                          />
                          {service}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Distance */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3 text-gray-800">Distance</h3>
                    <select
                      className="w-full p-2 border rounded text-gray-700"
                      value={selectedDistance}
                      onChange={(e) => setSelectedDistance(e.target.value)}
                    >
                      <option value="5">Within 5 km</option>
                      <option value="10">Within 10 km</option>
                      <option value="20">Within 20 km</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results List */}
            <div className="lg:col-span-2 space-y-4">
              {filteredListings.length === 0 ? (
                <Card>
                  <CardContent>
                    <p className="text-gray-600 text-center py-8">
                      No results found. Try adjusting your search or filters.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredListings.map((listing) => (
                  <Card key={listing.id}>
                    <CardContent>
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">
                        {listing.name}
                        {listing.isEmergencyService && (
                          <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-sm rounded-full">
                            24/7 Emergency
                          </span>
                        )}
                      </h3>
                      <div className="text-gray-600 space-y-2">
                        <div className="flex items-center">
                          <MapPin className="mr-2" />
                          <p>{listing.address}</p>
                        </div>
                        <div className="flex items-center">
                          <Phone className="mr-2" />
                          <p>{listing.phone}</p>
                        </div>
                        <div className="flex items-center">
                          <Mail className="mr-2" />
                          <p>{listing.email}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                          {listing.tags.map((tag) => (
                            <span key={tag} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    )
}