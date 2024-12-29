'use client'

import React, { useState, useEffect } from 'react'
import { Search, MapPin, Phone, Mail, Filter } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface Listing {
  id: number
  name: string
  address: string
  phone: string
  email: string
  tags: string[]
}

// Sample data
const sampleListings: Listing[] = [
    {
        id: 1,
        name: "Happy Paws Veterinary Clinic",
        address: "123 Main Street, Brussels",
        phone: "+32 123 456 789",
        email: "contact@happypaws.be",
        tags: ["Emergency Care", "24/7 Service", "Veterinary Clinic"]
    },
    {
        id: 2,
        name: "Wildlife Rescue Center",
        address: "45 Forest Road, Brussels",
        phone: "+32 987 654 321",
        email: "help@wildlife.be",
        tags: ["Wildlife Rescue", "Rehabilitation"]
    },
    {
        id: 3,
        name: "City Animal Shelter",
        address: "78 Park Avenue, Brussels",
        phone: "+32 456 789 123",
        email: "info@cityshelter.be",
        tags: ["Animal Shelter", "Adoption"]
    }
]

// Available service types
const serviceTypes = [
    'Veterinary Clinic',
    'Emergency Care',
    'Animal Shelter',
    'Wildlife Rescue'
]

export default function DirectoryPage() {
    // States for search and filters
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedServices, setSelectedServices] = useState<string[]>([])
    const [selectedDistance, setSelectedDistance] = useState('5')
    const [filteredListings, setFilteredListings] = useState<Listing[]>(sampleListings)
  
    // Filter function
    useEffect(() => {
      const filterListings = () => {
        return sampleListings.filter(listing => {
          // Search query filter
          const matchesSearch = 
            searchQuery === '' || // Show all when no search query
            listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  
          // Services filter
          const matchesServices = 
            selectedServices.length === 0 || // Show all when no services selected
            selectedServices.some(service => listing.tags.includes(service))
  
          return matchesSearch && matchesServices
        })
      }
  
      setFilteredListings(filterListings())
    }, [searchQuery, selectedServices]) // Remove selectedDistance and sampleListings from dependencies
  

  // Handle service type selection
  const handleServiceChange = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    )
  }

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
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{listing.name}</h3>
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