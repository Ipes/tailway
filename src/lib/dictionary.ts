// src/lib/dictionary.ts
import 'server-only'
import type { Locale } from '@/config/i18n.config'

// Dictionaries
import en from '@/app/dictionaries/en.json'
import nl from '@/app/dictionaries/nl.json'
import fr from '@/app/dictionaries/fr.json'

const dictionaries = {
  en,
  nl,
  fr,
}

export const getDictionary = async (locale: Locale) => 
  dictionaries[locale] || dictionaries.en