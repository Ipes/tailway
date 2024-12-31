// src/lib/api.ts

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function fetchFromAPI(endpoint: string) {
    console.log('Fetching from:', `${STRAPI_URL}/api/${endpoint}`);
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('API Response:', data);
    return data;
  }

export async function getAnimalGuide(type: string, locale = 'en') {
  // Using plural form as confirmed from API response
  const endpoint = `animal-guides?filters[animalType][$eq]=${type}&locale=${locale}`;
  console.log('Requesting:', `${STRAPI_URL}/api/${endpoint}`);
  return fetchFromAPI(endpoint);
}

export async function getDirectoryListings(locale = 'en') {
    return fetchFromAPI(`directory-listings?locale=${locale}`);
}