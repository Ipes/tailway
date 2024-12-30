// src/app/guides/[animalType]/not-found.tsx
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Animal Guide Not Found</h2>
        <p className="text-gray-600 mb-6">Could not find the requested animal guide.</p>
        <Link
          href="/guides"
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          Return to Guides
        </Link>
      </div>
    </div>
  )
}