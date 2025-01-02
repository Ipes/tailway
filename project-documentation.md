# Tailway Project Documentation Update
December 31, 2024

## Project Overview
Tailway is a digital platform providing immediate, location-based guidance for people who encounter animals in distress. The platform addresses the critical need for consolidated, easily accessible information during animal emergencies by offering step-by-step guides and providing users with local animal welfare resources via a directory listing.

## Project Objectives
1. Create a single comprehensive resource for animal rescue guidance
2. Provide location-based, animal-specific rescue instructions
3. Maintain an up-to-date directory of animal welfare stakeholders
4. Deliver content in multiple languages (English, Dutch, French)

## Completed Features

### 1. Dynamic Routing for Animal Guides
- Implemented dynamic routing with `[animalType]` parameter
- Created reusable guide template with Strapi integration
- Added proper 404 handling for invalid routes

### 2. Guide Content Management
- Successfully integrated with Strapi CMS
- Created and populated animal guides for:
  - Dogs (Emergency response guide)
  - Cats (Emergency response guide)
  - Birds (Emergency response guide)
- Each guide includes:
  - Rich text descriptions
  - Step-by-step instructions
  - Safety tips
  - Interactive flow charts

### 3. Directory Listings
- Implemented directory page with Strapi integration
- Added search functionality
- Implemented service type filtering
- Added emergency service indicators
- Directory listings structure:
```typescript
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
}
```

### 4. Internationalization Setup
- Created dictionary structure for EN, NL, FR
- Added language switching component
- Implemented dictionary utilities
- Dictionary location: `src/dictionaries/`
- Language configuration: `src/config/i18n.config.ts`

## Current Project Structure
```
parent-directory/
├── tailway/          # Next.js project
└── tailway-cms/      # Strapi project
```

```
tailway/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Homepage
│   │   ├── guides/
│   │   │   ├── page.tsx                # Guides overview
│   │   │   └── [animalType]/           # Dynamic guide routes
│   │   │       ├── page.tsx            # Dynamic guide template
│   │   │       └── not-found.tsx       # 404 page
│   │   └── directory/
│   │       └── page.tsx                # Directory listing
│   ├── components/
│   │   └── ui/
│   │       ├── card.tsx                # Shared card component
│   │       ├── language-switcher.tsx   # Language switching component
│   │       └── mermaid.tsx             # Mermaid diagram component
│   ├── config/
│   │   └── i18n.config.ts             # i18n configuration
│   ├── dictionaries/                   # Translation files
│   │   ├── en.json
│   │   ├── nl.json
│   │   └── fr.json
│   └── lib/
│       ├── api.ts                      # Strapi API endpoints
│       └── dictionary.ts               # Dictionary utilities
```

## Next Steps for Upcoming Session

### 1. Next.js Internationalization Configuration (2 hours)
1. Update `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'nl', 'fr'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig
```

2. Add middleware for language routing in `src/middleware.ts`:
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/config/i18n.config'

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = i18n.defaultLocale
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```

### 2. Update Pages with Translation Support (4 hours)
1. Update directory page to use translations
2. Update guide pages to use translations
3. Implement language-aware routes
4. Test all pages in all supported languages

### 3. Update API Integration (2 hours)
1. Modify API utility functions to include locale:
```typescript
export async function getDirectoryListings(locale = 'en') {
  return fetchFromAPI(`directory-listings?locale=${locale}`);
}

export async function getAnimalGuide(type: string, locale = 'en') {
  return fetchFromAPI(`animal-guides?filters[animalType][$eq]=${type}&locale=${locale}`);
}
```

2. Update API calls in components to pass current locale
3. Test API responses with different locales
4. Verify content switching works correctly

## Success Criteria
1. All UI elements display in selected language
2. URLs reflect current language (e.g., `/en/guides`, `/nl/guides`, `/fr/guides`)
3. Content switches language when language is changed
4. API requests include correct locale parameter
5. All components handle language switching gracefully
6. SEO metadata updates with language changes
7. Default language fallback works correctly

## Future Considerations
- Implement user feedback system
- Add image support for guides
- Enhance search capabilities with location awareness
- Add more sophisticated geolocation features

## Important Note
The middleware implementation is particularly crucial as it handles the routing logic that makes the rest of the i18n features work properly.